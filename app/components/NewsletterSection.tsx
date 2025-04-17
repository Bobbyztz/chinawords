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

  // Get accent color based on background style for title and button
  let accentColor = '';

  switch (backgroundStyle) {
    case 'leaf':
      accentColor = 'text-[#2E8B57]'; // Jade green
      break;
    case 'water':
      accentColor = 'text-[#5a8aa8]'; // Water blue
      break;
    case 'earth':
      accentColor = 'text-[#775c41]'; // Earth brown
      break;
    default:
      accentColor = 'text-[#2E8B57]'; // Jade green
  }

  return (
    <section className="pt-14 pb-20 bg-white relative overflow-hidden border-t border-gray-100">
      {/* Linear background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="absolute top-0 left-8 w-[1px] h-full bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>
        <div className="absolute top-0 right-8 w-[1px] h-full bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center border border-gray-100 rounded-lg shadow-sm p-8 bg-white relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#2E8B57] rounded-t-lg"></div>
          <h2 className={`text-2xl md:text-2xl font-bold mt-3 mb-6 font-serif-sc ${accentColor}`}>{title}</h2>
          <p className="text-gray-700 mb-8 text-sm font-sans-sc">{subtitle}</p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="您的邮箱地址"
                  required
                  className="flex-grow px-4 py-3 rounded-md border border-gray-300 text-dark-gray focus:outline-none focus:ring-2 focus:ring-jade-green/50 focus:border-jade-green font-sans-sc shadow-sm"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center font-sans-sc bg-[#2E8B57] text-white hover:bg-[#267349] shadow-sm`}
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
              <p className="text-gray-500 text-sm mt-3 font-sans-sc">
                我们尊重您的隐私，您可以随时取消订阅。
              </p>
            </form>
          ) : (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#2E8B57]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#2E8B57]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-serif-sc text-gray-800">感谢您的订阅！</h3>
              <p className="text-gray-600 font-sans-sc">
                您已成功订阅我们的通讯。我们将定期为您发送中国文化与生活方式的最新资讯。
              </p>
            </div>
          )}
        </div>
      </div>


    </section>
  );
};

export default NewsletterSection;
