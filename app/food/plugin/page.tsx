"use client";

import React from "react";
import ChinawordsNavigation from "../../components/ChinawordsNavigation";
import TabComponent from "../../components/TabComponent";
import { navigationLinks } from "../../data/environmentalData";
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

// Component for food culture information
const FoodCultureInfo = () => {
  return (
    <div className="p-8 font-sans-sc">
      <h2 className="text-2xl font-bold font-serif-sc text-jade-green border-b-2 border-jade-green/30 pb-2 mb-6">
        商品详情与文化信息
      </h2>
      <div className="text-gray-800 space-y-4 leading-relaxed">
        <p>左键点击商品卡片会进入商品细节栏。</p>
        <p>
          在栏目上方，可以看到用于展示商品原材料在历史上的时间跨度卡片（食品历史与文化）以及它在空间上的地理跨度卡片（世界地图）。同时本栏目将会逐渐纳入知名厨师的菜谱等信息。以及一个用于跳转的，目标是将（包括但不限于）以上信息产品化Share链接。
        </p>
        {/* Detail map image using Next.js Image component */}
        <div className="my-6">
          <div className="image-container relative overflow-hidden rounded-lg shadow-md max-w-xl mx-auto">
            {/* Ensure detail_map.png is in the public folder */}
            <Image
              src="/food/plugin/detail_map.png"
              alt="商品详情地图示例"
              width={600}
              height={400}
              className="w-full h-auto transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="image-caption text-center text-sm text-gray-600 mt-2">
            商品详情地图示例
          </div>
        </div>
        <p>
          栏目下方是一个世界地图，可以通过它查看食品原材料的构成、他们的时间地理信息等。
        </p>
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

// 产品列表浏览说明
const ProductListBrowsing = () => {
  return (
    <div className="p-8 font-sans-sc">
      <h2 className="text-2xl font-bold font-serif-sc text-jade-green border-b-2 border-jade-green/30 pb-2 mb-6">
        产品列表浏览
      </h2>
      <div className="text-gray-800 space-y-6 leading-relaxed">
        <p>
          以上方法适用于任一已在程序中注册的页面。如果有额外需求，欢迎联系项目方。你的贡献将被记录。
        </p>
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/food/plugin/listing_page.png"
            alt="产品列表页面示例"
            width={600}
            height={350}
            className="w-full max-w-xl h-auto rounded-lg shadow-md border"
          />
          <div className="image-caption text-center text-sm text-gray-600 mt-2">
            产品列表页面示例
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
