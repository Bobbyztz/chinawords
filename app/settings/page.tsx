"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ContentPageLayout from "../components/ContentPageLayout";
// 使用单个图标导入以避免可能的导入问题
import { FaChevronDown } from "react-icons/fa";

export default function SettingsPage() {
  const { data: session, status } = useSession({ required: false });
  const router = useRouter();
  const [emailDropdownOpen, setEmailDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

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

  // 创建 Profile 页面内容
  const profileContent = (
    <div className="w-full max-w-lg mx-auto rounded-lg">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-2 text-gray-800">Profile</h1>
        <p className="text-sm text-gray-600 mb-6">
          Update your profile information. This information will be displayed
          publicly.
        </p>
        <div className="space-y-6">
          {/* Username */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              defaultValue={session?.user?.username || "ehadcn"}
              disabled
            />
            <p className="text-xs text-gray-600">
              This is your public display name. It can be your real name or a
              pseudonym. You can only change this once every 30 days.
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <button
                onClick={() => setEmailDropdownOpen(!emailDropdownOpen)}
                className="w-full p-2 border border-gray-300 rounded flex justify-between items-center focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <span className="text-gray-500">
                  Select a verified email to display
                </span>
                <FaChevronDown className="text-gray-400" />
              </button>
              {emailDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg">
                  <ul>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                      example@email.com
                    </li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                      another@email.com
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-600">
              You can manage verified email addresses in your email settings.
            </p>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              id="bio"
              rows={3}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              defaultValue="Hi, I'm a new user."
            />
            <p className="text-xs text-gray-600">
              You can @mention other users and organizations to link to them.
            </p>
          </div>

          {/* URLs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URLs
              </label>
              <p className="text-xs text-gray-600 mb-3">
                Add links to your website, blog, or social media profiles.
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
                Add URL
              </button>
            </div>
          </div>

          {/* Update button */}
          <div className="pt-4">
            <button className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 focus:outline-none">
              Update profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // 创建 Account 页面内容
  const accountContent = (
    <div className="w-full max-w-lg mx-auto  rounded-lg">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-2 text-gray-800">Account</h1>
        <p className="text-sm text-gray-600 mb-6">
          Update your account settings. Set your preferred language and
          timezone.
        </p>

        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="Your name"
            />
            <p className="text-xs text-gray-600">
              This is the name that will be displayed on your profile and in
              emails.
            </p>
          </div>

          {/* Date of birth */}
          <div className="space-y-2">
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date of birth
            </label>
            <button className="w-full p-2 border border-gray-300 rounded flex justify-between items-center text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400">
              Pick a date
            </button>
            <p className="text-xs text-gray-600">
              Your date of birth is used to calculate your age.
            </p>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <label
              htmlFor="language"
              className="block text-sm font-medium text-gray-700"
            >
              Language
            </label>
            <div className="relative">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="w-full p-2 border border-gray-300 rounded flex justify-between items-center focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <span className="text-gray-500">Select language</span>
                <FaChevronDown className="text-gray-400" />
              </button>
              {languageDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg">
                  <ul>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                      English
                    </li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                      中文
                    </li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                      Español
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-600">
              This is the language that will be used in the dashboard.
            </p>
          </div>

          {/* Update button */}
          <div className="pt-4">
            <button className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 focus:outline-none">
              Update account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // 定义页面标签
  const tabs = [
    {
      title: "Profile",
      content: profileContent,
    },
    {
      title: "Account",
      content: accountContent,
    },
  ];

  return <ContentPageLayout tabs={tabs} />;
}
