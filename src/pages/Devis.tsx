import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SOSButton from '@/components/SOSButton';
import FormulaireSection from '@/sections/FormulaireSection';

/** Tunnel unique : calcul du prix puis demande de devis, en 4 étapes. */
const DevisPage: React.FC = () => (
  <div className="min-h-screen bg-jackson-cream dark:bg-jackson-night">
    <Navigation />
    <main className="pt-24">
      <FormulaireSection />
    </main>
    <Footer />
    <SOSButton />
  </div>
);

export default DevisPage;
