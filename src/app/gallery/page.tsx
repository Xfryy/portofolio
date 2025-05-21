"use client";

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import PageTransition from '@/components/PageTransition';
import GalleryImage from '@/components/GalleryImage';
import GalleryModal from '@/components/GalleryModal';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const images = [
    { 
      src: "/Gallery/ClassMeet.jpg", 
      alt: "Team Project - Class Meet School", 
      category: 'team',
      description: "Working with the Osister team on Class Meet School project"
    },    { 
      src: "/Gallery/Faatih.jpg", 
      alt: "With Faatih and Bayu", 
      category: 'events',
      description: "Photo with Faatih and Bayu"
    },

    // Add more images with their categories
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'team', name: 'Team' },
    { id: 'projects', name: 'Projects' },
    { id: 'events', name: 'Events' }
  ];

  const filteredImages = images.filter(img => 
    activeCategory === 'all' || img.category === activeCategory
  );

  return (
    <PageTransition>
      <AnimatedBackground />
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Gallery
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A collection of moments from our team projects, events, and creative endeavors.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm sm:text-base transition-colors ${
                  activeCategory === cat.id 
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredImages.map((image, index) => (
              <GalleryImage
                key={image.src}
                src={image.src}
                alt={image.alt}
                description={image.description}
                onClick={() => setSelectedImage({ src: image.src, alt: image.alt })}
                index={index}
              />
            ))}
          </div>

          {/* No results message */}
          {filteredImages.length === 0 && (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              No images found in this category.
            </div>
          )}

          {/* Image Modal */}
          <AnimatePresence>
            {selectedImage && (
              <GalleryModal
                src={selectedImage.src}
                alt={selectedImage.alt}
                onClose={() => setSelectedImage(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}