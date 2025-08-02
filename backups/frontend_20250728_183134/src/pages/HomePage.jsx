import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import CocktailShowcase from '../components/CocktailShowcase'
import TestimonialsSection from '../components/TestimonialsSection'
import CallToAction from '../components/CallToAction'

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <CocktailShowcase />
      <TestimonialsSection />
      <CallToAction />
    </div>
  )
}

export default HomePage
