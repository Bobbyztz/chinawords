'use client';

import React from 'react';
import ContentPageLayout from '../../components/ContentPageLayout';
import { getUnderConstructionTabs } from '../../components/UnderConstructionContent';

export default function DonatePage() {
  return (
    <ContentPageLayout tabs={getUnderConstructionTabs()} />
  );
}
