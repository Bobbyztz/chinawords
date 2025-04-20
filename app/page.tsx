'use client';

import React from 'react';
import ChinawordsNavigation from './components/ChinawordsNavigation';
import HeroSection from './components/HeroSection';
import InitiativesSection from './components/InitiativesSection';
import CityOverviewSection from './components/CityOverviewSection';
import SustainabilitySection from './components/SustainabilitySection';
import CommunitySection from './components/CommunitySection';
import NewsletterSection from './components/NewsletterSection';
import BiophilicFooter from './components/BiophilicFooter';

import {
  navigationLinks,
  heroData,
  initiativesData,
  cityOverviewData,
  sustainabilityData,
  communityData,
  newsletterData,
  footerData
} from './data/environmentalData';

export default function Home() {
  return (
    <div className="min-h-screen texture-subtle">
      <ChinawordsNavigation links={navigationLinks} />

      <main>
        <HeroSection
          title={heroData.title}
          subtitle={heroData.subtitle}
          ctaText={heroData.ctaText}
          ctaLink={heroData.ctaLink}
          secondaryCtaText={heroData.secondaryCtaText}
          secondaryCtaLink={heroData.secondaryCtaLink}
          backgroundImage={heroData.backgroundImage}
        />

        <InitiativesSection
          title={initiativesData.title}
          subtitle={initiativesData.subtitle}
          initiatives={initiativesData.initiatives}
        />

        <CityOverviewSection
          title={cityOverviewData.title}
          subtitle={cityOverviewData.subtitle}
        />

        <SustainabilitySection
          title={sustainabilityData.title}
          subtitle={sustainabilityData.subtitle}
          description={sustainabilityData.description}
          imageSrc={sustainabilityData.imageSrc}
          imageAlt={sustainabilityData.imageAlt}
          metrics={sustainabilityData.metrics}
        />

        <CommunitySection
          title={communityData.title}
          subtitle={communityData.subtitle}
          events={communityData.events}
          backgroundTexture={communityData.backgroundTexture}
        />

        <NewsletterSection
          title={newsletterData.title}
          subtitle={newsletterData.subtitle}
          backgroundStyle={newsletterData.backgroundStyle}
        />
      </main>

      <BiophilicFooter
        description={footerData.description}
        columns={footerData.columns}
        socialLinks={footerData.socialLinks}
      />
    </div>
  );
}
