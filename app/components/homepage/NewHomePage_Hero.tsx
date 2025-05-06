import React, { useState, useRef, MouseEvent } from "react";
import ChinawordsNavigation from "../ChinawordsNavigation";
import { navigationLinks } from "../../data/environmentalData";

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

const NewHomePage_Hero: React.FC<NewHomePageHeroProps> = ({
  heroData,
  registerSection,
}) => {
  const [showNav, setShowNav] = useState(false);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (subtitleRef.current) {
      const rect = subtitleRef.current.getBoundingClientRect();
      setShowNav(e.clientY <= rect.bottom);
    }
  };
  const handleMouseLeave = () => setShowNav(false);

  return (
    <section
      id="hero-section"
      className="h-screen w-full py-4 px-3 flex items-center justify-center"
      ref={(el) => registerSection(el, 0)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-[calc(100%-9px)]">
        {/* Card container with flex column layout */}
        <div className="relative bg-white/60 backdrop-blur-sm rounded-lg shadow-lg w-full h-full overflow-y-auto flex flex-col">
          {/* Navigation component as first child in normal flow */}
          <div
            className={`absolute top-0 left-0 w-full z-10 transition-opacity duration-700 ${
              showNav ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <ChinawordsNavigation links={navigationLinks} />
          </div>
          {/* Inner content taking remaining space */}
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-film-red mb-6 font-serif-sc">
                {heroData.title}
              </h1>
              <p ref={subtitleRef} className="text-xl text-gray-700 mb-8">
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
                    className="bg-transparent border border-[#A00D19] text-[#A00D19] px-8 py-2 rounded-md text-lg font-medium transition-all duration-300"
                  >
                    {heroData.secondaryCtaText}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHomePage_Hero;
