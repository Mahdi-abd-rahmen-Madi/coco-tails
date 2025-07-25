import React from 'react'
import { motion } from 'framer-motion'
import { Leaf, Book, Search } from 'lucide-react'

const IngredientGlossary = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-wellness-cream pt-20">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-wellness-mint rounded-full flex items-center justify-center mx-auto mb-8">
            <Book className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold text-wellness-charcoal mb-6">
            Ingredient <span className="gradient-text">Glossary</span>
          </h1>
          
          <p className="text-xl text-wellness-sage max-w-3xl mx-auto mb-12">
            Discover the health benefits and nutritional profiles of our premium organic ingredients. 
            Learn how each component contributes to your wellness journey.
          </p>

          <div className="glass p-12 max-w-2xl mx-auto">
            <Leaf className="w-16 h-16 text-primary-500 mx-auto mb-6" />
            <h2 className="text-2xl font-display font-bold text-wellness-charcoal mb-4">
              Comprehensive Guide Coming Soon
            </h2>
            <p className="text-wellness-sage mb-8">
              Our detailed ingredient glossary with nutritional information, 
              health benefits, and sourcing details is being prepared by our nutrition experts.
            </p>
            <button className="btn-primary">
              Get Notified
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default IngredientGlossary
