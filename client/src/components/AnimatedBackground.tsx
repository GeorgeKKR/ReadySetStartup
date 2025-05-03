import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  children?: React.ReactNode;
  type?: 'dots' | 'grid' | 'wave' | 'gradient';
  color?: string;
  secondaryColor?: string;
  className?: string;
  intensity?: number; // 1-10
  speed?: number; // 1-10
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  type = 'dots',
  color = 'hsla(var(--accent) / 0.15)',
  secondaryColor = 'hsla(var(--accent-secondary) / 0.1)',
  className = '',
  intensity = 5,
  speed = 5
}) => {
  // Scale factors based on intensity (1-10)
  const dotSize = 1 + (intensity * 0.5); // 1.5-6px
  const dotSpacing = 30 - (intensity * 1.5); // 15-25px
  const animationDuration = 11 - speed; // 10-1s
  
  // Pre-compute wave parameters to prevent undefined values
  const waveIntensity = useMemo(() => Math.max(20, intensity * 10), [intensity]); // 20-100px
  
  // Pre-compute wave paths to prevent undefined values in animation
  const wavePath1 = useMemo(() => {
    return {
      start: `M0,50 C150,${100 - waveIntensity} 350,${100 + waveIntensity} 500,50 C650,${0 - waveIntensity} 850,${0 + waveIntensity} 1000,50 L1000,100 L0,100 Z`,
      middle: `M0,50 C150,${100 + waveIntensity} 350,${100 - waveIntensity} 500,50 C650,${0 + waveIntensity} 850,${0 - waveIntensity} 1000,50 L1000,100 L0,100 Z`,
      end: `M0,50 C150,${100 - waveIntensity} 350,${100 + waveIntensity} 500,50 C650,${0 - waveIntensity} 850,${0 + waveIntensity} 1000,50 L1000,100 L0,100 Z`
    };
  }, [waveIntensity]);
  
  const wavePath2 = useMemo(() => {
    return {
      start: `M0,60 C200,${120 - waveIntensity} 400,${120 + waveIntensity} 600,60 C800,${10 - waveIntensity} 1000,${10 + waveIntensity} 1200,60 L1200,100 L0,100 Z`,
      middle: `M0,60 C200,${120 + waveIntensity} 400,${120 - waveIntensity} 600,60 C800,${10 + waveIntensity} 1000,${10 - waveIntensity} 1200,60 L1200,100 L0,100 Z`,
      end: `M0,60 C200,${120 - waveIntensity} 400,${120 + waveIntensity} 600,60 C800,${10 - waveIntensity} 1000,${10 + waveIntensity} 1200,60 L1200,100 L0,100 Z`
    };
  }, [waveIntensity]);
  
  // Generate grid of dots
  const renderDots = () => {
    return (
      <div
        className="absolute inset-0 overflow-hidden opacity-50"
        style={{
          backgroundImage: `radial-gradient(${color} ${dotSize}px, transparent 0)`,
          backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
          backgroundPosition: '0 0'
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            x: [0, dotSpacing, 0],
            y: [0, dotSpacing, 0]
          }}
          transition={{
            duration: animationDuration,
            ease: "linear",
            repeat: Infinity
          }}
          style={{
            backgroundImage: `radial-gradient(${secondaryColor} ${dotSize}px, transparent 0)`,
            backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
            backgroundPosition: '0 0'
          }}
        />
      </div>
    );
  };
  
  // Generate grid pattern
  const renderGrid = () => {
    const lineThickness = Math.max(1, intensity * 0.2); // 0.2-2px
    const gridSize = 40 - (intensity * 2); // 20-40px
    
    return (
      <div 
        className="absolute inset-0 overflow-hidden opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, ${color} ${lineThickness}px, transparent ${lineThickness}px),
                           linear-gradient(to bottom, ${color} ${lineThickness}px, transparent ${lineThickness}px)`,
          backgroundSize: `${gridSize}px ${gridSize}px`
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 1, 0],
          }}
          transition={{
            duration: animationDuration * 1.5,
            ease: "easeInOut",
            repeat: Infinity
          }}
          style={{
            backgroundImage: `linear-gradient(to right, ${secondaryColor} ${lineThickness}px, transparent ${lineThickness}px),
                             linear-gradient(to bottom, ${secondaryColor} ${lineThickness}px, transparent ${lineThickness}px)`,
            backgroundSize: `${gridSize * 2}px ${gridSize * 2}px`
          }}
        />
      </div>
    );
  };
  
  // Generate wave effect
  const renderWave = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 1200 100">
          <motion.path
            d={wavePath1.start}
            fill={color}
            animate={{
              d: [
                wavePath1.start,
                wavePath1.middle,
                wavePath1.end
              ]
            }}
            transition={{
              duration: animationDuration,
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
          <motion.path
            d={wavePath2.start}
            fill={secondaryColor}
            animate={{
              d: [
                wavePath2.start,
                wavePath2.middle,
                wavePath2.end
              ]
            }}
            transition={{
              duration: animationDuration * 0.8,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 0.2
            }}
          />
        </svg>
      </div>
    );
  };
  
  // Generate animated gradient
  const renderGradient = () => {
    const gradientSize = 200 + (intensity * 50); // 250-700px
    
    return (
      <motion.div 
        className="absolute inset-0 opacity-30"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] 
        }}
        transition={{
          duration: animationDuration * 2,
          ease: "linear",
          repeat: Infinity
        }}
        style={{
          backgroundImage: `radial-gradient(circle at center, ${color} 0%, transparent 70%), 
                           radial-gradient(circle at center, ${secondaryColor} 0%, transparent 60%)`,
          backgroundSize: `${gradientSize}px ${gradientSize}px, ${gradientSize * 1.5}px ${gradientSize * 1.5}px`,
          filter: 'blur(40px)',
          mixBlendMode: 'overlay'
        }}
      />
    );
  };
  
  const renderBackground = () => {
    switch (type) {
      case 'dots':
        return renderDots();
      case 'grid':
        return renderGrid();
      case 'wave':
        return renderWave();
      case 'gradient':
        return renderGradient();
      default:
        return renderDots();
    }
  };
  
  return (
    <div className={`relative ${className}`}>
      {renderBackground()}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedBackground;