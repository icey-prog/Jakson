import React, { useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';
import { useAuroraCanvas } from '@/hooks/useAuroraCanvas';
import QuoteForm from '@/components/formulaire/QuoteForm';
import CallbackCard from '@/components/formulaire/CallbackCard';

const FormulaireSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useAuroraCanvas(canvasRef);

  return (
    <section
      id="formulaire"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: '#020d0b' }}
    >
      {/* Aurora animation layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full pointer-events-none opacity-75"
      />

      {/* Brand tint overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 60% at 8% 55%, rgba(15,118,110,0.22), transparent)' }} />
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 40% 30% at 50% 0%, rgba(20,184,166,0.07), transparent)' }} />

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
