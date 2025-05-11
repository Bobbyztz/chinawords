"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ContentPageLayout from "../components/ContentPageLayout";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

function LoginFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
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

  const loginFormContent = (
    <div className="w-full max-w-md mx-auto py-8 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <LoginForm onSuccess={handleSuccess} />
    </div>
  );

  const registerFormContent = (
    <div className="w-full max-w-md mx-auto py-8 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <RegisterForm onSuccess={handleSuccess} />
    </div>
  );

  const tabs = [
    {
      title: "登录",
      content: loginFormContent,
    },
    {
      title: "注册",
      content: registerFormContent,
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
