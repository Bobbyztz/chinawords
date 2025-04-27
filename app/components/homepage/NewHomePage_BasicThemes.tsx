import React from "react";
import Image from "next/image";

interface Initiative {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
}

interface InitiativesData {
  title: string;
  initiatives: Initiative[];
}

interface NewHomePageBasicThemesProps {
  initiativesData: InitiativesData;
  registerSection: (el: HTMLElement | null, index: number) => void;
}

const NewHomePage_BasicThemes: React.FC<NewHomePageBasicThemesProps> = ({ initiativesData, registerSection }) => {
  return (
    <section
      id="basic-themes-section"
      className="h-screen w-full py-4 px-3 flex items-center justify-center"
      ref={(el) => registerSection(el, 1)}
    >
      <div className="bg-white/30 backdrop-blur-sm rounded-lg shadow-lg w-full h-[calc(100%-9px)] overflow-y-auto">
        <div className="h-full p-6">
          <h2 className="text-3xl font-bold text-center pt-10 mb-16 font-serif-sc">
            基础板块
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Only original 4 cards: 衣食住行 */}
            {initiativesData.initiatives.slice(0, 4).map((initiative) => (
              <div
                key={initiative.id}
                className="bg-transparent rounded-lg border-[1.5px] border-gray-100/70 hover:border-[1.5px] hover:border-black/40 overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={initiative.imageSrc}
                    alt={initiative.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1 font-serif-sc">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-800 text-sm mb-3">
                    {initiative.description}
                  </p>
                  <a
                    href={initiative.link}
                    className="inline-flex items-center text-[#C20F1E] hover:text-red-800 hover:underline text-sm font-medium"
                  >
                    了解更多
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHomePage_BasicThemes;
