'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

interface SustainabilityMetric {
  id: string;
  value: string;
  label: string;
  iconName: string;
}

interface ChinawordsSustainabilitySectionProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  metrics: SustainabilityMetric[];
}

const ChinawordsSustainabilitySection: React.FC<ChinawordsSustainabilitySectionProps> = ({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  metrics
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Animate numbers on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const animateCounters = () => {
    metrics.forEach((metric, index) => {
      const counterEl = counterRefs.current[index];
      if (!counterEl) return;

      const value = parseInt(metric.value.replace(/,/g, ''));
      const duration = 2000; // ms
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      
      let frame = 0;
      const countTo = value;
      
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(countTo * progress);
        
        if (countTo > 1000) {
          counterEl.textContent = currentCount.toLocaleString();
        } else {
          counterEl.textContent = currentCount.toString();
        }
        
        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);
    });
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-porcelain-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image with organic shape */}
          <div className="lg:w-1/2 relative">
            <div className="relative overflow-hidden shadow-xl max-w-md mx-auto rounded-lg">
              <div className="aspect-w-4 aspect-h-3">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2">
            <div className="mb-2 inline-block px-3 py-1 rounded-full bg-film-red/10 text-film-red text-sm font-medium font-sans-sc">
              {subtitle}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dark-gray font-serif-sc">{title}</h2>
            <p className="text-dark-gray mb-8 leading-relaxed font-sans-sc">
              {description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <div key={metric.id} className="text-center p-4 border border-light-gray rounded-lg bg-ink-gray/30">
                  <div className="mb-3 text-film-red inline-flex justify-center">
                    {metric.iconName === 'tree' && (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {metric.iconName === 'garden' && (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15 4.414A1 1 0 0116.414 3L14 .586A1 1 0 0112.586 2L13 2.414l-.707.707A1 1 0 0112 4z" clipRule="evenodd" />
                      </svg>
                    )}
                    {metric.iconName === 'building' && (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    )}
                    {metric.iconName === 'waste' && (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="text-3xl font-bold text-dark-gray mb-1 font-serif-sc">
                    <span ref={el => counterRefs.current[index] = el}>0</span>
                    {metric.value.includes('%') && '%'}
                    {metric.value.includes('万') && '万'}
                  </div>
                  <div className="text-sm text-dark-gray font-sans-sc">{metric.label}</div>
                </div>
              ))}
            </div>

            <a href="/about" className="btn-primary inline-block">了解更多数据</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChinawordsSustainabilitySection;
