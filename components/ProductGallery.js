"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductGallery({ images, productName }) {
  // Gracefully handle missing images
  const safeImages = images && images.length > 0 ? images : ["/placeholder-tshirt.png"];
  
  const [activeImage, setActiveImage] = useState(safeImages[0]);
  const [zoomStyle, setZoomStyle] = useState({});
  const [isZooming, setIsZooming] = useState(false);

  // The Native Hover Zoom Math
  const handleMouseMove = (e) => {
    // We only zoom on Desktop (hover). On mobile touch, this can be glitchy.
    if (window.innerWidth < 1024) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    // Calculate cursor position as a percentage 0-100%
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.5)", // 1.5x Zoom multiplier (gentler)
      transition: "transform 0.1s ease-out, transform-origin 0s" 
    });
  };

  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      setIsZooming(true);
    }
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
      transition: "transform 0.5s ease-out"
    });
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-6">
      
      {/* THUMBNAILS CONTAINER (Horizontal on Mobile, Vertical on Desktop if desired) */}
      {/* We will make it a slick horizontal list below the main image on mobile, and a vertical stack on desktop */}
      {safeImages.length > 1 && (
        <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible scrollbar-hide py-2 lg:py-0 w-full lg:w-24 flex-shrink-0">
          {safeImages.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(imgUrl)}
              className={`relative cursor-pointer overflow-hidden rounded-sm border-2 transition-all flex-shrink-0 w-20 lg:w-full aspect-[3/4] 
                ${activeImage === imgUrl ? 'border-zinc-100 ring-2 ring-zinc-500 ring-offset-2 ring-offset-zinc-950 scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100 border-transparent'}`}
            >
              <img
                src={imgUrl}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}

      {/* MAIN STAGE W/ ZOOM */}
      <div 
        className="w-full aspect-[3/4] bg-zinc-900 rounded-sm border border-zinc-800 overflow-hidden relative cursor-crosshair flex-1"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage} // Triggers React re-mount and framer animation on image switch
            src={activeImage}
            alt={productName}
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.3 }}
            style={isZooming ? zoomStyle : { transform: "scale(1)", transition: "transform 0.5s ease-out" }}
            className={`w-full h-full object-center object-cover ${isZooming ? 'absolute top-0 left-0 right-0 bottom-0 pointer-events-none' : ''}`}
          />
        </AnimatePresence>
        
        {/* Luxury "Hover to Zoom" indicator overlay that fades when zooming */}
        {!isZooming && (
          <div className="absolute inset-x-0 bottom-6 flex justify-center pointer-events-none hidden lg:flex">
             <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
               <svg className="w-4 h-4 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
               <span className="text-xs uppercase tracking-widest text-zinc-300 font-medium">Hover to Zoom</span>
             </div>
          </div>
        )}
      </div>

    </div>
  );
}
