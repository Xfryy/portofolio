"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Code2, Database, Cloud, Zap, Star, TrendingUp } from 'lucide-react';

interface SkillCategory {
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
  skills: {
    name: string;
    proficiency: number;
    isHighlight?: boolean;
  }[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    description: "Crafting beautiful, responsive user interfaces with modern frameworks",
    image: "/Components/Frontend.jpg",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React", proficiency: 32, isHighlight: true },
      { name: "Next.js", proficiency: 41, isHighlight: true },
      { name: "TypeScript", proficiency: 35 },
      { name: "Tailwind CSS", proficiency: 47, isHighlight: true },
    ],
  },
  {
    title: "Backend Development",
    description: "Building robust server-side applications and APIs",
    image: "/Components/Backend.jpg",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", proficiency: 37, isHighlight: true },
      { name: "Python", proficiency: 5 },
      { name: "ExpressJS", proficiency: 34 },
      { name: "MongoDB", proficiency: 80, isHighlight: true },
    ],
  },
  {
    title: "DevOps & Cloud",
    description: "Streamlining development workflows and cloud deployment",
    image: "/Components/DevOps.jpg",
    icon: Cloud,
    color: "from-blue-400 to-blue-600",
    skills: [
      { name: "Git", proficiency: 90, isHighlight: true },
      { name: "Docker", proficiency: 25 },
      { name: "AWS", proficiency: 35 },
      { name: "CI/CD", proficiency: 40 },
    ],
  },
];

// Pre-defined particle positions to avoid hydration mismatch
const particlePositions = [
  { left: 15, top: 20 },
  { left: 85, top: 15 },
  { left: 45, top: 80 },
  { left: 75, top: 40 },
  { left: 25, top: 60 },
  { left: 90, top: 75 },
  { left: 10, top: 45 },
  { left: 60, top: 25 },
  { left: 35, top: 90 },
  { left: 80, top: 65 },
  { left: 55, top: 10 },
  { left: 20, top: 85 },
];

export default function TechnicalSkills() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      
      {/* Floating Particles - Only render after hydration */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particlePositions.map((position, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
              style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 relative z-10"
      >
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-400/10 to-blue-600/10 border border-blue-500/20"
          >
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm uppercase tracking-wider text-blue-400 font-medium">Technical Expertise</span>
            <Star className="w-4 h-4 text-blue-400" />
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Technical Skills
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Proficient in modern web technologies and development practices
            <br />
            <span className="text-lg text-gray-500">Building scalable and maintainable solutions</span>
          </motion.p>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 p-2 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.button
                  key={category.title}
                  onClick={() => setSelectedCategory(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    selectedCategory === index 
                      ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">{category.title.split(' ')[0]}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Enhanced Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: selectedCategory === index ? 1 : 0.6, 
                  y: 0,
                  scale: selectedCategory === index ? 1.05 : 1
                }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  selectedCategory === index ? 'z-10' : 'z-0'
                }`}
                onHoverStart={() => setHoveredCategory(index)}
                onHoverEnd={() => setHoveredCategory(null)}
                onClick={() => setSelectedCategory(index)}
              >
                <div className={`relative p-8 rounded-3xl border transition-all duration-500 backdrop-blur-sm ${
                  selectedCategory === index || hoveredCategory === index
                    ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-600/50 shadow-2xl shadow-blue-500/20'
                    : 'bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700/30'
                }`}>
                  
                  {/* Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${category.color} opacity-0 blur-xl transition-opacity duration-500`}
                    animate={{ 
                      opacity: selectedCategory === index || hoveredCategory === index ? 0.15 : 0 
                    }}
                  />

                  {/* Header with Icon */}
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} p-4 shadow-lg`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <IconComponent className="w-full h-full text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {category.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <TrendingUp className="w-3 h-3" />
                        <span>Active Development</span>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="mb-6 aspect-video relative rounded-xl overflow-hidden bg-gray-900 shadow-inner">
                    <motion.div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700"
                      style={{ backgroundImage: `url(${category.image})` }}
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                  
                  <p className="text-sm mb-8 text-gray-300 leading-relaxed relative z-10">
                    {category.description}
                  </p>

                  {/* Enhanced Skills List */}
                  <div className="space-y-6 relative z-10">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div 
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: skillIndex * 0.1 + 0.3 }}
                      >
                        <div className="flex justify-between items-center text-sm mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{skill.name}</span>
                            {skill.isHighlight && (
                              <motion.div
                                className="w-2 h-2 rounded-full bg-yellow-400"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                          </div>
                          <span className="text-gray-400 font-mono">{skill.proficiency}%</span>
                        </div>
                        
                        <div className="relative h-2 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.proficiency}%` }}
                            transition={{ duration: 1.5, delay: skillIndex * 0.2 + 0.5, ease: "easeOut" }}
                            className={`h-full rounded-full bg-gradient-to-r ${category.color} shadow-lg relative overflow-hidden`}
                          >
                            {/* Shimmer effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                              animate={{ x: [-100, 200] }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                repeatDelay: 3,
                                ease: "easeInOut" 
                              }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Skill Level Indicator */}
                  <motion.div
                    className="absolute top-4 right-4 opacity-20"
                    animate={{ 
                      opacity: selectedCategory === index ? 0.4 : 0.2,
                      rotate: selectedCategory === index ? 15 : 0
                    }}
                  >
                    <Star className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: "Years of Experience", value: "5+", icon: Star },
              { label: "Projects Completed", value: "50+", icon: Code2 },
              { label: "Technologies Mastered", value: "15+", icon: Database },
              { label: "Happy Clients", value: "30+", icon: TrendingUp },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/30 border border-gray-700/30 backdrop-blur-sm">
                    <motion.div
                      className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 p-3"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <IconComponent className="w-full h-full text-white" />
                    </motion.div>
                    <motion.div
                      className="text-3xl font-bold text-white mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                    >
                      {stat.value}
                    </motion.div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}