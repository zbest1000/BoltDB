'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  SparklesIcon, 
  MagnifyingGlassIcon, 
  CubeIcon,
  DocumentArrowDownIcon 
} from '@heroicons/react/24/outline'
import { AnimatedButton } from '@/components/ui/AnimatedButton'

export function HeroSection() {
  const features = [
    {
      icon: SparklesIcon,
      title: 'Professional Grade',
      description: 'Industrial-quality fasteners for demanding applications'
    },
    {
      icon: CubeIcon,
      title: '50,000+ Components',
      description: 'Comprehensive database of fasteners and specifications'
    },
    {
      icon: DocumentArrowDownIcon,
      title: 'Technical Support',
      description: 'Expert guidance and CAD downloads available'
    }
  ]

  const stats = [
    { value: '50,000+', label: 'Products Available' },
    { value: '500+', label: 'Standards Covered' },
    { value: '24/7', label: 'Technical Support' },
    { value: '99.9%', label: 'In-Stock Rate' }
  ]

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 lg:py-24">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Professional{' '}
              <span className="text-blue-600">Fastener Solutions</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Discover precision-engineered fasteners with comprehensive specifications, 
              technical drawings, and instant availability. Your trusted partner for industrial components.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link href="/products">
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  icon={<MagnifyingGlassIcon className="w-5 h-5" />}
                  iconPosition="left"
                  className="px-8 py-4 text-lg"
                >
                  Browse Products
                </AnimatedButton>
              </Link>
              
              <Link href="/technical">
                <AnimatedButton
                  variant="outline"
                  size="lg"
                  icon={<DocumentArrowDownIcon className="w-5 h-5" />}
                  iconPosition="left"
                  className="px-8 py-4 text-lg"
                >
                  Technical Resources
                </AnimatedButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Statistics Bar */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="flex flex-col"
              >
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm lg:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose MechHub?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional-grade fastener solutions backed by comprehensive technical data and expert support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.2 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}