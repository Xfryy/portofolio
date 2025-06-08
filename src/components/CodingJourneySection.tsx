"use client";

import { motion } from 'framer-motion';
import { Code, GitBranch, Terminal, Database, Layout, Braces } from 'lucide-react';

interface JourneyStep {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
  skills: string[];
}

const CodingJourneySection = () => {
  const journeySteps: JourneyStep[] = [
    {
      year: '2020',
      title: 'HTML & CSS Fundamentals',
      description: 'Started my coding journey with web fundamentals, learning HTML5 and CSS3. Created static websites and focused on responsive design.',
      icon: Layout,
      skills: ['HTML5', 'CSS3', 'Responsive Design', 'Bootstrap']
    },
    {
      year: '2021',
      title: 'JavaScript & Frontend',
      description: 'Dove into JavaScript and modern frontend development. Learned DOM manipulation and basic frontend frameworks.',
      icon: Braces,
      skills: ['JavaScript', 'ES6+', 'DOM', 'jQuery']
    },
    {
      year: '2022',
      title: 'React Development',
      description: 'Mastered React.js and its ecosystem. Built interactive web applications with modern tooling.',
      icon: Code,
      skills: ['React.js', 'Redux', 'Hooks', 'TypeScript']
    },
    {
      year: '2023',
      title: 'Full Stack Journey',
      description: 'Expanded into backend development and database management. Learned Node.js and MongoDB.',
      icon: Database,
      skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs']
    },
    {
      year: '2024',
      title: 'Next.js Mastery',
      description: 'Advanced to Next.js for full-stack applications. Focused on server-side rendering and API routes.',
      icon: Terminal,
      skills: ['Next.js', 'SSR', 'API Routes', 'Prisma']
    },
    {
      year: '2025',
      title: 'DevOps & Deployment',
      description: 'Learning DevOps practices and cloud deployment. Working with CI/CD pipelines and cloud services.',
      icon: GitBranch,
      skills: ['Docker', 'AWS', 'CI/CD', 'Vercel']
    }
  ];

  return (
    <div className="mt-24 mb-24">
      {/* Section Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm uppercase tracking-wider text-secondary mb-4">MY JOURNEY</p>
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Coding Journey
        </h2>
        <p className="text-lg text-secondary max-w-2xl mx-auto">
          From writing my first HTML tag to building full-stack applications
        </p>
      </motion.div>      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />

        {/* Journey Steps */}
        {journeySteps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <motion.div
              key={step.year}
              className={`relative flex items-start mb-12 ${
                index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
              } ${
                index % 2 === 0 && 'justify-start'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline Point */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
              </div>

              {/* Content Card */}
              <div 
                className={`w-[calc(100%-3rem)] md:w-5/12 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}
              >
                <div className="bg-card p-4 md:p-6 rounded-2xl border border-themed hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-2 flex-shrink-0">
                      <IconComponent className="w-full h-full text-white" />
                    </div>
                    <div>
                      <span className="text-sm text-blue-400 block md:inline">{step.year}</span>
                      <h3 className="text-lg font-bold text-primary">{step.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-secondary text-sm mb-4">
                    {step.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {step.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CodingJourneySection;
