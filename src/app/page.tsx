import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="py-20"> {/* Sama seperti About */}
      <div className="max-w-4xl mx-auto px-4"> {/* Container yang sama dengan About */}
        
        {/* Header Section - dibuat mirip struktur About */}
        <div className="flex flex-col gap-8 mb-12 relative">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Building bridges between design and code
            </h1>
            
            <div className="text-xl text-gray-400 mb-6">
              <p>Im a web developer with a passion for creating visually stunning and highly functional websites.</p>
            </div>
          </div>

          {/* Buttons + Profile */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/work"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300 group w-fit"
              >
                <span>View my work</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
              
              <Link 
                href="/about"
                className="px-6 py-3 bg-transparent border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg flex items-center gap-2 transition-all duration-300 group w-fit"
              >
                <span>About Faatih</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>

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
        </div>

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