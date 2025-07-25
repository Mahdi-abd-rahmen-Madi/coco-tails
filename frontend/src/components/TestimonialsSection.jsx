import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Wellness Coach",
      content: "Coco Tails has completely transformed my evening routine. I can enjoy delicious cocktails without compromising my health goals.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Fitness Enthusiast",
      content: "The perfect balance of taste and nutrition. These cocktails actually make me feel energized rather than sluggish.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emma Thompson",
      role: "Nutritionist",
      content: "I recommend Coco Tails to all my clients. The ingredient quality and nutritional profiles are exceptional.",
      rating: 5,
      avatar: "ET"
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-wellness-cream to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-wellness-charcoal mb-6">
            What Our <span className="gradient-text">Community</span> Says
          </h2>
          <p className="text-xl text-wellness-sage max-w-3xl mx-auto">
            Join thousands of health-conscious individuals who have transformed their cocktail experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="premium-card p-8 relative"
            >
              <Quote className="w-8 h-8 text-primary-400 mb-4" />
              
              <p className="text-wellness-sage leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold-500 fill-current" />
                ))}
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-wellness-charcoal">{testimonial.name}</h4>
                  <p className="text-sm text-wellness-sage">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
