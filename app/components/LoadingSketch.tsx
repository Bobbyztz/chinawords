import React from 'react';

interface LoadingSketchProps {
  size?: 'small' | 'medium' | 'large';
}

const LoadingSketch: React.FC<LoadingSketchProps> = ({ size = 'medium' }) => {
  const dimensions = {
    small: { width: 100, height: 100 },
    medium: { width: 200, height: 200 },
    large: { width: 300, height: 300 },
  };

  const { width, height } = dimensions[size];

  return (
    <div className="loading-sketch flex items-center justify-center p-4">
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        className="sketch-animation"
      >
        <path
          d="M20,50 Q35,20 50,50 Q65,80 80,50"
          fill="none"
          stroke="#333"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M30,30 Q50,10 70,30 Q85,45 70,70 Q50,90 30,70 Q15,45 30,30"
          fill="none"
          stroke="#333"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M40,40 L60,40 L60,60 L40,60 Z"
          fill="none"
          stroke="#333"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
      <p className="handwritten mt-4">Sketching...</p>
    </div>
  );
};

export default LoadingSketch;
