import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12 relative">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500/20">
            <Image 
              src="/Components/Profile.jpg" // Using dummy profile pic
              alt="Selene Yu"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              M. Faatih
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <p className="text-xl text-blue-400">Web Developer</p>
              
              <div className="flex items-center gap-2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Asia/Jakarta</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mb-12 p-6 bg-gray-900/30 rounded-xl border border-gray-800">
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            My Name is Muhammad Faatih i lived in Bekasi-based design engineer with a passion for transforming
            complex challenges into simple, elegant design solutions. Her work spans
            digital interfaces, interactive experiences, and the convergence of design and
            technology.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300 group">
              <span>Schedule a call</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
            
            <div className="flex gap-4 items-center">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="mailto:contact@example.com" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <div className="h-1 w-8 bg-blue-500"></div>
            Skills & Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-900/20 rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300">
              <div className="text-blue-400 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                  <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                  <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Design</h3>
              <div className="text-gray-400">
                <p>UI/UX Design, Visual Design, Prototyping, User Research, Design Systems</p>
              </div>
            </div>
            
            <div className="p-6 bg-gray-900/20 rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300">
              <div className="text-blue-400 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="22"></line>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Development</h3>
              <div className="text-gray-400">
                <p>React, TypeScript, Next.js, Tailwind CSS, Framer Motion, Three.js</p>
              </div>
            </div>
            
            <div className="p-6 bg-gray-900/20 rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300">
              <div className="text-blue-400 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <polyline points="11 3 11 11 14 8 17 11 17 3"></polyline>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Tools</h3>
              <div className="text-gray-400">
                <p>Figma, Adobe Suite, VS Code, Git, Vercel, Notion, Framer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}