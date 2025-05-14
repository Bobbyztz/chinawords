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
import { Check, Globe, ChevronDown } from "lucide-react";

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
  const [language, setLanguage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 添加调试日志
  useEffect(() => {
    if (session?.user) {
      console.log("Session user data:", session.user);
      console.log("Language from session:", session.user.language);
    }
  }, [session]);

  // 直接从数据库获取最新用户数据
  const fetchUserDataDirectly = async () => {
    try {
      const response = await fetch("/api/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Direct database fetch result:", data.user);

        if (data.user) {
          if (data.user.displayName) {
            setName(data.user.displayName);
          }

          if (data.user.language) {
            const dbLanguage = data.user.language.toLowerCase();
            console.log("Language from DB direct:", dbLanguage);

            // 将数据库中的语言值转换为小写并设置
            if (["english", "chinese", "spanish"].includes(dbLanguage)) {
              setLanguage(dbLanguage);
            } else {
              setLanguage("chinese"); // 默认值
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user data directly:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Load user data once session is available
  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
      return;
    }

    if (session?.user) {
      // If the user has a displayName, use it
      if (session.user.displayName) {
        setName(session.user.displayName);
      }

      // 从数据库直接获取最新值
      fetchUserDataDirectly();
    }
  }, [session, status]);

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

      // 更新成功后直接从数据库获取最新数据
      await fetchUserDataDirectly();

      // 更新会话
      await update();

      toast.success("账户已更新");
    } catch (error) {
      console.error("Error updating account:", error);
      toast.error("更新失败，请重试");
    } finally {
      setIsUpdating(false);
    }
  };

  if (status === "loading" || isLoading) {
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
            <div className="relative">
              <button
                type="button"
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="w-full flex items-center justify-between gap-2 p-2 border border-gray-300 rounded transition-colors hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <div className="flex items-center gap-2 w-full">
                  <Globe className="h-4 w-4 text-gray-500" />
                  {!language ? (
                    <span className="text-center w-full text-gray-500">
                      选择语言
                    </span>
                  ) : (
                    <span className="text-center w-full">
                      {language === "english" && "English"}
                      {language === "chinese" && "中文"}
                      {language === "spanish" && "Español"}
                      {!["english", "chinese", "spanish"].includes(
                        language
                      ) && <>未知语言: {language}</>}
                    </span>
                  )}
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
              </button>

              {languageMenuOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
                  <div className="py-1">
                    <button
                      className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-50"
                      onClick={() => {
                        handleLanguageChange("english");
                        setLanguageMenuOpen(false);
                      }}
                    >
                      <div className="flex-grow text-center relative">
                        <span>English</span>
                        {language === "english" && (
                          <Check className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-700" />
                        )}
                      </div>
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-50"
                      onClick={() => {
                        handleLanguageChange("chinese");
                        setLanguageMenuOpen(false);
                      }}
                    >
                      <div className="flex-grow text-center relative">
                        <span>中文</span>
                        {language === "chinese" && (
                          <Check className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-700" />
                        )}
                      </div>
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 flex items-center hover:bg-gray-50"
                      onClick={() => {
                        handleLanguageChange("spanish");
                        setLanguageMenuOpen(false);
                      }}
                    >
                      <div className="flex-grow text-center relative">
                        <span>Español</span>
                        {language === "spanish" && (
                          <Check className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-700" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
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
