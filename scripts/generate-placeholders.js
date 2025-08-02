/**
 * Placeholder Image Generator for SOBRE
 * 
 * This script generates placeholder images with the correct dimensions and naming
 * for all the images used in the SOBRE website.
 * 
 * Run with: node scripts/generate-placeholders.js
 */

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const sharp = require('sharp');

// Ensure the output directories exist
const outputDirs = [
  'frontend/public/images/hero',
  'frontend/public/images/drinks',
  'frontend/public/images/ingredients',
  'frontend/public/images/atmosphere',
  'frontend/public/images/process',
  'frontend/public/images/placeholders'
];

outputDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Colors for different image types
const colors = {
  hero: '#4A6B5A',      // Sage green
  drinks: '#8B5A2B',    // Brown
  ingredients: '#6B8E23', // Olive green
  atmosphere: '#8B4513', // Saddle brown
  process: '#556B2F',    // Dark olive green
  placeholder: '#999999' // Gray
};

// Function to create a placeholder image
async function createPlaceholder(width, height, text, outputPath, color = colors.placeholder) {
  // Create a canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  
  // Add text
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Calculate font size based on canvas size
  const fontSize = Math.min(width / 10, height / 5);
  ctx.font = `bold ${fontSize}px Arial`;
  
  // Add text with shadow for better visibility
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  // Split text into multiple lines if needed
  const maxCharsPerLine = Math.floor(width / (fontSize * 0.6));
  const words = text.split(' ');
  let lines = [];
  let currentLine = words[0];
  
  for (let i = 1; i < words.length; i++) {
    if ((currentLine + ' ' + words[i]).length <= maxCharsPerLine) {
      currentLine += ' ' + words[i];
    } else {
      lines.push(currentLine);
      currentLine = words[i];
    }
  }
  lines.push(currentLine);
  
  // Draw each line
  const lineHeight = fontSize * 1.2;
  const startY = (height - (lines.length * lineHeight)) / 2;
  
  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, startY + (index * lineHeight));
  });
  
  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  await sharp(buffer)
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(outputPath);
  
  console.log(`Created: ${outputPath}`);
}

// Generate all placeholder images
async function generateAllPlaceholders() {
  console.log('Generating placeholder images...');
  
  // Hero images
  await createPlaceholder(
    1920, 1080, 
    'Hero: Main Bar Atmosphere', 
    'frontend/public/images/hero/hero-main-bar-atmosphere.jpg',
    colors.hero
  );
  
  await createPlaceholder(
    1920, 800, 
    'Hero: Drink Preparation', 
    'frontend/public/images/hero/hero-drink-preparation.jpg',
    colors.hero
  );
  
  await createPlaceholder(
    1920, 1080, 
    'Background: Natural Ingredients', 
    'frontend/public/images/hero/bg-natural-ingredients.jpg',
    colors.hero
  );
  
  // Signature Drinks
  const signatureDrinks = [
    'tropical-breeze',
    'berry-citrus',
    'jardin-de-fraicheur',
    'violette-de-minuit',
    'kamehameha'
  ];
  
  for (const drink of signatureDrinks) {
    await createPlaceholder(
      400, 400, 
      `Signature: ${drink.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`, 
      `frontend/public/images/drinks/drink-signature-${drink}.jpg`,
      colors.drinks
    );
  }
  
  // Wellness Drinks
  const wellnessDrinks = [
    'un-cou-de-pouce',
    'reveil-vitale',
    'zeste-de-vitalite'
  ];
  
  for (const drink of wellnessDrinks) {
    await createPlaceholder(
      400, 400, 
      `Wellness: ${drink.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`, 
      `frontend/public/images/drinks/drink-wellness-${drink}.jpg`,
      colors.drinks
    );
  }
  
  // Tea Drinks
  const teaDrinks = [
    'ciel-ete',
    'coucher-de-soleil',
    'energie-matcha'
  ];
  
  for (const drink of teaDrinks) {
    await createPlaceholder(
      400, 400, 
      `Tea: ${drink.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`, 
      `frontend/public/images/drinks/drink-tea-${drink}.jpg`,
      colors.drinks
    );
  }
  
  // Coffee Drinks
  const coffeeDrinks = [
    'coffee-classique',
    'choco-black-coffee',
    'everest'
  ];
  
  for (const drink of coffeeDrinks) {
    await createPlaceholder(
      400, 400, 
      `Coffee: ${drink.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`, 
      `frontend/public/images/drinks/drink-coffee-${drink}.jpg`,
      colors.drinks
    );
  }
  
  // Ingredients
  const ingredients = [
    'pineapple-coconut',
    'fresh-berries',
    'ginger-turmeric',
    'beetroot-apple',
    'passion-fruit',
    'hibiscus-peach',
    'matcha-powder',
    'tonka-bean',
    'hazelnut-almond'
  ];
  
  for (const ingredient of ingredients) {
    await createPlaceholder(
      300, 200, 
      `Ingredient: ${ingredient.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`, 
      `frontend/public/images/ingredients/ingredient-${ingredient}.jpg`,
      colors.ingredients
    );
  }
  
  // Atmosphere
  const atmosphere = [
    'bar-counter',
    'drink-station',
    'outdoor-seating'
  ];
  
  for (const item of atmosphere) {
    await createPlaceholder(
      600, 400, 
      `Atmosphere: ${item.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`, 
      `frontend/public/images/atmosphere/atmosphere-${item}.jpg`,
      colors.atmosphere
    );
  }
  
  // Process
  const processes = [
    'infusion-preparation',
    'garnish-creation',
    'foam-technique'
  ];
  
  for (const process of processes) {
    await createPlaceholder(
      500, 300, 
      `Process: ${process.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`, 
      `frontend/public/images/process/process-${process}.jpg`,
      colors.process
    );
  }
  
  // Generate low-quality placeholders for lazy loading
  await createLowQualityPlaceholders();
  
  console.log('\n✅ All placeholder images generated successfully!');
  console.log('\nNext steps:');
  console.log('1. Replace the placeholder images in the public/images directory with your actual images');
  console.log('2. Make sure to keep the same filenames and directory structure');
  console.log('3. Run the image optimization script to generate responsive versions');
}

// Create low quality placeholders for lazy loading
async function createLowQualityPlaceholders() {
  const placeholderDir = 'frontend/public/images/placeholders';
  if (!fs.existsSync(placeholderDir)) {
    fs.mkdirSync(placeholderDir, { recursive: true });
  }
  
  // Get all image files
  const imageDirs = [
    'frontend/public/images/hero',
    'frontend/public/images/drinks',
    'frontend/public/images/ingredients',
    'frontend/public/images/atmosphere',
    'frontend/public/images/process'
  ];
  
  for (const dir of imageDirs) {
    const files = fs.readdirSync(dir).filter(file => 
      file.endsWith('.jpg') || 
      file.endsWith('.jpeg') || 
      file.endsWith('.png')
    );
    
    for (const file of files) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(placeholderDir, `${path.parse(file).name}-placeholder.jpg`);
      
      // Skip if placeholder already exists
      if (fs.existsSync(outputPath)) continue;
      
      // Create a very low quality version (5% quality, 20px width)
      await sharp(inputPath)
        .resize(20, null, { fit: 'inside' })
        .jpeg({ quality: 5, mozjpeg: true })
        .blur(1)
        .toFile(outputPath);
      
      console.log(`Created LQIP: ${outputPath}`);
    }
  }
}

// Run the script
generateAllPlaceholders().catch(console.error);
