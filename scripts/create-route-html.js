import fs from 'fs';
import path from 'path';

// Define the routes we want to support
const routes = [
  '/',
  '/seasons',
  '/cast',
  '/judges',
  '/mentors',
  '/clips',
  '/resources',
  '/apply'
];

// Path to the build output directory
const publicDir = path.resolve(process.cwd(), 'dist/public');

// Read the index.html file
const indexPath = path.resolve(publicDir, 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Make sure the 404.html file is set up correctly
const notFoundPath = path.resolve(publicDir, '404.html');
const notFoundContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Ready Set StartUP UK</title>
  <script type="text/javascript">
    // SPA routing for custom domain
    (function() {
      // Single page apps for custom domain
      const l = window.location;
      
      // Don't redirect if we're already on a hash route
      if (l.hash) return;
      
      // Get the path
      let path = l.pathname;
      
      // Make sure we have a leading slash
      if (path.charAt(0) !== '/') {
        path = '/' + path;
      }
      
      // If we have a trailing .html, remove it
      if (path.endsWith('.html')) {
        path = path.substring(0, path.length - 5);
      }
      
      // If we just have / then we're on home page
      if (path === '/' || path === '') {
        path = '/';
      }
      
      // Redirect to the hash-based route
      const redirectUrl = 
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        '/#' + path;
      
      window.location.replace(redirectUrl);
    })();
  </script>
</head>
<body>
  <h1>Redirecting...</h1>
  <p>If you are not redirected automatically, please <a href="/#/">click here</a>.</p>
</body>
</html>`;

// Write the 404.html file
fs.writeFileSync(notFoundPath, notFoundContent);
console.log('Created 404.html');

// Create an HTML file for each route
routes.forEach(route => {
  // Skip the root route since we already have index.html
  if (route === '/') return;
  
  // Create directory if it doesn't exist
  const dirPath = path.resolve(publicDir, route.substring(1));
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Write the index.html file to each route directory
  const filePath = path.resolve(dirPath, 'index.html');
  fs.writeFileSync(filePath, indexContent);
  console.log(`Created ${route}/index.html`);
});

console.log('Route HTML generation complete!'); 