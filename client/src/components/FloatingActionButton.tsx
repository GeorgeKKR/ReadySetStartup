import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsUp, Play, Menu, X } from 'lucide-react';

interface FloatingActionButtonProps {
  actions?: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  mainIcon?: React.ReactNode;
  expandDirection?: 'up' | 'left' | 'right' | 'down';
  className?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  actions = [],
  position = 'bottom-right',
  mainIcon = <Menu />,
  expandDirection = 'up',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };
  
  // Direction variants
  const directionVariants = {
    up: (index: number) => ({ y: -20 - index * 60, x: 0 }),
    down: (index: number) => ({ y: 20 + index * 60, x: 0 }),
    left: (index: number) => ({ x: -20 - index * 60, y: 0 }),
    right: (index: number) => ({ x: 20 + index * 60, y: 0 }),
  };
  
  // Generate tooltip position based on expand direction
  const getTooltipPosition = () => {
    switch (expandDirection) {
      case 'up':
        return 'left-full ml-4';
      case 'down':
        return 'left-full ml-4';
      case 'left':
        return 'bottom-full mb-2';
      case 'right':
        return 'bottom-full mb-2';
      default:
        return 'left-full ml-4';
    }
  };
  
  // Neumorphic effect - light inner shadow when pressed
  const buttonVariants = {
    default: {
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1), inset 0 0 0 rgba(0, 0, 0, 0)",
    },
    pressed: {
      boxShadow: "0 5px 10px -3px rgba(0, 0, 0, 0.15), 0 2px 4px -2px rgba(0, 0, 0, 0.05), inset 2px 2px 5px rgba(0, 0, 0, 0.1)",
    }
  };
  
  return (
    <div className={`fixed ${positionClasses[position]} z-40 ${className}`}>
      {/* Secondary Action Buttons */}
      <AnimatePresence>
        {isOpen && actions.map((action, index) => (
          <motion.div
            key={index}
            className="absolute flex items-center"
            initial={{ opacity: 0, scale: 0, ...directionVariants[expandDirection](0) }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              ...directionVariants[expandDirection](index + 1) 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0, 
              ...directionVariants[expandDirection](0) 
            }}
            transition={{ 
              duration: 0.2, 
              delay: 0.05 * index,
              type: "spring",
              stiffness: 350,
              damping: 25
            }}
          >
            <motion.button
              className="w-12 h-12 rounded-full bg-primary border border-accent/20 text-accent flex items-center justify-center relative group"
              whileHover={{ scale: 1.1, backgroundColor: "hsla(var(--accent) / 0.2)" }}
              whileTap="pressed"
              variants={buttonVariants}
              onClick={action.onClick}
              aria-label={action.label}
            >
              {action.icon}
              
              {/* Glass tooltip */}
              <motion.div
                className={`absolute ${getTooltipPosition()} py-1 px-3 bg-black/40 backdrop-blur-md rounded border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm">{action.label}</span>
              </motion.div>
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Main Button */}
      <motion.button
        className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/80 text-white flex items-center justify-center shadow-lg relative z-50"
        whileHover={{ scale: 1.05 }}
        whileTap="pressed"
        variants={buttonVariants}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X size={24} /> : mainIcon}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;