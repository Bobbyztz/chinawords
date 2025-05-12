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
  const [images, setImages] = useState<FoodImage[]>([
    {
      id: "placeholder",
      src: "/images/placeholder.svg",
      alt: "占位图片",
      author: "系统",
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { ref: bottomScrollRef, inView: isBottomVisible } = useInView({
    threshold: 0,
    rootMargin: "300px 0px",
  });

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

export default SettingsImageWall;
