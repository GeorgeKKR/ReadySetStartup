import React from 'react';
import { motion } from 'framer-motion';
import { judges } from '@/data/judges';
import { contestants } from '@/data/contestants';
import { mentors } from '@/data/mentors';
import ScrollReveal from './ScrollReveal';
import StaggeredList from './StaggeredList';
import ImageHover from './ImageHover';
import AnimatedCard from './AnimatedCard';
import GlassCard from './GlassCard';
import { ExternalLink, Linkedin, Twitter, ChevronDown, ChevronUp, Briefcase, Star } from 'lucide-react';
import { AppLink } from './AppLink';
import { getAssetPath } from '@/lib/assetPath';

const CastSection: React.FC = () => {
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
        <div className="mb-20">
          <ScrollReveal direction="left" delay={0.1} className="mb-8">
            <h3 className="text-2xl font-bold flex items-center">
              <span className="bg-[hsl(var(--accent-secondary))] h-8 w-1 mr-3 rounded-full"></span>
              The Judges
            </h3>
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
                className="bg-primary/50 backdrop-blur-sm rounded-xl overflow-hidden h-full border border-white/5 shadow-xl" 
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
                    
                    {/* Social links */}
                    <div className="flex gap-3 mt-5">
                      {judge.linkedIn && (
                        <a 
                          href={judge.linkedIn} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-primary/80 rounded-full hover:bg-accent/20 transition-colors"
                        >
                          <Linkedin size={16} />
                        </a>
                      )}
                      {judge.twitter && (
                        <a 
                          href={`https://twitter.com/${judge.twitter.replace('@', '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-primary/80 rounded-full hover:bg-accent/20 transition-colors"
                        >
                          <Twitter size={16} />
                        </a>
                      )}
                      <a 
                        href={`https://www.imdb.com/title/tt28768642/`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-primary/80 rounded-full hover:bg-accent/20 transition-colors flex items-center gap-1"
                      >
                        <ExternalLink size={16} />
                        <span className="text-xs">IMDb</span>
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </StaggeredList>
        </div>
        
        {/* Mentors */}
        <div className="mb-20">
          <ScrollReveal direction="left" delay={0.1} className="mb-8">
            <h3 className="text-2xl font-bold flex items-center">
              <span className="bg-[hsl(var(--accent-secondary))] h-8 w-1 mr-3 rounded-full"></span>
              The Mentors
            </h3>
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
                className="bg-primary/50 backdrop-blur-sm rounded-xl overflow-hidden h-full border border-white/5 shadow-xl" 
                hoverEffect="glow"
              >
                <div className="flex flex-col">
                  <div className="relative overflow-hidden h-64">
                    <ImageHover 
                      src={mentor.image} 
                      alt={mentor.name} 
                      className={`w-full h-full object-cover ${
                        mentor.name === "Jose Cayasso" ? "object-[center_25%]" :
                        mentor.name === "Alison Edgar" ? "object-[center_30%]" :
                        mentor.name === "Steve Lindsay" ? "object-[center_20%]" :
                        mentor.name === "Roberta Lucca" ? "object-[center_25%]" :
                        mentor.name === "Ying Tan" ? "object-[center_30%]" : ""
                      }`}
                      hoverEffect="zoom"
                      borderRadius="0"
                    />
                    <div className="absolute top-0 right-0 bg-accent/90 px-3 py-1 text-xs font-semibold">
                      Mentor
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <h4 className="font-bold text-xl">{mentor.name}</h4>
                      <p className="text-sm text-gray-300">{mentor.company}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <motion.div 
                      className="relative overflow-hidden"
                      initial={{ height: "auto" }}
                      animate={{ height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm leading-relaxed">{mentor.bio}</p>
                    </motion.div>
                    
                    {/* Social links */}
                    <div className="flex gap-3 mt-5">
                      {mentor.linkedIn && (
                        <a 
                          href={mentor.linkedIn} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-primary/80 rounded-full hover:bg-accent/20 transition-colors"
                        >
                          <Linkedin size={16} />
                        </a>
                      )}
                      {mentor.twitter && (
                        <a 
                          href={`https://twitter.com/${mentor.twitter.replace('@', '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-primary/80 rounded-full hover:bg-accent/20 transition-colors"
                        >
                          <Twitter size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </StaggeredList>
        </div>
        
        {/* Info about the show */}
        <ScrollReveal className="mb-16">
          <GlassCard className="p-6 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/3">
                <img 
                  src={getAssetPath('assets/episodes/Episode 2.webp')} 
                  alt="Ready Set StartUP UK" 
                  className="rounded-lg w-full"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold mb-3">About the Show</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Ready Set StartUP UK premiered in 2023 on Amazon Prime Video, featuring entrepreneurs competing for life-changing investments from a panel of successful business magnates. The 6-episode series showcases innovative ideas across various industries as contestants face demanding challenges to prove their business acumen.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://www.amazon.co.uk/gp/video/detail/amzn1.dv.gti.6346669a-7e09-4a55-9dc0-0e8f93a30ecc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm bg-accent/90 hover:bg-accent px-3 py-1.5 rounded-md transition-colors inline-flex items-center"
                  >
                    Watch on Prime <ExternalLink size={14} className="ml-1" />
                  </a>
                  <a 
                    href="https://www.imdb.com/title/tt28768642/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm bg-primary/50 hover:bg-primary/80 px-3 py-1.5 rounded-md transition-colors inline-flex items-center"
                  >
                    View on IMDb <Star size={14} className="ml-1" />
                  </a>
                  <div className="text-sm bg-accent/20 hover:bg-accent/30 px-3 py-1.5 rounded-md transition-colors inline-flex items-center cursor-pointer">
                    <AppLink href="/apply">Apply for Season 2</AppLink>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
        
        {/* Contestants */}
        <div>
          <ScrollReveal direction="left" delay={0.1} className="mb-8">
            <h3 className="text-2xl font-bold flex items-center">
              <span className="bg-accent h-8 w-1 mr-3 rounded-full"></span>
              Season 1 Entrepreneurs
            </h3>
          </ScrollReveal>
          
          <StaggeredList 
            direction="up" 
            delay={0.2} 
            staggerDelay={0.08}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {contestants.map((contestant) => (
              <div key={contestant.id} className="text-center group flex flex-col items-center">
                <AnimatedCard 
                  className="mb-3 relative w-[130px] h-[130px]"
                  hoverEffect="tilt"
                >
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
                  {contestant.linkedIn && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute bottom-0 right-0"
                    >
                      <a 
                        href={contestant.linkedIn} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-accent rounded-full p-1.5 flex items-center justify-center shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin size={14} />
                      </a>
                    </motion.div>
                  )}
                </AnimatedCard>
                
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
      </div>
    </section>
  );
};

export default CastSection;
