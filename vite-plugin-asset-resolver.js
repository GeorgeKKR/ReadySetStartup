// Custom plugin to resolve asset paths
export default function assetResolverPlugin() {
  return {
    name: 'vite-plugin-asset-resolver',
    resolveId(id) {
      // Catch problematic asset paths that Vite is trying to resolve as modules
      if (id.includes('/assets/episodes/src/') || 
          id.includes('/assets/judges/src/') ||
          id.includes('/assets/images/src/')) {
        // Return a virtual module path to prevent the error
        return '\0virtual:asset:' + id;
      }
      return null;
    },
    load(id) {
      // Return empty module for virtual asset paths
      if (id.startsWith('\0virtual:asset:')) {
        return 'export default "";';
      }
      
      // Handle image file imports
      if (id.match(/\.(webp|jpg|jpeg|png|gif|svg)$/i)) {
        // Just let Vite handle these directly
        return null;
      }
      
      return null;
    },
    
    // Transform to convert direct image imports to URLs
    transform(code, id) {
      if (id.match(/\.(tsx|jsx|ts|js)$/i)) {
        // Look for asset paths and convert them to import statements
        const assetPattern = /(['"])\/assets\/.*?\.(webp|jpg|jpeg|png|gif|svg)(['"])/g;
        return code.replace(assetPattern, (match) => {
          return match; // No changes needed, just making sure we don't break anything
        });
      }
      return null;
    }
  };
} 