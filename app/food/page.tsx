"use client";

import React from "react";
import ChinawordsNavigation from "../components/ChinawordsNavigation";
import TabComponent from "../components/TabComponent";
import { navigationLinks } from "../data/environmentalData";
import FoodImageWall from "./components/FoodImageWall";
import FoodPlugin from "./components/FoodPlugin";
import FeedbackSuggestions from "./components/FeedbackSuggestions";

// Placeholder component for regional cuisines with nested tabs
const RegionalCuisines = () => {
  // 内容已清空，仅保留 tab 结构
  return <div className="text-gray-400 text-center py-16">内容已清空</div>;
};

// Placeholder component for traditional recipes
const TraditionalRecipes = () => {
  // 内容已清空，仅保留 tab 结构
  return <div className="text-gray-400 text-center py-16">内容已清空</div>;
};

// Component for food culture information (reusing existing content)
const FoodCulture = () => {
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
      content: <div className="text-gray-400 text-center py-16">食材溯源内容占位</div>,
    },
    {
      title: "个性食谱",
      content: <div className="text-gray-400 text-center py-16">个性食谱内容占位</div>,
    },
    {
      title: "相册制作",
      content: <div className="text-gray-400 text-center py-16">相册制作内容占位</div>,
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
    <div className="min-h-screen flex flex-col texture-subtle">
      <ChinawordsNavigation links={navigationLinks} />

      <main className="flex-grow pt-12 flex flex-col">
        <div className="flex flex-col flex-grow">
          <div className="flex flex-col gap-y-6 flex-grow">
            <TabComponent tabs={tabs} />
          </div>
        </div>
      </main>
    </div>
  );
}
