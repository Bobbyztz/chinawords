'use client';

import React, { useState, useEffect } from 'react';
import SketchbookLayout from '../components/SketchbookLayout';
import GalleryPage from '../components/GalleryPage';
import ImageThumbnail from '../components/ImageThumbnail';
import ImageDetail from '../components/ImageDetail';
import TabNavigation from '../components/TabNavigation';
import FilterDividers from '../components/FilterDividers';
import LoadingSketch from '../components/LoadingSketch';
import PageTurn from '../components/PageTurn';
import { galleryImages, categories, GalleryImage } from '../data/galleryData';

export default function Gallery() {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('gallery');
  
  const tabs = [
    { id: 'gallery', label: 'Gallery' },
    { id: 'collections', label: 'Collections' },
    { id: 'about', label: 'About' }
  ];
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);
  
  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };
  
  const handleCloseDetail = () => {
    setSelectedImage(null);
  };
  
  const getRandomStyle = () => {
    const styles = ['tape', 'paperclip', 'corners'];
    const colors = ['blue', 'yellow', 'pink', 'green'];
    
    return {
      style: styles[Math.floor(Math.random() * styles.length)] as 'tape' | 'paperclip' | 'corners',
      tapeColor: colors[Math.floor(Math.random() * colors.length)] as 'blue' | 'yellow' | 'pink' | 'green'
    };
  };
  
  if (loading) {
    return (
      <SketchbookLayout>
        <div className="flex items-center justify-center h-[600px]">
          <LoadingSketch size="large" />
        </div>
      </SketchbookLayout>
    );
  }
  
  return (
    <SketchbookLayout>
      <div className="gallery-container">
        <div className="mb-6">
          <TabNavigation 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
        
        {activeTab === 'gallery' && (
          <>
            <h1 className="handwritten text-3xl mb-6">Sketchbook Gallery</h1>
            
            <FilterDividers 
              options={categories}
              selectedFilter={selectedCategory}
              onFilterChange={setSelectedCategory}
            />
            
            {selectedImage ? (
              <ImageDetail 
                {...selectedImage}
                onClose={handleCloseDetail}
              />
            ) : (
              <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredImages.map(image => {
                  const { style, tapeColor } = getRandomStyle();
                  return (
                    <ImageThumbnail 
                      key={image.id}
                      {...image}
                      onClick={() => handleImageClick(image)}
                      style={style}
                      tapeColor={tapeColor}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
        
        {activeTab === 'collections' && (
          <div className="collections-page">
            <h1 className="handwritten text-3xl mb-6">Collections</h1>
            <PageTurn>
              <div className="page-content paper-ruled p-6">
                <h2 className="handwritten text-2xl mb-4">Nature Collection</h2>
                <div className="grid grid-cols-2 gap-4">
                  {galleryImages
                    .filter(img => img.category === 'nature')
                    .map(image => {
                      const { style, tapeColor } = getRandomStyle();
                      return (
                        <ImageThumbnail 
                          key={image.id}
                          {...image}
                          onClick={() => handleImageClick(image)}
                          style={style}
                          tapeColor={tapeColor}
                        />
                      );
                    })}
                </div>
              </div>
              
              <div className="page-content paper-ruled p-6">
                <h2 className="handwritten text-2xl mb-4">Animals Collection</h2>
                <div className="grid grid-cols-2 gap-4">
                  {galleryImages
                    .filter(img => img.category === 'animals')
                    .map(image => {
                      const { style, tapeColor } = getRandomStyle();
                      return (
                        <ImageThumbnail 
                          key={image.id}
                          {...image}
                          onClick={() => handleImageClick(image)}
                          style={style}
                          tapeColor={tapeColor}
                        />
                      );
                    })}
                </div>
              </div>
              
              <div className="page-content paper-ruled p-6">
                <h2 className="handwritten text-2xl mb-4">Urban Collection</h2>
                <div className="grid grid-cols-2 gap-4">
                  {galleryImages
                    .filter(img => img.category === 'urban')
                    .map(image => {
                      const { style, tapeColor } = getRandomStyle();
                      return (
                        <ImageThumbnail 
                          key={image.id}
                          {...image}
                          onClick={() => handleImageClick(image)}
                          style={style}
                          tapeColor={tapeColor}
                        />
                      );
                    })}
                </div>
              </div>
              
              <div className="page-content paper-ruled p-6">
                <h2 className="handwritten text-2xl mb-4">Art Collection</h2>
                <div className="grid grid-cols-2 gap-4">
                  {galleryImages
                    .filter(img => img.category === 'art')
                    .map(image => {
                      const { style, tapeColor } = getRandomStyle();
                      return (
                        <ImageThumbnail 
                          key={image.id}
                          {...image}
                          onClick={() => handleImageClick(image)}
                          style={style}
                          tapeColor={tapeColor}
                        />
                      );
                    })}
                </div>
              </div>
            </PageTurn>
          </div>
        )}
        
        {activeTab === 'about' && (
          <div className="about-page paper-ruled p-6">
            <h1 className="handwritten text-3xl mb-6">About This Gallery</h1>
            <p className="handwritten mb-4">
              Welcome to my sketchbook gallery! This is a collection of photographs and artwork 
              presented in a skeuomorphic sketchbook style. The design is inspired by traditional 
              artist portfolios and sketchbooks, with realistic paper textures, handwritten notes, 
              and physical elements like washi tape and paper clips.
            </p>
            <p className="handwritten mb-4">
              Browse through the collections by flipping pages, or use the tabs at the top to 
              navigate between different sections. You can filter images by category using the 
              dividers on the gallery page.
            </p>
            <p className="handwritten mb-4">
              Click on any image to see it in detail, along with additional information and notes.
            </p>
            <div className="signature handwritten text-2xl mt-8">
              - The Artist
            </div>
          </div>
        )}
      </div>
    </SketchbookLayout>
  );
}
