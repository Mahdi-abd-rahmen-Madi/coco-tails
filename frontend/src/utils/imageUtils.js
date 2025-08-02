/**
 * Image Utility Functions for SOBRE
 * 
 * This file provides a centralized way to manage image paths and implement
 * progressive loading and responsive images.
 */

// Base paths for different image types
const imagePaths = {
  hero: '/images/hero',
  drinks: '/images/drinks',
  ingredients: '/images/ingredients',
  atmosphere: '/images/atmosphere',
  process: '/images/process'
};

// Generate image path with fallback for missing images
const getImagePath = (type, filename, size = '') => {
  const sizeSuffix = size ? `-${size}` : '';
  const basePath = imagePaths[type] || '';
  return {
    src: `${basePath}/${filename}${sizeSuffix}.jpg`,
    srcSet: [
      `${basePath}/${filename}${sizeSuffix}@1x.jpg 1x`,
      `${basePath}/${filename}${sizeSuffix}@2x.jpg 2x`,
      `${basePath}/${filename}${sizeSuffix}@3x.jpg 3x`
    ].join(', '),
    placeholder: `${basePath}/placeholders/${filename}-placeholder.jpg`,
    alt: '' // To be filled by the component
  };
};

// Hero images
export const heroImages = {
  main: {
    ...getImagePath('hero', 'hero-main-bar-atmosphere'),
    alt: 'Modern street bar interior with warm lighting',
    sizes: '(max-width: 768px) 100vw, 1920px'
  },
  drinkPrep: {
    ...getImagePath('hero', 'hero-drink-preparation'),
    alt: 'Artisan preparing alcohol-free mocktails',
    sizes: '(max-width: 768px) 100vw, 1920px'
  },
  ingredients: {
    ...getImagePath('hero', 'bg-natural-ingredients'),
    alt: 'Fresh fruits and herbs for mocktail preparation',
    sizes: '100vw'
  }
};

// Drink images by category
export const drinkImages = {
  signature: {
    'tropical-breeze': {
      ...getImagePath('drinks', 'drink-signature-tropical-breeze'),
      alt: 'Tropical Breeze mocktail with pineapple and mint garnish'
    },
    'berry-citrus': {
      ...getImagePath('drinks', 'drink-signature-berry-citrus'),
      alt: 'Berry Citrus mocktail with fresh berries and citrus zest'
    },
    'jardin-de-fraicheur': {
      ...getImagePath('drinks', 'drink-signature-jardin-de-fraicheur'),
      alt: 'Jardin de Fraîcheur mocktail with pear and violette'
    },
    'violette-de-minuit': {
      ...getImagePath('drinks', 'drink-signature-violette-de-minuit'),
      alt: 'Violette de Minuit mocktail with orange caviar garnish'
    },
    'kamehameha': {
      ...getImagePath('drinks', 'drink-signature-kamehameha'),
      alt: 'Kamehameha mocktail with dehydrated pineapple'
    }
  },
  wellness: {
    'un-cou-de-pouce': {
      ...getImagePath('drinks', 'drink-wellness-un-cou-de-pouce'),
      alt: 'Un Coup de Pouce wellness drink with ginger and turmeric'
    },
    'reveil-vitale': {
      ...getImagePath('drinks', 'drink-wellness-reveil-vitale'),
      alt: 'Réveil Vitale wellness drink with beetroot and apple'
    },
    'zeste-de-vitalite': {
      ...getImagePath('drinks', 'drink-wellness-zeste-de-vitalite'),
      alt: 'Zeste de Vitalité wellness drink with grapefruit and lemon'
    }
  },
  tea: {
    'ciel-ete': {
      ...getImagePath('drinks', 'drink-tea-ciel-ete'),
      alt: 'Ciel d\'Été tea with passion fruit and cinnamon'
    },
    'coucher-de-soleil': {
      ...getImagePath('drinks', 'drink-tea-coucher-de-soleil'),
      alt: 'Coucher de Soleil hibiscus and peach tea'
    },
    'energie-matcha': {
      ...getImagePath('drinks', 'drink-tea-energie-matcha'),
      alt: 'Énergie Matcha tea with matcha powder'
    }
  },
  coffee: {
    'coffee-classique': {
      ...getImagePath('drinks', 'drink-coffee-coffee-classique'),
      alt: 'Coffee Classique with tonka bean'
    },
    'choco-black-coffee': {
      ...getImagePath('drinks', 'drink-coffee-choco-black-coffee'),
      alt: 'Choco Black Coffee with dark chocolate'
    },
    'everest': {
      ...getImagePath('drinks', 'drink-coffee-everest'),
      alt: 'Everest coffee with hazelnut and almond'
    }
  }
};

