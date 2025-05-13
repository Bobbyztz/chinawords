"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

interface TabItem {
  title: string;
  content: React.ReactNode;
  slug?: string; // Optional slug for URL
}

interface TabComponentProps {
  tabs: TabItem[];
}

// Client component that uses useSearchParams
const TabSelector: React.FC<{
  tabs: TabItem[];
  onTabChange: (index: number) => void;
  activeTab: number;
}> = ({ tabs, onTabChange, activeTab }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("view");

  const tabsWithSlugs = tabs.map((tab) => ({
    ...tab,
    slug: tab.slug || tab.title.toLowerCase().replace(/\s+/g, "-"),
  }));

  const findTabIndexBySlug = useCallback(
    (slug: string) => {
      const index = tabsWithSlugs.findIndex((tab) => tab.slug === slug);
      return index >= 0 ? index : 0;
    },
    [tabsWithSlugs]
  );

  // Update activeTab when URL parameter changes
  useEffect(() => {
    if (tabParam) {
      const index = findTabIndexBySlug(tabParam);
      onTabChange(index);
    }
  }, [tabParam, findTabIndexBySlug, onTabChange]);

  // Handle tab change and update URL
  const handleTabChange = (index: number) => {
    onTabChange(index);

    // Update URL with the new tab slug
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", tabsWithSlugs[index].slug as string);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <ul className="w-full flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
      {tabsWithSlugs.map((tab, index) => (
        <li
          key={index}
          className={`text-center leading-9 cursor-pointer transition-all duration-300 whitespace-nowrap px-3 md:px-0 ${
            activeTab === index ? "md:rounded-r-lg" : ""
          }`}
          onClick={() => handleTabChange(index)}
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
  );
};

const TabComponent: React.FC<TabComponentProps> = ({ tabs }) => {
  // Use a default tab index without relying on search params for the initial state
  const [activeTab, setActiveTab] = useState(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize content refs
  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, tabs.length);
  }, [tabs.length]);

  return (
    <div className="relative flex flex-col md:flex-row w-[95%] pt-4 md:pt-4 h-full mx-auto text-gray-700">
      {/* Tab Navigation - Horizontal on mobile, Vertical on desktop */}
      <div className="w-full md:w-40 flex-shrink-0 z-10 mb-4 md:mb-0">
        <Suspense
          fallback={
            <ul className="w-full flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
              {tabs.map((tab, index) => (
                <li
                  key={index}
                  className="text-center leading-9 cursor-pointer transition-all duration-300 whitespace-nowrap px-3 md:px-0"
                >
                  <span className="inline-block px-2 text-sm">{tab.title}</span>
                </li>
              ))}
            </ul>
          }
        >
          <TabSelector
            tabs={tabs}
            onTabChange={setActiveTab}
            activeTab={activeTab}
          />
        </Suspense>
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
