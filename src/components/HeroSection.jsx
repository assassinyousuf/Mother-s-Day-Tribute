import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection = ({ name, images }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
              style={{ backgroundImage: `url(${images[currentIdx]})` }}
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-50/100" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium mb-6 tracking-[0.2em] uppercase">
            A Special Tribute
          </span>
          <h1 className="text-white text-responsive-h1 font-playfair italic mb-4 drop-shadow-2xl">
            Happy Mother's Day,
          </h1>
          <motion.h2 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-white text-responsive-h1 font-playfair font-bold mb-8 drop-shadow-2xl"
          >
            {name} ❤️
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-white/80 text-xl font-light italic max-w-lg">
              "A mother is she who can take the place of all others but whose place no one else can take."
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-12"
            >
              <ChevronDown className="text-white w-10 h-10 opacity-50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Progress Indicator (Visual only here, could be functional) */}
      <div className="absolute bottom-10 left-10 hidden md:flex items-center gap-4">
        <div className="h-[1px] w-20 bg-white/30" />
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll to Explore</span>
      </div>
    </section>
  );
};

export default HeroSection;
