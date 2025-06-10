"use client";

import React, { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
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

interface SettingsImageWallProps {
  showUploadButton?: boolean;
  filterOptions: Array<{ id: string; name: string }>;
  mainCategory: "likes" | "collected" | "owned";
}

const filterToApi: Record<string, string> = {
  likes: "/api/assets/liked",
  collected: "/api/assets/collected",
  owned: "/api/assets/owned",
};

function getApiByFilterId(filterId: string): string {
  return filterToApi[filterId] || filterToApi.owned;
}

export function SettingsImageWall({
  showUploadButton = false,
  filterOptions,
  mainCategory,
}: SettingsImageWallProps) {
  console.log(
    "[SettingsImageWall] Received filterOptions prop:",
    JSON.stringify(filterOptions)
  );

  const [images, setImages] = useState<FoodImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>(() => {
    const initialId = filterOptions?.[0]?.id || "all";
    console.log(
      `[SettingsImageWall] Initializing selectedFilter with: ${initialId} (derived from filterOptions[0]?.id or default 'all')`
    );
    return initialId;
  });
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // 获取当前 tab 名称（通过 window.location.hash 或 props 传递更优，这里假设用 filterOptions[0].name 作为 tab 名）
  // 你可以根据实际 tab 传递方式调整 getApiByTab 的参数
  // const [tabName, setTabName] = useState<string>("");
  // useEffect(() => {
  //   // 尝试从父组件传递 tab 名称，或用 URL/hash 判断
  //   // 这里假设用 document.title 或 filterOptions[0].name
  //   setTabName(document.title || "我的财产");
  // }, []);

  useEffect(() => {
    let ignore = false;
    async function fetchImages() {
      setIsLoading(true);
      const apiUrl = getApiByFilterId(mainCategory);
      console.log(
        `[SettingsImageWall] Attempting to fetch: ${apiUrl}, mainCategory: ${mainCategory}, selectedFilter (for sub-filtering): ${selectedFilter}`
      );
      try {
        const res = await fetch(apiUrl, { credentials: "include" });
        if (!res.ok) {
          const errorText = await res.text();
          console.error(
            `[SettingsImageWall] Fetch error: ${res.status} ${res.statusText} for ${apiUrl}. Response: ${errorText}`
          );
          throw new Error(`获取图片失败: ${res.status}`);
        }
        const data = await res.json();
        if (ignore) return;
        interface ApiImage {
          id: string;
          fileUri: string;
          title: string;
          owner?: { username?: string };
          prompt?: string;
        }
        const mapped: FoodImage[] = (data || []).map((item: ApiImage) => ({
          id: item.id,
          src: item.fileUri,
          alt: item.title,
          author: item.owner?.username || "",
          prompt: item.prompt,
        }));
        setImages(mapped);
      } catch (error) {
        console.error("[SettingsImageWall] Error in fetchImages:", error);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
    return () => {
      ignore = true;
    };
  }, [mainCategory, selectedFilter]);

  const handleOpenUploadModal = () => setIsUploadModalOpen(true);
  const handleCloseUploadModal = () => setIsUploadModalOpen(false);

  const handleUpload = async (file: File, prompt: string, altText: string) => {
    try {
      const { upload } = await import("@vercel/blob/client");
      setIsLoading(true);
      const sessionResponse = await fetch("/api/auth/session");
      const sessionData = await sessionResponse.json();
      const userId = sessionData?.user?.id;
      if (!userId) throw new Error("您需要登录才能上传图片");
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
        alert(`上传失败: ${error.message}`);
      } else {
        alert("上传失败，请重试");
      }
      setIsLoading(false);
    }
  };

  // 可爱空状态文案
  function getEmptyText() {
    if (mainCategory === "likes") return "暂无点赞，快去心动一张吧！";
    if (mainCategory === "collected")
      return "还没有收藏，遇到喜欢的就收进小口袋吧！";
    if (mainCategory === "owned")
      return "你还没有上传任何作品，快来创造你的第一个宝藏吧！";
    return "这里空空如也，快去发现更多精彩吧！";
  }

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
            <div className="cuisine-filter flex items-center space-x-3 pl-24">
              {(filterOptions || []).map((option) => (
                <span
                  key={option.id}
                  onClick={() => {
                    console.log(
                      `[SettingsImageWall] Tab clicked. option.id: "${option.id}", option.name: "${option.name}". Calling setSelectedFilter with "${option.id}".`
                    );
                    setSelectedFilter(option.id);
                  }}
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
      <FoodImageGrid
        images={images}
        isLoading={isLoading}
        emptyText={getEmptyText()}
      />
      <FoodImageStyles />
      <ImageUploadModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        onUpload={handleUpload}
      />
    </div>
  );
}

export default SettingsImageWall;
