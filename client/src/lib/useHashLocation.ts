import { useState, useEffect, useCallback } from 'react';

// Custom hash-based location hook for wouter on GitHub Pages
export const useHashLocation = (): [string, (to: string) => void] => {
  // Hash location minus the leading '#' character
  const getHashLocation = () => {
    // Get the hash without the # or default to '/'
    const hash = window.location.hash.replace(/^#/, '') || '/';
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
    
    // Initial setup to ensure we have a hash if needed
    if (!window.location.hash && window.location.pathname.endsWith('/ReadySetStartup/')) {
      // Set default hash to '/' for the home page
      window.location.hash = '/';
    }
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleHashChange]);

  // Navigate function that updates the hash
  const navigate = useCallback((to: string) => {
    window.location.hash = to;
  }, []);

  return [location, navigate];
}; 