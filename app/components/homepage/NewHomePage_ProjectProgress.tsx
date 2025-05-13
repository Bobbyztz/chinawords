import React from "react";

interface NewHomePageProjectProgressProps {
  registerSection: (el: HTMLElement | null, index: number) => void;
}

// TOC item type
interface TocItem {
  title: string;
  url: string;
  active?: boolean;
}

// Custom TOC component styled like Fumadocs
const TableOfContents: React.FC<{
  items: TocItem[];
  title?: string;
  colorScheme?: "green" | "blue" | "red";
}> = ({ items, title = "On this page", colorScheme = "blue" }) => {
  // Color mapping based on the colorScheme
  const colors = {
    green: {
      hover: "hover:text-emerald-600",
      active: "text-emerald-700 font-medium",
      indicator: "bg-emerald-600",
    },
    blue: {
      hover: "hover:text-blue-500",
      active: "text-blue-500 font-medium",
      indicator: "bg-blue-500",
    },
    red: {
      hover: "hover:text-red-600",
      active: "text-red-700 font-medium",
      indicator: "bg-red-600",
    },
  };

  const currentColor = colors[colorScheme];

  return (
    <div className="pr-4">
      <div className="flex items-center text-gray-500 mb-4 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <line x1="21" y1="6" x2="3" y2="6"></line>
          <line x1="21" y1="12" x2="9" y2="12"></line>
          <line x1="21" y1="18" x2="7" y2="18"></line>
        </svg>
        {title}
      </div>
      <div className="border-l-2 border-gray-200 pl-4">
        {items.map((item, index) => (
          <div key={index} className="mb-3">
            <a
              href={item.url}
              className={`block py-1.5 text-sm ${
                currentColor.hover
              } transition-colors relative ${
                item.active ? currentColor.active : "text-gray-600"
              }`}
            >
              {item.active && (
                <span
                  className={`absolute -left-[17px] top-0 bottom-0 w-0.5 ${currentColor.indicator} rounded-full`}
                ></span>
              )}
              {item.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example TOC items with active states
const leftTocItems = [
  { title: "美食图片墙", url: "/food?view=图片墙总览", active: true },
  { title: "浏览器插件", url: "/food?view=浏览器插件" },
  { title: "个人资料", url: "/settings" },
];

const CenterTocItems = [
  { title: "个性食谱定制", url: "/food?view=个性食谱", active: true },
  { title: "相册制作栏目", url: "/food?view=相册制作" },
  { title: "风格定义图片", url: "/food?view=风格定义" },
  { title: "地方菜系图片", url: "/food?view=地方菜系" },
  { title: "食材溯源展示", url: "/food?view=食材溯源" },
];

const rightTocItems = [
  { title: "衣·时尚传承", url: "/clothing", active: true },
  { title: "住·空间美学", url: "/living" },
  { title: "行·绿色出行", url: "/travel" },
  { title: "...", url: "#others" },
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
          <h2 className="text-3xl font-bold text-center pt-10 mb-10 font-serif-sc">
            项目进度
          </h2>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left TOC */}
            <div className="w-full md:w-1/3">
              <div className="p-5 flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-6">已完成</h3>
                <TableOfContents
                  items={leftTocItems}
                  title="/food"
                  colorScheme="green"
                />
              </div>
            </div>

            {/* center TOC */}
            <div className="w-full md:w-1/3">
              <div className="p-5 flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-6">进行中</h3>
                <TableOfContents
                  items={CenterTocItems}
                  title="/food"
                  colorScheme="blue"
                />
              </div>
            </div>

            {/* right TOC */}
            <div className="w-full md:w-1/3">
              <div className="p-5 flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-6">未开始</h3>
                <TableOfContents
                  items={rightTocItems}
                  title="others"
                  colorScheme="red"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHomePage_ProjectProgress;
