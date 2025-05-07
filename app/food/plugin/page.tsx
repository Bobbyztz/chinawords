"use client";

import React from "react";
import ContentPageLayout from "../../components/ContentPageLayout";
import Image from "next/image";

// Component for product philosophy
const ProductPhilosophy = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 font-serif-sc">产品理念</h2>
      <div className="prose prose-sm max-w-none ">
        <p className="mb-4 ">
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

// Component for language adaptation
const LanguageAdaptation = () => {
  return (
    <div className="p-8 font-sans-sc">
      <h2 className="text-2xl font-bold font-serif-sc text-jade-green border-b-2 border-jade-green/30 pb-2 mb-6">
        多语言智能适配
      </h2>
      <div className="text-gray-800 space-y-4 leading-relaxed">
        <p>
          &#34;Eat me!&#34;
          插件具备智能语言检测与适配功能，能够自动识别用户当前浏览页面的主要语言，并在目标平台使用相应语言进行查询和信息展示。
        </p>
        <p>
          此功能特别适用于在多语言环境中使用的用户，例如在英文界面浏览中文食品或在中文界面浏览国际食品时，插件会智能切换查询语言，确保检索结果的准确性与相关性。
        </p>
        <p>语言适配系统支持以下功能：</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>自动检测页面主要语言（支持中文简体、中文繁体、英文等）</li>
          <li>根据检测结果调整搜索查询参数和关键词</li>
          <li>在跨平台比价时保持语言一致性，确保结果匹配度</li>
          <li>针对双语商品名称进行AI智能解析，提高搜索精确度（会员功能）</li>
        </ul>
        <p>最佳实践：</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>首先确认weee!和yami的页面语言都是所需要的语言</li>
          <li>如此可以保证查询商品的语言正确性</li>
        </ul>

        <div className="mt-8 pt-6 border-t-2 border-jade-green/20">
          <h3 className="text-xl font-serif-sc text-film-red mb-4">
            技术实现与用户体验
          </h3>
          <p className="mb-4">
            语言适配功能采用先进的自然语言处理技术，结合页面DOM元素分析和内容特征提取，实现高精度的语言环境识别。系统会分析页面标题、描述、关键词和主要内容区域，综合判断当前语言环境。
          </p>
          <p>
            此功能无需用户手动设置，完全自动化运行，为用户提供无缝的跨语言购物体验。在特殊情况下，用户也可通过插件设置面板手动指定偏好语言，覆盖自动检测结果。（待完成）
          </p>
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

        <div className="mt-8 pt-6 border-t-2 border-jade-green/20">
          <h3 className="text-xl font-serif-sc text-film-red mb-4">
            价值链与用户赋能
          </h3>
          <p className="mb-4">
            我们深信，从食品原材料的生产到最终消费的整个价值链中，蕴含着大量应当回归用户的价值。这条&quot;原材料养成-产地运输-菜谱制作-烹饪助手-个性体验&quot;的信息链条，承载着丰富的文化与实用价值。
          </p>
          <p>
            基于此理念，我们正在构建一套完善的机制，以确保用户的每一项贡献都能得到适当的认可与回馈。通过参与内容建设、分享独特见解或提供反馈，您不仅能够丰富平台的知识库，还将在这个不断发展的生态系统中获得相应权益。
          </p>
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

const DownloadAndRating = () => {
  return (
    <div className="p-8 font-sans-sc">
      <h2 className="text-2xl font-bold font-serif-sc text-jade-green border-b-2 border-jade-green/30 pb-2 mb-6">
        下载与评分
      </h2>
      <div className="text-gray-800 space-y-4 leading-relaxed">
        <p>
          &quot;Eat me!&quot;
          浏览器插件目前处于内测阶段，我们正在不断完善功能和用户体验。您可以通过以下方式获取插件：
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-8">
          <div className="bg-white/80 p-6 rounded-lg shadow-md border border-jade-green/20">
            <h3 className="text-xl font-serif-sc text-film-red mb-4">
              Chrome 浏览器
            </h3>
            <p className="mb-4">
              Chrome 插件商店发布审核中，目前可通过开发者模式安装：
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                下载插件压缩包（
                <a href="#" className="text-jade-green hover:underline">
                  点击下载
                </a>
                ）
              </li>
              <li>解压到本地文件夹</li>
              <li>打开 Chrome 浏览器，进入扩展程序页面</li>
              <li>开启&quot;开发者模式&quot;</li>
              <li>点击&quot;加载已解压的扩展程序&quot;</li>
              <li>选择解压后的文件夹</li>
            </ol>
          </div>

          <div className="bg-white/80 p-6 rounded-lg shadow-md border border-jade-green/20">
            <h3 className="text-xl font-serif-sc text-film-red mb-4">
              Edge 浏览器
            </h3>
            <p className="mb-4">
              Edge 插件商店发布审核中，目前可通过开发者模式安装：
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                下载插件压缩包（
                <a href="#" className="text-jade-green hover:underline">
                  点击下载
                </a>
                ）
              </li>
              <li>解压到本地文件夹</li>
              <li>打开 Edge 浏览器，进入扩展程序页面</li>
              <li>开启&quot;开发者模式&quot;</li>
              <li>点击&quot;加载已解压的扩展程序&quot;</li>
              <li>选择解压后的文件夹</li>
            </ol>
          </div>
        </div>

        <div className="bg-white/80 p-6 rounded-lg shadow-md border border-jade-green/20 my-8">
          <h3 className="text-xl font-serif-sc text-film-red mb-4">
            用户评分与反馈
          </h3>
          <p className="mb-4">
            我们非常重视用户的反馈和建议，这是我们不断改进产品的重要依据。目前，您可以通过以下方式提供反馈：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>在插件使用过程中点击反馈按钮</li>
            <li>
              发送邮件至{" "}
              <a
                href="mailto:feedback@chinawords.com"
                className="text-jade-green hover:underline"
              >
                feedback@chinawords.com
              </a>
            </li>
            <li>
              在我们的{" "}
              <a
                href="https://github.com/Bobbyztz/chinawords"
                className="text-jade-green hover:underline"
              >
                GitHub 仓库
              </a>{" "}
              提交 Issue
            </li>
          </ul>
          <p className="mt-4">
            内测阶段的用户反馈将获得特别感谢，并有机会参与未来产品规划讨论。
          </p>
        </div>

        <div className="mt-6">
          <p className="italic text-gray-600">
            注：插件目前仅支持 Weee! 和 Yami
            两个平台，我们计划在未来版本中支持更多平台。
          </p>
        </div>
      </div>
    </div>
  );
};

export default function FoodPluginPage() {
  // Define the tab structure
  const pluginTabs = [
    {
      title: "产品理念",
      content: <ProductPhilosophy />,
    },
    {
      title: "语言适配",
      content: <LanguageAdaptation />,
    },
    {
      title: "下载与评分",
      content: <DownloadAndRating />,
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

  return <ContentPageLayout tabs={pluginTabs} />;
}
