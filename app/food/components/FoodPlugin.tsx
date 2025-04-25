'use client';

import React from 'react';
import Link from 'next/link';

const FoodPlugin: React.FC = () => {
  return (
    <div className="plugin-container max-w-6xl mx-auto px-4 py-8 font-sans-sc">
      {/* 标题区域 - 使用中国风设计元素 */}
      <div className="text-center mb-12 relative">
        <div className="absolute left-0 right-0 top-1/2 border-t border-gray-300 -z-10"></div>
        <h1 className="inline-block bg-white px-8 text-4xl font-bold font-serif-sc text-film-red relative z-10">
          Eat me! <span className="text-jade-green">浏览器插件</span>
        </h1>
      </div>

      {/* 介绍卡片 - 使用优雅的阴影和边框 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg mb-12 border border-gray-100 transform transition-all duration-500 hover:shadow-xl">
        <p className="text-md font-semibold leading-relaxed text-gray-800">
          "Eat me!" 是一款专为中国食品爱好者设计的开源浏览器插件，旨在帮助用户在 Weee! 和 Yami 等中国食品电商平台上比较价格、查看食品的历史和文化背景信息、并利用AI技术将相关信息转化为属于用户的个性化产品，以达到促进消费、文化宣传的作用。
        </p>
        <p className="text-md font-semibold pt-4 leading-relaxed text-gray-800">
          我们认为AI时代的软件应当成为公共基础设施，用户是其生命力的保障。当传统软件霸占用户数据权益的时候，我们认为共享共建才是新时代应有的生态。我们鼓励并支持用户直接或间接参与本项目。
        </p>
      </div>

      {/* 功能区域标题 */}
      <div className="flex justify-between pl-1 items-center mb-8 w-full">
        <h2 className="text-2xl font-bold font-serif-sc text-jade-green border-b-2 border-jade-green/30 pb-2">
          主要功能
        </h2>
        <Link
          href="/food/plugin"
          className="text-sm text-jade-green pr-3 hover:font-semibold"
        >
          更多
        </Link>
      </div>

      {/* 功能卡片容器 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* 功能卡片 1: 价格比较 */}
        <div className="feature-card">
          <div className="card-header">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-film-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-800">价格比较</h3>
          </div>
          <p className="text-gray-600 mb-4">
            在 Weee! 和 Yami 平台之间比较相同或类似产品的价格，帮助您找到最优惠的选择。
          </p>

          {/* 图片展示区 - 使用悬停效果和优雅的过渡 */}
          <div className="image-showcase">
            <div className="image-container">
              <img
                src="/food/plugin/small_window.png"
                alt="价格比较弹窗"
                className="rounded-lg shadow-md w-full transition-transform duration-500 hover:scale-105"
              />
              <div className="image-caption">价格比较弹窗</div>
            </div>
            <div className="image-container mt-4">
              <img
                src="/food/plugin/big_window.png"
                alt="详细比较视图"
                className="rounded-lg shadow-md w-full transition-transform duration-500 hover:scale-105"
              />
              <div className="image-caption">详细比较视图</div>
            </div>
          </div>
        </div>

        {/* 功能卡片 2: 食品文化信息 */}
        <div className="feature-card">
          <div className="card-header">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-film-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-800">食品文化信息</h3>
          </div>
          <p className="text-gray-600 mb-4">
            通过 OpenAI 的 API 提供食品的历史和文化背景信息，帮助您了解中国食品的丰富文化内涵。
          </p>

          <div className="image-showcase">
            <div className="image-container">
              <img
                src="/food/plugin/detail_map.png"
                alt="食品文化信息"
                className="rounded-lg shadow-md w-full transition-transform duration-500 hover:scale-105"
              />
              <div className="image-caption">食品文化信息展示</div>
            </div>
          </div>
        </div>

        {/* 功能卡片 3: 产品列表浏览 */}
        <div className="feature-card">
          <div className="card-header">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-film-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <h3 className="text-xl font-bold text-gray-800">产品列表浏览</h3>
          </div>
          <p className="text-gray-600 mb-4">
            在产品列表页面上直接比较多个产品的价格，提高您的购物效率。
          </p>

          <div className="image-showcase">
            <div className="image-container">
              <img
                src="/food/plugin/listing_page.png"
                alt="产品列表浏览"
                className="rounded-lg shadow-md w-full transition-transform duration-500 hover:scale-105"
              />
              <div className="image-caption">产品列表页面比较功能</div>
            </div>
          </div>
        </div>
      </div>

      {/* 隐私保护区域 - 使用纸质纹理背景 */}
      <div className="privacy-section texture-subtle bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg mb-12 border border-gray-100">
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-jade-green mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h2 className="text-2xl font-bold font-serif-sc text-gray-800">隐私保护</h2>
        </div>

        <p className="text-gray-700 mb-6">
          我们高度重视用户隐私，插件设计遵循以下原则：
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="privacy-card">
            <div className="privacy-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800">本地存储</h3>
            <p className="text-gray-600">所有产品信息和比较结果仅存储在您的浏览器本地，并在24小时后自动清除</p>
          </div>

          <div className="privacy-card">
            <div className="privacy-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800">无远程数据库</h3>
            <p className="text-gray-600">插件不会在任何远程数据库中存储您的浏览历史、产品浏览记录或个人信息</p>
          </div>

          <div className="privacy-card">
            <div className="privacy-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800">透明的权限</h3>
            <p className="text-gray-600">插件仅请求必要的权限来提供核心功能</p>
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            href="/food/plugin/privacy"
            className="inline-flex items-center bg-green-200/70 text-white px-6 py-3 rounded-md hover:bg-green-300 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            查看完整隐私政策
          </Link>
        </div>
      </div>

      {/* 开源代码与安装区域 */}
      <div className="opensource-section texture-subtle bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg mb-12 border border-gray-100">
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-jade-green mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <h2 className="text-2xl font-bold font-serif-sc text-gray-800">开源代码</h2>
        </div>

        <p className="text-gray-700 mb-6">
          "Eat me!" 插件的代码是开源的，您可以在 GitHub 上查看完整的源代码，确保插件的安全性和透明度。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* GitHub 仓库卡片 */}
          <div className="opensource-card bg-white rounded-lg p-6 shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:transform hover:translate-y-[-5px]">
            <div className="flex items-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-film-red mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <h3 className="text-lg font-bold text-gray-800">源代码仓库</h3>
            </div>
            <p className="text-gray-600 mb-4">
              查看完整的源代码，了解插件的工作原理，或者参与贡献改进。
            </p>
            <a
              href="https://github.com/Bobbyztz/china-words-food"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300 shadow-sm hover:shadow-md text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              访问 GitHub 仓库
            </a>
          </div>

          {/* 插件安装卡片 */}
          <div className="opensource-card bg-white rounded-lg p-6 shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:transform hover:translate-y-[-5px]">
            <div className="flex items-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-film-red mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <h3 className="text-lg font-bold text-gray-800">安装插件</h3>
            </div>
            <p className="text-gray-600 mb-4">
              从 Chrome 网上应用店安装 "Eat me!" 插件，开始您的中国食品文化探索之旅。
            </p>
            <a
              href="https://chromewebstore.google.com/detail/eat-me/chedmnolnacnkcmagndkjhaegmkpophi?utm_source=ext_app_menu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border text-black px-4 py-2 rounded-md hover:bg-jade-green/80 transition-colors duration-300 shadow-sm hover:shadow-md text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              安装 Chrome 插件
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* 全局样式 */
        .plugin-container {
          color: var(--color-text);
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* 功能卡片样式 */
        .feature-card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          padding: 24px;
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .card-header h3 {
          margin-left: 12px;
        }

        .image-showcase {
          margin-top: auto;
        }

        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
        }

        .image-caption {
          text-align: center;
          font-size: 0.875rem;
          color: #666;
          margin-top: 8px;
        }

        /* 隐私卡片样式 */
        .privacy-card {
          background-color: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          height: 100%;
        }

        .privacy-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .privacy-icon {
          background-color: rgba(46, 139, 87, 0.1);
          color: var(--color-jade-green);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        /* 响应式调整 */
        @media (max-width: 768px) {
          .feature-card {
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default FoodPlugin;
