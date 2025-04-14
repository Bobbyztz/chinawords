'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import FrameToggleIcon from './FrameToggleIcon';
// CSS import is handled in the layout

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: string;
  date?: string;
}

interface FilterTab {
  id: string;
  label: string;
}

interface RefinedGalleryProps {
  title: string;
  images: GalleryImage[];
  filters: FilterTab[];
}

const RefinedGallery: React.FC<RefinedGalleryProps> = ({
  title,
  images,
  filters
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [frameEnabled, setFrameEnabled] = useState(true);

  // Load frame preference from localStorage if available
  useEffect(() => {
    const savedPreference = localStorage.getItem('chinaword-frame-enabled');
    if (savedPreference !== null) {
      setFrameEnabled(savedPreference === 'true');
    }
  }, []);

  // Save frame preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('chinaword-frame-enabled', frameEnabled.toString());
  }, [frameEnabled]);

  const toggleFrame = () => {
    setFrameEnabled(prev => !prev);
  };

  const filteredImages = activeFilter === 'all'
    ? images
    : images.filter(img => img.category === activeFilter);

  return (
    <div className="min-h-screen paper-bg">
      {/* Main container with 1:4 ratio layout */}
      <div className="w-full py-8 pt-16 pb-8 bg-transparent">
        <div className="flex flex-col md:flex-row px-6 md:px-12 w-full">
          {/* Left column: Title and empty space - 1/5 width (1 part of 1:4 ratio) */}
          <div className="w-full md:w-1/5 flex flex-col mb-6 md:mb-0 pr-0 md:pr-4">
            <div className="mb-6">
              <h1 className="text-4xl font-bold" style={{ fontFamily: 'serif', color: '#000000' }}>{title}</h1>
            </div>
            {/* Empty space below title */}
            <div className="flex-grow hidden md:block"></div>
          </div>

          {/* Right column: Filter tabs, frame toggle, and gallery - 4/5 width (4 parts of 1:4 ratio) */}
          <div className="w-full md:w-4/5 flex flex-col">
            {/* Header section with filter tabs and frame toggle */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-8">
              {/* Filter tabs - left aligned */}
              <div className="filter-tabs flex items-center gap-4 flex-wrap">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Frame toggle */}
              <div className="flex">
                <button
                  className={`header-frame-toggle ${frameEnabled ? 'active' : ''}`}
                  onClick={toggleFrame}
                  title={frameEnabled ? 'Disable Chinese frames' : 'Enable Chinese frames'}
                  aria-label="Toggle Chinese frames"
                >
                  <FrameToggleIcon isActive={frameEnabled} />
                </button>
              </div>
            </div>

            {/* Gallery section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
              {filteredImages.map(image => (
                <div
                  key={image.id}
                  className={frameEnabled ? 'chinese-frame' : 'image-card'}
                >
                  <div className="tape-top"></div>
                  {frameEnabled && (
                    <>
                      <div className="corner corner-tl"></div>
                      <div className="corner corner-tr"></div>
                      <div className="corner corner-bl"></div>
                      <div className="corner corner-br"></div>
                    </>
                  )}
                  <div className="relative aspect-ratio-container overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center' }}
                      priority
                    />
                  </div>
                  <div className="mt-3">
                    <h3 className="handwritten-title">{image.alt}</h3>
                    {image.date && (
                      <p className="handwritten-date">Created {image.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefinedGallery;
