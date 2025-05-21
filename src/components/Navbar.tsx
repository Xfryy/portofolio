"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

// Move nav items outside component to avoid re-creation on every render
const NAV_ITEMS = [
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
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}
,
  { 
    name: 'Contact', 
    path: '/contact',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    )
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true); // State for theme
  const pathname = usePathname();
  const { data: session, status } = useSession();
  
  // Improved scroll handler using requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
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

  // Check initial theme on mount
  useEffect(() => {
    // Check if we're on the client-side
    if (typeof window !== 'undefined') {
      // Check if user has previously set a theme preference
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'light') {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        setIsDarkMode(true);
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [mobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle theme toggle with localStorage persistence
  const toggleTheme = useCallback(() => {
    const newThemeState = !isDarkMode;
    setIsDarkMode(newThemeState);
    document.documentElement.setAttribute('data-theme', newThemeState ? 'dark' : 'light');
    localStorage.setItem('theme', newThemeState ? 'dark' : 'light');
  }, [isDarkMode]);

  // Dynamic styles based on theme
  const locationBgClass = isDarkMode ? 'bg-gray-900/40' : 'bg-white/60';
  const locationBorderClass = isDarkMode ? 'border-gray-800/50' : 'border-gray-300/50';
  const navbarBgClass = isDarkMode ? 'bg-gray-900/80' : 'bg-white/80';
  const navbarBorderClass = isDarkMode 
    ? (scrolled ? 'border-gray-800/50' : 'border-gray-800/30') 
    : (scrolled ? 'border-gray-300/70' : 'border-gray-300/50');
  const menuBgClass = isDarkMode ? 'bg-gray-700' : 'bg-gray-200';
  const menuTextClass = isDarkMode ? 'text-white' : 'text-gray-800';
  const activeLinkBgClass = isDarkMode ? 'bg-blue-500/10' : 'bg-blue-500/20';
  const activeLinkTextClass = 'text-blue-600';
  const inactiveLinkTextClass = isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900';
  const inactiveLinkHoverBgClass = isDarkMode ? 'hover:bg-gray-800/70' : 'hover:bg-gray-200/70';
  const mobileMenuBgClass = isDarkMode 
    ? 'bg-gradient-to-b from-gray-900 to-[#0A0D11]' 
    : 'bg-gradient-to-b from-gray-100 to-white';
  const mobileBorderClass = isDarkMode ? 'border-gray-800/50' : 'border-gray-300/50';
  
  return (
    <>
      {/* Location & Time display with glassmorphism effect */}
      <motion.div 
        className="hidden md:flex fixed top-6 w-full justify-between px-6 text-sm z-40 items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className={`flex items-center gap-2 ${locationBgClass} backdrop-blur-md px-3 py-1.5 rounded-full border ${locationBorderClass}`}>
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Asia/Jakarta</span>
        </div>
        <div className={`${locationBgClass} backdrop-blur-md px-3 py-1.5 rounded-full border ${locationBorderClass} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {currentTime}
        </div>
      </motion.div>
      
      <nav className={`fixed w-full top-0 z-50 flex justify-center transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-6'
      }`}>
        <motion.div 
          className={`${navbarBgClass} backdrop-blur-lg rounded-full border transition-all duration-500 ${
            scrolled 
              ? `${navbarBorderClass} shadow-lg ${isDarkMode ? 'shadow-blue-900/10' : 'shadow-blue-200/30'} px-3 py-1` 
              : `${navbarBorderClass} px-3 py-1.5`
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center h-10">
            {/* Logo area for larger screens */}
            <div className="hidden md:flex items-center mr-2">
              <Link href="/" className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} font-semibold px-3 flex items-center gap-2`}>
                <motion.div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image 
                    src="/Components/f.png" 
                    alt="Logo" 
                    width={32} 
                    height={32} 
                    className="rounded-full"
                  />
                </motion.div>
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Faatih</span>
              </Link>
              <div className={`h-5 w-px ${isDarkMode ? 'bg-gray-800' : 'bg-gray-300'} mx-1`}></div>
            </div>
            
            {/* Mobile menu button with animation */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden px-3 py-2 rounded-full ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5 relative">
                <span className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 top-2' : 'top-1'
                }`}></span>
                <span className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : 'top-2'
                }`}></span>
                <span className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 top-2' : 'top-3'
                }`}></span>
              </div>
            </button>

            {/* Navigation items */}
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.path}
                href={item.path} 
                className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
                  pathname === item.path 
                    ? `${activeLinkTextClass} ${activeLinkBgClass} font-medium` 
                    : `${inactiveLinkTextClass} ${inactiveLinkHoverBgClass}`
                }`}
              >
                <span className={`md:hidden lg:block ${pathname === item.path ? activeLinkTextClass : ''}`}>{item.icon}</span>
                <span className="hidden md:block">{item.name}</span>
              </Link>
            ))}

            {/* Auth buttons and user profile */}
            <div className="hidden md:flex items-center gap-2 ml-2">
              {status === 'authenticated' && session?.user ? (
                <div className="flex items-center gap-2">
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <button
                    onClick={() => signOut()}
                    className={`px-4 py-1.5 ${menuBgClass} ${menuTextClass} rounded-full transition-colors hover:bg-red-500/20`}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className={`px-4 py-1.5 ${menuBgClass} ${menuTextClass} rounded-full transition-colors hover:bg-blue-500/20`}
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Light/Dark Mode Toggle Button */}
            <motion.button
              className={`hidden md:flex px-4 py-1.5 ${menuBgClass} ${menuTextClass} rounded-full transition-colors duration-300 items-center gap-2 ml-2`}
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <path d="M12 1v2"></path>
                    <path d="M12 21v2"></path>
                    <path d="M4.22 4.22l1.42 1.42"></path>
                    <path d="M18.36 18.36l1.42 1.42"></path>
                    <path d="M1 12h2"></path>
                    <path d="M21 12h2"></path>
                    <path d="M4.22 19.78l1.42-1.42"></path>
                    <path d="M18.36 5.64l1.42-1.42"></path>
                  </svg>
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 A7 7 0 0 0 21 12.79z"></path>
                  </svg>
                  <span>Dark Mode</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </nav>

      {/* Mobile menu with enhanced animations */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex flex-col">
          <motion.div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileMenuOpen(false)}
          ></motion.div>
          
          <motion.div 
            className={`relative h-full w-full ${mobileMenuBgClass} flex flex-col overflow-hidden`}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
          >
            <div className="flex flex-col justify-center items-center h-full -mt-16 px-6">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                >
                  <Link 
                    href={item.path} 
                    className={`flex items-center gap-4 text-2xl py-5 border-b ${mobileBorderClass} w-full transition-all transform hover:translate-x-2 ${
                      pathname === item.path 
                        ? `${activeLinkTextClass} font-medium` 
                        : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <motion.span 
                      className={isDarkMode ? 'text-blue-500/80' : 'text-blue-600/80'}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span>{item.name}</span>
                    {pathname === item.path && (
                      <motion.span 
                        className="ml-auto"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </motion.span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Add auth buttons to mobile menu */}
            {status === 'authenticated' && session?.user ? (
              <motion.div 
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                    {session.user.name}
                  </span>
                </div>
                <motion.button
                  className={`w-full p-3 rounded-full bg-red-500/20 text-red-500 transition-colors`}
                  onClick={() => signOut()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign Out
                </motion.button>
              </motion.div>
            ) : (
              <motion.div 
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/auth/signin"
                  className={`block w-full p-3 rounded-full ${menuBgClass} ${menuTextClass} text-center transition-colors hover:bg-blue-500/20`}
                >
                  Sign In
                </Link>
              </motion.div>
            )}

            {/* Theme toggle with enhanced animation */}
            <motion.div 
              className="p-6 mt-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                className={`w-full p-3 rounded-full ${menuBgClass} ${menuTextClass} transition-colors flex items-center justify-center gap-2`}
                onClick={toggleTheme}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isDarkMode ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {isDarkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                </motion.span>
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </>
  );
}