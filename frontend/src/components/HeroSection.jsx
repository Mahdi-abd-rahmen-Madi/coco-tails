import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Sparkles, Leaf, Heart } from 'lucide-react'

// Generate floating particles outside component to prevent re-generation
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  delay: i * 0.5,
  duration: 8 + Math.random() * 4,
  size: Math.random() * 8 + 4,
  color: ['bg-primary-400', 'bg-gold-400', 'bg-purple-400'][Math.floor(Math.random() * 3)],
  startTop: Math.random() * 100,
  yMovement: Math.random() * 200 - 100
}))

// Generate bubble properties outside component to prevent re-generation
const bubbles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: 20 + Math.random() * 60,
  bottom: 10 + Math.random() * 60,
  duration: 2 + Math.random() * 2,
  delay: Math.random() * 2
}))

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isGlassHovered, setIsGlassHovered] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-wellness-cream via-white to-primary-50">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 animated-gradient opacity-10" />
      
      {/* Liquid Blob Animations */}
      <motion.div
        className="liquid-blob w-96 h-96 bg-gradient-to-r from-primary-400 to-primary-600 -top-20 -left-20"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="liquid-blob w-80 h-80 bg-gradient-to-r from-gold-400 to-gold-600 top-1/3 -right-20"
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <motion.div
        className="liquid-blob w-64 h-64 bg-gradient-to-r from-purple-400 to-purple-600 bottom-20 left-1/4"
        animate={{
          x: [0, 40, 0],
          y: [0, -20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`particle ${particle.color}`}
          style={{
            width: particle.size,
            height: particle.size,
            top: `${particle.startTop}%`,
            left: `-10px`
          }}
          animate={{
            x: ['0vw', '110vw'],
            y: [0, particle.yMovement],
            rotate: [0, 360],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear"
          }}
        />
      ))}

      {/* Interactive Mouse-Following Element */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-primary-300/30 to-gold-300/30 blur-xl pointer-events-none"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Main Content */}
      <motion.div 
        className="relative z-10 container-custom min-h-screen flex items-center"
        style={{ y }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight"
            >
              <span className="gradient-text">Wellness</span>
              <br />
              <span className="text-wellness-charcoal">Meets</span>
              <br />
              <span className="gradient-text">Mixology</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-2xl text-wellness-sage leading-relaxed max-w-lg"
            >
              Revolutionizing cocktails with superfood ingredients, mindful consumption, and premium taste experiences.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: Leaf, text: "Organic Ingredients" },
                { icon: Heart, text: "Health-First" },
                { icon: Sparkles, text: "Premium Quality" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-200">
                  <feature.icon className="w-4 h-4 text-primary-600" />
                  <span className="text-sm font-medium text-wellness-charcoal">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary group relative overflow-hidden"
              >
                <span className="relative z-10">Start Your Journey</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline group"
              >
                <span>Explore Cocktails</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Cocktail Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative flex justify-center items-center"
          >
            {/* Main Cocktail Glass */}
            <motion.div
              className="relative w-80 h-96 mx-auto cursor-pointer"
              animate={{ 
                rotateY: [0, 5, 0, -5, 0],
                rotateX: [0, 2, 0, -2, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              onHoverStart={() => setIsGlassHovered(true)}
              onHoverEnd={() => setIsGlassHovered(false)}
            >
              {/* Glass Container */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/40 rounded-t-full border-2 border-white/30 backdrop-blur-sm">
                {/* Liquid Animation */}
                <motion.div
                  className="absolute bottom-0 left-2 right-2 h-3/4 bg-gradient-to-t from-primary-400 via-primary-300 to-primary-200 rounded-t-full"
                  animate={{
                    height: ["70%", "75%", "70%"],
                    background: [
                      "linear-gradient(to top, #4ade80, #86efac, #bbf7d0)",
                      "linear-gradient(to top, #f59e0b, #fbbf24, #fde68a)",
                      "linear-gradient(to top, #9333ea, #c084fc, #e9d5ff)",
                      "linear-gradient(to top, #4ade80, #86efac, #bbf7d0)"
                    ]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Bubbles */}
                {bubbles.map((bubble) => (
                  <motion.div
                    key={bubble.id}
                    className="absolute w-2 h-2 bg-white/60 rounded-full"
                    style={{
                      left: `${bubble.left}%`,
                      bottom: `${bubble.bottom}%`
                    }}
                    animate={{
                      y: isGlassHovered ? [0, -40, 0] : [0, -20, 0],
                      opacity: isGlassHovered ? [0.6, 1, 0.6, 1, 0.6] : [0.6, 1, 0.6],
                      scale: isGlassHovered ? [1, 1.5, 1, 1.3, 1] : [1, 1.2, 1]
                    }}
                    transition={{
                      duration: isGlassHovered ? bubble.duration * 0.5 : bubble.duration,
                      repeat: Infinity,
                      delay: bubble.delay
                    }}
                  />
                ))}
                
                {/* Extra fizzing bubbles on hover */}
                {isGlassHovered && Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={`fizz-${i}`}
                    className="absolute w-1 h-1 bg-white/80 rounded-full"
                    style={{
                      left: `${15 + Math.random() * 70}%`,
                      bottom: `${5 + Math.random() * 70}%`
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      y: [0, -60],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1 + Math.random() * 0.5,
                      repeat: Infinity,
                      delay: Math.random() * 0.5
                    }}
                  />
                ))}
              </div>

              {/* Garnish */}
              <motion.div
                className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Ingredients */}
            {[
              { name: "Mint", color: "bg-primary-400", position: "top-10 left-10" },
              { name: "Ginger", color: "bg-gold-400", position: "top-20 right-10" },
              { name: "Berries", color: "bg-purple-400", position: "bottom-20 left-5" },
              { name: "Citrus", color: "bg-yellow-400", position: "bottom-10 right-5" }
            ].map((ingredient, index) => (
              <motion.div
                key={ingredient.name}
                className={`absolute ${ingredient.position} w-12 h-12 ${ingredient.color} rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-lg`}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3 + index,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                {ingredient.name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-wellness-sage"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
