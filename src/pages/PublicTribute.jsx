import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import MessageSection from '../components/MessageSection';
import Gallery from '../components/Gallery';
import MemorySlideshow from '../components/MemorySlideshow';
import LetterModal from '../components/LetterModal';
import PersonalizedCard from '../components/PersonalizedCard';
import TributePoster from '../components/TributePoster';
import FloatingHearts from '../components/FloatingHearts';
import { Heart } from 'lucide-react';

const PublicTribute = () => {
  const { id } = useParams();
  const [tribute, setTribute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTribute = async () => {
      try {
        const { data, error } = await supabase
          .from('tributes')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setTribute(data);
      } catch (error) {
        console.error('Error fetching tribute:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTribute();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Heart className="w-16 h-16 text-primary-400 fill-primary-400" />
        </motion.div>
      </div>
    );
  }

  if (!tribute) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-primary-50 p-6 text-center">
        <h1 className="text-3xl font-playfair text-primary-800 mb-4">Tribute Not Found</h1>
        <p className="text-gray-600">The link might be expired or incorrect.</p>
        <a href="/" className="btn-premium mt-8">Create Your Own Tribute</a>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingHearts />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-20 pb-20"
      >
        <HeroSection 
          name={tribute.mother_name} 
          images={tribute.images} 
        />
        
        <div className="container mx-auto px-4 max-w-6xl space-y-32">
          <MessageSection 
            name={tribute.mother_name} 
            message={tribute.message} 
          />
          
          <Gallery images={tribute.images} />
          
          <PersonalizedCard 
            name={tribute.mother_name} 
            images={tribute.images} 
          />

          <TributePoster 
            name={tribute.mother_name} 
            images={tribute.images} 
          />
          
          <MemorySlideshow images={tribute.images} />
          
          <div className="flex justify-center items-center py-10">
            <LetterModal name={tribute.mother_name} />
          </div>
        </div>

        <footer className="py-20 text-center border-t border-primary-100 bg-white/30 backdrop-blur-sm">
          <p className="font-dancing text-2xl text-primary-800 mb-2">Created with Love</p>
          <p className="text-xs text-gray-400 uppercase tracking-widest">A Mother's Day Gift Experience</p>
        </footer>
      </motion.div>
    </div>
  );
};

export default PublicTribute;
