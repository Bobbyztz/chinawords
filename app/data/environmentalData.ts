// Environmental organization website data

export const navigationLinks = [
  { label: '首页', href: '/' },
  { label: '关于我们', href: '/about' },
  { label: '经典案例', href: '/initiatives' },
  { label: '活动社区', href: '/community' },
  { label: '注册/登录', href: '/login' }
];

export const heroData = {
  title: '寰语 · 中国',
  subtitle: '从历史人文到科技发展，探索中国传统与创新的精彩故事',
  ctaText: '开启探索',
  ctaLink: '/explore',
  secondaryCtaText: '了解更多',
  secondaryCtaLink: '/about',
  backgroundImage: '/autumn.png'
};

export const initiativesData = {
  title: '主题板块速览',
  subtitle: '精选案例，快速了解中国生活方式的多彩面貌',
  initiatives: [
    {
      id: 'initiative-1',
      title: '衣·时尚传承',
      description: '跨越时空的穿针引线',
      imageSrc: 'https://images.unsplash.com/photo-1506510836840-2c12db408d5d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageAlt: 'Urban garden with native plants and flowers',
      link: '/fashion',
      animationStyle: 'sway' as const
    },
    {
      id: 'initiative-2',
      title: '食·味蕾中国',
      description: '八大菜系的味觉盛宴',
      imageSrc: 'https://images.unsplash.com/photo-1664138788119-bd4f073259d5?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageAlt: 'Sustainable building with green roof and solar panels',
      link: '/food',
      animationStyle: 'none' as const
    },
    {
      id: 'initiative-3',
      title: '住·空间美学',
      description: '因地制宜，藏风聚气',
      imageSrc: 'https://images.unsplash.com/photo-1573295918221-c650d1990fc3?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageAlt: 'People working together in a community garden',
      link: '/living',
      animationStyle: 'ripple' as const
    },
    {
      id: 'initiative-4',
      title: '行·绿色出行',
      description: '车马舟楫，行云踏水',
      imageSrc: 'https://images.unsplash.com/photo-1630999050065-b2d2377c2928?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageAlt: 'Children learning about plants in an outdoor classroom',
      link: '/travel',
      animationStyle: 'none' as const
    },
    {
      id: 'initiative-5',
      title: '娱乐·悦心时光',
      description: '琴棋书画，数字繁花',
      imageSrc: 'https://images.unsplash.com/photo-1502099530544-2b61cbaed85c?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageAlt: 'Volunteers planting trees in a restoration area',
      link: '/entertainment',
      animationStyle: 'sway' as const
    },
    {
      id: 'initiative-6',
      title: '省市·山河印象',
      description: '城市与自然的交融之美',
      imageSrc: 'https://images.unsplash.com/photo-1443891238287-325a8fddd0f7?q=80&w=3910&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageAlt: '中国城市与自然风光',
      link: '/city',
      animationStyle: 'ripple' as const
    },
    {
      id: 'initiative-7',
      title: '更多板块',
      description: '',
      imageSrc: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=3975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageAlt: '更多中国文化板块',
      link: '/',
      animationStyle: 'none' as const
    }
  ]
};

export const cityOverviewData = {
  title: '城市速览',
  subtitle: '探索中国各省市的城市风貌与美食文化',
  viewAllLink: '/city'
};

export const sustainabilityData = {
  title: '我们的记录',
  subtitle: '',
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
  backgroundTexture: 'leaf' as const,
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
  backgroundStyle: 'leaf' as const
};

export const footerData = {
  description: 'Chinawords致力于记录和分享当代中国的生活方式与文化创新，从衣食住行到历史人文，展现中国故事的多元与魅力。',
  columns: [
    {
      title: '关于我们',
      links: [
        { label: '我们的使命', href: '/about#mission' },
        { label: '团队介绍', href: '/about#team' },
        { label: '合作伙伴', href: '/about#partners' },
        { label: '加入我们', href: '/careers' }
      ]
    },
    {
      title: '基础板块',
      links: [
        { label: '衣·时尚传承', href: '/fashion' },
        { label: '食·味蕾中国', href: '/food' },
        { label: '住·空间美学', href: '/living' },
        { label: '行·绿色出行', href: '/travel' }
      ]
    },
    {
      title: '进阶板块',
      links: [
        { label: '娱乐·悦心时光', href: '/entertainment' },
        { label: '省市·山河印象', href: '/city' }
      ]
    },
    {
      title: '参与互动',
      links: [
        { label: '志愿者招募', href: '/get-involved/volunteer' },
        { label: '支持我们', href: '/get-involved/donate' },
        { label: '活动日历', href: '/events' },
        { label: '联系我们', href: '/contact' }
      ]
    }
  ],
  socialLinks: [
    {
      platform: '小红书',
      href: 'https://xiaohongshu.com',
      iconType: 'xiaohongshu'
    },
    {
      platform: 'Twitter',
      href: 'https://twitter.com',
      iconType: 'x'
    },
    {
      platform: 'TikTok',
      href: 'https://tiktok.com',
      iconType: 'tiktok'
    },
    {
      platform: 'YouTube',
      href: 'https://youtube.com',
      iconType: 'youtube'
    }
  ]
};
