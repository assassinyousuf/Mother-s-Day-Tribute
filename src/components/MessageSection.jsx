import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const MessageSection = ({ name, message }) => {
  const displayMessage = message || `Dear ${name}, thank you for everything you do. Your love is the heartbeat of our family, and your strength is our guiding light. Today, we celebrate you and the incredible woman you are. Happy Mother's Day!`;

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.5,
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <section className="py-20 flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass max-w-3xl w-full p-8 md:p-16 rounded-[2.5rem] relative overflow-hidden"
      >
        {/* Decorative elements */}
        <Quote className="absolute top-8 left-8 w-12 h-12 text-primary-200/50 -rotate-12" />
        <Quote className="absolute bottom-8 right-8 w-12 h-12 text-primary-200/50 rotate-168" />
        
        <div className="text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"
          >
            <span className="text-primary-500 text-2xl">✨</span>
          </motion.div>
          
          <h3 className="text-responsive-h2 text-primary-800 font-playfair italic mb-8">
            A Message for You
          </h3>
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-responsive-p text-gray-700 font-dancing leading-relaxed tracking-wide"
          >
            {displayMessage.split(" ").map((word, index) => (
              <motion.span
                key={index}
                variants={child}
                className="inline-block mr-[0.3em] mb-[0.1em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-12 pt-8 border-t border-primary-100/50"
          >
            <p className="font-playfair text-xl text-primary-600 font-semibold italic">
              With Love, Forever.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default MessageSection;
