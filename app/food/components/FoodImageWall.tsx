"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, AlertCircle } from "lucide-react";
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

interface AssetFromDB {
  id: number;
  ownerId: number;
  title: string;
  prompt: string | null;
  mediaType: number;
  fileUri: string;
  createdAt: string;
  owner?: {
    id: number;
    username: string;
  };
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
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 获取所有美食图片
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        
        // 从API获取图片
        const response = await fetch('/api/assets');
        
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        
        const assets: AssetFromDB[] = await response.json();
        
        // 过滤出图片类型的资产（mediaType = 0）
        const imageAssets = assets.filter(asset => asset.mediaType === 0);
        
        if (imageAssets.length === 0) {
          setIsLoading(false);
          setErrorMessage('暂无图片数据');
          return;
        }
        
        // 将资产转换为FoodImage格式
        const foodImageObjects: FoodImage[] = imageAssets.map(asset => ({
          id: `db-${asset.id}`,
          src: asset.fileUri,
          alt: asset.title,
          prompt: asset.prompt || undefined,
          author: asset.owner?.username
        }));
        
        // 应用随机排序算法
        const randomizedImages = randomizeImages(foodImageObjects);
        
        // 设置图片并完成加载
        setImages(randomizedImages);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setErrorMessage('获取图片失败，请刷新页面重试');
        setIsLoading(false);
      }
    };
    
    fetchImages();
  }, []);
  
  // 随机排序图片的函数
  const randomizeImages = (images: FoodImage[]): FoodImage[] => {
    // 处理边缘情况：如果图片数量少于2张，直接返回原数组
    if (images.length < 2) {
      return images;
    }
    
    // Fisher-Yates洗牌算法
    const shuffled = [...images];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  };

  // 保留菜系按钮的选择状态，但不再进行筛选
  // 移除了筛选逻辑，现在始终显示所有图片

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleUpload = async (file: File, prompt: string, altText: string) => {
    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('prompt', prompt);
      formData.append('altText', altText);
      
      // Upload to server
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to upload image');
      }
      
      console.log('Upload successful:', result);
      
      // Add the newly uploaded image to the images array
      if (result.success && result.asset) {
        const newImage: FoodImage = {
          id: `uploaded-${result.asset.id}`,
          src: result.asset.url,
          alt: result.asset.title,
          prompt: result.asset.prompt,
          author: 'You' // Indicating this was uploaded by the current user
        };
        
        setImages(prevImages => [newImage, ...prevImages]);
      }
      
      // Close modal after successful upload
      handleCloseUploadModal();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('上传失败，请重试');
      // Keep modal open so user can try again
    }
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

      {errorMessage ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <AlertCircle className="h-12 w-12 mb-4" />
          <p>{errorMessage}</p>
        </div>
      ) : (
        <FoodImageGrid images={images} isLoading={isLoading} />
      )}

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
