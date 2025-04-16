'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  imageSrc: string;
}

interface ChinawordsCommunitySectionProps {
  title: string;
  subtitle: string;
  events: CommunityEvent[];
}

const ChinawordsCommunitySection: React.FC<ChinawordsCommunitySectionProps> = ({
  title,
  subtitle,
  events
}) => {
  return (
    <section
      className="py-20 pt-32 relative overflow-hidden z-20"
      style={{ backgroundColor: 'var(--color-ink-gray)' }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark-gray font-serif-sc">{title}</h2>
          <p className="text-lg text-dark-gray font-sans-sc">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-porcelain-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
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
                  <h3 className="text-xl font-semibold mb-2 text-dark-gray font-serif-sc">{event.title}</h3>
                  <div className="mb-4 flex items-center text-dark-gray text-sm font-sans-sc">
                    <svg className="w-4 h-4 mr-1 text-film-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{event.date}</span>
                  </div>
                  <div className="mb-4 flex items-center text-dark-gray text-sm font-sans-sc">
                    <svg className="w-4 h-4 mr-1 text-film-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                  <div className="mt-auto">
                    <Link href="/events" className="btn-primary text-sm py-2 px-4 font-sans-sc inline-block">报名参加</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/events" className="btn-primary bg-jade-green text-white px-6 py-3 rounded-md font-sans-sc inline-block">
            查看全部活动
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChinawordsCommunitySection;
