"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Star, Copy, Download } from "lucide-react";

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
  const [isFlashing, setIsFlashing] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = alt;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to download image:', err);
    }
  };

  const handleCopyPrompt = async () => {
    const textToCopy =
      prompt || "This is placeholder text for image description.";
    try {
      await navigator.clipboard.writeText(textToCopy);
      // Optional: Add some feedback to the user, e.g., a toast notification
      console.log("Prompt copied to clipboard!");

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
    }
  };

  return (
    <div className="image-card relative rounded-lg overflow-hidden cursor-pointer group">
      {/* Image container */}
      <div className="aspect-ratio-container relative w-full overflow-hidden flex-1 min-h-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority={priority}
          className={`transition-opacity duration-50 ${
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
      {/* Tailwind classes for layout (relative, text-center, font sizes) remain. */}
      {/* bg-white, opacity, and opacity transitions will be handled by FoodImageStyles.tsx */}
      {/* py-2 removed to reduce height */}
      <div className="image-caption-area relative text-center text-xs md:text-sm lg:text-sm font-medium">
        {/* Alt text - visible by default */}
        <span className="alt-text-display">{alt}</span>

        {/* Icons - hidden by default, visible on hover, positioned absolutely within this container */}
        {/* Tailwind classes for layout (absolute, inset-0, flex, items-center, justify-center, gap-3) remain. */}
        <div className="caption-hover-icons absolute inset-0 flex justify-center items-center gap-6 ">
          <Heart
            size={14}
            className="cursor-pointer hover:text-red-500 pointer-events-auto"
          />
          <Star
            size={14}
            className="cursor-pointer hover:text-yellow-500 pointer-events-auto"
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
