import React from 'react';
import { motion } from 'framer-motion';
import ParallaxBackground from '@/components/ParallaxBackground';
import { Code } from 'lucide-react';

const ParallaxExample: React.FC = () => {
  return (
    <ParallaxBackground 
      className="min-h-screen"
      dotColor="#FFA64D" 
      shapeColors={['#FF7F32', '#FFB266', '#FFF2E6']}
    >
      <div className="container mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-secondary/60 backdrop-blur-md rounded-xl p-8 mb-12 border border-white/10">
            <h1 className="text-4xl font-display font-bold mb-6">Parallax Background Component</h1>
            <p className="text-lg text-gray-300 mb-6">
              This component adds a beautiful orange-themed parallax background with dotted grid and abstract geometric shapes. 
              It's fully responsive and optimized for smooth scrolling.
            </p>
            
            <div className="bg-black/30 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Code size={16} className="text-accent" />
                <span className="text-sm font-semibold">Implementation Example:</span>
              </div>
              <pre className="text-sm font-mono text-gray-300 overflow-x-auto p-2">
                {`import ParallaxBackground from '@/components/ParallaxBackground';

// Basic usage
<ParallaxBackground>
  <YourContent />
</ParallaxBackground>

// With custom colors
<ParallaxBackground 
  dotColor="#FFA64D" 
  shapeColors={['#FF7F32', '#FFB266', '#FFF2E6']}
>
  <YourContent />
</ParallaxBackground>`}
              </pre>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
              <li>Dotted grid overlay with subtle parallax effect</li>
              <li>Abstract geometric shapes that move at different speeds</li>
              <li>Orange-themed color palette that's customizable</li>
              <li>Performance optimized with transform and will-change properties</li>
              <li>Fully responsive for all screen sizes</li>
              <li>Designed to not interfere with content readability</li>
            </ul>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div 
              className="bg-secondary/60 backdrop-blur-md rounded-xl p-6 border border-white/10 h-full"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4">Dotted Grid Layer</h3>
              <div className="h-40 bg-primary/80 rounded-lg relative overflow-hidden mb-4">
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(#FFA64D15 2px, transparent 0)`,
                    backgroundSize: '22px 22px',
                  }}
                />
              </div>
              <p className="text-gray-300 text-sm">
                The dotted grid creates a subtle texture with 2px dots spaced 22px apart.
                It uses a soft orange color with approximately 8% opacity.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-secondary/60 backdrop-blur-md rounded-xl p-6 border border-white/10 h-full"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4">Geometric Shapes</h3>
              <div className="h-40 bg-primary/80 rounded-lg relative overflow-hidden mb-4">
                <div 
                  className="absolute -left-10 -top-10 w-40 h-40 opacity-20"
                  style={{
                    backgroundColor: '#FF7F32',
                    clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                  }}
                />
                <div 
                  className="absolute -right-10 top-5 w-32 h-32 opacity-10"
                  style={{
                    backgroundColor: '#FFB266',
                    clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
                  }}
                />
                <div 
                  className="absolute right-10 bottom-0 w-24 h-16 opacity-10"
                  style={{
                    backgroundColor: '#FF7F32',
                    clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)',
                  }}
                />
              </div>
              <p className="text-gray-300 text-sm">
                The geometric shapes include triangles, trapezoids, and angled panels in various
                orange shades with opacity between 10% and 20%.
              </p>
            </motion.div>
          </div>
          
          <div className="bg-secondary/60 backdrop-blur-md rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-300 mb-6">
              The parallax effect is created by translating each layer at different speeds 
              based on the current scroll position. The component uses React hooks to track 
              scroll position and apply transforms with GPU acceleration for smooth performance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-primary/80 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-accent">Dotted Grid</h4>
                <p className="text-xs text-gray-400">Parallax ratio: 0.5</p>
                <p className="text-xs text-gray-400">Moves slower than scroll</p>
              </div>
              
              <div className="bg-primary/80 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-accent">Geometric Shapes</h4>
                <p className="text-xs text-gray-400">Parallax ratios: 0.3 - 0.7</p>
                <p className="text-xs text-gray-400">Each shape moves independently</p>
              </div>
              
              <div className="bg-primary/80 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-accent">Content Layer</h4>
                <p className="text-xs text-gray-400">z-index: 10</p>
                <p className="text-xs text-gray-400">Positioned above all background elements</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 italic">
              Scroll up and down to see the parallax effect in action. Notice how each element
              moves at a different speed to create a sense of depth.
            </p>
          </div>
        </motion.div>
      </div>
    </ParallaxBackground>
  );
};

export default ParallaxExample; 