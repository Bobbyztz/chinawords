import React from "react";

interface NewHomePageActivitiesProps {
  registerSection: (el: HTMLElement | null, index: number) => void;
}

const NewHomePage_Activities: React.FC<NewHomePageActivitiesProps> = ({ registerSection }) => {
  return (
    <section
      id="activities-section"
      className="h-screen w-full py-4 px-3 flex items-center justify-center"
      ref={(el) => registerSection(el, 6)}
    >
      <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-medium w-full h-[calc(100%-9px)] overflow-y-auto">
        <div className="h-full p-6">
          <h2 className="text-3xl font-bold text-center pt-10 mb-6 font-serif-sc">
            参与活动
          </h2>
          <p className="text-center text-dark-gray mb-8 max-w-2xl mx-auto">
            探索传统与现代交融的文化体验
          </p>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 线上活动 - 墨绿色主题 */}
            <div className="border-t-4 border-jade-green bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-jade-green/10 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-jade-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold font-serif-sc text-jade-green">线上活动</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start border-l-2 border-jade-green/30 pl-4 py-1">
                    <div>
                      <h4 className="font-medium text-dark-gray">中国文化线上讲座</h4>
                      <p className="text-sm text-dark-gray mt-1">每周四晚8点，专家带你探索中国文化的方方面面。</p>
                    </div>
                  </div>

                  <div className="flex items-start border-l-2 border-jade-green/30 pl-4 py-1">
                    <div>
                      <h4 className="font-medium text-dark-gray">内容贡献计划</h4>
                      <p className="text-sm text-dark-gray mt-1">分享你的知识，成为我们的内容贡献者。</p>
                    </div>
                  </div>

                  <div className="flex items-start border-l-2 border-jade-green/30 pl-4 py-1">
                    <div>
                      <h4 className="font-medium text-dark-gray">社区讨论</h4>
                      <p className="text-sm text-dark-gray mt-1">加入我们的论坛，与志同道合的朋友交流。</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <a
                    href="/community"
                    className="inline-block border border-jade-green text-jade-green hover:bg-jade-green hover:text-white px-6 py-2 rounded-md transition-colors duration-300"
                  >
                    参与线上活动
                  </a>
                </div>
              </div>
            </div>

            {/* 线下活动 - 砖红色主题 */}
            <div className="border-t-4 border-film-red bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-film-red/10 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-film-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold font-serif-sc text-film-red">线下活动</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start border-l-2 border-film-red/30 pl-4 py-1">
                    <div>
                      <h4 className="font-medium text-dark-gray">文化体验工作坊</h4>
                      <p className="text-sm text-dark-gray mt-1">每月举办，亲身体验中国传统工艺的魅力。</p>
                    </div>
                  </div>

                  <div className="flex items-start border-l-2 border-film-red/30 pl-4 py-1">
                    <div>
                      <h4 className="font-medium text-dark-gray">城市文化探索</h4>
                      <p className="text-sm text-dark-gray mt-1">跟随我们的导览，探索城市中的文化宝藏。</p>
                    </div>
                  </div>

                  <div className="flex items-start border-l-2 border-film-red/30 pl-4 py-1">
                    <div>
                      <h4 className="font-medium text-dark-gray">社区聚会</h4>
                      <p className="text-sm text-dark-gray mt-1">与社区成员面对面交流，分享经验。</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <a
                    href="/community"
                    className="inline-block border border-film-red text-film-red hover:bg-film-red hover:text-white px-6 py-2 rounded-md transition-colors duration-300"
                  >
                    参与线下活动
                  </a>
                </div>
              </div>
            </div>

            {/* 特别活动 - 青灰色主题 */}
            <div className="border-t-4 border-ink-dark bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-ink-dark/10 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-ink-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold font-serif-sc text-ink-dark">特别活动</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start border-l-2 border-ink-dark/30 pl-4 py-1">
                    <div>
                      <h4 className="font-medium text-dark-gray">文化节庆典</h4>
                      <p className="text-sm text-dark-gray mt-1">每年定期举办，庆祝传统节日与文化遗产。</p>
                    </div>
                  </div>

                  <div className="flex items-start border-l-2 border-ink-dark/30 pl-4 py-1">
                    <div>
                      <h4 className="font-medium text-dark-gray">艺术展览</h4>
                      <p className="text-sm text-dark-gray mt-1">展示当代艺术家对传统文化的现代诠释。</p>
                    </div>
                  </div>

                  <div className="flex items-start border-l-2 border-ink-dark/30 pl-4 py-1">
                    <div>
                      <h4 className="font-medium text-dark-gray">文化沙龙</h4>
                      <p className="text-sm text-dark-gray mt-1">小型精品活动，深度探讨特定文化主题。</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <a
                    href="/special-events"
                    className="inline-block border border-ink-dark text-ink-dark hover:bg-ink-dark hover:text-white px-6 py-2 rounded-md transition-colors duration-300"
                  >
                    参与特别活动
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 活动日历提示 */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center justify-center space-x-2 text-dark-gray">
              <svg className="w-5 h-5 text-ink-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">查看完整活动日历，请访问</span>
              <a href="/events" className="text-ink-dark hover:text-jade-green font-medium underline">活动页面</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHomePage_Activities;
