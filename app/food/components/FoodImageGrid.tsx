"use client";

import React from "react";
import FoodImageCard from "./FoodImageCard";

interface FoodImage {
  id: string;
  src: string;
  alt: string;
  author?: string;
  prompt?: string;
}

interface FoodImageGridProps {
  images: FoodImage[];
  isLoading: boolean;
  emptyText?: string;
}

const FoodImageGrid: React.FC<FoodImageGridProps> = ({
  images,
  isLoading,
  emptyText,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-jade-green"></div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <span className="text-3xl mb-2">🍥</span>
        <p className="text-gray-500 text-base font-mono">
          {emptyText || "没有找到相关菜系的图片"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8 h-full">
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <FoodImageCard
              key={image.id}
              id={image.id}
              src={image.src}
              alt={image.alt}
              prompt={image.prompt}
              priority={index < 10 && !image.id.startsWith("uploaded-")}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodImageGrid;
