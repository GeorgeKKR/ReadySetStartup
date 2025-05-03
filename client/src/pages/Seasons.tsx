import React from 'react';
import { motion } from 'framer-motion';
import { episodes } from '@/data/episodes';
import { Play, Calendar, Clock, Star, ExternalLink } from 'lucide-react';
import ParallaxBackground from '@/components/ParallaxBackground';
import { AppLink } from '@/components/AppLink';
import { getAssetPath } from '@/lib/assetPath';

const Seasons: React.FC = () => {
  // Only use Season 1 episodes
  const seasonOneEpisodes = episodes.filter(episode => episode.seasonEpisode.startsWith("S1"));

  return (
    <ParallaxBackground 
      className="bg-primary min-h-screen"
      dotColor="#FFA64D" 
      shapeColors={['#FF7F32', '#FFB266', '#FFF2E6']}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-primary z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: `url(${getAssetPath('/assets/images/episode1.webp')})`,
            filter: 'blur(2px)',
            transform: 'scale(1.03)'
          }}
        ></div>
        
        <div className="container mx-auto px-4 pt-36 pb-20 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              Season <span className="text-accent">1</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              The inaugural season of Ready Set StartUP UK follows ten ambitious entrepreneurs as they compete for a life-changing £100,000 investment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://www.amazon.co.uk/gp/video/detail/amzn1.dv.gti.6346669a-7e09-4a55-9dc0-0e8f93a30ecc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition-colors"
              >
                <Play className="h-5 w-5" />
                Watch on Prime
              </a>
              <div className="flex items-center gap-6 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  <span className="text-sm">2023</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="text-sm">6 Episodes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-accent" />
                  <span className="text-sm">8.7/10 IMDb</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Episodes Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div 
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-12 w-1.5 bg-accent rounded-full"></div>
          <h2 className="text-3xl font-bold">All Episodes</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {seasonOneEpisodes.map((episode, index) => (
            <motion.div 
              key={episode.id}
              className="bg-secondary/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all hover:shadow-[0_0_15px_rgba(var(--accent-rgb)/0.15)] group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.1, duration: 0.5 }
              }}
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                
                <div className="aspect-video">
                  <img 
                    src={getAssetPath(episode.thumbnail)} 
                    alt={episode.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="absolute top-3 left-3 bg-black/70 text-xs font-semibold py-1 px-2 rounded flex items-center z-20">
                  <span className="w-2 h-2 bg-accent rounded-full mr-1.5"></span>
                  Episode {episode.seasonEpisode.split('E')[1]}
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a 
                    href={episode.streamingUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-accent w-16 h-16 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300"
                  >
                    <Play className="text-white w-8 h-8 ml-1" />
                  </a>
                </div>
                
                <div className="absolute bottom-3 right-3 flex gap-2 z-20">
                  <div className="bg-black/60 backdrop-blur-sm rounded px-2 py-0.5 text-xs font-semibold">
                    {episode.runtime}
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm rounded px-2 py-0.5 text-xs font-semibold flex items-center">
                    <Star className="w-3 h-3 text-accent mr-1" />
                    {episode.rating}
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{episode.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-3">{episode.description}</p>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500">{episode.releaseDate}</span>
                  <a 
                    href={episode.streamingUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-accent text-sm hover:text-accent-hover"
                  >
                    <span>Watch</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Coming Soon Section */}
        <motion.div 
          className="mt-20 text-center bg-accent/5 border border-accent/20 rounded-xl p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-3">Season 2 Coming Soon</h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Ready Set StartUP UK will return with a new season featuring fresh entrepreneurs and even bigger challenges. Stay tuned for updates!
          </p>
          <AppLink 
            href="/apply" 
            className="inline-flex items-center gap-2 bg-accent/20 hover:bg-accent/30 text-accent px-6 py-3 rounded-full transition-colors"
          >
            <span>Apply for Season 2</span>
            <ExternalLink className="w-4 h-4" />
          </AppLink>
        </motion.div>
      </div>
    </ParallaxBackground>
  );
};

export default Seasons;
