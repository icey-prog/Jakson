import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';
import AmbientOrb from '@/components/AmbientOrb';
import QuoteForm from '@/components/formulaire/QuoteForm';
import CallbackCard from '@/components/formulaire/CallbackCard';

const FormulaireSection: React.FC = () => {
  return (
    <section
      id="formulaire"
      className="relative overflow-hidden py-24 md:py-32 bg-jackson-deep"
    >
      <AmbientOrb size={500} opacity={0.25} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 section-container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left: form */}
          <div className="lg:col-span-3">
            <ScrollReveal className="mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 border border-white/15 text-white/80 mb-4">
                Devis Express
              </span>
              <TextReveal
                text="Obtenez Votre Devis Gratuit"
                className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
                as="h2"
              />
              <p className="text-base text-white/60 max-w-md leading-relaxed">
                Remplissez ce formulaire en 2 minutes et recevez votre devis personnalisé sous 24h.
              </p>
            </ScrollReveal>

            <QuoteForm />
          </div>

          {/* Right: callback + trust */}
          <div className="lg:col-span-2">
            <CallbackCard />
          </div>

        </div>
      </div>
    </section>
  );
};

export default FormulaireSection;
