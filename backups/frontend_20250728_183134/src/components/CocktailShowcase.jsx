import React from 'react'
import { motion } from 'framer-motion'
import { Star, Zap, Droplets } from 'lucide-react'

const CocktailShowcase = () => {
  const cocktails = [
    {
      name: "Green Goddess",
      description: "Spinach, cucumber, mint, lime, and adaptogenic herbs",
      benefits: ["Antioxidant Rich", "Detoxifying", "Energy Boosting"],
      calories: 85,
      image: "🍃",
      color: "from-primary-400 to-primary-600"
    },
    {
      name: "Golden Elixir",
      description: "Turmeric, ginger, honey, citrus, and collagen peptides",
      benefits: ["Anti-inflammatory", "Skin Health", "Immunity"],
      calories: 92,
      image: "✨",
      color: "from-gold-400 to-gold-600"
    },
    {
      name: "Purple Rain",
      description: "Blueberries, lavender, elderflower, and probiotics",
      benefits: ["Brain Health", "Relaxing", "Gut Health"],
      calories: 78,
      image: "💜",
      color: "from-purple-400 to-purple-600"
    }
  ]

  return (
    <section className="section-padding bg-wellness-charcoal text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Signature <span className="gradient-text">Wellness Cocktails</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Each cocktail is carefully crafted to deliver exceptional taste while supporting your health goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cocktails.map((cocktail, index) => (
            <motion.div
              key={cocktail.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="glass p-8 group cursor-pointer"
            >
              {/* Cocktail Icon */}
              <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${cocktail.color} flex items-center justify-center text-4xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                {cocktail.image}
              </div>

              {/* Name and Description */}
              <h3 className="text-2xl font-display font-bold text-center mb-4">
                {cocktail.name}
              </h3>
              
              <p className="text-gray-300 text-center mb-6 leading-relaxed">
                {cocktail.description}
              </p>

              {/* Calories */}
              <div className="flex items-center justify-center mb-6">
                <Zap className="w-5 h-5 text-gold-400 mr-2" />
                <span className="text-gold-400 font-semibold">{cocktail.calories} calories</span>
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                <h4 className="font-semibold text-center mb-3">Health Benefits</h4>
                {cocktail.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center justify-center">
                    <Star className="w-4 h-4 text-primary-400 mr-2" />
                    <span className="text-sm text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 rounded-full transition-all duration-300"
              >
                Try This Recipe
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CocktailShowcase
