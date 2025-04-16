'use client';

import React from 'react';
import ChinawordsNavigation from './ChinawordsNavigation';
import BiophilicFooter from './BiophilicFooter';
import { navigationLinks, footerData } from '../data/environmentalData';

interface UnderConstructionProps {
  title: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({ title }) => {
  return (
    <div className="min-h-screen flex flex-col texture-subtle">
      <ChinawordsNavigation links={navigationLinks} />
      
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 font-serif-sc">{title}</h1>
          <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <p className="text-xl font-sans-sc text-black">网站建设中，敬请期待...</p>
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
};

export default UnderConstruction;
