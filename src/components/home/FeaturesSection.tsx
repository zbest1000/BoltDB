import React from 'react'
import { motion } from 'framer-motion'
import { 
  SparklesIcon,
  MagnifyingGlassIcon,
  CubeIcon,
  ShieldCheckIcon,
  BoltIcon,
  ClockIcon,
  CloudArrowDownIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

export function FeaturesSection() {
  const features = [
    {
      icon: SparklesIcon,
      title: 'AI-Powered Intelligence',
      description: 'Advanced AI understands engineering context and provides intelligent search suggestions and component recommendations.',
      color: 'text-purple-600'
    },
    {
      icon: MagnifyingGlassIcon,
      title: 'Advanced Search',
      description: 'Fuzzy search, filtering by material, standard, dimensions, and more. Find exactly what you need instantly.',
      color: 'text-blue-600'
    },
    {
      icon: CubeIcon,
      title: 'CAD Integration',
      description: 'Download CAD files in multiple formats (STEP, IGES, STL) directly integrated with your design workflow.',
      color: 'text-green-600'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Quality Assurance',
      description: 'All components verified for accuracy with detailed specifications and compliance documentation.',
      color: 'text-red-600'
    },
    {
      icon: BoltIcon,
      title: 'Lightning Fast',
      description: 'Sub-second search results with Redis caching and optimized database queries for instant responses.',
      color: 'text-yellow-600'
    },
    {
      icon: ClockIcon,
      title: '24/7 Availability',
      description: '99.9% uptime guarantee with global CDN distribution ensuring access whenever you need it.',
      color: 'text-indigo-600'
    },
    {
      icon: CloudArrowDownIcon,
      title: 'Instant Downloads',
      description: 'No registration required for basic downloads. Premium features available for enterprise users.',
      color: 'text-cyan-600'
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics & Insights',
      description: 'Track usage patterns, popular components, and get insights to optimize your component selection.',
      color: 'text-pink-600'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need for Engineering Excellence
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From AI-powered search to instant CAD downloads, BoltDB provides all the tools 
            you need to find and specify fasteners with confidence and speed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.color} bg-gray-100 rounded-lg mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-primary-600 rounded-2xl px-8 py-12 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to revolutionize your engineering workflow?
            </h3>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of engineers who trust BoltDB for their fastener specifications. 
              Start with our free tier and upgrade as you grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
                Start Free Trial
              </button>
              <button className="border border-primary-300 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200">
                View Pricing
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}