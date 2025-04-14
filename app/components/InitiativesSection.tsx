'use client';

import React, { useRef, useEffect } from 'react';
import NatureCard from './NatureCard';

interface Initiative {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
  animationStyle?: 'sway' | 'ripple' | 'none' | string;
}

interface InitiativesSectionProps {
  title: string;
  subtitle: string;
  initiatives: Initiative[];
}

const InitiativesSection: React.FC<InitiativesSectionProps> = ({
  title,
  subtitle,
  initiatives
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Add scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.initiative-card');
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 texture-subtle relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/50 to-transparent"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-nature-heading">{title}</h2>
          <p className="text-lg text-nature-body">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map((initiative, index) => (
            <div
              key={initiative.id}
              className="initiative-card opacity-0 translate-y-8 transition-all duration-700"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <NatureCard
                title={initiative.title}
                description={initiative.description}
                imageSrc={initiative.imageSrc}
                imageAlt={initiative.imageAlt}
                link={initiative.link}
                animationStyle={initiative.animationStyle}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Organic shape divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[70px] md:h-[100px]"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="white"
          ></path>
        </svg>
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default InitiativesSection;
