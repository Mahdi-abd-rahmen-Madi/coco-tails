import React from 'react'
import { motion } from 'framer-motion'
import { Gift, Crown, Star } from 'lucide-react'

const Subscription = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 to-wellness-cream pt-20">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <Crown className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold text-wellness-charcoal mb-6">
            Premium <span className="gradient-text">Subscription</span>
          </h1>
          
          <p className="text-xl text-wellness-sage max-w-3xl mx-auto mb-12">
            Get monthly deliveries of premium organic ingredients, exclusive recipes, 
            and access to virtual mixology classes with world-class experts.
          </p>

          <div className="glass p-12 max-w-2xl mx-auto">
            <Gift className="w-16 h-16 text-gold-500 mx-auto mb-6" />
            <h2 className="text-2xl font-display font-bold text-wellness-charcoal mb-4">
              Launching Soon
            </h2>
            <p className="text-wellness-sage mb-8">
              Our premium subscription service is being finalized. 
              Be the first to experience curated wellness cocktail ingredients delivered to your door.
            </p>
            <button className="btn-secondary">
              Join Waitlist
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Subscription
