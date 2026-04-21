import React, { useState } from 'react';
import { Check, CheckCircle2, Star, Phone, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';

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
      ? <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-jackson-vivid" />
      : <Check size={15} className="shrink-0 mt-0.5 text-emerald-400" />
    }
    <span>{text}</span>
  </li>
);

/* ── Main ── */
const ComparateurSection: React.FC = () => {
  const [annual, setAnnual] = useState(true);

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#formulaire')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="comparateur" className="relative overflow-hidden py-24 md:py-32 bg-jackson-night">

      {/* Subtle top radial */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,255,255,0.04),transparent_60%)]" />
      {/* Brand orb */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(15,118,110,0.12), transparent 70%)', filter: 'blur(80px)' }} />

      <div className="relative z-10 section-container">
        <div className="section-inner">

          {/* Header */}
          <ScrollReveal className="text-center mb-12">
            <SectionLabel className="mb-4">Tarifs</SectionLabel>
            <h2 className="section-title text-white mb-4">Comparez Nos Formules</h2>
            <p className="section-subtitle text-white/60 mx-auto">
              Trois niveaux de protection pour s&apos;adapter à votre budget et vos besoins.
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
                <span className="ml-2 inline-flex items-center rounded-full bg-jackson-vivid/15 px-2 py-0.5 text-[10px] text-jackson-vivid ring-1 ring-jackson-vivid/25">
                  Économisez 10%
                </span>
              </span>
            </div>
          </ScrollReveal>

          {/* Cards grid */}
          <div className="grid gap-6 lg:grid-cols-3">

            {/* ── Essentiel ── */}
            <ScrollReveal delay={80}>
              <div className="border border-white/10 rounded-3xl p-6 backdrop-blur-xl h-full flex flex-col">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/50 font-semibold">Essentiel</p>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-4xl font-semibold tracking-tight text-white">
                      {annual ? '13 500' : '15 000'}
                    </span>
                    <span className="text-sm text-white/45 mb-1">FCFA/mois</span>
                  </div>
                  {annual && (
                    <p className="text-xs text-white/35 mt-1">Soit 162 000 FCFA/an</p>
                  )}
                </div>

                <a href="#formulaire" onClick={scrollToForm}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold tracking-tight text-jackson-night hover:bg-white/90 transition cursor-pointer">
                  Demander un devis
                </a>

                <ul className="mt-6 space-y-3 text-sm text-white/65 flex-1">
                  {essentielFeatures.map(f => <FeatureItem key={f} text={f} />)}
                </ul>
              </div>
            </ScrollReveal>

            {/* ── Confort (featured) ── */}
            <ScrollReveal delay={160}>
              <div className="border border-white/10 ring-1 ring-jackson-vivid/20 rounded-3xl p-2 relative backdrop-blur-xl h-full flex flex-col">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent flex-1 flex flex-col">

                  {/* Hero gradient top */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="h-44 w-full rounded-t-2xl overflow-hidden">
                      <div className="w-full h-full"
                        style={{
                          background: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 50%, #0D9488 100%)',
                          opacity: 0.65,
                        }} />
                    </div>
                    {/* Pattern overlay */}
                    <div className="absolute top-0 inset-x-0 h-44"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }} />
                    <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_0%,rgba(20,184,166,0.3),transparent_60%)]" />
                  </div>

                  <div className="relative p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-white/70 font-semibold">Confort</p>
                        <div className="mt-3 flex items-end gap-2">
                          <span className="text-4xl font-semibold tracking-tight text-white">
                            {annual ? '31 500' : '35 000'}
                          </span>
                          <span className="text-sm text-white/55 mb-1">FCFA/mois</span>
                        </div>
                        {annual && (
                          <p className="text-xs text-white/40 mt-1">Soit 378 000 FCFA/an</p>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-jackson-vivid/20 px-2.5 py-1 text-[10px] font-semibold text-jackson-vivid ring-1 ring-jackson-vivid/30 shrink-0 mt-1">
                        <Star size={10} fill="currentColor" /> Recommandé
                      </span>
                    </div>

                    <a href="#formulaire" onClick={scrollToForm}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold tracking-tight text-white transition cursor-pointer shadow-[0_10px_30px_rgba(15,118,110,0.35)] hover:shadow-[0_10px_30px_rgba(20,184,166,0.45)]"
                      style={{ background: 'linear-gradient(to bottom, #14B8A6, #0F766E)' }}>
                      <Sparkles size={14} /> Choisir Confort
                    </a>

                    <ul className="mt-6 space-y-3 text-sm text-white/80 flex-1">
                      {confortFeatures.map(f => <FeatureItem key={f} text={f} variant="featured" />)}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* ── Premium ── */}
            <ScrollReveal delay={240}>
              <div className="border border-white/10 ring-1 ring-jackson-gold/10 rounded-3xl p-6 backdrop-blur-xl h-full flex flex-col">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/50 font-semibold">Premium</p>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-4xl font-semibold tracking-tight text-gradient-gold">
                      Sur devis
                    </span>
                  </div>
                  <p className="text-xs text-white/35 mt-1">Tarification personnalisée</p>
                </div>

                <a href="#formulaire" onClick={scrollToForm}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-jackson-gold/30 bg-jackson-gold/10 px-4 py-3 text-sm font-semibold tracking-tight text-jackson-gold hover:bg-jackson-gold/20 transition cursor-pointer">
                  <Phone size={14} /> Contacter un conseiller
                </a>

                <ul className="mt-6 space-y-3 text-sm text-white/65 flex-1">
                  {premiumFeatures.map(f => <FeatureItem key={f} text={f} />)}
                </ul>
              </div>
            </ScrollReveal>

          </div>

          {/* Footer note + CTA */}
          <ScrollReveal className="text-center mt-8" delay={300}>
            <p className="text-xs text-white/35 mb-6">
              Tous les tarifs sont indicatifs · Devis gratuit et sans engagement · Paiement mensuel ou annuel
            </p>
            <p className="text-base text-white/60 mb-5">
              Besoin d&apos;aide pour choisir ? Nos conseillers vous guident gratuitement.
            </p>
            <Link to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-jackson-vivid hover:text-white border border-jackson-vivid/30 hover:border-white/20 px-5 py-2.5 rounded-xl transition-all duration-200 bg-jackson-vivid/5 hover:bg-white/5">
              Voir toutes nos garanties détaillées →
            </Link>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default ComparateurSection;
