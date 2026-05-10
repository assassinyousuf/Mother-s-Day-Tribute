import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const MemorySlideshow = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  React.useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying, images.length]);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="py-20">
      <div className="glass max-w-5xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl relative">
        <div className="aspect-[16/9] md:aspect-[21/9] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={images[index]}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Controls Overlay */}
          <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 pointer-events-none">
            <button
              onClick={prev}
              className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white pointer-events-auto hover:bg-white/40 transition-all active:scale-90"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white pointer-events-auto hover:bg-white/40 transition-all active:scale-90"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex items-center justify-between">
            <div className="flex gap-2">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 transition-all duration-500 rounded-full ${
                    i === index ? 'w-8 bg-white' : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-primary-500 rounded-full text-white hover:bg-primary-600 transition-all shadow-lg active:scale-90"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-primary-700/60 font-playfair italic text-lg">
          "Every picture tells a story of your love."
        </p>
      </div>
    </section>
  );
};

export default MemorySlideshow;
