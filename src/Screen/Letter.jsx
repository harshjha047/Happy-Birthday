import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Letter = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [availableVoices, setAvailableVoices] = useState([]);

  // The letter split into paragraphs for staggered animation
  const letterParagraphs = [
    "To the person who became my family without sharing my blood,",
    "Agar koi mujhse pooche ki meri life ki sabse achhi choice kya thi, toh main bina soche bolungi, “8th class mein tumse dosti hona.”",
    "Sach kahun, uss time mujhe bilkul nahi pata tha ki ek school wali friendship itni gehri ban jaayegi. Mujhe nahi pata tha ki ek din tum meri har khushi ka reason aur har mushkil ka solution ban jaogi.",
    "Tumhari ek baat mujhe hamesha amaze karti hai. Tum kabhi ye nahi kehti ki “sab theek ho jayega.” Tum bas mere saath baith jaati ho, meri baat sunti ho, aur pata hi nahi chalta kab mera dil halka ho jaata hai. Tumhare paas har problem ka answer ho ya na ho, lekin tumhari presence hi answer ban jaati hai.",
    "Humne kitni random memories banayi hain—school ke lectures, lunch share karna, bina wajah hasna, ek dusre ko roast karna, exams ke time panic hona aur phir bhi last moment tak hope rakhna. Shayad ye moments kisi aur ko ordinary lagen, par mere liye ye meri favourite memories hain.",
    "Thank you meri har version ko accept karne ke liye. Jab main confident thi, tab bhi tum mere saath thi. Jab main toot rahi thi, tab bhi tum wahi thi. Tumne kabhi mujhe perfect hone ki condition par accept nahi kiya. Tumne mujhe meri flaws ke saath apnaya.",
    "Main shayad har baar “thank you” ya “I love you” nahi bolti, lekin dil se jaanti hoon ki tumhare bina meri life bahut alag hoti. Tum sirf meri best friend nahi ho. Tum meri peace ho, meri comfort ho, aur woh insaan ho jiske saath main bilkul apni asli wali self ban sakti hoon.",
    "Bas ek baat yaad rakhna—chahe hum kitne bhi bade ho jaayein, kitni bhi responsibilities aa jaayein, ya kitni bhi dooriyan aa jaayein, meri life mein tumhari jagah kabhi koi nahi le sakta.",
    "Thank you for choosing me every single time. Aur agar mujhe dobara apni best friend choose karne ka chance mile, toh main har baar sirf tumhe hi choose karungi.",
    "I love you endlessly, my forever person. 🤍"
  ];

  // --- Background Image Slideshow Logic ---
  useEffect(() => {
    const interval = setInterval(() => {
      const randomPhotoId = Math.floor(Math.random() * 78) + 1;
      setCurrentImageIndex(randomPhotoId);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  // --- Load Voices Asynchronously ---
  useEffect(() => {
    const fetchVoices = () => {
      setAvailableVoices(window.speechSynthesis.getVoices());
    };

    // Fetch immediately in case they are already loaded
    fetchVoices();

    // Chrome and Safari load voices asynchronously, so we must listen for this event
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = fetchVoices;
    }
    
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  // --- Text to Speech Logic ---
  const handlePlayVoice = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const textToRead = letterParagraphs.join(" ");
        const utterance = new SpeechSynthesisUtterance(textToRead);
        
        // 1. Specifically look for the Google Hindi voice
        // It usually appears as "Google हिन्दी" in Chrome
        const googleHindiVoice = availableVoices.find(
          (voice) => voice.name.includes("Google") && voice.lang.includes("hi-IN")
        );

        // 2. Fallback: If Google Hindi isn't found, find ANY Indian Hindi voice
        const fallbackHindiVoice = availableVoices.find(
          (voice) => voice.lang.includes("hi-IN")
        );

        // Apply the voice if we found one
        if (googleHindiVoice) {
          utterance.voice = googleHindiVoice;
        } else if (fallbackHindiVoice) {
          utterance.voice = fallbackHindiVoice;
        }

        utterance.lang = 'hi-IN'; 
        utterance.rate = 0.85;    // Slower pace for emotion
        utterance.pitch = 1.1;    
        
        utterance.onend = () => setIsPlaying(false);
        
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    } else {
      alert("Sorry, your browser doesn't support text-to-speech!");
    }
  };

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 1.5 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#ffe9ec] font-sans flex flex-col items-center py-20 px-4">
      
      {/* Cinematic Fading Background Image */}
      <div className="fixed inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={`/photo (${currentImageIndex}).jpg`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.25, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="w-full h-full object-cover mix-blend-luminosity"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#ffe9ec]/60 to-[#ffe9ec]/90" />
      </div>

      {/* Fixed Header */}
      <div className="fixed top-0 w-full p-6 z-40 flex justify-between items-center max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="bg-white/50 backdrop-blur-md text-[#b23b4e] font-bold py-2 px-6 rounded-full shadow-sm hover:bg-white/80 transition-colors"
        >
          ← Back
        </button>

        {/* Play Audio Button */}
        <button 
          onClick={handlePlayVoice}
          className="bg-[#ff6b87] text-white flex items-center gap-2 font-bold py-2 px-6 rounded-full shadow-lg hover:bg-[#ff5273] transition-colors"
        >
          {isPlaying ? (
            <span className="animate-pulse">⏸ Pause</span>
          ) : (
            <span>▶ Read to me</span>
          )}
        </button>
      </div>

      {/* The Letter Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 md:p-12 mt-8 text-center md:text-left"
      >
        {letterParagraphs.map((text, index) => (
          <motion.p 
            key={index} 
            variants={itemVariants}
            className={`text-[#8a2b3b] text-lg md:text-xl leading-relaxed mb-6 ${
              index === 0 ? "font-bold text-2xl mb-8" : ""
            } ${index === letterParagraphs.length - 1 ? "font-bold italic mt-8" : ""}`}
          >
            {text}
          </motion.p>
        ))}
      </motion.div>

    </div>
  );
};

export default Letter;