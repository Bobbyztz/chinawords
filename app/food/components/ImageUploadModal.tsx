"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { Plus, X, LogIn, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, prompt: string, altText: string) => Promise<void>;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [altText, setAltText] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get session data to check if user is logged in
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  
  // Get current path for redirect after login
  const pathname = usePathname();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  const handlePlusClick = () => {
    fileInputRef.current?.click();
  };

  const handleConfirmUpload = async () => {
    if (selectedImage) {
      setIsUploading(true);
      setUploadError("");
      try {
        await onUpload(selectedImage, aiPrompt, altText);
        // Modal will be closed by the parent component after successful upload
      } catch (error) {
        console.error("Upload error:", error);
        setUploadError(typeof error === "string" ? error : "上传失败，请重试");
        setIsUploading(false);
      }
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setAiPrompt("");
    setAltText("");
    setIsUploading(false);
    setUploadError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm rounded-md flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-lg shadow-xl p-2 w-full max-w-4xl flex gap-6 relative h-[65vh]">
        {/* Left side - Image Upload or Login Prompt */}
        <div className="w-1/2 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-md min-h-[300px] relative">
          {isAuthenticated ? (
            <>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain rounded-md"
                  />
                  <button
                    onClick={handleCancelImage}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/75 transition-colors cursor-pointer"
                    aria-label="Cancel image selection"
                  >
                    <X size={18} />
                  </button>
                </>
              ) : (
                <button
                  onClick={handlePlusClick}
                  className="flex flex-col items-center justify-center text-gray-400 hover:text-[#2e8b57] transition-colors cursor-pointer"
                >
                  <Plus size={48} />
                  <span className="mt-2 text-sm">选择图片</span>
                </button>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6">
              <LogIn size={48} className="text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">需要登录</h3>
              <p className="text-gray-500 mb-4">您需要登录才能上传图片</p>
              <Link 
                href={`/login?redirect=${pathname}`}
                className="px-4 py-2 bg-[#2e8b57] text-white rounded-md hover:bg-[#256d43] transition-colors"
              >
                前往登录
              </Link>
            </div>
          )}
        </div>

        {/* Right side: Inputs and Buttons */}
        <div className="w-1/2 p-2 flex flex-col h-full">
          {isAuthenticated ? (
            <>
              {/* Inputs Container */}
              <div className="flex-grow flex flex-col space-y-4 mb-4">
                {/* AI Prompt Section */}
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor="aiPromptInput"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    AI 提示词
                  </label>
                  <textarea
                    id="aiPromptInput"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md w-full flex-grow resize-none focus:border-gray-400 focus:outline-none"
                    placeholder="例如：一张美味的宫保鸡丁特写，色彩鲜艳"
                    rows={3}
                  />
                </div>

                {/* Alt Text Section */}
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor="altTextInput"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    图片 Alt 信息
                  </label>
                  <textarea
                    id="altTextInput"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md w-full flex-grow resize-none focus:border-gray-400 focus:outline-none"
                    placeholder="例如：宫保鸡丁，四川名菜"
                    rows={3}
                  />
                </div>
              </div>

              {/* Error message */}
              {uploadError && (
                <div className="text-red-500 text-sm mb-2">
                  {uploadError}
                </div>
              )}
              
              {/* Buttons Section */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={handleConfirmUpload}
                  disabled={!selectedImage || !aiPrompt || !altText || isUploading}
                  className="px-4 py-2 bg-[#2e8b57] border border-transparent rounded-md text-sm font-medium text-white hover:bg-[#256d43] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2e8b57] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      上传中...
                    </>
                  ) : (
                    "确认上传"
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center">
              <p className="text-gray-500 text-center">
                登录后可以使用完整的图片上传功能，包括添加 AI 提示词和图片描述。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
