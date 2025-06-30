'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FunnelIcon,
  ViewColumnsIcon,
  Squares2X2Icon,
  ListBulletIcon,
  HeartIcon,
  ShoppingCartIcon,
  EyeIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  StarIcon,
  TruckIcon,
  CheckIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

// Sample product data
const products = [
  {
    id: 1,
    name: 'DIN 963 Screw with Countersunk Head, Slotted Recess',
    partNumber: 'DIN963-M8x25-SS316',
    description: 'High-quality stainless steel countersunk screw with slotted drive for flush mounting applications.',
    image: '/api/placeholder/300/300',
    price: 0.45,
    currency: 'EUR',
    material: 'Stainless Steel 316',
    thread: 'M8 x 25',
    standard: 'DIN 963',
    headType: 'Countersunk',
    drive: 'Slotted',
    grade: 'A4-80',
    coating: 'None',
    inStock: true,
    stockQuantity: 1250,
    minOrderQty: 10,
    rating: 4.8,
    reviews: 24,
    category: 'screws',
    subcategory: 'countersunk-screws',
    isFavorite: false,
    isNew: false,
    onSale: false
  },
  {
    id: 2,
    name: 'ISO 4762 Socket Head Cap Screw',
    partNumber: 'ISO4762-M10x30-CS',
    description: 'Carbon steel socket head cap screw with black oxide finish for high-strength applications.',
    image: '/api/placeholder/300/300',
    price: 0.78,
    currency: 'EUR',
    material: 'Carbon Steel',
    thread: 'M10 x 30',
    standard: 'ISO 4762',
    headType: 'Socket Head',
    drive: 'Hex Socket',
    grade: '12.9',
    coating: 'Black Oxide',
    inStock: true,
    stockQuantity: 850,
    minOrderQty: 25,
    rating: 4.9,
    reviews: 18,
    category: 'screws',
    subcategory: 'socket-head-screws',
    isFavorite: true,
    isNew: true,
    onSale: false
  },
  {
    id: 3,
    name: 'DIN 934 Hex Nut',
    partNumber: 'DIN934-M8-ZP',
    description: 'Zinc-plated hex nut for general construction and mechanical applications.',
    image: '/api/placeholder/300/300',
    price: 0.12,
    currency: 'EUR',
    material: 'Carbon Steel',
    thread: 'M8',
    standard: 'DIN 934',
    headType: 'Hex',
    drive: 'Wrench',
    grade: '8',
    coating: 'Zinc Plated',
    inStock: true,
    stockQuantity: 2500,
    minOrderQty: 50,
    rating: 4.7,
    reviews: 42,
    category: 'nuts',
    subcategory: 'hex-nuts',
    isFavorite: false,
    isNew: false,
    onSale: true
  },
  {
    id: 4,
    name: 'DIN 125 Flat Washer',
    partNumber: 'DIN125-M8-SS304',
    description: 'Stainless steel flat washer for load distribution and surface protection.',
    image: '/api/placeholder/300/300',
    price: 0.08,
    currency: 'EUR',
    material: 'Stainless Steel 304',
    thread: 'M8',
    standard: 'DIN 125',
    headType: 'Flat',
    drive: 'N/A',
    grade: 'A2',
    coating: 'None',
    inStock: true,
    stockQuantity: 5000,
    minOrderQty: 100,
    rating: 4.6,
    reviews: 31,
    category: 'washers',
    subcategory: 'flat-washers',
    isFavorite: false,
    isNew: false,
    onSale: false
  },
  {
    id: 5,
    name: 'DIN 912 Socket Head Cap Screw',
    partNumber: 'DIN912-M6x20-SS316',
    description: 'Premium stainless steel socket head cap screw for marine and food industry applications.',
    image: '/api/placeholder/300/300',
    price: 0.62,
    currency: 'EUR',
    material: 'Stainless Steel 316',
    thread: 'M6 x 20',
    standard: 'DIN 912',
    headType: 'Socket Head',
    drive: 'Hex Socket',
    grade: 'A4-80',
    coating: 'None',
    inStock: false,
    stockQuantity: 0,
    minOrderQty: 20,
    rating: 4.9,
    reviews: 15,
    category: 'screws',
    subcategory: 'socket-head-screws',
    isFavorite: false,
    isNew: false,
    onSale: false
  },
  {
    id: 6,
    name: 'DIN 7991 Countersunk Socket Screw',
    partNumber: 'DIN7991-M5x16-AL',
    description: 'Aluminum countersunk socket screw for lightweight applications.',
    image: '/api/placeholder/300/300',
    price: 0.35,
    currency: 'EUR',
    material: 'Aluminum',
    thread: 'M5 x 16',
    standard: 'DIN 7991',
    headType: 'Countersunk',
    drive: 'Hex Socket',
    grade: 'A2',
    coating: 'Anodized',
    inStock: true,
    stockQuantity: 750,
    minOrderQty: 25,
    rating: 4.5,
    reviews: 8,
    category: 'screws',
    subcategory: 'countersunk-screws',
    isFavorite: false,
    isNew: true,
    onSale: true
  }
]

