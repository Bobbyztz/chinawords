'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

interface RegisterFormProps {
  onSuccess?: () => void;
  onLoginClick?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onLoginClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!username || !password || !confirmPassword) {
      setError('请填写所有字段');
      return;
    }

    if (username.length < 3) {
      setError('用户名至少需要3个字符');
      return;
    }

    if (password.length < 6) {
      setError('密码至少需要6个字符');
      return;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      // Register user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || '注册失败，请稍后再试');
        return;
      }

      // Auto login after successful registration
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('注册成功，但自动登录失败，请手动登录');
        if (onLoginClick) {
          onLoginClick();
        }
        return;
      }

      if (result?.ok && onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError('注册失败，请稍后再试');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  console.log('Rendering RegisterForm');

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-4">
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-800 font-medium px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="register-username" className="block text-sm font-medium text-gray-900 mb-1">
            用户名
          </label>
          <input
            id="register-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jade-green/50 focus:border-jade-green text-gray-900"
            placeholder="请输入用户名（至少3个字符）"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="register-password" className="block text-sm font-medium text-gray-900 mb-1">
            密码
          </label>
          <input
            id="register-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jade-green/50 focus:border-jade-green text-gray-900"
            placeholder="请输入密码（至少6个字符）"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-900 mb-1">
            确认密码
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jade-green/50 focus:border-jade-green text-gray-900"
            placeholder="请再次输入密码"
            disabled={isLoading}
          />
        </div>

        <div className="text-center text-gray-800 font-medium text-base mt-6 mb-2 p-2 bg-gray-100 rounded-md border border-gray-200">
          请填写以上信息，然后点击下方<span className="text-red-600 font-bold">注册</span>按钮完成注册
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="auth-button"
        >
          {isLoading ? '注册中...' : '注册'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
