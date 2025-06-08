"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaReact, FaJs, FaHtml5, FaPython, FaPhp, FaNodeJs, FaGitAlt, FaAws } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiExpress, SiMongodb, SiDocker } from 'react-icons/si';

interface SkillBarProps {
  name: string;
  percentage: number;
  color: string;
  delay: number;
  icon: React.ReactNode;
  category: string;
}

const SkillBar = ({ name, percentage, color, delay, icon, category }: SkillBarProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="mb-8 group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Skill Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
            style={{ backgroundColor: color + '20', color: color }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
          <div>
            <span className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              {name}
            </span>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {category}
            </div>
          </div>
        </div>
        <motion.div
          className="flex items-center gap-2"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-2xl font-bold" style={{ color: color }}>
            {percentage}%
          </div>
          <div className="text-xs text-gray-500">
            {percentage >= 80 ? 'Expert' : percentage >= 60 ? 'Advanced' : percentage >= 40 ? 'Intermediate' : 'Learning'}
          </div>
        </motion.div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative">
        {/* Background Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
          {/* Animated Progress Bar */}
          <motion.div 
            className="h-full rounded-full relative overflow-hidden shadow-lg"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ 
                duration: 2, 
                delay: delay + 0.8,
                ease: "easeInOut"
              }}
            />
            
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 opacity-50"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${color}80, transparent)`
              }}
              animate={{ 
                opacity: isHovered ? 0.8 : 0.3,
                boxShadow: isHovered ? `0 0 20px ${color}40` : 'none'
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>

        {/* Skill Level Indicators */}
        <div className="absolute top-0 w-full h-full flex items-center">
          {[25, 50, 75].map((mark, index) => (
            <div
              key={index}
              className="absolute w-0.5 h-6 bg-white/50 rounded-full"
              style={{ left: `${mark}%` }}
            />
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
      <motion.div
        className="mt-3 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ height: 0 }}
        animate={{ height: isHovered ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        Learning since {percentage >= 60 ? '2+ years' : percentage >= 40 ? '1+ year' : '6+ months'}
      </motion.div>
    </motion.div>
  );
};

export default function ProgrammingSkills() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <div className="mb-12 flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const skills = [
    // Frontend Skills
    { 
      name: "JavaScript", 
      percentage: 25, 
      color: "#F7DF1E", 
      icon: <FaJs size={20} />,
      category: "Frontend"
    },
    { 
      name: "TypeScript", 
      percentage: 35, 
      color: "#3178C6", 
      icon: <SiTypescript size={18} />,
      category: "Frontend"
    },
    { 
      name: "React", 
      percentage: 32, 
      color: "#61DAFB", 
      icon: <FaReact size={20} />,
      category: "Frontend"
    },
    { 
      name: "Next.js", 
      percentage: 41, 
      color: "#000000", 
      icon: <SiNextdotjs size={20} />,
      category: "Frontend"
    },
    { 
      name: "HTML/CSS", 
      percentage: 60, 
      color: "#E34F26", 
      icon: <FaHtml5 size={20} />,
      category: "Frontend"
    },
    { 
      name: "Tailwind CSS", 
      percentage: 47, 
      color: "#06B6D4", 
      icon: <SiTailwindcss size={20} />,
      category: "Frontend"
    },
    
    // Backend Skills
    { 
      name: "Node.js", 
      percentage: 37, 
      color: "#68A063", 
      icon: <FaNodeJs size={20} />,
      category: "Backend"
    },
    { 
      name: "Python", 
      percentage: 5, 
      color: "#3776AB", 
      icon: <FaPython size={20} />,
      category: "Backend"
    },
    { 
      name: "ExpressJS", 
      percentage: 34, 
      color: "#000000", 
      icon: <SiExpress size={20} />,
      category: "Backend"
    },
    { 
      name: "MongoDB", 
      percentage: 80, 
      color: "#47A248", 
      icon: <SiMongodb size={20} />,
      category: "Backend"
    },
    { 
      name: "PHP", 
      percentage: 21, 
      color: "#777BB4", 
      icon: <FaPhp size={20} />,
      category: "Backend"
    },
    
    // Tools & DevOps
    { 
      name: "Git", 
      percentage: 90, 
      color: "#F05032", 
      icon: <FaGitAlt size={20} />,
      category: "Tools & DevOps"
    },
    { 
      name: "Docker", 
      percentage: 25, 
      color: "#2496ED", 
      icon: <SiDocker size={20} />,
      category: "Tools & DevOps"
    },
    { 
      name: "AWS", 
      percentage: 35, 
      color: "#FF9900", 
      icon: <FaAws size={20} />,
      category: "Tools & DevOps"
    },
    { 
      name: "CI/CD", 
      percentage: 40, 
      color: "#2088FF", 
      icon: <div className="text-center font-bold text-xs">CI/CD</div>,
      category: "Tools & DevOps"
    }
  ];

  const categories = ['all', 'Frontend', 'Backend', 'Tools & DevOps'];
  
  const filteredSkills = filter === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === filter);

  const averageSkill = Math.round(skills.reduce((acc, skill) => acc + skill.percentage, 0) / skills.length);

  return (
    <div className="mb-16">
      {/* Enhanced Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <motion.div 
              className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Programming Skills
            </h2>
          </div>
          
          {/* Average Skill Display */}
          <motion.div
            className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 rounded-full border border-blue-200/20 dark:border-blue-800/20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Average: <span className="font-bold text-blue-600">{averageSkill}%</span>
            </div>
          </motion.div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
          My technical expertise across different technologies and frameworks
        </p>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.05) }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === 'all' ? 'All Skills' : category}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Skills Container */}
      <motion.div 
        className="rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--card-border)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-blue-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-radial from-purple-400/10 to-transparent rounded-full blur-3xl" />
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          <AnimatePresence mode="wait">
            {filteredSkills.map((skill, index) => (
              <SkillBar 
                key={skill.name}
                name={skill.name}
                percentage={skill.percentage}
                color={skill.color}
                delay={0.3 + (index * 0.1)}
                icon={skill.icon}
                category={skill.category}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Skills Summary */}
        <motion.div
          className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-200/20 dark:border-blue-800/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: "Total Skills", value: skills.length },
              { label: "Advanced", value: skills.filter(s => s.percentage >= 40).length },
              { label: "Learning", value: skills.filter(s => s.percentage < 40).length },
              { label: "Years Experience", value: "2+" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col gap-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + (index * 0.1) }}
              >
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}