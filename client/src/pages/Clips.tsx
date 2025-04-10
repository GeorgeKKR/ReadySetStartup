import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { clips } from '@/data/clips';

const Clips: React.FC = () => {
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
    <div className="pt-24 pb-16 bg-primary min-h-screen">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl font-display font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Show Clips
        </motion.h1>
        
        <motion.p 
          className="text-center text-gray-300 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Watch highlights, tutorials, and dramatic moments from Ready Set StartUP UK. Get advice from our mentors and see the entrepreneurs in action.
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {clips.map((clip, index) => (
            <motion.div 
              key={clip.id} 
              className="group cursor-pointer"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.1 * index }
                }
              }}
              onClick={() => openVideo(clip.videoId)}
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden rounded-lg mb-3 aspect-video bg-secondary/50">
                <img 
                  src={clip.thumbnail} 
                  alt={clip.title} 
                  className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-80 group-hover:opacity-60 transition-opacity">
                  <button 
                    className="bg-accent/80 hover:bg-accent w-16 h-16 rounded-full flex items-center justify-center transition-transform transform group-hover:scale-110"
                    aria-label={`Play ${clip.title}`}
                  >
                    <Play className="text-white ml-1" size={22} />
                  </button>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <p className="text-sm inline-block bg-accent/90 px-2 py-1 rounded">{clip.duration}</p>
                </div>
              </div>
              
              <h2 className="font-semibold text-lg group-hover:text-accent transition-colors">{clip.title}</h2>
              <p className="text-sm text-gray-400">{clip.description}</p>
            </motion.div>
          ))}
        </motion.div>
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
    </div>
  );
};

export default Clips;
