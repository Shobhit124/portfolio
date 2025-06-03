'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Project {
  title: string;
  subtitle: string;
  description: string[];
  tags: string[];
}

const projects: Project[] = [
  {
    title: 'Workflow SaaS Product, National Pension System (NPS).',
    subtitle: 'Go Lang, Fiber',
    description: [
      'Authentication, On-boarding user process, payment and fraud detection.',
      'Retry mechanism and fallback management for the failed steps in execution process of a user',
      'Provides Role based access control for the organizations implementing the product, NPS is a use case of it.',
    ],
    tags: ['Golang', 'Fiber framework', 'Docker', 'Microservices architecture', 'Kubernetes', 'Yugabyte Db', 'PostgreSQL', 'Redis', 'Razorpay', 'Digilocker', 'Keycloak', 'Temporal'],
  },
  {
    title: 'Himira: e - Commerce Platform',
    subtitle: 'Node JS, Express JS',
    description: [
      'Developed Backend of a scalable e-commerce platform empowering Self-Help Groups (SHGs) to sell handmade products nationwide.',
      'Built backend services for product listings, payments, logistics, and automated cron jobs for syncing inventory and orders.',
    ],
    tags: ['Node.js', 'TypeScript', 'JavaScript', 'PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'OpenTelemetry', 'OpenAPI', 'Microservices', 'Razorpay', 'AWS S3', 'Delhivery', 'Docker', 'GitLab CI/CD'],
  },
  {
    title: 'National Pension Scheme(2.0) - Protean(NPS)',
    subtitle: 'Go Lang, Fiber',
    description: [
      'Developed core backend modules for NPS 2.0, managing pension workflows, subscriber lifecycle, contribution tracking, and reporting under strict regulatory compliance.',
      'Implemented gRPC services, job schedulers, and async Kafka pipelines for high-volume data processing, ensuring accuracy, traceability, and auditability.',
    ],
    tags: ['Go', 'Fiber', 'PostgreSQL', 'YugabyteDB', 'Redis', 'Kafka', 'gRPC', 'Temporal', 'MinIO', 'Microservices', 'Docker', 'OpenTelemetry', 'REST APIs'],
  },
];

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-12 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Projects with <span className="inline-block align-middle text-5xl mx-1">∞</span> Impact
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-1">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`${index === projects.length - 1 ? '' : 'mb-8'}`}
            >
              <div
                className="group relative border-4 border-purple-500/20 rounded-3xl p-8"
              >
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                  <p className="text-xl text-purple-400">{project.subtitle}</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    {project.description.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-white font-semibold">Tech stack used:</span>
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-sm bg-purple-500/20 text-purple-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 