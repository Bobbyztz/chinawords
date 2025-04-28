"use client";

import React from "react";
import Image from "next/image";
import ChinawordsNavigation from "./ChinawordsNavigation";
import TabComponent from "./TabComponent";
import { navigationLinks, heroData } from "../data/environmentalData";

interface TabItem {
  title: string;
  content: React.ReactNode;
}

interface ContentPageLayoutProps {
  tabs: TabItem[];
  backgroundImage?: string; // 可选，允许自定义背景图片
}

const ContentPageLayout: React.FC<ContentPageLayoutProps> = ({
  tabs,
  backgroundImage = heroData.backgroundImage, // 默认使用 heroData 中的背景图
}) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Fixed background image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={backgroundImage}
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
              {/* Tab component */}
              <TabComponent tabs={tabs} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContentPageLayout;
