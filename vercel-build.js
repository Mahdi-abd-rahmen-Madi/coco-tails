const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Vercel build process...');

// Install frontend dependencies
console.log('Installing frontend dependencies...');
execSync('cd frontend && npm install --no-audit --prefer-offline', { stdio: 'inherit' });

// Build frontend
console.log('Building frontend...');
execSync('cd frontend && npm run build', { stdio: 'inherit' });

// Create output directory if it doesn't exist
const outputDir = path.join(process.cwd(), '.vercel', 'output', 'static');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Copy frontend build to output directory
console.log('Copying frontend build to output directory...');
const frontendBuildDir = path.join(process.cwd(), 'frontend', 'dist');
if (fs.existsSync(frontendBuildDir)) {
  const { execSync } = require('child_process');
  execSync(`cp -r ${frontendBuildDir}/* ${outputDir}/`, { stdio: 'inherit' });
}

console.log('Vercel build completed successfully!');
