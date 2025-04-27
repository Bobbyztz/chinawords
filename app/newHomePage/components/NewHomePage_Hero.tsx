import React from "react";
import Image from "next/image";

interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage: string;
}

interface NewHomePageHeroProps {
  heroData: HeroData;
  registerSection: (el: HTMLElement | null, index: number) => void;
}

const NewHomePage_Hero: React.FC<NewHomePageHeroProps> = ({ heroData, registerSection }) => {
  return (
    <section
      id="hero-section"
      className="h-screen w-full py-4 px-3 flex items-center justify-center"
      ref={(el) => registerSection(el, 0)}
    >
      <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-lg w-full h-[calc(100%-9px)] overflow-y-auto">
        <div className="h-full flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-film-red mb-6 font-serif-sc">
              {heroData.title}
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              {heroData.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={heroData.ctaLink}
                className="bg-[#A00D19] hover:bg-red-700 text-white px-8 py-2 rounded-md text-lg font-medium transition-all duration-300"
              >
                {heroData.ctaText}
              </a>
              {heroData.secondaryCtaText && heroData.secondaryCtaLink && (
                <a
                  href={heroData.secondaryCtaLink}
                  className="bg-transparent border border-[#A00D19] text-[#A00D19] hover:bg-[#A00D19] hover:text-white px-8 py-2 rounded-md text-lg font-medium transition-all duration-300"
                >
                  {heroData.secondaryCtaText}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHomePage_Hero;
