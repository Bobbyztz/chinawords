"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the MDX content
// This prevents server/client hydration issues with MDX content
const FoodPluginContent = dynamic(() => import("./FoodPlugin.mdx"), {
  loading: () => (
    <div className="flex justify-center items-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-jade-green"></div>
    </div>
  ),
});

const FoodPluginMDX = () => {
  return (
    <div
      className="w-full overflow-y-auto bg-white/50 backdrop-blur-sm rounded-lg"
      style={{ minHeight: "calc(90vh - 100px)" }}
    >
      <FoodPluginContent />
    </div>
  );
};

export default FoodPluginMDX;
