'use client';

import React from 'react';
import ChinawordsNavigation from '../../components/ChinawordsNavigation';
import TabComponent from '../../components/TabComponent';
import { navigationLinks } from '../../data/environmentalData';
import Link from 'next/link';

// Placeholder component for product philosophy
const ProductPhilosophy = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 font-serif-sc">产品理念</h2>
      <div className="prose prose-lg max-w-none">
        <p className="mb-4">
          &quot;Eat me!&quot; 浏览器插件的设计理念是帮助中国食品爱好者在海外购物平台上做出更明智的选择，同时加深对中国食品文化的理解。
        </p>
        <p className="mb-4">
          我们相信，食品不仅仅是满足口腹之欲的商品，更是承载着丰富文化内涵的载体。通过提供价格比较和文化背景信息，我们希望用户能够：
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>更经济地购买到心仪的中国食品</li>
          <li>了解食品背后的历史和文化故事</li>
          <li>在海外也能保持与中国饮食文化的联系</li>
        </ul>
      </div>
    </div>
  );
};

// Placeholder component for price comparison
const PriceComparison = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 font-serif-sc">价格比较</h2>
      <div className="prose prose-lg max-w-none">
        <p className="mb-4">
          我们的价格比较功能可以帮助您在不同平台之间找到最优惠的选择。
        </p>
        <p className="mb-4">
          当您浏览 Weee! 或 Yami 网站上的产品时，插件会自动搜索另一个平台上的相同或类似产品，并显示价格差异。
        </p>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-bold mb-2">价格比较示例：</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-white p-3 rounded shadow-sm">
              <p className="font-bold">Weee!:</p>
              <p>老干妈辣椒酱 - $3.99</p>
            </div>
            <div className="flex-1 bg-white p-3 rounded shadow-sm">
              <p className="font-bold">Yami:</p>
              <p>老干妈辣椒酱 - $4.29</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder component for food culture information
const FoodCultureInfo = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 font-serif-sc">美食文化信息</h2>
      <div className="prose prose-lg max-w-none">
        <p className="mb-4">
          了解您购买的食品背后的文化和历史背景，增强您的购物体验。
        </p>
        <p className="mb-4">
          我们的插件利用 OpenAI 的 API 提供关于中国食品的丰富信息，包括：
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>食品的历史起源</li>
          <li>地域文化特色</li>
          <li>传统制作工艺</li>
          <li>相关的节日和习俗</li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">示例：老干妈辣椒酱</h3>
          <p>
            老干妈是中国贵州省的一款著名辣椒酱，由陶华碧（人称"老干妈"）于1996年创立。这款酱料结合了贵州地区的辣椒文化和独特工艺，已成为中国家喻户晓的调味品，象征着家的味道和乡愁记忆。
          </p>
        </div>
      </div>
    </div>
  );
};

// Placeholder component for product list browsing
const ProductListBrowsing = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 font-serif-sc">产品列表浏览</h2>
      <div className="prose prose-lg max-w-none">
        <p className="mb-4">
          在产品列表页面上直接比较多个产品的价格，提高您的购物效率。
        </p>
        <p className="mb-4">
          当您浏览 Weee! 或 Yami 的产品列表页面时，插件会在每个产品旁边显示价格比较信息，帮助您快速找到最优惠的选择。
        </p>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-bold mb-2">功能特点：</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>批量价格比较</li>
            <li>价格差异高亮显示</li>
            <li>一键跳转到另一平台的同款产品</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Placeholder component for return to food page
const ReturnToFoodPage = () => {
  return (
    <div className="p-8 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6 font-serif-sc">返回美食页面</h2>
      <div className="prose prose-lg max-w-none text-center mb-8">
        <p>
          感谢您了解 &quot;Eat me!&quot; 浏览器插件。您可以返回美食主页，探索更多中国美食文化内容。
        </p>
      </div>
      <Link
        href="/food"
        className="inline-block bg-jade-green text-white px-6 py-3 rounded-md hover:bg-jade-green/90 transition-colors duration-300"
      >
        返回美食页面
      </Link>
    </div>
  );
};

export default function FoodPluginPage() {
  // Define the tab structure
  const tabs = [
    {
      title: "产品理念",
      content: <ProductPhilosophy />,
    },
    {
      title: "价格比较",
      content: <PriceComparison />,
    },
    {
      title: "美食文化信息",
      content: <FoodCultureInfo />,
    },
    {
      title: "产品列表浏览",
      content: <ProductListBrowsing />,
    },
    {
      title: "返回美食页面",
      content: <ReturnToFoodPage />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col texture-subtle">
      <ChinawordsNavigation links={navigationLinks} />

      <main className="flex-grow pt-12 flex flex-col">
        <div className="flex flex-col flex-grow">
          <div className="flex flex-col gap-y-6 flex-grow">
            <TabComponent tabs={tabs} />
          </div>
        </div>
      </main>
    </div>
  );
}
