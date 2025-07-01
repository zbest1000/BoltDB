'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  HeartIcon,
  ShoppingCartIcon,
  ShareIcon,
  PrinterIcon,
  DocumentArrowDownIcon,
  InformationCircleIcon,
  StarIcon,
  CheckIcon,
  TruckIcon,
  ShieldCheckIcon,
  CubeIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

// Mock product data - in real app this would come from API
const productData = {
  id: 1,
  name: 'DIN 963 Screw with Countersunk Head, Slotted Recess',
  partNumber: 'DIN963-M8x25-SS316',
  description: 'High-quality stainless steel countersunk screw with slotted drive for flush mounting applications. Ideal for marine environments, food processing equipment, and architectural applications where corrosion resistance is critical.',
  images: [
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600'
  ],
  price: 0.45,
  currency: 'EUR',
  inStock: true,
  stockQuantity: 1250,
  minOrderQty: 10,
  rating: 4.8,
  reviews: 24,
  category: 'Screws',
  subcategory: 'Countersunk Screws',
  
  // Technical specifications
  specifications: {
    'Thread': 'M8 x 25',
    'Standard': 'DIN 963',
    'Material': 'Stainless Steel 316',
    'Head Type': 'Countersunk',
    'Drive Type': 'Slotted',
    'Grade': 'A4-80',
    'Coating': 'None',
    'Length': '25 mm',
    'Head Diameter': '16 mm',
    'Head Height': '4.4 mm',
    'Slot Width': '1.6 mm',
    'Slot Depth': '2.2 mm',
    'Thread Pitch': '1.25 mm',
    'Tensile Strength': '800 N/mm²',
    'Proof Load': '600 N/mm²'
  },
  
  // Additional details
  features: [
    'Excellent corrosion resistance',
    'Suitable for marine environments',
    'Food-grade stainless steel',
    'Flush mounting capability',
    'High tensile strength',
    'Temperature resistant up to 400°C'
  ],
  
  applications: [
    'Marine hardware',
    'Food processing equipment',
    'Architectural applications',
    'Chemical processing',
    'Pharmaceutical equipment',
    'Clean room applications'
  ],
  
  certifications: [
    'ISO 9001:2015',
    'ASTM A193',
    'DIN 963',
    'FDA Approved'
  ],
  
  downloads: [
    { name: '3D CAD Model (STEP)', size: '245 KB', type: 'step' },
    { name: '2D Drawing (PDF)', size: '125 KB', type: 'pdf' },
    { name: 'Technical Datasheet', size: '890 KB', type: 'pdf' },
    { name: 'Material Certificate', size: '156 KB', type: 'pdf' }
  ]
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(productData.minOrderQty)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState('specifications')

  const tabs = [
    { id: 'specifications', name: 'Specifications' },
    { id: 'features', name: 'Features & Applications' },
    { id: 'downloads', name: 'Downloads' },
    { id: 'reviews', name: 'Reviews' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="breadcrumb">
            <Link href="/" className="breadcrumb-item">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link href="/products" className="breadcrumb-item">Products</Link>
            <span className="breadcrumb-separator">/</span>
            <Link href={`/products?category=${productData.category.toLowerCase()}`} className="breadcrumb-item">
              {productData.category}
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="text-gray-900 font-medium truncate">{productData.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg border border-gray-200 overflow-hidden">
              <Image
                src={productData.images[selectedImage]}
                alt={productData.name}
                width={600}
                height={600}
                className="w-full h-full object-contain p-8"
              />
            </div>
            
            {/* Thumbnail images */}
            <div className="grid grid-cols-4 gap-4">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg border-2 overflow-hidden transition-colors ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${productData.name} view ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  {productData.name}
                </h1>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">Part Number: {productData.partNumber}</p>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(productData.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  {productData.rating} ({productData.reviews} reviews)
                </span>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {productData.description}
              </p>
            </div>

            {/* Key Specifications */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Thread:</span>
                  <span className="font-medium">{productData.specifications.Thread}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Material:</span>
                  <span className="font-medium">{productData.specifications.Material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Standard:</span>
                  <span className="font-medium">{productData.specifications.Standard}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Grade:</span>
                  <span className="font-medium">{productData.specifications.Grade}</span>
                </div>
              </div>
            </div>

            {/* Pricing and Stock */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-blue-600">
                    €{productData.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">per piece</div>
                </div>
                
                {productData.inStock ? (
                  <div className="flex items-center text-green-600">
                    <CheckIcon className="h-5 w-5 mr-2" />
                    <span className="font-medium">In Stock ({productData.stockQuantity} pcs)</span>
                  </div>
                ) : (
                  <div className="text-red-600 font-medium">Out of Stock</div>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity (min. {productData.minOrderQty})
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      min={productData.minOrderQty}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(productData.minOrderQty, parseInt(e.target.value) || productData.minOrderQty))}
                      className="form-input w-24"
                    />
                    <div className="text-sm text-gray-500">
                      Total: €{(productData.price * quantity).toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    disabled={!productData.inStock}
                    className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                  <button className="btn btn-outline">
                    <ShareIcon className="h-5 w-5 mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4">
              <button className="btn btn-outline text-sm">
                <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                CAD Files
              </button>
              <button className="btn btn-outline text-sm">
                <PrinterIcon className="h-4 w-4 mr-2" />
                Print
              </button>
              <button className="btn btn-outline text-sm">
                <InformationCircleIcon className="h-4 w-4 mr-2" />
                Tech Support
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'specifications' && (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Technical Specifications</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {Object.entries(productData.specifications).map(([key, value]) => (
                    <div key={key} className="px-6 py-4 flex justify-between">
                      <span className="text-gray-500 font-medium">{key}</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
                  <ul className="space-y-3">
                    {productData.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Applications</h3>
                  <ul className="space-y-3">
                    {productData.applications.map((application, index) => (
                      <li key={index} className="flex items-start">
                        <CubeIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{application}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'downloads' && (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Available Downloads</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {productData.downloads.map((download, index) => (
                    <div key={index} className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <DocumentArrowDownIcon className="h-6 w-6 text-gray-400 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">{download.name}</div>
                          <div className="text-sm text-gray-500">{download.size}</div>
                        </div>
                      </div>
                      <button className="btn btn-outline btn-sm">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
                <div className="text-center py-8 text-gray-500">
                  <StarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Customer reviews coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}