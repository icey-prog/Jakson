import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import AmbientOrb from '@/components/AmbientOrb';

const CTAFinalSection: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#formulaire')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative section-padding bg-jackson-deep overflow-hidden">
      <AmbientOrb size={500} opacity={0.25} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-[800px] mx-auto px-6 lg:px-[5vw] text-center">
        <ScrollReveal>
          <h2 className="section-title text-white mb-6">
            Prêt à protéger votre avenir ?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <p className="section-subtitle text-white/80 mb-10 mx-auto">
            Rejoignez les 50 000 familles qui nous font confiance. Votre devis gratuit et sans
            engagement vous attend.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <a
            href="#formulaire"
            onClick={handleClick}
            className="inline-block px-10 py-4 bg-white text-jackson-deep font-semibold text-lg rounded-btn hover:bg-jackson-light hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(255,255,255,0.2)] transition-all duration-250 cursor-pointer"
          >
            Obtenir mon devis maintenant
          </a>
        </ScrollReveal>

        <ScrollReveal delay={450}>
          <p className="text-sm text-white/60 mt-5">
            Ou appelez-nous au{' '}
            <a href="tel:0123456789" className="text-white font-medium hover:underline">
              01 23 45 67 89
            </a>{' '}
            — Lun-Ven, 8h30-18h30
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTAFinalSection;
