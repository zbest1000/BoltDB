'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MagnifyingGlassIcon,
  SparklesIcon,
  MicrophoneIcon,
  DocumentTextIcon,
  CubeIcon,
  LightBulbIcon,
  ClockIcon,
  StarIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  ChatBubbleLeftRightIcon,
  BeakerIcon,
  CalculatorIcon,
  PhotoIcon
} from '@heroicons/react/24/outline'

interface SearchResult {
  id: string
  partNumber: string
  name: string
  description: string
  specifications: Record<string, string>
  price: number
  availability: number
  matchScore: number
  matchReasons: string[]
  image?: string
  supplier: string
  leadTime: string
}

interface SearchSuggestion {
  id: string
  text: string
  type: 'recent' | 'popular' | 'ai-suggestion'
  confidence?: number
}

export function AISearch() {
  const [query, setQuery] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchMode, setSearchMode] = useState<'natural' | 'parametric' | 'visual'>('natural')
  const [results, setResults] = useState<SearchResult[]>([])
  const [aiInsights, setAiInsights] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestions: SearchSuggestion[] = [
    { id: '1', text: 'M8 stainless steel screws for marine applications', type: 'ai-suggestion', confidence: 0.95 },
    { id: '2', text: 'High temperature resistant fasteners up to 400°C', type: 'ai-suggestion', confidence: 0.92 },
    { id: '3', text: 'Food grade bolts FDA approved', type: 'recent' },
    { id: '4', text: 'Socket head cap screws DIN 912', type: 'popular' },
    { id: '5', text: 'Corrosion resistant hex nuts for chemical processing', type: 'ai-suggestion', confidence: 0.88 },
    { id: '6', text: 'Metric threaded rods M10 x 1.5', type: 'recent' }
  ]

  const parametricFilters = [
    { name: 'Thread Size', type: 'select', options: ['M3', 'M4', 'M5', 'M6', 'M8', 'M10', 'M12', 'M16', 'M20'] },
    { name: 'Length (mm)', type: 'range', min: 5, max: 200 },
    { name: 'Material', type: 'multi-select', options: ['Stainless Steel 316', 'Stainless Steel 304', 'Carbon Steel', 'Aluminum', 'Brass'] },
    { name: 'Coating', type: 'select', options: ['None', 'Zinc Plated', 'Black Oxide', 'Galvanized', 'Passivated'] },
    { name: 'Standard', type: 'multi-select', options: ['DIN', 'ISO', 'ANSI', 'JIS', 'BS'] },
    { name: 'Grade', type: 'select', options: ['A2', 'A4', '8.8', '10.9', '12.9'] }
  ]

  const sampleResults: SearchResult[] = [
    {
      id: '1',
      partNumber: 'DIN912-M8x25-SS316',
      name: 'Socket Head Cap Screw M8x25 Stainless Steel 316',
      description: 'High-quality stainless steel socket head cap screw with excellent corrosion resistance, ideal for marine and food processing applications.',
      specifications: {
        'Thread': 'M8 x 25',
        'Material': 'Stainless Steel 316',
        'Standard': 'DIN 912',
        'Grade': 'A4-80',
        'Head Type': 'Socket Head'
      },
      price: 0.65,
      availability: 1250,
      matchScore: 0.97,
      matchReasons: ['Exact thread match', 'Material matches marine requirements', 'Corrosion resistance specified'],
      supplier: 'BoltCorp Industries',
      leadTime: '2-3 days'
    },
    {
      id: '2',
      partNumber: 'ISO4762-M8x30-SS316L',
      name: 'Socket Head Cap Screw M8x30 Stainless Steel 316L',
      description: 'Premium grade socket head cap screw with superior corrosion resistance and low carbon content for critical applications.',
      specifications: {
        'Thread': 'M8 x 30',
        'Material': 'Stainless Steel 316L',
        'Standard': 'ISO 4762',
        'Grade': 'A4-80',
        'Head Type': 'Socket Head'
      },
      price: 0.72,
      availability: 890,
      matchScore: 0.94,
      matchReasons: ['Close thread match', 'Superior marine grade material', 'Low carbon for enhanced properties'],
      supplier: 'FastenerPlus',
      leadTime: '1-2 days'
    }
  ]

  useEffect(() => {
    if (query.length > 3) {
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [query])

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsAnalyzing(true)
    setShowSuggestions(false)

    // Simulate AI processing
    setTimeout(() => {
      setResults(sampleResults)
      setAiInsights([
        'Based on your query for marine applications, I recommend stainless steel 316 or 316L for maximum corrosion resistance.',
        'Consider the thread length - M8x25 vs M8x30 depending on your application thickness.',
        'Both DIN 912 and ISO 4762 are functionally equivalent for socket head cap screws.'
      ])
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleVoiceSearch = () => {
    setIsListening(!isListening)
    // In real implementation, this would use Web Speech API
    if (!isListening) {
      setTimeout(() => {
        setQuery('Find M8 stainless steel screws for marine application with high corrosion resistance')
        setIsListening(false)
      }, 3000)
    }
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text)
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AI-Powered Component Search
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Describe your requirements in natural language and let AI find the perfect components
            </p>

            {/* Search Mode Tabs */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
                {[
                  { id: 'natural', name: 'Natural Language', icon: ChatBubbleLeftRightIcon },
                  { id: 'parametric', name: 'Parametric', icon: AdjustmentsHorizontalIcon },
                  { id: 'visual', name: 'Visual Search', icon: PhotoIcon }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setSearchMode(mode.id as any)}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      searchMode === mode.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <mode.icon className="h-4 w-4 mr-2" />
                    {mode.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Interface */}
            <div className="max-w-4xl mx-auto relative">
              {searchMode === 'natural' && (
                <div className="relative">
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="Describe what you need: 'Find M8 stainless steel screws with high corrosion resistance for marine application'"
                      className="w-full pl-12 pr-20 py-4 text-lg border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <SparklesIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-blue-500" />
                    
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <button
                        onClick={handleVoiceSearch}
                        className={`p-2 rounded-lg transition-colors ${
                          isListening 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <MicrophoneIcon className={`h-5 w-5 ${isListening ? 'animate-pulse' : ''}`} />
                      </button>
                      <button
                        onClick={handleSearch}
                        disabled={isAnalyzing}
                        className="btn btn-primary px-6"
                      >
                        {isAnalyzing ? (
                          <div className="flex items-center">
                            <SparklesIcon className="h-5 w-5 mr-2 animate-spin" />
                            Analyzing...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                            Search
                          </div>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Suggestions Dropdown */}
                  <AnimatePresence>
                    {showSuggestions && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                      >
                        <div className="p-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Suggestions</h4>
                          <div className="space-y-2">
                            {suggestions.map((suggestion) => (
                              <button
                                key={suggestion.id}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    {suggestion.type === 'ai-suggestion' && (
                                      <SparklesIcon className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                                    )}
                                    {suggestion.type === 'recent' && (
                                      <ClockIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                                    )}
                                    {suggestion.type === 'popular' && (
                                      <StarIcon className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                                    )}
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                      {suggestion.text}
                                    </span>
                                  </div>
                                  {suggestion.confidence && (
                                    <span className="text-xs text-blue-600 font-medium">
                                      {Math.round(suggestion.confidence * 100)}% match
                                    </span>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {searchMode === 'parametric' && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Parametric Search</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {parametricFilters.map((filter) => (
                      <div key={filter.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {filter.name}
                        </label>
                        {filter.type === 'select' && (
                          <select className="form-select">
                            <option>Any</option>
                            {filter.options?.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        )}
                        {filter.type === 'multi-select' && (
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {filter.options?.map((option) => (
                              <label key={option} className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                                <span className="ml-2 text-sm text-gray-700">{option}</span>
                              </label>
                            ))}
                          </div>
                        )}
                        {filter.type === 'range' && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <input
                                type="number"
                                placeholder="Min"
                                className="form-input flex-1"
                                min={filter.min}
                                max={filter.max}
                              />
                              <span className="text-gray-500">to</span>
                              <input
                                type="number"
                                placeholder="Max"
                                className="form-input flex-1"
                                min={filter.min}
                                max={filter.max}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-6">
                    <button className="btn btn-primary">
                      <CalculatorIcon className="h-5 w-5 mr-2" />
                      Calculate Results
                    </button>
                  </div>
                </div>
              )}

              {searchMode === 'visual' && (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                  <PhotoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Visual Search</h3>
                  <p className="text-gray-600 mb-6">
                    Upload an image or drawing of the component you need
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors cursor-pointer">
                    <div className="space-y-2">
                      <div className="flex justify-center">
                        <DocumentTextIcon className="h-12 w-12 text-gray-400" />
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                          Click to upload
                        </span> or drag and drop
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, PDF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* AI Insights */}
          {aiInsights.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <LightBulbIcon className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-blue-900 mb-3">AI Insights</h3>
                  <div className="space-y-2">
                    {aiInsights.map((insight, index) => (
                      <p key={index} className="text-sm text-blue-800">
                        • {insight}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Search Results ({results.length} found)
              </h2>
              <div className="flex items-center space-x-4">
                <select className="form-select text-sm">
                  <option>Best Match</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Availability</option>
                </select>
              </div>
            </div>

            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {result.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Part Number: {result.partNumber}
                        </p>
                        <div className="flex items-center mb-3">
                          <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium mr-3">
                            <BeakerIcon className="h-4 w-4 mr-1" />
                            {Math.round(result.matchScore * 100)}% match
                          </div>
                          <span className="text-sm text-gray-600">
                            by {result.supplier}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          €{result.price.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">per piece</div>
                        <div className="text-sm text-green-600 mt-1">
                          {result.availability} in stock
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{result.description}</p>

                    {/* Match Reasons */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Why this matches:</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.matchReasons.map((reason, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {reason}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {Object.entries(result.specifications).map(([key, value]) => (
                        <div key={key} className="text-sm">
                          <span className="text-gray-500">{key}:</span>
                          <span className="ml-1 font-medium text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        Lead time: {result.leadTime}
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="btn btn-outline btn-sm">
                          <CubeIcon className="h-4 w-4 mr-1" />
                          View CAD
                        </button>
                        <button className="btn btn-outline btn-sm">
                          <DocumentTextIcon className="h-4 w-4 mr-1" />
                          Datasheet
                        </button>
                        <button className="btn btn-primary btn-sm">
                          Add to BOM
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}