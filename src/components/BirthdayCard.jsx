import React, { useState, useRef, useEffect } from "react";
import Particles from "./Particles";
import song from "../assets/song/song.mp3";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import img from '../assets/images/img.jpg'
import ShinyText from "./ShinyText";

const BirthdayCard = () => {
  const audioRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });
  }, []);

  const handleInteraction = () => {
    if (!hasInteracted && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          console.log("Audio is playing 🎶");
          setHasInteracted(true);
        })
        .catch((err) => {
          console.warn("Autoplay blocked:", err);
        });
    }
  };

  return (
    <section
      className="md:h-screen md:min-h-full min-h-[155vh] flex items-center justify-center relative bg-black overflow-hidden"
      onMouseEnter={handleInteraction}
      onTouchStart={handleInteraction}
      onClick={handleInteraction}
    >
      {/* 🎇 Background Particles */}
      <Particles
        particleColors={["#ddd", "#ddd"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
        className="absolute top-0 left-0 w-full h-full"
      />

      {/* 🎁 Card Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full h-full md:py-28 md:px-40 rounded absolute border border-gray-500 grid md:grid-cols-2 grid-cols-1 md:gap-8"
      >
        {/* Left (image) */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="h-full flex flex-col md:items-start justify-center md:justify-start p-3 md:max-h-fit max-h-[50vh] gap-3 items-center"
        >
          <img
            src={img}
            className="border w-52 h-52 border-secondary object-cover object-top rounded-full mt-14"
            alt="Birthday Celebrant"
          />
          <ShinyText> Happy Birthday! </ShinyText>

          {!hasInteracted && (
            <>
              <div
                className="bottom-16 inset-0 z-50 bg-transparent cursor-pointer"
                onClick={handleInteraction}
                onTouchStart={handleInteraction}
                onMouseEnter={handleInteraction}
              ></div>

              {/* 👇 Prompt Message */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1,
                }}
                className="absolute z-50 text-white text-center text-xl md:bottom-48 bottom-4 py-2 px-3 bg-accent rounded-full font-poppins"
              >
                click anywhere 🎶🎉
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Right (message) */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="p-3 flex flex-col gap-4 font-poppins text-center md:text-left "
        >
          <h1 className="text-white text-5xl font-bold font-birthday">
            🎉 Happy Birthday! 🎉
          </h1>
          <p className="text-white mt-2">
            Wishing you a year filled with love, joy, and blessings! May health,
            happiness, and peace follow you in every step you take. 🌟
          </p>
          <p className="text-white mt-2">
            On this special day, I pray God's grace continues to guide you
            towards greater happiness. 🎂 May your dreams come true this year!
            ✨
          </p>
          <p className="text-white mt-4 font-semibold font-birthday text-2xl">
            Enjoy every moment—happy birthday once again! 🎈
          </p>
        </motion.div>
      </motion.div>

      {/* 🎵 Audio Player */}
      <audio ref={audioRef} src={song} loop />
    </section>
  );
};

export default BirthdayCard;
