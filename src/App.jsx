import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './supabaseClient';
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
import Auth from './components/Auth';
import PublicTribute from './pages/PublicTribute';
import { Share2, Cloud, User, LogOut, Heart } from 'lucide-react';

const MainApp = () => {
  const [isTributeStarted, setIsTributeStarted] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [tributeData, setTributeData] = useState({
    motherName: '',
    images: [],
    message: ''
  });
  const [shareUrl, setShareUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Auth Listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) setShowAuth(false);
    });

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const savedData = localStorage.getItem('mothersDayTribute');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setTributeData(parsed);
        setIsTributeStarted(true);
      } catch (e) {}
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      subscription.unsubscribe();
    };
  }, []);

  const handleCreateTribute = (data) => {
    setTributeData(data);
    setIsTributeStarted(true);
    localStorage.setItem('mothersDayTribute', JSON.stringify(data));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveToCloud = async () => {
    if (!user) {
      setShowAuth(true);
      return;
    }

    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from('tributes')
        .insert([
          { 
            user_id: user.id,
            mother_name: tributeData.motherName,
            images: tributeData.images,
            message: tributeData.message
          }
        ])
        .select();

      if (error) throw error;
      
      const id = data[0].id;
      const url = `${window.location.origin}/tribute/${id}`;
      setShareUrl(url);
      alert("Tribute saved to cloud!");
    } catch (error) {
      console.error(error);
      alert("Failed to save: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setIsTributeStarted(false);
    setTributeData({ motherName: '', images: [], message: '' });
    localStorage.removeItem('mothersDayTribute');
    setShareUrl('');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-primary-200 selection:text-primary-900 bg-[#fff5f5]">
      <FloatingHearts />
      <div 
        className="cursor-glow hidden md:block" 
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Header / Nav */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-4 flex justify-between items-center bg-white/10 backdrop-blur-md">
        <div className="font-playfair font-bold text-primary-800 text-xl flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary-500 fill-primary-500" />
          <span>Mother's Day</span>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-primary-700 hidden md:block">{user.email}</span>
              <button 
                onClick={() => supabase.auth.signOut()}
                className="p-2 bg-white/50 rounded-full hover:bg-white text-gray-600 transition-all"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowAuth(true)}
              className="text-xs font-bold uppercase tracking-widest text-primary-600 hover:text-primary-700 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {showAuth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-primary-900/40 backdrop-blur-md"
            onClick={() => setShowAuth(false)}
          >
            <div onClick={e => e.stopPropagation()} className="w-full max-w-md">
              <Auth onAuthSuccess={() => setShowAuth(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isTributeStarted ? (
          <motion.div
            key="welcome-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="pt-20"
          >
            <WelcomeScreen key="welcome-screen" onSubmit={handleCreateTribute} />
          </motion.div>
        ) : (
          <motion.div
            key="tribute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-20 pb-20 pt-16"
          >
            {/* Share Bar */}
            <div className="container mx-auto px-4 max-w-6xl mt-4">
              <div className="glass rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm font-medium text-primary-800">
                  {shareUrl ? "Your tribute is ready to share!" : "Save this tribute to generate a shareable link."}
                </p>
                <div className="flex gap-3">
                  {shareUrl ? (
                    <button onClick={copyShareUrl} className="btn-premium py-2 px-6 text-sm">
                      <Share2 className="w-4 h-4" />
                      <span>Copy Link</span>
                    </button>
                  ) : (
                    <button 
                      onClick={handleSaveToCloud} 
                      disabled={isSaving}
                      className="btn-premium py-2 px-6 text-sm"
                    >
                      <Cloud className={`w-4 h-4 ${isSaving ? 'animate-bounce' : ''}`} />
                      <span>{isSaving ? 'Saving...' : 'Save & Get Link'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

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
};

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/tribute/:id" element={<PublicTribute />} />
      </Routes>
    </Router>
  );
};

export default App;
