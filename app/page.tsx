"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { heroData, initiativesData } from "./data/environmentalData";
import { getRandomImages } from "../lib/imageUtils";
import NewHomePage_Hero from "./components/homepage/NewHomePage_Hero";
import NewHomePage_BasicThemes from "./components/homepage/NewHomePage_BasicThemes";
import NewHomePage_AdvancedThemes from "./components/homepage/NewHomePage_AdvancedThemes";
import NewHomePage_CityGallery from "./components/homepage/NewHomePage_CityGallery";
import NewHomePage_FoodGallery from "./components/homepage/NewHomePage_FoodGallery";
import NewHomePage_Records from "./components/homepage/NewHomePage_Records";
import NewHomePage_Activities from "./components/homepage/NewHomePage_Activities";
import NewHomePage_NewsletterBio from "./components/homepage/NewHomePage_NewsletterBio";

export default function HomePage() {
  const sectionsRef = useRef<HTMLElement[]>([]);

  // State for city gallery
  const [isCityLoading, setIsCityLoading] = useState<boolean>(false);
  const [cityRefreshKey, setCityRefreshKey] = useState<number>(0);
  const [cityImages, setCityImages] = useState<string[]>([]);

  // State for food gallery
  const [isFoodLoading, setIsFoodLoading] = useState<boolean>(false);
  const [foodRefreshKey, setFoodRefreshKey] = useState<number>(0);
  const [foodImages, setFoodImages] = useState<string[]>([]);

  // Function to generate random city images
  const generateRandomCityImages = () => {
    console.log("Generating new random city images...");
    setIsCityLoading(true);

    // Add a small delay to show the loading effect
    setTimeout(() => {
      // Get 10 random images from the city folder
      const newCityImages = getRandomImages("34个省级行政区-3d", 10);
      setCityImages(newCityImages);
      setCityRefreshKey((prevKey) => prevKey + 1);
      setIsCityLoading(false);
    }, 800);
  };

  // Function to generate random food images
  const generateRandomFoodImages = () => {
    console.log("Generating new random food images...");
    setIsFoodLoading(true);

    // Add a small delay to show the loading effect
    setTimeout(() => {
      // Get 10 random images from the food folder
      const newFoodImages = getRandomImages("34个省级行政区-美食", 10);
      setFoodImages(newFoodImages);
      setFoodRefreshKey((prevKey) => prevKey + 1);
      setIsFoodLoading(false);
    }, 800);
  };

  // Load initial images when component mounts
  useEffect(() => {
    // Get initial random images
    const initialCityImages = getRandomImages("34个省级行政区-3d", 10);
    const initialFoodImages = getRandomImages("34个省级行政区-美食", 10);

    setCityImages(initialCityImages);
    setFoodImages(initialFoodImages);
  }, []);

  // Register sections for observation
  const registerSection = (el: HTMLElement | null, index: number) => {
    if (el) {
      sectionsRef.current[index] = el;
    }
  };

  return (
    <div className="h-full relative">
      {/* Fixed background image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={heroData.backgroundImage}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black opacity-70"></div>
      </div>

      {/* Scroll container without snap points */}
      <div className="h-screen overflow-y-scroll scroll-smooth relative z-10 no-scrollbar">
        {/* Hero Section */}
        <NewHomePage_Hero
          heroData={heroData}
          registerSection={registerSection}
        />

        {/* Basic Themes Section */}
        <NewHomePage_BasicThemes
          initiativesData={initiativesData}
          registerSection={registerSection}
        />

        {/* Advanced Themes Section */}
        <NewHomePage_AdvancedThemes
          initiativesData={initiativesData}
          registerSection={registerSection}
        />

        {/* City Gallery Section */}
        <NewHomePage_CityGallery
          cityImages={cityImages}
          isCityLoading={isCityLoading}
          cityRefreshKey={cityRefreshKey}
          generateRandomCityImages={generateRandomCityImages}
          registerSection={registerSection}
        />

        {/* Food Gallery Section */}
        <NewHomePage_FoodGallery
          foodImages={foodImages}
          isFoodLoading={isFoodLoading}
          foodRefreshKey={foodRefreshKey}
          generateRandomFoodImages={generateRandomFoodImages}
          registerSection={registerSection}
        />

        {/* Records Section */}
        <NewHomePage_Records registerSection={registerSection} />

        {/* Activities Section */}
        <NewHomePage_Activities registerSection={registerSection} />

        {/* Newsletter and Bio Section */}
        <NewHomePage_NewsletterBio registerSection={registerSection} />
      </div>
      <style jsx global>{`
        /* Blur effect for loading state */
        .blur-effect {
          filter: blur(10px) saturate(0.8);
          opacity: 0.7;
          pointer-events: none;
          transform: scale(0.98);
          transition: all 0.3s ease-in-out;
        }

        /* Button hover effect */
        button:not(:disabled):hover {
          box-shadow: 0 1px 3px rgba(46, 139, 87, 0.2);
        }

        /* Refresh button animation */
        @keyframes subtlePulse {
          0% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.7;
          }
        }

        button:not(:disabled):hover::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: rgba(46, 139, 87, 0.05);
          animation: subtlePulse 2s infinite ease-in-out;
          pointer-events: none;
        }

        /* Image hover effect */
        .hover-frame-effect {
          position: relative;
          transition: all 0.3s ease-in-out;
        }

        .hover-frame-effect:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          background-color: #f8f4e6;
          border: 1px solid #8b4513;
          padding: 10px;
        }

        /* Frame corners */
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

        /* Tape effect */
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
      `}</style>
    </div>
  );
}
