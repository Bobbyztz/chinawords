"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { Search, Plus, AlertCircle } from "lucide-react";
import FoodImageGrid from "./FoodImageGrid";
import FoodImageStyles from "./FoodImageStyles";
import ImageUploadModal from "./ImageUploadModal";

// Updated FoodImage interface to align better with API response (AssetWithOwner)
interface FoodImage {
  id: string;
  src: string;
  alt: string;
  author?: string; // from owner.username
  prompt?: string;
}

// Minimal type for the raw asset data received from the API
interface ApiAsset {
  id: string;
  fileUri: string;
  title: string;
  prompt: string | null;
  owner?: {
    username: string | null;
  };
  // Add other fields from AssetWithOwner if they were to be used before mapping
}

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCuisine, setSelectedCuisine] = useState<string>("all");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loadedImageIds, setLoadedImageIds] = useState<Set<string>>(new Set());
  const [hasMore, setHasMore] = useState<boolean>(true);

  // 使用ref来避免在useCallback中依赖变化的状态
  const loadedImageIdsRef = useRef<Set<string>>(new Set());
  const isLoadingRef = useRef<boolean>(false);
  const hasMoreRef = useRef<boolean>(true);

  // 使用useSession
  const { data: session } = useSession();

  // 滚动容器的ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 更新ref值
  useEffect(() => {
    loadedImageIdsRef.current = loadedImageIds;
  }, [loadedImageIds]);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  const fetchMoreImages = useCallback(
    async (isInitialLoad = false) => {
      // 使用ref值来避免闭包问题
      if (isLoadingRef.current || (!hasMoreRef.current && !isInitialLoad)) {
        return;
      }

      setIsLoading(true);
      if (isInitialLoad) {
        setImages([]);
        setLoadedImageIds(new Set());
        loadedImageIdsRef.current = new Set();
        setErrorMessage("");
        setHasMore(true);
        hasMoreRef.current = true;
      }

      try {
        const excludeIdsString = Array.from(loadedImageIdsRef.current).join(
          ","
        );
        const response = await fetch(
          `/api/assets?count=20&excludeIds=${excludeIdsString}`,
          {
            headers: {
              "Cache-Control": "no-cache, no-store, must-revalidate",
            },
          }
        );

        if (!response.ok) {
          let apiErrorMsg = "获取图片失败";
          try {
            const errorResult = await response.json();
            if (errorResult && errorResult.error) {
              apiErrorMsg = errorResult.error;
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (_error) {
            // Ignore if cannot parse error JSON
          }
          throw new Error(`API Error: ${response.status} - ${apiErrorMsg}`);
        }

        // Type assertion based on the API's response structure
        const result = (await response.json()) as {
          data: ApiAsset[];
          hasMore: boolean;
        };

        if (!result || !result.data) {
          setErrorMessage(
            isInitialLoad &&
              (!result || !result.data || result.data.length === 0)
              ? "暂无图片数据"
              : "未能加载更多图片"
          );
          setHasMore(false);
          hasMoreRef.current = false;
          setIsLoading(false);
          return;
        }

        const fetchedApiAssets = result.data;
        const moreAvailable = result.hasMore;

        // Map API assets to FoodImage structure
        const newImages: FoodImage[] = fetchedApiAssets.map((asset) => ({
          id: asset.id,
          src: asset.fileUri,
          alt: asset.title,
          prompt: asset.prompt || undefined,
          author: asset.owner?.username || undefined,
        }));

        if (newImages.length === 0 && isInitialLoad) {
          setErrorMessage("暂无图片数据");
        } else if (newImages.length === 0 && !isInitialLoad) {
          // No new images returned on subsequent loads
        } else {
          setErrorMessage("");
        }

        setImages((prevImages) =>
          isInitialLoad ? newImages : [...prevImages, ...newImages]
        );

        const newIds = new Set(newImages.map((img) => img.id));
        const updatedIds = new Set([...loadedImageIdsRef.current, ...newIds]);
        setLoadedImageIds(updatedIds);
        loadedImageIdsRef.current = updatedIds;

        setHasMore(moreAvailable);
        hasMoreRef.current = moreAvailable;
      } catch (error) {
        console.error("Error fetching images:", error);
        setErrorMessage(
          error instanceof Error ? error.message : "获取图片数据时发生未知错误"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [] // 移除所有依赖，使用ref来访问最新状态
  );

  // 滚动事件处理
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || isLoadingRef.current || !hasMoreRef.current) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = container;
    // 当滚动到距离底部200px时开始加载
    const threshold = 200;

    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      fetchMoreImages();
    }
  }, [fetchMoreImages]);

  // 初始加载
  useEffect(() => {
    fetchMoreImages(true);
  }, []); // 只在组件挂载时执行一次

  // 绑定滚动事件
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // 使用节流来优化性能
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", throttledHandleScroll, {
      passive: true,
    });
    return () => {
      container.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [handleScroll]);

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleUpload = async (
    files: File[],
    prompt: string,
    altText: string
  ) => {
    try {
      const { upload } = await import("@vercel/blob/client");
      const userId = session?.user?.id;

      if (!userId) {
        throw new Error("您需要登录才能上传图片");
      }

      // 并行上传所有文件
      const uploadPromises = files.map(async (file, index) => {
        const fileExtension = file.name.split(".").pop() || "";
        const uniqueFileName = `${crypto.randomUUID()}.${fileExtension}`;

        console.log(
          `原始文件名: ${file.name}, 生成的唯一文件名: ${uniqueFileName}`
        );

        const newBlob = await upload(uniqueFileName, file, {
          access: "public",
          handleUploadUrl: "/api/upload-url",
          clientPayload: JSON.stringify({
            prompt,
            altText,
            userId,
            originalFilename: file.name,
          }),
        });

        return {
          id: `uploaded-${Date.now()}-${index}`,
          src: newBlob.url,
          alt: altText,
          prompt: prompt,
          author: "You",
        } as FoodImage;
      });

      // 等待所有文件上传完成
      const uploadedImages = await Promise.all(uploadPromises);

      // 添加延迟以确保后端处理完成
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // 将所有新图片添加到列表开头
      setImages((prevImages) => [...uploadedImages, ...prevImages]);
    } catch (error) {
      console.error("Error uploading images:", error);
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="w-full overflow-y-auto h-full"
      style={{ minHeight: "calc(90vh - 100px)" }}
    >
      <div className="mb-4 backdrop-blur-sm py-2 sticky top-0 z-10 w-auto">
        <div className="flex items-center justify-between px-4 w-full">
          <div className="flex items-center space-x-8">
            <div className="inline-flex items-center border-b-2 border-[#2e8b57] pb-0">
              <Search className="h-5 w-5 text-[#2e8b57] mr-2" />
              <input
                type="text"
                className="outline-none text-sm bg-transparent w-96 placeholder:text-gray-500 placeholder:opacity-70"
                placeholder="搜索美食..."
              />
            </div>

            <div className="flex items-center space-x-3 pl-24">
              {chineseCuisines.map((cuisine) => (
                <span
                  key={cuisine.id}
                  onClick={() => setSelectedCuisine(cuisine.id)}
                  className={`relative cursor-pointer text-sm py-0 ${
                    selectedCuisine === cuisine.id
                      ? "text-jade-green"
                      : "text-gray-700 hover:text-jade-green"
                  }`}
                >
                  {cuisine.name}
                </span>
              ))}
            </div>
          </div>

          <div className="ml-auto">
            <button
              onClick={handleOpenUploadModal}
              className="text-jade-green bg-transparent flex hover:cursor-pointer font-bold items-center gap-1 py-0.5 px-2 rounded-full text-xs"
            >
              <Plus className="h-3 w-3" />
              <span>上传资料</span>
            </button>
          </div>
        </div>
      </div>

      {errorMessage && !isLoading && images.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <AlertCircle className="h-12 w-12 mb-4" />
          <p>{errorMessage}</p>
        </div>
      ) : (
        <FoodImageGrid
          images={images}
          isLoading={isLoading && images.length === 0}
        />
      )}

      {hasMore && !errorMessage && (
        <div className="h-10 flex justify-center items-center">
          {isLoading && images.length > 0 && <p>正在加载更多美食...</p>}
        </div>
      )}

      {!hasMore && images.length > 0 && !errorMessage && (
        <div className="text-center py-4 text-gray-500">
          <p>所有美食都看遍啦！</p>
        </div>
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
