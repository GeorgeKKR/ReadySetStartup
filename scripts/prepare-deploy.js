import fs from 'fs';
import path from 'path';

// Make sure the CNAME file is in the public directory
const cnameContent = 'readysetstartupuk.com';
const publicDir = path.resolve(process.cwd(), 'dist/public');
const cnamePath = path.resolve(publicDir, 'CNAME');

// Write the CNAME file
fs.writeFileSync(cnamePath, cnameContent);
console.log('CNAME file created for custom domain.');

// Also ensure we have a .nojekyll file to prevent GitHub Pages from using Jekyll
const nojekyllPath = path.resolve(publicDir, '.nojekyll');
fs.writeFileSync(nojekyllPath, '');
console.log('.nojekyll file created.');

console.log('Deployment preparation complete!'); 