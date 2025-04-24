import React from 'react';
import HeroSection from '../components/home/HeroSection';
import BrandSection from '../components/home/BrandSection';
import ReviewSection from '../components/home/ReviewSection';
import ComparisonSection from '../components/home/ComparisonSection';
import GuidesSection from '../components/home/GuidesSection';
import TestimonialSection from '../components/home/TestimonialSection';
import NewsletterSection from '../components/home/NewsletterSection';

const Home: React.FC = () => {
  const handleSearch = (brand: string, model: string) => {
        // TODO: Implement search functionality
    console.log('Searching for:', brand, model);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeroSection onSearch={handleSearch} />
      <BrandSection />
      <ReviewSection />
      <ComparisonSection />
      <GuidesSection />
      <TestimonialSection />
      <NewsletterSection />
        </div>
    );
};

export default Home;