import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  once?: boolean;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

const scrollVariants: Record<string, Variants> = {
  up: {
    hidden: { y: 75, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  },
  down: {
    hidden: { y: -75, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  },
  left: {
    hidden: { x: 75, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  right: {
    hidden: { x: -75, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  width = "100%",
  once = true,
  delay = 0,
  direction = 'up',
  className = ""
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.1 });
  const mainControls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else if (!once) {
      mainControls.start("hidden");
    }
  }, [isInView, mainControls, once]);
  
  return (
    <motion.div
      ref={ref}
      variants={scrollVariants[direction]}
      initial="hidden"
      animate={mainControls}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut"
      }}
      style={{ width }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;