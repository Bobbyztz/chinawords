'use client';

import React from 'react';
import RefinedGallery from '../components/RefinedGallery';
import { galleryImages, filterTabs } from '../data/refinedGalleryData';

export default function RefinedGalleryPage() {
  return (
    <RefinedGallery 
      title="My Sketchbook Gallery" 
      images={galleryImages} 
      filters={filterTabs} 
    />
  );
}
