import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

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
        isScrolled ? 'bg-primary shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <a href="/ReadySetStartup/" className="flex items-center">
            <img 
              src="/ReadySetStartup/assets/logos/LogoRssWhite.png" 
              alt="Ready Set StartUP UK Logo" 
              className="h-10 md:h-12"
            />
          </a>
          <button 
            className="md:hidden text-foreground text-xl"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Navigation - increased text size to text-lg */}
        <nav className="hidden md:flex items-center space-x-8 text-lg font-semibold mt-4 md:mt-0">
          {navLinks.map((link) => (
            <a 
              key={link.path} 
              href={`/ReadySetStartup${link.path}`}
              className={`hover:text-[hsl(var(--accent-secondary))] transition-colors ${
                location === link.path ? 'text-[hsl(var(--accent-secondary))]' : ''
              }`}
            >
              {link.name}
            </a>
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
            <span>Watch on Prime</span>
          </a>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-secondary overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-2 space-y-3">
              {navLinks.map((link) => (
                <a 
                  key={link.path} 
                  href={`/ReadySetStartup${link.path}`}
                  className={`block py-2 text-lg hover:text-[hsl(var(--accent-secondary))] ${
                    location === link.path ? 'text-[hsl(var(--accent-secondary))]' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="https://www.amazon.co.uk/gp/video/detail/amzn1.dv.gti.6346669a-7e09-4a55-9dc0-0e8f93a30ecc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-accent hover:bg-[hsl(var(--accent-secondary))] transition-colors px-4 py-2 rounded-full text-center text-sm font-bold"
              >
                Watch on Prime Video
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
