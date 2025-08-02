import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translations
const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.menu': 'Menu',
      'nav.about': 'About Us',
      'nav.contact': 'Contact',
      'nav.reservations': 'Reservations',
      'nav.events': 'Events',
      'nav.language': 'Language',
      'nav.language.fr': 'Français',
      'nav.language.en': 'English',
      
      // Menu
      'menu.title': 'Our Drinks Menu',
      'menu.subtitle': 'Discover our selection of alcohol-free drinks made with fresh, natural ingredients.',
      'menu.category.signature': 'Signature Mocktails',
      'menu.category.wellness': 'Wellness Blends',
      'menu.category.tea': 'Tea Craft',
      'menu.category.coffee': 'Coffee Craft',
      'menu.options': '{{count}} option available',
      'menu.options_plural': '{{count}} options available',
      'menu.startingAt': 'Starting at {{price}}',
      'menu.garnish': 'Garnish',
      'menu.viewAll': 'View All',
      
      // Common
      'common.close': 'Close',
      'common.loading': 'Loading...',
      
      // Accessibility
      'a11y.expand': 'Expand',
      'a11y.collapse': 'Collapse',
      'a11y.itemInfo': '{{name}}, {{price}}. Item {{position}} of {{total}}.',
      'a11y.menuCategoriesInfo': 'Menu with {{count}} categories available. Use tab and arrow keys to navigate.',
      'a11y.category': 'Category {{position}} of {{total}}',
      'a11y.menuItem': '{{name}}, {{price}}. Item {{position}} of {{total}} in this category.'
    }
  },
  fr: {
    translation: {
      // Navigation
      'nav.home': 'Accueil',
      'nav.menu': 'Carte',
      'nav.about': 'À Propos',
      'nav.contact': 'Contact',
      'nav.reservations': 'Réservations',
      'nav.events': 'Événements',
      'nav.language': 'Langue',
      'nav.language.fr': 'Français',
      'nav.language.en': 'English',
      
      // Menu
      'menu.title': 'Notre Carte des Boissons',
      'menu.subtitle': 'Découvrez notre sélection de boissons sans alcool élaborées avec des ingrédients frais et naturels.',
      'menu.category.signature': 'Mocktails Signature',
      'menu.category.wellness': 'Mélanges de bien-être',
      'menu.category.tea': 'Artisanat de thé',
      'menu.category.coffee': 'Artisanat de café',
      'menu.options': '{{count}} option disponible',
      'menu.options_plural': '{{count}} options disponibles',
      'menu.startingAt': 'À partir de {{price}}',
      'menu.garnish': 'Décoration',
      'menu.viewAll': 'Voir tout',
      
      // Common
      'common.close': 'Fermer',
      'common.loading': 'Chargement...',
      
      // Accessibilité
      'a11y.expand': 'Développer',
      'a11y.collapse': 'Réduire',
      'a11y.itemInfo': '{{name}}, {{price}}. Article {{position}} sur {{total}}.',
      'a11y.menuCategoriesInfo': 'Menu avec {{count}} catégories disponibles. Utilisez les touches tabulation et flèches pour naviguer.',
      'a11y.category': 'Catégorie {{position}} sur {{total}}',
      'a11y.menuItem': '{{name}}, {{price}}. Article {{position}} sur {{total}} dans cette catégorie.'
    }
  }
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'fr', // Default language
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // Not needed for React as it escapes by default
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
