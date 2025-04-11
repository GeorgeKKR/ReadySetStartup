import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, ChevronRight, X, Info, TrendingUp, Star, Film, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'wouter';
import GlassCard from './GlassCard';

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, delay: 0.3 }
  }
};

const HeroBanner: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const trailerRef = useRef<HTMLIFrameElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  
  // For parallax effect
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacityOverlay = useTransform(scrollY, [0, 300], [0.7, 0.85]);
  
  // Handle button hover states
  const [isWatchHovered, setIsWatchHovered] = useState(false);
  const [isApplyHovered, setIsApplyHovered] = useState(false);
  const [isTrailerHovered, setIsTrailerHovered] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle closing trailer modal
  const handleCloseTrailer = () => {
    setShowTrailer(false);
    // Stop video playback when closing
    if (trailerRef.current) {
      const src = trailerRef.current.src;
      trailerRef.current.src = src;
    }
  };

  const toggleMute = () => {
    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.muted = !videoMuted;
      setVideoMuted(!videoMuted);
    }
  };

  return (
    <section className="relative pt-16 md:pt-0 h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Background image */}
        <motion.div 
          className="absolute inset-0 w-full h-[120%]"
          style={{ y: isMounted ? backgroundY : 0 }}
        >
          <div className="w-full h-full bg-[url('./assets/images/RSS Background.jpg')] bg-cover bg-center transform scale-110" />
        </motion.div>
        
        {/* Video background */}
        <video
          ref={backgroundVideoRef}
          className="absolute inset-0 w-full h-full object-cover z-[1]"
          autoPlay
          loop
          muted={videoMuted}
          playsInline
          poster="./assets/images/RSS Background.jpg"
          onError={(e) => {
            // Hide video element if there's an error loading the sources
            if (e.currentTarget) {
              e.currentTarget.style.display = 'none';
            }
          }}
        >
          {/* Video sources - these may be excluded from GitHub due to size limitations */}
          {/* If you're deploying this project, you'll need to add these video files separately */}
          <source src="./assets/videos/Trailer - Season 1_ Ready Set StartUP UK_VP8.webm" type="video/webm" />
          <source src="./assets/videos/Trailer.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Video controls */}
      <motion.button 
        onClick={toggleMute}
        className="absolute bottom-8 right-8 z-30 p-3 bg-black/40 hover:bg-black/60 rounded-full transition-colors cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-label={videoMuted ? "Unmute background video" : "Mute background video"}
      >
        {videoMuted ? (
          <VolumeX size={20} className="text-white/80" />
        ) : (
          <Volume2 size={20} className="text-white/80" />
        )}
      </motion.button>
      
      {/* Gradient overlay with increased opacity for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary z-10"></div>
      
      {/* Dynamic overlay */}
      <motion.div 
        className="absolute inset-0 bg-primary" 
        style={{ opacity: isMounted ? opacityOverlay : 0.7 }}
      ></motion.div>
      
      {/* Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16 md:pb-24 relative z-20">
        <motion.div 
          className="max-w-3xl"
          style={{ y: isMounted ? textY : 0 }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold mb-4"
            variants={textVariants}
          >
            <span className="text-foreground">Ready Set</span>{' '}
            <span className="text-accent">StartUP</span>{' '}
            <span className="text-[hsl(var(--accent-secondary))]">UK</span>
          </motion.h1>
          
          <motion.div variants={textVariants} className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1 text-accent">
              <Star className="w-4 h-4 fill-accent" />
              <a 
                href="https://www.imdb.com/title/tt28768642/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-medium hover:underline"
              >
                IMDb 8.2/10
              </a>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <div className="flex items-center gap-1 text-[hsl(var(--accent-secondary))]">
              <Star className="w-4 h-4 fill-[hsl(var(--accent-secondary))]" />
              <a 
                href="https://www.amazon.co.uk/gp/video/detail/amzn1.dv.gti.6346669a-7e09-4a55-9dc0-0e8f93a30ecc" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-medium hover:underline"
              >
                Amazon 4.5/5
              </a>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <div className="text-sm">2023</div>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <div className="text-sm">6 Episodes</div>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <div className="bg-accent/80 text-xs px-2 py-0.5 rounded">Reality-TV</div>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 max-w-2xl"
            variants={textVariants}
          >
            A thrilling business competition show where Britain's most ambitious entrepreneurs pitch their innovative startups to secure life-changing investments from industry giants.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 mb-6"
            variants={buttonVariants}
          >
            <motion.a 
              href="https://www.amazon.co.uk/gp/video/detail/amzn1.dv.gti.6346669a-7e09-4a55-9dc0-0e8f93a30ecc" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent transition-all px-6 py-3 rounded-full font-bold inline-flex items-center"
              onHoverStart={() => setIsWatchHovered(true)}
              onHoverEnd={() => setIsWatchHovered(false)}
              whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--accent-secondary))" }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                animate={{ x: isWatchHovered ? [0, 4, 0] : 0 }}
                transition={{ repeat: isWatchHovered ? Infinity : 0, duration: 1 }}
              >
                <Play className="mr-2 h-4 w-4" /> 
              </motion.span>
              Watch on Prime
            </motion.a>
            
            <motion.button
              className="bg-primary border-2 border-accent/50 transition-all px-6 py-3 rounded-full font-bold inline-flex items-center"
              onHoverStart={() => setIsTrailerHovered(true)}
              onHoverEnd={() => setIsTrailerHovered(false)}
              whileHover={{ scale: 1.05, borderColor: "hsla(var(--accent) / 1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowTrailer(true)}
            >
              <motion.span
                animate={{ rotate: isTrailerHovered ? [0, 15, 0, -15, 0] : 0 }}
                transition={{ repeat: isTrailerHovered ? Infinity : 0, duration: 1.5 }}
              >
                <Film className="mr-2 h-4 w-4" /> 
              </motion.span>
              Watch Trailer
            </motion.button>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setIsApplyHovered(true)}
              onHoverEnd={() => setIsApplyHovered(false)}
            >
              <Link href="/apply">
                <div 
                  className="bg-transparent border-2 border-foreground hover:bg-foreground hover:text-primary transition-all px-6 py-3 rounded-full font-bold inline-flex items-center cursor-pointer"
                >
                  <motion.span
                    animate={{ x: isApplyHovered ? [0, 4, 0] : 0 }}
                    transition={{ repeat: isApplyHovered ? Infinity : 0, duration: 1 }}
                  >
                    <ChevronRight className="mr-2 h-4 w-4" /> 
                  </motion.span>
                  Apply Now
                </div>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={buttonVariants}
            whileHover={{ scale: 1.02 }}
            className="inline-block"
          >
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="text-sm flex items-center gap-1 text-accent/90 hover:text-accent"
            >
              <Info className="w-4 h-4" />
              <span className="underline">Show IMDb Details</span>
            </button>
          </motion.div>
          
          {/* IMDb info card */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-4"
              >
                <GlassCard 
                  className="p-4 md:p-5 max-w-lg"
                  opacity={0.15}
                  blurAmount={10}
                  borderOpacity={0.2}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold">Ready Set StartUP UK (2023)</h3>
                    <button 
                      onClick={() => setShowInfo(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    A business competition where aspiring entrepreneurs present their startup ideas to industry experts. With mentorship and guidance, they refine their business models and compete for investment opportunities to launch or grow their ventures.
                  </p>
                  <div className="text-xs text-gray-400 mb-2">IMDb: <a href="https://www.imdb.com/title/tt28768642/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">tt28768642</a></div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-accent/20 px-2 py-1 rounded">Reality-TV</span>
                    <span className="bg-accent/20 px-2 py-1 rounded">Business</span>
                    <span className="bg-accent/20 px-2 py-1 rounded">Competition</span>
                    <span className="bg-accent/20 px-2 py-1 rounded">British</span>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
          
        </motion.div>
      </div>
      
      {/* Trailer Modal */}
      <AnimatePresence>
        {showTrailer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={handleCloseTrailer}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-4xl bg-primary rounded-lg overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  ref={trailerRef}
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/FI2K2rkOWQM?autoplay=1"
                  title="Ready Set StartUP UK Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 bg-primary flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">Ready Set StartUP UK - Official Trailer</h3>
                  <p className="text-sm text-gray-400">Watch the full series on Amazon Prime Video</p>
                </div>
                <button 
                  onClick={handleCloseTrailer}
                  className="bg-accent/80 hover:bg-accent rounded-full p-2 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroBanner;
