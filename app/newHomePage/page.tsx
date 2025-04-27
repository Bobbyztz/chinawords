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
              <h2 className="text-3xl font-bold text-center pt-10 mb-6 font-serif-sc">
                参与活动
              </h2>
              <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
                探索传统与现代交融的文化体验
              </p>

              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 线上活动 - 墨绿色主题 */}
                <div className="border-t-4 border-[#2E8B57] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-[#2E8B57]/10 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-[#2E8B57]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold font-serif-sc text-[#2E8B57]">线上活动</h3>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start border-l-2 border-[#2E8B57]/30 pl-4 py-1">
                        <div>
                          <h4 className="font-medium text-gray-800">中国文化线上讲座</h4>
                          <p className="text-sm text-gray-600 mt-1">每周四晚8点，专家带你探索中国文化的方方面面。</p>
                        </div>
                      </div>

                      <div className="flex items-start border-l-2 border-[#2E8B57]/30 pl-4 py-1">
                        <div>
                          <h4 className="font-medium text-gray-800">内容贡献计划</h4>
                          <p className="text-sm text-gray-600 mt-1">分享你的知识，成为我们的内容贡献者。</p>
                        </div>
                      </div>

                      <div className="flex items-start border-l-2 border-[#2E8B57]/30 pl-4 py-1">
                        <div>
                          <h4 className="font-medium text-gray-800">社区讨论</h4>
                          <p className="text-sm text-gray-600 mt-1">加入我们的论坛，与志同道合的朋友交流。</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <a
                        href="/community"
                        className="inline-block border border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white px-6 py-2 rounded-md transition-colors duration-300"
                      >
                        参与线上活动
                      </a>
                    </div>
                  </div>
                </div>

                {/* 线下活动 - 砖红色主题 */}
                <div className="border-t-4 border-[#9C4A31] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-[#9C4A31]/10 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-[#9C4A31]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold font-serif-sc text-[#9C4A31]">线下活动</h3>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start border-l-2 border-[#9C4A31]/30 pl-4 py-1">
                        <div>
                          <h4 className="font-medium text-gray-800">文化体验工作坊</h4>
                          <p className="text-sm text-gray-600 mt-1">每月举办，亲身体验中国传统工艺的魅力。</p>
                        </div>
                      </div>

                      <div className="flex items-start border-l-2 border-[#9C4A31]/30 pl-4 py-1">
                        <div>
                          <h4 className="font-medium text-gray-800">城市文化探索</h4>
                          <p className="text-sm text-gray-600 mt-1">跟随我们的导览，探索城市中的文化宝藏。</p>
                        </div>
                      </div>

                      <div className="flex items-start border-l-2 border-[#9C4A31]/30 pl-4 py-1">
                        <div>
                          <h4 className="font-medium text-gray-800">社区聚会</h4>
                          <p className="text-sm text-gray-600 mt-1">与社区成员面对面交流，分享经验。</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <a
                        href="/community"
                        className="inline-block border border-[#9C4A31] text-[#9C4A31] hover:bg-[#9C4A31] hover:text-white px-6 py-2 rounded-md transition-colors duration-300"
                      >
                        参与线下活动
                      </a>
                    </div>
                  </div>
                </div>

                {/* 特别活动 - 青灰色主题 */}
                <div className="border-t-4 border-[#5D6D7E] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-[#5D6D7E]/10 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-[#5D6D7E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold font-serif-sc text-[#5D6D7E]">特别活动</h3>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start border-l-2 border-[#5D6D7E]/30 pl-4 py-1">
                        <div>
                          <h4 className="font-medium text-gray-800">文化节庆典</h4>
                          <p className="text-sm text-gray-600 mt-1">每年定期举办，庆祝传统节日与文化遗产。</p>
                        </div>
                      </div>

                      <div className="flex items-start border-l-2 border-[#5D6D7E]/30 pl-4 py-1">
                        <div>
                          <h4 className="font-medium text-gray-800">艺术展览</h4>
                          <p className="text-sm text-gray-600 mt-1">展示当代艺术家对传统文化的现代诠释。</p>
                        </div>
                      </div>

                      <div className="flex items-start border-l-2 border-[#5D6D7E]/30 pl-4 py-1">
                        <div>
                          <h4 className="font-medium text-gray-800">文化沙龙</h4>
                          <p className="text-sm text-gray-600 mt-1">小型精品活动，深度探讨特定文化主题。</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <a
                        href="/special-events"
                        className="inline-block border border-[#5D6D7E] text-[#5D6D7E] hover:bg-[#5D6D7E] hover:text-white px-6 py-2 rounded-md transition-colors duration-300"
                      >
                        参与特别活动
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* 活动日历提示 */}
              <div className="mt-10 text-center">
                <div className="inline-flex items-center justify-center space-x-2 text-gray-600">
                  <svg className="w-5 h-5 text-[#5D6D7E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">查看完整活动日历，请访问</span>
                  <a href="/events" className="text-[#5D6D7E] hover:text-[#2E8B57] font-medium underline">活动页面</a>
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
                {/* Newsletter Section - 墨绿色主题 */}
                <div className="border-t-4 border-[#2E8B57] bg-white/40 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#2E8B57]/10 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-[#2E8B57]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold font-serif-sc text-[#2E8B57]">订阅我们的通讯</h2>
                      <p className="text-gray-600 text-sm mt-1">获取最新的中国文化与生活方式资讯</p>
                    </div>
                  </div>

                  <div className="border-l-2 border-[#2E8B57]/30 pl-4 py-2 mb-6">
                    <p className="text-gray-700 text-sm">
                      每周精选内容直达您的邮箱，包括文化活动、传统节日解读、艺术展览等精彩内容。
                    </p>
                  </div>

                  <form className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="您的邮箱地址"
                        className="w-full px-4 py-3 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#2E8B57] focus:border-[#2E8B57] transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full border border-[#2E8B57] bg-white text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white px-4 py-3 rounded-md transition-colors duration-300 font-medium"
                      >
                        订阅通讯
                      </button>
                    </div>
                    <p className="text-gray-500 text-xs text-center mt-2">
                      我们尊重您的隐私，您可以随时取消订阅。
                    </p>
                  </form>
                </div>

                {/* About Us Section - 砖红色主题 */}
                <div className="border-t-4 border-[#9C4A31] bg-white/40 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#9C4A31]/10 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-[#9C4A31]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold font-serif-sc text-[#9C4A31]">关于我们</h2>
                      <p className="text-gray-600 text-sm mt-1">Chinawords致力于记录和分享当代中国的文化</p>
                    </div>
                  </div>

                  <div className="border-l-2 border-[#9C4A31]/30 pl-4 py-2 mb-6 space-y-3">
                    <p className="text-gray-700 text-sm">
                      我们的使命是通过数字化方式保存和传播中国丰富的文化遗产，让更多人了解中国传统与现代的融合之美。
                    </p>
                    <p className="text-gray-700 text-sm">
                      我们的团队由来自不同领域的专家和爱好者组成，他们对中国文化充满热情，致力于创造高质量的内容。
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="/about"
                      className="flex-1 border border-[#9C4A31] text-[#9C4A31] hover:bg-[#9C4A31] hover:text-white px-4 py-2 rounded-md transition-colors duration-300 text-center"
                    >
                      了解更多
                    </a>
                    <a
                      href="/careers"
                      className="flex-1 border border-[#9C4A31] text-[#9C4A31] hover:bg-[#9C4A31] hover:text-white px-4 py-2 rounded-md transition-colors duration-300 text-center"
                    >
                      加入我们
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer Links - 青灰色主题 */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="max-w-5xl mx-auto">
                  {/* 页脚标题 */}
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-serif-sc text-[#5D6D7E] inline-block relative">
                      <span className="relative z-10">探索更多</span>
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-[#5D6D7E]/20"></span>
                    </h3>
                  </div>

                  {/* 页脚链接 */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                      <h4 className="text-sm font-bold mb-4 text-[#5D6D7E] pb-2 border-b border-[#5D6D7E]/20">关于我们</h4>
                      <ul className="space-y-2 text-xs">
                        <li>
                          <a href="/about#mission" className="text-gray-600 hover:text-[#5D6D7E] transition-colors duration-300">
                            我们的使命
                          </a>
                        </li>
                        <li>
                          <a href="/about#team" className="text-gray-600 hover:text-[#5D6D7E] transition-colors duration-300">
                            团队介绍
                          </a>
                        </li>
                        <li>
                          <a href="/about#partners" className="text-gray-600 hover:text-[#5D6D7E] transition-colors duration-300">
                            合作伙伴
                          </a>
                        </li>
                        <li>
                          <a href="/careers" className="text-gray-600 hover:text-[#5D6D7E] transition-colors duration-300">
                            加入我们
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold mb-4 text-[#2E8B57] pb-2 border-b border-[#2E8B57]/20">基础板块</h4>
                      <ul className="space-y-2 text-xs">
                        <li>
                          <a href="/fashion" className="text-gray-600 hover:text-[#2E8B57] transition-colors duration-300">
                            衣·时尚传承
                          </a>
                        </li>
                        <li>
                          <a href="/food" className="text-gray-600 hover:text-[#2E8B57] transition-colors duration-300">
                            食·味蕾中国
                          </a>
                        </li>
                        <li>
                          <a href="/living" className="text-gray-600 hover:text-[#2E8B57] transition-colors duration-300">
                            住·空间美学
                          </a>
                        </li>
                        <li>
                          <a href="/travel" className="text-gray-600 hover:text-[#2E8B57] transition-colors duration-300">
                            行·绿色出行
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold mb-4 text-[#9C4A31] pb-2 border-b border-[#9C4A31]/20">进阶板块</h4>
                      <ul className="space-y-2 text-xs">
                        <li>
                          <a href="/under-construction" className="text-gray-600 hover:text-[#9C4A31] transition-colors duration-300">
                            用·科技工具
                          </a>
                        </li>
                        <li>
                          <a href="/under-construction" className="text-gray-600 hover:text-[#9C4A31] transition-colors duration-300">
                            育·教育发展
                          </a>
                        </li>
                        <li>
                          <a href="/under-construction" className="text-gray-600 hover:text-[#9C4A31] transition-colors duration-300">
                            康·健康福祉
                          </a>
                        </li>
                        <li>
                          <a href="/under-construction" className="text-gray-600 hover:text-[#9C4A31] transition-colors duration-300">
                            乐·休闲娱乐
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold mb-4 text-[#C20F1E] pb-2 border-b border-[#C20F1E]/20">互动参与</h4>
                      <ul className="space-y-2 text-xs">
                        <li>
                          <a href="/community" className="text-gray-600 hover:text-[#C20F1E] transition-colors duration-300">
                            社区活动
                          </a>
                        </li>
                        <li>
                          <a href="/upload" className="text-gray-600 hover:text-[#C20F1E] transition-colors duration-300">
                            内容贡献
                          </a>
                        </li>
                        <li>
                          <a href="/feedback" className="text-gray-600 hover:text-[#C20F1E] transition-colors duration-300">
                            意见反馈
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 版权信息 */}
                  <div className="mt-10 pt-6 border-t border-gray-200 text-center">
                    <p className="text-xs text-gray-500">&copy; 2024 Chinawords 保留所有权利</p>
                  </div>
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
