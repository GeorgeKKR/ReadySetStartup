import { useState, useEffect, useCallback } from 'react';

// Custom hash-based location hook for our SPA
export const useHashLocation = (): [string, (to: string) => void] => {
  // Hash location minus the leading '#' character
  const getHashLocation = () => {
    // Get the hash without the # or default to '/'
    let hash = window.location.hash.replace(/^#/, '') || '/';
    
    // If the hash doesn't start with '/', add it
    if (!hash.startsWith('/')) {
      hash = '/' + hash;
    }
    
    return hash;
  };

  const [location, setLocation] = useState<string>(getHashLocation());
  
  // Update location state when hash changes
  const handleHashChange = useCallback(() => {
    setLocation(getHashLocation());
  }, []);

  // Initialize listener for hash changes
  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    
    // Check if we need to redirect
    const pathname = window.location.pathname;
    
    // Handle direct access to pages (no hash)
    if (!window.location.hash) {
      // Skip if it's just the home page or static assets
      if (pathname === '/' || pathname === '/index.html' || pathname.startsWith('/assets/')) {
        // Set default hash to '/' for the home page if needed
        if (!window.location.hash) {
          window.location.hash = '/';
        }
      } else {
        // Clean the path
        let path = pathname;
        if (path.endsWith('.html')) {
          path = path.replace(/\.html$/, '');
        }
        if (!path.startsWith('/')) {
          path = '/' + path;
        }
        
        // Redirect to the hash-based route
        window.location.hash = path;
      }
    }
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleHashChange]);

  // Navigate function that updates the hash
  const navigate = useCallback((to: string) => {
    // Make sure path starts with a slash
    const path = to.startsWith('/') ? to : '/' + to;
    window.location.hash = path;
  }, []);

  return [location, navigate];
}; 