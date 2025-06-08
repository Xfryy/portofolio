import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaLaptop, FaMouse, FaMemory, FaHdd } from 'react-icons/fa';
import { HiChip } from 'react-icons/hi';

interface WorkspaceItem {
  title: string;
  description: string;
  specs?: string;
  image: string;
  icon: React.ReactNode;
  highlights: string[];
}

const workspaceItems: WorkspaceItem[] = [
  {
    title: 'Asus TUF Gaming F15',
    description: 'The best laptop for my daily coding adventures',
    specs: '24GB RAM, 512GB SSD, i5 Gen 11H',
    image: '/workspace/image.png',
    icon: <FaLaptop size={24} />,
    highlights: ['High Performance', 'Gaming Ready', 'Developer Friendly']
  },
  {
    title: 'Tetriz Air 300C',
    description: 'Precision tools for creative workflows',
    specs: 'Wireless, Ergonomic, Ultra-responsive',
    image: '/workspace/Tool.png',
    icon: <FaMouse size={24} />,
    highlights: ['Wireless Freedom', 'Ergonomic Design', 'High Precision']
  }
];

const Workspace = () => {
  return (
    <motion.section 
      className="w-full p-8 rounded-2xl backdrop-blur-sm mb-8 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/10 to-blue-600/10" />
        <div              className="absolute top-4 right-4 w-32 h-32 bg-gradient-radial from-blue-400/20 to-transparent rounded-full blur-xl" />
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-xl" />
      </div>

      {/* Header Section */}
      <motion.div
        className="relative z-10 mb-8"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div 
            className="h-1 w-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
            My Workspace
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          The tools and equipment that power my creative process
        </p>
      </motion.div>
      
      {/* Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {workspaceItems.map((item, index) => (
          <motion.div
            key={index}
            className="group relative p-6 rounded-2xl transition-all duration-500 hover:shadow-2xl overflow-hidden"
            style={{
              backgroundColor: 'var(--card-bg-secondary)',
              borderColor: 'var(--card-border)',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 + (index * 0.2) }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            {/* Card Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Icon Badge */}
            <motion.div 
              className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {item.icon}
            </motion.div>

            {/* Image Container */}
            <div className="relative h-56 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="space-y-4">
              <motion.h3 
                className="text-2xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (index * 0.1) }}
              >
                {item.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-400 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + (index * 0.1) }}
              >
                {item.description}
              </motion.p>
              
              {/* Specs with Icons */}
              {item.specs && (
                <motion.div 
                  className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg p-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + (index * 0.1) }}
                >                                  <HiChip className="text-blue-500" />
                                  <span className="font-medium">{item.specs}</span>
                </motion.div>
              )}

              {/* Highlights */}
              <motion.div 
                className="flex flex-wrap gap-2 mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + (index * 0.1) }}
              >
                {item.highlights.map((highlight, highlightIndex) => (
                  <motion.span
                    key={highlightIndex}
                    className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-400/10 to-blue-600/10 text-blue-600 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-800"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.9 + (index * 0.1) + (highlightIndex * 0.05),
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {highlight}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Hover Effect Lines */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 1 + (index * 0.2), duration: 0.8 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom Stats Section */}
      <motion.div
        className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-400/10 to-blue-600/10 border border-blue-200/20 dark:border-blue-800/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { icon: <FaMemory />, label: "RAM", value: "24GB" },
            { icon: <FaHdd />, label: "Storage", value: "512GB SSD" },
            { icon: <HiChip />, label: "Processor", value: "i5 Gen 11H" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + (index * 0.1) }}
            >
              <div className="text-blue-500 text-xl">{stat.icon}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
              <div className="font-bold text-gray-900 dark:text-white">{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Workspace;