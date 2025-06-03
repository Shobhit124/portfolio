'use client';

import { useRef } from 'react';
import type { FC } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import About from '@/components/About';
import Tools from '@/components/Tools';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import { FaArrowUp } from 'react-icons/fa';
import Image from 'next/image';

interface HeroSectionProps {
  scrollBlur: number;
}

const HeroSection: FC<HeroSectionProps> = ({ scrollBlur }) => {
  const ref = useRef<HTMLDivElement>(null);
  useInView(ref);

  return (
    <section
      id="home"
      className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gray-900/95 bg-gradient-to-br "
      style={{ filter: `blur(${scrollBlur}px)` }}
    >
      {/* Name in background */}
      <div className="absolute top-[25.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <span className="text-[20vw] md:text-[14vw] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 font-sans drop-shadow-lg tracking-wide select-none" style={{ fontFamily: 'Inter, Montserrat, Arial, sans-serif' }}>
          SHOBHIT
        </span>
      </div>

      {/* Profile image in a rounded-corner card */}
      <div className="relative z-10 flex flex-col items-center mt-40">
        {/* Animated image */}
        <motion.div
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, duration: 1 }}
          className="relative group"
        >
          <div className="rounded-3xl bg-white/10 border-4 border-purple-400 shadow-2xl overflow-hidden w-72 h-96 md:w-96 md:h-[28rem] flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <Image 
              src="/WhatsApp Image 2025-04-22 at 1.08.50 PM.jpeg"
              alt="Profile"
              width={500}
              height={300}
              className="object-cover w-full h-full"
              style={{
                objectPosition: "center 30%"
              }}
            />
          </div>
        </motion.div>
        {/* Animated name appears from beneath image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7, ease: "easeOut" }}
          className="mt-8"
        >
          <span className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 font-sans text-center drop-shadow-lg tracking-wide" style={{ fontFamily: 'Inter, Montserrat, Arial, sans-serif' }}>
            Software Engineer
          </span>
        </motion.div>
        <div className="flex justify-center gap-6 mt-6">
          <a
            href="https://github.com/shobhit124"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-white/70 hover:text-purple-400 transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-white/70 hover:text-purple-400 transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:shobhitchadha7@gmail.com"
            className="text-2xl text-white/70 hover:text-purple-400 transition-colors"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [showCall, setShowCall] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollBlur, setScrollBlur] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 500; // Adjust this value to control how fast the blur increases
      const maxBlur = 10; // Adjust this value for the maximum blur amount

      // Calculate blur based on scroll position
      const blurAmount = Math.min((currentScrollY / scrollThreshold) * maxBlur, maxBlur);
      setScrollBlur(blurAmount);

      // Detect scroll direction (existing logic)
      if (currentScrollY < lastScrollY) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }
      setLastScrollY(currentScrollY);

      // Show/hide logic (existing logic)
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.body.offsetHeight;

      if (scrollPosition >= documentHeight - 50) {
        setShowCall(true);
      } else if (scrollPosition < documentHeight - 150) {
        setShowCall(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]); // Added lastScrollY to dependencies

  return (
    <main className="relative">
      {/* Sticky Hero Section */}
      <div className="sticky top-0 left-0 w-full h-screen z-0">
        <HeroSection scrollBlur={scrollBlur} />
      </div>
      {/* Spacer to allow scrolling past the hero */}
      <div className="h-32" />
      {/* Other Sections */}
      <section id="about" className="relative z-10 bg-gray-900/95 backdrop-blur-md">
        <About />
      </section>
      <section id="tools" className="relative z-10 bg-gray-900/95 backdrop-blur-md">
        <Tools />
      </section>
      <section id="experience" className="relative z-10 bg-gray-900/95 backdrop-blur-md">
        <Experience />
      </section>
      <section
        id="projects"
        className="relative z-10 bg-gray-900/95 backdrop-blur-md pb-40"
      >
        <Projects />
      </section>
      {/* Give me a call section at the end */}
      <AnimatePresence>
        {showCall && (
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: isScrollingUp ? 0 : 1,
              y: 0,
              x: isScrollingUp ? '200vw' : 0
            }}
            exit={{ opacity: 0, y: 100 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              x: {
                type: "spring",
                stiffness: 100,
                damping: 15
              },
              opacity: {
                duration: 0.5
              }
            }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 h-[200px] w-[95vw] max-w-3xl z-50 bg-gray-900/95 backdrop-blur-md py-6 px-4 md:py-8 md:px-10 shadow-2xl rounded-2xl flex flex-col items-center border border-purple-900/40"
          >
            <div className="flex items-center justify-center w-full">
              <span className="text-3xl md:text-5xl lg:text-7xl font-extrabold uppercase tracking-wider text-white font-[Impact,Oswald,sans-serif]">
                GIVE ME A CALL
              </span>
              <span className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-purple-400 ml-2 md:ml-4">∞</span>
              <motion.button
                aria-label="Call phone number"
                className="ml-auto text-white hover:text-purple-400 transition-colors text-3xl md:text-5xl lg:text-7xl p-2"
                onClick={() => window.location.href = 'tel:+918572833223'}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  initial={{ opacity: 1, filter: "blur(0px)" }}
                  animate={{
                    opacity: 1,
                    filter: "blur(0px)",
                    rotate: 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <FaTwitter />
                </motion.div>
              </motion.button>
            </div>
            {/* Links row */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-6 md:mt-8 text-base md:text-lg lg:text-xl font-semibold">
              <a href="/ShobhitChadha_Backend.pdf" target="_blank" rel="noopener noreferrer" className="relative text-yellow-400 hover:text-purple-400 transition-colors focus:outline-none group">
                My Resume
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full group-focus:w-full"></span>
              </a>
              <a href="https://github.com/shobhit124" target="_blank" rel="noopener noreferrer" className="relative text-white hover:text-purple-400 transition-colors focus:outline-none group">
                GitHub
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full group-focus:w-full"></span>
              </a>
              <a href="https://www.linkedin.com/in/shobhitt07/" target="_blank" rel="noopener noreferrer" className="relative text-white hover:text-purple-400 transition-colors focus:outline-none group">
                LinkedIn
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full group-focus:w-full"></span>
              </a>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
