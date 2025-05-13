"use client";

import React from "react";
import ContentPageLayout from "../components/ContentPageLayout";
import FoodImageWall from "./components/FoodImageWall";
import FoodPlugin from "./components/FoodPlugin";
import FeedbackSuggestions from "./components/FeedbackSuggestions";
import StyleDefinition from "./components/StyleDefinition";
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
      slug: "图片墙总览",
    },
    {
      title: "风格定义",
      content: <StyleDefinition />,
      slug: "风格定义",
    },
    {
      title: "地方菜系",
      content: <RegionalCuisines />,
      slug: "地方菜系",
    },
    {
      title: "食材溯源",
      content: (
        <div className="text-gray-400 text-center py-16">食材溯源内容占位</div>
      ),
      slug: "食材溯源",
    },
    {
      title: "个性食谱",
      content: (
        <div className="text-gray-400 text-center py-16">个性食谱内容占位</div>
      ),
      slug: "个性食谱",
    },
    {
      title: "相册制作",
      content: (
        <div className="text-gray-400 text-center py-16">相册制作内容占位</div>
      ),
      slug: "相册制作",
    },
    {
      title: "浏览器插件",
      content: <FoodPlugin />,
      slug: "浏览器插件",
    },
    {
      title: "意见与建议",
      content: <FeedbackSuggestions />,
      slug: "意见与建议",
    },
  ];

  return <ContentPageLayout tabs={foodTabs} />;
}
