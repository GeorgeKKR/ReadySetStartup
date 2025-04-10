import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Play, X } from 'lucide-react';
import { Link } from 'wouter';
import { clips } from '@/data/clips';
import MediaCard from './MediaCard';
import ScrollReveal from './ScrollReveal';
import StaggeredList from './StaggeredList';
import GlassCard from './GlassCard';
import NeumorphicButton from './NeumorphicButton';

const ClipsSection: React.FC = () => {
  // Featured clip (first one)
  const featuredClip = clips[0];
  
  // Video modal state
  const [selectedClip, setSelectedClip] = useState<string | null>(null);

  const openVideo = (videoId: string) => {
    setSelectedClip(videoId);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setSelectedClip(null);
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="clips" className="py-20 bg-primary">
      <div className="container mx-auto px-4 relative">
        <div className="mb-12">
          <ScrollReveal direction="left">
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold mb-4 md:mb-0"
              style={{ textShadow: "0 0 15px hsla(var(--accent) / 0.3)" }}
            >
              Featured <span className="text-accent">Clips</span>
            </motion.h2>
          </ScrollReveal>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured video */}
          <ScrollReveal className="lg:col-span-8" delay={0.1}>
            <div 
              className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => openVideo(featuredClip.videoId)}
            >
              <img 
                src={featuredClip.thumbnail} 
                alt={featuredClip.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-accent/80 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="text-white ml-1" size={24} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="bg-accent text-xs px-2 py-1 rounded mb-2 inline-block">FEATURED</span>
                <h3 className="text-xl font-semibold mb-1">{featuredClip.title}</h3>
                <p className="text-sm text-gray-300">{featuredClip.description}</p>
                <div className="flex items-center mt-2 text-sm text-gray-400">
                  <span>{featuredClip.duration}</span>
                  <span className="mx-2">•</span>
                  <span>Expert Coaching</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          {/* Sidebar content */}
          <div className="lg:col-span-4">
            <ScrollReveal delay={0.2}>
              <div className="bg-secondary/70 backdrop-blur-sm p-5 rounded-xl border border-accent/20 h-full flex flex-col" style={{
                boxShadow: "inset 2px 2px 5px rgba(0, 0, 0, 0.1), inset -2px -2px 5px rgba(255, 255, 255, 0.05)",
                minHeight: "calc(100% + 200px)"  // Make it extend significantly below the featured video
              }}>
                <h3 className="text-lg font-semibold mb-3">Most Recent Posts</h3>
                <ul className="space-y-4 flex-grow overflow-y-auto">
                  {clips.slice(0, 5).map((clip) => (
                    <motion.li 
                      key={clip.id}
                      className="flex gap-3 group cursor-pointer"
                      whileHover={{ x: 3 }}
                      onClick={() => openVideo(clip.videoId)}
                    >
                      <div className="relative w-20 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={clip.thumbnail} 
                          alt={clip.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play size={16} className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium line-clamp-1 group-hover:text-accent transition-colors">{clip.title}</h4>
                        <p className="text-xs text-gray-400">{clip.duration}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <Link href="/clips">
                    <div className="text-accent hover:text-[hsl(var(--accent-secondary))] flex items-center justify-center text-sm font-medium transition-colors">
                      <span className="mr-1">View All Clips</span>
                      <ChevronRight size={14} />
                    </div>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      <AnimatePresence>
        {selectedClip && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
          >
            <motion.div 
              className="relative w-full max-w-5xl bg-black rounded-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="relative pb-[56.25%] h-0">
                <iframe 
                  src={`https://www.youtube.com/embed/${selectedClip}?autoplay=1`}
                  title="YouTube video player"
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
              <button 
                onClick={closeVideo}
                className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white rounded-full p-2 transition-colors"
                aria-label="Close video"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ClipsSection;
