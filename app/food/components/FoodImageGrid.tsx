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
}

const FoodImageGrid: React.FC<FoodImageGridProps> = ({ images, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-jade-green"></div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">没有找到相关菜系的图片</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8 h-full">
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <FoodImageCard
              key={image.id}
              id={image.id}
              src={image.src}
              alt={image.alt}
              priority={index < 8}
              author={image.author}
              prompt={image.prompt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodImageGrid;
