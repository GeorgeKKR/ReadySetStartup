import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, PlayCircle } from 'lucide-react';
import { useRouter, Link } from '@/lib/router';
import { getAssetPath } from '@/lib/assetPath';
import { AppLink } from './AppLink';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { location } = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when changing locations (navigating away)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent scroll when menu is open on mobile
  useEffect(() => {
    if (isMobile && isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'Seasons', path: '/seasons' },
    { name: 'Judges', path: '/judges' },
    { name: 'Mentors', path: '/mentors' },
    { name: 'Clips', path: '/clips' },
    { name: 'Resources', path: '/resources' },
    { name: 'Apply', path: '/apply' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-primary shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <AppLink href="/" className="flex items-center">
            <img 
              src={getAssetPath('assets/logos/LogoRssWhite.png')} 
              alt="Ready Set StartUP UK Logo" 
              className="h-10 md:h-12"
            />
          </AppLink>
          <button 
            className="md:hidden text-foreground text-xl p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Navigation - increased text size to text-lg */}
        <nav className="hidden md:flex items-center space-x-8 text-lg font-semibold mt-4 md:mt-0">
          {navLinks.map((link) => (
            <AppLink 
              key={link.path} 
              href={link.path}
              className={`hover:text-[hsl(var(--accent-secondary))] transition-colors ${
                location === link.path ? 'text-[hsl(var(--accent-secondary))]' : ''
              }`}
            >
              {link.name}
            </AppLink>
          ))}
        </nav>
        
        {/* Watch Now button - search form removed */}
        <div className="hidden md:flex items-center mt-4 md:mt-0">
          <a 
            href="https://www.amazon.co.uk/gp/video/detail/amzn1.dv.gti.6346669a-7e09-4a55-9dc0-0e8f93a30ecc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-accent hover:bg-[hsl(var(--accent-secondary))] transition-colors px-4 py-2 rounded-full text-sm font-bold flex items-center"
          >
            <PlayCircle className="mr-1 h-4 w-4" />
            <span>Watch on Prime</span>
          </a>
        </div>
      </div>
      
      {/* Mobile Navigation - Full screen overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-primary z-40 md:hidden pt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="container mx-auto px-6 py-8 flex flex-col h-full">
              <div className="space-y-6 flex-grow">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * navLinks.indexOf(link) }}
                  >
                    <AppLink 
                      href={link.path}
                      className={`block py-3 text-2xl font-semibold transition-colors ${
                        location === link.path 
                          ? 'text-[hsl(var(--accent-secondary))]' 
                          : 'hover:text-[hsl(var(--accent-secondary))]'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </AppLink>
                    <div className="h-px bg-gray-800 mt-3"></div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-auto mb-8"
              >
                <a 
                  href="https://www.amazon.co.uk/gp/video/detail/amzn1.dv.gti.6346669a-7e09-4a55-9dc0-0e8f93a30ecc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-accent hover:bg-[hsl(var(--accent-secondary))] transition-colors px-4 py-3 rounded-lg text-center text-lg font-bold flex items-center justify-center"
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch on Prime Video
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
