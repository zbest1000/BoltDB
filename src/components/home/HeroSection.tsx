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
      title: 'AI-Powered Search',
      description: 'Intelligent search that understands engineering terminology'
    },
    {
      icon: CubeIcon,
      title: 'CAD Integration',
      description: 'Direct access to 3D models and technical drawings'
    },
    {
      icon: DocumentArrowDownIcon,
      title: 'Instant Downloads',
      description: 'Download specifications and CAD files immediately'
    }
  ]

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="block">Find the Perfect</span>
              <span className="block text-gradient">Fastener, Faster</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Professional fastener and component search engine with AI-powered recommendations, 
              comprehensive specifications, and instant CAD downloads.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/search">
              <AnimatedButton
                variant="secondary"
                size="lg"
                icon={<MagnifyingGlassIcon className="w-5 h-5" />}
                iconPosition="left"
                className="text-gray-900 bg-white hover:bg-gray-100"
              >
                Start Searching
              </AnimatedButton>
            </Link>
            
            <Link href="/ai-assistant">
              <AnimatedButton
                variant="outline"
                size="lg"
                icon={<SparklesIcon className="w-5 h-5" />}
                iconPosition="left"
                className="border-gray-300 text-white hover:bg-gray-800"
              >
                Try AI Assistant
              </AnimatedButton>
            </Link>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title} 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.6 + index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 rounded-lg mb-4"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    backgroundColor: "#2563eb"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative border-t border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "10M+", label: "Components" },
              { value: "500K+", label: "CAD Files" },
              { value: "1000+", label: "Standards" },
              { value: "99.9%", label: "Uptime" }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.8 + index * 0.1,
                  type: "spring",
                  stiffness: 120
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="text-3xl font-bold text-white"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.9 + index * 0.1 
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}