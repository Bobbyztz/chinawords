import React, { useState, useRef, useEffect } from 'react';

interface MagnifyingGlassProps {
  children: React.ReactNode;
  magnification?: number;
}

const MagnifyingGlass: React.FC<MagnifyingGlassProps> = ({
  children,
  magnification = 2
}) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      setPosition({ x, y });
    }
  };

  return (
    <div 
      className="magnifying-glass-container relative"
      ref={containerRef}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      
      {showMagnifier && (
        <div 
          className="magnifier absolute pointer-events-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '2px solid #333',
            boxShadow: '0 0 10px rgba(0,0,0,0.3), inset 0 0 20px rgba(0,0,0,0.2)',
            transform: 'translate(-50%, -50%)',
            overflow: 'hidden',
            zIndex: 1000
          }}
        >
          <div 
            style={{
              width: '100%',
              height: '100%',
              transform: `scale(${magnification})`,
              transformOrigin: `${(position.x / (containerRef.current?.offsetWidth || 1)) * 100}% ${(position.y / (containerRef.current?.offsetHeight || 1)) * 100}%`
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default MagnifyingGlass;
