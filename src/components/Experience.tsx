'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const experiences = [
  {
    company: 'Wits Innovation Lab',
    position: 'Assistant Software Engineer - Full Stack',
    period: 'August 2024 - Present',
    description: 'Working on cutting-edge solutions and innovative products.'
  }
];

const cardVariants = {
  initial: { 
    opacity: 0,
    y: 50,
    filter: "blur(0px)"
  },
  animate: { 
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      y: {
        type: "spring",
        stiffness: 300,
        damping: 8,
        mass: 0.5,
        repeat: 2,
        repeatType: "reverse"
      },
      filter: {
        duration: 0.6,
        repeat: 2,
        repeatType: "reverse",
        values: ["blur(0px)", "blur(4px)", "blur(0px)"]
      }
    }
  }
};

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px"
  });

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 leading-tight py-2">
          Experience
          </h2>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
            key={index}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            variants={cardVariants}
            className="relative pl-8 border-l-2 border-purple-500 cursor-pointer"
          >
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500" />
            <div className="glass-card card-glow bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm hover:bg-gray-900/70 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-purple-400">{exp.company}</h3>
              <p className="text-lg text-gray-300 mt-2">{exp.position}</p>
              <p className="text-sm text-gray-400 mt-1">{exp.period}</p>
              <p className="text-gray-400 mt-4">{exp.description}</p>
            </div>
          </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 