"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { 
  Code, 
  Palette, 
  Smartphone, 
  Cloud, 
  Database, 
  Shield,
  Terminal,
  Search,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  details: string[];
  color: string;
}

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      id: 'web-dev',
      title: 'Web Development',
      description: 'Building modern, responsive web applications with cutting-edge technologies and best practices. Specializing in React, Next.js, and TypeScript.',
      icon: Code,
      details: [
        'React & Next.js Applications',
        'TypeScript Integration',
        'Server-Side Rendering',
        'Progressive Web Apps',
        'API Development'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      description: 'Creating beautiful and intuitive user interfaces that delight users. Focus on accessibility, usability, and modern design principles.',
      icon: Palette,
      details: [
        'User Interface Design',
        'User Experience Research',
        'Prototyping & Wireframing',
        'Design Systems',
        'Accessibility Compliance'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'mobile-dev',
      title: 'Mobile Development',
      description: 'Creating native and cross-platform mobile applications using React Native and Flutter. Expertise in iOS and Android development.',
      icon: Smartphone,
      details: [
        'React Native Apps',
        'Flutter Development',
        'iOS & Android Native',
        'Cross-Platform Solutions',
        'App Store Optimization'
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'cloud-services',
      title: 'Cloud Services',
      description: 'Deploying and managing scalable cloud infrastructure using AWS, Azure, and GCP. Expertise in serverless architecture and DevOps.',
      icon: Cloud,
      details: [
        'AWS & Azure Deployment',
        'Serverless Architecture',
        'CI/CD Pipelines',
        'Container Orchestration',
        'Performance Monitoring'
      ],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'api-dev',
      title: 'API Development',
      description: 'Building robust and scalable APIs using GraphQL, REST, and gRPC. Focus on performance, security, and developer experience.',
      icon: Database,
      details: [
        'RESTful APIs',
        'GraphQL Integration',
        'Database Design',
        'API Security',
        'Documentation'
      ],
      color: 'from-teal-500 to-blue-500'
    },
    {
      id: 'tech-consulting',
      title: 'Tech Consulting',
      description: 'Strategic technology consulting and architecture design. Helping businesses make informed decisions about their tech stack.',
      icon: Shield,
      details: [
        'Technology Strategy',
        'Architecture Design',
        'Code Reviews',
        'Performance Audits',
        'Team Mentoring'
      ],
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const commandInterface = {
    title: 'Interface Service',
    commands: [
      { name: 'Deploy Project', status: 'completed' },
      { name: 'Create Branch', status: 'completed' },
      { name: 'Run Tests', status: 'completed' },
      { name: 'Open Terminal', status: 'active' }
    ]
  };

  const performanceMetric = {
    percentage: 85,
    label: 'Core Web Vitals Performance'
  };

  return (
    <div className="mt-24 mb-24">
      {/* Section Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm uppercase tracking-wider text-secondary mb-4">SERVICES</p>
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          What I Do Best
        </h2>
        <p className="text-lg text-secondary max-w-2xl mx-auto">
          Specialized services tailored to bring your digital vision to life
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={service.id}
              className="group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/50 cursor-pointer"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedService(service)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative p-6">
                {/* Icon */}
                <div className="mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} p-2.5 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Row - Special Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Command Interface Card */}
        <motion.div
          className="md:col-span-1 rounded-2xl border overflow-hidden"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-bold text-primary">{commandInterface.title}</h3>
            </div>
            
            {/* Command Interface */}
            <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                {commandInterface.commands.map((cmd, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-blue-400">$</span>
                    <span className="text-green-400">{cmd.name}</span>
                    {cmd.status === 'completed' && (
                      <CheckCircle className="w-3 h-3 text-green-400" />
                    )}
                    {cmd.status === 'active' && (
                      <div className="w-2 h-4 bg-blue-400 animate-pulse" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search commands..."
                className="w-full pl-10 pr-4 py-2 bg-black/30 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
        </motion.div>

        {/* Performance Card */}
        <motion.div
          className="md:col-span-1 rounded-2xl border overflow-hidden"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="p-6 text-center">
            <h3 className="text-lg font-bold text-primary mb-6">Performance</h3>
            
            {/* Circular Progress */}
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-gray-700"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - performanceMetric.percentage / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">{performanceMetric.percentage}%</span>
              </div>
            </div>
            
            <p className="text-sm text-secondary">{performanceMetric.label}</p>
          </div>
        </motion.div>

        {/* Additional Info Card */}
        <motion.div
          className="md:col-span-1 rounded-2xl border overflow-hidden"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div className="p-6">
            <h3 className="text-lg font-bold text-primary mb-4">Ready to Start?</h3>
            <p className="text-secondary text-sm mb-6">
              Let&apos;s discuss your project and bring your ideas to life with cutting-edge technology.
            </p>
            <motion.button
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedService(null)}
        >
          <motion.div
            className="bg-card rounded-2xl border border-themed max-w-lg w-full p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedService.color} p-2.5`}>
                <selectedService.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary">{selectedService.title}</h3>
            </div>
            
            <p className="text-secondary mb-6">{selectedService.description}</p>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-primary mb-3">Services Include:</h4>
              {selectedService.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-secondary text-sm">{detail}</span>
                </div>
              ))}
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                onClick={() => setSelectedService(null)}
              >
                Get Quote
              </button>
              <button
                className="px-4 py-2 border border-themed text-secondary rounded-lg hover:bg-card transition-colors"
                onClick={() => setSelectedService(null)}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ServicesSection;
    