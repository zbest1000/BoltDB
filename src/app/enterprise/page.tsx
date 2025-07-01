'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CubeIcon,
  SparklesIcon,
  DocumentArrowDownIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  CloudArrowUpIcon,
  ServerIcon,
  BeakerIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function EnterprisePage() {
  const features = [
    {
      title: 'AI-Powered Search',
      description: 'Natural language search with intelligent recommendations and parametric filtering',
      icon: SparklesIcon,
      href: '/enterprise/ai-search',
      color: 'bg-blue-600',
      benefits: ['99.7% search accuracy', 'Multi-language support', 'Voice search capability']
    },
    {
      title: 'BOM Management',
      description: 'Automated sourcing, real-time pricing, and supplier comparison for Bill of Materials',
      icon: DocumentArrowDownIcon,
      href: '/enterprise/bom-manager',
      color: 'bg-green-600',
      benefits: ['40% cost reduction', 'Real-time pricing', 'Auto-sourcing']
    },
    {
      title: 'CAD Integration',
      description: 'Direct integration with SolidWorks, Fusion 360, and other major CAD platforms',
      icon: CubeIcon,
      href: '/enterprise/cad-integration',
      color: 'bg-purple-600',
      benefits: ['One-click insertion', '50,000+ CAD models', 'Live sync']
    },
    {
      title: 'Real-Time Pricing',
      description: 'Live supplier inventory and pricing data with automated procurement workflows',
      icon: CurrencyDollarIcon,
      href: '/enterprise/pricing',
      color: 'bg-orange-600',
      benefits: ['Live market data', 'Price optimization', 'Bulk discounts']
    },
    {
      title: 'Enterprise Analytics',
      description: 'Advanced reporting and insights for procurement optimization and cost analysis',
      icon: ChartBarIcon,
      href: '/enterprise/analytics',
      color: 'bg-indigo-600',
      benefits: ['Custom dashboards', 'Cost analytics', 'Usage insights']
    },
    {
      title: 'API Integration',
      description: 'RESTful APIs for seamless integration with your existing procurement systems',
      icon: ServerIcon,
      href: '/enterprise/api',
      color: 'bg-red-600',
      benefits: ['RESTful APIs', 'Webhook support', 'Real-time sync']
    }
  ]

  const industries = [
    { name: 'Aerospace & Defense', icon: '✈️', description: 'Critical fasteners for aerospace applications' },
    { name: 'Automotive', icon: '🚗', description: 'High-volume production fastening solutions' },
    { name: 'Marine & Offshore', icon: '⚓', description: 'Corrosion-resistant marine grade components' },
    { name: 'Oil & Gas', icon: '🛢️', description: 'Pressure vessel and pipeline fasteners' },
    { name: 'Construction', icon: '🏗️', description: 'Structural and architectural fastening systems' },
    { name: 'Medical Devices', icon: '🏥', description: 'FDA-approved biocompatible fasteners' }
  ]

  const stats = [
    { value: '500K+', label: 'Components', desc: 'Fasteners and hardware components' },
    { value: '2,000+', label: 'Suppliers', desc: 'Global supplier network' },
    { value: '99.9%', label: 'Uptime', desc: 'Enterprise-grade reliability' },
    { value: '24/7', label: 'Support', desc: 'Dedicated technical support' }
  ]

  const testimonials = [
    {
      quote: "BoltDB's AI search reduced our sourcing time by 75%. The natural language queries understand exactly what our engineers need.",
      author: "Sarah Chen",
      title: "Chief Procurement Officer",
      company: "AeroTech Industries"
    },
    {
      quote: "The CAD integration is seamless. Our engineers can insert fasteners directly into assemblies without leaving SolidWorks.",
      author: "Michael Rodriguez",
      title: "Lead Design Engineer",
      company: "Marine Systems Corp"
    },
    {
      quote: "Real-time pricing and BOM automation saved us 40% on fastener costs while improving delivery times.",
      author: "Lisa Wang",
      title: "Supply Chain Director",
      company: "Precision Manufacturing"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Enterprise Fastener Intelligence
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              AI-powered procurement platform for mechanical engineers, procurement teams, 
              and supply chain professionals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enterprise/demo" className="btn bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg font-semibold">
                <BeakerIcon className="h-6 w-6 mr-2" />
                Request Demo
              </Link>
              <Link href="/enterprise/pricing" className="btn border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold">
                <CurrencyDollarIcon className="h-6 w-6 mr-2" />
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Enterprise-Grade Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful tools designed for engineering teams, procurement professionals, 
            and supply chain optimization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={feature.href}>
                <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Industries Section */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Industries
            </h2>
            <p className="text-xl text-gray-600">
              Specialized solutions for critical fastening applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{industry.name}</h3>
                <p className="text-gray-600 text-sm">{industry.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-xl border border-gray-200 p-8"
            >
              <div className="text-gray-600 mb-6 italic">
                "{testimonial.quote}"
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-gray-600">{testimonial.title}</div>
                <div className="text-sm text-blue-600 font-medium">{testimonial.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Procurement?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join leading engineering teams using BoltDB to optimize their fastener sourcing and reduce costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enterprise/demo" className="btn bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold">
                <UserGroupIcon className="h-6 w-6 mr-2" />
                Schedule Demo
              </Link>
              <Link href="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                <BuildingOfficeIcon className="h-6 w-6 mr-2" />
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <ShieldCheckIcon className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <div className="font-semibold text-gray-900">Enterprise Security</div>
                <div className="text-sm text-gray-600">SOC 2 Type II, ISO 27001, GDPR Compliant</div>
              </div>
            </div>
            <div className="flex items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <GlobeAltIcon className="h-5 w-5 mr-2" />
                99.9% Uptime SLA
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-2" />
                24/7 Support
              </div>
              <div className="flex items-center">
                <ServerIcon className="h-5 w-5 mr-2" />
                Enterprise APIs
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}