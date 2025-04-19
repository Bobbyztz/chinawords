'use client';

import React from 'react';
import Link from 'next/link';
import ChinawordsNavigation from '../../components/ChinawordsNavigation';
import BiophilicFooter from '../../components/BiophilicFooter';
import { navigationLinks, footerData } from '../../data/environmentalData';

export default function FoodPluginPage() {
  return (
    <div className="min-h-screen flex flex-col texture-subtle">
      <ChinawordsNavigation links={navigationLinks} />

      <main className="flex-grow py-20 mt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-serif-sc text-center">食·味蕾中国 - 浏览器插件</h1>

          <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">Eat me! 浏览器插件</h2>
              <p>
                &quot;Eat me!&quot; 是一款专为中国食品爱好者设计的浏览器插件，帮助用户在 Weee! 和 Yami 等中国食品电商平台上比较价格，并提供食品的历史和文化背景信息。
              </p>

              <div className="mt-8 flex justify-center">
                <Link
                  href="/food/plugin/privacy"
                  className="inline-block bg-jade-green text-white px-6 py-3 rounded-md hover:bg-jade-green/90 transition-colors duration-300"
                >
                  查看隐私政策
                </Link>
              </div>
            </div>
          </div>
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
