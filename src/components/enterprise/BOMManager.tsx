'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DocumentArrowUpIcon,
  DocumentArrowDownIcon,
  MagnifyingGlassIcon,
  CubeIcon,
  ClockIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  SparklesIcon,
  ShareIcon,
  PrinterIcon,
  CloudArrowUpIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

interface BOMItem {
  id: string
  partNumber: string
  description: string
  quantity: number
  specification: string
  preferredSupplier?: string
  alternatives: Array<{
    partNumber: string
    supplier: string
    price: number
    leadTime: string
    availability: number
    datasheet?: string
    cadModel?: string
  }>
  status: 'sourced' | 'pending' | 'unavailable' | 'obsolete'
  category: string
  urgency: 'low' | 'medium' | 'high' | 'critical'
  lastUpdated: string
}

export function BOMManager() {
  const [bomItems, setBomItems] = useState<BOMItem[]>([
    {
      id: '1',
      partNumber: 'M8x25-SHCS-SS316',
      description: 'Socket Head Cap Screw M8x25 Stainless Steel 316',
      quantity: 50,
      specification: 'DIN 912, Grade A4-80, Passivated',
      preferredSupplier: 'BoltCorp Industries',
      alternatives: [
        {
          partNumber: 'DIN912-M8x25-SS316',
          supplier: 'BoltCorp Industries',
          price: 0.65,
          leadTime: '2-3 days',
          availability: 1200,
          datasheet: '/docs/din912-datasheet.pdf',
          cadModel: '/cad/din912-m8x25.step'
        },
        {
          partNumber: 'ISO4762-M8x25-316',
          supplier: 'FastenerPlus',
          price: 0.58,
          leadTime: '5-7 days',
          availability: 850,
          datasheet: '/docs/iso4762-datasheet.pdf',
          cadModel: '/cad/iso4762-m8x25.step'
        },
        {
          partNumber: 'SHCS-M8x25-316L',
          supplier: 'TechBolt Solutions',
          price: 0.72,
          leadTime: '1-2 days',
          availability: 2500,
          datasheet: '/docs/shcs-datasheet.pdf',
          cadModel: '/cad/shcs-m8x25.step'
        }
      ],
      status: 'sourced',
      category: 'Fasteners',
      urgency: 'medium',
      lastUpdated: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      partNumber: 'BEAR-6205-2RS',
      description: 'Deep Groove Ball Bearing 6205-2RS',
      quantity: 8,
      specification: 'SKF or equivalent, 2RS seals, C3 clearance',
      alternatives: [
        {
          partNumber: '6205-2RS1-SKF',
          supplier: 'SKF Distribution',
          price: 12.50,
          leadTime: '1-2 weeks',
          availability: 45,
          datasheet: '/docs/6205-2rs-skf.pdf',
          cadModel: '/cad/6205-2rs.step'
        },
        {
          partNumber: '6205-DD-FAG',
          supplier: 'Schaeffler Group',
          price: 11.80,
          leadTime: '2-3 weeks',
          availability: 28,
          datasheet: '/docs/6205-dd-fag.pdf',
          cadModel: '/cad/6205-dd.step'
        }
      ],
      status: 'pending',
      category: 'Bearings',
      urgency: 'high',
      lastUpdated: '2024-01-14T15:45:00Z'
    }
  ])

  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [aiSearchQuery, setAiSearchQuery] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulate BOM file processing
      console.log('Processing BOM file:', file.name)
      // In real implementation, this would parse CSV/Excel files
    }
  }

  const handleAISearch = async () => {
    if (!aiSearchQuery.trim()) return
    
    setIsAnalyzing(true)
    // Simulate AI processing
    setTimeout(() => {
      setIsAnalyzing(false)
      // In real implementation, this would call AI service
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sourced': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'unavailable': return 'bg-red-100 text-red-800'
      case 'obsolete': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'text-red-600'
      case 'high': return 'text-orange-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const totalItems = bomItems.length
  const sourcedItems = bomItems.filter(item => item.status === 'sourced').length
  const pendingItems = bomItems.filter(item => item.status === 'pending').length
  const totalValue = bomItems.reduce((sum, item) => {
    const bestPrice = Math.min(...item.alternatives.map(alt => alt.price))
    return sum + (bestPrice * item.quantity)
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">BOM Manager</h1>
              <p className="text-gray-600 mt-1">
                AI-powered Bill of Materials management and sourcing automation
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-outline"
              >
                <DocumentArrowUpIcon className="h-5 w-5 mr-2" />
                Import BOM
              </button>
              <button className="btn btn-outline">
                <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                Export
              </button>
              <button className="btn btn-primary">
                <SparklesIcon className="h-5 w-5 mr-2" />
                Auto-Source
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center">
                <CubeIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-600">Total Items</p>
                  <p className="text-2xl font-bold text-blue-900">{totalItems}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-600">Sourced</p>
                  <p className="text-2xl font-bold text-green-900">{sourcedItems}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4">
              <div className="flex items-center">
                <ClockIcon className="h-8 w-8 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-yellow-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-900">{pendingItems}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-8 w-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-purple-600">Est. Value</p>
                  <p className="text-2xl font-bold text-purple-900">€{totalValue.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Search Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center mb-4">
            <SparklesIcon className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">AI-Powered Search & Analysis</h3>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Describe your requirements: 'Find M8 stainless steel screws with high corrosion resistance for marine application'"
                value={aiSearchQuery}
                onChange={(e) => setAiSearchQuery(e.target.value)}
                className="form-input pl-10 text-sm"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={handleAISearch}
              disabled={isAnalyzing}
              className="btn btn-primary"
            >
              {isAnalyzing ? (
                <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <SparklesIcon className="h-5 w-5 mr-2" />
              )}
              {isAnalyzing ? 'Analyzing...' : 'AI Search'}
            </button>
          </div>
          
          <div className="flex items-center space-x-6 mt-4 text-sm text-gray-600">
            <span>💡 Try: "Alternative suppliers for obsolete parts"</span>
            <span>🔍 "Cost optimization suggestions"</span>
            <span>⚡ "Critical path components analysis"</span>
          </div>
        </div>

        {/* BOM Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Bill of Materials</h3>
              <div className="flex items-center space-x-4">
                <button className="btn btn-outline btn-sm">
                  <ChartBarIcon className="h-4 w-4 mr-2" />
                  Analytics
                </button>
                <button className="btn btn-outline btn-sm">
                  <Cog6ToothIcon className="h-4 w-4 mr-2" />
                  Settings
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="w-12">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th>Part Number</th>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Best Price</th>
                  <th>Lead Time</th>
                  <th>Status</th>
                  <th>Urgency</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bomItems.map((item) => {
                  const bestAlternative = item.alternatives.reduce((best, current) => 
                    current.price < best.price ? current : best
                  )
                  
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems([...selectedItems, item.id])
                            } else {
                              setSelectedItems(selectedItems.filter(id => id !== item.id))
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td>
                        <div className="flex items-center">
                          <div>
                            <div className="font-medium text-gray-900">{item.partNumber}</div>
                            <div className="text-sm text-gray-500">{item.category}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="max-w-xs">
                          <div className="font-medium text-gray-900 truncate">{item.description}</div>
                          <div className="text-sm text-gray-500 truncate">{item.specification}</div>
                        </div>
                      </td>
                      <td className="font-medium">{item.quantity}</td>
                      <td>
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">€{bestAlternative.price.toFixed(2)}</div>
                          <div className="text-gray-500">{bestAlternative.supplier}</div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center text-sm text-gray-600">
                          <TruckIcon className="h-4 w-4 mr-1" />
                          {bestAlternative.leadTime}
                        </div>
                      </td>
                      <td>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <div className={`flex items-center text-sm font-medium ${getUrgencyColor(item.urgency)}`}>
                          {item.urgency === 'critical' && <ExclamationTriangleIcon className="h-4 w-4 mr-1" />}
                          {item.urgency}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                            onClick={() => {
                              // Open alternatives modal
                            }}
                          >
                            {item.alternatives.length} Alt{item.alternatives.length !== 1 ? 's' : ''}
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Cog6ToothIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Bar */}
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 px-6 py-4"
          >
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
              </span>
              <button className="btn btn-outline btn-sm">
                <ShareIcon className="h-4 w-4 mr-2" />
                Share
              </button>
              <button className="btn btn-outline btn-sm">
                <CloudArrowUpIcon className="h-4 w-4 mr-2" />
                Export to CAD
              </button>
              <button className="btn btn-primary btn-sm">
                <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                Get Quotes
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  )
}