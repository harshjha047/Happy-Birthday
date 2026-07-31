import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SelectionPage = () => {
    const navigate = useNavigate();
    
    // 1. Create a reference for the audio player
    const audioRef = useRef(null);

    // 2. Play the audio automatically when this page loads
    useEffect(() => {
        if (audioRef.current) {
            // Since she already clicked "Yes" on the previous page, 
            // the browser will allow this to play immediately!
            audioRef.current.play().catch((err) => {
                console.error("Audio playback failed:", err);
            });
        }
    }, []);

    const handleGalleryClick = () => {
        navigate('/gallery');
    };

    const handleLetterClick = () => {
        navigate('/latter'); // Make sure this matches your route spelling!
    };

    // Card Animation Variants
    const cardVariants = {
        hover: { scale: 1.05, rotate: -1 },
        tap: { scale: 0.95 }
    };

    return (
        <div className="min-h-screen bg-[#ffe9ec] font-sans flex flex-col items-center justify-center p-4 relative">
            
            {/* 3. The Audio Element */}
            {/* Make sure to change "your-song.ogg" to your actual file name */}
            <audio ref={audioRef} src="/telegram_audio.ogg" loop hidden />

            {/* Header Text */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
            >
                <h1 className="text-[#b23b4e] text-4xl font-extrabold mb-2 drop-shadow-sm">
                    Made just for you
                </h1>
                <p className="text-[#d97382] text-lg italic">
                    Tap a card to open your surprise ✨
                </p>
            </motion.div>

            {/* Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-2xl w-full px-4 relative z-10">

                {/* 1. Photo Gallery Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleGalleryClick}
                    className="bg-[#ffdbe1] border-2 border-[#ff8fa3] rounded-3xl p-10 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-shadow h-48"
                >
                    {/* Cute Camera Icon */}
                    <svg viewBox="0 0 24 24" fill="#ff748e" className="w-24 h-24">
                        <path d="M4 6h2.5l1.5-2h8l1.5 2H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm8 11a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                        {/* Heart inside lens */}
                        <path d="M12 13.5l-1.5-1.5a2.12 2.12 0 0 1 0-3 2.12 2.12 0 0 1 3 0 2.12 2.12 0 0 1 3 0 2.12 2.12 0 0 1 0 3L12 13.5z" fill="#ffe9ec" />
                    </svg>
                </motion.div>

                {/* 2. Letter Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleLetterClick}
                    className="bg-[#ffdbe1] border-2 border-[#ff8fa3] rounded-3xl p-10 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-shadow h-48"
                >
                    {/* Cute Envelope Icon */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="#ff748e" strokeWidth="1.5" className="w-28 h-28">
                        <path d="M3 8l9 6 9-6v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8z" fill="#ffe9ec" />
                        <path d="M3 8l9 6 9-6" />
                        <path d="M3 8h18" strokeLinecap="round" />
                        {/* Heart Seal */}
                        <path d="M12 14.5l-2-2a2.8 2.8 0 1 1 4-4 2.8 2.8 0 0 1 4 4l-6 6-6-6a2.8 2.8 0 1 1 4-4 2.8 2.8 0 0 1 4 4l-2 2z" fill="#ff748e" stroke="none" />
                    </svg>
                </motion.div>

            </div>
        </div>
    );
};

export default SelectionPage;
