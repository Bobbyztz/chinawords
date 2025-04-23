'use client';

import React from 'react';
import ChinawordsNavigation from '../components/ChinawordsNavigation';
import BiophilicFooter from '../components/BiophilicFooter';
import TabComponent from '../components/TabComponent';
import { navigationLinks, footerData } from '../data/environmentalData';

export default function FoodPage() {
  // Define tab content
  const tabs = [
    {
      title: '中国美食概览',
      content: (
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4 font-serif-sc">中国美食概览</h2>
          <p className="font-sans-sc">
            中国美食以其多样性、丰富的口味和精湛的烹饪技艺而闻名于世。从北方的面食到南方的米饭，从川菜的麻辣到粤菜的清淡，中国各地区的饮食文化展现了丰富的地域特色和历史传承。
          </p>
          <p className="font-sans-sc">
            中国饮食文化强调色、香、味、形、器的和谐统一，追求食材的新鲜和烹饪的精确。传统中医理念也深刻影响了中国饮食，讲究食物的平衡和药食同源。
          </p>
        </div>
      ),
    },
    {
      title: '地方特色菜系',
      content: (
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4 font-serif-sc">地方特色菜系</h2>
          <p className="font-sans-sc">
            中国传统上分为八大菜系：川菜、粤菜、鲁菜、苏菜、闽菜、浙菜、湘菜和徽菜。每个菜系都有其独特的烹饪方法和风味特点。
          </p>
          <p className="font-sans-sc">
            川菜以麻辣著称，代表菜品有麻婆豆腐、水煮鱼；粤菜注重原料的鲜美，以清蒸、炒为主要烹饪方式；鲁菜讲究火候和刀工，代表菜品有葱烧海参、德州扒鸡；苏菜精致细腻，善于烹制河鲜湖鲜。
          </p>
          <p className="font-sans-sc">
            闽菜以海鲜为主，注重汤的鲜美；浙菜清淡鲜美，讲究本味；湘菜辣中带香，油而不腻；徽菜保留了徽州地区的特色，注重火功和调味。
          </p>
        </div>
      ),
    },
    {
      title: '传统饮食习俗',
      content: (
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4 font-serif-sc">传统饮食习俗</h2>
          <p className="font-sans-sc">
            中国的饮食习俗与节日紧密相连。春节有饺子，象征团圆和财富；端午节有粽子，纪念屈原；中秋节有月饼，象征团圆和丰收；冬至有汤圆，象征家庭团圆。
          </p>
          <p className="font-sans-sc">
            中国传统饮食还讲究座次和礼仪。宴席上的座位安排有特定规则，敬酒和用餐也有相应的礼节。筷子作为主要餐具，使用也有讲究，不同的使用方式可能代表不同的含义。
          </p>
          <p className="font-sans-sc">
            茶文化是中国饮食文化的重要组成部分。不同地区有不同的茶叶品种和饮茶方式，茶道仪式也体现了中国传统文化的精髓。
          </p>
        </div>
      ),
    },
    {
      title: '现代美食发展',
      content: (
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4 font-serif-sc">现代美食发展</h2>
          <p className="font-sans-sc">
            随着全球化的发展，中国美食不断创新和融合。新式中餐结合了传统烹饪技巧和现代理念，创造出更符合当代口味的菜品。
          </p>
          <p className="font-sans-sc">
            中国美食也走向世界，在全球各地的中餐馆展现中华饮食文化的魅力。同时，国际美食也影响了中国的饮食习惯，形成了多元化的美食文化。
          </p>
          <p className="font-sans-sc">
            随着人们健康意识的提高，健康饮食理念也越来越受到重视。传统中医食疗与现代营养学相结合，为人们提供更健康的饮食选择。
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col texture-subtle">
      <ChinawordsNavigation links={navigationLinks} />

      <main className="flex-grow py-16 mt-16">
        <div className="container flex flex-col mx-auto gap-y-4 px-4">
          <TabComponent tabs={tabs} />
        </div>
      </main>

      <BiophilicFooter
        description={footerData.description}
        columns={footerData.columns}
        socialLinks={footerData.socialLinks}
      />
    </div>
  );
}
