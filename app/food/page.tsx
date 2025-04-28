"use client";

import React from "react";
import ContentPageLayout from "../components/ContentPageLayout";
import FoodImageWall from "./components/FoodImageWall";
import FoodPlugin from "./components/FoodPlugin";
import FeedbackSuggestions from "./components/FeedbackSuggestions";

// Placeholder component for regional cuisines with nested tabs
const RegionalCuisines = () => {
  // 内容已清空，仅保留 tab 结构
  return <div className="text-gray-400 text-center py-16">内容已清空</div>;
};

export default function FoodPage() {
  // Define the tab structure
  const foodTabs = [
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

  return <ContentPageLayout tabs={foodTabs} />;
}
