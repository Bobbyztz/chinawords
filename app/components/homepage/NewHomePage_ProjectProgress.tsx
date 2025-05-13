import React from "react";

interface NewHomePageProjectProgressProps {
  registerSection: (el: HTMLElement | null, index: number) => void;
}

// TOC item type
interface TocItem {
  title: string;
  url: string;
}

// Custom TOC component
const TableOfContents: React.FC<{ items: TocItem[] }> = ({ items }) => {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index}>
          <a
            href={item.url}
            className="block p-2 hover:bg-white/70 rounded transition-colors text-gray-800 hover:text-black"
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

// Example TOC items - replace with your actual project milestones/sections
const leftTocItems = [
  { title: "调研阶段", url: "#research" },
  { title: "需求分析", url: "#requirements" },
  { title: "设计阶段", url: "#design" },
];

const rightTocItems = [
  { title: "开发阶段", url: "#development" },
  { title: "测试阶段", url: "#testing" },
  { title: "部署阶段", url: "#deployment" },
];

const NewHomePage_ProjectProgress: React.FC<
  NewHomePageProjectProgressProps
> = ({ registerSection }) => {
  return (
    <section
      id="project-progress-section"
      className="h-screen w-full py-4 px-3 flex items-center justify-center"
      ref={(el) => registerSection(el, 1)}
    >
      <div className="bg-white/30 backdrop-blur-sm rounded-lg shadow-lg w-full h-[calc(100%-9px)] overflow-y-auto">
        <div className="h-full p-6">
          <h2 className="text-3xl font-bold text-center pt-10 mb-16 font-serif-sc">
            项目进度
          </h2>

          <div className="flex flex-col md:flex-row gap-8 mt-8">
            {/* Left TOC */}
            <div className="w-full md:w-1/2">
              <div className="border rounded-lg p-4 bg-white/50">
                <h3 className="text-xl font-bold mb-4">前期阶段</h3>
                <TableOfContents items={leftTocItems} />
              </div>
            </div>

            {/* Right TOC */}
            <div className="w-full md:w-1/2">
              <div className="border rounded-lg p-4 bg-white/50">
                <h3 className="text-xl font-bold mb-4">后期阶段</h3>
                <TableOfContents items={rightTocItems} />
              </div>
            </div>
          </div>

          {/* Content sections that the TOC links to would go here */}
        </div>
      </div>
    </section>
  );
};

export default NewHomePage_ProjectProgress;
