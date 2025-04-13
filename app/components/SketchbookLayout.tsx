import React, { ReactNode } from 'react';
import '../assets/textures/paper-texture.css';
import '../assets/textures/animations.css';

interface SketchbookLayoutProps {
  children: ReactNode;
  className?: string;
}

const SketchbookLayout: React.FC<SketchbookLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`sketchbook-container relative w-full max-w-6xl mx-auto my-8 ${className}`}>
      <div className="sketchbook-binding paper-binding">
        <div className="sketchbook-pages paper-texture p-6 min-h-[600px] rounded-r-md shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SketchbookLayout;
