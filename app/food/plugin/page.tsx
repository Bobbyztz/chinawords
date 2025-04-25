"use client";

import React from "react";
import ChinawordsNavigation from "../../components/ChinawordsNavigation";
import TabComponent from "../../components/TabComponent";
import { navigationLinks } from "../../data/environmentalData";
import Link from "next/link";
import Image from "next/image";

// Component for product philosophy
const ProductPhilosophy = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 font-serif-sc">产品理念</h2>
      <div className="prose prose-lg max-w-none">
        <p className="mb-4">
          &quot;Eat me!&quot;
          浏览器插件的设计理念是帮助中国食品爱好者在海外购物平台上做出更明智的选择，同时加深对中国食品文化的理解。
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

// Component for price comparison feature
const PriceComparison = () => {
  return (
    <div className="p-8 font-sans-sc">
      <h2 className="text-2xl font-bold font-serif-sc text-jade-green border-b-2 border-jade-green/30 pb-2 mb-6">
        价格比较
      </h2>
      <div className="text-gray-800 space-y-4 leading-relaxed">
        <p>
          在浏览Weee!或Yami平台时，您将注意到每个商品页面均集成了交互式标签。Weee!平台上显示Yami的比价标签，而Yami平台则显示Weee!的比价标签。点击这些标签后，系统会生成如下所示的信息弹窗。
        </p>

        <div className="my-6">
          <div className="image-container relative overflow-hidden rounded-lg shadow-md max-w-xl mx-auto">
            <Image
              src="/food/plugin/small_window.png"
              alt="价格比较信息弹窗"
              width={500}
              height={300}
              className="w-full h-auto transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="image-caption text-center text-sm text-gray-600 mt-2">
            价格比较信息弹窗
          </div>
        </div>

        <p className="border-b-2 border-gray-200 py-4">
          该弹窗通过浏览器内部机制，自动在对应平台搜索并检索商品信息。例如，当您在Weee!平台浏览时，系统会检索并展示该商品在Yami平台的相关信息，反之亦然。
        </p>
        <p>
          需要注意的是，由于Weee!与Yami平台采用不同的技术架构，加之个人网络环境差异，查询响应时间可能有所不同。我们的插件内置了智能重试机制，但在特定情况下仍可能出现查询未成功的情况。
        </p>
        <p>
          点击信息弹窗中的商品名称，系统将展示包含图片的详细比较视图。该视图默认显示五个竞品商品信息及当前浏览商品信息，其中当前浏览商品位于列表末位，便于直观对比。
        </p>

        <div className="my-6">
          <div className="image-container relative overflow-hidden rounded-lg shadow-md max-w-xl mx-auto">
            <Image
              src="/food/plugin/big_window.png"
              alt="详细比较视图"
              width={500}
              height={300}
              className="w-full h-auto transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="image-caption text-center text-sm text-gray-600 mt-2">
            详细比较视图
          </div>
        </div>
      </div>
      <style jsx>{`
        .image-container img {
          display: block;
          max-width: 100%;
        }
      `}</style>
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
            老干妈是中国贵州省的一款著名辣椒酱，由陶华碧（人称&quot;老干妈&quot;）于1996年创立。这款酱料结合了贵州地区的辣椒文化和独特工艺，已成为中国家喻户晓的调味品，象征着家的味道和乡愁记忆。
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
          当您浏览 Weee! 或 Yami
          的产品列表页面时，插件会在每个产品旁边显示价格比较信息，帮助您快速找到最优惠的选择。
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
          感谢您了解 &quot;Eat me!&quot;
          浏览器插件。您可以返回美食主页，探索更多中国美食文化内容。
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
