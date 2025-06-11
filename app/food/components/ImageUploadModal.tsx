"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { Plus, X, Loader2, LogIn } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[], aiPrompt: string, altText: string) => Promise<void>;
}

interface SelectedImageData {
  file: File;
  previewUrl: string;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [selectedImages, setSelectedImages] = useState<SelectedImageData[]>([]);
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [altText, setAltText] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get session data to check if user is logged in
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const pathname = usePathname();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const remainingSlots = 9 - selectedImages.length;
      const filesToProcess = fileArray.slice(0, remainingSlots);

      filesToProcess.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newImageData: SelectedImageData = {
            file,
            previewUrl: reader.result as string,
          };

          setSelectedImages((prev) => {
            if (prev.length < 9) {
              return [...prev, newImageData];
            }
            return prev;
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePlusClick = () => {
    if (selectedImages.length < 9) {
      fileInputRef.current?.click();
    }
  };

  const handleConfirmUpload = async () => {
    if (selectedImages.length > 0) {
      setIsUploading(true);
      setUploadError("");
      try {
        const files = selectedImages.map((img) => img.file);
        await onUpload(files, aiPrompt, altText);
        handleClose(); // On success, call the internal close handler to reset state and close modal
      } catch (error) {
        console.error("Upload error:", error);
        if (error instanceof Error) {
          // Handle specific error messages for better user feedback
          if (
            error.message.includes("413") ||
            error.message.includes("entity too large")
          ) {
            setUploadError("图片文件太大，请压缩后重试或使用较小的图片");
          } else {
            setUploadError(error.message || "上传失败，请重试");
          }
        } else {
          setUploadError(
            typeof error === "string" ? error : "上传失败，请重试"
          );
        }
        setIsUploading(false);
      }
    }
  };

  const handleClose = () => {
    setSelectedImages([]);
    setAiPrompt("");
    setAltText("");
    setIsUploading(false);
    setUploadError("");
    onClose();
  };

  if (!isOpen) return null;

  // 生成九宫格布局
  const renderImageGrid = () => {
    const gridItems = [];

    // 填充已选择的图片
    for (let i = 0; i < selectedImages.length; i++) {
      const imageData = selectedImages[i];
      gridItems.push(
        <div
          key={i}
          className="relative aspect-square border border-dashed border-neutral-400 rounded-md overflow-hidden bg-neutral-50"
        >
          <Image
            src={imageData.previewUrl}
            alt={`Selected image ${i + 1}`}
            fill
            sizes="(max-width: 1024px) 33vw, 150px"
            className="object-cover"
          />
          <button
            onClick={() => handleRemoveImage(i)}
            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors z-10"
            aria-label="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      );
    }

    // 填充空的占位符，包括添加按钮
    const remainingSlots = 9 - selectedImages.length;
    for (let i = 0; i < remainingSlots; i++) {
      if (i === 0 && selectedImages.length < 9) {
        // 第一个空位置放置添加按钮
        gridItems.push(
          <div
            key={`add-${i}`}
            onClick={handlePlusClick}
            className="aspect-square border border-dashed border-neutral-400 rounded-md bg-neutral-50 flex flex-col items-center justify-center cursor-pointer hover:border-neutral-500 hover:bg-neutral-100 transition-colors"
          >
            <Plus size={24} className="text-neutral-500 mb-1" />
            <span className="text-xs text-neutral-500 text-center px-1">
              添加图片
              <br />({selectedImages.length}/9)
            </span>
          </div>
        );
      } else {
        // 其他空位置
        gridItems.push(
          <div
            key={`empty-${i}`}
            className="aspect-square border border-dashed border-neutral-300 rounded-md bg-neutral-25"
          />
        );
      }
    }

    return gridItems;
  };

  return (
    <div className="fixed inset-0 bg-white/10 flex items-center justify-center z-50 p-2">
      <div className="bg-gradient-to-br from-neutral-100/95 via-white/95 to-neutral-100/90 rounded-lg shadow-xl p-2 w-full max-w-4xl flex gap-6 relative h-[65vh] text-neutral-200">
        {/* Left side - Image Upload or Login Prompt */}
        <div className="w-1/2 flex flex-col items-stretch justify-center border border-dashed border-neutral-700 rounded-md p-4 relative">
          {isAuthenticated ? (
            <>
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
              {selectedImages.length > 0 ? (
                <div className="w-full h-full">
                  <div className="grid grid-cols-3 gap-2 h-full">
                    {renderImageGrid()}
                  </div>
                </div>
              ) : (
                <div
                  onClick={handlePlusClick}
                  className="flex flex-col items-center justify-center text-center p-4 cursor-pointer group w-full flex-grow"
                >
                  <Plus
                    size={48}
                    className="text-white hover:text-gray-500 transition-colors mb-2"
                  />
                  <p className="text-neutral-500 text-sm">
                    点击或拖拽图片到此处
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    支持 JPG, PNG, GIF, WebP 等格式
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    最多可选择 9 张图片
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-4 w-full flex-grow">
              <LogIn size={48} className="text-neutral-400 mb-4" />
              <p className="text-neutral-400 mb-4">
                请登录以解锁全部图片上传功能。
              </p>
              <Link
                href={`/login?redirect=${pathname}`}
                className="px-4 py-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-medium rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-yellow-500"
              >
                前往登录
              </Link>
            </div>
          )}
        </div>

        {/* Right side: Inputs and Buttons */}
        <div className="w-1/2 p-2 flex flex-col h-full">
          {/* Close button for the modal */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-100 transition-colors z-10"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          {isAuthenticated ? (
            <>
              {/* Inputs Container */}
              <div className="flex-grow flex flex-col space-y-4 mb-4 pt-6">
                {" "}
                {/* Added pt-6 for spacing from potential close button*/}
                {/* AI Prompt Section */}
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor="aiPromptInput"
                    className="block text-sm font-medium text-neutral-500 mb-1"
                  >
                    AI 提示词
                  </label>
                  <textarea
                    id="aiPromptInput"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="p-2 bg-transparent border border-neutral-500 rounded-md w-full flex-grow resize-none focus:outline-none placeholder-neutral-500 text-neutral-600"
                    placeholder="例如：一张美味的宫保鸡丁特写，色彩鲜艳"
                    rows={3}
                  />
                </div>
                {/* Alt Text Section */}
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor="altTextInput"
                    className="block text-sm font-medium text-neutral-500 mb-1"
                  >
                    图片 Alt 信息
                  </label>
                  <textarea
                    id="altTextInput"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    className="p-2 border border-neutral-500 rounded-md w-full flex-grow resize-none focus:outline-none placeholder-neutral-500 text-neutral-600"
                    placeholder="例如：宫保鸡丁，四川名菜"
                    rows={3}
                  />
                  <p className="text-xs text-neutral-400 mt-1">
                    此提示词和Alt信息将应用于所有上传的图片
                  </p>
                </div>
              </div>

              {/* Error message */}
              {uploadError && (
                <div className="text-red-400 text-sm mb-2 text-center p-1 bg-red-900/30 rounded-md">
                  {uploadError}
                </div>
              )}

              {/* Buttons Section */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 border border-transparent rounded-md text-sm font-medium text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-red-500 transition-all duration-150 ease-in-out"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={handleConfirmUpload}
                  disabled={
                    selectedImages.length === 0 ||
                    !aiPrompt ||
                    !altText ||
                    isUploading
                  }
                  className="px-4 py-2 bg-green-800 border border-transparent rounded-md text-sm font-medium text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-yellow-500 transition-all duration-150 ease-in-out disabled:from-neutral-700 disabled:to-neutral-800 disabled:text-neutral-400 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2 text-white" />
                      上传中...
                    </>
                  ) : (
                    `确认上传 (${selectedImages.length})`
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center">
              <p className="text-neutral-400 text-center">
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
