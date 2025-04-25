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
  const [contentHeights, setContentHeights] = useState<number[]>([]);

  // Measure content heights on initial render
  useEffect(() => {
    const heights = contentRefs.current.map((ref) => ref?.scrollHeight || 0);
    setContentHeights(heights);
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row w-[95%] pt-8 md:pt-16 h-full mx-auto text-gray-700">
      {/* Tab Navigation - Horizontal on mobile, Vertical on desktop */}
      <div className="w-full md:w-40 flex-shrink-0 z-10 mb-4 md:mb-0">
        <ul className="w-full flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className="text-center leading-9 cursor-pointer transition-all duration-300 whitespace-nowrap px-3 md:px-0"
              onMouseEnter={() => setActiveTab(index)}
            >
              {/* Use a fixed-width container with consistent padding to prevent layout shifts */}
              <span
                className={`inline-block px-2 ${
                  activeTab === index ? "font-bold" : ""
                }`}
              >
                {tab.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="relative flex-grow bg-white shadow-md w-full" style={{ minHeight: '85vh' }}>
        {/* Status indicators - curved background for active tab - Hidden on mobile */}
        <ul className="absolute left-[-160px] top-0 w-40 hidden md:block">
          {tabs.map((_, index) => (
            <li
              key={index}
              className="relative w-40 h-9 rounded-l-lg bg-white transition-opacity duration-300"
              style={{
                opacity: activeTab === index ? 1 : 0,
                pointerEvents: "none", // Prevent interference with hover events
              }}
            >
              {/* Top curved corner */}
              {index !== 0 && (
                <div
                  className="absolute right-0 top-[-20px] w-5 h-5"
                  style={{
                    background:
                      "radial-gradient(circle at 0 0, transparent, transparent 19.5px, #fff 20px, #fff)",
                  }}
                ></div>
              )}

              {/* Bottom curved corner */}
              <div
                className="absolute right-0 bottom-[-20px] w-5 h-5"
                style={{
                  background:
                    "radial-gradient(circle at 0 100%, transparent, transparent 19.5px, #fff 20px, #fff)",
                }}
              ></div>
            </li>
          ))}
        </ul>

        {/* Content area with smooth transitions */}
        <div
          className="relative overflow-visible"
          style={{ minHeight: Math.max(...contentHeights, 400) }}
        >
          {tabs.map((tab, index) => (
            <div
              key={index}
              ref={(el: HTMLDivElement | null) => {
                contentRefs.current[index] = el;
              }}
              className="absolute left-0 top-0 w-full transition-opacity duration-300 ease-in-out"
              style={{
                opacity: activeTab === index ? 1 : 0,
                pointerEvents: activeTab === index ? "auto" : "none",
                zIndex: activeTab === index ? 1 : 0,
                height: activeTab === index ? "auto" : 0,
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
