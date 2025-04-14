import React from 'react';

interface FrameToggleIconProps {
  isActive: boolean;
}

const FrameToggleIcon: React.FC<FrameToggleIconProps> = ({ isActive }) => {
  const activeColor = '#8b0000'; // 更深的红色，与相框颜色匹配
  const inactiveColor = '#666666';
  const color = isActive ? activeColor : inactiveColor;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer frame */}
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="2"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />

      {/* Inner frame */}
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />

      {/* Corner decorations */}
      <path
        d="M2 6C2 4 4 2 6 2"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M18 2C20 2 22 4 22 6"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M22 18C22 20 20 22 18 22"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M6 22C4 22 2 20 2 18"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
};

export default FrameToggleIcon;
