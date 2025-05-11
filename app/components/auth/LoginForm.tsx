"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("请输入用户名和密码");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("用户名或密码错误");
        return;
      }

      if (result?.ok) {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/");
          router.refresh();
        }
      }
    } catch (err) {
      setError("登录失败，请稍后再试");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-4">
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-800 font-medium px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="flex items-center text-sm">
          <label
            htmlFor="username"
            className="w-20 flex-shrink-0 font-medium text-gray-900"
          >
            用户名
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border-b border-gray-300 focus:border-red-500/90 rounded-md focus:outline-none text-gray-700"
            placeholder="请输入用户名"
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center text-sm">
          <label
            htmlFor="password"
            className="w-20 flex-shrink-0 font-medium text-gray-900"
          >
            密码
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-b border-gray-400/30 focus:border-red-500/90 rounded-md focus:outline-none  text-gray-700"
            placeholder="请输入密码"
            disabled={isLoading}
          />
        </div>

        <div className="flex text-sm pl-0.5 mt-4 border-b border-gray-400/50 pb-1.5">
          <button
            type="submit"
            disabled={isLoading}
            className="text-red-700 font-medium flex-shrink-0 hover:cursor-pointer hover:text-red-600"
          >
            {isLoading ? "登录中..." : "登录"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-gray-600 ml-4 font-medium flex-shrink-0 hover:cursor-pointer hover:text-gray-800"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
