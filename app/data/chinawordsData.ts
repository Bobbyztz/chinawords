// Chinawords website data

export const navigationLinks = [
  { label: '首页', href: '/' },
  { label: '衣·时尚传承', href: '/fashion' },
  { label: '食·味蕾中国', href: '/food' },
  { label: '住·空间美学', href: '/living' },
  { label: '行·绿色出行', href: '/travel' },
  { label: '文化脉络', href: '/culture' },
  { label: '合作联系', href: '/contact' }
];

export const heroData = {
  title: '遇见当代中国之美',
  subtitle: '从传统到创新，探寻衣、食、住、行背后的文化与可持续故事。',
  ctaText: '开启探索',
  ctaLink: '/explore',
  secondaryCtaText: '关于我们',
  secondaryCtaLink: '/about',
  backgroundImage: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80'
};

export const initiativesData = {
  title: '五大主题速览',
  subtitle: '精选案例，快速打开中国生活方式的新视角。',
  initiatives: [
    {
      id: 'initiative-1',
      title: '新中式服饰',
      description: '当代设计师如何复兴汉服元素，将传统美学融入现代时尚。',
      imageSrc: 'https://images.unsplash.com/photo-1614632536889-f0e94a4ec81a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      imageAlt: '现代汉服时装设计',
      link: '/fashion/modern-hanfu',
      animationStyle: 'none' as 'none'
    },
    {
      id: 'initiative-2',
      title: '区域味道',
      description: '云南石屏豆腐的千年传承，一方水土养一方美食的生动诠释。',
      imageSrc: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      imageAlt: '云南石屏豆腐制作',
      link: '/food/yunnan-tofu',
      animationStyle: 'none' as 'none'
    },
    {
      id: 'initiative-3',
      title: '零碳社区',
      description: '上海杨树浦电厂更新示范，工业遗产如何焕发新生。',
      imageSrc: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      imageAlt: '上海杨树浦电厂改造',
      link: '/living/zero-carbon-community',
      animationStyle: 'none' as 'none'
    },
    {
      id: 'initiative-4',
      title: '智慧出行',
      description: '深圳无人驾驶公交实践，科技如何重塑城市交通体验。',
      imageSrc: 'https://images.unsplash.com/photo-1570701123784-0a7cf6cd6d01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      imageAlt: '深圳无人驾驶公交',
      link: '/travel/autonomous-bus',
      animationStyle: 'none' as 'none'
    },
    {
      id: 'initiative-5',
      title: '文化遗产活化',
      description: '艺宿改造的福建土楼，传统建筑焕发当代生命力。',
      imageSrc: 'https://images.unsplash.com/photo-1528185025906-d8f64c3d8e62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      imageAlt: '福建土楼精品酒店',
      link: '/living/tulou-hotel',
      animationStyle: 'none' as 'none'
    },
    {
      id: 'initiative-6',
      title: '山水田园',
      description: '贵州梯田生态旅游，乡村振兴与自然保护的和谐共生。',
      imageSrc: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      imageAlt: '贵州梯田日出',
      link: '/travel/guizhou-terraces',
      animationStyle: 'none' as 'none'
    }
  ]
};

export const sustainabilityData = {
  title: '我们的记录',
  subtitle: '数据见证',
  description: '用数据见证文化与创新的影响力，记录中国生活方式的演变与发展。',
  imageSrc: 'https://images.unsplash.com/photo-1581337204873-1a1b6bc70a7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
  imageAlt: '中国传统书法',
  metrics: [
    {
      id: 'metric-1',
      value: '1,200+',
      label: '记录案例',
      iconName: 'tree'
    },
    {
      id: 'metric-2',
      value: '680',
      label: '万次年访问量',
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
  subtitle: '与同好一起，深入中国的城市与乡村。',
  backgroundTexture: 'leaf' as 'leaf',
  events: [
    {
      id: 'event-1',
      title: '苏州园林写生营',
      date: '2024年7月12日',
      location: '拙政园',
      imageSrc: 'https://images.unsplash.com/photo-1599639668422-4b2636c8f4db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'event-2',
      title: '川菜大师课',
      date: '2024年8月3日',
      location: '成都锦里',
      imageSrc: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'event-3',
      title: '古建修复志愿日',
      date: '2024年9月15日',
      location: '山西平遥',
      imageSrc: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'event-4',
      title: '电动骑行城市游',
      date: '2024年10月6日',
      location: '深圳南山',
      imageSrc: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
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
      title: '关于我们',
      links: [
        { label: '我们的使命', href: '/about#mission' },
        { label: '团队介绍', href: '/about#team' },
        { label: '合作伙伴', href: '/about#partners' },
        { label: '加入我们', href: '/careers' }
      ]
    },
    {
      title: '主题板块',
      links: [
        { label: '衣·时尚传承', href: '/fashion' },
        { label: '食·味蕾中国', href: '/food' },
        { label: '住·空间美学', href: '/living' },
        { label: '行·绿色出行', href: '/travel' }
      ]
    },
    {
      title: '友情链接',
      links: [
        { label: '国家文物局', href: 'https://www.ncha.gov.cn/' },
        { label: '非遗数字博物馆', href: 'https://www.ihchina.cn/' },
        { label: '阿里公益', href: 'https://gongyi.taobao.com/' },
        { label: '联系我们', href: '/contact' }
      ]
    }
  ],
  socialLinks: [
    {
      platform: '微博',
      href: 'https://weibo.com',
      iconType: 'weibo'
    },
    {
      platform: '小红书',
      href: 'https://xiaohongshu.com',
      iconType: 'xiaohongshu'
    },
    {
      platform: 'YouTube',
      href: 'https://youtube.com',
      iconType: 'youtube'
    }
  ]
};
