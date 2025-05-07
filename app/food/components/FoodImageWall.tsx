"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import FoodImageGrid from "./FoodImageGrid";
import FoodImageStyles from "./FoodImageStyles";
import ImageUploadModal from './ImageUploadModal';

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
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

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

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleUpload = (file: File, prompt: string, altText: string) => {
    console.log('Uploading image:', file.name, 'Prompt:', prompt, 'Alt:', altText);
    // Implement actual upload logic here
    // For example, call an API endpoint
    // After successful upload, you might want to refresh the image list
    handleCloseUploadModal(); // Close modal after handling upload
  };

  return (
    <div
      className="w-full overflow-y-auto h-full"
      style={{ minHeight: "calc(90vh - 100px)" }}
    >
      <div className="mb-4 backdrop-blur-sm  py-2 sticky top-0 z-10 w-auto">
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
                  className={`cursor-pointer text-sm py-0 ${
                    selectedCuisine === cuisine.id
                      ? "text-[#2e8b57] bg-white/20 backdrop-blur-md"
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
            <button
              onClick={handleOpenUploadModal}
              className="upload-button flex hover:cursor-pointer font-bold items-center gap-1 py-0.5 px-2 rounded-full text-xs"
            >
              <Plus className="h-3 w-3" />
              <span>上传资料</span>
            </button>
          </div>
        </div>
      </div>

      <FoodImageGrid images={images} isLoading={isLoading} />

      <FoodImageStyles />

      <ImageUploadModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default FoodImageWall;
