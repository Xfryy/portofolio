"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

interface GalleryModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function GalleryModal({ src, alt, onClose }: GalleryModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/90 dark:bg-black/95 z-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center backdrop-blur-sm cursor-zoom-out"
    >
      <motion.div
        layoutId={src}
        className="relative w-full h-full flex items-center justify-center"
      >
        <motion.div
          className="relative w-full max-w-6xl max-h-[90vh]"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <Image
            src={src}
            alt={alt}
            width={1920}
            height={1080}
            className="object-contain w-full h-full"
            priority
            unoptimized
            loading="eager"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors z-10"
            aria-label="Close image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}