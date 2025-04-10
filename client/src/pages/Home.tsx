import React from 'react';
import HeroBanner from '@/components/HeroBanner';
import SimplifiedCastSection from '@/components/SimplifiedCastSection';
import ClipsSection from '@/components/ClipsSection';
import ResourcesSection from '@/components/ResourcesSection';
import ApplicationSection from '@/components/ApplicationSection';
import NewsletterSection from '@/components/NewsletterSection';
import AnimatedBackground from '@/components/AnimatedBackground';
import PageTransition from '@/components/PageTransition';

const Home: React.FC = () => {
  return (
    <main>
      <HeroBanner />
      
      <SimplifiedCastSection />
      
      <AnimatedBackground
        type="gradient"
        color="hsla(var(--accent) / 0.1)"
        secondaryColor="hsla(var(--accent-secondary) / 0.08)"
        intensity={6}
        speed={4}
      >
        <ClipsSection />
      </AnimatedBackground>
      
      <ResourcesSection />
      
      <AnimatedBackground
        type="wave"
        color="hsla(var(--accent) / 0.15)"
        secondaryColor="hsla(var(--accent-secondary) / 0.1)"
        intensity={5}
        speed={3}
      >
        <ApplicationSection />
      </AnimatedBackground>
      
      <AnimatedBackground
        type="dots"
        color="hsla(var(--accent) / 0.12)"
        secondaryColor="hsla(var(--accent-secondary) / 0.07)"
        intensity={4}
        speed={5}
      >
        <NewsletterSection />
      </AnimatedBackground>
    </main>
  );
};

export default Home;
