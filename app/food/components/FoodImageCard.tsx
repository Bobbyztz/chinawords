"use client";

import React from "react";
import Image from "next/image";

interface FoodImageProps {
  id: string;
  src: string;
  alt: string;
  priority?: boolean;
  author?: string;
  prompt?: string;
}

const FoodImageCard: React.FC<FoodImageProps> = ({
  id,
  src,
  alt,
  priority = false,
  author,
  prompt,
}) => {
  return (
    <div
      className="image-card relative rounded-lg overflow-hidden cursor-pointer"
    >
      
      {/* Aspect ratio container for the image */}
      <div className="aspect-ratio-container relative w-full overflow-hidden flex-1 min-h-0">
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          style={{ objectPosition: "center" }}
          loading="eager"
          priority={priority}
        />
      </div>
      
      {/* Image Title */}
      <div className="mt-1 mb-0.5 text-center text-xs md:text-sm lg:text-sm font-medium">
        {alt}
      </div>
    </div>
  );
};

export default FoodImageCard;
