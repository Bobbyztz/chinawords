'use client';

import React from 'react';
import ChinawordsNavigation from '../components/ChinawordsNavigation';
import BiophilicFooter from '../components/BiophilicFooter';
import TabComponent from '../components/TabComponent';
import { navigationLinks, footerData } from '../data/environmentalData';

// Food Image Wall component
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

interface FoodImage {
  id: string;
  src: string;
  alt: string;
  author?: string;
  prompt?: string;
}

const FoodImageWall = () => {
  const [images, setImages] = useState<FoodImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<FoodImage | null>(null);

  // Function to generate random images
  const generateRandomImages = () => {
    setIsLoading(true);

    // Generate a random seed for better randomization
    const randomSeed = Date.now() + Math.floor(Math.random() * 1000);

    // Add a small delay to show the blur effect before generating new images
    setTimeout(() => {
      generateAndSetNewImages(randomSeed);
    }, 300);
  };

  // Function to shuffle an array using Fisher-Yates algorithm with optional seed
  const shuffleArray = <T,>(array: T[], seed?: number): T[] => {
    const shuffled = [...array];

    // Create a seeded random number generator if seed is provided
    let seedValue = seed;
    const getRandom = seedValue !== undefined
      ? () => {
          // Simple seeded random number generator
          seedValue = (seedValue! * 9301 + 49297) % 233280;
          return seedValue! / 233280;
        }
      : Math.random;

    for (let i = shuffled.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      const j = Math.floor(getRandom() * (i + 1));
      // Swap elements at i and j
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Function to actually generate the new images
  const generateAndSetNewImages = useCallback((seed?: number) => {
    // List of available food images with their display names
    const foodImages = [
      { file: '上海.png', name: '上海小笼包', author: '张三', prompt: '传统上海小笼包，蒸笼上光滑透亮，内馅丰富多汁' },
      { file: '兰州.png', name: '兰州拉面', author: '李四', prompt: '师傅现场拉制的兰州拉面，筋道分明，汤汁浓郁' },
      { file: '南京.png', name: '南京盐水鸭', author: '王五', prompt: '金黄色的南京盐水鸭，皮脆肉嫩，咸香回味' },
      { file: '南宁.png', name: '老友粥', author: '赵六', prompt: '广西老友粥，配料丰富，粥质细腻润滑' },
      { file: '南昌.png', name: '红烧肉', author: '钱七', prompt: '南昌特色红烧肉，肉质酥烂，色泽香浓' },
      { file: '台北.png', name: '珍珠奶茶', author: '孙八', prompt: '台湾珍珠奶茶，珍珠圆润，奶茶香浓' },
      { file: '合肥.png', name: '三鸡汤', author: '吴九', prompt: '安徽三鸡汤，汤色奶白，鸡肉鲜嫩' },
      { file: '天津.png', name: '狮子头', author: '郑十', prompt: '天津狮子头，外酥里嫩，肉馅多汁' },
      { file: '太原.png', name: '刀削面', author: '刘一', prompt: '太原刀削面，面条宽薄有鞥，汤头浓郁' },
      { file: '广州.png', name: '早茶点心', author: '陈二', prompt: '广州早茶点心，品种多样，精致可口' },
      { file: '成都.png', name: '火锅', author: '张三', prompt: '成都麻辣火锅，红油翠绿，食材丰富' },
      { file: '拉萨.png', name: '酒酿糖奶', author: '李四', prompt: '西藏酒酿糖奶，浓郁香浓，营养丰富' },
      { file: '昆明.png', name: '过桥米线', author: '王五', prompt: '云南过桥米线，米线细软，配料鲜香' },
      { file: '杭州.png', name: '西湖醒酒鸡', author: '赵六', prompt: '杭州西湖醒酒鸡，酒香浓郁，鸡肉酥嫩' },
      { file: '武汉.png', name: '热干面', author: '钱七', prompt: '武汉热干面，面条筋道分明，调料香浓' },
      { file: '沈阳.png', name: '鲁茶花包子', author: '孙八', prompt: '沈阳鲁茶花包子，皮薄馅多，汤汁香浓' },
      { file: '济南.png', name: '鲍鱼丸子', author: '吴九', prompt: '鲍鱼丸子，鱼肉鲜嫩，外皮金黄酥脆' },
      { file: '海口.png', name: '海南鸡饭', author: '郑十', prompt: '海南椰树叶包裹的鸡饭，香气扑鼻，米香四溢' },
      { file: '澳门.png', name: '葡式蛋挂', author: '刘一', prompt: '澳门葡式蛋挂，外酥内软，甜而不腐' },
      { file: '石家庄.png', name: '狗不理面片', author: '陈二', prompt: '河北狗不理面片，面片宽大，配料丰富' }
    ];

    // Shuffle and select images
    const shuffledFood = shuffleArray(foodImages, seed).slice(0, 12);

    // Create image objects
    const foodImageObjects = shuffledFood.map((img, index) => ({
      id: `food-${index}`,
      src: `/34个省级行政区-美食/${img.file}`,
      alt: img.name,
      author: img.author,
      prompt: img.prompt
    }));

    // Preload images before showing them
    const preloadImages = async () => {
      const promises = foodImageObjects.map(img => {
        return new Promise<boolean>((resolve) => {
          const image = new window.Image();
          image.onload = () => resolve(true);
          image.onerror = () => resolve(false);
          image.src = img.src;
        });
      });

      // Wait for all images to preload or timeout after 2 seconds
      await Promise.race([
        Promise.all(promises),
        new Promise(resolve => setTimeout(resolve, 2000))
      ]);

      // Set images and finish loading
      setImages(foodImageObjects);
      setRefreshKey(prevKey => prevKey + 1); // Increment key to force re-render
      setIsLoading(false);
    };

    // Start preloading
    preloadImages();
  }, []);

  // Generate random images on component mount
  useEffect(() => {
    generateAndSetNewImages();
  }, [generateAndSetNewImages]);

  // Handle image click to show details
  const handleImageClick = (image: FoodImage) => {
    setSelectedImage(image);
  };

  // Close image details modal
  const closeImageDetails = () => {
    setSelectedImage(null);
  };

  return (
    <div className="prose prose-lg max-w-none">
      <h2 className="text-2xl font-bold mb-4 font-serif-sc">美食图片墙</h2>
      <p className="font-sans-sc mb-6">
        这里展示用户上传的美食图片，点击图片可查看详细信息。
      </p>

      {/* Controls */}
      <div className="flex justify-end mb-6">
        <div className="rounded-full overflow-hidden border border-jade-green shadow-sm">
          <button
            onClick={() => generateRandomImages()}
            className="bg-white text-jade-green px-4 py-2 text-sm font-bold hover:bg-[#f0f9f4] hover:text-[#1a6b3c] transition-all duration-300 relative cursor-pointer flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="opacity-0">换一批</span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-4 w-4 text-jade-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                换一批
              </>
            )}
          </button>
        </div>
      </div>

      {/* Photo wall */}
      <div key={refreshKey} className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 transition-all duration-300 ${isLoading ? 'blur-effect' : ''}`}>
        {images.map((image) => (
          <div
            key={image.id}
            className="image-card hover-frame-effect cursor-pointer"
            onClick={() => handleImageClick(image)}
          >
            <div className="tape-top"></div>
            <div className="frame-corners">
              <div className="corner corner-tl"></div>
              <div className="corner corner-tr"></div>
              <div className="corner corner-bl"></div>
              <div className="corner corner-br"></div>
            </div>
            <div className="relative aspect-ratio-container overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover"
                style={{ objectPosition: 'center' }}
                priority={image.id.includes('0')} // Prioritize loading for first few images
              />
            </div>
            <div className="p-2 text-center">
              <p className="text-sm font-medium truncate">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Image details modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeImageDetails}>
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="relative h-64 sm:h-80 md:h-96">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 font-serif-sc">{selectedImage.alt}</h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">作者：</span> {selectedImage.author}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">AI 提示词：</span> {selectedImage.prompt}
                </p>
              </div>
              <button
                className="mt-2 bg-film-red text-white px-4 py-2 rounded-md hover:bg-film-red/90 transition-colors duration-300 text-sm"
                onClick={closeImageDetails}
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .image-card {
          position: relative;
          background-color: white;
          padding: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          width: 100%;
          animation: fadeIn 0.6s cubic-bezier(0.26, 0.53, 0.74, 1.48);
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }

        .blur-effect {
          filter: blur(10px) saturate(0.8);
          opacity: 0.7;
          pointer-events: none;
          transform: scale(0.98);
          transition: all 0.3s ease-in-out;
        }

        .image-card:hover {
          transform: translateY(-5px);
        }

        /* Hover frame effect */
        .hover-frame-effect {
          position: relative;
        }

        .hover-frame-effect:hover {
          background-color: #f8f4e6;
          border: 1px solid #8b4513;
          padding: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .frame-corners {
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .hover-frame-effect:hover .frame-corners {
          opacity: 1;
        }

        .corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid #8b4513;
          z-index: 1;
        }

        .corner-tl {
          top: 4px;
          left: 4px;
          border-right: none;
          border-bottom: none;
        }

        .corner-tr {
          top: 4px;
          right: 4px;
          border-left: none;
          border-bottom: none;
        }

        .corner-bl {
          bottom: 4px;
          left: 4px;
          border-right: none;
          border-top: none;
        }

        .corner-br {
          bottom: 4px;
          right: 4px;
          border-left: none;
          border-top: none;
        }

        .tape-top {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%) rotate(-5deg);
          width: 40px;
          height: 30px;
          background-color: rgba(255, 255, 0, 0.5);
          z-index: 2;
          clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
        }

        .aspect-ratio-container {
          position: relative;
          width: 100%;
          padding-bottom: 100%; /* This creates a perfect square */
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

// Placeholder component for regional cuisines with nested tabs
const RegionalCuisines = () => {
  return (
    <div className="prose prose-lg max-w-none">
      <h2 className="text-2xl font-bold mb-4 font-serif-sc">地方特色菜系</h2>
      <p className="font-sans-sc mb-6">
        中国传统上分为八大菜系：川菜、粤菜、鲁菜、苏菜、闽菜、浙菜、湘菜和徽菜。每个菜系都有其独特的烹饪方法和风味特点。
      </p>
      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-gray-500">菜系详情功能正在开发中...</p>
      </div>
    </div>
  );
};

// Placeholder component for traditional recipes
const TraditionalRecipes = () => {
  return (
    <div className="prose prose-lg max-w-none">
      <h2 className="text-2xl font-bold mb-4 font-serif-sc">传统食谱</h2>
      <p className="font-sans-sc mb-6">
        中国各地区的传统食谱，包含详细的制作步骤和食材清单。
      </p>
      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-gray-500">食谱功能正在开发中...</p>
      </div>
    </div>
  );
};

// Component for food culture information (reusing existing content)
const FoodCulture = () => {
  return (
    <div className="prose prose-lg max-w-none">
      <h2 className="text-2xl font-bold mb-4 font-serif-sc">美食文化</h2>
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-3 font-serif-sc">中国美食概览</h3>
        <p className="font-sans-sc mb-4">
          中国美食以其多样性、丰富的口味和精湛的烹饪技艺而闻名于世。从北方的面食到南方的米饭，从川菜的麻辣到粤菜的清淡，中国各地区的饮食文化展现了丰富的地域特色和历史传承。
        </p>
        <p className="font-sans-sc">
          中国饮食文化强调色、香、味、形、器的和谐统一，追求食材的新鲜和烹饪的精确。传统中医理念也深刻影响了中国饮食，讲究食物的平衡和药食同源。
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-3 font-serif-sc">传统饮食习俗</h3>
        <p className="font-sans-sc mb-4">
          中国的饮食习俗与节日紧密相连。春节有饺子，象征团圆和财富；端午节有粽子，纪念屈原；中秋节有月饼，象征团圆和丰收；冬至有汤圆，象征家庭团圆。
        </p>
        <p className="font-sans-sc mb-4">
          中国传统饮食还讲究座次和礼仪。宴席上的座位安排有特定规则，敬酒和用餐也有相应的礼节。筷子作为主要餐具，使用也有讲究，不同的使用方式可能代表不同的含义。
        </p>
        <p className="font-sans-sc">
          茶文化是中国饮食文化的重要组成部分。不同地区有不同的茶叶品种和饮茶方式，茶道仪式也体现了中国传统文化的精髓。
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-3 font-serif-sc">现代美食发展</h3>
        <p className="font-sans-sc mb-4">
          随着全球化的发展，中国美食不断创新和融合。新式中餐结合了传统烹饪技巧和现代理念，创造出更符合当代口味的菜品。
        </p>
        <p className="font-sans-sc mb-4">
          中国美食也走向世界，在全球各地的中餐馆展现中华饮食文化的魅力。同时，国际美食也影响了中国的饮食习惯，形成了多元化的美食文化。
        </p>
        <p className="font-sans-sc">
          随着人们健康意识的提高，健康饮食理念也越来越受到重视。传统中医食疗与现代营养学相结合，为人们提供更健康的饮食选择。
        </p>
      </div>
    </div>
  );
};

export default function FoodPage() {
  // Define the new tab structure
  const tabs = [
    {
      title: '美食图片墙',
      content: <FoodImageWall />
    },
    {
      title: '地方菜系',
      content: <RegionalCuisines />
    },
    {
      title: '传统食谱',
      content: <TraditionalRecipes />
    },
    {
      title: '美食文化',
      content: <FoodCulture />
    },
  ];

  return (
    <div className="min-h-screen flex flex-col texture-subtle">
      <ChinawordsNavigation links={navigationLinks} />

      <main className="flex-grow py-16 mt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-serif-sc text-center text-film-red">食·味蕾中国</h1>
          <div className="flex flex-col gap-y-6">
            <TabComponent tabs={tabs} />
          </div>
        </div>
      </main>

      <BiophilicFooter
        description={footerData.description}
        columns={footerData.columns}
        socialLinks={footerData.socialLinks}
      />
    </div>
  );
}
