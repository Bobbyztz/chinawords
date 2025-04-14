// Environmental organization website data

export const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Initiatives', href: '/initiatives' },
  { label: 'Community', href: '/community' },
  { label: 'Contact', href: '/contact' }
];

export const heroData = {
  title: 'Connecting People with Nature',
  subtitle: 'Join our mission to create sustainable, nature-inspired spaces that promote wellbeing and protect our planet for future generations.',
  ctaText: 'Join Our Mission',
  ctaLink: '/join',
  secondaryCtaText: 'Learn More',
  secondaryCtaLink: '/about',
  backgroundImage: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80'
};

export const initiativesData = {
  title: 'Our Environmental Initiatives',
  subtitle: 'Discover how we\'re working to create a more sustainable future through these key programs',
  initiatives: [
    {
      id: 'initiative-1',
      title: 'Urban Rewilding',
      description: 'Transforming urban spaces into thriving ecosystems by reintroducing native plants and creating habitats for local wildlife.',
      imageSrc: 'https://images.unsplash.com/photo-1518005068251-37900150dfca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Urban garden with native plants and flowers',
      link: '/initiatives/urban-rewilding',
      animationStyle: 'sway'
    },
    {
      id: 'initiative-2',
      title: 'Sustainable Design',
      description: 'Creating buildings and spaces that work in harmony with nature, using renewable materials and energy-efficient systems.',
      imageSrc: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Sustainable building with green roof and solar panels',
      link: '/initiatives/sustainable-design',
      animationStyle: 'none'
    },
    {
      id: 'initiative-3',
      title: 'Community Gardens',
      description: 'Empowering communities to grow their own food, connect with nature, and build resilience through shared garden spaces.',
      imageSrc: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'People working together in a community garden',
      link: '/initiatives/community-gardens',
      animationStyle: 'ripple'
    },
    {
      id: 'initiative-4',
      title: 'Environmental Education',
      description: 'Providing workshops, courses, and resources to help people of all ages understand and connect with the natural world.',
      imageSrc: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Children learning about plants in an outdoor classroom',
      link: '/initiatives/environmental-education',
      animationStyle: 'none'
    },
    {
      id: 'initiative-5',
      title: 'Habitat Restoration',
      description: 'Working to restore damaged ecosystems and create thriving habitats for native plants and wildlife.',
      imageSrc: 'https://images.unsplash.com/photo-1475738972911-5b44ce979c37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Volunteers planting trees in a restoration area',
      link: '/initiatives/habitat-restoration',
      animationStyle: 'sway'
    },
    {
      id: 'initiative-6',
      title: 'Clean Energy Advocacy',
      description: 'Advocating for policies that support renewable energy and sustainable practices at local and national levels.',
      imageSrc: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Solar panels and wind turbines in a green field',
      link: '/initiatives/clean-energy',
      animationStyle: 'none'
    }
  ]
};

export const sustainabilityData = {
  title: 'Our Environmental Impact',
  subtitle: 'Measuring Our Progress',
  description: 'We believe in transparency and accountability in all our environmental initiatives. Our work is guided by measurable goals and a commitment to creating lasting positive change for our planet and communities.',
  imageSrc: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
  imageAlt: 'Person holding a small plant in soil',
  metrics: [
    {
      id: 'metric-1',
      value: '25,000',
      label: 'Trees Planted',
      iconName: 'tree'
    },
    {
      id: 'metric-2',
      value: '120',
      label: 'Community Gardens',
      iconName: 'garden'
    },
    {
      id: 'metric-3',
      value: '45',
      label: 'Sustainable Buildings',
      iconName: 'building'
    },
    {
      id: 'metric-4',
      value: '85%',
      label: 'Waste Reduction',
      iconName: 'waste'
    }
  ]
};

export const communityData = {
  title: 'Join Our Community',
  subtitle: 'Connect with like-minded individuals and participate in our upcoming events',
  backgroundTexture: 'leaf' as 'leaf',
  events: [
    {
      id: 'event-1',
      title: 'Urban Tree Planting Day',
      date: 'June 5, 2023',
      location: 'Central Park, New York',
      imageSrc: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'event-2',
      title: 'Sustainable Living Workshop',
      date: 'June 12, 2023',
      location: 'Community Center, Boston',
      imageSrc: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'event-3',
      title: 'Native Plant Exchange',
      date: 'June 19, 2023',
      location: 'Botanical Gardens, Chicago',
      imageSrc: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'event-4',
      title: 'Environmental Film Festival',
      date: 'June 25-27, 2023',
      location: 'Arts Center, Seattle',
      imageSrc: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    }
  ]
};

export const newsletterData = {
  title: 'Stay Connected with Nature',
  subtitle: 'Subscribe to our newsletter for the latest environmental news, events, and sustainable living tips.',
  backgroundStyle: 'leaf' as 'leaf'
};

export const footerData = {
  description: 'Eco Biophilic Hub is dedicated to creating sustainable, nature-inspired spaces that promote wellbeing and protect our planet for future generations.',
  columns: [
    {
      title: 'About Us',
      links: [
        { label: 'Our Mission', href: '/about#mission' },
        { label: 'Our Team', href: '/about#team' },
        { label: 'Partners', href: '/about#partners' },
        { label: 'Careers', href: '/careers' }
      ]
    },
    {
      title: 'Initiatives',
      links: [
        { label: 'Urban Rewilding', href: '/initiatives/urban-rewilding' },
        { label: 'Sustainable Design', href: '/initiatives/sustainable-design' },
        { label: 'Community Gardens', href: '/initiatives/community-gardens' },
        { label: 'Environmental Education', href: '/initiatives/environmental-education' }
      ]
    },
    {
      title: 'Get Involved',
      links: [
        { label: 'Volunteer', href: '/get-involved/volunteer' },
        { label: 'Donate', href: '/get-involved/donate' },
        { label: 'Events', href: '/events' },
        { label: 'Contact Us', href: '/contact' }
      ]
    }
  ],
  socialLinks: [
    {
      platform: 'Twitter',
      href: 'https://twitter.com',
      iconType: 'twitter'
    },
    {
      platform: 'Instagram',
      href: 'https://instagram.com',
      iconType: 'instagram'
    },
    {
      platform: 'Facebook',
      href: 'https://facebook.com',
      iconType: 'facebook'
    },
    {
      platform: 'YouTube',
      href: 'https://youtube.com',
      iconType: 'youtube'
    }
  ]
};
