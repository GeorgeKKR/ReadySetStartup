import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, LightbulbIcon, LineChart, Users } from 'lucide-react';

const ResourcesSection: React.FC = () => {
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
      ],
      link: "#founder-community",
      linkText: "Join community",
    },
  ];

  return (
    <section id="resources" className="py-16 bg-gradient-to-b from-primary to-secondary">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-display font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Startup Resources
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
              
              <h3 className="text-xl font-bold mb-4">{resource.title}</h3>
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
      </div>
    </section>
  );
};

export default ResourcesSection;
