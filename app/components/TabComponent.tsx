'use client';

import React, { useState, useRef, useEffect } from 'react';

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
    const heights = contentRefs.current.map(ref => ref?.scrollHeight || 0);
    setContentHeights(heights);
  }, []);

  return (
    <div className="relative flex flex-row w-[95%] h-[80vh] mx-auto text-gray-700">
      {/* Tab Navigation */}
      <div className="w-40 flex-shrink-0 z-10">
        <ul className="w-full flex flex-col">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className="text-center leading-9 cursor-pointer transition-all duration-300"
              onMouseEnter={() => setActiveTab(index)}
            >
              {/* Use a fixed-width container with consistent padding to prevent layout shifts */}
              <span className={`inline-block px-2 ${activeTab === index ? 'font-bold' : ''}`}>
                {tab.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="relative flex-grow bg-white shadow-md p-5 min-h-[500px]">
        {/* Status indicators - curved background for active tab */}
        <ul className="absolute left-[-160px] top-0 w-40">
          {tabs.map((_, index) => (
            <li
              key={index}
              className="relative w-40 h-9 rounded-l-lg bg-white transition-opacity duration-300"
              style={{
                opacity: activeTab === index ? 1 : 0,
                pointerEvents: 'none' // Prevent interference with hover events
              }}
            >
              {/* Top curved corner */}
              {index !== 0 && (
                <div
                  className="absolute right-0 top-[-20px] w-5 h-5"
                  style={{
                    background: 'radial-gradient(circle at 0 0, transparent, transparent 19.5px, #fff 20px, #fff)'
                  }}
                ></div>
              )}

              {/* Bottom curved corner */}
              <div
                className="absolute right-0 bottom-[-20px] w-5 h-5"
                style={{
                  background: 'radial-gradient(circle at 0 100%, transparent, transparent 19.5px, #fff 20px, #fff)'
                }}
              ></div>
            </li>
          ))}
        </ul>

        {/* Content area with smooth transitions */}
        <div className="relative overflow-hidden" style={{ minHeight: Math.max(...contentHeights, 200) }}>
          {tabs.map((tab, index) => (
            <div
              key={index}
              ref={(el: HTMLDivElement | null) => { contentRefs.current[index] = el; }}
              className="absolute left-0 top-0 w-full transition-opacity duration-300 ease-in-out"
              style={{
                opacity: activeTab === index ? 1 : 0,
                pointerEvents: activeTab === index ? 'auto' : 'none',
                zIndex: activeTab === index ? 1 : 0
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
