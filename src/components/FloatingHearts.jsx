import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate initial hearts
    const initialHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * (30 - 10) + 10,
      duration: Math.random() * (15 - 5) + 5,
      delay: Math.random() * 5,
    }));
    setHearts(initialHearts);

    // Periodically add new hearts if needed
    const interval = setInterval(() => {
      setHearts(prev => [
        ...prev.slice(-20), // Keep max 20 hearts
        {
          id: Date.now(),
          left: Math.random() * 100,
          size: Math.random() * (30 - 10) + 10,
          duration: Math.random() * (15 - 5) + 5,
          delay: 0,
        }
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart text-primary-300"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            '--duration': `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          ❤️
        </div>
      ))}
      
      {/* Subtle Gradient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-100/30 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-lavender-light/30 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default FloatingHearts;
