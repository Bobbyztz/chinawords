'use client';

import React from 'react';
import RefinedGallery from './components/RefinedGallery';
import { galleryImages, filterTabs } from './data/refinedGalleryData';

export default function Home() {
  return (
    <RefinedGallery
      title="China Words"
      images={galleryImages}
      filters={filterTabs}
    />
  );
}
