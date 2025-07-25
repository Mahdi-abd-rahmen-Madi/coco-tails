import React from 'react'
import { motion } from 'framer-motion'
import { Video, Calendar, Users } from 'lucide-react'

const VirtualClasses = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-wellness-cream pt-20">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <Video className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold text-wellness-charcoal mb-6">
            Virtual <span className="gradient-text">Mixology Classes</span>
          </h1>
          
          <p className="text-xl text-wellness-sage max-w-3xl mx-auto mb-12">
            Learn from world-class mixologists in live, interactive sessions. 
            Master the art of healthy cocktail creation from the comfort of your home.
          </p>

          <div className="glass p-12 max-w-2xl mx-auto">
            <Users className="w-16 h-16 text-purple-500 mx-auto mb-6" />
            <h2 className="text-2xl font-display font-bold text-wellness-charcoal mb-4">
              Classes Starting Soon
            </h2>
            <p className="text-wellness-sage mb-8">
              Our virtual mixology program is being developed with renowned experts. 
              Reserve your spot for the inaugural classes.
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              Reserve Your Spot
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default VirtualClasses
