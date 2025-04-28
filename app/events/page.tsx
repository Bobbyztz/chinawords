'use client';

import React from 'react';
import ContentPageLayout from '../components/ContentPageLayout';
import { getUnderConstructionTabs } from '../components/UnderConstructionContent';

export default function EventsPage() {
  return (
    <ContentPageLayout tabs={getUnderConstructionTabs()} />
  );
}
