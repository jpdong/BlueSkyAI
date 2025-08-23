import React from 'react';
import Header from './GTA/Header';
import HeroSection from './GTA/HeroSection';
import ConverterSection from './GTA/ConverterSection';
import GallerySection from './GTA/GallerySection';
import StatisticsSection from './GTA/StatisticsSection';
import PricingSection from './GTA/PricingSection';
import FAQSection from './GTA/FAQSection';
import FinalCTASection from './GTA/FinalCTASection';
import GTAFooter from './GTA/GTAFooter';

const GTAHomepage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Header />
      
      <main className="pt-16">
        <HeroSection />
        <ConverterSection />
        <GallerySection />
        <StatisticsSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <GTAFooter />
    </div>
  );
};

export default GTAHomepage;