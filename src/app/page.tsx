import React from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { SearchSection } from '@/components/home/SearchSection'
import { FeaturedComponents } from '@/components/home/FeaturedComponents'
import { StatsSection } from '@/components/home/StatsSection'
import { FeaturesSection } from '@/components/home/FeaturesSection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Search */}
      <SearchSection />
      
      {/* Statistics */}
      <StatsSection />
      
      {/* Featured Components */}
      <FeaturedComponents />
      
      {/* Features */}
      <FeaturesSection />
    </div>
  )
}