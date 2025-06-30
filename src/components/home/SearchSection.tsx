'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon, 
  SparklesIcon,
  FireIcon 
} from '@heroicons/react/24/outline'

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [aiEnhanced, setAiEnhanced] = useState(false)
  const router = useRouter()

  const popularSearches = [
    'M8 bolts',
    'Stainless steel screws',
    'Hex nuts',
    'Socket head cap screws',
    'Spring washers',
    'DIN 912',
    'ISO 4762',
    'Metric fasteners'
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const params = new URLSearchParams({
        q: searchQuery.trim(),
        ...(aiEnhanced && { aiEnhanced: 'true' })
      })
      router.push(`/search?${params.toString()}`)
    }
  }

  const handlePopularSearch = (query: string) => {
    setSearchQuery(query)
    const params = new URLSearchParams({
      q: query,
      ...(aiEnhanced && { aiEnhanced: 'true' })
    })
    router.push(`/search?${params.toString()}`)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Search Millions of Components
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find exactly what you need with our advanced search capabilities. 
            Use AI enhancement for smarter results and recommendations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-32 py-4 text-lg border-2 border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search for fasteners, bolts, screws, nuts..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 space-x-2">
                <label className="flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={aiEnhanced}
                    onChange={(e) => setAiEnhanced(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <SparklesIcon className="w-4 h-4 ml-1 text-purple-500" />
                  <span className="ml-1">AI</span>
                </label>
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          {/* Popular searches */}
          <div className="mt-8">
            <div className="flex items-center justify-center mb-4">
              <FireIcon className="w-5 h-5 text-orange-500 mr-2" />
              <span className="text-sm font-medium text-gray-600">Popular searches</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => handlePopularSearch(search)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors duration-200"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}