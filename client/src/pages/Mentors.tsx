import React from 'react';
import { motion } from 'framer-motion';
import { mentors } from '@/data/mentors';
import { Briefcase } from 'lucide-react';
import ImageHover from '@/components/ImageHover';
import AnimatedCard from '@/components/AnimatedCard';
import ScrollReveal from '@/components/ScrollReveal';
import StaggeredList from '@/components/StaggeredList';
import GlassCard from '@/components/GlassCard';
import ParallaxBackground from '@/components/ParallaxBackground';

const Mentors: React.FC = () => {
  return (
    <ParallaxBackground 
      className="pt-24 pb-16 bg-primary min-h-screen"
      dotColor="#FFA64D" 
      shapeColors={['#FF7F32', '#FFB266', '#FFF2E6']}
    >
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up">
          <motion.h1 
            className="text-4xl font-display font-bold mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            The <span className="text-[hsl(var(--accent-secondary))]">Mentors</span>
          </motion.h1>
          
          <motion.p 
            className="text-center text-gray-300 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our expert mentors guide the entrepreneurs through challenges, helping them refine their business strategies and prepare for critical investor pitches on Ready Set StartUP UK.
          </motion.p>
        </ScrollReveal>
        
        <StaggeredList 
          direction="up" 
          delay={0.2} 
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {mentors.map((mentor) => (
            <AnimatedCard 
              key={mentor.id} 
              className="bg-secondary/70 backdrop-blur-sm rounded-xl overflow-hidden h-full border border-white/5 shadow-xl" 
              hoverEffect="glow"
            >
              <div className="flex flex-col h-full">
                <div className="relative overflow-hidden h-64">
                  <ImageHover 
                    src={mentor.image} 
                    alt={mentor.name} 
                    className="w-full h-full object-cover"
                    hoverEffect="zoom"
                    borderRadius="0"
                  />
                  <div className="absolute top-0 right-0 bg-[hsl(var(--accent-secondary))]/90 px-3 py-1 text-xs font-semibold">
                    Mentor
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h4 className="font-bold text-xl">{mentor.name}</h4>
                    <p className="text-sm text-gray-300">{mentor.company}</p>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center text-sm mb-4 text-gray-400">
                    <Briefcase size={14} className="mr-1" />
                    <span>{mentor.company}</span>
                  </div>
                  
                  <motion.div 
                    className="relative overflow-hidden flex-grow"
                    initial={{ height: "auto" }}
                    animate={{ height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm leading-relaxed">{mentor.bio}</p>
                  </motion.div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </StaggeredList>
        
        <ScrollReveal className="mt-16">
          <GlassCard className="p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-3">About the Mentors</h3>
            <p className="text-sm text-gray-300 mb-4">
              The mentors on Ready Set StartUP UK are seasoned entrepreneurs and industry specialists who guide contestants through various business challenges and help them refine their pitches.
            </p>
            <p className="text-sm text-gray-300">
              With their diverse backgrounds and expertise, they provide invaluable insights on product development, marketing strategies, financial planning, and presentation skills, giving entrepreneurs the tools they need to succeed in the competition and beyond.
            </p>
          </GlassCard>
        </ScrollReveal>
      </div>
    </ParallaxBackground>
  );
};

export default Mentors; 