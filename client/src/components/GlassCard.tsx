import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  blurAmount?: number; // 0-20
  opacity?: number; // 0-1
  borderWidth?: number;
  borderOpacity?: number; // 0-1
  className?: string;
  hoverEffect?: 'glow' | 'lift' | 'scale' | 'border' | 'none';
  accentColor?: string;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  blurAmount = 8,
  opacity = 0.15,
  borderWidth = 1,
  borderOpacity = 0.1,
  className = '',
  hoverEffect = 'none',
  accentColor = 'hsla(var(--accent) / 0.3)',
  onClick,
}) => {
  // Define hover animations based on hoverEffect prop
  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case 'glow':
        return {
          boxShadow: `0 0 20px 0 ${accentColor}`,
        };
      case 'lift':
        return {
          y: -10,
          boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)`,
        };
      case 'scale':
        return {
          scale: 1.03,
        };
      case 'border':
        return {
          boxShadow: `0 0 0 2px ${accentColor}`,
        };
      case 'none':
      default:
        return {};
    }
  };

  return (
    <motion.div
      className={cn(
        'relative rounded-xl overflow-hidden',
        className
      )}
      style={{
        backgroundColor: `rgba(15, 15, 15, ${opacity})`,
        backdropFilter: `blur(${blurAmount}px)`,
        WebkitBackdropFilter: `blur(${blurAmount}px)`,
        border: `${borderWidth}px solid rgba(255, 255, 255, ${borderOpacity})`,
      }}
      whileHover={getHoverAnimation()}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;