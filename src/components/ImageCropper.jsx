import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Move } from 'lucide-react';

const ImageCropper = ({ image, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => setCrop(crop);
  const onZoomChange = (zoom) => setZoom(zoom);

  const onCropCompleteInternal = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return canvas.toDataURL('image/jpeg');
  };

  const handleDone = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onCropComplete(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4"
    >
      <div className="relative w-full max-w-2xl aspect-[4/5] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={4 / 5}
          onCropChange={onCropChange}
          onCropComplete={onCropCompleteInternal}
          onZoomChange={onZoomChange}
        />
      </div>

      <div className="mt-8 w-full max-w-md space-y-6 bg-white/10 p-6 rounded-3xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="text-white text-xs uppercase tracking-widest opacity-60">Zoom</span>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(Number(e.target.value))}
            className="flex-1 accent-primary-400"
          />
        </div>

        <div className="flex justify-between gap-4">
          <button 
            onClick={onCancel}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all font-medium"
          >
            <X className="w-5 h-5" />
            <span>Cancel</span>
          </button>
          <button 
            onClick={handleDone}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-all font-bold shadow-lg shadow-primary-900/20"
          >
            <Check className="w-5 h-5" />
            <span>Apply Crop</span>
          </button>
        </div>
        
        <p className="text-center text-white/40 text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
          <Move className="w-3 h-3" />
          Drag to position • Pinch to zoom
        </p>
      </div>
    </motion.div>
  );
};

export default ImageCropper;
