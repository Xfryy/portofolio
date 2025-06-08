"use client";

import { motion } from 'framer-motion';
import { Code, GitBranch, Terminal, Database, Layout, Braces, Sparkles, Trophy, Rocket } from 'lucide-react';
import { useState } from 'react';

interface JourneyStep {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
  skills: string[];
  achievement?: string;
  color: string;
}

const CodingJourneySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const journeySteps: JourneyStep[] = [
    {
      year: '2020',
      title: 'HTML & CSS Fundamentals',
      description: 'Started my coding journey with web fundamentals, learning HTML5 and CSS3. Created static websites and focused on responsive design.',
      icon: Layout,
      skills: ['HTML5', 'CSS3', 'Responsive Design', 'Bootstrap'],
      achievement: 'First Website Built',
      color: 'from-orange-500 to-red-500'
    },
    {
      year: '2021',
      title: 'JavaScript & Frontend',
      description: 'Dove into JavaScript and modern frontend development. Learned DOM manipulation and basic frontend frameworks.',
      icon: Braces,
      skills: ['JavaScript', 'ES6+', 'DOM', 'jQuery'],
      achievement: 'Interactive Apps Created',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      year: '2022',
      title: 'React Development',
      description: 'Mastered React.js and its ecosystem. Built interactive web applications with modern tooling.',
      icon: Code,
      skills: ['React.js', 'Redux', 'Hooks', 'TypeScript'],
      achievement: 'Component Library Built',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      year: '2023',
      title: 'Full Stack Journey',
      description: 'Expanded into backend development and database management. Learned Node.js and MongoDB.',
      icon: Database,
      skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
      achievement: 'Full Stack Projects',
      color: 'from-green-500 to-emerald-500'
    },
    {
      year: '2024',
      title: 'Next.js Mastery',
      description: 'Advanced to Next.js for full-stack applications. Focused on server-side rendering and API routes.',
      icon: Terminal,
      skills: ['Next.js', 'SSR', 'API Routes', 'Prisma'],
      achievement: 'Production Apps Deployed',      color: 'from-blue-400 to-blue-600'
    },
    {
      year: '2025',
      title: 'DevOps & Cloud',
      description: 'Learning DevOps practices and cloud deployment. Working with CI/CD pipelines and cloud services.',
      icon: GitBranch,
      skills: ['Docker', 'AWS', 'CI/CD', 'Vercel'],
      achievement: 'Scalable Infrastructure',
      color: 'from-blue-500 to-blue-700'
    }
  ];

  return (
    <div className="mt-32 mb-32 relative">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full opacity-30"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-25"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Enhanced Section Header */}
      <motion.div 
        className="text-center mb-20 relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-400/10 to-blue-600/10 border border-blue-500/20 mb-6"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm uppercase tracking-wider text-blue-400 font-medium">MY JOURNEY</span>
          <Sparkles className="w-4 h-4 text-blue-400" />
        </motion.div>
        
        <motion.h2 
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Coding Journey
        </motion.h2>
        
        <motion.p 
          className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          From writing my first HTML tag to building full-stack applications
          <br />
          <span className="text-lg text-gray-500">Each step shaped my passion for web development</span>
        </motion.p>
      </motion.div>

      {/* Enhanced Timeline */}
      <div className="relative max-w-6xl mx-auto">
        {/* Animated Timeline Line */}
        <motion.div 
          className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-full overflow-hidden"
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          {/* Glowing effect */}
          <motion.div
            className="w-full h-20 bg-gradient-to-b from-white/50 to-transparent blur-sm"
            animate={{ y: [-80, window.innerHeight] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Enhanced Journey Steps */}
        {journeySteps.map((step, index) => {
          const IconComponent = step.icon;
          const isEven = index % 2 === 0;
          
          return (
            <motion.div
              key={step.year}
              className={`relative flex items-center mb-16 ${
                isEven ? 'md:justify-start' : 'md:justify-end'
              }`}
              initial={{ opacity: 0, x: isEven ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Enhanced Timeline Point */}
              <motion.div 
                className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 z-10"
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${step.color} shadow-lg relative`}>
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${step.color} opacity-50 blur-md`}
                    animate={{ 
                      scale: hoveredIndex === index ? [1, 1.5, 1] : 1,
                      opacity: hoveredIndex === index ? [0.5, 0.8, 0.5] : 0.5
                    }}
                    transition={{ duration: 1, repeat: hoveredIndex === index ? Infinity : 0 }}
                  />
                  <div className="absolute inset-1 bg-gray-900 rounded-full" />
                  <div className={`absolute inset-1.5 rounded-full bg-gradient-to-r ${step.color}`} />
                </div>
              </motion.div>

              {/* Enhanced Content Card */}
              <motion.div 
                className={`w-[calc(100%-4rem)] md:w-5/12 ml-16 md:ml-0 ${
                  isEven ? 'md:pr-12' : 'md:pl-12'
                }`}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`relative p-8 rounded-3xl border transition-all duration-500 backdrop-blur-sm ${
                  hoveredIndex === index 
                    ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-600/50 shadow-2xl shadow-blue-500/20' 
                    : 'bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700/30 hover:border-gray-600/50'
                }`}>
                  {/* Card glow effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${step.color} opacity-0 blur-xl transition-opacity duration-500`}
                    animate={{ opacity: hoveredIndex === index ? 0.1 : 0 }}
                  />
                  
                  {/* Header */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6 relative z-10">
                    <motion.div 
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} p-3 flex-shrink-0 shadow-lg`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <IconComponent className="w-full h-full text-white" />
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r ${step.color} text-white`}>
                          {step.year}
                        </span>
                        {step.achievement && (
                          <motion.div
                            className="flex items-center gap-1 text-xs text-yellow-400 opacity-80"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 0.8, x: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <Trophy className="w-3 h-3" />
                            <span>{step.achievement}</span>
                          </motion.div>
                        )}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 relative z-10">
                    {step.description}
                  </p>

                  {/* Skills with enhanced design */}
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {step.skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r ${step.color} bg-opacity-20 text-white border border-white/10 backdrop-blur-sm`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        custom={idx}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Call to action */}
      <motion.div
        className="text-center mt-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-400/20 to-blue-600/20 border border-blue-500/30 text-blue-300"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Sparkles className="w-4 h-4" />
          <span className="font-medium">The journey continues...</span>
          <Sparkles className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CodingJourneySection;