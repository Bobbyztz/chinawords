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
    src: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c',
    alt: 'Dim Sum - Bamboo Steamer',
    width: 800,
    height: 600,
    category: 'food',
    description: 'Traditional Chinese dim sum dumplings in bamboo steamer',
    date: 'Jan 15, 2023'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2',
    alt: 'Chinese Tea Ceremony',
    width: 800,
    height: 600,
    category: 'food',
    description: 'Traditional Chinese tea set with hot tea being poured',
    date: 'July 5, 2023'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1582487809094-520150fdb872',
    alt: 'Chinese New Year Lanterns',
    width: 800,
    height: 600,
    category: 'culture',
    description: 'Red lanterns hanging during Chinese New Year celebrations',
    date: 'February 13, 2023'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d',
    alt: 'Great Wall of China',
    width: 800,
    height: 600,
    category: 'travel',
    description: 'Majestic view of the Great Wall of China winding through mountains',
    date: 'March 22, 2023'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2',
    alt: 'Shanghai Skyline',
    width: 800,
    height: 600,
    category: 'urban',
    description: 'Modern skyline of Shanghai with the Oriental Pearl Tower',
    date: 'February 8, 2023'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1581323463133-af69f4d0aa06',
    alt: 'Chinese Calligraphy',
    width: 800,
    height: 600,
    category: 'culture',
    description: 'Traditional Chinese calligraphy with brush and ink',
    date: 'May 19, 2023'
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1',
    alt: 'Forbidden City',
    width: 800,
    height: 600,
    category: 'travel',
    description: 'Historic Forbidden City palace complex in Beijing',
    date: 'April 3, 2023'
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624',
    alt: 'Sichuan Hot Pot',
    width: 800,
    height: 600,
    category: 'food',
    description: 'Spicy Sichuan hot pot with variety of ingredients',
    date: 'June 11, 2023'
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-1591017775878-c81475fe5900',
    alt: 'Dragon Boat Festival',
    width: 800,
    height: 600,
    category: 'culture',
    description: 'Colorful dragon boats racing during the Dragon Boat Festival',
    date: 'September 7, 2023'
  },
  {
    id: '10',
    src: 'https://images.unsplash.com/photo-1599709606362-2078844247d3',
    alt: 'Beijing Hutongs',
    width: 800,
    height: 600,
    category: 'urban',
    description: 'Traditional narrow streets and alleys of Beijing Hutongs',
    date: 'October 15, 2023'
  },
  {
    id: '11',
    src: 'https://images.unsplash.com/photo-1537210249814-b9a10a161ae4',
    alt: 'Li River Landscape',
    width: 800,
    height: 600,
    category: 'travel',
    description: 'Scenic karst mountains along the Li River in Guilin',
    date: 'November 22, 2023'
  },
  {
    id: '12',
    src: 'https://images.unsplash.com/photo-1516211881327-e5120a941edc',
    alt: 'Chinese Street Food',
    width: 800,
    height: 600,
    category: 'food',
    description: 'Vibrant street food market with various local delicacies',
    date: 'December 8, 2023'
  }
];

export const filterTabs = [
  { id: 'all', label: 'All Categories' },
  { id: 'food', label: 'Food & Tea' },
  { id: 'culture', label: 'Culture & Traditions' },
  { id: 'travel', label: 'Travel & Landmarks' },
  { id: 'urban', label: 'Urban China' }
];
