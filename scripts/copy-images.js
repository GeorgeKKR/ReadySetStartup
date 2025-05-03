import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Make sure the images directory exists
const imagesDir = path.resolve(rootDir, 'client/public/assets/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log(`Created directory: ${imagesDir}`);
}

// Original episode images location
const srcEpisodesDir = path.resolve(rootDir, 'client/public/assets/episodes');

// Check if the source directory exists
if (!fs.existsSync(srcEpisodesDir)) {
  console.error(`Source directory not found: ${srcEpisodesDir}`);
  process.exit(1);
}

// Map of original filenames to new filenames
const episodeFileMap = {
  'episode 1.webp': 'episode1.webp',
  'Episode 1.webp': 'episode1.webp',
  'Episode 2.webp': 'episode2.webp',
  'episode 3.webp': 'episode3.webp',
  'Episode 4.webp': 'episode4.webp',
  'Episode 5.webp': 'episode5.webp',
  'Episode 6.webp': 'episode6.webp'
};

// Copy episode images to the new location
try {
  const files = fs.readdirSync(srcEpisodesDir);
  
  // Filter for episode files that match our map
  const episodeFiles = files.filter(file => 
    Object.keys(episodeFileMap).includes(file)
  );
  
  if (episodeFiles.length === 0) {
    console.log('No episode files found to copy');
  }
  
  // Copy each file to the new location with the new name
  episodeFiles.forEach(file => {
    const srcPath = path.join(srcEpisodesDir, file);
    const destPath = path.join(imagesDir, episodeFileMap[file]);
    
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied: ${file} -> ${episodeFileMap[file]}`);
  });
  
  console.log('Image copying completed!');
} catch (error) {
  console.error('Error copying files:', error);
  process.exit(1);
} 