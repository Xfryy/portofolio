import Image from 'next/image';

export default function Gallery() {
  const images = [
    { src: "/placeholder1.jpg", alt: "Project 1" },
    { src: "/placeholder2.jpg", alt: "Project 2" },
    { src: "/placeholder3.jpg", alt: "Project 3" },
  ];

  return (
    <div className="py-20">
      <h1 className="text-4xl font-bold mb-12">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
