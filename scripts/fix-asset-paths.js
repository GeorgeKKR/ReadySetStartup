import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Get all files in the src directory
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and dist directories
      if (file !== 'node_modules' && file !== 'dist') {
        getAllFiles(filePath, fileList);
      }
    } else {
      // Only include certain file types
      const ext = path.extname(file).toLowerCase();
      if (['.ts', '.tsx', '.js', '.jsx', '.html', '.css'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

// Replace all occurrences of '/ReadySetStartup/' with '/'
function fixAssetPaths(filePath) {
  console.log(`Processing: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace '/ReadySetStartup/assets/' with '/assets/'
  const oldContent = content;
  content = content.replace(/\/ReadySetStartup\/assets\//g, '/assets/');
  
  // Save the file if changes were made
  if (content !== oldContent) {
    console.log(`Updating file: ${filePath}`);
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

// Process client source files
const clientDir = path.resolve(rootDir, 'client');
if (fs.existsSync(clientDir)) {
  const files = getAllFiles(clientDir);
  console.log(`Found ${files.length} files to process`);
  
  files.forEach(file => {
    fixAssetPaths(file);
  });
}

console.log('Asset path fixing completed!'); 