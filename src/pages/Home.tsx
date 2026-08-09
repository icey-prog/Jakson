import React, { Suspense, lazy } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SOSButton from '@/components/SOSButton';
import HeroSection from '@/sections/HeroSection';

const ProfileSimulator = lazy(() => import('@/sections/ProfileSimulator'));
const ServicesSection = lazy(() => import('@/sections/ServicesSection'));
const ComparateurSection = lazy(() => import('@/sections/ComparateurSection'));
const ReassuranceSection = lazy(() => import('@/sections/ReassuranceSection'));
const PartnersSection = lazy(() => import('@/sections/PartnersSection'));
const CTAFinalSection = lazy(() => import('@/sections/CTAFinalSection'));

const Fallback = () => <div className="h-40 bg-jackson-cream dark:bg-jackson-night animate-pulse" />;

const Home: React.FC = () => {
  return (
    <>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <HeroSection />
          <Suspense fallback={<Fallback />}>
            <ProfileSimulator />
            <ServicesSection />
            <ComparateurSection />
            <ReassuranceSection />
            <PartnersSection />
            {/* Le formulaire vit désormais sur /devis — tunnel unique, plus de doublon. */}
            <CTAFinalSection />
          </Suspense>
        </main>
        <Footer />
        <SOSButton />
      </div>
    </>
  );
};

export default Home;
