import React, { useEffect, useRef, useState } from 'react';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  className?: string;
  dotColor?: string;
  shapeColors?: string[];
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  className = '',
  dotColor = '#FFA64D',
  shapeColors = ['#FF7F32', '#FFB266', '#FFF2E6']
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to set initial positions
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Calculate parallax positions
  const dotTransform = `translateY(${scrollY * 0.5}px)`;
  
  // Different parallax speeds for each shape
  const shape1Transform = `translate3d(${scrollY * 0.3}px, ${scrollY * 0.5}px, 0) rotate(${scrollY * 0.02}deg)`;
  const shape2Transform = `translate3d(${scrollY * -0.4}px, ${scrollY * 0.3}px, 0) rotate(${scrollY * -0.01}deg)`;
  const shape3Transform = `translate3d(${scrollY * 0.2}px, ${scrollY * -0.5}px, 0) rotate(${scrollY * 0.03}deg)`;
  const shape4Transform = `translate3d(${scrollY * -0.25}px, ${scrollY * 0.35}px, 0) rotate(${scrollY * -0.02}deg)`;
  const shape5Transform = `translate3d(${scrollY * 0.35}px, ${scrollY * 0.2}px, 0) scale(${1 + scrollY * 0.0005})`;
  
  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Dotted Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${dotColor}15 2px, transparent 0)`,
          backgroundSize: '22px 22px',
          backgroundPosition: '0 0',
          transform: dotTransform,
          willChange: 'transform'
        }}
      />
      
      {/* Abstract Geometric Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Shape 1: Triangle (top-left) */}
        <div 
          className="absolute -left-32 -top-32 w-96 h-96 opacity-20"
          style={{
            backgroundColor: shapeColors[0],
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transform: shape1Transform,
            willChange: 'transform'
          }}
        />
        
        {/* Shape 2: Square (mid-right) */}
        <div 
          className="absolute -right-32 top-1/4 w-80 h-80 opacity-10"
          style={{
            backgroundColor: shapeColors[1],
            transform: shape2Transform,
            willChange: 'transform'
          }}
        />
        
        {/* Shape 3: Circle (bottom-left) */}
        <div 
          className="absolute -left-40 bottom-10 w-96 h-96 rounded-full opacity-15"
          style={{
            backgroundColor: shapeColors[2],
            transform: shape3Transform,
            willChange: 'transform'
          }}
        />
        
        {/* Shape 4: Triangle (bottom-right) */}
        <div 
          className="absolute right-0 bottom-0 w-64 h-64 opacity-10"
          style={{
            backgroundColor: shapeColors[0],
            clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)',
            transform: shape4Transform,
            willChange: 'transform'
          }}
        />
        
        {/* Shape 5: Circle (top-right) */}
        <div 
          className="absolute right-40 top-20 w-32 h-32 rounded-full opacity-20"
          style={{
            backgroundColor: shapeColors[1],
            transform: shape5Transform,
            willChange: 'transform'
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParallaxBackground; 