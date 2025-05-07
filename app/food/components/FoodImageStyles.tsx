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
        background-color: transparent; /* CHANGED: Was white */
        padding: 0 0 1px 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 0px;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: hidden; /* Add overflow hidden to contain the overlay */
      }

      .image-card:hover {
        border: 1px solid rgb(186, 218, 200);
        overflow: hidden;
        flex: 1;
        min-height: 0; /* Important for flex containers */
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

      .aspect-ratio-container::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 35%; /* Golden ratio for bottom 1/3 (approx) */
        background-color: rgba(
          225,
          225,
          225,
          0.1
        ); /* Light background for frost effect */
        backdrop-filter: blur(6px); /* Frosted glass effect */
        -webkit-backdrop-filter: blur(6px); /* Safari support */
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        pointer-events: none; /* Ensure overlay doesn't block interactions with elements behind if any */
      }

      .image-card:hover .aspect-ratio-container::after {
        opacity: 1;
        visibility: visible;
      }

      /* Styles for the caption area BELOW the image */
      .image-caption-area {
        background-color: white; /* Initial white background */
        position: relative; /* For absolute positioning of icons within */
        height: 24px; /* Set explicit height to match original design */
        line-height: 24px; /* Match height for vertical centering */
        margin: 0; /* Remove any margin */
        padding: 0; /* Remove any padding */
        overflow: hidden; /* Prevent content from expanding height */
        transition: background-color 0.3s ease-in-out;
      }

      .alt-text-display {
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
        line-height: 24px; /* Match container height */
      }

      .caption-hover-icons {
        opacity: 0;
        pointer-events: none; /* Initially not interactive */
        /* Icons are absolutely positioned by Tailwind 'absolute inset-0' */
        transition: opacity 0.3s ease-in-out;
        height: 24px; /* Match container height */
        line-height: 24px; /* Vertical alignment */
      }

      /* HOVER STATES */
      .image-card:hover .image-caption-area {
        /* Attempts to make caption area transparent. */
        /* NOTE: If 'image-card' has a white background, this will show that white background. */
        background-color: gray/40 !important;
      }

      .image-card:hover .alt-text-display {
        opacity: 0 !important; /* Hide alt text */
        pointer-events: none !important; /* Ensure text is not accidentally interactive when hidden */
      }

      .image-card:hover .caption-hover-icons {
        opacity: 1 !important; /* Show icons */
        pointer-events: auto !important; /* Make icons clickable */
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
