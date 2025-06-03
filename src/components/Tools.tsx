'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  SiRedis,
  SiDocker, SiPostman, SiGit, SiGrafana
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

const tools = [
  { name: 'VS Code', icon: <VscCode /> },
  { name: 'Git', icon: <SiGit /> },
  { name: 'Docker', icon: <SiDocker /> },
  { name: 'Redis', icon: <SiRedis /> },
  { name: 'Postman', icon: <SiPostman /> },
  { name: 'Grafana', icon: <SiGrafana /> },
];

export default function Tools() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Tools I Use Often
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 place-items-center">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card card-glow flex flex-col items-center justify-center p-6 hover:bg-gray-900/70 transition-colors"
            >
            <div className="text-4xl mb-4 text-purple-400 transform transition-transform duration-300 hover:scale-125">{tool.icon}</div>               
            <span className="text-gray-300">{tool.name}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-12 text-gray-400"
        >
          ∞ more.
        </motion.div>
      </div>
    </section>
  );
} 