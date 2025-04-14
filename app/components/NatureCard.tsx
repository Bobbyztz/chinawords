'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link?: string;
  animationStyle?: 'sway' | 'ripple' | 'none';
}

const NatureCard: React.FC<NatureCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  link,
  animationStyle = 'none'
}) => {
  const animationClass = 
    animationStyle === 'sway' 
      ? 'animate-sway' 
      : animationStyle === 'ripple' 
        ? 'animate-ripple' 
        : '';

  const CardContent = () => (
    <div className={`card-nature h-full flex flex-col ${animationClass}`}>
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-2 text-nature-heading">{title}</h3>
        <p className="text-nature-body text-sm flex-grow">{description}</p>
        {link && (
          <div className="mt-4 pt-2 border-t border-gray-100">
            <span className="inline-flex items-center text-leaf-green text-sm font-medium">
              Learn more
              <svg
                className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="group block h-full">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};

export default NatureCard;
