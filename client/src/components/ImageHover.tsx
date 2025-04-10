import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ImageHoverProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  hoverEffect?: 'zoom' | 'lift' | 'glow' | 'tilt' | 'all';
  borderRadius?: string;
}

const ImageHover: React.FC<ImageHoverProps> = ({
  src,
  alt,
  className = '',
  width = '100%',
  height = 'auto',
  hoverEffect = 'zoom',
  borderRadius = '0.75rem'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Define different effects based on the hoverEffect prop
  let hoverStyles = {};
  
  switch (hoverEffect) {
    case 'zoom':
      hoverStyles = { scale: 1.05 };
      break;
    case 'lift':
      hoverStyles = { y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' };
      break;
    case 'glow':
      hoverStyles = { 
        boxShadow: `0 0 20px 5px hsla(var(--accent) / 0.3)`,
        scale: 1.02
      };
      break;
    case 'tilt':
      // We'll handle tilt with event handlers
      break;
    case 'all':
      hoverStyles = { 
        scale: 1.05, 
        y: -5,
        boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 0 15px 5px hsla(var(--accent) / 0.2)`
      };
      break;
    default:
      hoverStyles = { scale: 1.05 };
  }

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverEffect === 'tilt' || hoverEffect === 'all') {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate tilt based on mouse position
      const tiltX = (e.clientY - centerY) / (rect.height / 2) * 10; // Max 10 degrees
      const tiltY = (centerX - e.clientX) / (rect.width / 2) * 10;
      
      setRotateX(tiltX);
      setRotateY(tiltY);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      style={{ 
        width, 
        height, 
        borderRadius,
        perspective: 1000
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        ...(isHovered ? hoverStyles : {})
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        animate={{ 
          scale: isHovered && (hoverEffect === 'zoom' || hoverEffect === 'all') ? 1.05 : 1
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export default ImageHover;