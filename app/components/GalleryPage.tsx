import React, { ReactNode, useState } from 'react';

interface GalleryPageProps {
  children: ReactNode;
  pageNumber: number;
  isActive?: boolean;
  onTurn?: () => void;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ 
  children, 
  pageNumber, 
  isActive = false,
  onTurn
}) => {
  const [isTurning, setIsTurning] = useState(false);
  
  const handleTurn = () => {
    if (onTurn) {
      setIsTurning(true);
      setTimeout(() => {
        onTurn();
        setIsTurning(false);
      }, 800); // Match animation duration
    }
  };

  return (
    <div 
      className={`gallery-page paper-texture paper-edge relative ${
        isActive ? 'block' : 'hidden'
      } ${isTurning ? 'page-turn turning' : 'page-turn'}`}
    >
      <div className="page-content p-6">
        {children}
      </div>
      
      <div className="page-number handwritten absolute bottom-4 right-8">
        {pageNumber}
      </div>
      
      {pageNumber > 1 && (
        <button 
          onClick={handleTurn}
          className="page-corner absolute bottom-0 right-0 w-16 h-16 cursor-pointer"
          aria-label="Turn page"
        >
          <div className="w-0 h-0 border-b-16 border-l-16 border-b-gray-300 border-l-transparent absolute bottom-0 right-0"></div>
        </button>
      )}
    </div>
  );
};

export default GalleryPage;
