import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  backgroundImg?: string;
  overlayColor?: string;
  speed?: number; // 1-10, where 10 is fastest
  direction?: 'up' | 'down' | 'left' | 'right';
  reverse?: boolean;
  height?: string;
  zIndex?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  backgroundImg,
  overlayColor = 'rgba(0, 0, 0, 0.4)',
  speed = 5,
  direction = 'up',
  reverse = false,
  height = 'auto',
  zIndex = 0,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Normalize speed value
  const normalizedSpeed = Math.min(Math.max(speed, 1), 10) / 10;
  const parallaxAmount = normalizedSpeed * 200; // max 200px of movement
  
  // Get scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Determine transform values based on direction
  let transformProps = {};
  if (direction === 'up' || direction === 'down') {
    const yValue = direction === 'down' ? 
      [reverse ? parallaxAmount : -parallaxAmount, reverse ? -parallaxAmount : parallaxAmount] : 
      [reverse ? -parallaxAmount : parallaxAmount, reverse ? parallaxAmount : -parallaxAmount];
    
    transformProps = {
      y: useTransform(scrollYProgress, [0, 1], yValue),
      scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]),
    };
  } else {
    const xValue = direction === 'right' ? 
      [reverse ? parallaxAmount : -parallaxAmount, reverse ? -parallaxAmount : parallaxAmount] : 
      [reverse ? -parallaxAmount : parallaxAmount, reverse ? parallaxAmount : -parallaxAmount];
    
    transformProps = {
      x: useTransform(scrollYProgress, [0, 1], xValue),
      scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]),
    };
  }
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      ref={sectionRef}
      style={{ height, zIndex }}
    >
      {backgroundImg && (
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{
            ...transformProps,
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay */}
          <div 
            className="absolute inset-0" 
            style={{ backgroundColor: overlayColor }}
          />
        </motion.div>
      )}
      
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;