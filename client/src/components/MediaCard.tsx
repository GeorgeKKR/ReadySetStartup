import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaCardProps {
  title: string;
  description?: string;
  mediaType: 'video' | 'image' | 'audio';
  thumbnailSrc: string;
  mediaSrc: string;
  duration?: string;
  date?: string;
  className?: string;
  onClick?: () => void;
  badges?: string[];
  autoPlayOnHover?: boolean;
  glassmorphism?: boolean;
}

const MediaCard: React.FC<MediaCardProps> = ({
  title,
  description,
  mediaType,
  thumbnailSrc,
  mediaSrc,
  duration,
  date,
  className = '',
  onClick,
  badges = [],
  autoPlayOnHover = true,
  glassmorphism = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (autoPlayOnHover && (mediaType === 'video' || mediaType === 'audio') && mediaRef.current) {
      mediaRef.current.play().catch(err => console.error('Error playing media:', err));
      setIsPlaying(true);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (autoPlayOnHover && (mediaType === 'video' || mediaType === 'audio') && mediaRef.current) {
      mediaRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play().catch(err => console.error('Error playing media:', err));
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mediaRef.current) {
      mediaRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-xl cursor-pointer group',
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Media Content */}
      <div className="relative aspect-video w-full overflow-hidden">
        {/* Thumbnail or Media */}
        {mediaType === 'video' ? (
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            src={mediaSrc}
            poster={thumbnailSrc}
            className="w-full h-full object-cover"
            muted={isMuted}
            loop
            playsInline
          />
        ) : mediaType === 'audio' ? (
          <>
            <img 
              src={thumbnailSrc} 
              alt={title} 
              className="w-full h-full object-cover" 
            />
            <audio
              ref={mediaRef as React.RefObject<HTMLAudioElement>}
              src={mediaSrc}
              muted={isMuted}
              loop
            />
          </>
        ) : (
          <img 
            src={thumbnailSrc} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
        )}
        
        {/* Hover overlay */}
        <motion.div 
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          {/* Media controls - only for video/audio */}
          {(mediaType === 'video' || mediaType === 'audio') && (
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.button
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1, backgroundColor: "hsla(var(--accent) / 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </motion.button>
                
                <motion.button
                  className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                  onClick={toggleMute}
                  whileHover={{ scale: 1.1, backgroundColor: "hsla(var(--accent) / 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </motion.button>
              </div>
              
              <motion.button
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"
                whileHover={{ scale: 1.1, backgroundColor: "hsla(var(--accent) / 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Maximize size={14} />
              </motion.button>
            </div>
          )}
        </motion.div>
        
        {/* Duration badge */}
        {duration && (
          <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {duration}
          </div>
        )}
        
        {/* Badges */}
        {badges.length > 0 && (
          <div className="absolute top-3 left-3 flex gap-2">
            {badges.map((badge, index) => (
              <div 
                key={index} 
                className="bg-accent/80 text-white text-xs px-2 py-1 rounded"
              >
                {badge}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Content info */}
      <motion.div
        className={cn(
          'p-4',
          glassmorphism ? 'bg-black/30 backdrop-blur-md border-t border-white/10' : ''
        )}
        initial={{ y: glassmorphism ? 60 : 0 }}
        animate={{ y: glassmorphism && isHovered ? 0 : glassmorphism ? 60 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="font-medium text-base line-clamp-1">{title}</h3>
        
        {description && (
          <p className="text-sm text-gray-300 mt-1 line-clamp-2">{description}</p>
        )}
        
        {date && (
          <div className="text-xs text-gray-400 mt-2">{date}</div>
        )}
        
        <motion.div 
          className="flex items-center mt-2 text-accent text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <span>Watch now</span>
          <ChevronRight size={16} className="ml-1" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MediaCard;