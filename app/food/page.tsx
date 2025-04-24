"use client";

import React from "react";
import ChinawordsNavigation from "../components/ChinawordsNavigation";
import TabComponent from "../components/TabComponent";
import { navigationLinks } from "../data/environmentalData";

// Food Image Wall component
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface FoodImage {
  id: string;
  src: string;
  alt: string;
  author?: string;
  prompt?: string;
}

const FoodImageWall = () => {
  // 内容已清空，仅保留 tab 结构
  return <div className="text-gray-400 text-center py-16">内容已清空</div>;
};

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
      title: "美食图片墙",
      content: <FoodImageWall />,
    },
    {
      title: "地方菜系",
      content: <RegionalCuisines />,
    },
    {
      title: "传统食谱",
      content: <TraditionalRecipes />,
    },
    {
      title: "美食文化",
      content: <FoodCulture />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col texture-subtle">
      <ChinawordsNavigation links={navigationLinks} />

      <main className="flex-grow pt-12 mt-16">
        <div>
          <div className="flex flex-col gap-y-6">
            <TabComponent tabs={tabs} />
          </div>
        </div>
      </main>
    </div>
  );
}
