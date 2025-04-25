"use client";

import React from "react";
import ChinawordsNavigation from "../components/ChinawordsNavigation";
import { navigationLinks } from "../data/environmentalData";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

interface FoodImage {
  id: string;
  src: string;
  alt: string;
  author?: string;
  prompt?: string;
}

export default function FoodWallPage() {
  const [images, setImages] = useState<FoodImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Function to shuffle an array using Fisher-Yates algorithm with optional seed
  const shuffleArray = <T,>(array: T[], seed?: number): T[] => {
    const shuffled = [...array];

    // Create a seeded random number generator if seed is provided
    let seedValue = seed;
    const getRandom =
      seedValue !== undefined
        ? () => {
            // Simple seeded random number generator
            seedValue = (seedValue! * 9301 + 49297) % 233280;
            return seedValue! / 233280;
          }
        : Math.random;

    for (let i = shuffled.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      const j = Math.floor(getRandom() * (i + 1));
      // Swap elements at i and j
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Function to generate random images
  const generateRandomImages = () => {
    console.log("Generating new random images...");
    setIsLoading(true);
    setPage(1);
    setHasMore(true);

    // Generate a random seed for better randomization
    const randomSeed = Date.now() + Math.floor(Math.random() * 1000);
    console.log(`Random seed: ${randomSeed}`);

    // Add a small delay to show the blur effect before generating new images
    setTimeout(() => {
      generateAndSetNewImages(randomSeed, 1, true);
    }, 300);
  };

  // Function to actually generate the new images
  const generateAndSetNewImages = useCallback(
    (seed?: number, currentPage: number = 1, reset: boolean = false) => {
      // List of available food images with their display names
      const foodImages = [
        { file: "北京.jpeg", name: "北京" },
        { file: "上海.png", name: "上海" },
        { file: "兰州.png", name: "兰州" },
        { file: "南京.png", name: "南京" },
        { file: "南宁.png", name: "南宁" },
        { file: "南昌.png", name: "南昌" },
        { file: "台北.png", name: "台北" },
        { file: "合肥.png", name: "合肥" },
        { file: "天津.png", name: "天津" },
        { file: "太原.png", name: "太原" },
        { file: "广州.png", name: "广州" },
        { file: "成都.png", name: "成都" },
        { file: "拉萨.png", name: "拉萨" },
        { file: "昆明.png", name: "昆明" },
        { file: "杭州.png", name: "杭州" },
        { file: "武汉.png", name: "武汉" },
        { file: "沈阳.png", name: "沈阳" },
        { file: "济南.png", name: "济南" },
        { file: "海口.png", name: "海口" },
        { file: "澳门.png", name: "澳门" },
        { file: "石家庄.png", name: "石家庄" },
        { file: "福州.png", name: "福州" },
        { file: "西宁.png", name: "西宁" },
        { file: "西安.png", name: "西安" },
        { file: "贵阳.png", name: "贵阳" },
        { file: "郑州.png", name: "郑州" },
        { file: "重庆.png", name: "重庆" },
        { file: "银川.png", name: "银川" },
        { file: "长春.png", name: "长春" },
        { file: "长沙.png", name: "长沙" },
        { file: "香港.png", name: "香港" },
        { file: "哈尔滨.png", name: "哈尔滨" },
        { file: "乌鲁木齐.png", name: "乌鲁木齐" },
        { file: "呼和浩特.png", name: "呼和浩特" },
      ];

      // For infinite scrolling, we'll duplicate the array to simulate more content
      const extendedFoodImages = [
        ...foodImages,
        ...foodImages,
        ...foodImages,
        ...foodImages,
      ];

      // Shuffle all images with the seed
      const shuffledFood = shuffleArray(extendedFoodImages, seed);

      // Items per page
      const itemsPerPage = 12;

      // Calculate start and end indices for the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      // Check if we have more pages
      setHasMore(endIndex < shuffledFood.length);

      // Get the current page's items
      const currentPageItems = shuffledFood.slice(startIndex, endIndex);

      // Create image objects for the current page
      const newImages = currentPageItems.map((img, index) => ({
        id: `food-${startIndex + index}`,
        src: `/34个省级行政区-美食/${img.file}`,
        alt: img.name,
        author: "AI Generated",
        prompt: `${img.name}特色美食`,
      }));

      // Preload images before showing them
      const preloadImages = async () => {
        const promises = newImages.map((img) => {
          return new Promise<boolean>((resolve) => {
            const image = new window.Image();
            image.onload = () => resolve(true);
            image.onerror = () => {
              console.error(`Failed to load image: ${img.src}`);
              resolve(false);
            };
            image.src = img.src;
          });
        });

        // Wait for all images to preload or timeout after 2 seconds
        await Promise.race([
          Promise.all(promises),
          new Promise((resolve) => setTimeout(resolve, 2000)),
        ]);

        // Set images and finish loading
        if (reset) {
          setImages(newImages);
        } else {
          setImages((prevImages) => [...prevImages, ...newImages]);
        }

        setRefreshKey((prevKey) => prevKey + 1); // Increment key to force re-render
        setIsLoading(false);
      };

      // Start preloading
      preloadImages();
    },
    []
  );

  // Generate random images on component mount
  useEffect(() => {
    generateAndSetNewImages(undefined, 1, true);
  }, [generateAndSetNewImages]);

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            generateAndSetNewImages(undefined, nextPage, false);
            return nextPage;
          });
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, isLoading, generateAndSetNewImages]);

  return (
    <div className="min-h-screen flex flex-col texture-subtle">
      <ChinawordsNavigation links={navigationLinks} />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 relative">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-nature-heading">
                美食图片墙
              </h2>
              <p className="text-lg text-nature-body">
                探索中国各地的特色美食文化
              </p>
            </div>

            <div className="flex justify-center mt-6">
              <div className="rounded-full overflow-hidden border border-[#2E8B57] shadow-sm">
                <button
                  onClick={() => generateRandomImages()}
                  className="bg-white text-[#2E8B57] px-4 py-2 text-sm font-bold hover:bg-[#f0f9f4] hover:text-[#1a6b3c] transition-all duration-300 border-l border-[#2E8B57] relative cursor-pointer flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="opacity-0">换一批</span>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="animate-spin h-4 w-4 text-[#2E8B57] mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        加载中...
                      </span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-4 w-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      换一批
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Photo wall */}
          <div
            key={refreshKey}
            className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 transition-all duration-300 ${
              isLoading && page === 1 ? "blur-effect" : ""
            }`}
          >
            {images.map((image) => (
              <div key={image.id} className="image-card hover-frame-effect">
                <div className="tape-top"></div>
                <div className="frame-corners">
                  <div className="corner corner-tl"></div>
                  <div className="corner corner-tr"></div>
                  <div className="corner corner-bl"></div>
                  <div className="corner corner-br"></div>
                </div>
                <div className="relative aspect-ratio-container overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    className="object-cover"
                    style={{ objectPosition: "center" }}
                    priority={image.id.includes("food-0")} // Prioritize loading for first few images
                  />

                  {/* Hover overlay with author and prompt */}
                  <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
                    <p className="text-sm font-bold">{image.alt}</p>
                    {image.author && (
                      <p className="text-xs opacity-80">作者: {image.author}</p>
                    )}
                    {image.prompt && (
                      <p className="text-xs opacity-80">
                        提示词: {image.prompt}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Loading indicator for infinite scroll */}
          <div ref={loaderRef} className="flex justify-center my-8">
            {hasMore && (
              <div className="flex flex-col items-center">
                {isLoading && page > 1 && (
                  <svg
                    className="animate-spin h-8 w-8 text-[#2E8B57] mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                <p className="text-sm text-gray-500">
                  {isLoading && page > 1
                    ? "加载更多美食图片..."
                    : "向下滚动加载更多"}
                </p>
              </div>
            )}
            {!hasMore && images.length > 0 && (
              <p className="text-sm text-gray-500">已加载全部内容</p>
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        /* Button hover effect */
        button:not(:disabled):hover {
          box-shadow: 0 1px 3px rgba(46, 139, 87, 0.2);
        }

        /* Refresh button animation */
        @keyframes subtlePulse {
          0% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.7;
          }
        }

        button:not(:disabled):hover::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: rgba(46, 139, 87, 0.05);
          animation: subtlePulse 2s infinite ease-in-out;
          pointer-events: none;
        }

        .blur-effect {
          filter: blur(10px) saturate(0.8);
          opacity: 0.7;
          pointer-events: none;
          transform: scale(0.98);
          transition: all 0.3s ease-in-out;
        }

        .image-card {
          position: relative;
          background-color: white;
          padding: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          width: 100%;
          animation: fadeIn 0.6s cubic-bezier(0.26, 0.53, 0.74, 1.48);
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .image-card:hover {
          transform: translateY(-5px);
        }

        /* Hover frame effect */
        .hover-frame-effect {
          position: relative;
        }

        .hover-frame-effect:hover {
          background-color: #f8f4e6;
          border: 1px solid #8b4513;
          padding: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .frame-corners {
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .hover-frame-effect:hover .frame-corners {
          opacity: 1;
        }

        .corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid #8b4513;
          z-index: 1;
        }

        .corner-tl {
          top: 4px;
          left: 4px;
          border-right: none;
          border-bottom: none;
        }

        .corner-tr {
          top: 4px;
          right: 4px;
          border-left: none;
          border-bottom: none;
        }

        .corner-bl {
          bottom: 4px;
          left: 4px;
          border-right: none;
          border-top: none;
        }

        .corner-br {
          bottom: 4px;
          right: 4px;
          border-left: none;
          border-top: none;
        }

        .tape-top {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%) rotate(-5deg);
          width: 40px;
          height: 30px;
          background-color: rgba(255, 255, 0, 0.5);
          z-index: 2;
          clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
        }

        .aspect-ratio-container {
          position: relative;
          width: 100%;
          padding-bottom: 100%; /* This creates a perfect square */
          overflow: hidden;
        }

        .aspect-ratio-container img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}
