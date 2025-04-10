import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'glow' | 'border' | 'scale' | 'tilt' | 'all';
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  hoverEffect = 'lift',
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  // Define different effects based on the hoverEffect prop
  let hoverStyles = {};
  
  switch (hoverEffect) {
    case 'lift':
      hoverStyles = { 
        y: -8, 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)' 
      };
      break;
    case 'glow':
      hoverStyles = { 
        boxShadow: `0 0 20px 5px hsla(var(--accent) / 0.2)`,
        scale: 1.01
      };
      break;
    case 'border':
      hoverStyles = { 
        boxShadow: `0 0 0 2px hsla(var(--accent) / 0.8)`,
        scale: 1.01
      };
      break;
    case 'scale':
      hoverStyles = { scale: 1.03 };
      break;
    case 'tilt':
      // Handled in event handlers
      break;
    case 'all':
      hoverStyles = { 
        scale: 1.02, 
        y: -5,
        boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 0 0 2px hsla(var(--accent) / 0.5)`
      };
      break;
    default:
      hoverStyles = { y: -8 };
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverEffect === 'tilt' || hoverEffect === 'all') {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate tilt based on mouse position
      const tiltX = (e.clientY - centerY) / (rect.height / 2) * 5; // Max 5 degrees
      const tiltY = (centerX - e.clientX) / (rect.width / 2) * 5;
      
      setRotateX(tiltX);
      setRotateY(tiltY);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    if (onMouseLeave) onMouseLeave();
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      style={{ perspective: 1000 }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        rotateX: (hoverEffect === 'tilt' || hoverEffect === 'all') ? rotateX : 0,
        rotateY: (hoverEffect === 'tilt' || hoverEffect === 'all') ? rotateY : 0,
        ...(isHovered ? hoverStyles : {})
      }}
      whileTap={{ scale: onClick ? 0.98 : 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;