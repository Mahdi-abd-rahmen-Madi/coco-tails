import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, Star, Mail, Phone, MapPin, Clock, CheckCircle, Sparkles, Wine, Coffee, Heart } from 'lucide-react'

const PrivateEvents = () => {
  const [formData, setFormData] = useState({
    eventType: '',
    date: '',
    time: '',
    guests: '',
    drinkCategories: [],
    dietaryRequirements: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (category) => {
    setFormData(prev => ({
      ...prev,
      drinkCategories: prev.drinkCategories.includes(category)
        ? prev.drinkCategories.filter(c => c !== category)
        : [...prev.drinkCategories, category]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Event inquiry submitted:', formData)
    alert('Thank you for your inquiry! We\'ll get back to you within 24 hours.')
  }

  const eventTypes = [
    { icon: Wine, title: 'Corporate Events', description: 'Professional networking and team building' },
    { icon: Heart, title: 'Weddings', description: 'Celebrate your special day with healthy elegance' },
    { icon: Sparkles, title: 'Private Parties', description: 'Birthday celebrations and social gatherings' },
    { icon: Coffee, title: 'Wellness Retreats', description: 'Mindful drinking experiences for health-focused events' }
  ]

  const packages = [
    {
      name: 'Essential',
      price: '€25/person',
      features: ['3 signature cocktails', 'Basic garnish selection', '2-hour service', 'Professional bartender']
    },
    {
      name: 'Premium',
      price: '€45/person',
      features: ['5 signature cocktails', 'Premium garnish & ingredients', '4-hour service', 'Professional bartender', 'Custom menu design']
    },
    {
      name: 'Luxury',
      price: '€75/person',
      features: ['Unlimited cocktail selection', 'Premium organic ingredients', 'Full-day service', '2 professional bartenders', 'Custom menu design', 'Event coordination']
    }
  ]

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Wedding Coordinator",
      content: "SOBRE transformed our wedding reception into an unforgettable wellness experience. The healthy cocktails were a hit with all our guests!",
      rating: 5,
      avatar: "MD"
    },
    {
      name: "Jean-Luc Martin",
      role: "Corporate Event Manager",
      content: "Our company retreat was elevated by SOBRE's professional service and innovative healthy drink options. Highly recommended!",
      rating: 5,
      avatar: "JM"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-primary-50 to-gold-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-wellness-charcoal mb-6">
              Elevate Your <span className="gradient-text">Private Events</span>
            </h1>
            <p className="text-xl text-wellness-sage mb-8 max-w-3xl mx-auto">
              Transform your special occasions with our premium healthy cocktail catering service. 
              From intimate gatherings to grand celebrations, we bring wellness and sophistication to every event.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4"
              onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
            >
              Get Your Quote
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Service Offerings */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-wellness-charcoal mb-6">
              Perfect for Every <span className="gradient-text">Occasion</span>
            </h2>
            <p className="text-xl text-wellness-sage max-w-3xl mx-auto">
              Our expert team specializes in creating memorable experiences with health-conscious cocktails
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventTypes.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-gold-50 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <event.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-wellness-charcoal mb-2">{event.title}</h3>
                <p className="text-wellness-sage">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-gold-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-wellness-charcoal mb-6">
              Choose Your <span className="gradient-text">Package</span>
            </h2>
            <p className="text-xl text-wellness-sage max-w-3xl mx-auto">
              Flexible options to match your event size and budget
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow ${
                  index === 1 ? 'ring-2 ring-primary-500 transform scale-105' : ''
                }`}
              >
                {index === 1 && (
                  <div className="bg-primary-500 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-wellness-charcoal mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold gradient-text mb-6">{pkg.price}</div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-wellness-sage">
                      <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    index === 1
                      ? 'bg-primary-500 text-white hover:bg-primary-600'
                      : 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white'
                  }`}
                  onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                >
                  Select Package
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-wellness-charcoal mb-6">
              Previous <span className="gradient-text">Events</span>
            </h2>
            <p className="text-xl text-wellness-sage max-w-3xl mx-auto">
              See how we've transformed events with our healthy cocktail experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-primary-100 to-gold-100"
              >
                <div className="absolute inset-0 bg-[url('/api/placeholder/400/400')] bg-cover bg-center opacity-80"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-semibold">Event {item}</h4>
                    <p className="text-sm opacity-90">Premium cocktail service</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-gold-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-wellness-charcoal mb-6">
              Client <span className="gradient-text">Stories</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold-500 fill-current" />
                  ))}
                </div>
                <p className="text-wellness-sage mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-wellness-charcoal">{testimonial.name}</h4>
                    <p className="text-wellness-sage text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-wellness-charcoal mb-6">
              Plan Your <span className="gradient-text">Event</span>
            </h2>
            <p className="text-xl text-wellness-sage max-w-3xl mx-auto">
              Tell us about your event and we'll create a custom proposal just for you
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-wellness-charcoal font-semibold mb-2">Event Type</label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select event type</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="wedding">Wedding</option>
                    <option value="party">Private Party</option>
                    <option value="retreat">Wellness Retreat</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-wellness-charcoal font-semibold mb-2">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-wellness-charcoal font-semibold mb-2">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-wellness-charcoal font-semibold mb-2">Number of Guests</label>
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    placeholder="Expected number of guests"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-wellness-charcoal font-semibold mb-2">Preferred Drink Categories</label>
                  <div className="space-y-2">
                    {['Signature Cocktails', 'Mocktails', 'Wellness Shots', 'Herbal Infusions', 'Custom Creations'].map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.drinkCategories.includes(category)}
                          onChange={() => handleCheckboxChange(category)}
                          className="mr-3 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="text-wellness-sage">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-wellness-charcoal font-semibold mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-wellness-charcoal font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-wellness-charcoal font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-wellness-charcoal font-semibold mb-2">Special Dietary Requirements</label>
                  <textarea
                    name="dietaryRequirements"
                    value={formData.dietaryRequirements}
                    onChange={handleInputChange}
                    placeholder="Any allergies, dietary restrictions, or special requests..."
                    rows="3"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-wellness-charcoal font-semibold mb-2">Additional Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your event vision..."
                    rows="4"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>

              <div className="md:col-span-2 text-center">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary text-lg px-12 py-4"
                >
                  Request Quote
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivateEvents
