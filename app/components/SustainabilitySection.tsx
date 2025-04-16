'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SustainabilityMetric {
  id: string;
  value: string;
  label: string;
  iconName: string;
}

interface SustainabilitySectionProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  metrics: SustainabilityMetric[];
}

const SustainabilitySection: React.FC<SustainabilitySectionProps> = ({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  metrics
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

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

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animateCounters]);

  return (
    <section
      ref={sectionRef}
      className="py-20 pt-32 bg-white relative overflow-hidden z-20"
    >
      {/* Organic background shape */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            fill="var(--color-leaf-green)"
            d="M42.8,-62.2C54.9,-54.3,63.9,-41.4,69.9,-27.2C75.9,-13,78.8,2.5,75.4,17.1C72,31.7,62.3,45.4,49.6,54.9C36.9,64.4,21.2,69.7,4.4,73.1C-12.4,76.5,-30.2,78,-42.8,70.3C-55.4,62.6,-62.8,45.7,-68.9,28.8C-75,11.9,-79.8,-5,-76.2,-20.2C-72.6,-35.4,-60.6,-48.9,-46.5,-56.5C-32.4,-64.1,-16.2,-65.8,-0.3,-65.3C15.5,-64.9,30.7,-70.2,42.8,-62.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image with organic shape */}
          <div className="lg:w-1/2 relative">
            <div className="relative shape-organic overflow-hidden shadow-xl max-w-md mx-auto">
              <div className="aspect-w-4 aspect-h-3">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Floating leaf elements removed */}
          </div>

          {/* Content */}
          <div className="lg:w-1/2">
            <div className="mb-2 inline-block px-3 py-1 rounded-full bg-moss-green/10 text-moss-green text-sm font-medium">
              {subtitle}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-nature-heading">{title}</h2>
            <p className="text-nature-body mb-8 leading-relaxed">
              {description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <div key={metric.id} className="text-center p-4 border-organic bg-soft-green/5">
                  <div className="mb-3 text-leaf-green inline-flex justify-center">
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
                  <div className="text-3xl font-bold text-nature-heading mb-1">
                    <span ref={(el) => { counterRefs.current[index] = el; }}>0</span>
                    {metric.value.includes('%') && '%'}
                  </div>
                  <div className="text-sm text-nature-body">{metric.label}</div>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-organic inline-block">Learn About Our Impact</Link>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[70px]"
          style={{ fill: 'var(--color-background-alt)' }}
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default SustainabilitySection;
