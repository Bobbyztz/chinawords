"use client";

import React from "react";
import ChinawordsNavigation from "../components/ChinawordsNavigation";
import TabComponent from "../components/TabComponent";
import { navigationLinks } from "../data/environmentalData";

// Food Image Wall component
import Image from "next/image";
import { useState, useEffect } from "react";

interface FoodImage {
  id: string;
  src: string;
  alt: string;
  author?: string;
  prompt?: string;
}

// 八大菜系数据
const chineseCuisines = [
  { id: 'all', name: '全部菜系' },
  { id: 'lu', name: '鲁菜' },
  { id: 'chuan', name: '川菜' },
  { id: 'yue', name: '粤菜' },
  { id: 'su', name: '苏菜' },
  { id: 'zhe', name: '浙菜' },
  { id: 'min', name: '闽菜' },
  { id: 'xiang', name: '湘菜' },
  { id: 'hui', name: '徽菜' },
];

const FoodImageWall = () => {
  const [images, setImages] = useState<FoodImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<FoodImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');

  // 获取所有美食图片
  useEffect(() => {
    // 美食图片列表
    const foodImages = [
      { file: '上海.png', name: '上海' },
      { file: '兰州.png', name: '兰州' },
      { file: '南京.png', name: '南京' },
      { file: '南宁.png', name: '南宁' },
      { file: '南昌.png', name: '南昌' },
      { file: '台北.png', name: '台北' },
      { file: '合肥.png', name: '合肥' },
      { file: '天津.png', name: '天津' },
      { file: '太原.png', name: '太原' },
      { file: '广州.png', name: '广州' },
      { file: '成都.png', name: '成都' },
      { file: '拉萨.png', name: '拉萨' },
      { file: '昆明.png', name: '昆明' },
      { file: '杭州.png', name: '杭州' },
      { file: '武汉.png', name: '武汉' },
      { file: '沈阳.png', name: '沈阳' },
      { file: '济南.png', name: '济南' },
      { file: '海口.png', name: '海口' },
      { file: '澳门.png', name: '澳门' },
      { file: '石家庄.png', name: '石家庄' },
      { file: '福州.png', name: '福州' },
      { file: '西宁.png', name: '西宁' },
      { file: '西安.png', name: '西安' },
      { file: '贵阳.png', name: '贵阳' },
      { file: '郑州.png', name: '郑州' },
      { file: '重庆.png', name: '重庆' },
      { file: '银川.png', name: '银川' },
      { file: '长春.png', name: '长春' },
      { file: '长沙.png', name: '长沙' },
      { file: '香港.png', name: '香港' },
      { file: '哈尔滨.png', name: '哈尔滨' },
      { file: '乌鲁木齐.png', name: '乌鲁木齐' },
      { file: '呼和浩特.png', name: '呼和浩特' }
    ];

    // 创建图片对象
    const foodImageObjects = foodImages.map((img, index) => ({
      id: `food-${index}`,
      src: `/34个省级行政区-美食/${img.file}`,
      alt: img.name,
    }));

    // 预加载图片
    const preloadImages = async () => {
      const promises = foodImageObjects.map(img => {
        return new Promise<boolean>((resolve) => {
          const image = new window.Image();
          image.onload = () => resolve(true);
          image.onerror = () => resolve(false);
          image.src = img.src;
        });
      });

      // 等待所有图片预加载或2秒超时
      await Promise.race([
        Promise.all(promises),
        new Promise(resolve => setTimeout(resolve, 2000))
      ]);

      // 设置图片并完成加载
      setImages(foodImageObjects);
      setFilteredImages(foodImageObjects);
      setIsLoading(false);
    };

    // 开始预加载
    preloadImages();
  }, []);

  // 根据选中的菜系筛选图片
  useEffect(() => {
    if (selectedCuisine === 'all') {
      setFilteredImages(images);
    } else {
      // 这里可以根据实际数据结构进行筛选
      // 目前是示例实现，实际应用中需要为每个图片添加菜系标签
      const filtered = images.filter(image => {
        // 根据城市名称简单匹配菜系（示例）
        switch(selectedCuisine) {
          case 'lu': return ['济南', '青岛', '烟台'].includes(image.alt);
          case 'chuan': return ['成都', '重庆'].includes(image.alt);
          case 'yue': return ['广州', '深圳', '香港'].includes(image.alt);
          case 'su': return ['南京', '苏州', '扬州'].includes(image.alt);
          case 'zhe': return ['杭州', '宁波', '温州'].includes(image.alt);
          case 'min': return ['福州', '厦门', '泉州'].includes(image.alt);
          case 'xiang': return ['长沙', '湘潭', '岳阳'].includes(image.alt);
          case 'hui': return ['合肥', '黄山'].includes(image.alt);
          default: return true;
        }
      });
      setFilteredImages(filtered);
    }
  }, [selectedCuisine, images]);

  // 组件已经直接在UI中显示行数和图片数量

  return (
    <div className="w-full overflow-y-auto max-h-[80vh]">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-jade-green"></div>
        </div>
      ) : (
        <div className="space-y-8 pb-8">
          {/* 八大菜系按钮 - 纯文字版 */}
          <div className="mb-4 bg-white/80 backdrop-blur-sm mx-2 py-2 sticky top-0 z-10">
            <div className="flex flex-wrap justify-center gap-4">
              {chineseCuisines.map((cuisine) => (
                <span
                  key={cuisine.id}
                  onClick={() => setSelectedCuisine(cuisine.id)}
                  className={`cursor-pointer text-sm transition-colors duration-300 ${
                    selectedCuisine === cuisine.id
                      ? 'selected-cuisine text-jade-green font-bold border-b-2 border-jade-green'
                      : 'text-gray-700 hover:text-jade-green'
                  }`}
                >
                  {cuisine.name}
                </span>
              ))}
            </div>
          </div>

          {/* 只显示前7行图片，每行5张 */}
          {filteredImages.length > 0 ? (
            Array.from({ length: Math.min(7, Math.ceil(filteredImages.length / 5)) }).map((_, rowIndex) => {
              const rowImages = filteredImages.slice(rowIndex * 5, rowIndex * 5 + 5);

              return (
                <div key={`row-${rowIndex}`} className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {rowImages.map((image) => (
                      <div
                        key={image.id}
                        className="image-card hover-frame-effect"
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
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 20vw"
                            className="object-cover"
                            style={{ objectPosition: 'center' }}
                            loading="eager"
                            priority={rowIndex < 2} // 优先加载前两行
                          />
                        </div>
                        <div className="mt-2 text-center text-sm font-medium">
                          {image.alt}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">没有找到相关菜系的图片</p>
            </div>
          )}
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

        /* 八大菜系文字样式 */
        .flex span {
          transition: all 0.3s ease;
          position: relative;
        }

        .flex span:hover {
          transform: translateY(-1px);
          color: var(--color-jade-green);
        }

        .flex span:active {
          transform: translateY(0);
        }

        /* 确保选中的菜系显示为翡翠绿色 */
        .text-jade-green {
          color: var(--color-jade-green) !important;
        }

        .border-jade-green {
          border-color: var(--color-jade-green) !important;
        }

        .selected-cuisine {
          color: #2E8B57 !important;
          border-bottom: 2px solid #2E8B57 !important;
        }
      `}</style>
    </div>
  );
};

// Placeholder component for regional cuisines with nested tabs
const RegionalCuisines = () => {
  // 内容已清空，仅保留 tab 结构
  return <div className="text-gray-400 text-center py-16">内容已清空</div>;
};

// Placeholder component for traditional recipes
const TraditionalRecipes = () => {
  // 内容已清空，仅保留 tab 结构
  return <div className="text-gray-400 text-center py-16">内容已清空</div>;
};

// Component for food culture information (reusing existing content)
const FoodCulture = () => {
  // 内容已清空，仅保留 tab 结构
  return <div className="text-gray-400 text-center py-16">内容已清空</div>;
};

export default function FoodPage() {
  // Define the new tab structure
  const tabs = [
    {
      title: "美食图片墙",
      content: <FoodImageWall />,
    },
    {
      title: "地方菜系",
      content: <RegionalCuisines />,
    },
    {
      title: "传统食谱",
      content: <TraditionalRecipes />,
    },
    {
      title: "美食文化",
      content: <FoodCulture />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col texture-subtle">
      <ChinawordsNavigation links={navigationLinks} />

      <main className="flex-grow pt-12 flex flex-col">
        <div className="flex flex-col flex-grow">
          <div className="flex flex-col gap-y-6 flex-grow">
            <TabComponent tabs={tabs} />
          </div>
        </div>
      </main>
    </div>
  );
}
