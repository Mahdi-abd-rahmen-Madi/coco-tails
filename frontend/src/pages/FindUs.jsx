import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Car, Bus, Facebook, Instagram, Twitter } from 'lucide-react'

const FindUs = () => {
  const mapRef = useRef(null)

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)

    // Load Leaflet JS
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => {
      if (window.L && mapRef.current) {
        // Initialize map centered on Arcachon
        const map = window.L.map(mapRef.current).setView([44.6667, -1.1667], 13)

        // Add OpenStreetMap tiles
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map)

        // Add custom marker
        const marker = window.L.marker([44.6667, -1.1667]).addTo(map)
          .bindPopup(`
            <div style="text-align: center; font-family: Inter, sans-serif;">
              <strong style="color: #059669; font-size: 16px;">SOBRE</strong><br>
              <span style="color: #6B7280;">Premium Healthy Cocktails</span><br>
              <span style="color: #6B7280;">Arcachon, Bordeaux, France</span>
            </div>
          `)
          .openPopup()

        // Add loading animation completion
        setTimeout(() => {
          const loadingElement = document.getElementById('map-loading')
          if (loadingElement) {
            loadingElement.style.display = 'none'
          }
        }, 1000)
      }
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (link.parentNode) link.parentNode.removeChild(link)
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [])

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: 'Boulevard de la Plage, 33120 Arcachon, France',
      subContent: 'Near the famous Arcachon Bay'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+33 5 56 83 01 69',
      subContent: 'Available during business hours'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@sobre.com',
      subContent: 'We respond within 24 hours'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Mon-Sat: 10:00 - 22:00',
      subContent: 'Sunday: 12:00 - 20:00'
    }
  ]

  const transportOptions = [
    {
      icon: Car,
      title: 'By Car',
      directions: [
        'From Bordeaux: Take A63 towards Arcachon (45 minutes)',
        'From Paris: A10 to Bordeaux, then A63 to Arcachon (6 hours)',
        'GPS Coordinates: 44.6667° N, 1.1667° W'
      ]
    },
    {
      icon: Bus,
      title: 'Public Transport',
      directions: [
        'Train: Direct line from Bordeaux Saint-Jean (50 minutes)',
        'Bus: Line 601 from Bordeaux city center',
        'Local buses available from Arcachon station'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-primary-50 to-gold-50 overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-wellness-charcoal mb-6">
              Visit <span className="gradient-text">SOBRE</span>
            </h1>
            <p className="text-xl text-wellness-sage mb-8 max-w-3xl mx-auto">
              Located in the heart of beautiful Arcachon, our wellness cocktail bar offers a serene 
              escape where healthy meets delicious. Come experience the future of mindful drinking.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
                onClick={() => document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' })}
              >
                View Map
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
                onClick={() => document.getElementById('contact-info').scrollIntoView({ behavior: 'smooth' })}
              >
                Get Directions
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section id="map-section" className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-wellness-charcoal mb-6">
              Find Us on the <span className="gradient-text">Map</span>
            </h2>
            <p className="text-xl text-wellness-sage max-w-3xl mx-auto">
              We're located in the beautiful coastal town of Arcachon, just steps away from the famous bay
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div 
              id="map-loading" 
              className="absolute inset-0 bg-gradient-to-br from-primary-50 to-gold-50 flex items-center justify-center z-10"
            >
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-wellness-sage">Loading interactive map...</p>
              </div>
            </div>
            <div 
              ref={mapRef} 
              className="w-full h-96 md:h-[500px] rounded-2xl"
              style={{ minHeight: '400px' }}
            ></div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section id="contact-info" className="py-16 bg-gradient-to-br from-primary-50 to-gold-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-wellness-charcoal mb-6">
              Contact <span className="gradient-text">Information</span>
            </h2>
            <p className="text-xl text-wellness-sage max-w-3xl mx-auto">
              Get in touch with us or visit our location for an unforgettable wellness cocktail experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-wellness-charcoal mb-2">{info.title}</h3>
                <p className="text-wellness-charcoal font-medium mb-1">{info.content}</p>
                <p className="text-wellness-sage text-sm">{info.subContent}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Directions Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-wellness-charcoal mb-6">
              How to <span className="gradient-text">Get Here</span>
            </h2>
            <p className="text-xl text-wellness-sage max-w-3xl mx-auto">
              Multiple convenient ways to reach our Arcachon location
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {transportOptions.map((transport, index) => (
              <motion.div
                key={transport.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gradient-to-br from-primary-50 to-gold-50 rounded-2xl p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full flex items-center justify-center mr-4">
                    <transport.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-wellness-charcoal">{transport.title}</h3>
                </div>
                <ul className="space-y-3">
                  {transport.directions.map((direction, i) => (
                    <li key={i} className="flex items-start text-wellness-sage">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {direction}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parking Information */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-gold-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-wellness-charcoal mb-6">
              <span className="gradient-text">Parking</span> Information
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-wellness-charcoal mb-2">Street Parking</h3>
                  <p className="text-wellness-sage">Free parking available on Boulevard de la Plage and surrounding streets</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-wellness-charcoal mb-2">Public Parking</h3>
                  <p className="text-wellness-sage">Parking de la Plage - 2 minutes walk from our location</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-wellness-charcoal mb-2">Valet Service</h3>
                  <p className="text-wellness-sage">Premium valet parking available for special events and private bookings</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Media & Final CTA */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-wellness-charcoal mb-6">
              Stay <span className="gradient-text">Connected</span>
            </h2>
            <p className="text-xl text-wellness-sage mb-8 max-w-3xl mx-auto">
              Follow us on social media for the latest updates, events, and wellness cocktail inspiration
            </p>
            
            <div className="flex justify-center space-x-6 mb-12">
              {[
                { icon: Facebook, name: 'Facebook', color: 'hover:text-blue-600' },
                { icon: Instagram, name: 'Instagram', color: 'hover:text-pink-600' },
                { icon: Twitter, name: 'Twitter', color: 'hover:text-blue-400' }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 bg-gradient-to-r from-primary-500 to-gold-500 rounded-full flex items-center justify-center text-white transition-colors ${social.color}`}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
                onClick={() => window.open('tel:+33556830169')}
              >
                Call Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
                onClick={() => window.open('mailto:hello@sobre.com')}
              >
                Send Email
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default FindUs
