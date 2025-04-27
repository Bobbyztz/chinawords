"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { heroData, initiativesData } from "../data/environmentalData";

export default function NewHomePage() {
  const sectionsRef = useRef<HTMLElement[]>([]);

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
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold font-serif-sc">城市速览</h2>
                <div className="flex space-x-2">
                  <button className="bg-white text-[#2E8B57] px-3 py-1 text-sm font-bold hover:bg-[#f0f9f4] hover:text-[#1a6b3c] transition-all duration-300 border border-[#2E8B57] rounded-md">
                    换一批
                  </button>
                  <a
                    href="/city"
                    className="bg-[#2E8B57] text-white px-3 py-1 text-sm font-bold hover:bg-[#236b42] transition-colors duration-300 rounded-md"
                  >
                    浏览所有
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {/* Sample city images - in a real implementation, these would be dynamic */}
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={`city-${index}`}
                    className="hover-frame-effect bg-white p-1 rounded shadow"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                      {/* Placeholder for actual images */}
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                        城市图片 {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
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
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold font-serif-sc">美食速览</h2>
                <div className="flex space-x-2">
                  <button className="bg-white text-[#2E8B57] px-3 py-1 text-sm font-bold hover:bg-[#f0f9f4] hover:text-[#1a6b3c] transition-all duration-300 border border-[#2E8B57] rounded-md">
                    换一批
                  </button>
                  <a
                    href="/food"
                    className="bg-[#2E8B57] text-white px-3 py-1 text-sm font-bold hover:bg-[#236b42] transition-colors duration-300 rounded-md"
                  >
                    浏览所有
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {/* Sample food images - in a real implementation, these would be dynamic */}
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={`food-${index}`}
                    className="hover-frame-effect bg-white p-1 rounded shadow"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                      {/* Placeholder for actual images */}
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                        美食图片 {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
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
              <h2 className="text-3xl font-bold text-center mb-8 font-serif-sc">
                我们的记录
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sustainability metrics */}
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#2E8B57]/10 rounded-full flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-[#2E8B57]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6a2 2 0 00-2 2v6a2 2 0 002 2h2v-2a2 2 0 012-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2h2v-2a2 2 0 012-2V6z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-serif-sc">1,234</h3>
                      <p className="text-gray-600 text-sm">收录词条</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    我们已经收录了1,234个中国文化词条，涵盖衣食住行各个方面。
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#C20F1E]/10 rounded-full flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-[#C20F1E]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-serif-sc">5,678</h3>
                      <p className="text-gray-600 text-sm">访问人次</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    来自全球各地的访问者，共同探索中国文化的魅力。
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-[#D4AF37]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-serif-sc">246</h3>
                      <p className="text-gray-600 text-sm">内容贡献者</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    来自不同领域的专家和爱好者，共同构建这个知识库。
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <a
                  href="/progress"
                  className="inline-flex items-center text-[#2E8B57] hover:text-[#1a6b3c] font-medium"
                >
                  查看更多数据
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
    </div>
  );
}
