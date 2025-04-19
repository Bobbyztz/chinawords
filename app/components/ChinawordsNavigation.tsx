'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavLink {
  label: string;
  href: string;
}

interface ChinawordsNavigationProps {
  logo?: string;
  logoAlt?: string;
  links: NavLink[];
}

const ChinawordsNavigation: React.FC<ChinawordsNavigationProps> = ({
  logo = '/logo.png',
  logoAlt = 'Chinawords',
  links
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for transparent to solid background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`nav-chinawords fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 shadow-md' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 h-10">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src={logo}
              alt={logoAlt}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="flex items-center h-10">
            <span className="font-bold font-serif-sc text-black text-2xl translate-y-[5px]">
              China Words
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="nav-link font-medium font-sans-sc hover:text-film-red relative overflow-hidden group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-film-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          ))}

          {/* Project Progress Link */}
          <Link
            href="/progress"
            className="nav-link font-medium font-sans-sc hover:text-film-red relative overflow-hidden group ml-2"
          >
            项目进度
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-film-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>

          {/* GitHub Icon */}
          <a
            href="https://github.com/Bobbyztz"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 p-2 hover:text-film-red transition-colors duration-300 bg-gray-100 rounded-full flex items-center justify-center w-8 h-8"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="#333" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-film-red"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-porcelain-white shadow-md transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-3">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="py-2 px-4 hover:bg-ink-gray rounded-md text-dark-gray font-sans-sc"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Project Progress Link (Mobile) */}
            <Link
              href="/progress"
              className="py-2 px-4 hover:bg-ink-gray rounded-md text-dark-gray font-sans-sc"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              项目进度
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ChinawordsNavigation;
