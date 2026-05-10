import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Heart, Trash2, Sparkles } from 'lucide-react';

const WelcomeScreen = ({ onSubmit }) => {
  const [motherName, setMotherName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!motherName || images.length === 0) {
      alert("Please enter your mother's name and upload at least one photo.");
      return;
    }
    onSubmit({ motherName, images, message: customMessage });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass max-w-4xl w-full rounded-3xl p-8 md:p-12 overflow-hidden relative"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 via-lavender to-primary-400" />
        
        <div className="text-center mb-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block p-3 bg-primary-100 rounded-full mb-4"
          >
            <Heart className="w-8 h-8 text-primary-500 fill-primary-500 animate-heart-pulse" />
          </motion.div>
          <h1 className="text-responsive-h2 mb-4 text-primary-800">Create a Digital Tribute</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Upload photos and personalize a beautiful Mother's Day experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side: Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-primary-700 mb-2 uppercase tracking-wider">
                  Mother's Name
                </label>
                <input
                  type="text"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  placeholder="Enter her name..."
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all bg-white/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-700 mb-2 uppercase tracking-wider">
                  Custom Message (Optional)
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Write something sweet..."
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all bg-white/50 resize-none"
                />
              </div>
            </div>

            {/* Right Side: Upload */}
            <div>
              <label className="block text-sm font-semibold text-primary-700 mb-2 uppercase tracking-wider">
                Upload Photos
              </label>
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => fileInputRef.current.click()}
                className={`
                  relative border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center
                  ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-primary-300 hover:border-primary-400 hover:bg-white/40'}
                `}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
                <Upload className="w-10 h-10 text-primary-400 mb-4" />
                <p className="text-sm text-gray-500 font-medium">Click or Drag & Drop</p>
                <p className="text-xs text-gray-400 mt-1">Support multiple JPG, PNG</p>
              </div>

              {/* Previews */}
              {images.length > 0 && (
                <div className="mt-6 grid grid-cols-4 gap-3">
                  {images.map((img, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative group aspect-square"
                    >
                      <img
                        src={img}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn-premium w-full py-5 text-lg group"
          >
            <span>Create Mother's Day Tribute</span>
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
