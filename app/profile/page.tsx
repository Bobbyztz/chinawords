'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ContentPageLayout from '../components/ContentPageLayout';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl">加载中...</p>
      </div>
    );
  }
  
  // 创建个人资料内容
  const profileContent = (
    <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 font-serif-sc text-center">个人资料</h1>
      
      {session?.user && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-24 h-24 bg-jade-green text-white rounded-full flex items-center justify-center text-3xl font-bold">
              {session.user.username.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold font-serif-sc">{session.user.username}</h2>
              <p className="text-gray-600">用户ID: {session.user.id}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-bold font-serif-sc mb-4">账户信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">用户名</p>
                <p className="font-medium">{session.user.username}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">注册时间</p>
                <p className="font-medium">信息不可用</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-bold font-serif-sc mb-4">我的内容</h3>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-gray-600">您还没有上传任何内容</p>
              <button 
                onClick={() => router.push('/upload')}
                className="mt-4 bg-film-red text-white py-2 px-4 rounded-md hover:bg-film-red/90 transition-colors duration-300 font-medium"
              >
                上传新内容
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  // 定义页面标签
  const tabs = [
    {
      title: "个人信息",
      content: profileContent
    }
  ];

  return <ContentPageLayout tabs={tabs} />;
}
