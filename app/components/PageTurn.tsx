import React, { useState, useEffect } from 'react';

interface PageTurnProps {
  children: React.ReactNode[];
  initialPage?: number;
}

const PageTurn: React.FC<PageTurnProps> = ({
  children,
  initialPage = 0
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  
  const totalPages = React.Children.count(children);
  
  const goToNextPage = () => {
    if (currentPage < totalPages - 1 && !isAnimating) {
      setDirection('next');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsAnimating(false);
      }, 400); // Half of animation duration
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 0 && !isAnimating) {
      setDirection('prev');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsAnimating(false);
      }, 400); // Half of animation duration
    }
  };
  
  return (
    <div className="page-turn-container relative w-full h-full perspective-1200">
      <div className="pages-wrapper relative w-full h-full">
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className={`page absolute top-0 left-0 w-full h-full ${
              index === currentPage ? 'z-10' : 'z-0'
            } ${
              isAnimating && index === currentPage && direction === 'next'
                ? 'page-turn turning'
                : ''
            } ${
              isAnimating && index === currentPage - 1 && direction === 'prev'
                ? 'page-turn revealing'
                : ''
            }`}
            style={{
              display: 
                index === currentPage || 
                (isAnimating && (
                  (direction === 'next' && index === currentPage + 1) ||
                  (direction === 'prev' && index === currentPage - 1)
                )) 
                  ? 'block' 
                  : 'none'
            }}
          >
            {child}
          </div>
        ))}
      </div>
      
      <div className="navigation-controls absolute bottom-4 left-0 right-0 flex justify-center gap-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 0 || isAnimating}
          className={`prev-page p-2 handwritten ${
            currentPage === 0 || isAnimating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          ← Previous
        </button>
        
        <div className="page-indicator handwritten">
          {currentPage + 1} / {totalPages}
        </div>
        
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1 || isAnimating}
          className={`next-page p-2 handwritten ${
            currentPage === totalPages - 1 || isAnimating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PageTurn;
