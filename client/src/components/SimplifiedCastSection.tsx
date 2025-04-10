import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { judges } from '@/data/judges';
import { mentors } from '@/data/mentors';
import { contestants } from '@/data/contestants';
import { Link } from 'wouter';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import StaggeredList from './StaggeredList';
import ImageHover from './ImageHover';

const SimplifiedCastSection: React.FC = () => {
  // Add scroll state and refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Function to handle scroll events
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      
      // Show left arrow if scrolled right
      setShowLeftArrow(scrollLeft > 0);
      
      // Hide right arrow if reached the end
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      // Scroll all the way to the start
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      // Scroll all the way to the end
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <section id="cast" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up" className="mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center">
            Meet <span className="text-accent">The Cast</span>
          </h2>
          <p className="text-center mt-4 text-gray-300 max-w-2xl mx-auto">
            Ready Set StartUP UK features prominent industry veterans as judges and mentors, guiding and investing in the next generation of British entrepreneurs with game-changing business ideas.
          </p>
        </ScrollReveal>
        
        {/* Judges */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <ScrollReveal direction="left" delay={0.1}>
              <h3 className="text-2xl font-bold flex items-center">
                <span className="bg-[hsl(var(--accent-secondary))] h-8 w-1 mr-3 rounded-full"></span>
                The Judges
              </h3>
            </ScrollReveal>
          </div>
          
          <StaggeredList 
            direction="up" 
            delay={0.2} 
            staggerDelay={0.08}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {judges.map((judge) => (
              <div key={judge.id} className="text-center group flex flex-col items-center">
                <Link href="/judges">
                  <div className="mb-3 relative w-[130px] h-[130px] cursor-pointer overflow-hidden rounded-full">
                    <ImageHover 
                      src={judge.image}
                      alt={judge.name}
                      width="130px"
                      height="130px"
                      hoverEffect="glow"
                      className={`rounded-full ${
                        judge.name === "Eileen Burbidge" ? "!object-top" : 
                        judge.name === "Tom Blomfield" ? "!object-center" : 
                        judge.name === "Angelika Burawska" ? "!object-[center_30%]" :
                        judge.name === "Eamonn Carey" ? "!object-[center_25%]" :
                        judge.name === "Nikki Michelsen" ? "!object-[center_20%]" :
                        judge.name === "Ying Wang" ? "!object-[center_30%]" : ""
                      }`}
                    />
                  </div>
                </Link>
                
                <motion.div
                  className="flex flex-col items-center justify-center w-full min-h-[50px]"
                  whileHover={{ color: "hsl(var(--accent))" }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="font-semibold text-base mb-1">{judge.name}</h4>
                  <p className="text-xs text-gray-400">{judge.company}</p>
                </motion.div>
              </div>
            ))}
          </StaggeredList>
        </div>
        
        {/* Mentors */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <ScrollReveal direction="left" delay={0.1}>
              <h3 className="text-2xl font-bold flex items-center">
                <span className="bg-accent h-8 w-1 mr-3 rounded-full"></span>
                The Mentors
              </h3>
            </ScrollReveal>
          </div>
          
          <StaggeredList 
            direction="up" 
            delay={0.2} 
            staggerDelay={0.08}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {mentors.map((mentor) => (
              <div key={mentor.id} className="text-center group flex flex-col items-center">
                <Link href="/mentors">
                  <div className="mb-3 relative w-[130px] h-[130px] cursor-pointer overflow-hidden rounded-full">
                    <ImageHover 
                      src={mentor.image}
                      alt={mentor.name}
                      width="130px"
                      height="130px"
                      hoverEffect="glow"
                      className={`rounded-full ${
                        mentor.name === "Jose Cayasso" ? "!object-[center_25%]" :
                        mentor.name === "Alison Edgar" ? "!object-[center_30%]" :
                        mentor.name === "Steve Lindsay" ? "!object-[center_20%]" :
                        mentor.name === "Roberta Lucca" ? "!object-[center_25%]" :
                        mentor.name === "Ying Tan" ? "!object-[center_30%]" : ""
                      }`}
                    />
                  </div>
                </Link>
                
                <motion.div
                  className="flex flex-col items-center justify-center w-full min-h-[50px]"
                  whileHover={{ color: "hsl(var(--accent))" }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="font-semibold text-base mb-1">{mentor.name}</h4>
                  <p className="text-xs text-gray-400">{mentor.company}</p>
                </motion.div>
              </div>
            ))}
          </StaggeredList>
        </div>
        
        {/* Contestants */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <ScrollReveal direction="left" delay={0.1}>
              <h3 className="text-2xl font-bold flex items-center">
                <span className="bg-[hsl(var(--accent))] h-8 w-1 mr-3 rounded-full"></span>
                Season 1 Entrepreneurs
              </h3>
            </ScrollReveal>
          </div>
          
          <div className="relative">
            {/* Left navigation arrow */}
            {showLeftArrow && (
              <button 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-accent/80 hover:bg-accent rounded-full p-2 shadow-lg transition-all"
                onClick={scrollLeft}
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            
            {/* Scrollable container */}
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto pb-4 hide-scrollbar"
              onScroll={handleScroll}
            >
              <StaggeredList 
                direction="up" 
                delay={0.2} 
                staggerDelay={0.08}
                className="flex flex-nowrap min-w-min gap-6 px-8 pb-1.5"
              >
                {contestants.map((contestant) => (
                  <div key={contestant.id} className="text-center group flex-shrink-0 flex flex-col items-center" style={{ width: "150px" }}>
                    <div className="mb-3 relative w-[130px] h-[130px] cursor-pointer overflow-hidden rounded-full">
                      <ImageHover 
                        src={contestant.image}
                        alt={contestant.name}
                        width="130px"
                        height="130px"
                        hoverEffect="glow"
                        className={`rounded-full ${
                          contestant.name === "Jodie Clough" ? "!object-[center_25%]" :
                          contestant.name === "Shayo Fadipe" ? "!object-[center_30%]" :
                          contestant.name === "Lonnée Hamilton" ? "!object-[center_20%]" :
                          contestant.name === "Olivia Thompson" ? "!object-[center_25%]" : ""
                        }`}
                      />
                    </div>
                    
                    <motion.div
                      className="flex flex-col items-center justify-center w-full min-h-[50px]"
                      whileHover={{ color: "hsl(var(--accent))" }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="font-semibold text-base mb-1">{contestant.name}</h4>
                      <p className="text-xs text-gray-400">{contestant.business}</p>
                    </motion.div>
                  </div>
                ))}
              </StaggeredList>
            </div>
            
            {/* Right navigation arrow */}
            {showRightArrow && (
              <button 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-accent/80 hover:bg-accent rounded-full p-2 shadow-lg transition-all"
                onClick={scrollRight}
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          <style>
            {`
              /* Hide scrollbar for Chrome, Safari and Opera */
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
              
              /* Hide scrollbar for IE, Edge and Firefox */
              .hide-scrollbar {
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
              }
            `}
          </style>
        </div>
      </div>
    </section>
  );
};

export default SimplifiedCastSection; 