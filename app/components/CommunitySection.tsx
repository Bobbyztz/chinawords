'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  imageSrc: string;
}

interface CommunitySectionProps {
  title: string;
  subtitle: string;
  events: CommunityEvent[];
  backgroundTexture?: 'leaf' | 'wood' | 'subtle' | 'none';
}

const CommunitySection: React.FC<CommunitySectionProps> = ({
  title,
  subtitle,
  events,
  backgroundTexture = 'leaf'
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textureClass = backgroundTexture !== 'none' ? `texture-${backgroundTexture}` : '';

  // Ripple effect on hover
  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - diameter / 2}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - diameter / 2}px`;
    circle.classList.add('ripple');

    const ripple = button.querySelector('.ripple');
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <section
      ref={sectionRef}
      className={`py-20 pt-32 ${textureClass} relative overflow-hidden z-20`}
      style={{ backgroundColor: 'var(--color-background-alt)' }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-nature-heading">{title}</h2>
          <p className="text-lg text-nature-body">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative"
              onMouseDown={createRipple}
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/3 relative h-48 md:h-auto">
                  <Image
                    src={event.imageSrc}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 text-nature-heading">{event.title}</h3>
                  <div className="mb-4 flex items-center text-nature-body text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{event.date}</span>
                  </div>
                  <div className="mb-4 flex items-center text-nature-body text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                  <div className="mt-auto">
                    <button className="btn-organic text-sm py-2 px-4">Join Event</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-organic bg-leaf-green text-white px-6 py-3 rounded-full">
            View All Community Events
          </button>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-drift"
            style={{
              left: `-100px`,
              top: `${20 + Math.random() * 60}%`,
              animationDuration: `${60 + Math.random() * 40}s`,
              animationDelay: `${Math.random() * 40}s`,
              opacity: 0.4,
            }}
          >
            <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 15C10 9.48 14.48 5 20 5H80C85.52 5 90 9.48 90 15C90 20.52 85.52 25 80 25H20C14.48 25 10 20.52 10 15Z" fill="white" fillOpacity="0.5" />
            </svg>
          </div>
        ))}
      </div>

      <style jsx>{`
        .ripple {
          position: absolute;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default CommunitySection;
