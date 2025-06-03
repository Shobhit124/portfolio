'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaLightbulb, FaServer } from 'react-icons/fa';

const expertise = [
  {
    title: 'Backend Engineer',
    icon: <FaCode className="w-8 h-8" />,
    description: 'Building scalable and efficient server-side applications',
    tilt: { rotate: -8, y: 0 }
  },
  {
    title: 'Scalable Backend Systems',
    icon: <FaServer className="w-8 h-8" />,
    description: 'Designing and building robust, high-performance, and scalable backend architectures.',
    tilt: { rotate: 15, y: 120 }
  },
  {
    title: 'Creative Thinker & Problem Solver',
    icon: <FaLightbulb className="w-8 h-8" />,
    description: 'Finding innovative solutions to complex problems',
    tilt: { rotate: -10, y: 60 }
  }
];

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 leading-tight py-2">
            My Expertise
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Be it designing a product or engineering it, I take it beyond solving problems.
            It&apos;s about the output that actually matters to the end-users & stakeholders.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative min-h-[400px] max-w-4xl">
            {expertise.map((item, index) => {
              const tilt = isMobile ? { rotate: 0, y: 0 } : item.tilt;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? {
                    opacity: 1,
                    rotate: tilt.rotate,
                    y: tilt.y
                  } : {}}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={!isMobile ? {
                    scale: 1.1,
                    rotate: tilt.rotate * 1.2,
                    y: tilt.y * 1.2,
                    transition: {
                      duration: 0.1,
                      ease: "easeOut"
                    }
                  } : {}}
                  className="group relative bg-gray-900 rounded-xl p-4 border w-full h-[280px] border-gray-800 hover:border-purple-500/30 transition-all duration-100 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]"
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                    zIndex: index + 10
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-100"
                    whileHover={!isMobile ? {
                      scale: 1.05,
                      transition: { duration: 0.1 }
                    } : {}}
                  />

                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-3 text-purple-400 group-hover:scale-110 transition-transform duration-100"
                      whileHover={!isMobile ? {
                        scale: 1.2,
                        rotate: 5,
                        transition: { duration: 0.1 }
                      } : {}}
                    >
                      {item.icon}
                    </motion.div>
                    <motion.h3
                      className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 group-hover:from-pink-400 group-hover:to-purple-400 transition-all duration-100"
                      whileHover={!isMobile ? {
                        scale: 1.1,
                        transition: { duration: 0.1 }
                      } : {}}
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-100"
                      whileHover={!isMobile ? {
                        scale: 1.05,
                        transition: { duration: 0.1 }
                      } : {}}
                    >
                      {item.description}
                    </motion.p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
