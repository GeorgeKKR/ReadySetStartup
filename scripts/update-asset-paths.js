import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root directories to search
const clientDir = path.resolve(__dirname, '../client/src');

// Find all .tsx and .ts files in the client/src directory
function findFiles(dir, extensions, results = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findFiles(filePath, extensions, results);
    } else if (extensions.some(ext => file.endsWith(ext))) {
      results.push(filePath);
    }
  }
  
  return results;
}

// Patterns to check for
const patterns = [
  // Check for hard-coded image paths
  {
    regex: /src=["']\/ReadySetStartup\/assets\//g,
    replacement: 'src={getAssetPath(\'assets/'
  },
  {
    regex: /src=["'](\/assets\/[^"']+)["']/g,
    replacement: 'src={getAssetPath(\'$1\')}'
  },
  {
    regex: /background-image: url\(["']\/ReadySetStartup\/assets\//g,
    replacement: 'background-image: url(getAssetPath(\'assets/'
  },
  {
    regex: /bg-\[url\(["']\/ReadySetStartup\/assets\//g,
    replacement: 'bg-[url(getAssetPath(\'assets/'
  },
  // Links
  {
    regex: /<Link to=["']([^"']+)["']/g,
    replacement: '<AppLink href=\'$1\''
  }
];

// Find all component files
const componentFiles = findFiles(clientDir, ['.tsx', '.ts']);

console.log(`Found ${componentFiles.length} component files to check`);

// Files that need modification
const filesToModify = [];

// Check each file for patterns
for (const file of componentFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let needsModification = false;
  
  for (const pattern of patterns) {
    if (pattern.regex.test(content)) {
      needsModification = true;
      break;
    }
  }
  
  if (needsModification) {
    filesToModify.push({
      file,
      relativePath: path.relative(path.resolve(__dirname, '..'), file)
    });
  }
}

console.log('\nFiles that need asset path updates:');
filesToModify.forEach(file => {
  console.log(file.relativePath);
});

console.log(`\n${filesToModify.length} files need to be updated.`);
console.log('\nTo update the files:');
console.log('1. Import the getAssetPath utility: import { getAssetPath } from \'@/lib/assetPath\';');
console.log('2. Replace <Link> with <AppLink> and import { AppLink } from \'@/components/AppLink\';');
console.log('3. Update all asset paths with getAssetPath(\'path/to/asset\')'); 