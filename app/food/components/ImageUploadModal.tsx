"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { Plus, X } from "lucide-react";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, prompt: string, altText: string) => void;
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleConfirmUpload = () => {
    if (selectedImage) {
      onUpload(selectedImage, aiPrompt, altText);
      handleClose(); // Close modal after initiating upload
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setAiPrompt("");
    setAltText("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm rounded-md flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-lg shadow-xl p-2 w-full max-w-4xl flex gap-6 relative h-[65vh]">
        {/* Left side - Image Upload */}
        <div className="w-1/2 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-md min-h-[300px] relative">
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
        </div>
        {/* Right side: Inputs and Buttons */}
        <div className="w-1/2 p-2 flex flex-col h-full">
          {/* Inputs Container - Takes up available space and distributes it to children */}
          <div className="flex-grow flex flex-col space-y-4 mb-4">
            {/* AI Prompt Section - flex-1 allows this div to grow, flex flex-col for label + textarea */}
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

            {/* Alt Text Section - flex-1 allows this div to grow, flex flex-col for label + textarea */}
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
                className="p-2 border border-gray-300 rounded-md w-full flex-grow resize-none focus:border-gray-400 focus:outline-none "
                placeholder="例如：宫保鸡丁，四川名菜"
                rows={3}
              />
            </div>
          </div>

          {/* Buttons Section - Pushed to the bottom because the above container has flex-grow */}
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
              disabled={!selectedImage || !aiPrompt || !altText}
              className="px-4 py-2 bg-[#2e8b57] border border-transparent rounded-md text-sm font-medium text-white hover:bg-[#256d43] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2e8b57] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              确认上传
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
