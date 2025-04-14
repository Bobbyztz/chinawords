'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavLink {
  label: string;
  href: string;
}

interface BiophilicNavigationProps {
  logo?: string;
  logoAlt?: string;
  links: NavLink[];
}

const BiophilicNavigation: React.FC<BiophilicNavigationProps> = ({
  logo = '/logo.png',
  logoAlt = 'Eco Biophilic Hub',
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
      className={`nav-biophilic fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 shadow-md' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center h-10">
          <div className="relative h-10 w-10 mr-2 flex-shrink-0">
            <Image
              src={logo}
              alt={logoAlt}
              fill
              className="object-contain"
            />
          </div>
          <span className="font-bold text-black flex items-center h-full" style={{ fontSize: '1rem' }}>China Words</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="nav-link font-medium hover:text-leaf-green relative overflow-hidden group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-leaf-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          ))}
          <button className="btn-organic ml-4">开始探索</button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
        className={`md:hidden absolute w-full bg-white shadow-md transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-3">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="py-2 px-4 hover:bg-gray-50 rounded-md text-nature-body"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button className="btn-organic my-2 mx-4">开始探索</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BiophilicNavigation;
