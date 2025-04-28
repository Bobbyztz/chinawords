"use client";

import React from "react";

// 这个组件只提供"正在建设中"的标签内容
export const getUnderConstructionTabs = () => {
  return [
    {
      title: "标签1",
      content: (
        <div className="text-gray-400 text-center py-16 font-sans-sc">
          正在建设中，敬请期待！
        </div>
      ),
    },
    {
      title: "标签2",
      content: (
        <div className="text-gray-400 text-center py-16 font-sans-sc">
          正在建设中，敬请期待！
        </div>
      ),
    },
  ];
};
