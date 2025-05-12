"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, Plus, AlertCircle } from "lucide-react";
import { useInView } from "react-intersection-observer";
import FoodImageGrid from "../../food/components/FoodImageGrid";
import FoodImageStyles from "../../food/components/FoodImageStyles";
import ImageUploadModal from "../../food/components/ImageUploadModal";

interface FoodImage {
  id: string;
  src: string;
  alt: string;
  author?: string;
  prompt?: string;
}

interface ApiAsset {
  id: string;
  title: string;
  prompt?: string;
  fileUri: string;
  owner?: {
    id: string;
    username: string;
  };
}

interface SettingsImageWallProps {
  showUploadButton?: boolean;
  filterOptions: Array<{ id: string; name: string }>;
}

const SettingsImageWall: React.FC<SettingsImageWallProps> = ({
  showUploadButton = false,
  filterOptions,
}) => {
  const [images, setImages] = useState<FoodImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [loadedImageIds, setLoadedImageIds] = useState<Set<string>>(new Set());
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { ref: bottomScrollRef, inView: isBottomVisible } = useInView({
    threshold: 0,
    rootMargin: "300px 0px",
  });

  const fetchMoreImages = useCallback(
    async (isInitialLoad = false) => {
      if (isLoading || (!hasMore && !isInitialLoad)) return;

      setIsLoading(true);
      if (isInitialLoad) {
        setImages([]);
        setLoadedImageIds(new Set());
        setErrorMessage("");
      }

      try {
        const excludeIdsString = Array.from(loadedImageIds).join(",");
        const response = await fetch(
          `/api/assets?count=12&excludeIds=${excludeIdsString}`,
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
          } catch (_error) {
            // Ignore if cannot parse error JSON
          }
          throw new Error(`API Error: ${response.status} - ${apiErrorMsg}`);
        }

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
          setIsLoading(false);
          return;
        }

        const fetchedApiAssets = result.data;
        const moreAvailable = result.hasMore;

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
        setLoadedImageIds((prevIds) => new Set([...prevIds, ...newIds]));
        setHasMore(moreAvailable);
      } catch (error) {
        console.error("Error fetching images:", error);
        setErrorMessage(
          error instanceof Error ? error.message : "获取图片数据时发生未知错误"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, hasMore, loadedImageIds]
  );

  useEffect(() => {
    fetchMoreImages(true);
  }, []);

  useEffect(() => {
    if (isBottomVisible && hasMore && !isLoading) {
      fetchMoreImages();
    }
  }, [isBottomVisible, hasMore, isLoading, fetchMoreImages]);

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleUpload = async (file: File, prompt: string, altText: string) => {
    try {
      const { upload } = await import("@vercel/blob/client");

      setIsLoading(true);

      const sessionResponse = await fetch("/api/auth/session");
      const sessionData = await sessionResponse.json();
      const userId = sessionData?.user?.id;

      if (!userId) {
        throw new Error("您需要登录才能上传图片");
      }

      const fileExtension = file.name.split(".").pop() || "";
      const uniqueFileName = `${crypto.randomUUID()}.${fileExtension}`;

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

      await new Promise((resolve) => setTimeout(resolve, 2500));

      const newImage: FoodImage = {
        id: `uploaded-${Date.now()}`,
        src: newBlob.url,
        alt: altText,
        prompt: prompt,
        author: "You",
      };

      setImages((prevImages) => [newImage, ...prevImages]);

      handleCloseUploadModal();
    } catch (error) {
      console.error("Error uploading image:", error);
      if (error instanceof Error) {
        const errorMsg = error.message;
        alert(`上传失败: ${errorMsg}`);
      } else {
        alert("上传失败，请重试");
      }
      setIsLoading(false);
    }
  };

  return (
    <div
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
                className="outline-none text-sm bg-transparent w-96"
                placeholder="搜索..."
              />
            </div>

            <div className="flex items-center space-x-3 pl-24">
              {filterOptions.map((option) => (
                <span
                  key={option.id}
                  onClick={() => setSelectedFilter(option.id)}
                  className={`cursor-pointer text-sm py-0 ${
                    selectedFilter === option.id
                      ? "text-[#2e8b57]"
                      : "text-gray-700 hover:text-[#2e8b57]"
                  }`}
                >
                  {option.name}
                </span>
              ))}
            </div>
          </div>

          {showUploadButton && (
            <div className="ml-auto">
              <button
                onClick={handleOpenUploadModal}
                className="upload-button flex hover:cursor-pointer font-bold items-center gap-1 py-0.5 px-2 rounded-full text-xs"
              >
                <Plus className="h-3 w-3" />
                <span>上传资料</span>
              </button>
            </div>
          )}
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
        <div
          ref={bottomScrollRef}
          className="h-10 flex justify-center items-center"
        >
          {isLoading && images.length > 0 && <p>正在加载更多...</p>}
        </div>
      )}
      {!hasMore && images.length > 0 && !errorMessage && (
        <div className="text-center py-4 text-gray-500">
          <p>已经到底啦！</p>
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

export default SettingsImageWall;
