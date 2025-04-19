'use client';

import React from 'react';
import ChinawordsNavigation from '../../../components/ChinawordsNavigation';
import BiophilicFooter from '../../../components/BiophilicFooter';
import { navigationLinks, footerData } from '../../../data/environmentalData';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col texture-subtle">
      <ChinawordsNavigation links={navigationLinks} />
      
      <main className="flex-grow py-20 mt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-serif-sc text-center">隐私政策</h1>
          
          <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <div className="prose prose-lg max-w-none text-black prose-headings:text-black prose-p:text-black prose-strong:text-black prose-li:text-black prose-a:text-blue-600">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p>
                This privacy policy explains how our browser extension "Eat me!" ("we", "our", or "the extension") collects, uses, and protects your information when you use our service. We are committed to ensuring the privacy and security of your data.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Product Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Product names and details</strong>: When you view product pages on Weee! (sayweee.com) or Yami (yamibuy.com), the extension collects product names and related information to enable price comparison functionality.</li>
                <li><strong>Search queries</strong>: When you use the search functionality within the extension, your search terms are processed to provide relevant results.</li>
              </ul>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Technical Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Browser information</strong>: Basic browser information necessary for the extension to function properly.</li>
                <li><strong>URL information</strong>: The extension monitors URLs from sayweee.com and yamibuy.com to activate its features on relevant pages.</li>
              </ul>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Local Storage</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cached product data</strong>: To improve performance and reduce API calls, the extension temporarily stores product information and price comparison results in your browser's local storage. This data is automatically cleared after 24 hours.</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
              <p>We use the collected information for the following purposes:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Price comparison</strong>: To compare prices between Weee! and Yami platforms for the same or similar products.</li>
                <li><strong>Food cultural information</strong>: To provide historical and cultural information about food products using OpenAI's API.</li>
                <li><strong>Functionality improvement</strong>: To enhance the extension's features and user experience.</li>
              </ol>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Data Sharing and Third-Party Services</h2>
              
              <h3 className="text-xl font-bold mt-6 mb-3">OpenAI API</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>The extension uses OpenAI's API to provide food historical and cultural information. When you request this information, your product queries may be sent to OpenAI in accordance with their privacy policy.</li>
              </ul>
              
              <h3 className="text-xl font-bold mt-6 mb-3">E-commerce Platforms</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>The extension interacts with Weee! (sayweee.com) and Yami (yamibuy.com) websites to gather product information for comparison purposes.</li>
              </ul>
              
              <p className="mt-4">We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Data Storage</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Local storage</strong>: Product information and comparison results are stored locally in your browser and are automatically cleared after 24 hours.</li>
                <li><strong>No remote database storage</strong>: The extension does not store your browsing history, product views, or personal information in any remote database.</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Your Choices and Control</h2>
              <p>You can control your privacy in the following ways:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Extension permissions</strong>: You can review and modify the extension's permissions through your browser's extension management interface.</li>
                <li><strong>Disabling the extension</strong>: You can temporarily disable or completely uninstall the extension at any time through your browser's extension management interface.</li>
              </ol>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Browser Permissions</h2>
              <p>The extension requires the following permissions:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Storage</strong>: To cache product information locally for improved performance.</li>
                <li><strong>Tabs</strong>: To detect which website you're currently browsing and activate relevant features.</li>
                <li><strong>Scripting</strong>: To inject necessary scripts for the price comparison functionality.</li>
                <li><strong>Host permissions</strong> for:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>https://api.openai.com/*: To fetch food cultural information.</li>
                    <li>https://www.sayweee.com/*: To interact with the Weee! website.</li>
                    <li>https://www.yamibuy.com/*: To interact with the Yami website.</li>
                    <li>open source code for illustration on none-touching on user's private data</li>
                  </ul>
                </li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
              <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the extension accordingly.</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: <a href="mailto:legendztz@outlook.com" className="text-blue-600 hover:underline">legendztz@outlook.com</a></li>
                <li>GitHub: <a href="https://github.com/Bobbyztz/china-words-food" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://github.com/Bobbyztz/china-words-food</a> (will be open-source in two weeks)</li>
              </ul>
              
              <p className="mt-8 text-sm text-black">Last updated: Apr 2025</p>
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
