import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { judges } from '@/data/judges';
import { contestants } from '@/data/contestants';
import { useLocation } from 'wouter';
import ParallaxBackground from '@/components/ParallaxBackground';

const Cast: React.FC = () => {
  const [_, setLocation] = useLocation();
  
  useEffect(() => {
    // Redirect to the judges page
    setLocation('/judges');
  }, [setLocation]);
  
  return <ParallaxBackground 
    className="pt-24 pb-16 bg-primary min-h-screen"
    dotColor="#FFA64D" 
    shapeColors={['#FF7F32', '#FFB266', '#FFF2E6']}
  >
    Redirecting...
  </ParallaxBackground>;
};

export default Cast;
