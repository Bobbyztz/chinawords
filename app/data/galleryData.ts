export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: string;
  description?: string;
  date?: string;
  location?: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    alt: 'Mountain Landscape',
    width: 800,
    height: 600,
    category: 'nature',
    description: 'A breathtaking view of mountains with a lake in the foreground.',
    date: 'June 12, 2023',
    location: 'Yosemite National Park'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    alt: 'Sunset over the Ocean',
    width: 800,
    height: 600,
    category: 'nature',
    description: 'Golden sunset reflecting on calm ocean waters.',
    date: 'July 3, 2023',
    location: 'Big Sur, California'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
    alt: 'Forest Path',
    width: 800,
    height: 600,
    category: 'nature',
    description: 'A serene path through a dense forest with sunlight filtering through the trees.',
    date: 'August 15, 2023',
    location: 'Redwood National Park'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    alt: 'Curious Cat',
    width: 800,
    height: 600,
    category: 'animals',
    description: 'A curious orange tabby cat looking directly at the camera.',
    date: 'September 5, 2023',
    location: 'Home Studio'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca',
    alt: 'Wolf in the Wild',
    width: 800,
    height: 600,
    category: 'animals',
    description: 'A majestic wolf standing alert in a snowy landscape.',
    date: 'January 20, 2023',
    location: 'Yellowstone National Park'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890',
    alt: 'Eagle in Flight',
    width: 800,
    height: 600,
    category: 'animals',
    description: 'A bald eagle soaring through the sky with wings spread wide.',
    date: 'March 8, 2023',
    location: 'Alaska'
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b',
    alt: 'City Skyline',
    width: 800,
    height: 600,
    category: 'urban',
    description: 'A dramatic view of a city skyline at dusk with lights beginning to illuminate the buildings.',
    date: 'October 12, 2023',
    location: 'New York City'
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
    alt: 'Street Art',
    width: 800,
    height: 600,
    category: 'urban',
    description: 'Colorful street art mural on the side of an old brick building.',
    date: 'November 3, 2023',
    location: 'Brooklyn, NY'
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9',
    alt: 'City Cafe',
    width: 800,
    height: 600,
    category: 'urban',
    description: 'A cozy cafe with vintage decor and warm lighting.',
    date: 'December 18, 2023',
    location: 'Paris, France'
  },
  {
    id: '10',
    src: 'https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07',
    alt: 'Abstract Painting',
    width: 800,
    height: 600,
    category: 'art',
    description: 'An abstract painting with bold colors and dynamic brush strokes.',
    date: 'February 5, 2023',
    location: 'Modern Art Gallery'
  },
  {
    id: '11',
    src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f',
    alt: 'Sculpture',
    width: 800,
    height: 600,
    category: 'art',
    description: 'A contemporary metal sculpture with intricate geometric patterns.',
    date: 'April 22, 2023',
    location: 'Sculpture Garden'
  },
  {
    id: '12',
    src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5',
    alt: 'Watercolor Landscape',
    width: 800,
    height: 600,
    category: 'art',
    description: 'A delicate watercolor painting of a misty mountain landscape.',
    date: 'May 14, 2023',
    location: 'Artist Studio'
  }
];

export const categories = [
  { id: 'all', label: 'All Collections' },
  { id: 'nature', label: 'Nature' },
  { id: 'animals', label: 'Animals' },
  { id: 'urban', label: 'Urban' },
  { id: 'art', label: 'Art' }
];
