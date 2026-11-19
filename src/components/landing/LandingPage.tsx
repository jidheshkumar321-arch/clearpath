import React from 'react';
import { Hero } from './Hero';
import { ProblemSection } from './ProblemSection';
import { HowItWorks } from './HowItWorks';
import { FeaturesGrid } from './FeaturesGrid';
import { AudienceSection } from './AudienceSection';
import { SecurityPrivacy } from './SecurityPrivacy';
import { FaqSection } from './FaqSection';
import { Footer } from './Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <FeaturesGrid />
      <AudienceSection />
      <SecurityPrivacy />
      <FaqSection />
      <Footer />
    </div>
  );
};
