"use client";

import React from "react";
import FoodPlugin from "./FoodPlugin";

const FoodPluginContent = () => {
  return (
    <div
      className="w-full overflow-y-auto bg-white/50 backdrop-blur-sm rounded-lg"
      style={{ minHeight: "calc(90vh - 100px)" }}
    >
      <FoodPlugin />
    </div>
  );
};

export default FoodPluginContent;
