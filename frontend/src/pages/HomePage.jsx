import React from 'react';
import HeroSection from '../components/HeroSection';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="overflow-hidden">
      <HeroSection />
      
      {/* Menu Preview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-wellness-charcoal mb-6">
            {t('menu.title')}
          </h2>
          <p className="text-lg text-wellness-sage mb-8 max-w-2xl mx-auto">
            {t('menu.subtitle')}
          </p>
          <Link 
            to="/menu"
            className="inline-block bg-gradient-to-r from-wellness-gold-500 to-wellness-gold-600 hover:from-wellness-gold-600 hover:to-wellness-gold-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300"
          >
            {t('menu.viewMenu', 'View Full Menu')}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage
