import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { generateId } from '../utils/a11y';

// Menu data
const menuCategories = [
  {
    id: 'signature',
    nameKey: 'menu.category.signature',
    price: '€10',
    items: [
      {
        id: 'tropical-breeze',
        name: 'Souffle Tropical',
        nameEn: 'Tropical Breeze',
        description: 'Un mélange rafraîchissant d\'ananas, de noix de coco et de citron vert, surmonté d\'eau pétillante.',
        descriptionEn: 'A refreshing blend of pineapple, coconut, and lime, topped with sparkling water.',
        garnish: 'Garniture: Quartier d\'ananas et feuille de menthe',
        garnishEn: 'Garnish: Pineapple wedge and mint leaf',
        price: '€10'
      },
      {
        id: 'berry-citrus',
        name: 'Fruits Rouges & Agrumes',
        nameEn: 'Berry Citrus',
        description: 'Mélange de baies fraîches, d\'agrumes pressés et d\'un soupçon de menthe.',
        descriptionEn: 'Blend of fresh berries, pressed citrus, and a hint of mint.',
        garnish: 'Garniture: Baies fraîches et zeste d\'agrume',
        garnishEn: 'Garnish: Fresh berries and citrus zest',
        price: '€10'
      },
      {
        id: 'jardin-de-fraicheur',
        name: 'JARDIN DE FRAICHEUR',
        description: 'Gin sans alcool, jus de poire, jus de citron, tonique floral',
        garnish: 'Garniture: Crème de violette / Poire déshydratée',
        price: '€10'
      },
      {
        id: 'violette-de-minuit',
        name: 'VIOLETTE DE MINUIT',
        description: 'Curaçao sans alcool, jus d\'orange, jus de citron, noix de coco pétillante',
        garnish: 'Garniture: Gelée de caviar d\'orange',
        price: '€10'
      },
      {
        id: 'kamehameha',
        name: 'KAMEHAMEHA',
        description: 'Amaretto sans alcool, ananas tiède, jus de citron, sirop de muscovado, aquafaba',
        garnish: 'Garniture: Ananas déshydraté',
        price: '€10'
      }
    ]
  },
  {
    id: 'melanges-bien-etre',
    name: 'Mélanges de bien-être',
    price: '€9',
    items: [
      {
        id: 'un-cou-de-pouce',
        name: 'UN COU DE POUCE',
        description: 'Gingembre-curcuma fermenté, sirop de miel, jus de citron, graines de chia, quelques gouttes de sauce piquante',
        garnish: 'Garniture: Confiture de miel / Citron',
        price: '€9'
      },
      {
        id: 'reveil-vitale',
        name: 'REVEIL VITALE',
        description: 'Infusion de racine de betterave, jus de pomme, infusion de fenouil, jus de citron',
        garnish: 'Garniture: Mousse betterave/pomme, copeaux de cannelle',
        price: '€9'
      },
      {
        id: 'zeste-de-vitalite',
        name: 'ZESTE DE VITALITÉ',
        description: 'Sprite sans alcool, Oleo-Saccharum, jus de pamplemousse, jus de citron, tonique',
        garnish: 'Garniture: Tranche de gelée de pamplemousse / Zeste de citron',
        price: '€9'
      }
    ]
  },
  {
    id: 'artisanat-the',
    name: 'Artisanat de thé',
    price: '€8',
    items: [
      {
        id: 'ciel-dete',
        name: 'CIEL D\'ETE',
        description: 'Thé vert, infusion de fruit de la passion, falernum, jus de citron vert',
        garnish: 'Garniture: Fruit de la passion / Cannelle',
        price: '€8'
      },
      {
        id: 'coucher-de-soleil',
        name: 'COUCHER DE SOLEIL',
        description: 'Thé d\'hibiscus, purée de pêche, jus de citron, sirop de miel au poivron doux',
        garnish: 'Garniture: Morceau d\'abricot confit',
        price: '€8'
      },
      {
        id: 'energie-matcha',
        name: 'ENERGIE MATCHA',
        description: 'Matcha, crème de vanille',
        garnish: 'Garniture: Graines de sésame torréfiées',
        price: '€8'
      }
    ]
  },
  {
    id: 'artisanat-cafe',
    name: 'Artisanat de café',
    price: '€8',
    items: [
      {
        id: 'coffee-classique',
        name: 'COFFEE CLASSIQUE',
        description: 'Café, lait frais, sirop de muscovado, caramel maison, crème de vanille',
        garnish: '',
        price: '€8'
      },
      {
        id: 'choco-black-coffee',
        name: 'CHOCO BLACK COFFEE',
        description: 'Café infusé à la fève de tonka, chocolat noir, crème de cacao',
        garnish: '',
        price: '€8'
      },
      {
        id: 'leverest',
        name: 'L\'EVEREST',
        description: 'Café infusé à la noisette, lait d\'amande frais, chocolat blanc, sirop de beurre, crème de vanille',
        garnish: '',
        price: '€8'
      }
    ]
  }
];

