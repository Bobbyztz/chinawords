import React from "react";

interface NewHomePageRecordsProps {
  registerSection: (el: HTMLElement | null, index: number) => void;
}

const NewHomePage_Records: React.FC<NewHomePageRecordsProps> = ({
  registerSection,
}) => {
  return (
    <section
      id="records-section"
      className="h-screen w-full py-4 px-3 flex items-center justify-center"
      ref={(el) => registerSection(el, 5)}
    >
      <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-lg w-full h-[calc(100%-9px)] overflow-y-auto">
        <div className="h-full p-6">
          <h2 className="text-3xl font-bold text-center pt-10 mb-4 font-serif-sc">
            我们的记录
          </h2>
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
            用数据见证文化与创新的影响力
          </p>

          {/* 数据统计展示 - 中国风极简设计 */}
          <div className="max-w-4xl mx-auto mb-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center border-b-2 border-[#C20F1E] pb-3 pt-2">
              <div className="text-3xl font-bold text-[#C20F1E] font-serif-sc">
                1,200<span className="text-xl">+</span>
              </div>
              <div className="text-xs text-gray-600 mt-1">记录案例</div>
            </div>
            <div className="text-center border-b-2 border-[#C20F1E] pb-3 pt-2">
              <div className="text-3xl font-bold text-[#C20F1E] font-serif-sc">
                680<span className="text-xl">万</span>
              </div>
              <div className="text-xs text-gray-600 mt-1">年访问量</div>
            </div>
            <div className="text-center border-b-2 border-[#C20F1E] pb-3 pt-2">
              <div className="text-3xl font-bold text-[#C20F1E] font-serif-sc">
                300<span className="text-xl">+</span>
              </div>
              <div className="text-xs text-gray-600 mt-1">合作机构</div>
            </div>
            <div className="text-center border-b-2 border-[#C20F1E] pb-3 pt-2">
              <div className="text-3xl font-bold text-[#C20F1E] font-serif-sc">
                95<span className="text-xl">%</span>
              </div>
              <div className="text-xs text-gray-600 mt-1">用户好评率</div>
            </div>
          </div>

          {/* 表格展示 - 中国风极简设计 */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="grid grid-cols-4 gap-0">
              {/* 表头 */}
              <div className="border-b-2 border-[#C20F1E] py-3 text-center font-serif-sc font-medium text-gray-700">
                项目类别
              </div>
              <div className="border-b-2 border-[#C20F1E] py-3 text-center font-serif-sc font-medium text-gray-700">
                收录数量
              </div>
              <div className="border-b-2 border-[#C20F1E] py-3 text-center font-serif-sc font-medium text-gray-700">
                访问人次
              </div>
              <div className="border-b-2 border-[#C20F1E] py-3 text-center font-serif-sc font-medium text-gray-700">
                好评率
              </div>

              {/* 衣·时尚传承 */}
              <div className="border-b border-gray-200 py-4 text-center font-medium text-gray-800">
                衣·时尚传承
              </div>
              <div className="border-b border-gray-200 py-4 text-center text-gray-600">
                286
              </div>
              <div className="border-b border-gray-200 py-4 text-center text-gray-600">
                152万
              </div>
              <div className="border-b border-gray-200 py-4 text-center text-gray-600">
                93%
              </div>

              {/* 食·味蕾中国 */}
              <div className="border-b border-gray-200 py-4 text-center font-medium text-gray-800">
                食·味蕾中国
              </div>
              <div className="border-b border-gray-200 py-4 text-center text-gray-600">
                412
              </div>
              <div className="border-b border-gray-200 py-4 text-center text-gray-600">
                246万
              </div>
              <div className="border-b border-gray-200 py-4 text-center text-gray-600">
                97%
              </div>

              {/* 住·空间美学 */}
              <div className="border-b border-gray-200 py-4 text-center font-medium text-gray-800">
                住·空间美学
              </div>
              <div className="border-b border-gray-200 py-4 text-center text-gray-600">
                178
              </div>
              <div className="border-b border-gray-200 py-4 text-center text-gray-600">
                98万
              </div>
              <div className="border-b border-gray-200 py-4 text-center text-gray-600">
                91%
              </div>

              {/* 行·绿色出行 */}
              <div className="border-b border-gray-200 py-4 text-center font-medium text-gray-800">
                行·绿色出行
              </div>
              <div className="border-b border-gray-200 py-4 text-center text-gray-600">
                324
              </div>
              <div className="border-b border-gray-200 py-4 text-center text-gray-600">
                184万
              </div>
              <div className="border-b border-gray-200 py-4 text-center text-gray-600">
                94%
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/impact"
              className="inline-block border border-[#C20F1E] text-[#C20F1E] hover:bg-[#C20F1E] hover:text-white px-8 py-2 rounded-md text-lg font-medium transition-all duration-300"
            >
              了解我们的影响力
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHomePage_Records;
