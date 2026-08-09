import React, { useRef } from 'react';
import { Link } from 'react-router';
import ScrollReveal from '@/components/ScrollReveal';
import { useAuroraCanvas } from '@/hooks/useAuroraCanvas';

const CTAFinalSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useAuroraCanvas(canvasRef);

  return (
    <section
      className="relative section-padding overflow-hidden"
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

      <div className="relative z-10 max-w-[800px] mx-auto px-6 lg:px-[5vw] text-center">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-white text-[12px] font-normal tracking-[-0.12px] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot" />
            Agréée · CIMA · Burkina Faso
          </span>
          <h2 className="font-display font-semibold text-white mb-6 leading-[1.07] tracking-[-0.28px]"
            style={{ fontSize: 'clamp(2rem, 5vw, 40px)' }}>
            Un sinistre, un projet, une question.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <p className="text-[17px] text-white/75 leading-[1.47] tracking-[-0.374px] mb-10 max-w-[560px] mx-auto">
            Joignez votre conseiller Jackson par téléphone ou en agence.
            Devis gratuit, réponse sous 24h, prise en charge rapide.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/devis"
              className="inline-flex items-center justify-center px-[22px] py-[11px] bg-white text-apple-ink text-[17px] font-normal tracking-[-0.374px] rounded-full hover:bg-apple-parchment active:scale-95 transition-all duration-150 cursor-pointer"
            >
              Demander un devis
            </Link>
            <a
              href="tel:+22625380200"
              className="inline-flex items-center justify-center px-[22px] py-[11px] bg-transparent border border-white/30 hover:border-white/60 text-white text-[17px] font-normal tracking-[-0.374px] rounded-full transition-all duration-150 cursor-pointer"
            >
              Appeler un conseiller
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={450}>
          <p className="text-[12px] text-white/50 tracking-[-0.12px] mt-6">
            Lun-Ven 7h30-16h30 · Sam 8h-12h — Patte d'Oie (Ouaga) & Bobo-Dioulasso.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTAFinalSection;
