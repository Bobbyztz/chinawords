import React from "react";

interface NewHomePageNewsletterBioProps {
  registerSection: (el: HTMLElement | null, index: number) => void;
}

const NewHomePage_NewsletterBio: React.FC<NewHomePageNewsletterBioProps> = ({
  registerSection,
}) => {
  return (
    <section
      id="newsletter-bio-section"
      className="h-screen w-full py-4 px-3 flex items-center justify-center"
      ref={(el) => registerSection(el, 7)}
    >
      <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-lg w-full h-[calc(100%-9px)] overflow-y-auto">
        <div className="h-full p-6">
          <div className="max-w-xl mt-16 mx-auto">
            {/* Newsletter Section - 墨绿色主题 */}
            <div className="bg-transparent rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl text-center font-bold font-serif-sc text-[#2E8B57]">
                    订阅我们的通讯
                  </h3>
                </div>

                <div className="border-l-2 border-[#2E8B57]/30 pl-4 py-1 mb-5">
                  <p className="text-gray-700 text-sm">
                    每周精选内容直达您的邮箱，包括文化活动、传统节日解读、艺术展览等精彩内容。
                  </p>
                </div>

                <form className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="您的邮箱地址"
                      className="w-full px-4 py-2 text-sm rounded border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#2E8B57] focus:border-[#2E8B57] transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="relative inline-block text-sm font-semibold bg-[#2E8B57] text-white hover:bg-[#236b42] hover:cursor-pointer px-5 py-2 rounded-md transition-colors duration-300 overflow-hidden"
                      style={{ isolation: "isolate" }}
                    >
                      订阅通讯
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs text-center mt-2">
                    我们尊重您的隐私，您可以随时取消订阅。
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Footer Links - 青灰色主题 */}
          <div className="mt-12 pt-14">
            <div className="max-w-5xl mx-auto">
              {/* 页脚标题 */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-serif-sc text-[#5D6D7E] inline-block relative">
                  <span className="relative z-10">探索更多</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-[#5D6D7E]/20"></span>
                </h3>
              </div>

              {/* 页脚链接 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h4 className="text-sm font-bold mb-4 text-[#5D6D7E] pb-2 border-b border-[#5D6D7E]/20">
                    关于我们
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <a
                        href="/about#mission"
                        className="text-gray-600 hover:text-[#5D6D7E] transition-colors duration-300"
                      >
                        我们的使命
                      </a>
                    </li>
                    <li>
                      <a
                        href="/about#team"
                        className="text-gray-600 hover:text-[#5D6D7E] transition-colors duration-300"
                      >
                        团队介绍
                      </a>
                    </li>
                    <li>
                      <a
                        href="/about#partners"
                        className="text-gray-600 hover:text-[#5D6D7E] transition-colors duration-300"
                      >
                        合作伙伴
                      </a>
                    </li>
                    <li>
                      <a
                        href="/careers"
                        className="text-gray-600 hover:text-[#5D6D7E] transition-colors duration-300"
                      >
                        加入我们
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold mb-4 text-[#2E8B57] pb-2 border-b border-[#2E8B57]/20">
                    基础板块
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <a
                        href="/fashion"
                        className="text-gray-600 hover:text-[#2E8B57] transition-colors duration-300"
                      >
                        衣·时尚传承
                      </a>
                    </li>
                    <li>
                      <a
                        href="/food"
                        className="text-gray-600 hover:text-[#2E8B57] transition-colors duration-300"
                      >
                        食·味蕾中国
                      </a>
                    </li>
                    <li>
                      <a
                        href="/living"
                        className="text-gray-600 hover:text-[#2E8B57] transition-colors duration-300"
                      >
                        住·空间美学
                      </a>
                    </li>
                    <li>
                      <a
                        href="/travel"
                        className="text-gray-600 hover:text-[#2E8B57] transition-colors duration-300"
                      >
                        行·绿色出行
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold mb-4 text-[#9C4A31] pb-2 border-b border-[#9C4A31]/20">
                    进阶板块
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <a
                        href="/tech"
                        className="text-gray-600 hover:text-[#2E8B57] transition-colors duration-300"
                      >
                        用·科技工具
                      </a>
                    </li>
                    <li>
                      <a
                        href="/education"
                        className="text-gray-600 hover:text-[#2E8B57] transition-colors duration-300"
                      >
                        育·教育发展
                      </a>
                    </li>
                    <li>
                      <a
                        href="/health"
                        className="text-gray-600 hover:text-[#2E8B57] transition-colors duration-300"
                      >
                        康·健康福祉
                      </a>
                    </li>
                    <li>
                      <a
                        href="/entertainment"
                        className="text-gray-600 hover:text-[#2E8B57] transition-colors duration-300"
                      >
                        乐·休闲娱乐
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold mb-4 text-[#C20F1E] pb-2 border-b border-[#C20F1E]/20">
                    互动参与
                  </h4>
                  <ul className="space-y-2 text-xs">
                    <li>
                      <a
                        href="/community"
                        className="text-gray-600 hover:text-[#C20F1E] transition-colors duration-300"
                      >
                        社区活动
                      </a>
                    </li>
                    <li>
                      <a
                        href="/upload"
                        className="text-gray-600 hover:text-[#C20F1E] transition-colors duration-300"
                      >
                        内容贡献
                      </a>
                    </li>
                    <li>
                      <a
                        href="/feedback"
                        className="text-gray-600 hover:text-[#C20F1E] transition-colors duration-300"
                      >
                        意见反馈
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 版权信息 */}
              <div className="mt-10 pt-6 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500">
                  &copy; 2024 Chinawords 保留所有权利
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHomePage_NewsletterBio;
