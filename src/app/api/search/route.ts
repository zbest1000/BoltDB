import { NextRequest, NextResponse } from 'next/server'
import { searchEngine } from '@/lib/search'
import { SearchFilters, SearchOptions } from '@/lib/search'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const query = searchParams.get('q') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const sortBy = searchParams.get('sortBy') as 'relevance' | 'name' | 'price' | 'createdAt' || 'relevance'
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' || 'desc'
    const aiEnhanced = searchParams.get('aiEnhanced') === 'true'
    const fuzzy = searchParams.get('fuzzy') !== 'false'

    // Parse filters
    const filters: SearchFilters = {}
    
    const categories = searchParams.getAll('category')
    if (categories.length > 0) filters.category = categories
    
    const types = searchParams.getAll('type')
    if (types.length > 0) filters.type = types
    
    const materials = searchParams.getAll('material')
    if (materials.length > 0) filters.material = materials
    
    const standards = searchParams.getAll('standard')
    if (standards.length > 0) filters.standard = standards
    
    const manufacturers = searchParams.getAll('manufacturer')
    if (manufacturers.length > 0) filters.manufacturer = manufacturers
    
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    if (minPrice && maxPrice) {
      filters.priceRange = [parseFloat(minPrice), parseFloat(maxPrice)]
    }
    
    const availability = searchParams.get('availability')
    if (availability !== null) {
      filters.availability = availability === 'true'
    }

    const options: SearchOptions = {
      page,
      limit,
      sortBy,
      sortOrder,
      fuzzy,
      aiEnhanced,
    }

    const results = await searchEngine.search(query, filters, options)

    // Save search for analytics
    await searchEngine.saveSearch(query, undefined, filters, aiEnhanced)

    return NextResponse.json(results)
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, filters = {}, options = {} } = body

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    const results = await searchEngine.search(query, filters, options)

    // Save search for analytics
    await searchEngine.saveSearch(query, undefined, filters, options.aiEnhanced)

    return NextResponse.json(results)
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}