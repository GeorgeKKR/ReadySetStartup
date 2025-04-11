import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import AnimatedCard from "@/components/AnimatedCard";
import ScrollReveal from "@/components/ScrollReveal";

export default function NotFound() {
  return (
    <AnimatedBackground
      type="grid"
      color="hsla(var(--accent) / 0.15)"
      secondaryColor="hsla(var(--accent-secondary) / 0.1)"
      intensity={3}
      speed={2}
      className="min-h-[85vh] w-full flex items-center justify-center"
    >
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <AlertCircle className="h-20 w-20 text-accent mx-auto mb-4" />
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-2"
            animate={{ 
              textShadow: [
                "0 0 0px hsla(var(--accent) / 0.3)", 
                "0 0 20px hsla(var(--accent) / 0.5)", 
                "0 0 0px hsla(var(--accent) / 0.3)"
              ] 
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            404
          </motion.h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Page Not Found</h2>
        </motion.div>
        
        <ScrollReveal delay={0.2}>
          <p className="text-lg max-w-md mx-auto mb-10">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </ScrollReveal>
        
        <AnimatedCard hoverEffect="all" className="inline-block">
          <Button asChild size="lg" variant="default" className="px-6">
            <a href="/ReadySetStartup/#/" className="flex items-center gap-2">
              <Home size={18} />
              <span>Back to Home</span>
            </a>
          </Button>
        </AnimatedCard>
      </div>
    </AnimatedBackground>
  );
}
