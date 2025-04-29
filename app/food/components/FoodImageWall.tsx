"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Plus } from "lucide-react";

interface FoodImage {
  id: string;
  src: string;
  alt: string;
  author?: string;
  prompt?: string;
}

// 八大菜系数据
const chineseCuisines = [
  { id: "all", name: "全部菜系" },
  { id: "lu", name: "鲁菜" },
  { id: "chuan", name: "川菜" },
  { id: "yue", name: "粤菜" },
  { id: "su", name: "苏菜" },
  { id: "xi", name: "湘菜" },
  { id: "min", name: "闽菜" },
  { id: "sui", name: "徽菜" },
  { id: "zhe", name: "浙菜" },
];

const FoodImageWall: React.FC = () => {
  const [images, setImages] = useState<FoodImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCuisine, setSelectedCuisine] = useState<string>("all");

  // 获取所有美食图片
  useEffect(() => {
    // 美食图片列表
    const foodImages = [
      { file: "上海.png", name: "上海" },
      { file: "兰州.png", name: "兰州" },
      { file: "南京.png", name: "南京" },
      { file: "南宁.png", name: "南宁" },
      { file: "南昌.png", name: "南昌" },
      { file: "台北.png", name: "台北" },
      { file: "合肥.png", name: "合肥" },
      { file: "天津.png", name: "天津" },
      { file: "太原.png", name: "太原" },
      { file: "广州.png", name: "广州" },
      { file: "成都.png", name: "成都" },
      { file: "拉萨.png", name: "拉萨" },
      { file: "昆明.png", name: "昆明" },
      { file: "杭州.png", name: "杭州" },
      { file: "武汉.png", name: "武汉" },
      { file: "沈阳.png", name: "沈阳" },
      { file: "济南.png", name: "济南" },
      { file: "海口.png", name: "海口" },
      { file: "澳门.png", name: "澳门" },
      { file: "石家庄.png", name: "石家庄" },
      { file: "福州.png", name: "福州" },
      { file: "西宁.png", name: "西宁" },
      { file: "西安.png", name: "西安" },
      { file: "贵阳.png", name: "贵阳" },
      { file: "郑州.png", name: "郑州" },
      { file: "重庆.png", name: "重庆" },
      { file: "银川.png", name: "银川" },
      { file: "长春.png", name: "长春" },
      { file: "长沙.png", name: "长沙" },
      { file: "香港.png", name: "香港" },
      { file: "哈尔滨.png", name: "哈尔滨" },
      { file: "乌鲁木齐.png", name: "乌鲁木齐" },
      { file: "呼和浩特.png", name: "呼和浩特" },
    ];

    // 创建图片对象
    const foodImageObjects = foodImages.map((img, index) => ({
      id: `food-${index}`,
      src: `/34个省级行政区-美食/${img.file}`,
      alt: img.name,
    }));

    // 预加载图片
    const preloadImages = async () => {
      const promises = foodImageObjects.map((img) => {
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
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);

      // 设置图片并完成加载
      setImages(foodImageObjects);
      setIsLoading(false);
    };

    // 开始预加载
    preloadImages();
  }, []);

  // 保留菜系按钮的选择状态，但不再进行筛选
  // 移除了筛选逻辑，现在始终显示所有图片

  return (
    <div
      className="w-full overflow-y-auto h-full"
      style={{ minHeight: "calc(90vh - 100px)" }}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-jade-green"></div>
        </div>
      ) : (
        <div className="space-y-8 pb-8 h-full">
          {/* 八大菜系按钮 - 纯文字版 */}
          <div className="mb-4 bg-white/80 backdrop-blur-sm py-2 sticky top-0 z-10 w-auto">
            <div className="flex items-center justify-between px-4 w-full">
              {/* 左侧容器：搜索框和菜系选择 */}
              <div className="flex items-center space-x-8">
                {/* 搜索框 - 左边 */}
                <div className="inline-flex items-center border-b-2 border-[#2e8b57] pb-0">
                  <Search className="h-5 w-5 text-[#2e8b57] mr-2" />
                  <input
                    type="text"
                    className="outline-none text-sm bg-transparent w-96"
                    placeholder="搜索美食..."
                  />
                </div>

                {/* 八大菜系 - 中间 */}
                <div className="flex items-center space-x-3 pl-24">
                  {chineseCuisines.map((cuisine) => (
                    <span
                      key={cuisine.id}
                      onClick={() => setSelectedCuisine(cuisine.id)}
                      className={`cursor-pointer text-sm transition-colors duration-300 py-0 ${
                        selectedCuisine === cuisine.id
                          ? "border-b-2 border-[#2e8b57] text-[#2e8b57] font-bold"
                          : "text-gray-700 hover:text-[#2e8b57]"
                      }`}
                    >
                      {cuisine.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* 上传按钮 - 右侧 */}
              <div className="ml-auto">
                <button className="upload-button flex hover:cursor-pointer font-bold items-center gap-1 py-0.5 px-2 rounded-full text-xs">
                  <Plus className="h-3 w-3" />
                  <span>上传资料</span>
                </button>
              </div>
            </div>
          </div>

          {/* 显示图片，确保填充可用空间 */}
          {images.length > 0 ? (
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className="image-card relative group hover-frame-effect rounded-lg overflow-hidden cursor-pointer"
                  >
                    {/* Tape effect */}
                    <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 -rotate-3 w-10 h-8 bg-yellow-200/50 z-10 tape-top" />
                    {/* Aspect ratio container for the image */}
                    <div className="aspect-ratio-container relative w-full overflow-hidden flex-1 min-h-0">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        layout="fill"
                        objectFit="cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        style={{ objectPosition: "center" }}
                        loading="eager"
                        priority={index < 8}
                      />
                    </div>
                    {/* Image Title */}
                    <div className="mt-2 text-center text-sm font-medium">
                      {image.alt}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">没有找到相关菜系的图片</p>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        :root {
          --color-jade-green-dark: #1a6840; /* 深翡翠绿色，用于hover和focus状态 */
        }

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
          height: 100%;
          animation: fadeIn 0.6s cubic-bezier(0.26, 0.53, 0.74, 1.48);
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
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
          padding-bottom: 85%; /* Reduced from 100% to make images shorter */
          overflow: hidden;
          flex: 1;
          min-height: 0; /* Important for flex containers */
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

        /* 占位符样式 */
        input::placeholder {
          color: #999;
          opacity: 0.7;
        }

        /* 上传按钮样式 */
        .upload-button {
          color: #2e8b57;
          background-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default FoodImageWall;
