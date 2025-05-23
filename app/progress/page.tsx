'use client';

import React from 'react';
import ContentPageLayout from '../components/ContentPageLayout';
import { getUnderConstructionTabs } from '../components/UnderConstructionContent';

export default function ProgressPage() {
  // 使用通用的未建设完成标签
  const tabs = getUnderConstructionTabs();
  // 修改标签标题以反映页面内容
  const customTabs = tabs.map((tab, index) => ({
    ...tab,
    title: index === 0 ? "项目进度" : `项目进度 ${index + 1}`
  }));
  
  return (
    <ContentPageLayout tabs={customTabs} />
  );
}