const MenuItem = ({ item, index, totalItems, categoryId }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const itemRef = useRef(null);
  const itemId = `${categoryId}-item-${index}`;
  
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      itemRef.current?.click();
    }
  }, []);
  
  return (
    <motion.article 
      ref={itemRef}
      id={itemId}
      role="article"
      aria-labelledby={`${itemId}-title`}
      aria-describedby={`${itemId}-desc`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative mb-8 pb-8 last:mb-0 last:pb-0 
                focus:outline-none focus:ring-2 focus:ring-wellness-gold-500/50 focus:ring-offset-2 
                rounded-lg p-4 transition-all duration-300 hover:bg-white/50"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 
              id={`${itemId}-title`} 
              className="text-xl font-serif font-semibold text-wellness-charcoal tracking-tight"
            >
              {currentLang === 'fr' ? item.name : (item.nameEn || item.name)}
            </h3>
            <span className="ml-4 text-lg font-medium text-wellness-gold-600 whitespace-nowrap">
              {item.price}
            </span>
          </div>
          
          <p 
            id={`${itemId}-desc`} 
            className="mt-2 text-wellness-slate-700 leading-relaxed"
          >
            {currentLang === 'fr' ? item.description : (item.descriptionEn || item.description)}
          </p>
          
          {item.garnish && (
            <div className="mt-3 flex items-start">
              <span className="text-xs font-medium text-wellness-purple-600 bg-wellness-purple-50 px-2 py-1 rounded-full">
                {currentLang === 'fr' ? 'Garniture' : 'Garnish'}
              </span>
              <p className="ml-2 text-sm text-wellness-slate-500 italic">
                {currentLang === 'fr' ? 
                  item.garnish.replace('Garniture:', '').trim() : 
                  (item.garnishEn || item.garnish).replace('Garnish:', '').trim()}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wellness-gold-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <p className="sr-only" aria-live="polite">
        {t('a11y.itemInfo', { 
          name: currentLang === 'fr' ? item.name : (item.nameEn || item.name), 
          price: item.price, 
          position: index + 1, 
          total: totalItems 
        })}
      </p>
    </motion.article>
  );
};

const MenuCategory = ({ category, isOpen, onClick, index, totalCategories }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const categoryRef = useRef(null);
  const categoryId = `category-${category.id}`;
  const regionId = `${categoryId}-region`;
  
  // Handle keyboard navigation for the category button
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    } else if (e.key === 'ArrowDown' && isOpen) {
      e.preventDefault();
      const firstItem = categoryRef.current?.querySelector('[role="article"]');
      firstItem?.focus();
    }
  }, [isOpen, onClick]);
  
  // Handle keyboard navigation for the category items
  const handleItemKeyDown = useCallback((e, itemIndex, totalItems) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextItem = e.target.nextElementSibling || 
        categoryRef.current?.querySelector(`#${categoryId}-button`);
      nextItem?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevItem = e.target.previousElementSibling || 
        categoryRef.current?.querySelector(`#${categoryId}-button`);
      prevItem?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      const firstItem = categoryRef.current?.querySelector(`#${categoryId}-button`);
      firstItem?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      const items = categoryRef.current?.querySelectorAll('[role="article"]');
      const lastItem = items?.[items.length - 1];
      lastItem?.focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      const button = categoryRef.current?.querySelector(`#${categoryId}-button`);
      button?.focus();
    }
  }, [categoryId]);
  
  return (
  <div 
    ref={categoryRef}
    className="mb-6 md:mb-8 bg-gradient-to-br from-white to-wellness-cream-50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-wellness-gold-100"
    role="region"
    aria-labelledby={`${categoryId}-header`}
  >
    <h2 className="sr-only" id={`${categoryId}-header`}>
      {t(category.nameKey || '')} - {t('a11y.category', { position: index + 1, total: totalCategories })}
    </h2>
    
    <button
      id={`${categoryId}-button`}
      onClick={onClick}
      className={`w-full flex justify-between items-center text-left p-5 md:p-7 focus:outline-none focus:ring-2 focus:ring-wellness-gold-500/50 focus:ring-offset-2 rounded-t-xl transition-all duration-300 ${
        isOpen ? 'bg-white' : 'hover:bg-white/80'
      }`}
      aria-expanded={isOpen}
      aria-controls={regionId}
      onKeyDown={handleKeyDown}
      aria-describedby={`${categoryId}-desc`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <span className="block text-xl md:text-2xl font-serif font-bold bg-gradient-to-r from-wellness-charcoal to-wellness-sage bg-clip-text text-transparent">
            {t(category.nameKey || '')}
          </span>
          <span className="ml-3 px-2.5 py-0.5 text-xs font-medium text-wellness-purple-700 bg-wellness-purple-50 rounded-full">
            {category.items.length} {category.items.length === 1 ? 'option' : 'options'}
          </span>
        </div>
        <p id={`${categoryId}-desc`} className="text-sm text-wellness-slate-500 mt-1.5">
          {t('menu.startingAt', { price: category.price })}
        </p>
      </div>
      <div className="flex items-center ml-4">
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-wellness-gold-600 text-lg"
          aria-hidden="true"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.span>
        <span className="sr-only">
          {isOpen ? t('a11y.collapse') : t('a11y.expand')}
        </span>
      </div>
    </button>
    
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          id={regionId}
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ 
            opacity: 1, 
            height: 'auto',
            y: 0,
            transition: { 
              height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
              opacity: { duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] },
              y: { duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }
            } 
          }}
          exit={{ 
            opacity: 0, 
            height: 0, 
            y: -10,
            transition: { 
              height: { duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] },
              opacity: { duration: 0.1, ease: [0.04, 0.62, 0.23, 0.98] },
              y: { duration: 0.1, ease: [0.04, 0.62, 0.23, 0.98] }
            }
          }}
          className="overflow-hidden"
          role="region"
          aria-labelledby={`${categoryId}-header`}
        >
          <div className="px-5 pb-8 md:px-8 bg-white/90">
            <div className="pt-1">
              {category.items.map((item, itemIndex) => (
                <div 
                  key={item.id} 
                  onKeyDown={(e) => handleItemKeyDown(e, itemIndex, category.items.length)}
                  className="relative"
                >
                  {itemIndex > 0 && (
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wellness-gold-100 to-transparent"></div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        delay: 0.05 * itemIndex,
                        duration: 0.3,
                        ease: [0.25, 0.1, 0.25, 1]
                      }
                    }}
                    exit={{ 
                      opacity: 0,
                      x: -10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <MenuItem 
                      item={item} 
                      index={itemIndex}
                      totalItems={category.items.length}
                      categoryId={categoryId}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  );
};

const MenuCategories = () => {
  const { t } = useTranslation();
  const [openCategory, setOpenCategory] = useState(menuCategories[0].id);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile on component mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Auto-close other categories on mobile when one is opened
  const handleCategoryClick = (categoryId) => {
    if (isMobile) {
      setOpenCategory(openCategory === categoryId ? null : categoryId);
    } else {
      // On desktop, keep one category always open
      setOpenCategory(categoryId);
    }
  };

  return (
    <section className="py-8 md:py-16 bg-neutral-50" aria-labelledby="menu-heading">
      <div className="container mx-auto px-4">

        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6" role="list">
          {menuCategories.map((category, index) => (
            <MenuCategory
              key={category.id}
              category={category}
              isOpen={isMobile ? openCategory === category.id : true}
              onClick={() => handleCategoryClick(category.id)}
              index={index}
              totalCategories={menuCategories.length}
            />
          ))}
        </div>
        
        <p className="sr-only" aria-live="polite">
          {t('a11y.menuCategoriesInfo', { count: menuCategories.length })}
        </p>
      </div>
    </section>
  );
};

export default MenuCategories;
