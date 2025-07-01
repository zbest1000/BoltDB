import Fuse from 'fuse.js'
import { prisma } from './prisma'
import { getCache, setCache } from './redis'
import { enhanceSearch } from './openai'

export interface SearchFilters {
  category?: string[]
  type?: string[]
  material?: string[]
  standard?: string[]
  priceRange?: [number, number]
  availability?: boolean
  manufacturer?: string[]
}

export interface SearchOptions {
  page?: number
  limit?: number
  sortBy?: 'relevance' | 'name' | 'price' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
  fuzzy?: boolean
  aiEnhanced?: boolean
}

export interface SearchResult {
  components: any[]
  total: number
  page: number
  totalPages: number
  filters: SearchFilters
  suggestions?: string[]
  aiEnhancements?: any
}

export class SearchEngine {
  private fuseOptions = {
    keys: [
      { name: 'name', weight: 2 },
      { name: 'description', weight: 1.5 },
      { name: 'category', weight: 1.2 },
      { name: 'material', weight: 1 },
      { name: 'manufacturer', weight: 1 },
      { name: 'partNumber', weight: 1.5 },
      { name: 'tags', weight: 1 },
    ],
    threshold: 0.3,
    includeScore: true,
    includeMatches: true,
  }

  async search(
    query: string,
    filters: SearchFilters = {},
    options: SearchOptions = {}
  ): Promise<SearchResult> {
    const {
      page = 1,
      limit = 20,
      sortBy = 'relevance',
      sortOrder = 'desc',
      fuzzy = true,
      aiEnhanced = false,
    } = options

    const cacheKey = `search:${query}:${JSON.stringify(filters)}:${JSON.stringify(options)}`
    
    // Try to get from cache first
    const cached = await getCache(cacheKey)
    if (cached) {
      return cached
    }

    let enhancedQuery = query
    let aiSuggestions: string[] = []
    let aiFilters = {}

    // AI Enhancement
    if (aiEnhanced && query.trim()) {
      try {
        const enhancement = await enhanceSearch({ query })
        enhancedQuery = enhancement.enhancedQuery
        aiSuggestions = enhancement.suggestions
        aiFilters = enhancement.filters
        
        // Merge AI filters with user filters
        Object.keys(aiFilters).forEach(key => {
          if (!filters[key as keyof SearchFilters]) {
            (filters as any)[key] = aiFilters[key as keyof typeof aiFilters]
          }
        })
      } catch (error) {
        console.error('AI enhancement failed:', error)
      }
    }

    // Build database query
    const whereClause: any = {
      availability: filters.availability !== undefined ? filters.availability : true,
    }

    if (filters.category?.length) {
      whereClause.category = { in: filters.category }
    }

    if (filters.type?.length) {
      whereClause.type = { in: filters.type as any[] }
    }

    if (filters.material?.length) {
      whereClause.material = { in: filters.material }
    }

    if (filters.standard?.length) {
      whereClause.standard = { in: filters.standard }
    }

    if (filters.manufacturer?.length) {
      whereClause.manufacturer = { in: filters.manufacturer }
    }

    if (filters.priceRange) {
      whereClause.price = {
        gte: filters.priceRange[0],
        lte: filters.priceRange[1],
      }
    }

    // Text search
    if (enhancedQuery.trim()) {
      whereClause.OR = [
        { name: { contains: enhancedQuery, mode: 'insensitive' } },
        { description: { contains: enhancedQuery, mode: 'insensitive' } },
        { partNumber: { contains: enhancedQuery, mode: 'insensitive' } },
        { manufacturer: { contains: enhancedQuery, mode: 'insensitive' } },
        { tags: { hasSome: enhancedQuery.split(' ') } },
      ]
    }

    // Get total count
    const total = await prisma.component.count({ where: whereClause })

    // Build order by clause
    let orderBy: any = {}
    switch (sortBy) {
      case 'name':
        orderBy = { name: sortOrder }
        break
      case 'price':
        orderBy = { price: sortOrder }
        break
      case 'createdAt':
        orderBy = { createdAt: sortOrder }
        break
      default:
        orderBy = { name: 'asc' }
    }

    // Get components
    let components = await prisma.component.findMany({
      where: whereClause,
      include: {
        specifications: true,
        cadFiles: {
          select: {
            id: true,
            filename: true,
            fileType: true,
            format: true,
          },
        },
        images: {
          where: { isPrimary: true },
          select: {
            id: true,
            filename: true,
            alt: true,
          },
        },
        _count: {
          select: {
            favorites: true,
          },
        },
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    })

    // Apply fuzzy search if enabled and we have a query
    if (fuzzy && enhancedQuery.trim() && components.length > 0) {
      const fuse = new Fuse(components, this.fuseOptions)
      const fuseResults = fuse.search(enhancedQuery)
      
      // If fuzzy search returns results, use those (maintaining pagination)
      if (fuseResults.length > 0) {
        components = fuseResults.map(result => ({
          ...result.item,
          _score: result.score,
        }))
      }
    }

    const result: SearchResult = {
      components,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      filters,
      suggestions: aiSuggestions,
      aiEnhancements: aiEnhanced ? { enhancedQuery, aiFilters } : undefined,
    }

    // Cache results for 5 minutes
    await setCache(cacheKey, result, 300)

    return result
  }

  async getFilterOptions(): Promise<{
    categories: string[]
    types: string[]
    materials: string[]
    standards: string[]
    manufacturers: string[]
    priceRange: [number, number]
  }> {
    const cacheKey = 'search:filter-options'
    const cached = await getCache(cacheKey)
    if (cached) return cached

    const [
      categories,
      types,
      materials,
      standards,
      manufacturers,
      priceStats,
    ] = await Promise.all([
      prisma.component.findMany({
        select: { category: true },
        distinct: ['category'],
        where: { availability: true },
      }),
      prisma.component.findMany({
        select: { type: true },
        distinct: ['type'],
        where: { availability: true },
      }),
      prisma.component.findMany({
        select: { material: true },
        distinct: ['material'],
        where: { material: { not: null }, availability: true },
      }),
      prisma.component.findMany({
        select: { standard: true },
        distinct: ['standard'],
        where: { standard: { not: null }, availability: true },
      }),
      prisma.component.findMany({
        select: { manufacturer: true },
        distinct: ['manufacturer'],
        where: { manufacturer: { not: null }, availability: true },
      }),
      prisma.component.aggregate({
        _min: { price: true },
        _max: { price: true },
        where: { price: { not: null }, availability: true },
      }),
    ])

    const result = {
      categories: categories.map(c => c.category).sort(),
      types: types.map(t => t.type).sort(),
      materials: materials.map(m => m.material!).sort(),
      standards: standards.map(s => s.standard!).sort(),
      manufacturers: manufacturers.map(m => m.manufacturer!).sort(),
      priceRange: [
        priceStats._min.price || 0,
        priceStats._max.price || 1000,
      ] as [number, number],
    }

    // Cache for 1 hour
    await setCache(cacheKey, result, 3600)
    return result
  }

  async getPopularSearches(limit = 10): Promise<string[]> {
    const cacheKey = `search:popular:${limit}`
    const cached = await getCache(cacheKey)
    if (cached) return cached

    const searches = await prisma.search.findMany({
      select: { query: true },
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
        },
      },
      take: limit * 3, // Get more to filter duplicates
    })

    // Count occurrences and get most popular
    const queryCount = searches.reduce((acc, search) => {
      acc[search.query] = (acc[search.query] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const popular = Object.entries(queryCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([query]) => query)

    // Cache for 1 hour
    await setCache(cacheKey, popular, 3600)
    return popular
  }

  async saveSearch(
    query: string,
    userId?: string,
    filters?: SearchFilters,
    aiEnhanced?: boolean
  ): Promise<void> {
    try {
      await prisma.search.create({
        data: {
          query,
          userId,
          filters: filters ? JSON.stringify(filters) : undefined,
          aiEnhanced: aiEnhanced || false,
        },
      })
    } catch (error) {
      console.error('Error saving search:', error)
    }
  }
}

export const searchEngine = new SearchEngine()