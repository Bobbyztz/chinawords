"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ContentPageLayout from "../components/ContentPageLayout";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

function LoginFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [redirectPath, setRedirectPath] = useState<string>("/");

  useEffect(() => {
    const redirect = searchParams.get("redirect");
    if (redirect && isValidInternalPath(redirect)) {
      setRedirectPath(redirect);
    }
  }, [searchParams]);

  const isValidInternalPath = (path: string): boolean => {
    return (
      path.startsWith("/") &&
      !path.includes("//") &&
      !path.includes(":") &&
      !path.startsWith("/api/")
    );
  };

  const handleSuccess = () => {
    router.push(redirectPath);
    router.refresh();
  };

  const loginContent = (
    <div className="w-full">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`flex-1 py-2 font-medium text-center ${
            activeTab === "login"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-700 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("login")}
        >
          登录
        </button>
        <button
          className={`flex-1 py-2 font-medium text-center ${
            activeTab === "register"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-700 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("register")}
        >
          注册
        </button>
      </div>

      {activeTab === "login" ? (
        <LoginForm onSuccess={handleSuccess} />
      ) : (
        <RegisterForm
          onSuccess={handleSuccess}
          onLoginClick={() => setActiveTab("login")}
        />
      )}
    </div>
  );

  const tabs = [
    {
      title: "用户账户",
      content: loginContent,
    },
  ];

  return <ContentPageLayout tabs={tabs} />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login page...</div>}>
      <LoginFlow />
    </Suspense>
  );
}
