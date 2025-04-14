'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage
}) => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Subtle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.15}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <div ref={parallaxRef} className="absolute inset-0 h-[120%] w-full">
          <Image
            src={backgroundImage}
            alt="Nature background"
            fill
            priority
            className="object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-60"></div>
        </div>
      </div>

      {/* Floating leaves animation removed */}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={ctaLink}
                className="btn-organic bg-leaf-green hover:bg-moss-green text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 transform hover:-translate-y-1"
              >
                {ctaText}
              </a>
              {secondaryCtaText && secondaryCtaLink && (
                <a
                  href={secondaryCtaLink}
                  className="btn-organic bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full text-lg font-medium transition-all duration-300"
                >
                  {secondaryCtaText}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Wave shape divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-[50px] md:h-[70px]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="var(--color-background)"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
