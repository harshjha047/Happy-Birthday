import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Media array supporting both images and videos
// The 'span' property helps create that cool, varied "Bento Box" grid look
const getRandomSpan = () => {
  const spans = [
    "col-span-1 row-span-1", // Standard square
    "col-span-2 row-span-1", // Wide rectangle
    "col-span-1 row-span-2", // Tall rectangle
    "col-span-2 row-span-2", // Large square
  ];
  return spans[Math.floor(Math.random() * spans.length)];
};

// Generate the array dynamically for both photos and videos
const generateMedia = (totalPhotos, totalVideos) => {
  let items = [];
  let currentId = 1;
  
  // 1. Loop through and add all photos
  for (let i = 1; i <= totalPhotos; i++) {
    items.push({
      id: currentId++,
      type: 'image',
      // The path perfectly matches your Windows bulk-rename format
      // Note: If you put these inside a folder in public like "public/memories", 
      // change this to `/memories/photo (${i}).jpg`
      src: `/Photos/photo (${i}).jpg`, 
      span: getRandomSpan(), 
    });
  }

  // 2. Loop through and add all videos
  for (let i = 1; i <= totalVideos; i++) {
    items.push({
      id: currentId++,
      type: 'video',
      src: `/Photos/video (${i}).mp4`, 
      span: getRandomSpan(), 
    });
  }
  
  // 3. Optional but recommended: Shuffle the array so photos and videos are mixed up!
  // If you remove this line, all videos will just appear at the very bottom.
  items.sort(() => Math.random() - 0.5);

  return items;
};

// Based on your screenshot, I see at least 78 photos and 9 videos.
// Just change these two numbers to match your exact highest file numbers!
const mediaItems = generateMedia(78, 31);

const PhotoGallery = () => {
  const navigate = useNavigate();
  const [selectedMedia, setSelectedMedia] = useState(null);

  return (
    <div className="min-h-screen bg-[#ffe9ec] font-sans pb-12">
      
      {/* Header */}
      <div className="sticky top-0 w-full p-6 z-40 flex justify-between items-center bg-[#ffe9ec]/90 backdrop-blur-sm border-b border-pink-200">
        <button 
          onClick={() => navigate(-1)}
          className="bg-[#ff6b87] text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-[#ff5273] transition-colors"
        >
          ← Back
        </button>
        <h2 className="text-[#b23b4e] text-2xl font-extrabold drop-shadow-sm pr-2">
          Our Memories ✨
        </h2>
      </div>

      {/* Bento Grid Layout */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[200px]">
          {mediaItems.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`media-${item.id}`} // This is the magic for smooth expansion
              onClick={() => setSelectedMedia(item)}
              whileHover={{ scale: 0.98 }}
              className={`relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow bg-[#ffdbe1] ${item.span}`}
            >
              {item.type === 'image' ? (
                <img 
                  src={item.src} 
                  alt="Memory" 
                  className="w-full h-full object-cover "
                />
              ) : (
                <>
                  <video 
                    src={item.src} 
                    className="w-full h-full object-cover"
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                  />
                  {/* Play icon overlay for videos in the grid */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white/70 backdrop-blur-sm rounded-full p-3">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#ff6b87]">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Expansion Modal (Lightbox) */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)} // Close when clicking outside
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              layoutId={`media-${selectedMedia.id}`}
              className="relative w-full max-w-4xl max-h-full rounded-2xl overflow-hidden shadow-2xl bg-black flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent clicking media from closing modal
            >
              {selectedMedia.type === 'image' ? (
                <img 
                  src={selectedMedia.src} 
                  alt="Memory Expanded" 
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
              ) : (
                <video 
                  src={selectedMedia.src} 
                  className="w-full h-auto max-h-[85vh] object-contain"
                  controls // Add controls when expanded so she can listen/pause
                  autoPlay
                  playsInline
                />
              )}
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default PhotoGallery;