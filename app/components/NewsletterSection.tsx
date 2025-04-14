'use client';

import React, { useState } from 'react';

interface NewsletterSectionProps {
  title: string;
  subtitle: string;
  backgroundStyle?: 'leaf' | 'water' | 'earth' | 'none';
}

const NewsletterSection: React.FC<NewsletterSectionProps> = ({
  title,
  subtitle,
  backgroundStyle = 'leaf'
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1500);
  };

  let bgClass = '';
  
  switch (backgroundStyle) {
    case 'leaf':
      bgClass = 'bg-leaf-green';
      break;
    case 'water':
      bgClass = 'bg-water-blue';
      break;
    case 'earth':
      bgClass = 'bg-earth-brown';
      break;
    default:
      bgClass = 'bg-leaf-green';
  }

  return (
    <section className={`py-16 ${bgClass} relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-drift opacity-10"
            style={{
              left: `-100px`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${60 + Math.random() * 40}s`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          >
            <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 50C20 36.19 31.19 25 45 25H155C168.81 25 180 36.19 180 50C180 63.81 168.81 75 155 75H45C31.19 75 20 63.81 20 50Z" fill="white" />
            </svg>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-white/80 mb-8 text-lg">{subtitle}</p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-grow px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-organic bg-white text-leaf-green hover:bg-white/90 px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
              <p className="text-white/60 text-sm mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          ) : (
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/20 max-w-md mx-auto">
              <svg className="w-12 h-12 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Thank You for Subscribing!</h3>
              <p className="text-white/80">
                You've successfully joined our newsletter. We'll keep you updated with our latest environmental initiatives and community events.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Organic shape divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[70px]"
          style={{ fill: 'white' }}
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
          />
        </svg>
      </div>
    </section>
  );
};

export default NewsletterSection;
