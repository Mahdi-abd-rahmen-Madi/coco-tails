import React from 'react'
import { motion } from 'framer-motion'
import { Leaf, Heart, Sparkles, Award, Users, Clock } from 'lucide-react'

const FeaturesSection = () => {
  const features = [
    {
      icon: Leaf,
      title: "Organic Superfoods",
      description: "Premium organic ingredients sourced from sustainable farms worldwide",
      color: "from-primary-500 to-primary-600"
    },
    {
      icon: Heart,
      title: "Health-First Approach",
      description: "Low-calorie, nutrient-rich cocktails that support your wellness journey",
      color: "from-red-500 to-pink-600"
    },
    {
      icon: Sparkles,
      title: "Expert Mixology",
      description: "Crafted by world-class mixologists who understand flavor and nutrition",
      color: "from-gold-500 to-yellow-600"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Award-winning recipes that never compromise on taste or health benefits",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join a community of health-conscious cocktail enthusiasts",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Clock,
      title: "Seasonal Selections",
      description: "Fresh, seasonal ingredients delivered monthly to your doorstep",
      color: "from-green-500 to-teal-600"
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-white to-wellness-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-wellness-charcoal mb-6">
            Why Choose <span className="gradient-text">Coco Tails</span>
          </h2>
          <p className="text-xl text-wellness-sage max-w-3xl mx-auto">
            We're revolutionizing the cocktail industry by combining premium taste with wellness benefits, 
            creating experiences that nourish both body and soul.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="premium-card p-8 group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-display font-semibold text-wellness-charcoal mb-4">
                {feature.title}
              </h3>
              
              <p className="text-wellness-sage leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
