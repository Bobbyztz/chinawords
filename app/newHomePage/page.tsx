"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { heroData, initiativesData } from "../data/environmentalData";
import { getRandomImages } from "../../lib/imageUtils";

export default function NewHomePage() {
  const sectionsRef = useRef<HTMLElement[]>([]);

  // State for city gallery
  const [isCityLoading, setIsCityLoading] = useState<boolean>(false);
  const [cityRefreshKey, setCityRefreshKey] = useState<number>(0);
  const [cityImages, setCityImages] = useState<string[]>([]);

  // State for food gallery
  const [isFoodLoading, setIsFoodLoading] = useState<boolean>(false);
  const [foodRefreshKey, setFoodRefreshKey] = useState<number>(0);
  const [foodImages, setFoodImages] = useState<string[]>([]);

  // Function to generate random city images
  const generateRandomCityImages = () => {
    console.log('Generating new random city images...');
    setIsCityLoading(true);

    // Add a small delay to show the loading effect
    setTimeout(() => {
      // Get 10 random images from the city folder
      const newCityImages = getRandomImages('34个省级行政区-3d', 10);
      setCityImages(newCityImages);
      setCityRefreshKey(prevKey => prevKey + 1);
      setIsCityLoading(false);
    }, 800);
  };

  // Function to generate random food images
  const generateRandomFoodImages = () => {
    console.log('Generating new random food images...');
    setIsFoodLoading(true);

    // Add a small delay to show the loading effect
    setTimeout(() => {
      // Get 10 random images from the food folder
      const newFoodImages = getRandomImages('34个省级行政区-美食', 10);
      setFoodImages(newFoodImages);
      setFoodRefreshKey(prevKey => prevKey + 1);
      setIsFoodLoading(false);
    }, 800);
  };

  // Load initial images when component mounts
  useEffect(() => {
    // Get initial random images
    const initialCityImages = getRandomImages('34个省级行政区-3d', 10);
    const initialFoodImages = getRandomImages('34个省级行政区-美食', 10);

    setCityImages(initialCityImages);
    setFoodImages(initialFoodImages);
  }, []);

  // Register sections for observation
  const registerSection = (el: HTMLElement | null, index: number) => {
    if (el) {
      sectionsRef.current[index] = el;
    }
  };

  return (
    <div className="h-full relative">
      {/* Fixed background image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={heroData.backgroundImage}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black opacity-70"></div>
      </div>

      {/* Scroll container without snap points */}
      <div className="h-screen overflow-y-scroll scroll-smooth relative z-10">
        {/* Hero Section */}
        <section
          id="hero-section"
          className="h-screen w-full py-4 px-3 flex items-center justify-center"
          ref={(el) => registerSection(el, 0)}
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-lg w-full h-[calc(100%-9px)] overflow-y-auto">
            <div className="h-full flex items-center justify-center p-6">
              <div className="text-center">
                <h1 className="text-5xl font-bold text-film-red mb-6 font-serif-sc">
                  {heroData.title}
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  {heroData.subtitle}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href={heroData.ctaLink}
                    className="bg-[#A00D19] hover:bg-red-700 text-white px-8 py-2 rounded-md text-lg font-medium transition-all duration-300"
                  >
                    {heroData.ctaText}
                  </a>
                  {heroData.secondaryCtaText && heroData.secondaryCtaLink && (
                    <a
                      href={heroData.secondaryCtaLink}
                      className="bg-transparent border border-[#A00D19] text-[#A00D19] hover:bg-[#A00D19] hover:text-white px-8 py-2 rounded-md text-lg font-medium transition-all duration-300"
                    >
                      {heroData.secondaryCtaText}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Basic Themes Section */}
        <section
          id="basic-themes-section"
          className="h-screen w-full py-4 px-3 flex items-center justify-center"
          ref={(el) => registerSection(el, 1)}
        >
          <div className="bg-white/30 backdrop-blur-sm rounded-lg shadow-lg w-full h-[calc(100%-9px)] overflow-y-auto">
            <div className="h-full p-6">
              <h2 className="text-3xl font-bold text-center pt-10 mb-16 font-serif-sc">
                基础板块
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Only original 4 cards: 衣食住行 */}
                {initiativesData.initiatives.slice(0, 4).map((initiative) => (
                  <div
                    key={initiative.id}
                    className="bg-transparent rounded-lg border-[1.5px] border-gray-100/70 hover:border-[1.5px] hover:border-black/40 overflow-hidden"                  >
                    <div className="relative h-48">
                      <Image
                        src={initiative.imageSrc}
                        alt={initiative.imageAlt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-1 font-serif-sc">
                        {initiative.title}
                      </h3>
                      <p className="text-gray-800 text-sm mb-3">
                        {initiative.description}
                      </p>
                      <a
                        href={initiative.link}
                        className="inline-flex items-center text-[#C20F1E] hover:text-red-800 hover:underline text-sm font-medium"
                      >
                        了解更多
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Themes Section */}
        <section
          id="advanced-themes-section"
          className="h-screen w-full py-4 px-3 flex items-center justify-center"
          ref={(el) => registerSection(el, 2)}
        >
          <div className="bg-white/30 backdrop-blur-sm rounded-lg shadow-lg w-full h-[calc(100%-9px)] overflow-y-auto">
            <div className="h-full p-6">
              <h2 className="text-3xl font-bold text-center pt-10 mb-16 font-serif-sc">
                进阶板块
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* New 4 cards: 用育康乐 */}
                {initiativesData.initiatives.slice(4, 8).map((initiative) => (
                  <div
                    key={initiative.id}
                    className="bg-transparent rounded-lg border-[1.5px] border-gray-100/70 hover:border-[1.5px] hover:border-black/40 overflow-hidden"                  >
                    <div className="relative h-48">
                      <Image
                        src={initiative.imageSrc}
                        alt={initiative.imageAlt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-1 font-serif-sc">
                        {initiative.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {initiative.description}
                      </p>
                      <a
                        href={initiative.link}
                        className="text-[#C20F1E] hover:text-red-800 hover:underline inline-flex items-center text-sm font-medium"
                      >
                        了解更多
                        <svg
                          className="w-3 h-3 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Placeholder sections for other cards */}
        {/* These will be implemented in the next steps */}
        <section
          id="city-gallery-section"
          className="h-screen w-full py-4 px-3 flex items-center justify-center"
          ref={(el) => registerSection(el, 3)}
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-lg w-full h-[calc(100%-9px)] overflow-y-auto">
            <div className="h-full p-6">
              <h2 className="text-3xl font-bold text-center pt-10 mb-1 font-serif-sc">
                城市速览
              </h2>
              <div className="flex justify-between items-center mb-8">
                <div className="hidden md:block"></div> {/* Empty div for spacing */}

                {/* Desktop buttons - hidden on mobile */}
                <div className="hidden md:flex rounded-full overflow-hidden border border-[#2E8B57] shadow-sm">
                  <a
                    href="/city"
                    className="bg-[#2E8B57] text-white px-3 py-1 text-xs font-bold hover:bg-[#236b42] transition-colors duration-300"
                  >
                    浏览所有
                  </a>
                  <button
                    onClick={generateRandomCityImages}
                    className="bg-white text-[#2E8B57] px-3 py-1 text-xs font-bold hover:bg-[#f0f9f4] hover:text-[#1a6b3c] transition-all duration-300 border-l border-[#2E8B57] relative cursor-pointer"
                    disabled={isCityLoading}
                  >
                    {isCityLoading ? (
                      <>
                        <span className="opacity-0">换一批</span>
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg className="animate-spin h-4 w-4 text-[#2E8B57]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
                  href="/city"
                  className="bg-[#2E8B57] text-white px-3 py-1 text-xs font-bold hover:bg-[#236b42] transition-colors duration-300"
                >
                  浏览所有
                </a>
                <button
                  onClick={generateRandomCityImages}
                  className="bg-white text-[#2E8B57] px-3 py-1 text-xs font-bold hover:bg-[#f0f9f4] hover:text-[#1a6b3c] transition-all duration-300 border-l border-[#2E8B57] relative cursor-pointer"
                  disabled={isCityLoading}
                >
                  {isCityLoading ? (
                    <>
                      <span className="opacity-0">换一批</span>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg className="animate-spin h-4 w-4 text-[#2E8B57]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    </>
                  ) : (
                    "换一批"
                  )}
                </button>
              </div>

              <div key={cityRefreshKey} className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 transition-all duration-300 ${isCityLoading ? 'blur-effect' : ''}`}>
                {/* Display city images from the 3D folder */}
                {cityImages.map((imagePath, index) => {
                  // Extract city name from the image path
                  const cityName = imagePath.split('/').pop()?.split('.')[0] || `城市 ${index + 1}`;

                  return (
                    <div
                      key={`city-${index}-${cityRefreshKey}`}
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
                        {isCityLoading ? (
                          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                        ) : (
                          <Image
                            src={imagePath}
                            alt={`${cityName} 城市图片`}
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
                <div className="hidden md:block"></div> {/* Empty div for spacing */}

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
                          <svg className="animate-spin h-4 w-4 text-[#2E8B57]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
                        <svg className="animate-spin h-4 w-4 text-[#2E8B57]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    </>
                  ) : (
                    "换一批"
                  )}
                </button>
              </div>

              <div key={foodRefreshKey} className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 transition-all duration-300 ${isFoodLoading ? 'blur-effect' : ''}`}>
                {/* Display food images from the food folder */}
                {foodImages.map((imagePath, index) => {
                  // Extract food/city name from the image path
                  const foodName = imagePath.split('/').pop()?.split('.')[0] || `美食 ${index + 1}`;

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

        <section
          id="records-section"
          className="h-screen w-full py-4 px-3 flex items-center justify-center"
          ref={(el) => registerSection(el, 5)}
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-lg w-full h-[calc(100%-9px)] overflow-y-auto">
            <div className="h-full p-6">
              <h2 className="text-3xl font-bold text-center pt-10 mb-4 font-serif-sc">
                我们的记录
              </h2>
              <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
                用数据见证文化与创新的影响力
              </p>

              {/* 数据统计展示 - 中国风极简设计 */}
              <div className="max-w-4xl mx-auto mb-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center border-b-2 border-[#C20F1E] pb-3 pt-2">
                  <div className="text-3xl font-bold text-[#C20F1E] font-serif-sc">1,200<span className="text-xl">+</span></div>
                  <div className="text-xs text-gray-600 mt-1">记录案例</div>
                </div>
                <div className="text-center border-b-2 border-[#C20F1E] pb-3 pt-2">
                  <div className="text-3xl font-bold text-[#C20F1E] font-serif-sc">680<span className="text-xl">万</span></div>
                  <div className="text-xs text-gray-600 mt-1">年访问量</div>
                </div>
                <div className="text-center border-b-2 border-[#C20F1E] pb-3 pt-2">
                  <div className="text-3xl font-bold text-[#C20F1E] font-serif-sc">300<span className="text-xl">+</span></div>
                  <div className="text-xs text-gray-600 mt-1">合作机构</div>
                </div>
                <div className="text-center border-b-2 border-[#C20F1E] pb-3 pt-2">
                  <div className="text-3xl font-bold text-[#C20F1E] font-serif-sc">95<span className="text-xl">%</span></div>
                  <div className="text-xs text-gray-600 mt-1">用户好评率</div>
                </div>
              </div>

              {/* 表格展示 - 中国风极简设计 */}
              <div className="max-w-3xl mx-auto mb-10">
                <div className="grid grid-cols-4 gap-0">
                  {/* 表头 */}
                  <div className="border-b-2 border-[#C20F1E] py-3 text-center font-serif-sc font-medium text-gray-700">项目类别</div>
                  <div className="border-b-2 border-[#C20F1E] py-3 text-center font-serif-sc font-medium text-gray-700">收录数量</div>
                  <div className="border-b-2 border-[#C20F1E] py-3 text-center font-serif-sc font-medium text-gray-700">访问人次</div>
                  <div className="border-b-2 border-[#C20F1E] py-3 text-center font-serif-sc font-medium text-gray-700">好评率</div>

                  {/* 衣·时尚传承 */}
                  <div className="border-b border-gray-200 py-4 text-center font-medium text-gray-800">衣·时尚传承</div>
                  <div className="border-b border-gray-200 py-4 text-center text-gray-600">286</div>
                  <div className="border-b border-gray-200 py-4 text-center text-gray-600">152万</div>
                  <div className="border-b border-gray-200 py-4 text-center text-gray-600">93%</div>

                  {/* 食·味蕾中国 */}
                  <div className="border-b border-gray-200 py-4 text-center font-medium text-gray-800">食·味蕾中国</div>
                  <div className="border-b border-gray-200 py-4 text-center text-gray-600">412</div>
                  <div className="border-b border-gray-200 py-4 text-center text-gray-600">246万</div>
                  <div className="border-b border-gray-200 py-4 text-center text-gray-600">97%</div>

                  {/* 住·空间美学 */}
                  <div className="border-b border-gray-200 py-4 text-center font-medium text-gray-800">住·空间美学</div>
                  <div className="border-b border-gray-200 py-4 text-center text-gray-600">178</div>
                  <div className="border-b border-gray-200 py-4 text-center text-gray-600">98万</div>
                  <div className="border-b border-gray-200 py-4 text-center text-gray-600">91%</div>

                  {/* 行·绿色出行 */}
                  <div className="border-b border-gray-200 py-4 text-center font-medium text-gray-800">行·绿色出行</div>
                  <div className="border-b border-gray-200 py-4 text-center text-gray-600">324</div>
                  <div className="border-b border-gray-200 py-4 text-center text-gray-600">184万</div>
                  <div className="border-b border-gray-200 py-4 text-center text-gray-600">94%</div>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="/progress"
                  className="inline-block border border-[#C20F1E] text-[#C20F1E] hover:bg-[#C20F1E] hover:text-white px-8 py-2 rounded-md text-lg font-medium transition-all duration-300"
                >
                  了解我们的影响力
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="activities-section"
          className="h-screen w-full py-4 px-3 flex items-center justify-center"
          ref={(el) => registerSection(el, 6)}
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-lg w-full h-[calc(100%-9px)] overflow-y-auto">
            <div className="h-full p-6">
              <h2 className="text-3xl font-bold text-center mb-8 font-serif-sc">
                参与活动
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Online Activities */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-[#2E8B57] text-white p-4">
                    <h3 className="text-xl font-bold font-serif-sc">
                      线上活动
                    </h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#2E8B57]/10 rounded-full flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5 text-[#2E8B57]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">中国文化线上讲座</h4>
                          <p className="text-sm text-gray-600">
                            每周四晚8点，专家带你探索中国文化的方方面面。
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#2E8B57]/10 rounded-full flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5 text-[#2E8B57]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">内容贡献计划</h4>
                          <p className="text-sm text-gray-600">
                            分享你的知识，成为我们的内容贡献者。
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#2E8B57]/10 rounded-full flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5 text-[#2E8B57]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">社区讨论</h4>
                          <p className="text-sm text-gray-600">
                            加入我们的论坛，与志同道合的朋友交流。
                          </p>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-6 text-center">
                      <a
                        href="/community"
                        className="inline-block bg-[#2E8B57] text-white px-4 py-2 rounded-md hover:bg-[#236b42] transition-colors duration-300"
                      >
                        参与线上活动
                      </a>
                    </div>
                  </div>
                </div>

                {/* Offline Activities */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-[#C20F1E] text-white p-4">
                    <h3 className="text-xl font-bold font-serif-sc">
                      线下活动
                    </h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#C20F1E]/10 rounded-full flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5 text-[#C20F1E]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">文化体验工作坊</h4>
                          <p className="text-sm text-gray-600">
                            每月举办，亲身体验中国传统工艺的魅力。
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#C20F1E]/10 rounded-full flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5 text-[#C20F1E]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 22V12h6v10"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">城市文化探索</h4>
                          <p className="text-sm text-gray-600">
                            跟随我们的导览，探索城市中的文化宝藏。
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#C20F1E]/10 rounded-full flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5 text-[#C20F1E]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">社区聚会</h4>
                          <p className="text-sm text-gray-600">
                            与社区成员面对面交流，分享经验。
                          </p>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-6 text-center">
                      <a
                        href="/community"
                        className="inline-block bg-[#C20F1E] text-white px-4 py-2 rounded-md hover:bg-[#A00D19] transition-colors duration-300"
                      >
                        参与线下活动
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="newsletter-bio-section"
          className="h-screen w-full py-4 px-3 flex items-center justify-center"
          ref={(el) => registerSection(el, 7)}
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-lg w-full h-[calc(100%-9px)] overflow-y-auto">
            <div className="h-full p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Newsletter Section */}
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="border-b border-gray-100 pb-4 mb-6">
                    <h2 className="text-2xl font-bold font-serif-sc text-[#2E8B57]">
                      订阅我们的通讯
                    </h2>
                    <p className="text-gray-600 text-sm mt-2">
                      获取最新的中国文化与生活方式资讯，每周精选内容直达您的邮箱。
                    </p>
                  </div>

                  <form className="space-y-4">
                    <div>
                      <input
                        type="email"
                        placeholder="您的邮箱地址"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2E8B57]/50 focus:border-[#2E8B57]"
                        required
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full bg-[#2E8B57] text-white px-4 py-2 rounded-md hover:bg-[#236b42] transition-colors duration-300"
                      >
                        订阅
                      </button>
                    </div>
                    <p className="text-gray-500 text-xs">
                      我们尊重您的隐私，您可以随时取消订阅。
                    </p>
                  </form>
                </div>

                {/* About Us Section */}
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="border-b border-gray-100 pb-4 mb-6">
                    <h2 className="text-2xl font-bold font-serif-sc text-[#C20F1E]">
                      关于我们
                    </h2>
                    <p className="text-gray-600 text-sm mt-2">
                      Chinawords致力于记录和分享当代中国的生活方式与文化创新。
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-700 text-sm">
                      我们的使命是通过数字化方式保存和传播中国丰富的文化遗产，让更多人了解中国传统与现代的融合之美。
                    </p>
                    <p className="text-gray-700 text-sm">
                      我们的团队由来自不同领域的专家和爱好者组成，他们对中国文化充满热情，致力于创造高质量的内容。
                    </p>
                    <div className="flex space-x-4 mt-6">
                      <a
                        href="/about"
                        className="text-[#C20F1E] hover:underline inline-flex items-center text-sm"
                      >
                        了解更多
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                      <a
                        href="/careers"
                        className="text-[#C20F1E] hover:underline inline-flex items-center text-sm"
                      >
                        加入我们
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              <div className="mt-12 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <h3 className="text-sm font-bold mb-3">关于我们</h3>
                    <ul className="space-y-2 text-xs text-gray-600">
                      <li>
                        <a
                          href="/about#mission"
                          className="hover:text-[#C20F1E]"
                        >
                          我们的使命
                        </a>
                      </li>
                      <li>
                        <a href="/about#team" className="hover:text-[#C20F1E]">
                          团队介绍
                        </a>
                      </li>
                      <li>
                        <a
                          href="/about#partners"
                          className="hover:text-[#C20F1E]"
                        >
                          合作伙伴
                        </a>
                      </li>
                      <li>
                        <a href="/careers" className="hover:text-[#C20F1E]">
                          加入我们
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-3">基础板块</h3>
                    <ul className="space-y-2 text-xs text-gray-600">
                      <li>
                        <a href="/fashion" className="hover:text-[#C20F1E]">
                          衣·时尚传承
                        </a>
                      </li>
                      <li>
                        <a href="/food" className="hover:text-[#C20F1E]">
                          食·味蕾中国
                        </a>
                      </li>
                      <li>
                        <a href="/living" className="hover:text-[#C20F1E]">
                          住·空间美学
                        </a>
                      </li>
                      <li>
                        <a href="/travel" className="hover:text-[#C20F1E]">
                          行·绿色出行
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-3">进阶板块</h3>
                    <ul className="space-y-2 text-xs text-gray-600">
                      <li>
                        <a
                          href="/under-construction"
                          className="hover:text-[#C20F1E]"
                        >
                          用·科技工具
                        </a>
                      </li>
                      <li>
                        <a
                          href="/under-construction"
                          className="hover:text-[#C20F1E]"
                        >
                          育·教育发展
                        </a>
                      </li>
                      <li>
                        <a
                          href="/under-construction"
                          className="hover:text-[#C20F1E]"
                        >
                          康·健康福祉
                        </a>
                      </li>
                      <li>
                        <a
                          href="/under-construction"
                          className="hover:text-[#C20F1E]"
                        >
                          乐·休闲娱乐
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-3">互动参与</h3>
                    <ul className="space-y-2 text-xs text-gray-600">
                      <li>
                        <a href="/community" className="hover:text-[#C20F1E]">
                          社区活动
                        </a>
                      </li>
                      <li>
                        <a href="/upload" className="hover:text-[#C20F1E]">
                          内容贡献
                        </a>
                      </li>
                      <li>
                        <a href="/feedback" className="hover:text-[#C20F1E]">
                          意见反馈
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 text-center text-xs text-gray-500">
                  &copy; 2024 Chinawords 保留所有权利
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <style jsx global>{`
        /* Blur effect for loading state */
        .blur-effect {
          filter: blur(10px) saturate(0.8);
          opacity: 0.7;
          pointer-events: none;
          transform: scale(0.98);
          transition: all 0.3s ease-in-out;
        }

        /* Button hover effect */
        button:not(:disabled):hover {
          box-shadow: 0 1px 3px rgba(46, 139, 87, 0.2);
        }

        /* Refresh button animation */
        @keyframes subtlePulse {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }

        button:not(:disabled):hover::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: rgba(46, 139, 87, 0.05);
          animation: subtlePulse 2s infinite ease-in-out;
          pointer-events: none;
        }

        /* Image hover effect */
        .hover-frame-effect {
          position: relative;
          transition: all 0.3s ease-in-out;
        }

        .hover-frame-effect:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          background-color: #f8f4e6;
          border: 1px solid #8b4513;
          padding: 10px;
        }

        /* Frame corners */
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

        /* Tape effect */
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
      `}</style>
    </div>
  );
}
