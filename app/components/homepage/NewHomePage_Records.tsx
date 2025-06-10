import React from "react";

interface NewHomePageRecordsProps {
  registerSection: (el: HTMLElement | null, index: number) => void;
}

const NewHomePage_Records: React.FC<NewHomePageRecordsProps> = ({ registerSection }) => {
  return (
    <section
      id="records-section"
      className="h-screen w-full py-4 px-3 flex items-center justify-center"
      ref={(el) => registerSection(el, 5)}
    >
      <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-medium w-full h-[calc(100%-9px)] overflow-y-auto">
        <div className="h-full p-6">
          <h2 className="text-3xl font-bold text-center pt-10 mb-4 font-serif-sc">
            我们的记录
          </h2>
          <p className="text-center text-dark-gray mb-8 max-w-2xl mx-auto">
            用数据见证文化与创新的影响力
          </p>

          {/* 数据统计展示 - 中国风极简设计 */}
          <div className="max-w-4xl mx-auto mb-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center border-b-2 border-film-red pb-3 pt-2">
              <div className="text-3xl font-bold text-film-red font-serif-sc">1,200<span className="text-xl">+</span></div>
              <div className="text-xs text-dark-gray mt-1">记录案例</div>
            </div>
            <div className="text-center border-b-2 border-film-red pb-3 pt-2">
              <div className="text-3xl font-bold text-film-red font-serif-sc">680<span className="text-xl">万</span></div>
              <div className="text-xs text-dark-gray mt-1">年访问量</div>
            </div>
            <div className="text-center border-b-2 border-film-red pb-3 pt-2">
              <div className="text-3xl font-bold text-film-red font-serif-sc">300<span className="text-xl">+</span></div>
              <div className="text-xs text-dark-gray mt-1">合作机构</div>
            </div>
            <div className="text-center border-b-2 border-film-red pb-3 pt-2">
              <div className="text-3xl font-bold text-film-red font-serif-sc">95<span className="text-xl">%</span></div>
              <div className="text-xs text-dark-gray mt-1">用户好评率</div>
            </div>
          </div>

          {/* 表格展示 - 中国风极简设计 */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="grid grid-cols-4 gap-0">
              {/* 表头 */}
              <div className="border-b-2 border-film-red py-3 text-center font-serif-sc font-medium text-dark-gray">项目类别</div>
              <div className="border-b-2 border-film-red py-3 text-center font-serif-sc font-medium text-dark-gray">收录数量</div>
              <div className="border-b-2 border-film-red py-3 text-center font-serif-sc font-medium text-dark-gray">访问人次</div>
              <div className="border-b-2 border-film-red py-3 text-center font-serif-sc font-medium text-dark-gray">好评率</div>

              {/* 衣·时尚传承 */}
              <div className="border-b border-paper-gray py-4 text-center font-medium text-dark-gray">衣·时尚传承</div>
              <div className="border-b border-paper-gray py-4 text-center text-dark-gray">286</div>
              <div className="border-b border-paper-gray py-4 text-center text-dark-gray">152万</div>
              <div className="border-b border-paper-gray py-4 text-center text-dark-gray">93%</div>

              {/* 食·味蕾中国 */}
              <div className="border-b border-paper-gray py-4 text-center font-medium text-dark-gray">食·味蕾中国</div>
              <div className="border-b border-paper-gray py-4 text-center text-dark-gray">412</div>
              <div className="border-b border-paper-gray py-4 text-center text-dark-gray">246万</div>
              <div className="border-b border-paper-gray py-4 text-center text-dark-gray">97%</div>

              {/* 住·空间美学 */}
              <div className="border-b border-paper-gray py-4 text-center font-medium text-dark-gray">住·空间美学</div>
              <div className="border-b border-paper-gray py-4 text-center text-dark-gray">178</div>
              <div className="border-b border-paper-gray py-4 text-center text-dark-gray">98万</div>
              <div className="border-b border-paper-gray py-4 text-center text-dark-gray">91%</div>

              {/* 行·绿色出行 */}
              <div className="border-b border-paper-gray py-4 text-center font-medium text-dark-gray">行·绿色出行</div>
              <div className="border-b border-paper-gray py-4 text-center text-dark-gray">324</div>
              <div className="border-b border-paper-gray py-4 text-center text-dark-gray">184万</div>
              <div className="border-b border-paper-gray py-4 text-center text-dark-gray">94%</div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/impact"
              className="inline-block border border-film-red text-film-red hover:bg-film-red hover:text-white px-8 py-2 rounded-md text-lg font-medium transition-all duration-300"
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
