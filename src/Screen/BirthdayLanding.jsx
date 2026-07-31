import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BirthdayLanding = () => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate(); 
  
  // Audio references
  const audioRef = useRef(null);
  const [hasAudioStarted, setHasAudioStarted] = useState(false);

  // 1. Attempt standard autoplay first (works sometimes depending on browser history)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setHasAudioStarted(true))
        .catch(() => console.log("Autoplay blocked. Waiting for user tap."));
    }
  }, []);

  // 2. The foolproof fallback: Trigger audio on ANY tap/click on the screen
  const handlePageInteraction = () => {
    if (!hasAudioStarted && audioRef.current) {
      audioRef.current.play()
        .then(() => setHasAudioStarted(true))
        .catch((err) => console.error("Playback failed:", err));
    }
  };

  // Function to make the "No" button run away
  const handleNoHover = () => {
    const randomX = Math.floor(Math.random() * 300) - 150;
    const randomY = Math.floor(Math.random() * 300) - 150;
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    navigate('/selection'); 
  };

  return (
    // 3. We added onClick={handlePageInteraction} to the main wrapper
    <div 
      onClick={handlePageInteraction}
      className="min-h-screen bg-[#ffe9ec] font-sans flex flex-col items-center justify-center relative overflow-hidden text-center p-4 cursor-pointer"
    >
      
      {/* The Audio Element */}
      <audio ref={audioRef} src="/your-song.ogg" loop hidden />

      {/* Hanging Hearts Decoration */}
      <div className="absolute top-0 left-6 md:left-24 flex space-x-6">
        <div className="w-[2px] h-24 bg-pink-300 relative">
          <span className="absolute -bottom-4 -left-3 text-3xl drop-shadow-md">💗</span>
        </div>
        <div className="w-[2px] h-12 bg-pink-300 relative mt-4">
          <span className="absolute -bottom-4 -left-2 text-xl drop-shadow-md">💖</span>
        </div>
        <div className="w-[2px] h-32 bg-pink-300 relative">
          <span className="absolute -bottom-4 -left-3 text-3xl drop-shadow-md">💗</span>
        </div>
      </div>

      {/* Cute Center Image */}
      <div className="mb-6 z-10 pointer-events-none">
        <img 
          src="https://media.tenor.com/7s1H-r76g7cAAAAi/mochi-peach-cat.gif" 
          alt="Cute blushing cat" 
          className="w-56 h-56 object-cover mx-auto mix-blend-multiply"
        />
      </div>

      {/* Text Elements */}
      <h2 className="text-[#d97382] text-xl font-bold mb-2 tracking-wide pointer-events-none">
        Hey beautiful
      </h2>
      <h1 className="text-[#b23b4e] text-4xl md:text-5xl font-extrabold mb-12 drop-shadow-sm pointer-events-none">
        Do you want to see your gift?
      </h1>

      {/* Buttons Container */}
      <div className="flex items-center justify-center gap-6 mt-12 w-full max-w-sm mx-auto relative z-10 h-20">
        
        {/* The YES Button */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleYesClick}
          className="bg-[#ff6b87] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#ff5273] transition-colors"
        >
          YES PLEASE
        </motion.button>

        {/* The NO Button */}
        <motion.button
          animate={{ x: noPosition.x, y: noPosition.y }}
          onHoverStart={handleNoHover}
          onClick={handleNoHover}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="bg-[#ffc2cc] text-[#b23b4e] font-bold py-3 px-8 rounded-full shadow-md whitespace-nowrap"
        >
          NO THANKS
        </motion.button>
        
      </div>
      
    </div>
  );
};

export default BirthdayLanding;
