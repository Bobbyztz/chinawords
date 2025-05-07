"use client";

import React from "react";

const FoodImageStyles: React.FC = () => {
  return (
    <style jsx global>{`
      :root {
        --color-jade-green-dark: rgb(
          94,
          167,
          100
        ); /* 深翡翠绿色，用于hover和focus状态 */
      }

      .image-card {
        position: relative;
        background-color: white;
        padding: 0 0 1px 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }

      .image-card:hover {
        border: 1px solid rgb(186, 218, 200);
      }

      @keyframes fadeIn {
        0% {
          opacity: 0;
          transform: scale(0.95);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }

      /* Hover frame effect */
      .hover-frame-effect {
        position: relative;
      }

      .hover-frame-effect:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .corner {
        position: absolute;
        width: 20px;
        height: 20px;
        border: 2px solid #8b4513;
        z-index: 1;
      }

      .corner-tl {
        top: 4px;
        left: 4px;
        border-right: none;
        border-bottom: none;
      }

      .corner-tr {
        top: 4px;
        right: 4px;
        border-left: none;
        border-bottom: none;
      }

      .corner-bl {
        bottom: 4px;
        left: 4px;
        border-right: none;
        border-top: none;
      }

      .corner-br {
        bottom: 4px;
        right: 4px;
        border-left: none;
        border-top: none;
      }

      .tape-top {
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%) rotate(-5deg);
        width: 40px;
        height: 30px;
        background-color: rgba(255, 255, 0, 0.5);
        z-index: 2;
        clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
      }

      .aspect-ratio-container {
        position: relative;
        width: 100%;
        padding-bottom: 85%; /* Reduced from 100% to make images shorter */
        overflow: hidden;
        flex: 1;
        min-height: 0; /* Important for flex containers */
      }

      /* 八大菜系文字样式 */
      .flex span {
        position: relative;
      }

      .flex span:hover {
        color: var(--color-jade-green);
      }

      /* 确保选中的菜系显示为翡翠绿色 */
      .text-jade-green {
        color: var(--color-jade-green) !important;
      }

      .border-jade-green {
        border-color: var(--color-jade-green) !important;
      }

      /* 占位符样式 */
      input::placeholder {
        color: #999;
        opacity: 0.7;
      }

      /* 上传按钮样式 */
      .upload-button {
        color: #2e8b57;
        background-color: transparent;
      }
    `}</style>
  );
};

export default FoodImageStyles;
