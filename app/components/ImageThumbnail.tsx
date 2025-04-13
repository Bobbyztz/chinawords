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
  date?: string;
  description?: string;
}

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  src,
  alt,
  width,
  height,
  onClick,
  style = 'tape',
  tapeColor = 'blue',
  date,
  description
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
      className={`image-thumbnail relative w-full bg-white p-3 shadow-md transform rotate-${Math.floor(Math.random() * 3) - 1} ${getStyleClass()}`}
      onClick={onClick}
    >
      <div className="relative overflow-hidden w-full h-48">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="magnify w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>
      <div className="mt-3">
        <h3 className="handwritten-title text-lg">{alt}</h3>
        {date && <p className="handwritten-date text-sm">Created {date}</p>}
      </div>
    </div>
  );
};

export default ImageThumbnail;
