import React from "react";

interface NewHomePageProjectProgressProps {
  registerSection: (el: HTMLElement | null, index: number) => void;
}

const NewHomePage_ProjectProgress: React.FC<
  NewHomePageProjectProgressProps
> = ({ registerSection }) => {
  return (
    <section
      id="project-progress-section"
      className="h-screen w-full py-4 px-3 flex items-center justify-center"
      ref={(el) => registerSection(el, 1)}
    >
      <div className="bg-white/30 backdrop-blur-sm rounded-lg shadow-lg w-full h-[calc(100%-9px)] overflow-y-auto">
        <div className="h-full p-6">
          <h2 className="text-3xl font-bold text-center pt-10 mb-16 font-serif-sc">
            项目进度
          </h2>
        </div>
      </div>
    </section>
  );
};

export default NewHomePage_ProjectProgress;
