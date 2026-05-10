import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const PersonalizedCard = ({ name, images }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardImage = images[0] || ''; // Use the first uploaded image as the main card photo

  return (
    <section className="py-20 flex flex-col items-center">
      <div className="text-center mb-12">
        <h2 className="text-responsive-h2 text-primary-900 mb-2">A Digital Greeting Card</h2>
        <p className="text-primary-600 font-dancing text-xl">Click to reveal a special surprise</p>
      </div>

      <div 
        className="relative w-80 h-[28rem] perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 260, damping: 20 }}
          className="w-full h-full relative preserve-3d"
        >
          {/* Front of Card */}
          <div className="absolute inset-0 backface-hidden glass rounded-3xl p-4 flex flex-col shadow-2xl border-2 border-white/50">
            <div className="flex-1 rounded-2xl overflow-hidden relative mb-4">
              <img 
                src={cardImage} 
                alt="Front" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-500/30 to-transparent" />
            </div>
            <div className="text-center py-4 bg-white/50 rounded-2xl">
              <h3 className="font-playfair text-2xl text-primary-800 font-bold">Happy Mother's Day</h3>
              <p className="font-dancing text-primary-600 text-lg">{name}</p>
            </div>
            <div className="absolute top-6 right-6 bg-white/80 p-2 rounded-full shadow-lg">
              <Heart className="w-6 h-6 text-primary-500 fill-primary-500 animate-heart-pulse" />
            </div>
          </div>

          {/* Back of Card */}
          <div 
            className="absolute inset-0 backface-hidden glass rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl border-2 border-white/50 rotate-y-180 bg-[#fff9f9]"
          >
            <Sparkles className="text-primary-400 w-12 h-12 mb-6" />
            <h3 className="font-playfair text-3xl text-primary-900 mb-6 text-center italic">
              "For all the love you give, you deserve the world."
            </h3>
            <div className="w-16 h-[1px] bg-primary-200 mb-6" />
            <p className="text-center text-gray-700 font-dancing text-2xl leading-relaxed">
              Mom, you are the heart of our home and the light of our lives. 
            </p>
            <div className="mt-8 text-primary-600 font-bold font-playfair tracking-widest uppercase text-sm">
              Forever Your Child
            </div>
          </div>
        </motion.div>
        
        {/* Hint Animation */}
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute -right-12 top-1/2 -translate-y-1/2 text-primary-400 font-bold text-xs uppercase tracking-widest vertical-text"
        >
          Flip Me
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .vertical-text { writing-mode: vertical-rl; }
      `}} />
    </section>
  );
};

export default PersonalizedCard;
