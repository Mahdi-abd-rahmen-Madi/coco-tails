import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles, Leaf, Heart } from 'lucide-react';
import Image from './ui/Image';

// Memoized particle configuration to prevent recreation on re-renders
const useParticles = (count = 20) => {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      delay: i * 0.5,
      duration: 8 + Math.random() * 4,
      size: Math.random() * 8 + 4,
      color: ['bg-primary-400', 'bg-gold-400', 'bg-purple-400'][Math.floor(Math.random() * 3)],
      startTop: Math.random() * 100,
      startLeft: Math.random() * 100,
      yMovement: Math.random() * 200 - 100,
      xMovement: Math.random() * 100 - 50,
      opacityRange: [0.2, 0.5 + Math.random() * 0.5, 0.2]
    }));
  }, [count]);
};

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const particles = useParticles(20);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Hero Image Background */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero/hero-main.jpg"
          alt="SOBRE Healthy Cocktails"
          className="w-full h-full object-cover"
          containerClassName="w-full h-full"
          placeholder={
            <div className="w-full h-full bg-gradient-to-br from-wellness-charcoal/90 to-wellness-sage/90 flex items-center justify-center">
              <div className="text-6xl text-white">🍹</div>
            </div>
          }
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => {
          // Calculate size classes based on the particle size
          const sizeClass = `w-${Math.round(particle.size)} h-${Math.round(particle.size)}`;
          
          return (
            <motion.div
              key={particle.id}
              className={`absolute ${sizeClass} ${particle.color} rounded-full`}
              style={{
                top: `${particle.startTop}%`,
                left: `${particle.startLeft}%`,
              }}
              initial={{
                opacity: 0,
                y: 0,
                x: 0
              }}
              animate={{
                y: particle.yMovement,
                x: particle.xMovement,
                opacity: particle.opacityRange,
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
            Crafted Wellness in Every Sip
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-wellness-gold-400 to-transparent mx-auto mb-6"></div>
        </motion.div>
        
        <motion.p 
          className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Discover our handcrafted, health-focused cocktails made with premium, natural ingredients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-wellness-gold-500 to-wellness-gold-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span className="relative z-10 flex items-center justify-center">
              <span>Explore Our Menu</span>
              <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </div>

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
          className="flex flex-col items-center space-y-2 text-white"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
