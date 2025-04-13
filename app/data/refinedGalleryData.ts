export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: string;
  description?: string;
  date?: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b',
    alt: 'Morning Light Study - Watercolor on Paper',
    width: 800,
    height: 600,
    category: 'sketches',
    date: 'Jan 15, 2023'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1513031300226-c8fb12de9ade',
    alt: 'Urban Sketcher - Ink and Marker',
    width: 800,
    height: 600,
    category: 'sketches',
    date: 'July 5, 2023'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1506812574058-fc75fa93fead',
    alt: 'Abstract Emotions - Mixed Media',
    width: 800,
    height: 600,
    category: 'mixed-media',
    date: 'August 13, 2023'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8',
    alt: 'Nature\'s Palette - Digital Painting',
    width: 800,
    height: 600,
    category: 'digital-art',
    date: 'March 22, 2023'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df',
    alt: 'City Dreams - Charcoal',
    width: 800,
    height: 600,
    category: 'sketches',
    date: 'February 8, 2023'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    alt: 'Sunset Reflections - Oil on Canvas',
    width: 800,
    height: 600,
    category: 'paintings',
    date: 'May 19, 2023'
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    alt: 'Forest Whispers - Acrylic on Canvas',
    width: 800,
    height: 600,
    category: 'paintings',
    date: 'April 3, 2023'
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    alt: 'Night Sky Study - Watercolor',
    width: 800,
    height: 600,
    category: 'sketches',
    date: 'June 11, 2023'
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b',
    alt: 'Mountain Majesty - Digital Art',
    width: 800,
    height: 600,
    category: 'digital-art',
    date: 'September 7, 2023'
  }
];

export const filterTabs = [
  { id: 'all', label: 'All Works' },
  { id: 'sketches', label: 'Sketches' },
  { id: 'paintings', label: 'Paintings' },
  { id: 'digital-art', label: 'Digital Art' },
  { id: 'mixed-media', label: 'Mixed Media' }
];
