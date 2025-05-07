'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ContentPageLayout from '../components/ContentPageLayout';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [redirectPath, setRedirectPath] = useState<string>('/');

  useEffect(() => {
    // Get the redirect path from URL parameters
    const redirect = searchParams.get('redirect');
    
    // 安全检查：确保重定向路径是内部路径
    if (redirect && isValidInternalPath(redirect)) {
      setRedirectPath(redirect);
    }
  }, [searchParams]);
  
  // 验证路径是否为内部路径
  const isValidInternalPath = (path: string): boolean => {
    // 确保路径以 / 开头且不包含 // 或 :
    // 这样可以防止重定向到外部网站
    return path.startsWith('/') && 
           !path.includes('//') && 
           !path.includes(':') &&
           !path.startsWith('/api/');
  };

  const handleSuccess = () => {
    router.push(redirectPath);
    router.refresh();
  };

  // 创建登录表单内容
  const loginContent = (
    <div className="max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200 min-h-[500px]">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 font-serif-sc text-center">注册/登录</h1>
      
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
  );
  
  // 定义页面标签
  const tabs = [
    {
      title: "用户账户",
      content: loginContent
    }
  ];

  return <ContentPageLayout tabs={tabs} />;
}
