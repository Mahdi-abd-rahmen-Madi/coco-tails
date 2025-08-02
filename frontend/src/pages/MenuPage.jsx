import React from 'react';
import { motion } from 'framer-motion';
import MenuCategories from '../components/MenuCategories';
import { useTranslation } from 'react-i18next';

const MenuPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary-50 to-gold-50">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-wellness-charcoal mb-6">
              {t('menu.title')}
            </h1>
            <p className="text-lg md:text-xl text-wellness-sage mb-8 max-w-3xl mx-auto">
              {t('menu.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Categories Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <MenuCategories />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-gold-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-wellness-charcoal mb-6">
            {t('menu.cta.title', 'Ready to experience SOBRE?')}
          </h2>
          <p className="text-lg text-wellness-sage mb-8 max-w-2xl mx-auto">
            {t('menu.cta.subtitle', 'Join us for an unforgettable experience of mindful drinking.')}
          </p>
          <motion.a
            href="/reservation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-wellness-gold-500 to-wellness-gold-600 hover:from-wellness-gold-600 hover:to-wellness-gold-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300"
          >
            {t('nav.reservation', 'Make a Reservation')}
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default MenuPage;
