import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import HomePage from './pages/HomePage'
import CocktailBuilder from './pages/CocktailBuilder'
import IngredientGlossary from './pages/IngredientGlossary'
import Subscription from './pages/Subscription'
import VirtualClasses from './pages/VirtualClasses'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cocktail-builder" element={<CocktailBuilder />} />
            <Route path="/ingredients" element={<IngredientGlossary />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/virtual-classes" element={<VirtualClasses />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
