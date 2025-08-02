import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GlassWater, ShoppingBag, User, Phone, MapPin, Clock, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Language options
const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
];

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const location = useLocation();
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.menu'), path: '/menu' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.events'), path: '/events' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const infoItems = [
    { icon: <MapPin size={16} className="mr-2" />, text: '123 Rue du Marché, 75001 Paris' },
    { icon: <Phone size={16} className="mr-2" />, text: '+33 1 23 45 67 89' },
    { icon: <Clock size={16} className="mr-2" />, text: 'Lun-Sam: 11h-22h' },
  ];

  return (
    <>
      {/* Top info bar */}
      <div className="bg-primary-900 text-white text-sm py-2 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap justify-center md:justify-start space-x-4 mb-2 md:mb-0">
            {infoItems.map((item, index) => (
              <div key={index} className="flex items-center text-primary-100">
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/reservation" className="hover:text-secondary-300 transition-colors">
              {t('nav.reservation')}
            </Link>
            <div className="h-4 w-px bg-primary-700"></div>
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center text-primary-100 hover:text-secondary-300 transition-colors"
                aria-haspopup="true"
                aria-expanded={isLanguageOpen}
              >
                <Globe size={16} className="mr-1" />
                <span className="mr-1">{currentLanguage.flag}</span>
                <span className="hidden sm:inline">{currentLanguage.name}</span>
                <motion.span
                  animate={{ rotate: isLanguageOpen ? 180 : 0 }}
                  className="ml-1"
                >
                  ▼
                </motion.span>
              </button>
              
              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                          currentLanguage.code === lang.code
                            ? 'bg-primary-100 text-primary-900'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setIsLanguageOpen(false);
                        }}
                      >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex space-x-2">
              <a href="#" className="hover:text-secondary-300 transition-colors">FR</a>
              <span>/</span>
              <a href="#" className="text-primary-300 hover:text-secondary-300 transition-colors">EN</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-md' 
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="flex flex-col items-start">
                <h1 className="text-2xl font-serif font-bold text-primary-800">Un Bar de Rue</h1>
                <p className="text-sm text-primary-600 font-sans">Sans Alcool</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary-600 font-semibold'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-neutral-700 hover:text-primary-700 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === item.path
                        ? 'bg-primary-50 text-primary-900'
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-700'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navigation;
