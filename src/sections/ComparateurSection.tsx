import React, { useState } from 'react';
import { Check, CheckCircle2, Star, Phone, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import ScrollReveal from '@/components/ScrollReveal';
import { useAnimeReveal } from '@/hooks/useAnimeReveal';

/* ── Data ── */
const essentielFeatures = [
  'Responsabilité Civile obligatoire',
  'Assistance téléphonique 8h–18h',
  'Indemnisation standard',
  'Déclaration de sinistre en ligne',
  'Support par email sous 48h',
];

const confortFeatures = [
  'Tout le plan Essentiel',
  'Protection juridique incluse',
  'Dommages tous accidents',
  'Assistance 24h/7j partout en Afrique',
  'Conseiller dédié attitré',
  'Véhicule de remplacement',
];

const premiumFeatures = [
  'Tout le plan Confort',
  'Valeur à neuf jusqu\'à 24 mois',
  'Franchise réduite ou zéro',
  'Assistance internationale tous pays',
  'Support prioritaire SLA garanti',
  'Solutions sur mesure & multi-risques',
];

/* ── Sub-components ── */
const FeatureItem: React.FC<{ text: string; variant?: 'default' | 'featured' }> = ({ text, variant = 'default' }) => (
  <li className="flex items-start gap-2.5">
    {variant === 'featured'
      ? <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-apple-blue-dark" />
      : <Check size={15} className="shrink-0 mt-0.5 text-white/50" />
    }
    <span>{text}</span>
  </li>
);

/* ── Main ── */
const ComparateurSection: React.FC = () => {
  const [annual, setAnnual] = useState(true);
  const cardsRef = useAnimeReveal<HTMLDivElement>({ selector: '[data-card]', stagger: 120, translateY: 40 });

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#formulaire')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="comparateur" className="relative overflow-hidden py-24 md:py-32 tile-dark">

      {/* Subtle top radial (conservé) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,255,255,0.03),transparent_60%)]" />
      {/* Brand orb (conservé) */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(15,118,110,0.10), transparent 70%)', filter: 'blur(80px)' }} />

      <div className="relative z-10 section-container">
        <div className="section-inner">

          {/* Header */}
          <ScrollReveal className="text-center mb-12">
            <span className="section-badge mb-4">Tarifs</span>
            <h2 className="section-title text-white mb-4">Trois formules, zéro automatisation.</h2>
            <p className="section-subtitle text-white/60 mx-auto">
              Chaque formule inclut un conseiller humain dédié — pas un chatbot, pas un formulaire laissé sans réponse.
            </p>

            {/* Toggle mensuel / annuel */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <span className={`text-sm transition-colors ${!annual ? 'text-white' : 'text-white/50'}`}>Mensuel</span>
              <button
                onClick={() => setAnnual(a => !a)}
                className="relative inline-flex h-8 w-16 items-center rounded-full bg-white/10 p-1 ring-1 ring-white/15 transition cursor-pointer"
                aria-label="Basculer tarif annuel/mensuel"
              >
                <span
                  className="inline-flex h-6 w-6 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition-transform duration-300 will-change-transform"
                  style={{ transform: annual ? 'translateX(32px)' : 'translateX(0)' }}
                />
              </button>
              <span className={`text-sm transition-colors ${annual ? 'text-white' : 'text-white/50'}`}>
                Annuel
                <span className="ml-2 inline-flex items-center rounded-full bg-apple-blue/20 px-2 py-0.5 text-[10px] text-apple-blue-dark ring-1 ring-apple-blue/25">
                  Économisez 10%
                </span>
              </span>
            </div>
          </ScrollReveal>

          {/* Cards grid */}
          <div ref={cardsRef} className="grid gap-6 lg:grid-cols-3">

            {/* ── Essentiel ── */}
            <div data-card>
              <div className="border border-white/10 rounded-[18px] p-6 backdrop-blur-xl h-full flex flex-col transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.06)]">
                <div>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-white/50 font-semibold">Essentiel</p>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-[40px] font-semibold tracking-[-0.28px] text-white">
                      {annual ? '13 500' : '15 000'}
                    </span>
                    <span className="text-[14px] text-white/45 mb-1 tracking-[-0.224px]">FCFA/mois</span>
                  </div>
                  {annual && (
                    <p className="text-[12px] text-white/35 mt-1">Soit 162 000 FCFA/an</p>
                  )}
                </div>

                <a href="#formulaire" onClick={scrollToForm}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-[11px] text-[17px] font-normal tracking-[-0.374px] text-apple-ink hover:bg-apple-parchment transition cursor-pointer active:scale-95">
                  Demander un devis
                </a>

                <ul className="mt-6 space-y-3 text-[14px] text-white/65 tracking-[-0.224px] flex-1">
                  {essentielFeatures.map(f => <FeatureItem key={f} text={f} />)}
                </ul>
              </div>
            </div>

            {/* ── Confort (featured) ── */}
            <div data-card>
              <div className="border border-apple-blue/30 ring-1 ring-apple-blue/20 rounded-[18px] p-2 relative backdrop-blur-xl h-full flex flex-col transition-shadow duration-300 hover:shadow-[0_0_60px_rgba(44,194,149,0.15)]">
                <div className="relative overflow-hidden rounded-[14px] bg-gradient-to-b from-white/[0.06] to-transparent flex-1 flex flex-col">

                  {/* Hero gradient top (conservé) */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="h-44 w-full rounded-t-[14px] overflow-hidden">
                      <div className="w-full h-full"
                        style={{
                          background: 'linear-gradient(135deg, #0F766E 0%, #2CC295 50%, #0D5F58 100%)',
                          opacity: 0.60,
                        }} />
                    </div>
                    <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_0%,rgba(44,194,149,0.25),transparent_60%)]" />
                  </div>

                  <div className="relative p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[12px] uppercase tracking-[0.18em] text-white/70 font-semibold">Confort</p>
                        <div className="mt-3 flex items-end gap-2">
                          <span className="text-[40px] font-semibold tracking-[-0.28px] text-white">
                            {annual ? '31 500' : '35 000'}
                          </span>
                          <span className="text-[14px] text-white/55 mb-1 tracking-[-0.224px]">FCFA/mois</span>
                        </div>
                        {annual && (
                          <p className="text-[12px] text-white/40 mt-1">Soit 378 000 FCFA/an</p>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-apple-blue/20 px-2.5 py-1 text-[10px] font-semibold text-apple-blue-dark ring-1 ring-apple-blue/30 shrink-0 mt-1">
                        <Star size={10} fill="currentColor" /> Recommandé
                      </span>
                    </div>

                    <a href="#formulaire" onClick={scrollToForm}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-[11px] text-[17px] font-normal tracking-[-0.374px] text-white transition cursor-pointer bg-apple-blue hover:bg-apple-blue-focus active:scale-95">
                      <Sparkles size={14} /> Choisir Confort
                    </a>

                    <ul className="mt-6 space-y-3 text-[14px] text-white/80 tracking-[-0.224px] flex-1">
                      {confortFeatures.map(f => <FeatureItem key={f} text={f} variant="featured" />)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Premium ── */}
            <div data-card>
              <div className="border border-white/10 ring-1 ring-apple-blue/10 rounded-[18px] p-6 backdrop-blur-xl h-full flex flex-col transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                <div>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-white/50 font-semibold">Premium</p>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-[40px] font-semibold tracking-[-0.28px] text-gradient-gold">
                      Sur devis
                    </span>
                  </div>
                  <p className="text-[12px] text-white/35 mt-1">Tarification personnalisée</p>
                </div>

                <a href="#formulaire" onClick={scrollToForm}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-apple-blue-dark/40 bg-apple-blue-dark/10 px-4 py-[11px] text-[17px] font-normal tracking-[-0.374px] text-apple-blue-dark hover:bg-apple-blue-dark/20 transition cursor-pointer active:scale-95">
                  <Phone size={14} /> Contacter un conseiller
                </a>

                <ul className="mt-6 space-y-3 text-[14px] text-white/65 tracking-[-0.224px] flex-1">
                  {premiumFeatures.map(f => <FeatureItem key={f} text={f} />)}
                </ul>
              </div>
            </div>

          </div>

          {/* Footer note + CTA */}
          <ScrollReveal className="text-center mt-8" delay={300}>
            <p className="text-[12px] text-white/35 mb-6">
              Tous les tarifs sont indicatifs · Devis gratuit et sans engagement · Paiement mensuel ou annuel
            </p>
            <p className="text-[17px] text-white/60 tracking-[-0.374px] mb-5">
              Besoin d'aide pour choisir ? Un vrai conseiller — pas un chatbot — vous guide gratuitement.
            </p>
            <Link to="/services"
              className="btn-text-link-dark inline-flex items-center gap-1.5 text-[17px]">
              Voir toutes nos garanties détaillées →
            </Link>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default ComparateurSection;
