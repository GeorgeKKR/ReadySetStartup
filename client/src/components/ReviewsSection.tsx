import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GlassCard from './GlassCard';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
}

const reviews: Review[] = [
  {
    id: 1,
    author: "marta-3627",
    rating: 10,
    date: "January 2024",
    title: "Ready Set Startup is brilliant",
    content: "What a great show for budding entrepreneurs and dreamers! I love the pace, the real-life challenges, and the positive energy throughout the show. It's unlike other business shows that focus on drama - this one actually provides valuable insights and practical advice while still being entertaining."
  },
  {
    id: 2,
    author: "jack_danielsvt",
    rating: 9,
    date: "March 2024",
    title: "A Business Show with Real Value",
    content: "The mentors are fantastic and offer real-world advice that anyone starting a business can use. The format keeps it engaging and the entrepreneurs' stories are inspiring. Much better than the usual reality TV business competitions - this feels authentic and educational."
  },
  {
    id: 3,
    author: "techgirl2023",
    rating: 8,
    date: "February 2024",
    title: "Refreshing take on startup reality",
    content: "I've watched every episode and was impressed by how they balance entertainment with real business education. The judges have great chemistry and provide constructive criticism rather than tearing people down. It's motivating to see everyday people turn their ideas into reality."
  },
  {
    id: 4,
    author: "davidm-92834",
    rating: 10,
    date: "December 2023",
    title: "Must watch for aspiring entrepreneurs",
    content: "If you're thinking about starting a business, this show is a goldmine! It offers invaluable insights into what investors look for and the common pitfalls entrepreneurs face. The quality of production is excellent and the pacing keeps you engaged throughout each episode."
  },
  {
    id: 5,
    author: "businessmind_uk",
    rating: 9,
    date: "February 2024",
    title: "Better than Dragon's Den",
    content: "I find this much more relatable than Dragon's Den. The contestants are regular people with good ideas rather than polished business people, and the advice given is practical and useful. The format makes it easy to follow along with the development of each business concept."
  }
];

const ReviewsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };
  
  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={`${i < Math.round(rating / 2) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
      />
    ));
  };
  
  return (
    <section className="py-20 bg-primary/10">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up" className="mb-12">
          <motion.h2 className="text-3xl md:text-4xl font-display font-bold text-center">
            What <span className="text-accent">Viewers</span> Are Saying
          </motion.h2>
          <p className="text-center mt-4 text-gray-300 max-w-2xl mx-auto">
            Read real reviews from IMDb users who have watched Ready Set StartUP UK on Amazon Prime Video.
          </p>
        </ScrollReveal>
        
        <div className="max-w-5xl mx-auto relative">
          <ScrollReveal>
            <GlassCard className="p-8 relative overflow-hidden">
              {/* Background quote icons */}
              <Quote 
                size={120} 
                className="absolute top-6 left-6 text-accent/5 transform -rotate-12" 
              />
              <Quote 
                size={120} 
                className="absolute bottom-6 right-6 text-accent/5 transform rotate-12" 
              />
              
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">{reviews[activeIndex].title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex">
                        {renderStars(reviews[activeIndex].rating)}
                      </div>
                      <span className="text-sm text-gray-400">
                        {reviews[activeIndex].rating}/10
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{reviews[activeIndex].author}</p>
                    <p className="text-xs text-gray-400">{reviews[activeIndex].date}</p>
                  </div>
                </div>
                
                <div className="bg-secondary/30 p-6 rounded-lg border border-accent/10 mb-6">
                  <p className="text-gray-200 italic relative">
                    "{reviews[activeIndex].content}"
                  </p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-gray-400">Review {activeIndex + 1} of {reviews.length}</span>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-secondary border border-accent/20 flex items-center justify-center"
                      onClick={prevReview}
                    >
                      <ChevronLeft size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-secondary border border-accent/20 flex items-center justify-center"
                      onClick={nextReview}
                    >
                      <ChevronRight size={18} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </GlassCard>
            
            <div className="flex justify-center mt-8">
              <a 
                href="https://www.imdb.com/title/tt28768642/reviews/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm bg-accent/80 hover:bg-accent px-4 py-2 rounded-md transition-colors inline-flex items-center"
              >
                Read More Reviews on IMDb
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;