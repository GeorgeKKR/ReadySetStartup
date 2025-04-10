import React from 'react';
import { motion } from 'framer-motion';
import { judges } from '@/data/judges';
import { Briefcase } from 'lucide-react';
import AnimatedCard from '@/components/AnimatedCard';
import ScrollReveal from '@/components/ScrollReveal';
import StaggeredList from '@/components/StaggeredList';
import GlassCard from '@/components/GlassCard';
import ParallaxBackground from '@/components/ParallaxBackground';

const Judges: React.FC = () => {
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
            The <span className="text-accent">Judges</span>
          </motion.h1>
          
          <motion.p 
            className="text-center text-gray-300 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Meet our esteemed panel of industry experts who evaluate the entrepreneurs' business proposals and make the critical investment decisions on Ready Set StartUP UK.
          </motion.p>
        </ScrollReveal>
        
        <StaggeredList 
          direction="up" 
          delay={0.2} 
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {judges.map((judge) => (
            <AnimatedCard 
              key={judge.id} 
              className="bg-secondary/70 backdrop-blur-sm rounded-xl overflow-hidden h-full border border-white/5 shadow-xl" 
              hoverEffect="glow"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-2/5 relative overflow-hidden bg-gradient-to-b from-secondary/20 to-primary/40 flex items-center justify-center">
                  <img 
                    src={judge.image} 
                    alt={judge.name} 
                    className={`w-full object-cover h-[280px] md:h-[350px] ${
                      judge.name === "Eileen Burbidge" ? "object-top" : 
                      judge.name === "Tom Blomfield" ? "object-center" : 
                      judge.name === "Angelika Burawska" ? "object-[center_30%]" :
                      judge.name === "Eamonn Carey" ? "object-[center_25%]" :
                      judge.name === "Nikki Michelsen" ? "object-[center_20%]" :
                      judge.name === "Ying Wang" ? "object-[center_30%]" : ""
                    }`}
                  />
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 md:hidden">
                    <h4 className="font-bold text-xl">{judge.name}</h4>
                    <p className="text-sm text-gray-300">{judge.role}</p>
                  </div>
                </div>
                
                <div className="md:w-3/5 p-6">
                  <div className="hidden md:block mb-3">
                    <h4 className="font-bold text-2xl">{judge.name}</h4>
                    <div className="flex items-center mt-1">
                      <span className="inline-block w-8 h-0.5 bg-accent mr-2"></span>
                      <p className="text-accent font-medium">{judge.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm mb-4 text-gray-400">
                    <Briefcase size={14} className="mr-1" />
                    <span>{judge.company}</span>
                  </div>
                  
                  <motion.div 
                    className="relative overflow-hidden"
                    initial={{ height: "auto" }}
                    animate={{ height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm leading-relaxed">{judge.bio}</p>
                  </motion.div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </StaggeredList>
        
        <ScrollReveal className="mt-16">
          <GlassCard className="p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-3">About the Judges</h3>
            <p className="text-sm text-gray-300 mb-4">
              The judges on Ready Set StartUP UK bring decades of combined experience in entrepreneurship, venture capital, and business growth. They don't just evaluate pitches—they provide invaluable feedback, mentorship, and occasionally, life-changing investment opportunities to the most promising startups.
            </p>
            <p className="text-sm text-gray-300">
              Each judge brings their unique perspective and expertise to the table, creating a comprehensive evaluation process that tests entrepreneurs on all aspects of their business, from the idea's uniqueness to its market potential and financial viability.
            </p>
          </GlassCard>
        </ScrollReveal>
      </div>
    </ParallaxBackground>
  );
};

export default Judges; 