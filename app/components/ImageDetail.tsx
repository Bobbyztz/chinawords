import React from 'react';
import Image from 'next/image';

interface ImageDetailProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  description?: string;
  date?: string;
  location?: string;
  onClose?: () => void;
}

const ImageDetail: React.FC<ImageDetailProps> = ({
  src,
  alt,
  width,
  height,
  description,
  date,
  location,
  onClose
}) => {
  return (
    <div className="image-detail paper-texture paper-ruled p-8 rounded-md shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h2 className="handwritten text-2xl">{alt}</h2>
        <button
          onClick={onClose}
          className="close-button handwritten text-2xl"
          aria-label="Close detail view"
        >
          ✕
        </button>
      </div>

      <div className="image-container relative mx-auto my-4 magnify-glass max-w-2xl max-h-[500px] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="mx-auto shadow-md w-full h-full object-contain"
        />
      </div>

      <div className="image-notes mt-6">
        {description && (
          <p className="handwritten mb-2">{description}</p>
        )}

        <div className="flex flex-wrap justify-between mt-4">
          {date && (
            <div className="note-item handwritten text-sm">
              <span className="font-bold">Date:</span> {date}
            </div>
          )}

          {location && (
            <div className="note-item handwritten text-sm">
              <span className="font-bold">Location:</span> {location}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
