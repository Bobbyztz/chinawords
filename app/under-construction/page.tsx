'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ChinawordsNavigation from '../components/ChinawordsNavigation';
import { navigationLinks } from '../data/environmentalData';

export default function UnderConstructionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <ChinawordsNavigation links={navigationLinks} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative w-64 h-64 mx-auto mb-8">
            <Image
              src="/construction.svg"
              alt="Under Construction"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-film-red mb-4 font-serif-sc">建设中</h1>
          <p className="text-xl text-gray-600 mb-8">
            此页面正在建设中，敬请期待！
          </p>
          <p className="text-gray-500 mb-12">
            我们正在努力为您打造更好的内容体验，请稍后再来访问。
          </p>
          <Link
            href="/"
            className="inline-block bg-film-red hover:bg-red-700 text-white px-6 py-3 rounded-md text-lg font-medium transition-all duration-300"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
