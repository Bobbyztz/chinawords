"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ContentPageLayout from "../components/ContentPageLayout";
import SettingsImageWall from "./components/SettingsImageWall";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";

// 定义各个标签页的筛选选项
const likesFilterOptions = [
  { id: "all", name: "全部" },
  { id: "style", name: "风格定义" },
  { id: "cuisine", name: "菜系" },
  { id: "ingredient", name: "食材" },
  { id: "recipe", name: "食谱" },
  { id: "album", name: "相册" },
];

const favoritesFilterOptions = [
  { id: "all", name: "全部" },
  { id: "style", name: "风格定义" },
  { id: "cuisine", name: "菜系" },
  { id: "ingredient", name: "食材" },
  { id: "recipe", name: "食谱" },
  { id: "album", name: "相册" },
];

const assetsFilterOptions = [
  { id: "all", name: "全部" },
  { id: "style", name: "风格定义" },
  { id: "cuisine", name: "菜系" },
  { id: "ingredient", name: "食材" },
  { id: "recipe", name: "食谱" },
  { id: "album", name: "相册" },
];

export default function SettingsPage() {
  const { data: session, status, update } = useSession({ required: false });
  const router = useRouter();
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("chinese");
  const [isUpdating, setIsUpdating] = useState(false);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Load user data once session is available
  useEffect(() => {
    if (session?.user) {
      // If the user has a displayName, use it
      if (session.user.displayName) {
        setName(session.user.displayName);
      }

      // If the user has a language preference, use it
      if (session.user.language) {
        setLanguage(session.user.language);
      }
    }
  }, [session]);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  const handleUpdateAccount = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          language,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update account");
      }

      // Update the session with new data
      await update();

      // Force a reload of the page to ensure session data is refreshed
      window.location.reload();

      toast.success("账户已更新");
    } catch (error) {
      console.error("Error updating account:", error);
      toast.error("更新失败，请重试");
    } finally {
      setIsUpdating(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl font-serif-sc">加载中...</p>
      </div>
    );
  }

  // 创建 Profile 页面内容
  const profileContent = (
    <div className="w-full max-w-lg mx-auto rounded-lg">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-2 text-gray-800">个人资料</h1>
        <p className="text-sm text-gray-600 mb-6">
          更新您的个人资料信息。这些信息将公开显示。
        </p>
        <div className="space-y-6">
          {/* Username */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              用户名
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              defaultValue={session?.user?.username || "ehadcn"}
              disabled
            />
            <p className="text-xs text-gray-600">
              这是您的公开显示名称。它可以是您的真实姓名或昵称。您只能在30天内更改一次。
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              邮箱
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="选择一个已验证的电子邮件地址显示" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="example@email.com">
                  example@email.com
                </SelectItem>
                <SelectItem value="another@email.com">
                  another@email.com
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-600">
              您可以在电子邮件设置中管理已验证的电子邮件地址。
            </p>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              个人简介
            </label>
            <textarea
              id="bio"
              rows={3}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              defaultValue="你好，我是新用户。"
            />
            <p className="text-xs text-gray-600">
              您可以@提及其他用户和组织以链接到他们。
            </p>
          </div>

          {/* URLs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                网站链接
              </label>
              <p className="text-xs text-gray-600 mb-3">
                添加您的网站、博客或社交媒体个人主页链接。
              </p>
            </div>

            <div className="space-y-3">
              <input
                type="url"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                defaultValue="https://url_1.com"
              />
              <input
                type="url"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                defaultValue="https://url_2.com"
              />
              <button className="text-sm text-gray-700 font-medium px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50">
                添加链接
              </button>
            </div>
          </div>

          {/* Update button */}
          <div className="pt-4">
            <button className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 focus:outline-none">
              更新账户
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // 创建 Account 页面内容
  const accountContent = (
    <div className="w-full max-w-lg mx-auto rounded-lg">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-2 text-gray-800">账户</h1>
        <p className="text-sm text-gray-600 mb-6">
          更新您的账户设置。设置您偏好的语言和时区。
        </p>

        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              名称
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="你的名称"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="text-xs text-gray-600">
              这是您在个人资料和电子邮件中显示的名称。
            </p>
          </div>

          {/* Date of birth */}
          <div className="space-y-2">
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              生日
            </label>
            <button className="w-full p-2 border border-gray-300 rounded flex justify-between items-center text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400">
              选择日期
            </button>
            <p className="text-xs text-gray-600">用于计算您的年龄。</p>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <label
              htmlFor="language"
              className="block text-sm font-medium text-gray-700"
            >
              语言
            </label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger>
                <SelectValue placeholder="选择语言" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="chinese">中文</SelectItem>
                <SelectItem value="spanish">Español</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-600">
              这是您在仪表板中使用的语言。
            </p>
          </div>

          {/* Update button */}
          <div className="pt-4">
            <button
              className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 focus:outline-none disabled:opacity-50"
              onClick={handleUpdateAccount}
              disabled={isUpdating}
            >
              {isUpdating ? "更新中..." : "更新账户"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // 定义页面标签
  const tabs = [
    {
      title: "个人资料",
      content: profileContent,
    },
    {
      title: "账户设置",
      content: accountContent,
    },
    {
      title: "我的点赞",
      content: (
        <SettingsImageWall
          showUploadButton={false}
          filterOptions={likesFilterOptions}
          mainCategory="likes"
        />
      ),
    },
    {
      title: "我的收藏",
      content: (
        <SettingsImageWall
          showUploadButton={false}
          filterOptions={favoritesFilterOptions}
          mainCategory="collected"
        />
      ),
    },
    {
      title: "我的财产",
      content: (
        <SettingsImageWall
          showUploadButton={true}
          filterOptions={assetsFilterOptions}
          mainCategory="owned"
        />
      ),
    },
  ];

  return <ContentPageLayout tabs={tabs} />;
}
