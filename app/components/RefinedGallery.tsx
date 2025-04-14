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
    <div className="min-h-screen paper-bg py-12 px-4">
      {/* Frame toggle button */}
      <button
        className={`frame-toggle ${frameEnabled ? 'active' : ''}`}
        onClick={toggleFrame}
        title={frameEnabled ? 'Disable Chinese frames' : 'Enable Chinese frames'}
        aria-label="Toggle Chinese frames"
      >
        <FrameToggleIcon isActive={frameEnabled} />
      </button>

      <div className="max-w-6xl mx-auto">
        <h1 className="handwritten-title text-4xl text-center mb-8">{title}</h1>

        <div className="filter-tabs">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map(image => (
            <div
              key={image.id}
              className={frameEnabled ? 'chinese-frame' : 'image-card'}
            >
              {!frameEnabled && <div className="tape-top"></div>}
              {frameEnabled && (
                <>
                  <div className="corner corner-tl"></div>
                  <div className="corner corner-tr"></div>
                  <div className="corner corner-bl"></div>
                  <div className="corner corner-br"></div>
                </>
              )}
              <div className="relative h-48 overflow-hidden">
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
  );
};

export default RefinedGallery;
