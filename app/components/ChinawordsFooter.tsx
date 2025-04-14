'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface ChinawordsFooterProps {
  logo?: string;
  logoAlt?: string;
  description: string;
  columns: FooterColumn[];
  socialLinks?: {
    platform: string;
    href: string;
    iconType: string;
  }[];
}

const ChinawordsFooter: React.FC<ChinawordsFooterProps> = ({
  logo = '/chinawords-logo.svg',
  logoAlt = 'Chinawords',
  description,
  columns,
  socialLinks = []
}) => {
  return (
    <footer className="bg-dark-gray text-porcelain-white">
      <div className="container mx-auto px-4 md:px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center">
                <div className="relative h-10 w-10 mr-3">
                  <Image
                    src={logo}
                    alt={logoAlt}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-serif-sc">Chinawords</span>
              </div>
            </Link>
            <p className="text-light-gray mb-6 max-w-md font-sans-sc">
              {description}
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4 mb-8">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-film-red bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-colors duration-300"
                  aria-label={`关注我们的${link.platform}`}
                >
                  {link.iconType === 'weibo' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.098 20c-3.297 0-6-2.31-6-5.166 0-2.856 2.703-5.166 6-5.166s6 2.31 6 5.166c0 2.856-2.703 5.166-6 5.166zm0-8.75c-2.316 0-4.2 1.605-4.2 3.584 0 1.978 1.884 3.583 4.2 3.583s4.2-1.605 4.2-3.583c0-1.979-1.884-3.584-4.2-3.584zm2.5 3.333c0-.46-.336-.833-.75-.833s-.75.373-.75.833.336.834.75.834.75-.374.75-.834zm-3.75 0c0-.46-.336-.833-.75-.833s-.75.373-.75.833.336.834.75.834.75-.374.75-.834zm7.447-5.514a.904.904 0 00-.904-.904h-2.665a.904.904 0 00-.903.904v2.667c0 .5.404.904.903.904h2.665a.904.904 0 00.904-.904v-2.667zm4.705-3.583c0-.663-.547-1.2-1.219-1.2h-18.562c-.672 0-1.219.537-1.219 1.2v18.6c0 .663.547 1.2 1.219 1.2h18.562c.672 0 1.219-.537 1.219-1.2v-18.6z" />
                    </svg>
                  )}
                  {link.iconType === 'xiaohongshu' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.83 7.066c-.013-.26-.2-.478-.454-.527-1.705-.325-3.413-.598-5.12-.835l-1.28-.177c-.267-.037-.534-.073-.8-.107-.12-.016-.24-.03-.36-.047l-.36-.045c-.24-.03-.48-.058-.72-.085-.267-.03-.534-.06-.8-.087-.12-.013-.24-.025-.36-.036l-.36-.033c-.24-.022-.48-.043-.72-.063-.24-.02-.48-.04-.72-.057-.12-.01-.24-.018-.36-.025l-.36-.023c-.24-.015-.48-.03-.72-.042-.24-.013-.48-.025-.72-.035-.12-.005-.24-.01-.36-.015l-.36-.013c-.24-.008-.48-.015-.72-.022-.24-.006-.48-.012-.72-.016-.12-.003-.24-.005-.36-.006l-.36-.005c-.24-.003-.48-.005-.72-.006-.24-.002-.48-.002-.72-.002h-.36.36c-.24 0-.48 0-.72.002-.24.001-.48.003-.72.006l-.36.005c-.12.001-.24.003-.36.006-.24.004-.48.01-.72.016-.24.007-.48.014-.72.022l-.36.013c-.12.005-.24.01-.36.015-.24.01-.48.022-.72.035-.24.012-.48.027-.72.042l-.36.023c-.12.007-.24.015-.36.025-.24.017-.48.037-.72.057-.24.02-.48.041-.72.063l-.36.033c-.12.011-.24.023-.36.036-.267.027-.534.057-.8.087-.24.027-.48.055-.72.085l-.36.045c-.12.017-.24.031-.36.047-.267.034-.534.07-.8.107l-1.28.177c-1.707.237-3.415.51-5.12.835-.254.049-.441.267-.454.527-.013.26.15.498.397.578 1.65.533 3.303 1.01 4.956 1.428l1.24.314c.26.066.52.13.78.193.12.03.24.058.36.087l.36.084c.24.057.48.113.72.167.26.06.52.12.78.177.12.027.24.053.36.078l.36.075c.24.05.48.1.72.147.24.048.48.095.72.14.12.023.24.045.36.067l.36.064c.24.043.48.085.72.125.24.04.48.08.72.117.12.02.24.038.36.056l.36.053c.24.035.48.07.72.103.24.033.48.065.72.095.12.016.24.03.36.046l.36.043c.24.028.48.056.72.082.24.026.48.05.72.074.12.012.24.024.36.035l.36.033c.24.022.48.043.72.063.24.02.48.038.72.055.12.01.24.018.36.025l.36.023c.24.015.48.028.72.04.24.013.48.023.72.033.12.005.24.01.36.013l.36.012c.24.007.48.014.72.02.24.005.48.01.72.013.12.002.24.003.36.005l.36.003c.24.003.48.004.72.005.24.001.48.001.72.001h.36-.36c.24 0 .48 0 .72-.001.24-.001.48-.002.72-.005l.36-.003c.12-.002.24-.003.36-.005.24-.003.48-.008.72-.013.24-.006.48-.013.72-.02l.36-.012c.12-.003.24-.008.36-.013.24-.01.48-.02.72-.033.24-.012.48-.025.72-.04l.36-.023c.12-.007.24-.015.36-.025.24-.017.48-.035.72-.055.24-.02.48-.041.72-.063l.36-.033c.12-.011.24-.023.36-.035.24-.024.48-.048.72-.074.24-.026.48-.054.72-.082l.36-.043c.12-.016.24-.03.36-.046.24-.03.48-.062.72-.095.24-.033.48-.068.72-.103l.36-.053c.12-.018.24-.036.36-.056.24-.037.48-.077.72-.117.24-.04.48-.082.72-.125l.36-.064c.12-.022.24-.044.36-.067.24-.045.48-.092.72-.14.24-.047.48-.097.72-.147l.36-.075c.12-.025.24-.051.36-.078.26-.057.52-.117.78-.177.24-.054.48-.11.72-.167l.36-.084c.12-.029.24-.057.36-.087.26-.063.52-.127.78-.193l1.24-.314c1.653-.418 3.306-.895 4.956-1.428.247-.08.41-.318.397-.578zM12 12.5c-4.136 0-7.5 3.364-7.5 7.5s3.364 7.5 7.5 7.5 7.5-3.364 7.5-7.5-3.364-7.5-7.5-7.5zm0 12.5c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm2.5-5c0 1.381-1.119 2.5-2.5 2.5s-2.5-1.119-2.5-2.5 1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5z" />
                    </svg>
                  )}
                  {link.iconType === 'youtube' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Footer columns */}
          {columns.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 border-b border-light-gray pb-2 font-serif-sc">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-light-gray hover:text-porcelain-white transition-colors duration-300 inline-block font-sans-sc"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-light-gray flex flex-col md:flex-row justify-between items-center">
          <p className="text-light-gray text-sm mb-4 md:mb-0 font-sans-sc">
            &copy; {new Date().getFullYear()} Chinawords 保留所有权利
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-light-gray text-sm hover:text-porcelain-white transition-colors duration-300 font-sans-sc">
              隐私政策
            </Link>
            <Link href="/terms" className="text-light-gray text-sm hover:text-porcelain-white transition-colors duration-300 font-sans-sc">
              使用条款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ChinawordsFooter;
