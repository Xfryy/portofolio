"use client";

import Image from 'next/image';


interface GalleryImageProps {
  src: string;
  alt: string;
  description: string;
  onClick: () => void;
  index: number;
}

export default function GalleryImage({ src, alt, description, onClick }: GalleryImageProps) {
  return (
    <div
      className="relative aspect-square cursor-zoom-in group rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        loading="eager"
        unoptimized
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
      >
        <div>
          <h3 className="text-white font-medium mb-1">{alt}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}