import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Footer links
  const aboutLinks = [
    { text: "About the Show", href: "#about" },
    { text: "Press & Media", href: "#press" },
    { text: "Sponsorship", href: "#sponsor" },
    { text: "Careers", href: "#careers" },
    { text: "Contact Us", href: "#contact" },
  ];

  const resourceLinks = [
    { text: "Startup Guides", href: "#startup-guides" },
    { text: "Investor Insights", href: "#investor-insights" },
    { text: "Founder Community", href: "#founder-community" },
    { text: "Events & Workshops", href: "#events" },
    { text: "Podcast", href: "#podcast" },
  ];

  const supportLinks = [
    { text: "FAQ", href: "#faq" },
    { text: "Help Center", href: "#help" },
    { text: "Feedback", href: "#feedback" },
    { text: "Accessibility", href: "#accessibility" },
    { text: "Merchandise", href: "#merchandise" },
  ];

  const socialLinks = [
    { icon: <Facebook />, href: "https://www.facebook.com/ReadySetStartUPUK", label: "Facebook" },
    { icon: <Instagram />, href: "https://www.instagram.com/readysetstartup_uk/", label: "Instagram" },
    { icon: <Twitter />, href: "https://x.com/Rdysetstartupuk", label: "Twitter" },
    { icon: <Youtube />, href: "https://www.youtube.com/@ReadySetStartUPUK", label: "YouTube" },
  ];

  const legalLinks = [
    { text: "Terms of Use", href: "#terms" },
    { text: "Privacy Policy", href: "#privacy" },
    { text: "Cookie Policy", href: "#cookie" },
  ];

  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg mb-4">Ready Set StartUP</h3>
            <ul className="space-y-2 text-gray-400">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-[hsl(var(--accent-secondary))]">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-[hsl(var(--accent-secondary))]">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-[hsl(var(--accent-secondary))]">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              Watch full episodes on
              <a 
                href="https://www.amazon.com/prime" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[hsl(var(--accent-secondary))] hover:underline ml-1"
              >
                Amazon Prime Video
              </a>
            </p>
          </motion.div>
        </motion.div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Ready Set StartUP UK. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              {legalLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="hover:text-[hsl(var(--accent-secondary))]"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
