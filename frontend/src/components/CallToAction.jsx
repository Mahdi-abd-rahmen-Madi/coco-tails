import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Gift, Calendar } from 'lucide-react'

const CallToAction = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-primary-600 via-gold-500 to-purple-600 text-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-white/10 -top-20 -left-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-white/10 top-1/2 -right-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Ready to Transform Your
              <br />
              <span className="text-wellness-cream">Cocktail Experience?</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
              Join thousands of health-conscious individuals who have discovered the perfect balance 
              of wellness and indulgence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {/* Subscription Offer */}
            <div className="glass p-8 text-left">
              <Gift className="w-12 h-12 text-gold-300 mb-4" />
              <h3 className="text-2xl font-display font-bold mb-4">Premium Subscription</h3>
              <p className="text-white/80 mb-6">
                Get monthly deliveries of premium ingredients, exclusive recipes, and virtual mixology classes.
              </p>
              <ul className="space-y-2 text-sm text-white/70 mb-6">
                <li>• Organic superfood ingredients</li>
                <li>• Expert-crafted recipes</li>
                <li>• Monthly virtual classes</li>
                <li>• Community access</li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white text-primary-600 font-semibold py-3 rounded-full hover:bg-wellness-cream transition-colors duration-300"
              >
                Start Free Trial
              </motion.button>
            </div>

            {/* Virtual Classes */}
            <div className="glass p-8 text-left">
              <Calendar className="w-12 h-12 text-purple-300 mb-4" />
              <h3 className="text-2xl font-display font-bold mb-4">Virtual Mixology</h3>
              <p className="text-white/80 mb-6">
                Learn from world-class mixologists in live, interactive sessions focused on healthy cocktails.
              </p>
              <ul className="space-y-2 text-sm text-white/70 mb-6">
                <li>• Live interactive sessions</li>
                <li>• Expert mixologist guidance</li>
                <li>• Ingredient education</li>
                <li>• Recipe customization</li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white text-purple-600 font-semibold py-3 rounded-full hover:bg-wellness-cream transition-colors duration-300"
              >
                Book a Class
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 font-semibold py-4 px-8 rounded-full hover:bg-wellness-cream transition-all duration-300 flex items-center space-x-2 group"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white font-semibold py-4 px-8 rounded-full hover:bg-white hover:text-primary-600 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/70 text-sm mt-8"
          >
            30-day money-back guarantee • Cancel anytime • No hidden fees
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
