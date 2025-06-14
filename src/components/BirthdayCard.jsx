import React, { useState, useRef, useEffect } from "react";
import Particles from "./Particles";
import song from "../assets/song/song.mp3";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import img from '../assets/images/sam1.jpg';
import ShinyText from "./ShinyText";

const BirthdayCard = () => {
  const audioRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const confettiInterval = useRef(null);

  // Improved confetti function with different effects
  const burstConfetti = () => {
    // Main burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
    });

    // Left burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#ff69b4', '#00ffff', '#ffff00']
      });
    }, 300);

    // Right burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#ff69b4', '#00ffff', '#ffff00']
      });
    }, 600);
  };

  useEffect(() => {
    // Initial confetti
    burstConfetti();
    
    // Continuous confetti when interacted
    if (hasInteracted) {
      confettiInterval.current = setInterval(burstConfetti, 2000);
      setShowFireworks(true);
    }

    return () => {
      if (confettiInterval.current) {
        clearInterval(confettiInterval.current);
      }
    };
  }, [hasInteracted]);

  const handleInteraction = () => {
    if (!hasInteracted) {
      // Always hide the prompt when clicked, regardless of audio success
      setShowPrompt(false);
      setHasInteracted(true);
      
      // Try to play audio but don't depend on it for UI updates
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            console.log("Audio is playing 🎶");
          })
          .catch((err) => {
            console.warn("Autoplay blocked:", err);
          });
      }
    }
  };

  // Firework animation component
  const Firework = ({ x, delay }) => {
    return (
      <motion.div
        initial={{ y: "100vh", x: `${x}%`, opacity: 0 }}
        animate={{ y: "-100vh", opacity: [0, 1, 0] }}
        transition={{ 
          duration: 2,
          delay,
          repeat: Infinity,
          repeatDelay: Math.random() * 3 + 2
        }}
        className="absolute"
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </motion.div>
    );
  };

  return (
    <section
      className="md:h-screen md:min-h-full min-h-[155vh] flex items-center justify-center relative bg-black overflow-hidden"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {/* Enhanced Background Particles */}
      <Particles
        particleColors={["#ff69b4", "#00ffff", "#ffff00"]}
        particleCount={300}
        particleSpread={15}
        speed={0.2}
        particleBaseSize={3}
        moveParticlesOnHover={true}
        alphaParticles={true}
        disableRotation={false}
        className="absolute top-0 left-0 w-full h-full opacity-70"
      />

      {/* Fireworks animation */}
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <Firework 
              key={i} 
              x={Math.random() * 100} 
              delay={Math.random() * 2} 
            />
          ))}
        </div>
      )}

      {/* 🎁 Card Content - Enhanced with animations */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full h-full md:py-28 md:px-40 rounded absolute border border-gray-500 grid md:grid-cols-2 grid-cols-1 md:gap-8"
      >
        {/* Left (image) - Enhanced with animations */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="h-full flex flex-col md:items-start justify-center md:justify-start p-3 md:max-h-fit max-h-[50vh] gap-3 items-center"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="relative"
          >
            {/* Glow effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-md animate-pulse"
            />
            <img
              src={img}
              className="relative z-10 border w-52 h-52 border-secondary object-cover object-top rounded-full mt-14 shadow-xl"
              alt="Birthday Celebrant"
              style={{
                objectPosition: "center top",
                clipPath: "circle(50% at 50% 50%)"
              }}
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <ShinyText> Happy Birthday Sammy! </ShinyText>
          </motion.div>

          <AnimatePresence>
            {showPrompt && (
              <motion.button
                key="interaction-prompt"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1.5,
                }}
                className="absolute z-50 text-white text-center text-xl md:bottom-48 bottom-4 py-2 px-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full font-poppins shadow-lg"
              >
                click anywhere 🎶🎉
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right (message) - Enhanced with animations */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="p-3 flex flex-col gap-6 font-poppins text-center md:text-left"
        >
          <motion.h1 
            className="text-white text-5xl font-bold font-birthday"
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.7, type: "spring" }}
          >
            🎉 Happy Birthday! 🎉
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.8 }}
            className="space-y-8"
          >
            <motion.p 
              className="text-white mt-2"
              initial={{ x: 20 }}
              animate={{ x: 0 }}
            >
              Wishing you a year filled with love, joy, and blessings! May health,
              happiness, and peace follow you in every step you take. 🌟
            </motion.p>
            
            <motion.p 
              className="text-white mt-2"
              initial={{ x: 20 }}
              animate={{ x: 0 }}
            >
              On this special day, I pray God's grace continues to guide you
              towards greater happiness. 🎂 May your dreams come true this year!
              ✨
            </motion.p>
            
            <motion.p 
              className="text-white mt-4 font-semibold font-birthday text-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
            >
              Enjoy every moment—happy birthday once again! 🎈
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 🎵 Audio Player */}
      <audio ref={audioRef} src={song} loop />
    </section>
  );
};

export default BirthdayCard;