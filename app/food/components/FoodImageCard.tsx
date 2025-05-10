"use client";

import React from "react";
import Image from "next/image";
import { Heart, Star, Copy } from "lucide-react";

interface FoodImageProps {
  id: string;
  src: string;
  alt: string;
  priority?: boolean;
  prompt?: string;
}

const FoodImageCard: React.FC<FoodImageProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id: _id,
  src,
  alt,
  priority = false,
  prompt,
}) => {
  return (
    <div className="image-card relative rounded-lg overflow-hidden cursor-pointer group">
      {/* Image container */}
      <div className="aspect-ratio-container relative w-full overflow-hidden flex-1 min-h-0">
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          style={{ objectPosition: "center" }}
          priority={priority}
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
      {/* Tailwind classes for layout (relative, text-center, font sizes) remain. */}
      {/* bg-white, opacity, and opacity transitions will be handled by FoodImageStyles.tsx */}
      {/* py-2 removed to reduce height */}
      <div className="image-caption-area relative text-center text-xs md:text-sm lg:text-sm font-medium">
        {/* Alt text - visible by default */}
        <span className="alt-text-display">{alt}</span>

        {/* Icons - hidden by default, visible on hover, positioned absolutely within this container */}
        {/* Tailwind classes for layout (absolute, inset-0, flex, items-center, justify-center, gap-3) remain. */}
        <div className="caption-hover-icons absolute inset-0 flex justify-center items-center gap-6 pointer-events-none">
          <Heart size={14} className="cursor-pointer hover:text-red-500" />
          <Star size={14} className="cursor-pointer hover:text-yellow-500" />
          <Copy size={14} className="cursor-pointer hover:text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default FoodImageCard;
