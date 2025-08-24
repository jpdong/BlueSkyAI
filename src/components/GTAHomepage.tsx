'use client';
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
import { useCommonContext } from '~/context/common-context';
import LoadingModal from './LoadingModal';
import GeneratingModal from './GeneratingModal';
import LoginModal from './LoginModal';
import LogoutModal from './LogoutModal';
import PricingModal from './PricingModal';

const GTAHomepage = ({ locale = 'en' }) => {
  const {
    commonText,
    authText
  } = useCommonContext();
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Modals */}
      <LoadingModal loadingText={commonText?.loadingText || 'Loading...'} />
      <GeneratingModal generatingText={commonText?.generateText || 'Generating...'} />
      <LoginModal
        loadingText={commonText?.loadingText || 'Loading...'}
        redirectPath="/"
        loginModalDesc={authText?.loginModalDesc || 'Please log in to continue'}
        loginModalButtonText={authText?.loginModalButtonText || 'Log in with Google'}
      />
      <LogoutModal
        logoutModalDesc={authText?.logoutModalDesc || 'Are you sure you want to log out?'}
        confirmButtonText={authText?.confirmButtonText || 'Confirm'}
        cancelButtonText={authText?.cancelButtonText || 'Cancel'}
        redirectPath="/"
      />
      <PricingModal locale={locale} page="" />

      <Header locale={locale} />
      
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