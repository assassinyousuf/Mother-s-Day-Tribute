import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const LetterModal = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    // Fire confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={openModal}
        className="group relative flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:shadow-primary-500/50">
          <Mail className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 bg-white p-2 rounded-full shadow-lg">
          <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-heart-pulse" />
        </div>
        <span className="mt-4 font-playfair font-bold text-primary-800 text-xl tracking-wide uppercase">
          Open Your Letter
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-primary-900/40 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, rotate: -5 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#fffcf0] max-w-2xl w-full p-8 md:p-12 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] relative border-t-[12px] border-primary-500"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="font-dancing text-3xl text-primary-800 mb-8 border-b border-primary-100 pb-4">
                Dear {name},
              </div>

              <div className="font-inter text-gray-700 leading-relaxed space-y-6 text-lg">
                <p>
                  Today is a celebration of the most beautiful soul I know. Thank you for being the person who always knows exactly what to say, who gives the warmest hugs, and who loves without conditions.
                </p>
                <p>
                  Your strength has carried us through storms, and your laughter has brightened our brightest days. You aren't just a mother; you are our hero, our teacher, and our best friend.
                </p>
                <p>
                  We hope this small tribute brings a smile to your face, just as you bring joy to our lives every single day.
                </p>
              </div>

              <div className="mt-12 flex flex-col items-end">
                <div className="font-dancing text-2xl text-primary-700">With all our love,</div>
                <div className="font-playfair font-bold text-xl text-primary-900 mt-2">Always.</div>
                <div className="mt-4">
                  <Sparkles className="w-6 h-6 text-primary-400 animate-pulse" />
                </div>
              </div>
              
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LetterModal;
