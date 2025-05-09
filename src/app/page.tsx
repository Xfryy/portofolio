import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-[85vh] flex flex-col justify-center relative">
      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl relative">
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-500/20 text-blue-400 text-sm">
          Web Developer
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Building bridges between design and code
        </h1>
        
        <div className="text-xl text-gray-400 mb-12 max-w-2xl">
          <p>Im a web developer with a passion for creating visually stunning and highly functional websites.</p>
        </div>

        {/* Updated: Buttons + Profile combined */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-16">
          {/* Left: Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-center">
            <Link 
              href="/work"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300 group w-fit"
            >
              <span>View my work</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            
            <Link 
              href="/about"
              className="px-4 py-2 bg-transparent border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg flex items-center gap-2 transition-all duration-300 group"
            >
              <span>About Faatih</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>

          {/* Right: Profile */}
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700">
              <Image 
                src="/Components/Profile.jpg"
                alt="Muhammad Faatih"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-100">Muhammad Faatih</h3>
              <p className="text-sm text-gray-400">Web Developer | Junior</p>
            </div>
          </div>
        </div>

        {/* Project Section */}
        <div className="border-t border-gray-800 pt-8">
          <h2 className="flex items-center gap-4 text-xl mb-6">
            Featured project
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 bg-gray-900/40 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src="/project-thumbnail.jpg" 
                  alt="Next.js Project"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Next.js</h3>
                <p className="text-gray-400 mb-4">A modern, server-rendered React framework for building full-stack web applications</p>
                <Link 
                  href="/work/nextjs"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 group-hover:underline transition-all"
                >
                  <span>View case study</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
            
            <div className="col-span-1 space-y-4">
              <div className="flex gap-3 items-center">
                <div className="h-1 w-1 rounded-full bg-blue-500"></div>
                <div className="text-sm text-gray-400">Role</div>
              </div>
              <div className="text-base">Junior Web Developer</div>
              
              <div className="flex gap-3 items-center mt-6">
                <div className="h-1 w-1 rounded-full bg-blue-500"></div>
                <div className="text-sm text-gray-400">Technologies</div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-900/20 text-blue-400 rounded-full text-xs">Next.js</span>
                <span className="px-3 py-1 bg-blue-900/20 text-blue-400 rounded-full text-xs">React</span>
                <span className="px-3 py-1 bg-blue-900/20 text-blue-400 rounded-full text-xs">TypeScript</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
