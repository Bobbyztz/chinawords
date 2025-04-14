// Environmental organization website data

export const navigationLinks = [
  { label: '首页', href: '/' },
  { label: '关于我们', href: '/about' },
  { label: '主题案例', href: '/initiatives' },
  { label: '活动社区', href: '/community' },
  { label: '合作联系', href: '/contact' }
];

export const heroData = {
  title: '遇见当代中国之美',
  subtitle: '从衣、食、住、行到历史人文，探索中国传统与创新的精彩故事',
  ctaText: '开启探索',
  ctaLink: '/join',
  secondaryCtaText: '了解更多',
  secondaryCtaLink: '/about',
  backgroundImage: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80'
};

export const initiativesData = {
  title: '五大主题速览',
  subtitle: '精选案例，快速了解中国生活方式的多彩面貌',
  initiatives: [
    {
      id: 'initiative-1',
      title: '新中式服饰',
      description: '当代设计师如何复兴汉服元素',
      imageSrc: 'https://images.unsplash.com/photo-1518005068251-37900150dfca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Urban garden with native plants and flowers',
      link: '/initiatives/urban-rewilding',
      animationStyle: 'sway'
    },
    {
      id: 'initiative-2',
      title: '区域味道',
      description: '云南石屏豆腐的千年传承',
      imageSrc: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Sustainable building with green roof and solar panels',
      link: '/initiatives/sustainable-design',
      animationStyle: 'none'
    },
    {
      id: 'initiative-3',
      title: '零碳社区',
      description: '上海杨树浦电厂更新示范',
      imageSrc: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'People working together in a community garden',
      link: '/initiatives/community-gardens',
      animationStyle: 'ripple'
    },
    {
      id: 'initiative-4',
      title: '智慧出行',
      description: '深圳无人驾驶公交实践',
      imageSrc: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Children learning about plants in an outdoor classroom',
      link: '/initiatives/environmental-education',
      animationStyle: 'none'
    },
    {
      id: 'initiative-5',
      title: '文化遗产活化',
      description: '福建土楼改造的乡宿体验',
      imageSrc: 'https://images.unsplash.com/photo-1475738972911-5b44ce979c37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Volunteers planting trees in a restoration area',
      link: '/initiatives/habitat-restoration',
      animationStyle: 'sway'
    },
    {
      id: 'initiative-6',
      title: '山水田园',
      description: '贵州梯田生态旅游',
      imageSrc: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Solar panels and wind turbines in a green field',
      link: '/initiatives/clean-energy',
      animationStyle: 'none'
    }
  ]
};

export const sustainabilityData = {
  title: '我们的记录',
  subtitle: '数据见证',
  description: '用数据见证文化与创新的影响力',
  imageSrc: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
  imageAlt: 'Person holding a small plant in soil',
  metrics: [
    {
      id: 'metric-1',
      value: '1,200+',
      label: '记录案例',
      iconName: 'tree'
    },
    {
      id: 'metric-2',
      value: '680 万',
      label: '年访问量',
      iconName: 'garden'
    },
    {
      id: 'metric-3',
      value: '300+',
      label: '合作机构',
      iconName: 'building'
    },
    {
      id: 'metric-4',
      value: '95%',
      label: '用户好评率',
      iconName: 'waste'
    }
  ]
};

export const communityData = {
  title: '参与线上/线下活动',
  subtitle: '与同好一起，深入中国的城市与乡村',
  backgroundTexture: 'leaf' as 'leaf',
  events: [
    {
      id: 'event-1',
      title: '苏州园林写生营',
      date: '2024 年 7 月 12 日',
      location: '拙政园，苏州',
      imageSrc: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'event-2',
      title: '川菜大师课',
      date: '2024 年 8 月 3 日',
      location: '成都锦里，成都',
      imageSrc: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'event-3',
      title: '古建修复志愿日',
      date: '2024 年 9 月 15 日',
      location: '平遥古城，山西',
      imageSrc: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'event-4',
      title: '电动骑行城市游',
      date: '2024 年 10 月 6 日',
      location: '深圳南山，深圳',
      imageSrc: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    }
  ]
};

export const newsletterData = {
  title: '订阅我们的通讯',
  subtitle: '获取最新的中国文化与生活方式资讯，每周精选内容直达您的邮箱。',
  backgroundStyle: 'leaf' as 'leaf'
};

export const footerData = {
  description: 'Chinawords致力于记录和分享当代中国的生活方式与文化创新，从衣食住行到历史人文，展现中国故事的多元与魅力。',
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