const filters = {
  categories: ['screws', 'nuts', 'washers', 'bolts', 'anchors'],
  materials: ['Stainless Steel 316', 'Stainless Steel 304', 'Carbon Steel', 'Aluminum', 'Brass'],
  standards: ['DIN 963', 'DIN 912', 'DIN 934', 'DIN 125', 'DIN 7991', 'ISO 4762'],
  coatings: ['None', 'Zinc Plated', 'Black Oxide', 'Anodized', 'Galvanized'],
  grades: ['A2', 'A4-80', '8', '12.9']
}

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('name')
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([2])

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (!product.name.toLowerCase().includes(query) &&
            !product.partNumber.toLowerCase().includes(query) &&
            !product.description.toLowerCase().includes(query)) {
          return false
        }
      }

      // Category filters
      for (const [filterType, values] of Object.entries(selectedFilters)) {
        if (values.length > 0) {
          const productValue = product[filterType as keyof typeof product]
          if (!values.includes(String(productValue))) {
            return false
          }
        }
      }

      return true
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedFilters, sortBy])

  const toggleFilter = (filterType: string, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[filterType] || []
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      
      return { ...prev, [filterType]: updated }
    })
  }

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="breadcrumb">
            <Link href="/" className="breadcrumb-item">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="text-gray-900 font-medium">Products</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="filter-section">
              <div className="flex items-center justify-between mb-4">
                <h3 className="filter-title">Filters</h3>
                <button
                  onClick={() => setSelectedFilters({})}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear All
                </button>
              </div>

              {/* Search within results */}
              <div className="filter-group">
                <label className="filter-group-title">Search</label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Category Filter */}
              <div className="filter-group">
                <label className="filter-group-title">Category</label>
                <div className="space-y-2">
                  {filters.categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.category?.includes(category) || false}
                        onChange={() => toggleFilter('category', category)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">
                        {category.replace('-', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Material Filter */}
              <div className="filter-group">
                <label className="filter-group-title">Material</label>
                <div className="space-y-2">
                  {filters.materials.map(material => (
                    <label key={material} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.material?.includes(material) || false}
                        onChange={() => toggleFilter('material', material)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{material}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Standard Filter */}
              <div className="filter-group">
                <label className="filter-group-title">Standard</label>
                <div className="space-y-2">
                  {filters.standards.map(standard => (
                    <label key={standard} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.standard?.includes(standard) || false}
                        onChange={() => toggleFilter('standard', standard)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{standard}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Fasteners & Components
                </h1>
                <p className="text-gray-600">
                  {filteredProducts.length} products found
                </p>
              </div>

              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden btn btn-outline"
                >
                  <FunnelIcon className="h-4 w-4 mr-2" />
                  Filters
                </button>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="rating">Sort by Rating</option>
                </select>

                {/* View mode */}
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                  >
                    <Squares2X2Icon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                  >
                    <ListBulletIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`product-card ${viewMode === 'list' ? 'flex' : ''}`}
                >
                  {/* Product Image */}
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                    <div className="product-card-image">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.isNew && (
                        <span className="badge badge-success">New</span>
                      )}
                      {product.onSale && (
                        <span className="badge badge-warning">Sale</span>
                      )}
                      {!product.inStock && (
                        <span className="badge badge-error">Out of Stock</span>
                      )}
                    </div>

                    {/* Favorite button */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                    >
                      {favorites.includes(product.id) ? (
                        <HeartSolidIcon className="h-4 w-4 text-red-500" />
                      ) : (
                        <HeartIcon className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="product-card-content flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="product-card-title">
                        <Link href={`/products/${product.id}`} className="hover:text-blue-600 transition-colors">
                          {product.name}
                        </Link>
                      </h3>
                    </div>

                    <p className="text-xs text-gray-500 mb-2">{product.partNumber}</p>
                    <p className="product-card-description">{product.description}</p>

                    {/* Specifications */}
                    <div className="product-card-specs">
                      <div className="product-card-spec">
                        <span className="product-card-spec-label">Thread:</span>
                        <span className="product-card-spec-value">{product.thread}</span>
                      </div>
                      <div className="product-card-spec">
                        <span className="product-card-spec-label">Material:</span>
                        <span className="product-card-spec-value">{product.material}</span>
                      </div>
                      <div className="product-card-spec">
                        <span className="product-card-spec-label">Standard:</span>
                        <span className="product-card-spec-value">{product.standard}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Footer */}
                    <div className="product-card-footer">
                      <div>
                        <div className="product-card-price">
                          €{product.price.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Min. qty: {product.minOrderQty}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/products/${product.id}`}
                          className="btn btn-outline btn-sm"
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View
                        </Link>
                        <button
                          disabled={!product.inStock}
                          className="btn btn-primary btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ShoppingCartIcon className="h-4 w-4 mr-1" />
                          Add to Cart
                        </button>
                      </div>
                    </div>

                    {/* Stock indicator */}
                    {product.inStock && (
                      <div className="flex items-center mt-2 text-xs text-green-600">
                        <CheckIcon className="h-3 w-3 mr-1" />
                        In stock ({product.stockQuantity} pcs)
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* No results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedFilters({})
                    setSearchQuery('')
                  }}
                  className="btn btn-primary mt-4"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}