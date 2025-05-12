"use client";

import React, { useState } from "react";
import { Search, Download, Copy, Heart, Star } from "lucide-react";
import Image from "next/image";

// Reuse the FoodImage interface
interface UserImage {
  id: string;
  src: string;
  alt: string;
  author?: string;
  prompt?: string;
}

// Props for the UserImageWall component
interface UserImageWallProps {
  type: "likes" | "collections" | "assets";
  title: string;
}

const UserImageCard: React.FC<{ image: UserImage }> = ({ image }) => {
  const [isFlashing, setIsFlashing] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(image.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = image.alt;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Failed to download image:", err);
      // TODO: Add user feedback for download failure
    }
  };

  const handleCopyPrompt = async () => {
    const textToCopy =
      image.prompt || "This is placeholder text for image description.";
    try {
      await navigator.clipboard.writeText(textToCopy);
      console.log("Prompt copied to clipboard!");

      // Trigger flash animation
      setIsFlashing(true);
      setTimeout(() => {
        setIsFlashing(false);
        setTimeout(() => {
          setIsFlashing(true);
          setTimeout(() => {
            setIsFlashing(false);
          }, 100);
        }, 100);
      }, 100);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // TODO: Add user feedback for copy failure
    }
  };

  // TODO: Implement actual like/favorite logic
  const handleLike = () => console.log(`Liked image: ${image.id}`);
  const handleFavorite = () => console.log(`Favorited image: ${image.id}`);

  return (
    <div className="image-card relative rounded-lg overflow-hidden cursor-pointer group">
      {/* Image container */}
      <div className="aspect-ratio-container relative w-full overflow-hidden flex-1 min-h-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority={false} // Assuming these aren't priority in settings
          className={`transition-opacity duration-50 ${
            isFlashing ? "opacity-50" : "opacity-100"
          }`}
        />
        {/* Container for description, handles sizing, positioning, and hover effect */}
        <div className="absolute bottom-0 left-0 w-full h-[35%] px-2 pt-2 pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 overflow-hidden">
          {/* Text element, handles text styling and line clamping */}
          <p className="text-white/90 text-xs line-clamp-4">
            {image.prompt || "This is placeholder text for image description."}
          </p>
        </div>
      </div>

      {/* Container for Alt Text / Icons BELOW the image */}
      <div className="image-caption-area relative text-center text-xs md:text-sm lg:text-sm font-medium">
        {/* Alt text - visible by default */}
        <span className="alt-text-display">{image.alt}</span>

        {/* Icons - hidden by default, visible on hover, positioned absolutely within this container */}
        <div className="caption-hover-icons absolute inset-0 flex justify-center items-center gap-6 ">
          <Heart
            size={14}
            className="cursor-pointer hover:text-red-500 pointer-events-auto"
            onClick={handleLike}
          />
          <Star
            size={14}
            className="cursor-pointer hover:text-yellow-500 pointer-events-auto"
            onClick={handleFavorite}
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

const UserImageGrid: React.FC<{ images: UserImage[]; isLoading: boolean }> = ({
  images,
  isLoading,
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
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">暂无内容</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8 h-full">
      <div className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image) => (
            <UserImageCard key={image.id} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
};

const UserImageWall: React.FC<UserImageWallProps> = ({ type, title }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dummy data - single Unsplash image as requested
  const dummyImages: UserImage[] = [];

  // For now, use a placeholder image
  const placeholderImage: UserImage = {
    id: "placeholder-1",
    src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1129&q=80",
    alt: type === "likes" ? "我喜欢的中国美食" : "我收藏的中国美食",
    prompt: "精美的中国传统菜肴，色香味俱全，令人垂涎欲滴。",
    author: "Unsplash",
  };

  dummyImages.push(placeholderImage);

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ minHeight: "calc(90vh - 100px)" }}
    >
      <div className="mb-4 backdrop-blur-sm py-2 sticky top-0 z-20 w-full bg-white/30">
        <div className="flex items-center justify-between px-4 w-full">
          <div className="flex items-center space-x-8">
            <div className="inline-flex items-center border-b-2 border-[#2e8b57] pb-0">
              <Search className="h-5 w-5 text-[#2e8b57] mr-2" />
              <input
                type="text"
                className="outline-none text-sm bg-transparent w-96"
                placeholder={`搜索${title}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <UserImageGrid images={dummyImages} isLoading={false} />

      {/* Use styles similar to FoodImageStyles for the card appearance */}
      <style jsx global>{`
        /* Styles adapted from FoodImageStyles.tsx for UserImageCard */
        .image-card {
          position: relative;
          background-color: transparent; /* Ensure transparency for hover effects */
          padding: 0 0 1px 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 0px;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .image-card:hover {
          /* Optional: Add border or other subtle hover effects if desired */
          /* border: 0.5px solid rgb(225, 217, 190); */
          overflow: hidden;
          flex: 1;
          min-height: 0;
        }

        .aspect-ratio-container {
          /* Match FoodImageStyles exactly */
          position: relative;
          width: 100%;
          padding-bottom: 85%; /* Match FoodImageStyles' 85% ratio instead of 4/3 */
          overflow: hidden;
          flex: 1; /* Allow container to grow/shrink */
          min-height: 0; /* Important for flex containers */
        }

        /* Optional: Frosted glass effect on hover (from FoodImageStyles) */
        /* .aspect-ratio-container::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 35%; 
          background-color: rgba(225, 225, 225, 0.1);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          pointer-events: none;
        }
        
        .image-card:hover .aspect-ratio-container::after {
          opacity: 1;
          visibility: visible;
        } */

        /* Styles for the caption area BELOW the image */
        .image-caption-area {
          background-color: white; /* Initial white background */
          position: relative; /* For absolute positioning of icons within */
          height: 24px; /* Set explicit height */
          line-height: 24px; /* Match height for vertical centering */
          margin: 0;
          padding: 0;
          overflow: hidden;
          transition: background-color 0.3s ease-in-out;
        }

        .alt-text-display {
          opacity: 1;
          transition: opacity 0.3s ease-in-out;
          line-height: 24px;
        }

        .caption-hover-icons {
          opacity: 0;
          pointer-events: none; /* Initially not interactive */
          transition: opacity 0.3s ease-in-out;
          height: 24px;
          line-height: 24px;
        }

        /* HOVER STATES for caption area */
        .image-card:hover .image-caption-area {
          background-color: rgba(
            128,
            128,
            128,
            0.4
          ); /* Semi-transparent gray on hover */
        }

        .image-card:hover .alt-text-display {
          opacity: 0 !important; /* Hide alt text */
          pointer-events: none !important;
        }

        .image-card:hover .caption-hover-icons {
          opacity: 1 !important; /* Show icons */
          pointer-events: auto !important; /* Make icons clickable */
        }
      `}</style>
    </div>
  );
};

export default UserImageWall;
