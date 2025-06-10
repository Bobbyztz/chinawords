import React from "react";
import Image from "next/image";

interface NewHomePageFoodGalleryProps {
  foodImages: string[];
  isFoodLoading: boolean;
  foodRefreshKey: number;
  generateRandomFoodImages: () => void;
  registerSection: (el: HTMLElement | null, index: number) => void;
}

const NewHomePage_FoodGallery: React.FC<NewHomePageFoodGalleryProps> = ({
  foodImages,
  isFoodLoading,
  foodRefreshKey,
  generateRandomFoodImages,
  registerSection,
}) => {
  return (
    <section
      id="food-gallery-section"
      className="h-screen w-full py-4 px-3 flex items-center justify-center"
      ref={(el) => registerSection(el, 4)}
    >
      <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-lg w-full h-[calc(100%-9px)] overflow-y-auto">
        <div className="h-full p-6">
          <h2 className="text-3xl font-bold text-center pt-10 mb-1 font-serif-sc">
            美食速览
          </h2>
          <div className="flex justify-between items-center mb-8">
            <div className="hidden md:block"></div>{" "}
            {/* Empty div for spacing */}
            {/* Desktop buttons - hidden on mobile */}
            <div className="hidden md:flex rounded-full overflow-hidden border border-[#2E8B57] shadow-sm">
              <a
                href="/food"
                className="bg-[#2E8B57] text-white px-3 py-1 text-xs font-bold hover:bg-[#236b42] transition-colors duration-300"
              >
                浏览所有
              </a>
              <button
                onClick={generateRandomFoodImages}
                className="bg-white text-[#2E8B57] px-3 py-1 text-xs font-bold hover:bg-[#f0f9f4] hover:text-[#1a6b3c] transition-all duration-300 border-l border-[#2E8B57] relative cursor-pointer"
                disabled={isFoodLoading}
              >
                {isFoodLoading ? (
                  <>
                    <span className="opacity-0">换一批</span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="animate-spin h-4 w-4 text-[#2E8B57]"
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
                    </span>
                  </>
                ) : (
                  "换一批"
                )}
              </button>
            </div>
          </div>

          {/* Mobile buttons - shown only on mobile */}
          <div className="flex md:hidden justify-center mt-4 mb-8 rounded-full overflow-hidden border border-[#2E8B57] shadow-sm mx-auto w-fit">
            <a
              href="/food"
              className="bg-[#2E8B57] text-white px-3 py-1 text-xs font-bold hover:bg-[#236b42] transition-colors duration-300"
            >
              浏览所有
            </a>
            <button
              onClick={generateRandomFoodImages}
              className="bg-white text-[#2E8B57] px-3 py-1 text-xs font-bold hover:bg-[#f0f9f4] hover:text-[#1a6b3c] transition-all duration-300 border-l border-[#2E8B57] relative cursor-pointer"
              disabled={isFoodLoading}
            >
              {isFoodLoading ? (
                <>
                  <span className="opacity-0">换一批</span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="animate-spin h-4 w-4 text-[#2E8B57]"
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
                  </span>
                </>
              ) : (
                "换一批"
              )}
            </button>
          </div>

          <div
            key={foodRefreshKey}
            className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 transition-all duration-300 ${
              isFoodLoading ? "blur-effect" : ""
            }`}
          >
            {/* Display food images from the food folder */}
            {foodImages.map((imagePath, index) => {
              // Extract food/city name from the image path
              const foodName =
                imagePath.split("/").pop()?.split(".")[0] ||
                `美食 ${index + 1}`;

              return (
                <div
                  key={`food-${index}-${foodRefreshKey}`}
                  className="hover-frame-effect bg-white p-1 rounded shadow"
                >
                  <div className="tape-top"></div>
                  <div className="frame-corners">
                    <div className="corner corner-tl"></div>
                    <div className="corner corner-tr"></div>
                    <div className="corner corner-bl"></div>
                    <div className="corner corner-br"></div>
                  </div>
                  <div className="relative aspect-square overflow-hidden">
                    {isFoodLoading ? (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                    ) : (
                      <Image
                        src={imagePath}
                        alt={`${foodName} 美食图片`}
                        fill
                        sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHomePage_FoodGallery;
