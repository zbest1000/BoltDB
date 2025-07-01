'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CubeIcon,
  CloudArrowDownIcon,
  Cog6ToothIcon,
  DocumentArrowDownIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  PlayIcon,
  StopIcon,
  FolderIcon,
  ServerIcon,
  LinkIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

interface CADSoftware {
  id: string
  name: string
  icon: string
  version: string
  status: 'connected' | 'disconnected' | 'installing' | 'error'
  features: string[]
  lastSync: string
}

interface CADModel {
  id: string
  partNumber: string
  name: string
  fileType: 'STEP' | 'IGES' | 'STL' | 'SLDPRT' | 'F3D'
  size: string
  lastModified: string
  downloadCount: number
  status: 'available' | 'downloading' | 'downloaded'
}

export function CADIntegration() {
  const [activeTab, setActiveTab] = useState<'software' | 'library' | 'sync'>('software')
  const [cadSoftware, setCadSoftware] = useState<CADSoftware[]>([
    {
      id: 'solidworks',
      name: 'SolidWorks',
      icon: '🔧',
      version: '2024 SP2',
      status: 'connected',
      features: ['Part Library', 'Direct Insert', 'Toolbox Integration', 'Material Properties'],
      lastSync: '2024-01-15T14:30:00Z'
    },
    {
      id: 'fusion360',
      name: 'Autodesk Fusion 360',
      icon: '🎯',
      version: '2.0.19345',
      status: 'connected',
      features: ['Part Library', 'Direct Insert', 'Material Database', 'Simulation Data'],
      lastSync: '2024-01-15T13:45:00Z'
    },
    {
      id: 'inventor',
      name: 'Autodesk Inventor',
      icon: '⚙️',
      version: '2024.1',
      status: 'disconnected',
      features: ['Part Library', 'iLogic Integration', 'Content Center'],
      lastSync: '2024-01-10T09:15:00Z'
    },
    {
      id: 'creo',
      name: 'PTC Creo',
      icon: '🔩',
      version: '9.0.2.0',
      status: 'installing',
      features: ['Part Library', 'Family Tables', 'Material Assignment'],
      lastSync: 'Never'
    }
  ])

  const [cadModels, setCadModels] = useState<CADModel[]>([
    {
      id: '1',
      partNumber: 'DIN912-M8x25-SS316',
      name: 'Socket Head Cap Screw M8x25',
      fileType: 'STEP',
      size: '245 KB',
      lastModified: '2024-01-10T10:30:00Z',
      downloadCount: 1250,
      status: 'downloaded'
    },
    {
      id: '2',
      partNumber: 'ISO4762-M10x30-CS',
      name: 'Socket Head Cap Screw M10x30',
      fileType: 'SLDPRT',
      size: '312 KB',
      lastModified: '2024-01-12T15:20:00Z',
      downloadCount: 890,
      status: 'available'
    },
    {
      id: '3',
      partNumber: 'DIN934-M8-ZP',
      name: 'Hex Nut M8 Zinc Plated',
      fileType: 'F3D',
      size: '156 KB',
      lastModified: '2024-01-08T12:45:00Z',
      downloadCount: 2100,
      status: 'downloading'
    }
  ])

  const [syncSettings, setSyncSettings] = useState({
    autoSync: true,
    syncInterval: '1hour',
    includeSpecs: true,
    includeMaterials: true,
    includeTextures: false,
    compressFiles: true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600'
      case 'disconnected': return 'text-red-600'
      case 'installing': return 'text-yellow-600'
      case 'error': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircleIcon className="h-5 w-5" />
      case 'disconnected': return <ExclamationTriangleIcon className="h-5 w-5" />
      case 'installing': return <ArrowPathIcon className="h-5 w-5 animate-spin" />
      case 'error': return <ExclamationTriangleIcon className="h-5 w-5" />
      default: return <Cog6ToothIcon className="h-5 w-5" />
    }
  }

  const handleConnect = (softwareId: string) => {
    setCadSoftware(prev => prev.map(software => 
      software.id === softwareId 
        ? { ...software, status: 'installing' }
        : software
    ))
    
    // Simulate connection process
    setTimeout(() => {
      setCadSoftware(prev => prev.map(software => 
        software.id === softwareId 
          ? { ...software, status: 'connected', lastSync: new Date().toISOString() }
          : software
      ))
    }, 3000)
  }

  const handleDownload = (modelId: string) => {
    setCadModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, status: 'downloading' }
        : model
    ))
    
    // Simulate download
    setTimeout(() => {
      setCadModels(prev => prev.map(model => 
        model.id === modelId 
          ? { ...model, status: 'downloaded' }
          : model
      ))
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CAD Integration</h1>
              <p className="text-gray-600 mt-1">
                Connect your CAD software for seamless part library access and direct insertion
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn btn-outline">
                <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                Plugin Guide
              </button>
              <button className="btn btn-primary">
                <CloudArrowDownIcon className="h-5 w-5 mr-2" />
                Download Plugin
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-600">Connected CAD</p>
                  <p className="text-2xl font-bold text-green-900">
                    {cadSoftware.filter(s => s.status === 'connected').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center">
                <CubeIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-600">CAD Models</p>
                  <p className="text-2xl font-bold text-blue-900">{cadModels.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
              <div className="flex items-center">
                <CloudArrowDownIcon className="h-8 w-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-purple-600">Downloads</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {cadModels.reduce((sum, model) => sum + model.downloadCount, 0)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4">
              <div className="flex items-center">
                <ServerIcon className="h-8 w-8 text-orange-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-orange-600">Sync Status</p>
                  <p className="text-2xl font-bold text-orange-900">Live</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'software', name: 'CAD Software', icon: Cog6ToothIcon },
              { id: 'library', name: 'Model Library', icon: FolderIcon },
              { id: 'sync', name: 'Sync Settings', icon: ArrowPathIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* CAD Software Tab */}
        {activeTab === 'software' && (
          <div className="space-y-6">
            {cadSoftware.map((software) => (
              <motion.div
                key={software.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">{software.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{software.name}</h3>
                      <p className="text-sm text-gray-600">Version {software.version}</p>
                      <div className="flex items-center mt-2">
                        <div className={`flex items-center ${getStatusColor(software.status)}`}>
                          {getStatusIcon(software.status)}
                          <span className="ml-2 text-sm font-medium capitalize">
                            {software.status}
                          </span>
                        </div>
                        {software.lastSync !== 'Never' && (
                          <span className="ml-4 text-sm text-gray-500">
                            Last sync: {new Date(software.lastSync).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {software.status === 'connected' ? (
                      <>
                        <button className="btn btn-outline btn-sm">
                          <ArrowPathIcon className="h-4 w-4 mr-2" />
                          Sync Now
                        </button>
                        <button className="btn btn-outline btn-sm">
                          <Cog6ToothIcon className="h-4 w-4 mr-2" />
                          Configure
                        </button>
                      </>
                    ) : software.status === 'installing' ? (
                      <button disabled className="btn btn-outline btn-sm">
                        <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
                        Installing...
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleConnect(software.id)}
                        className="btn btn-primary btn-sm"
                      >
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Connect
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Features */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Available Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {software.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Installation Guide */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start">
                <ShieldCheckIcon className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-blue-900 mb-2">Plugin Installation</h3>
                  <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
                    <li>Download the BoltDB plugin for your CAD software</li>
                    <li>Close your CAD application completely</li>
                    <li>Run the installer as administrator</li>
                    <li>Restart your CAD software</li>
                    <li>Enter your BoltDB API key when prompted</li>
                    <li>The BoltDB toolbar will appear in your CAD interface</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Model Library Tab */}
        {activeTab === 'library' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">CAD Model Library</h3>
                  <div className="flex items-center space-x-4">
                    <select className="form-select text-sm">
                      <option>All File Types</option>
                      <option>STEP</option>
                      <option>IGES</option>
                      <option>SLDPRT</option>
                      <option>F3D</option>
                    </select>
                    <button className="btn btn-outline btn-sm">
                      <CloudArrowDownIcon className="h-4 w-4 mr-2" />
                      Bulk Download
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Part Number</th>
                      <th>Name</th>
                      <th>File Type</th>
                      <th>Size</th>
                      <th>Downloads</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cadModels.map((model) => (
                      <tr key={model.id} className="hover:bg-gray-50">
                        <td>
                          <div className="flex items-center">
                            <CubeIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="font-medium text-gray-900">{model.partNumber}</span>
                          </div>
                        </td>
                        <td className="text-gray-900">{model.name}</td>
                        <td>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {model.fileType}
                          </span>
                        </td>
                        <td className="text-gray-600">{model.size}</td>
                        <td className="text-gray-600">{model.downloadCount.toLocaleString()}</td>
                        <td>
                          {model.status === 'downloaded' && (
                            <span className="inline-flex items-center text-green-600 text-sm">
                              <CheckCircleIcon className="h-4 w-4 mr-1" />
                              Downloaded
                            </span>
                          )}
                          {model.status === 'downloading' && (
                            <span className="inline-flex items-center text-blue-600 text-sm">
                              <ArrowPathIcon className="h-4 w-4 mr-1 animate-spin" />
                              Downloading
                            </span>
                          )}
                          {model.status === 'available' && (
                            <span className="text-gray-600 text-sm">Available</span>
                          )}
                        </td>
                        <td>
                          <div className="flex items-center space-x-2">
                            {model.status === 'available' && (
                              <button
                                onClick={() => handleDownload(model.id)}
                                className="btn btn-primary btn-sm"
                              >
                                Download
                              </button>
                            )}
                            {model.status === 'downloaded' && (
                              <button className="btn btn-outline btn-sm">
                                <PlayIcon className="h-4 w-4 mr-1" />
                                Insert
                              </button>
                            )}
                            <button className="btn btn-outline btn-sm">
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Sync Settings Tab */}
        {activeTab === 'sync' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Synchronization Settings</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Auto Sync</h4>
                    <p className="text-sm text-gray-600">Automatically sync CAD models and updates</p>
                  </div>
                  <button
                    onClick={() => setSyncSettings(prev => ({ ...prev, autoSync: !prev.autoSync }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      syncSettings.autoSync ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        syncSettings.autoSync ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Sync Interval
                  </label>
                  <select
                    value={syncSettings.syncInterval}
                    onChange={(e) => setSyncSettings(prev => ({ ...prev, syncInterval: e.target.value }))}
                    className="form-select"
                  >
                    <option value="15min">Every 15 minutes</option>
                    <option value="1hour">Every hour</option>
                    <option value="6hours">Every 6 hours</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Include in Sync</h4>
                  
                  {[
                    { key: 'includeSpecs', label: 'Technical Specifications', desc: 'Material properties, dimensions, tolerances' },
                    { key: 'includeMaterials', label: 'Material Assignments', desc: 'Automatic material assignment in CAD' },
                    { key: 'includeTextures', label: 'Textures & Appearances', desc: 'Visual materials and surface finishes' },
                    { key: 'compressFiles', label: 'Compress Files', desc: 'Reduce file size for faster downloads' }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          type="checkbox"
                          checked={syncSettings[setting.key as keyof typeof syncSettings] as boolean}
                          onChange={(e) => setSyncSettings(prev => ({ 
                            ...prev, 
                            [setting.key]: e.target.checked 
                          }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                      <div className="ml-3">
                        <label className="text-sm font-medium text-gray-900">
                          {setting.label}
                        </label>
                        <p className="text-sm text-gray-600">{setting.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button className="btn btn-outline">Cancel</button>
                  <button className="btn btn-primary">Save Settings</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}