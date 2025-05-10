import Image from 'next/image';
import Link from 'next/link';

export default function Work() {
  const projects = [
    {
      id: 'once-ui',
      title: 'Once UI',
      description: 'A modern React component library built with Tailwind CSS',
      image: '/projects/once-ui.jpg',
      category: 'Design System',
      year: '2023',
      tags: ['React', 'TypeScript', 'Tailwind CSS'],
      featured: true
    },
    {
      id: 'travel-app',
      title: 'Wanderlust',
      description: 'Travel discovery app with personalized recommendations',
      image: '/projects/travel-app.jpg',
      category: 'Mobile App',
      year: '2022',
      tags: ['React Native', 'Firebase', 'Maps API'],
      featured: true
    },
    {
      id: 'food-delivery',
      title: 'FoodFast',
      description: "Food delivery platform with real-time order tracking",
      image: '/projects/project-food.jpg',
      category: 'Web Platform',
      year: '2022',
      tags: ['Next.js', 'Node.js', 'MongoDB'],
      featured: false
    },
    {
      id: 'fitness-tracker',
      title: 'FitPal',
      description: 'Fitness tracking app with personalized workout plans',
      image: '/projects/project-fitness.jpg',
      category: 'Mobile App',
      year: '2021',
      tags: ['Flutter', 'Firebase', 'HealthKit'],
      featured: false
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          
          <h1 className="text-5xl font-bold mb-6 text-primary">
            Selected Work
          </h1>
          <p className="text-xl text-secondary max-w-2xl">
            A collection of projects I`ve worked on as a design engineer, focused on creating beautiful and functional digital experiences.
          </p>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link 
              href={`/work/${project.id}`}
              key={project.id}
              className="group relative overflow-hidden rounded-xl bg-card border border-themed hover:border-gray-400 dark:hover:border-gray-700 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-52 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"></div>
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {project.featured && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-blue-500 text-white text-xs rounded-full z-20">
                    Featured
                  </div>
                )}
              </div>
              
              {/* Project Info */}
              <div className="p-6 relative">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-blue-500"></div>
                    <p className="text-sm text-blue-400">{project.category}</p>
                  </div>
                  <p className="text-sm text-secondary">{project.year}</p>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-primary group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-secondary mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-card text-secondary rounded-full text-xs border border-themed"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-blue-400 flex items-center gap-1">
                    View details
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Contact Section */}
        <div className="mt-20 p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-900/30 text-center">
          <h2 className="text-2xl font-bold mb-4 text-primary">Interested in working together?</h2>
          <p className="text-secondary mb-6 max-w-lg mx-auto">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <Link
            href="/contact"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-flex items-center gap-2 transition-all duration-300 group"
          >
            <span>Get in touch</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}