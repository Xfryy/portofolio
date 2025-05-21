"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import PageTransition from '@/components/PageTransition';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Work() {
  const projects = [
    {
      id: 'Abey-homey',
      title: 'Abey Homey Website',
      description: 'A modern React component library built with Tailwind CSS',
      image: '/projects/abey.png',
      category: 'Web Pages',
      year: '2025',
      tags: ['React', 'TypeScript', 'Tailwind CSS','MongoDb','Next.js', 'Claudinary'],
      featured: true
    },
    {
      id: 'Gaza-youth',
      title: 'Gaza youth Website',
      description: 'Travel discovery app with personalized recommendations',
      image: '/projects/Gaza.png',
      category: 'Mobile App',
      year: '2022',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'MongoDb', 'Next.js', 'Claudinary'],
      featured: true
    }
  ];

  return (
    <PageTransition>
      <AnimatedBackground />
      <div className="py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header with enhanced animations */}
          <motion.div 
            className="mb-16 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
            
            <motion.h1 
              className="text-5xl font-bold mb-6 text-primary bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Selected Work
            </motion.h1>
            <motion.p 
              className="text-xl text-secondary max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A collection of projects I`ve worked on as a design engineer, focused on creating beautiful and functional digital experiences.
            </motion.p>
          </motion.div>
          
          {/* Projects Grid with staggered animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + index * 0.1,
                  ease: "easeOut"
                }}
              >
                <Link 
                  href={`/work/${project.id}`}
                  className="group relative overflow-hidden rounded-xl bg-card border border-themed hover:border-gray-400 dark:hover:border-gray-700 transition-all duration-300 block"
                >
                  {/* Project Image with hover effect */}
                  <div className="relative h-52 w-full overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"
                      whileHover={{ opacity: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="relative h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    
                    {project.featured && (
                      <motion.div 
                        className="absolute top-4 right-4 px-2 py-1 bg-blue-500 text-white text-xs rounded-full z-20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        Featured
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Project Info with hover animations */}
                  <motion.div 
                    className="p-6 relative"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-blue-500"></div>
                        <p className="text-sm text-blue-400">{project.category}</p>
                      </div>
                      <p className="text-sm text-secondary">{project.year}</p>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-primary group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-secondary mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 bg-card text-secondary rounded-full text-xs border border-themed"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <motion.div 
                      className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-blue-400 flex items-center gap-1">
                        View details
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Contact Section with animation */}
          <motion.div 
            className="mt-20 p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-900/30 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-primary">Interested in working together?</h2>
            <p className="text-secondary mb-6 max-w-lg mx-auto">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-flex items-center gap-2 transition-all duration-300 group"
            >
              <span>Get in touch</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}