"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the MDX content
// This prevents server/client hydration issues with MDX content
const FoodPluginContent = dynamic(() => import("./FoodPlugin.mdx"), {
  loading: () => <p className="text-center py-8">加载中...</p>,
});

const FoodPluginMDX = () => {
  return (
    <div className="w-full overflow-y-auto" style={{ minHeight: "calc(90vh - 100px)" }}>
      <FoodPluginContent />
    </div>
  );
};

export default FoodPluginMDX;
