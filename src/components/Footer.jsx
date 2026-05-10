import React from 'react';
import { motion } from 'framer-motion';
import { Heart, RefreshCcw } from 'lucide-react';

const Footer = ({ onReset }) => {
  return (
    <footer className="py-20 border-t border-primary-100 bg-white/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="inline-block mb-6"
        >
          <Heart className="w-8 h-8 text-primary-500 fill-primary-500" />
        </motion.div>
        
        <h2 className="font-dancing text-3xl text-primary-800 mb-4">
          Made with Love for Mom
        </h2>
        
        <p className="text-gray-500 text-sm tracking-widest uppercase mb-12">
          &copy; {new Date().getFullYear()} Mother's Day Tribute Experience
        </p>
        
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-2 rounded-full border border-primary-200 text-primary-600 hover:bg-primary-50 transition-all text-sm font-medium group"
          >
            <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Create a New Tribute
          </button>
          
          <p className="text-[10px] text-gray-400 max-w-xs mx-auto mt-4">
            * This tribute is saved locally on your device. Clearing your browser cache or clicking reset will remove the personalized data.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
