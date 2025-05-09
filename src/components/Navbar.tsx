"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const pathname = usePathname();

  // Handle scroll effect with debounce
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let scrollTimer: ReturnType<typeof setTimeout>;
      
      const handleScroll = () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          setIsScrolled(window.scrollY > 10);
        }, 10);
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimer);
      };
    }
  }, []);

  // Time update effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { 
      name: 'Home', 
      path: '/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    },
    { 
      name: 'About', 
      path: '/about',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4"></circle>
          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
        </svg>
      )
    },
    { 
      name: 'Work', 
      path: '/work',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7V5c0-1.1.9-2 2-2h2"></path>
          <path d="M19 7V5c0-1.1-.9-2-2-2h-2"></path>
          <path d="M21 21H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2Z"></path>
          <path d="M16 3v4"></path>
          <path d="M8 3v4"></path>
          <path d="M12 12h0"></path>
          <path d="M12 16h0"></path>
          <path d="M16 12h0"></path>
          <path d="M16 16h0"></path>
          <path d="M8 12h0"></path>
          <path d="M8 16h0"></path>
        </svg>
      )
    },
    { 
      name: 'Blog', 
      path: '/blog',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
          <path d="M8 7h6"></path>
          <path d="M8 11h8"></path>
        </svg>
      )
    },
    { 
      name: 'Gallery', 
      path: '/gallery',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5z"></path>
          <path d="m3 15 6-6c.928-.893 2.072-.893 3 0l5 5"></path>
          <path d="m14 14 1-1c.928-.893 2.072-.893 3 0l3 3"></path>
          <circle cx="13.5" cy="7.5" r="1.5"></circle>
        </svg>
      )
    },
  ];

  return (
    <>
      {/* Location & Time display with glassmorphism effect */}
      <div className="hidden md:flex fixed top-6 w-full justify-between px-6 text-sm text-gray-300 z-40 items-center">
        <div className="flex items-center gap-2 bg-gray-900/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-800/50">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Asia/Jakarta
        </div>
        <div className="bg-gray-900/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-800/50">
          {currentTime}
        </div>
      </div>
      
      <nav className={`fixed w-full top-0 z-40 flex justify-center transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-6'
      }`}>
        <div className={`bg-gray-900/80 backdrop-blur-lg rounded-full border transition-all duration-500 ${
          isScrolled 
            ? 'border-gray-800/50 shadow-lg shadow-blue-900/10 px-3 py-1' 
            : 'border-gray-800/30 px-3 py-1.5'
        }`}>
          <div className="flex items-center h-10">
            {/* Logo area for larger screens */}
            <div className="hidden md:flex items-center mr-2">
              <Link href="/" className="text-blue-400 font-semibold px-3">
                SY
              </Link>
              <div className="h-5 w-px bg-gray-800 mx-1"></div>
            </div>
            
            {/* Mobile menu button with animation */}
            <button 
              onClick={toggleMenu}
              className="md:hidden px-3 py-2 rounded-full text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5 relative">
                <span className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-2' : 'top-1'
                }`}></span>
                <span className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'top-2'
                }`}></span>
                <span className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 top-2' : 'top-3'
                }`}></span>
              </div>
            </button>

            {/* Navigation items with improved hover effects */}
            {navItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path} 
                className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
                  pathname === item.path 
                    ? 'text-blue-400 bg-blue-500/10 font-medium' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/70'
                }`}
              >
                <span className={`md:hidden lg:block ${pathname === item.path ? 'text-blue-400' : ''}`}>{item.icon}</span>
                <span className="hidden md:block">{item.name}</span>
              </Link>
            ))}

            {/* Dark Mode Toggle with animation */}
            <button 
              onClick={toggleDarkMode}
              className="px-3 py-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800/70 transition-all duration-300 ml-1"
              aria-label="Toggle dark mode"
            >
              <div className="w-5 h-5 relative">
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu with improved animations and layout */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 flex flex-col">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
            onClick={toggleMenu}
          ></div>
          
          <div className="relative h-full w-full bg-gradient-to-b from-gray-900 to-[#0A0D11] flex flex-col overflow-auto">
            <div className="flex justify-end p-6">
              <button 
                onClick={toggleMenu}
                className="p-2 rounded-full text-gray-300 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col justify-center items-center h-full -mt-16 px-6">
              {navItems.map((item, index) => (
                <Link 
                  key={item.path}
                  href={item.path} 
                  className={`flex items-center gap-4 text-2xl py-5 border-b border-gray-800/50 w-full transition-all ${
                    pathname === item.path 
                      ? 'text-blue-400 font-medium' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={toggleMenu}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <span className="text-blue-500/80">{item.icon}</span>
                  <span>{item.name}</span>
                  {pathname === item.path && (
                    <span className="ml-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </span>
                  )}
                </Link>
              ))}
              
              <div className="flex gap-8 mt-12">
                <a href="https://github.com" className="text-gray-400 hover:text-white p-2 hover:bg-gray-800/50 rounded-full transition-all" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com" className="text-gray-400 hover:text-white p-2 hover:bg-gray-800/50 rounded-full transition-all" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="mailto:contact@example.com" className="text-gray-400 hover:text-white p-2 hover:bg-gray-800/50 rounded-full transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </a>
              </div>
              
              <div className="absolute bottom-10 text-sm text-gray-500 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <div>Asia/Jakarta — {currentTime}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;