import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';

const partners = [
  { name: 'Africa Re', abbr: 'AR', color: '#1e3a5f' },
  { name: 'Continental Re', abbr: 'CR', color: '#0F766E' },
  { name: 'NCARE', abbr: 'NC', color: '#7c3aed' },
  { name: 'CICARE', abbr: 'CI', color: '#b45309' },
  { name: 'CICA-RE', abbr: 'CA', color: '#0369a1' },
  { name: 'SEN-RE', abbr: 'SR', color: '#166534' },
];

const PartnerLogo: React.FC<{ name: string; abbr: string; color: string }> = ({ name, abbr, color }) => (
  <div className="flex flex-col items-center justify-center gap-3 px-10 py-8 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/40 hover:border-jackson-deep/20 dark:hover:border-jackson-vivid/30 hover:shadow-card transition-all duration-300 group cursor-default shrink-0">
    <div
      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-display font-bold text-xl shadow-sm group-hover:scale-110 transition-transform duration-300"
      style={{ backgroundColor: color }}
    >
      {abbr}
    </div>
    <span className="text-sm font-semibold text-slate-600 dark:text-white/70 whitespace-nowrap">{name}</span>
  </div>
);

const PartnersSection: React.FC = () => {
  return (
    <section id="partenaires" className="section-padding bg-white dark:bg-jackson-night overflow-hidden">
      <div className="section-container">
        <div className="section-inner">
          <ScrollReveal className="text-center mb-16">
            <span className="section-badge mb-4">Nos Partenaires</span>
            <h2 className="section-title mb-4">
              Des réassureurs de confiance
            </h2>
            <p className="section-subtitle mx-auto">
              Jackson Assurances s'appuie sur un réseau solide de réassureurs internationaux pour vous offrir des garanties robustes.
            </p>
          </ScrollReveal>

          {/* Partner logos grid */}
          <ScrollReveal delay={150}>
            <div className="flex flex-wrap justify-center gap-6">
              {partners.map((p) => (
                <PartnerLogo key={p.name} {...p} />
              ))}
            </div>
          </ScrollReveal>

          {/* Trust statement */}
          <ScrollReveal delay={300}>
            <div className="mt-16 text-center p-8 rounded-2xl bg-jackson-cream dark:bg-slate-800/40 border border-jackson-deep/10 dark:border-jackson-vivid/10 max-w-2xl mx-auto">
              <p className="text-slate-700 dark:text-white/80 leading-relaxed">
                <span className="font-semibold text-jackson-deep dark:text-jackson-vivid">Agréée par le Ministère chargé des Finances du Burkina Faso,</span>{' '}
                Jackson Assurances opère sous le contrôle de la CRCA-UMOA et respecte les normes du Traité CIMA.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
