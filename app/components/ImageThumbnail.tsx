import React from 'react';
import Image from 'next/image';

interface ImageThumbnailProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  onClick?: () => void;
  style?: 'tape' | 'paperclip' | 'corners';
  tapeColor?: 'blue' | 'yellow' | 'pink' | 'green';
}

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  src,
  alt,
  width,
  height,
  onClick,
  style = 'tape',
  tapeColor = 'blue'
}) => {
  const getStyleClass = () => {
    switch (style) {
      case 'tape':
        return `washi-tape ${tapeColor}`;
      case 'paperclip':
        return 'paperclip';
      case 'corners':
        return 'photo-corners';
      default:
        return '';
    }
  };

  return (
    <div 
      className={`image-thumbnail relative inline-block m-4 bg-white p-2 shadow-md transform rotate-${Math.floor(Math.random() * 5) - 2} ${getStyleClass()}`}
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="magnify"
        />
      </div>
      <div className="handwritten-caption mt-2 text-center">
        {alt}
      </div>
    </div>
  );
};

export default ImageThumbnail;