// Ingredient images
export const ingredientImages = {
  'pineapple-coconut': {
    ...getImagePath('ingredients', 'ingredient-pineapple-coconut'),
    alt: 'Fresh pineapple and coconut for Tropical Breeze'
  },
  'fresh-berries': {
    ...getImagePath('ingredients', 'ingredient-fresh-berries'),
    alt: 'Fresh berries for Berry Citrus'
  },
  'ginger-turmeric': {
    ...getImagePath('ingredients', 'ingredient-ginger-turmeric'),
    alt: 'Ginger and turmeric for wellness drinks'
  },
  'beetroot-apple': {
    ...getImagePath('ingredients', 'ingredient-beetroot-apple'),
    alt: 'Beetroot and apple for Réveil Vitale'
  },
  'passion-fruit': {
    ...getImagePath('ingredients', 'ingredient-passion-fruit'),
    alt: 'Passion fruit for Ciel d\'Été'
  },
  'hibiscus-peach': {
    ...getImagePath('ingredients', 'ingredient-hibiscus-peach'),
    alt: 'Hibiscus and peach for Coucher de Soleil'
  },
  'matcha-powder': {
    ...getImagePath('ingredients', 'ingredient-matcha-powder'),
    alt: 'Matcha powder for Énergie Matcha'
  },
  'tonka-bean': {
    ...getImagePath('ingredients', 'ingredient-tonka-bean'),
    alt: 'Tonka bean for Coffee Classique'
  },
  'hazelnut-almond': {
    ...getImagePath('ingredients', 'ingredient-hazelnut-almond'),
    alt: 'Hazelnut and almond for Everest coffee'
  }
};

// Atmosphere images
export const atmosphereImages = {
  barCounter: {
    ...getImagePath('atmosphere', 'atmosphere-bar-counter'),
    alt: 'Elegant bar counter at SOBRE',
    sizes: '(max-width: 768px) 100vw, 600px'
  },
  drinkStation: {
    ...getImagePath('atmosphere', 'atmosphere-drink-station'),
    alt: 'Our drink preparation station',
    sizes: '(max-width: 768px) 100vw, 600px'
  },
  outdoorSeating: {
    ...getImagePath('atmosphere', 'atmosphere-outdoor-seating'),
    alt: 'Outdoor seating area',
    sizes: '(max-width: 768px) 100vw, 600px'
  }
};

// Process images
export const processImages = {
  infusion: {
    ...getImagePath('process', 'process-infusion-preparation'),
    alt: 'Preparing infusions',
    sizes: '(max-width: 768px) 100vw, 500px'
  },
  garnish: {
    ...getImagePath('process', 'process-garnish-creation'),
    alt: 'Creating beautiful garnishes',
    sizes: '(max-width: 768px) 100vw, 500px'
  },
  foam: {
    ...getImagePath('process', 'process-foam-technique'),
    alt: 'Special foam technique',
    sizes: '(max-width: 768px) 100vw, 500px'
  }
};

// Image component with lazy loading and placeholder
export const Image = ({ 
  src, 
  srcSet, 
  alt, 
  placeholder, 
  className = '', 
  width,
  height,
  sizes = '100vw',
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {placeholder && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            filter: 'blur(10px)',
            transform: 'scale(1.05)'
          }}
        />
      )}
      
      {/* Main image */}
      <img
        src={src}
        srcSet={srcSet}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  );
};

// Get drink image by ID
export const getDrinkImage = (category, id) => {
  const drinkCategory = drinkImages[category];
  if (!drinkCategory) return null;
  
  const image = drinkCategory[id];
  if (!image) {
    console.warn(`No image found for drink: ${category}/${id}`);
    return {
      ...getImagePath('drinks', 'placeholder-drink'),
      alt: 'Drink image not available'
    };
  }
  
  return image;
};

export default {
  hero: heroImages,
  drinks: drinkImages,
  ingredients: ingredientImages,
  atmosphere: atmosphereImages,
  process: processImages,
  getDrinkImage,
  Image
};
