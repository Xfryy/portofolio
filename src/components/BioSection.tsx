"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

interface BioSectionProps {
  bio: string;
}

export default function BioSection({ bio }: BioSectionProps) {
  return (
    <div className="mb-16">
      <motion.h2 
        className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="h-1 w-8 bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: 32 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        ></motion.div>
        About Me
      </motion.h2>
      
      <motion.div 
        className="relative rounded-xl overflow-hidden backdrop-blur-sm"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--card-border)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 opacity-10 rounded-full blur-3xl"></div>
        
        <div className="p-6 md:p-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-2/3">
              <motion.p 
                className="text-lg leading-relaxed mb-4"
                style={{ color: 'var(--text-primary)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {bio}
              </motion.p>
              
              <motion.div 
                className="grid grid-cols-2 gap-4 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div>
                  <h4 className="text-sm font-semibold mb-1 text-gray-500 dark:text-gray-400">Email</h4>
                  <p className="text-sm">Faricandra5@gmail.com</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1 text-gray-500 dark:text-gray-400">Location</h4>
                  <p className="text-sm">Bekasi, Indonesia</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1 text-gray-500 dark:text-gray-400">Website</h4>
                  <p className="text-sm">https://portofolio-pi-rouge.vercel.app/</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1 text-gray-500 dark:text-gray-400">Freelance</h4>
                  <p className="text-sm">Available</p>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="w-full md:w-1/3 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="relative w-48 h-48 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/Components/Rpl.jpg"
                  alt="Working"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F/PQAJpgOUCLIudAAAAABJRU5ErkJggg=="
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}