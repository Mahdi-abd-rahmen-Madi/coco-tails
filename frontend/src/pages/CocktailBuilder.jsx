import React from 'react'
import { motion } from 'framer-motion'
import { Beaker, Plus, Sparkles } from 'lucide-react'

const CocktailBuilder = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-cream to-white pt-20">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <Beaker className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold text-wellness-charcoal mb-6">
            Interactive <span className="gradient-text">Cocktail Builder</span>
          </h1>
          
          <p className="text-xl text-wellness-sage max-w-3xl mx-auto mb-12">
            Create your perfect healthy cocktail with our interactive builder. 
            Mix and match premium ingredients while tracking nutritional benefits.
          </p>

          <div className="glass p-12 max-w-2xl mx-auto">
            <Sparkles className="w-16 h-16 text-primary-500 mx-auto mb-6" />
            <h2 className="text-2xl font-display font-bold text-wellness-charcoal mb-4">
              Coming Soon
            </h2>
            <p className="text-wellness-sage mb-8">
              Our interactive cocktail builder is currently in development. 
              Sign up to be notified when it launches!
            </p>
            <button className="btn-primary">
              Get Early Access
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CocktailBuilder
