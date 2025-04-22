'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ChinawordsNavigation from '../components/ChinawordsNavigation';
import BiophilicFooter from '../components/BiophilicFooter';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { navigationLinks, footerData } from '../data/environmentalData';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const handleSuccess = () => {
    router.push('/');
    router.refresh();
  };

  console.log('Current active tab:', activeTab);

  return (
    <div className="min-h-screen flex flex-col texture-subtle">
      <ChinawordsNavigation links={navigationLinks} />

      <main className="flex-grow py-20 mt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-serif-sc text-center">注册/登录</h1>

          <div className="max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200 min-h-[500px]">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`flex-1 py-2 font-medium text-center ${activeTab === 'login' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-700 hover:text-gray-900'}`}
                onClick={() => setActiveTab('login')}
              >
                登录
              </button>
              <button
                className={`flex-1 py-2 font-medium text-center ${activeTab === 'register' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-700 hover:text-gray-900'}`}
                onClick={() => setActiveTab('register')}
              >
                注册
              </button>
            </div>

            {/* Form Content */}
            {activeTab === 'login' ? (
              <LoginForm onSuccess={handleSuccess} />
            ) : (
              <RegisterForm
                onSuccess={handleSuccess}
                onLoginClick={() => setActiveTab('login')}
              />
            )}
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
