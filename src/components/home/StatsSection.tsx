import React from 'react'
import { motion } from 'framer-motion'

export function StatsSection() {
  const stats = [
    {
      value: '10M+',
      label: 'Components',
      description: 'Comprehensive fastener database'
    },
    {
      value: '500K+',
      label: 'CAD Files',
      description: 'Ready-to-download 3D models'
    },
    {
      value: '1000+',
      label: 'Standards',
      description: 'ISO, DIN, ANSI, and more'
    },
    {
      value: '50K+',
      label: 'Engineers',
      description: 'Trust BoltDB daily'
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
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Engineers Worldwide
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of professionals who rely on BoltDB for their engineering projects
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}