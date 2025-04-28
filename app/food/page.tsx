"use client";

import React from "react";
import Image from "next/image";
import ChinawordsNavigation from "../components/ChinawordsNavigation";
import TabComponent from "../components/TabComponent";
import { navigationLinks, heroData } from "../data/environmentalData";
import FoodImageWall from "./components/FoodImageWall";
import FoodPlugin from "./components/FoodPlugin";
import FeedbackSuggestions from "./components/FeedbackSuggestions";

// Placeholder component for regional cuisines with nested tabs
const RegionalCuisines = () => {
  // 内容已清空，仅保留 tab 结构
  return <div className="text-gray-400 text-center py-16">内容已清空</div>;
};

export default function FoodPage() {
  // Define the new tab structure
  const tabs = [
    {
      title: "图片墙总览",
      content: <FoodImageWall />,
    },
    {
      title: "地方菜系",
      content: <RegionalCuisines />,
    },
    {
      title: "食材溯源",
      content: (
        <div className="text-gray-400 text-center py-16">食材溯源内容占位</div>
      ),
    },
    {
      title: "个性食谱",
      content: (
        <div className="text-gray-400 text-center py-16">个性食谱内容占位</div>
      ),
    },
    {
      title: "相册制作",
      content: (
        <div className="text-gray-400 text-center py-16">相册制作内容占位</div>
      ),
    },
    {
      title: "浏览器插件",
      content: <FoodPlugin />,
    },
    {
      title: "意见与建议",
      content: <FeedbackSuggestions />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Fixed background image - same as homepage */}
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

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <ChinawordsNavigation links={navigationLinks} />

        <main className="flex-grow flex flex-col">
          <div className="flex flex-col flex-grow">
            <div className="flex flex-col gap-y-6 flex-grow">
              <TabComponent tabs={tabs} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
