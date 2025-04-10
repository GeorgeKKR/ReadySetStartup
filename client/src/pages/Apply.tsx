import React from 'react';
import ApplicationSection from '@/components/ApplicationSection';

const Apply: React.FC = () => {
  return (
    <div className="pt-24 bg-secondary min-h-screen">
      <div className="container mx-auto px-4 mb-16">
        <h1 className="text-4xl font-display font-bold mb-8 text-center">Apply Now</h1>
        <p className="text-xl text-center max-w-3xl mx-auto mb-16">
          We're looking for the UK's most innovative entrepreneurs for our upcoming season. If you have what it takes to compete with Britain's best startups, we want to hear from you.
        </p>
      </div>
      
      <ApplicationSection />
    </div>
  );
};

export default Apply;
