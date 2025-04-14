'use client';

import React, { useRef, useEffect } from 'react';
import ChinawordsCard from './ChinawordsCard';

interface Initiative {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
}

interface ChinawordsInitiativesSectionProps {
  title: string;
  subtitle: string;
  initiatives: Initiative[];
}

const ChinawordsInitiativesSection: React.FC<ChinawordsInitiativesSectionProps> = ({
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
    <section ref={sectionRef} className="py-20 pb-32 ink-texture relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark-gray font-serif-sc">{title}</h2>
          <p className="text-lg text-dark-gray font-sans-sc">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map((initiative, index) => (
            <div
              key={initiative.id}
              className="initiative-card opacity-0 translate-y-8 transition-all duration-700"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ChinawordsCard
                title={initiative.title}
                description={initiative.description}
                imageSrc={initiative.imageSrc}
                imageAlt={initiative.imageAlt}
                link={initiative.link}
              />
            </div>
          ))}
        </div>
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

export default ChinawordsInitiativesSection;
