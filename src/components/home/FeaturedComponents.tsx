'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  StarIcon, 
  ArrowDownTrayIcon,
  EyeIcon,
  CubeIcon 
} from '@heroicons/react/24/outline'
import { AnimatedCard } from '@/components/ui/AnimatedCard'

export function FeaturedComponents() {
  const featuredComponents = [
    {
      id: 1,
      name: 'M8 x 25 Hex Head Cap Screw',
      material: 'Stainless Steel 316',
      standard: 'ISO 4762',
      price: '$0.85',
      image: '/api/placeholder/component1.jpg',
      rating: 4.8,
      downloads: 1240,
      views: 5600,
      description: 'High-strength hex head cap screw with full thread, ideal for structural applications'
    },
    {
      id: 2,
      name: 'M10 x 30 Socket Head Cap Screw',
      material: 'Alloy Steel',
      standard: 'ISO 4762',
      price: '$1.25',
      image: '/api/placeholder/component2.jpg',
      rating: 4.9,
      downloads: 980,
      views: 4200,
      description: 'Precision socket head cap screw for high-torque applications'
    },
    {
      id: 3,
      name: 'M6 Hex Nut',
      material: 'Carbon Steel',
      standard: 'ISO 4032',
      price: '$0.15',
      image: '/api/placeholder/component3.jpg',
      rating: 4.7,
      downloads: 2100,
      views: 8900,
      description: 'Standard hex nut for general purpose applications'
    },
    {
      id: 4,
      name: 'M12 x 80 Hex Bolt',
      material: 'Carbon Steel',
      standard: 'ISO 4017',
      price: '$2.45',
      image: '/api/placeholder/component4.jpg',
      rating: 4.8,
      downloads: 567,
      views: 3400,
      description: 'Heavy-duty hex bolt for structural connections'
    }
  ]

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
            Featured Components
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular fasteners and components, trusted by engineers worldwide
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredComponents.map((component, index) => (
            <AnimatedCard
              key={component.id}
              className="p-6 group cursor-pointer"
              hover={true}
              magnetic={false}
              tilt={false}
              href={`/components/${component.id}`}
            >
                <div className="relative">
                  {/* Placeholder for component image */}
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <CubeIcon className="w-16 h-16 text-gray-400" />
                  </div>
                  
                  {/* Rating badge */}
                  <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center shadow-sm">
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{component.rating}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                    {component.name}
                  </h3>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>Material: {component.material}</div>
                    <div>Standard: {component.standard}</div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {component.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-bold text-primary-600">
                      {component.price}
                    </span>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                        {component.downloads}
                      </div>
                      <div className="flex items-center">
                        <EyeIcon className="w-4 h-4 mr-1" />
                        {component.views}
                      </div>
                    </div>
                  </div>
                </div>
            </AnimatedCard>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/search"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
          >
            View All Components
          </Link>
        </motion.div>
      </div>
    </section>
  )
}