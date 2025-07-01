'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  HeartIcon,
  CogIcon
} from '@heroicons/react/24/outline'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: 'Products', href: '/products', hasDropdown: true },
    { name: 'Categories', href: '/categories', hasDropdown: true },
    { name: 'Standards', href: '/standards' },
    { name: 'Technical Info', href: '/technical' },
    { name: 'About', href: '/about' },
  ]

  const productCategories = [
    { name: 'Screws', href: '/products/screws', description: 'All types of screws and fasteners' },
    { name: 'Nuts & Bolts', href: '/products/nuts-bolts', description: 'Complete nut and bolt solutions' },
    { name: 'Washers', href: '/products/washers', description: 'Various washer types and sizes' },
    { name: 'Anchors', href: '/products/anchors', description: 'Wall and concrete anchors' },
    { name: 'Threaded Rods', href: '/products/threaded-rods', description: 'Threaded rods and studs' },
    { name: 'Rivets', href: '/products/rivets', description: 'Blind and solid rivets' },
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center space-x-6">
              <span className="text-gray-600">Professional Fastener Solutions</span>
              <span className="text-gray-400">|</span>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact Sales
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/help" className="text-gray-600 hover:text-blue-600 transition-colors">
                Help
              </Link>
              <Link href="/downloads" className="text-gray-600 hover:text-blue-600 transition-colors">
                Downloads
              </Link>
              <Link href="/technical-support" className="text-gray-600 hover:text-blue-600 transition-colors">
                Technical Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">MechHub</span>
                                  <span className="text-xs text-gray-500 -mt-1">Mechanical Components</span>
              </div>
            </Link>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search fasteners, part numbers, specifications..."
                className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Favorites */}
            <Link
              href="/favorites"
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HeartIcon className="h-6 w-6" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Profile menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <UserIcon className="h-6 w-6" />
                <ChevronDownIcon className="h-4 w-4" />
              </button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                  >
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Order History
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <hr className="my-1" />
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-8 h-12">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDownIcon className="h-4 w-4 group-hover:rotate-180 transition-transform" />
                  )}
                </Link>

                {/* Dropdown menu */}
                {item.hasDropdown && item.name === 'Products' && (
                  <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-4">
                      <div className="grid grid-cols-1 gap-2">
                        {productCategories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="font-medium text-gray-900">{category.name}</div>
                            <div className="text-sm text-gray-500 mt-1">{category.description}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="my-4" />
              <div className="space-y-2">
                <Link
                  href="/account"
                  className="block text-base text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link
                  href="/favorites"
                  className="block text-base text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Favorites
                </Link>
                <Link
                  href="/cart"
                  className="block text-base text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cart (3)
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}