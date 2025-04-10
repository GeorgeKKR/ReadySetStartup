import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Play, Calendar, Clock, Star, Info } from 'lucide-react';
import { Link } from 'wouter';
import { episodes } from '@/data/episodes';
import ScrollReveal from './ScrollReveal';
import StaggeredList from './StaggeredList';
import AnimatedCard from './AnimatedCard';

const SeasonHighlights: React.FC = () => {
  // For custom cursor on video cards
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeCursorText, setActiveCursorText] = useState("");
  
  // For scrolling animation
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Transform values for parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  
  // For glass card hover state
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Handle mouse position for custom cursor
  const updateMousePosition = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      id="seasons" 
      className="py-20 bg-primary relative overflow-hidden"
      ref={sectionRef}
      onMouseMove={updateMousePosition}
    >
      {/* Custom cursor for play button */}
      <motion.div
        className="fixed w-16 h-16 rounded-full z-50 pointer-events-none flex items-center justify-center"
        animate={cursorVariant}
        variants={{
          default: {
            opacity: 0,
            height: 10,
            width: 10,
            x: cursorPosition.x - 5,
            y: cursorPosition.y - 5,
            backgroundColor: "rgba(255, 255, 255, 0)"
          },
          play: {
            opacity: 1,
            height: 80,
            width: 80,
            x: cursorPosition.x - 40,
            y: cursorPosition.y - 40,
            backgroundColor: "hsla(var(--accent) / 0.2)",
            border: "2px solid hsla(var(--accent) / 0.8)",
            color: "white"
          }
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      >
        {cursorVariant === 'play' && (
          <div className="flex flex-col items-center justify-center">
            <Play className="text-white" size={24} />
            <span className="text-xs mt-1">{activeCursorText}</span>
          </div>
        )}
      </motion.div>
      
      {/* Floating dots background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(hsla(var(--accent) / 0.15) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          opacity: 0.5
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <ScrollReveal direction="left">
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold mb-4 md:mb-0"
              style={{ textShadow: "0 0 15px hsla(var(--accent) / 0.3)" }}
            >
              Season <span className="text-accent">Highlights</span>
            </motion.h2>
          </ScrollReveal>
          
          <ScrollReveal direction="right">
            <motion.div 
              className="flex items-center text-[hsl(var(--accent-secondary))] hover:text-accent bg-primary/50 rounded-full px-4 py-2 backdrop-blur-md border border-accent/10 cursor-pointer"
              whileHover={{ x: 5 }}
              style={{
                boxShadow: "0 0 20px hsla(var(--accent) / 0.1)",
              }}
              onClick={() => window.location.href = '/seasons'}
            >
              All Seasons <ChevronRight className="ml-1 h-4 w-4" />
            </motion.div>
          </ScrollReveal>
        </div>
        
        <StaggeredList
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          direction="up"
          staggerDelay={0.08}
        >
          {episodes.map((episode) => (
            <div key={episode.id}>
              <AnimatedCard 
                className="rounded-xl overflow-hidden h-full" 
                hoverEffect="all"
                onClick={() => window.open(episode.streamingUrl, '_blank')}
                onMouseEnter={() => {
                  setCursorVariant('play');
                  setActiveCursorText("Play");
                  setHoveredCard(episode.id);
                }}
                onMouseLeave={() => {
                  setCursorVariant('default');
                  setHoveredCard(null);
                }}
              >
                {/* Glass card effect */}
                <motion.div 
                  className="relative rounded-xl overflow-hidden"
                  animate={{
                    boxShadow: hoveredCard === episode.id 
                      ? "0 0 30px 0 hsla(var(--accent) / 0.3)"
                      : "0 0 0 0 transparent"
                  }}
                >
                  <div className="absolute inset-0 backdrop-blur-sm bg-black/20 z-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Neumorphic play button */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center z-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                  >
                    <motion.div 
                      className="w-16 h-16 bg-accent/90 rounded-full flex items-center justify-center"
                      whileHover={{ 
                        boxShadow: [
                          "inset 4px 4px 8px rgba(0, 0, 0, 0.2), inset -4px -4px 8px rgba(255, 255, 255, 0.1)",
                          "inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.05)",
                        ]
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Play className="text-white ml-1" />
                    </motion.div>
                  </motion.div>
                  
                  {/* Thumbnail image with overlay */}
                  <div className="aspect-video">
                    <img 
                      src={episode.thumbnail} 
                      alt={episode.title} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  
                  {/* Glassmorphism info overlay */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 bg-black/10 backdrop-blur-md p-4 border-t border-white/10"
                    initial={{ y: 60, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-base">{episode.title}</h3>
                      <div className="flex items-center gap-1 bg-accent/80 px-2 py-1 rounded-md text-xs">
                        <Star size={12} className="fill-white" />
                        <span>{episode.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 text-xs text-gray-300 mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{episode.seasonEpisode}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{episode.runtime}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-300 mt-1">
                      Released: {episode.releaseDate}
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatedCard>
              
              <div className="mt-3 px-2">
                <h3 className="font-semibold">{episode.seasonEpisode}: {episode.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{episode.description}</p>
                
                {/* Microinteraction button */}
                <motion.button
                  className="text-accent/80 text-xs flex items-center gap-1 mt-2 group"
                  whileHover={{ color: "hsl(var(--accent))" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Info size={12} />
                  <span>Details</span>
                  <motion.span 
                    className="inline-block"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="block h-[1px] bg-accent/50 group-hover:bg-accent"></span>
                  </motion.span>
                </motion.button>
              </div>
            </div>
          ))}
        </StaggeredList>
      </div>
    </section>
  );
};

export default SeasonHighlights;
