"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, Star, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { useAssetStatus } from "@/app/contexts/AssetStatusContext";

interface FoodImageProps {
  id: string;
  src: string;
  alt: string;
  priority?: boolean;
  prompt?: string;
}

const FoodImageCard: React.FC<FoodImageProps> = ({
  id,
  src,
  alt,
  priority = false,
  prompt,
}) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isCollected, setIsCollected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Use AssetStatus context for optimized status management
  const { getAssetStatus, fetchAssetStatus, updateAssetStatus } =
    useAssetStatus();

  useEffect(() => {
    // Check cache first, then fetch if needed
    const loadAssetStatus = async () => {
      try {
        // Try to get from cache first
        const cachedStatus = getAssetStatus(id);
        if (cachedStatus) {
          setIsLiked(cachedStatus.isLiked);
          setIsCollected(cachedStatus.isCollected);
          setIsAuthenticated(cachedStatus.isAuthenticated);
          return;
        }

        // If not in cache, fetch (but this should be rare due to batch preloading)
        const status = await fetchAssetStatus(id);
        setIsLiked(status.isLiked);
        setIsCollected(status.isCollected);
        setIsAuthenticated(status.isAuthenticated);
      } catch (error) {
        console.error("Error loading asset status:", error);
      }
    };

    loadAssetStatus();
  }, [id, getAssetStatus, fetchAssetStatus]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error("请先登录再操作");
      return;
    }

    try {
      const response = await fetch("/api/assets/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assetId: id }),
      });

      if (response.ok) {
        const result = await response.json();
        const newLikedState = result.action === "liked";
        setIsLiked(newLikedState);

        // Update the context cache
        updateAssetStatus(id, { isLiked: newLikedState });

        toast.success(
          result.action === "liked" ? "已添加到喜欢" : "已取消喜欢"
        );
      } else {
        const error = await response.json();
        toast.error(error.error || "操作失败");
      }
    } catch (error) {
      console.error("Error liking asset:", error);
      toast.error("网络错误，请稍后再试");
    }
  };

  const handleCollect = async () => {
    if (!isAuthenticated) {
      toast.error("请先登录再操作");
      return;
    }

    try {
      const response = await fetch("/api/assets/collect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assetId: id }),
      });

      if (response.ok) {
        const result = await response.json();
        const newCollectedState = result.action === "collected";
        setIsCollected(newCollectedState);

        // Update the context cache
        updateAssetStatus(id, { isCollected: newCollectedState });

        toast.success(
          result.action === "collected" ? "已加入收藏" : "已取消收藏"
        );
      } else {
        const error = await response.json();
        toast.error(error.error || "操作失败");
      }
    } catch (error) {
      console.error("Error collecting asset:", error);
      toast.error("网络错误，请稍后再试");
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = alt;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Failed to download image:", err);
    }
  };

  const handleCopyPrompt = async () => {
    const textToCopy =
      prompt || "This is placeholder text for image description.";
    try {
      await navigator.clipboard.writeText(textToCopy);
      // Optional: Add some feedback to the user, e.g., a toast notification
      toast.success("Prompt 已复制到剪贴板！");

      // Trigger flash animation
      setIsFlashing(true);
      setTimeout(() => {
        setIsFlashing(false);
        setTimeout(() => {
          setIsFlashing(true);
          setTimeout(() => {
            setIsFlashing(false);
          }, 100); // Duration of the second flash (image visible again)
        }, 100); // Delay before the second flash (image dimmed)
      }, 100); // Duration of the first flash (image visible again)
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("复制失败");
    }
  };

  return (
    <div className="image-card relative rounded-lg overflow-hidden cursor-pointer group aspect-square flex flex-col">
      {/* Image container */}
      <div className="overflow-hidden relative w-full flex-1 min-h-0 image-aspect-container">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          priority={priority}
          className={`object-cover object-center transition-opacity duration-50 ${
            isFlashing ? "opacity-50" : "opacity-100"
          }`}
        />
        {/* Container for description, handles sizing, positioning, and hover effect */}
        <div className="absolute bottom-0 left-0 w-full h-[35%] px-2 pt-2 pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 overflow-hidden">
          {/* Text element, handles text styling and line clamping */}
          <p className="text-white/90 text-xs line-clamp-4">
            {prompt
              ? prompt
              : "This is placeholder text for image description."}
          </p>
        </div>
      </div>

      {/* Container for Alt Text / Icons BELOW the image */}
      <div className="image-caption-area relative text-center text-xs md:text-sm lg:text-sm font-medium ">
        {/* Alt text - visible by default */}
        <span className="alt-text-display">{alt}</span>

        {/* Icons - hidden by default, visible on hover, positioned absolutely within this container */}
        <div className="caption-hover-icons absolute inset-0 flex justify-center items-center gap-6 ">
          <Heart
            size={14}
            className={`cursor-pointer ${
              isLiked ? "text-red-500 fill-red-500" : "hover:text-red-500"
            } pointer-events-auto`}
            onClick={handleLike}
          />
          <Star
            size={14}
            className={`cursor-pointer ${
              isCollected
                ? "text-yellow-500 fill-yellow-500"
                : "hover:text-yellow-500"
            } pointer-events-auto`}
            onClick={handleCollect}
          />
          <Copy
            size={14}
            className="cursor-pointer hover:text-blue-500 pointer-events-auto"
            onClick={handleCopyPrompt}
          />
          <Download
            size={14}
            className="cursor-pointer hover:text-green-500 pointer-events-auto"
            onClick={handleDownload}
          />
        </div>
      </div>
    </div>
  );
};

export default FoodImageCard;
