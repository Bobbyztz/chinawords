'use client';

import React, { useState } from 'react';

interface ChinawordsNewsletterSectionProps {
  title: string;
  subtitle: string;
}

const ChinawordsNewsletterSection: React.FC<ChinawordsNewsletterSectionProps> = ({
  title,
  subtitle
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

  return (
    <section className="py-16 bg-film-red relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-porcelain-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif-sc">{title}</h2>
          <p className="text-porcelain-white/80 mb-8 text-lg font-sans-sc">{subtitle}</p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="您的邮箱地址"
                  required
                  className="flex-grow px-4 py-3 rounded-md text-dark-gray focus:outline-none focus:ring-2 focus:ring-jade-green/50 font-sans-sc"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary bg-jade-green hover:bg-jade-green/90 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center font-sans-sc"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    '订阅'
                  )}
                </button>
              </div>
              <p className="text-porcelain-white/60 text-sm mt-3 font-sans-sc">
                我们尊重您的隐私，您可以随时取消订阅。
              </p>
            </form>
          ) : (
            <div className="bg-porcelain-white/10 rounded-lg p-6 backdrop-blur-sm border border-porcelain-white/20 max-w-md mx-auto">
              <svg className="w-12 h-12 text-porcelain-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2 font-serif-sc">感谢您的订阅！</h3>
              <p className="text-porcelain-white/80 font-sans-sc">
                您已成功订阅我们的通讯。我们将定期为您发送中国文化与生活方式的最新资讯。
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChinawordsNewsletterSection;
