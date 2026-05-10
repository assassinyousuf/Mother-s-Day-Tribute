import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Camera } from 'lucide-react';
import html2canvas from 'html2canvas';

const TributePoster = ({ name, images }) => {
  const posterRef = useRef(null);

  const downloadPoster = async () => {
    if (!posterRef.current) return;
    
    try {
      const canvas = await html2canvas(posterRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `mothers-day-poster-${name.toLowerCase().replace(/\s+/g, '-')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (err) {
      console.error("Failed to generate poster image", err);
      window.print();
    }
  };

  const renderCollage = () => {
    if (images.length === 1) {
      return (
        <img 
          src={images[0]} 
          alt="Poster" 
          className="w-full h-full object-cover grayscale-[10%] sepia-[5%]"
        />
      );
    }

    if (images.length === 2) {
      return (
        <div className="grid grid-cols-2 h-full gap-1 bg-white">
          {images.slice(0, 2).map((img, i) => (
            <img key={i} src={img} alt="Collage" className="w-full h-full object-cover" />
          ))}
        </div>
      );
    }

    if (images.length === 3) {
      return (
        <div className="grid grid-cols-2 h-full gap-1 bg-white">
          <img src={images[0]} alt="Collage" className="w-full h-full object-cover row-span-2" />
          <div className="grid grid-rows-2 gap-1">
            <img src={images[1]} alt="Collage" className="w-full h-full object-cover" />
            <img src={images[2]} alt="Collage" className="w-full h-full object-cover" />
          </div>
        </div>
      );
    }

    // 4 or more images (2x2 grid)
    return (
      <div className="grid grid-cols-2 grid-rows-2 h-full gap-1 bg-white">
        {images.slice(0, 4).map((img, i) => (
          <img key={i} src={img} alt="Collage" className="w-full h-full object-cover" />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 flex flex-col items-center">
      <div className="text-center mb-12 px-4">
        <h2 className="text-responsive-h2 text-primary-900 mb-2 font-playfair italic">Your Tribute Poster</h2>
        <p className="text-gray-500 max-w-md">A cinematic collage of your most precious moments.</p>
      </div>

      <div className="relative group max-w-2xl w-full px-4">
        {/* Poster Container */}
        <motion.div 
          ref={posterRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-[3/4] bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden border-[8px] md:border-[16px] border-white mx-auto flex flex-col"
        >
          {/* Collage Area */}
          <div className="absolute inset-0 z-0">
            {renderCollage()}
            {/* Cinematic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
            <div className="absolute inset-0 border-[1px] border-white/30 m-4 z-10" />
          </div>

          {/* Typography */}
          <div className="relative z-20 h-full flex flex-col justify-between p-6 md:p-12 text-white pointer-events-none">
            <div className="space-y-2">
              <span className="text-[10px] md:text-xs uppercase font-light tracking-[0.5em] block opacity-80">
                A Tribute To
              </span>
              <h3 className="text-4xl md:text-6xl font-playfair font-bold leading-tight uppercase tracking-tighter drop-shadow-lg">
                {name}
              </h3>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="h-[2px] w-16 md:w-24 bg-primary-400 shadow-lg" />
              <p className="text-xl md:text-3xl font-dancing italic text-white/90 drop-shadow-md">
                "Infinite love, eternal gratitude."
              </p>
              <div className="flex justify-between items-end border-t border-white/20 pt-6">
                <div className="space-y-1">
                  <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] opacity-60">Established</p>
                  <p className="text-sm md:text-lg font-playfair">MOM — FOREVER</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] opacity-60 font-bold text-primary-400">Mother's Day</p>
                  <p className="text-sm md:text-lg font-playfair uppercase">{new Date().getFullYear()}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Film Grain Texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-30" />
        </motion.div>

        {/* Action Buttons (Floating) */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col md:flex-row gap-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-2">
          <button 
            onClick={downloadPoster}
            className="flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-full shadow-xl hover:bg-primary-700 transition-all font-semibold whitespace-nowrap"
          >
            <Download className="w-5 h-5" />
            <span>Download Poster</span>
          </button>
          
          <button 
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-3 rounded-full shadow-xl hover:bg-primary-50 transition-all font-semibold whitespace-nowrap md:block hidden"
          >
            <Camera className="w-5 h-5" />
            <span>Print Version</span>
          </button>
        </div>
      </div>
      
      <p className="mt-16 text-sm text-gray-400 italic md:block hidden">
        * Hover over the poster to download or print your high-quality tribute.
      </p>
    </section>
  );
};

export default TributePoster;
