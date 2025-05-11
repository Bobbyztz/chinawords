"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ContentPageLayout from "../components/ContentPageLayout";
// 使用单个图标导入以避免可能的导入问题
import { FaUser } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import { FaCog } from "react-icons/fa";

export default function SettingsPage() {
  const { data: session, status } = useSession({ required: false });
  const router = useRouter();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl font-serif-sc">加载中...</p>
      </div>
    );
  }

  // 创建设置页面内容
  const settingsContent = (
    <div className="max-w-3xl mx-auto bg-white/80 overflow-hidden">
      <div className="p-8 md:p-12">
        <h1 className="text-3xl font-bold mb-10 font-serif-sc text-center text-gray-800">
          设置
        </h1>

        {session?.user && (
          <div className="space-y-10">
            {/* 用户基本信息 */}
            <div className="flex items-center justify-center mb-8">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-film-red/90 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-md">
                  {session.user.username.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold font-serif-sc text-film-red">
                  {session.user.username}
                </h2>
                <p className="text-gray-500 mt-1 text-sm flex items-center justify-center">
                  <FaUser className="mr-2 text-jade-green" />
                  用户ID: {session.user.id}
                </p>
              </div>
            </div>

            {/* 分隔线 - 中式水墨风格 */}
            <div className="relative h-px w-full my-6 bg-gray-200 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-jade-green mx-16"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-jade-green mx-16"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-jade-green mx-16"></span>
              </div>
            </div>

            {/* 账户信息 */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold font-serif-sc text-gray-700 border-l-2 border-film-red pl-3">
                账户信息
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg transition-all duration-300 hover:bg-gray-50/80 group">
                  <div className="flex items-center mb-2">
                    <FaUser className="text-jade-green mr-2 group-hover:text-film-red transition-colors" />
                    <p className="text-gray-600 text-sm">用户名</p>
                  </div>
                  <p className="font-medium text-gray-800 pl-6">
                    {session.user.username}
                  </p>
                </div>

                <div className="p-4 rounded-lg transition-all duration-300 hover:bg-gray-50/80 group">
                  <div className="flex items-center mb-2">
                    <FaClock className="text-jade-green mr-2 group-hover:text-film-red transition-colors" />
                    <p className="text-gray-600 text-sm">注册时间</p>
                  </div>
                  <p className="font-medium text-gray-800 pl-6">信息不可用</p>
                </div>
              </div>
            </div>

            {/* 分隔线 */}
            <div className="relative h-px w-full my-6 bg-gray-200 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-jade-green mx-16"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-jade-green mx-16"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-jade-green mx-16"></span>
              </div>
            </div>

            {/* 账户设置 */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold font-serif-sc text-gray-700 border-l-2 border-film-red pl-3">
                账户设置
              </h3>

              <div className="bg-gray-50/50 p-8 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 hover:bg-white/70 rounded-lg transition-all duration-300">
                    <div className="flex items-center">
                      <FaCog className="text-jade-green mr-3" />
                      <span className="font-medium text-gray-700">修改密码</span>
                    </div>
                    <button className="text-film-red hover:underline text-sm">
                      更改
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 hover:bg-white/70 rounded-lg transition-all duration-300">
                    <div className="flex items-center">
                      <FaCog className="text-jade-green mr-3" />
                      <span className="font-medium text-gray-700">通知设置</span>
                    </div>
                    <button className="text-film-red hover:underline text-sm">
                      管理
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 分隔线 */}
            <div className="relative h-px w-full my-6 bg-gray-200 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-jade-green mx-16"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-jade-green mx-16"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-jade-green mx-16"></span>
              </div>
            </div>

            {/* 我的内容 */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold font-serif-sc text-gray-700 border-l-2 border-film-red pl-3">
                我的内容
              </h3>

              <div className="bg-gray-50/50 p-8 rounded-lg text-center">
                <p className="text-gray-600 mb-6">您还没有上传任何内容</p>
                <button
                  onClick={() => router.push("/upload")}
                  className="group bg-gradient-to-r from-film-red to-film-red/90 text-white py-2.5 px-6 rounded-md transition-all duration-300 font-medium hover:shadow-md"
                >
                  <span className="flex items-center justify-center">
                    <FaFileUpload className="mr-2 group-hover:scale-110 transition-transform" />
                    上传新内容
                  </span>
                </button>
                <p className="mt-6 text-xs text-gray-500">
                  在这里查看您的上传历史和内容状态
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // 定义页面标签
  const tabs = [
    {
      title: "设置",
      content: settingsContent,
    },
  ];

  return <ContentPageLayout tabs={tabs} />;
}
