import React from 'react';
import HeroSection from '@/components/InfoSections/HeroSection';
import ImageGrid from '@/components/InfoSections/ImageGrid';
import MissionSection from '@/components/InfoSections/MissionSection';

const Info: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-gray-900 font-Inter">
        <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-10 md:py-12 space-y-12 sm:space-y-16 md:space-y-20">
          <HeroSection />
          <ImageGrid />
          <MissionSection />
        </main>
      </div>
    </>
  );
};

export default Info;
