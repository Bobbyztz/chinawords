"use client";

import React, { useState, useRef, useEffect } from "react";

interface TabItem {
  title: string;
  content: React.ReactNode;
}

interface TabComponentProps {
  tabs: TabItem[];
}

const TabComponent: React.FC<TabComponentProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize content refs
  useEffect(() => {
    // This ensures the refs are properly set up
    contentRefs.current = contentRefs.current.slice(0, tabs.length);
  }, [tabs.length]);

  return (
    <div className="relative flex flex-col md:flex-row w-[95%] pt-4 md:pt-4 h-full mx-auto text-gray-700">
      {/* Tab Navigation - Horizontal on mobile, Vertical on desktop */}
      <div className="w-full md:w-40 flex-shrink-0 z-10 mb-4 md:mb-0">
        <ul className="w-full flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className={`text-center leading-9 cursor-pointer transition-all duration-300 whitespace-nowrap px-3 md:px-0 ${
                activeTab === index ? "md:rounded-r-lg" : ""
              }`}
              onMouseEnter={() => setActiveTab(index)}
            >
              {/* Use a fixed-width container with consistent padding to prevent layout shifts */}
              <span
                className={`inline-block px-2 text-sm ${
                  activeTab === index ? "font-bold text-[#2e8b57]" : ""
                }`}
              >
                {tab.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div
        className="relative flex-grow bg-white/20 backdrop-blur-md shadow-md border-gray-300 rounded-md px-2 w-full flex flex-col"
        style={{ minHeight: "90vh" }}
      >
        {/* Content area with smooth transitions */}
        <div className="relative overflow-y-auto flex-grow flex flex-col">
          {tabs.map((tab, index) => (
            <div
              key={index}
              ref={(el: HTMLDivElement | null) => {
                contentRefs.current[index] = el;
              }}
              className="absolute left-0 top-0 w-full h-full transition-opacity duration-300 ease-in-out flex flex-col"
              style={{
                opacity: activeTab === index ? 1 : 0,
                pointerEvents: activeTab === index ? "auto" : "none",
                zIndex: activeTab === index ? 1 : 0,
                height: activeTab === index ? "100%" : 0,
              }}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
