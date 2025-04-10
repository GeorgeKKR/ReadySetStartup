import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, LightbulbIcon, LineChart, Users } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const resources = [
    {
      id: 1,
      icon: <LightbulbIcon className="text-2xl text-[hsl(var(--accent-secondary))]" />,
      title: "Startup Guides",
      description: "Essential resources for launching your business idea from concept to market.",
      features: [
        "Business plan templates",
        "Market research methods",
        "UK funding opportunities",
        "Competitor analysis frameworks",
        "Launch strategy templates",
        "Growth hacking techniques"
      ],
      link: "#startup-guides",
      linkText: "Explore guides",
    },
    {
      id: 2,
      icon: <LineChart className="text-2xl text-[hsl(var(--accent-secondary))]" />,
      title: "Investor Insights",
      description: "Learn what investors are looking for and how to create an irresistible pitch.",
      features: [
        "Pitch deck examples",
        "Valuation methods",
        "Negotiation strategies",
        "Term sheet breakdowns",
        "Equity structure guidance",
        "VC relationship building"
      ],
      link: "#investor-insights",
      linkText: "View insights",
    },
    {
      id: 3,
      icon: <Users className="text-2xl text-[hsl(var(--accent-secondary))]" />,
      title: "Founder Community",
      description: "Connect with fellow entrepreneurs, mentors, and industry experts.",
      features: [
        "Networking events",
        "Mentorship programs",
        "Founder Q&A sessions",
        "Startup workshops",
        "Industry mastermind groups",
        "Collaboration opportunities"
      ],
      link: "#founder-community",
      linkText: "Join community",
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-primary to-secondary min-h-screen">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl font-display font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Startup Resources
        </motion.h1>
        
        <motion.p
          className="text-xl text-center max-w-3xl mx-auto mb-16 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Access our comprehensive library of startup resources, designed to help you navigate every stage of your entrepreneurial journey.
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {resources.map((resource) => (
            <motion.div 
              key={resource.id}
              className="bg-secondary p-8 rounded-xl border border-gray-800 hover:border-[hsl(var(--accent-secondary))] transition-colors"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                {resource.icon}
              </div>
              
              <h2 className="text-xl font-bold mb-4">{resource.title}</h2>
              <p className="text-gray-400 mb-6">{resource.description}</p>
              
              <ul className="space-y-2 mb-6">
                {resource.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-4 w-4" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href={resource.link} 
                className="text-[hsl(var(--accent-secondary))] hover:underline flex items-center font-semibold"
              >
                {resource.linkText} <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="bg-primary p-8 rounded-xl border border-gray-800 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
              <h3 className="font-bold mb-2">Startup Fundraising Masterclass</h3>
              <p className="text-sm text-gray-400 mb-4">Learn the complete process of raising capital from our show's expert judges.</p>
              <a href="#masterclass" className="text-[hsl(var(--accent-secondary))] text-sm hover:underline">Download guide</a>
            </div>
            
            <div className="p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
              <h3 className="font-bold mb-2">Pitch Deck Template Bundle</h3>
              <p className="text-sm text-gray-400 mb-4">A collection of successful pitch decks from previous contestants.</p>
              <a href="#pitch-decks" className="text-[hsl(var(--accent-secondary))] text-sm hover:underline">Access templates</a>
            </div>
            
            <div className="p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
              <h3 className="font-bold mb-2">Market Validation Toolkit</h3>
              <p className="text-sm text-gray-400 mb-4">Step-by-step guide to validating your startup idea before launch.</p>
              <a href="#validation" className="text-[hsl(var(--accent-secondary))] text-sm hover:underline">Get toolkit</a>
            </div>
            
            <div className="p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
              <h3 className="font-bold mb-2">Founder Interviews Series</h3>
              <p className="text-sm text-gray-400 mb-4">Exclusive interviews with successful entrepreneurs from the show.</p>
              <a href="#interviews" className="text-[hsl(var(--accent-secondary))] text-sm hover:underline">Watch interviews</a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResourcesPage;
