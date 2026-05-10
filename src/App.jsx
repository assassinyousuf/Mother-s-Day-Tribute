import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import HeroSection from './components/HeroSection';
import Gallery from './components/Gallery';
import MessageSection from './components/MessageSection';
import MemorySlideshow from './components/MemorySlideshow';
import LetterModal from './components/LetterModal';
import PersonalizedCard from './components/PersonalizedCard';
import TributePoster from './components/TributePoster';
import FloatingHearts from './components/FloatingHearts';
import Footer from './components/Footer';

function App() {
  const [isTributeStarted, setIsTributeStarted] = useState(false);
  const [tributeData, setTributeData] = useState({
    motherName: '',
    images: [],
    message: ''
  });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Check if data exists in localStorage
    const savedData = localStorage.getItem('mothersDayTribute');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setTributeData(parsed);
        setIsTributeStarted(true);
      } catch (e) {
        console.error("Failed to load saved tribute data", e);
      }
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCreateTribute = (data) => {
    setTributeData(data);
    setIsTributeStarted(true);
    localStorage.setItem('mothersDayTribute', JSON.stringify(data));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setIsTributeStarted(false);
    setTributeData({ motherName: '', images: [], message: '' });
    localStorage.removeItem('mothersDayTribute');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-primary-200 selection:text-primary-900">
      {/* Global Background Effects */}
      <FloatingHearts />
      <div 
        className="cursor-glow hidden md:block" 
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      <AnimatePresence mode="wait">
        {!isTributeStarted ? (
          <motion.div
            key="welcome-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            <WelcomeScreen key="welcome-screen" onSubmit={handleCreateTribute} />
          </motion.div>
        ) : (
          <motion.div
            key="tribute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-20 pb-20"
          >
            <HeroSection 
              name={tributeData.motherName} 
              images={tributeData.images} 
            />
            
            <div className="container mx-auto px-4 max-w-6xl space-y-32">
              <MessageSection 
                name={tributeData.motherName} 
                message={tributeData.message} 
              />
              
              <Gallery images={tributeData.images} />
              
              <PersonalizedCard 
                name={tributeData.motherName} 
                images={tributeData.images} 
              />

              <TributePoster 
                name={tributeData.motherName} 
                images={tributeData.images} 
              />
              
              <MemorySlideshow images={tributeData.images} />
              
              <div className="flex justify-center items-center py-10">
                <LetterModal name={tributeData.motherName} />
              </div>
            </div>

            <Footer onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
