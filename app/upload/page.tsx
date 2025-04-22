'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ChinawordsNavigation from '../components/ChinawordsNavigation';
import BiophilicFooter from '../components/BiophilicFooter';
import { navigationLinks, footerData } from '../data/environmentalData';

export default function UploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [mediaType, setMediaType] = useState(0); // 0 = image, 1 = video
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    if (!title) {
      setError('请输入标题');
      return;
    }

    if (!file) {
      setError('请选择文件');
      return;
    }

    setIsUploading(true);
    setError('');
    setMessage('');

    try {
      // 这里应该实现文件上传逻辑
      // 目前只是模拟上传成功
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessage('上传成功！（注意：这只是一个演示，实际上传功能尚未实现）');
      setTitle('');
      setPrompt('');
      setFile(null);
      
      // 重置文件输入框
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('上传失败，请稍后再试');
    } finally {
      setIsUploading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl">加载中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col texture-subtle">
      <ChinawordsNavigation links={navigationLinks} />

      <main className="flex-grow py-20 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 font-serif-sc text-center">上传内容</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-300 text-red-800 font-medium px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              {message && (
                <div className="bg-green-100 border border-green-300 text-green-800 font-medium px-4 py-3 rounded-md text-sm">
                  {message}
                </div>
              )}
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-1">
                  标题
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jade-green/50 focus:border-jade-green text-gray-900"
                  placeholder="请输入内容标题"
                  disabled={isUploading}
                />
              </div>
              
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-900 mb-1">
                  描述（可选）
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jade-green/50 focus:border-jade-green text-gray-900"
                  placeholder="请输入内容描述"
                  rows={4}
                  disabled={isUploading}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  内容类型
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-jade-green"
                      name="mediaType"
                      checked={mediaType === 0}
                      onChange={() => setMediaType(0)}
                      disabled={isUploading}
                    />
                    <span className="ml-2">图片</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-jade-green"
                      name="mediaType"
                      checked={mediaType === 1}
                      onChange={() => setMediaType(1)}
                      disabled={isUploading}
                    />
                    <span className="ml-2">视频</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="file-upload" className="block text-sm font-medium text-gray-900 mb-1">
                  上传文件
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept={mediaType === 0 ? "image/*" : "video/*"}
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jade-green/50 focus:border-jade-green text-gray-900"
                  disabled={isUploading}
                />
                <p className="mt-1 text-sm text-gray-500">
                  {mediaType === 0 ? "支持的格式: JPG, PNG, GIF, WebP" : "支持的格式: MP4, WebM"}
                </p>
              </div>
              
              <button
                type="submit"
                disabled={isUploading}
                className="auth-button"
              >
                {isUploading ? '上传中...' : '上传'}
              </button>
              
              <div className="text-center text-gray-500 text-sm mt-4">
                <p>注意：此功能目前仅作演示，实际上传功能尚未实现</p>
                <p>上传内容需遵守相关法律法规和平台规定</p>
              </div>
            </form>
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
