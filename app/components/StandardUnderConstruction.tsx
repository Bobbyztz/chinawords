"use client";

import React from "react";
import Image from "next/image";
import ChinawordsNavigation from "./ChinawordsNavigation";
import TabComponent from "./TabComponent";
import { navigationLinks, heroData } from "../data/environmentalData";

interface StandardUnderConstructionProps {
  title: string;
}

const StandardUnderConstruction: React.FC<StandardUnderConstructionProps> = ({
  title,
}) => {
  // Define the tab structure with placeholders
  const tabs = [
    {
      title: "标签1",
      content: (
        <div className="text-gray-400 text-center py-16 font-sans-sc">
          正在建设中，敬请期待！
        </div>
      ),
    },
    {
      title: "标签2",
      content: (
        <div className="text-gray-400 text-center py-16 font-sans-sc">
          正在建设中，敬请期待！
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Fixed background image - same as food page */}
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
              {/* Tab component */}
              <TabComponent tabs={tabs} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StandardUnderConstruction;
