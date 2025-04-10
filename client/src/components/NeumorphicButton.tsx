import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type NeumorphicButtonProps = {
  children: React.ReactNode;
  variant?: 'raised' | 'pressed' | 'flat';
  size?: 'sm' | 'md' | 'lg';
  intensity?: number; // 1-10, controls the shadow intensity
  color?: string;
  active?: boolean;
  rounded?: 'default' | 'full' | 'none';
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({
  children,
  variant = 'raised',
  size = 'md',
  intensity = 5,
  color = 'hsl(var(--background))',
  active = false,
  rounded = 'default',
  className = '',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
}) => {
  // Calculate shadow intensity
  const shadowIntensity = Math.min(Math.max(intensity, 1), 10) / 10;
  
  // Calculate size values
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Calculate rounded values
  const roundedClasses = {
    default: 'rounded-lg',
    full: 'rounded-full',
    none: 'rounded-none',
  };
  
  // Generate shadow styles based on variant and intensity
  const getShadowStyle = () => {
    const lightShadow = `rgba(255, 255, 255, ${0.05 * shadowIntensity})`;
    const darkShadow = `rgba(0, 0, 0, ${0.2 * shadowIntensity})`;
    
    switch (variant) {
      case 'raised':
        return {
          boxShadow: `6px 6px 12px ${darkShadow}, -6px -6px 12px ${lightShadow}`,
          active: {
            boxShadow: `inset 2px 2px 5px ${darkShadow}, inset -2px -2px 5px ${lightShadow}`,
          }
        };
      case 'pressed':
        return {
          boxShadow: `inset 2px 2px 5px ${darkShadow}, inset -2px -2px 5px ${lightShadow}`,
          active: {
            boxShadow: `inset 4px 4px 8px ${darkShadow}, inset -4px -4px 8px ${lightShadow}`,
          }
        };
      case 'flat':
        return {
          boxShadow: `0 0 0 transparent`,
          active: {
            boxShadow: `inset 2px 2px 5px ${darkShadow}, inset -2px -2px 5px ${lightShadow}`,
          }
        };
      default:
        return {
          boxShadow: `6px 6px 12px ${darkShadow}, -6px -6px 12px ${lightShadow}`,
          active: {
            boxShadow: `inset 2px 2px 5px ${darkShadow}, inset -2px -2px 5px ${lightShadow}`,
          }
        };
    }
  };
  
  const shadowStyle = getShadowStyle();
  
  return (
    <motion.button
      className={cn(
        'relative transition-all duration-200 outline-none',
        sizeClasses[size],
        roundedClasses[rounded],
        fullWidth ? 'w-full' : '',
        variant === 'pressed' ? 'shadow-inner' : '',
        'flex items-center justify-center gap-2',
        active ? 'text-accent' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
      style={{
        backgroundColor: color,
        boxShadow: active ? shadowStyle.active.boxShadow : shadowStyle.boxShadow,
      }}
      whileTap={disabled ? {} : {
        boxShadow: shadowStyle.active.boxShadow,
        scale: 0.98,
      }}
      whileHover={disabled ? {} : {
        backgroundColor: variant === 'flat' ? 'hsla(var(--accent) / 0.1)' : undefined,
      }}
      transition={{ duration: 0.1 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon && iconPosition === 'left' && (
        <span className="flex items-center justify-center">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="flex items-center justify-center">{icon}</span>
      )}
    </motion.button>
  );
};

export default NeumorphicButton;