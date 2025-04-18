'use client';

import React from 'react';
import ChinawordsNavigation from './ChinawordsNavigation';
import BiophilicFooter from './BiophilicFooter';
import { navigationLinks, footerData } from '../data/environmentalData';

interface ProgressUnderConstructionProps {
  title: string;
}

const ProgressUnderConstruction: React.FC<ProgressUnderConstructionProps> = ({ title }) => {
  return (
    <div className="min-h-screen flex flex-col texture-subtle">
      <ChinawordsNavigation links={navigationLinks} />

      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 font-serif-sc">{title}</h1>

          {/* GitHub Link */}
          <div className="flex justify-center items-center mb-8">
            <a
              href="https://github.com/Bobbyztz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-white/90 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <svg className="w-6 h-6 mr-3" fill="#333" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
              </svg>
              <span className="font-sans-sc text-black text-md">访问 Bobbyztz 的 GitHub</span>
            </a>
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

export default ProgressUnderConstruction;
