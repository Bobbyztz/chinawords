'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface CityImage {
  id: string;
  src: string;
  alt: string;
  type: '3d' | 'food';
}

interface CityOverviewSectionProps {
  title: string;
  subtitle: string;
}

const CityOverviewSection: React.FC<CityOverviewSectionProps> = ({
  title,
  subtitle
}) => {
  const [images, setImages] = useState<CityImage[]>([]);

  // Generate random images on component mount
  useEffect(() => {
    const generateRandomImages = () => {
      // List of available 3D city images
      const cityImages3D = [
        { file: '上海.png', name: '上海' },
        { file: '南京.png', name: '南京' },
        { file: '南昌.png', name: '南昌' },
        { file: '合肥.png', name: '合肥' },
        { file: '天津.png', name: '天津' },
        { file: '太原.png', name: '太原' },
        { file: '杭州.png', name: '杭州' },
        { file: '澳门.png', name: '澳门' },
        { file: '福州.png', name: '福州' },
        { file: '石家庄.png', name: '石家庄' },
        { file: '重庆.png', name: '重庆' },
        { file: '长春.png', name: '长春' },
        { file: '香港.png', name: '香港' },
        { file: '哈尔滨.png', name: '哈尔滨' },
        { file: '兰州.png', name: '兰州' },
        { file: '南宁.png', name: '南宁' },
        { file: '台北.png', name: '台北' },
        { file: '广州.png', name: '广州' },
        { file: '成都.png', name: '成都' },
        { file: '拉萨.png', name: '拉萨' },
        { file: '昆明.png', name: '昆明' },
        { file: '武汉.png', name: '武汉' },
        { file: '济南.png', name: '济南' },
        { file: '海口.png', name: '海口' },
        { file: '西宁.png', name: '西宁' },
        { file: '西安.png', name: '西安' },
        { file: '贵阳.png', name: '贵阳' },
        { file: '郑州.png', name: '郑州' },
        { file: '长沙.png', name: '长沙' },
        { file: '呼和浩特.png', name: '呼和浩特' }
      ];

      // List of available food images with their display names
      const foodImages = [
        { file: '上海.png', name: '上海' },
        { file: '兰州.png', name: '兰州' },
        { file: '南京.png', name: '南京' },
        { file: '南宁.png', name: '南宁' },
        { file: '南昌.png', name: '南昌' },
        { file: '台北.png', name: '台北' },
        { file: '合肥.png', name: '合肥' },
        { file: '天津.png', name: '天津' },
        { file: '太原.png', name: '太原' },
        { file: '广州.png', name: '广州' },
        { file: '成都.png', name: '成都' },
        { file: '拉萨.png', name: '拉萨' },
        { file: '昆明.png', name: '昆明' },
        { file: '杭州.png', name: '杭州' },
        { file: '武汉.png', name: '武汉' },
        { file: '沈阳.png', name: '沈阳' },
        { file: '济南.png', name: '济南' },
        { file: '海口.png', name: '海口' },
        { file: '澳门.png', name: '澳门' },
        { file: '石家庄.png', name: '石家庄' },
        { file: '福州.png', name: '福州' },
        { file: '西宁.png', name: '西宁' },
        { file: '西安.png', name: '西安' },
        { file: '贵阳.png', name: '贵阳' },
        { file: '郑州.png', name: '郑州' },
        { file: '重庆.png', name: '重庆' },
        { file: '银川.png', name: '银川' },
        { file: '长春.png', name: '长春' },
        { file: '长沙.png', name: '长沙' },
        { file: '香港.png', name: '香港' },
        { file: '哈尔滨.png', name: '哈尔滨' },
        { file: '乌鲁木齐.png', name: '乌鲁木齐' },
        { file: '呼和浩特.png', name: '呼和浩特' }
      ];

      // Shuffle and select 15 images from each category
      const shuffled3D = [...cityImages3D].sort(() => 0.5 - Math.random()).slice(0, 15);
      const shuffledFood = [...foodImages].sort(() => 0.5 - Math.random()).slice(0, 15);

      // Create image objects
      const images3D = shuffled3D.map((img, index) => ({
        id: `3d-${index}`,
        src: `/34个省级行政区-3d/${img.file}`,
        alt: img.name,
        type: '3d' as const
      }));

      const imagesFood = shuffledFood.map((img, index) => ({
        id: `food-${index}`,
        src: `/34个省级行政区-美食/${img.file}`,
        alt: img.name,
        type: 'food' as const
      }));

      // Combine and shuffle all images
      const allImages = [...images3D, ...imagesFood].sort(() => 0.5 - Math.random());
      setImages(allImages);
    };

    generateRandomImages();
  }, []);



  return (
    <section className="py-20 texture-subtle relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/50 to-transparent"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="text-left max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-nature-heading">{title}</h2>
            <p className="text-lg text-nature-body">{subtitle}</p>
          </div>
        </div>

        {/* Photo wall */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="image-card hover-frame-effect"
            >
              <div className="tape-top"></div>
              <div className="frame-corners">
                <div className="corner corner-tl"></div>
                <div className="corner corner-tr"></div>
                <div className="corner corner-bl"></div>
                <div className="corner corner-br"></div>
              </div>
              <div className="relative aspect-ratio-container overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{ objectPosition: 'center' }}
                  loading={image.id.includes('0') ? 'eager' : 'lazy'} // Prioritize loading for first few images
                />
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Organic shape divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[70px] md:h-[100px] block"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="white"
          ></path>
        </svg>
      </div>

      <style jsx>{`
        .image-card {
          position: relative;
          background-color: white;
          padding: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .image-card:hover {
          transform: translateY(-5px);
        }

        /* Hover frame effect */
        .hover-frame-effect {
          position: relative;
        }

        .hover-frame-effect:hover {
          background-color: #f8f4e6;
          border: 1px solid #8b4513;
          padding: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .frame-corners {
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .hover-frame-effect:hover .frame-corners {
          opacity: 1;
        }

        .corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid #8b4513;
          z-index: 1;
        }

        .corner-tl {
          top: 4px;
          left: 4px;
          border-right: none;
          border-bottom: none;
        }

        .corner-tr {
          top: 4px;
          right: 4px;
          border-left: none;
          border-bottom: none;
        }

        .corner-bl {
          bottom: 4px;
          left: 4px;
          border-right: none;
          border-top: none;
        }

        .corner-br {
          bottom: 4px;
          right: 4px;
          border-left: none;
          border-top: none;
        }

        .tape-top {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%) rotate(-5deg);
          width: 40px;
          height: 30px;
          background-color: rgba(255, 255, 0, 0.5);
          z-index: 2;
          clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
        }

        .aspect-ratio-container {
          position: relative;
          width: 100%;
          padding-bottom: 100%; /* This creates a perfect square */
          overflow: hidden;
        }

        .aspect-ratio-container img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }


      `}</style>
    </section>
  );
};

export default CityOverviewSection;
