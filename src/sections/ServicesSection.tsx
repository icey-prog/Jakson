import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, Car, Bike, Flame, HeartPulse, Home, Scale, HardHat, Truck, Hammer, Plane, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router';

/* ── Data ─────────────────────────────────────────────── */

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  tag?: string;
  bgLight: string;
  bgDark: string;
  iconBg: string;
  /** Longue description pour panneau droite */
  longDescription?: string;
  /** Bullet points pour panneau droite */
  highlights?: string[];
  /** Tarif indicatif */
  priceFrom?: string;
}

export const ALL_SERVICES: ServiceItem[] = [
  {
    icon: Car,
    title: 'Jackson Auto Secur',
    description: 'Formule automobile complète pour tous véhicules, options adaptées à votre budget.',
    tag: 'Populaire',
    bgLight: '#e2f6d5', bgDark: '#163300', iconBg: '#0F766E',
    longDescription:
      "Couverture complète de votre véhicule : responsabilité civile obligatoire, vol, incendie, bris de glace et dommages tous accidents. Adaptable selon l'usage personnel ou professionnel.",
    highlights: [
      'RC obligatoire incluse',
      'Vol & incendie en option',
      'Assistance 24h/7j Burkina',
      'Indemnisation sous 48h',
    ],
    priceFrom: 'Dès 15 000 FCFA/mois',
  },
  {
    icon: Bike,
    title: 'Jackson Moto Secur',
    description: 'Protection optimale pour vos deux-roues, sérénité lors de tous vos déplacements.',
    bgLight: '#ffebcc', bgDark: '#663c00', iconBg: '#2CC295',
    longDescription:
      "Conçue pour motos, scooters et tricycles. Protège contre les dommages corporels du conducteur, le vol et les sinistres matériels. Démarches simplifiées pour les jeunes conducteurs.",
    highlights: [
      'Couverture conducteur',
      'Vol & casse au choix',
      'Tarif jeune permis adapté',
      'Devis en moins de 24h',
    ],
    priceFrom: 'Dès 8 000 FCFA/mois',
  },
  {
    icon: HeartPulse,
    title: 'Individuelle Accident',
    description: 'Protection face aux conséquences des accidents corporels de la vie privée.',
    bgLight: '#e5f0ff', bgDark: '#002266', iconBg: '#03624C',
    longDescription:
      "Indemnise les frais médicaux, l'invalidité ou le décès suite à un accident — domestique, sportif, sur la voie publique. Pour vous et vos proches, partout au Burkina.",
    highlights: [
      'Frais médicaux pris en charge',
      'Capital invalidité ou décès',
      'Famille entière couverte',
      'Activation rapide en 24h',
    ],
    priceFrom: 'Dès 3 500 FCFA/mois',
  },
  {
    icon: Home,
    title: 'Multirisque Habitation',
    description: 'Couvrez votre habitation contre incendie, vol, dégâts des eaux et plus encore.',
    bgLight: '#f0e5ff', bgDark: '#330066', iconBg: '#134E4A',
    longDescription:
      "Votre maison ou appartement protégé contre les principaux risques : incendie, dégâts des eaux, vol, vandalisme, catastrophes naturelles. Mobilier et responsabilité civile vie privée inclus.",
    highlights: [
      'Incendie, vol, dégâts eaux',
      'Mobilier & électroménager',
      'RC vie privée incluse',
      'Expertise sur place rapide',
    ],
    priceFrom: 'Dès 12 000 FCFA/mois',
  },
  {
    icon: Flame,
    title: 'Assurance Incendie',
    description: "Couvre vos biens immobiliers et professionnels contre les risques d'incendie.",
    bgLight: '#ffe5e5', bgDark: '#660000', iconBg: '#0D5F58',
  },
  {
    icon: Scale,
    title: 'Responsabilité Civile',
    description: 'Protection contre les dommages causés aux tiers dans votre vie privée ou pro.',
    bgLight: '#e2f6d5', bgDark: '#163300', iconBg: '#0F766E',
  },
  {
    icon: HardHat,
    title: 'RC Décennale',
    description: 'Pour les professionnels du bâtiment : garantie des dommages post-réception.',
    bgLight: '#e5fcfb', bgDark: '#004d4d', iconBg: '#0D9488',
  },
  {
    icon: Truck,
    title: 'Transport Marchandises',
    description: 'Garantit vos marchandises lors des transports import/export par tous moyens.',
    bgLight: '#ffebcc', bgDark: '#663c00', iconBg: '#03624C',
  },
  {
    icon: Hammer,
    title: 'Tous Risques Chantier',
    description: 'Protection complète des dommages matériels pendant vos travaux de construction.',
    bgLight: '#ffe5e5', bgDark: '#660000', iconBg: '#134E4A',
  },
  {
    icon: Plane,
    title: 'Assurance Voyages',
    description: 'Couverture médicale et assistance pour voyager sereinement dans le monde entier.',
    bgLight: '#e5f0ff', bgDark: '#002266', iconBg: '#2CC295',
  },
];

const FEATURED_IDS = [0, 1, 2, 3]; // Auto, Moto, Individuelle Acc., Multirisque

/* ── Sticky stack card ────────────────────────────────── */

interface StackCardProps {
  service: ServiceItem;
  idx: number;
  active: number;
  total: number;
}

const StackCard: React.FC<StackCardProps> = ({ service, idx, active, total }) => {
  const Icon = service.icon;
  const offset = idx - active;
  const isActive = idx === active;
  const isBehind = offset > 0;
  const isPassed = offset < 0;

  // Stack visual math
  const translateY = isBehind ? offset * 14 : isPassed ? offset * 12 : 0;
  const scale = isBehind ? 1 - offset * 0.04 : isPassed ? 1 + offset * 0.05 : 1;
  const opacity = isBehind && offset > 2 ? 0 : isPassed && offset < -1 ? 0 : 1;
  const rotateX = isPassed ? -8 : 0;
  const zIndex = total - Math.abs(offset);

  return (
    <div
      className="absolute inset-0 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        transform: `translateY(${translateY}px) scale(${scale}) perspective(900px) rotateX(${rotateX}deg)`,
        opacity,
        zIndex,
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      <div
        className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/30 shadow-[0_24px_60px_rgba(15,118,110,0.18)]"
        style={{
          background: `linear-gradient(160deg, ${service.iconBg} 0%, ${shade(service.iconBg, -25)} 100%)`,
        }}
      >
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.6) 0%, transparent 50%)',
          }}
        />

        <div className="relative h-full p-8 md:p-10 flex flex-col justify-between text-white">
          {/* Top: tag + idx */}
          <div className="flex items-start justify-between">
            {service.tag ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold uppercase tracking-[0.16em]">
                ★ {service.tag}
              </span>
            ) : <span />}
            <span className="font-display font-semibold text-[15px] text-white/55">
              {String(idx + 1).padStart(2, '0')}<span className="text-white/30">/{String(total).padStart(2, '0')}</span>
            </span>
          </div>

          {/* Middle: icon */}
          <div className="flex items-center justify-center my-auto">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-[24px] bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Icon size={48} strokeWidth={1.5} className="text-white" />
            </div>
          </div>

          {/* Bottom: title + price */}
          <div>
            <h3 className="font-display font-semibold text-[28px] md:text-[32px] leading-[1.1] tracking-[-0.4px] mb-2">
              {service.title}
            </h3>
            {service.priceFrom && (
              <p className="text-[14px] text-white/75 font-medium">{service.priceFrom}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/** Helper: shade a hex color */
function shade(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, ((num >> 16) & 0xff) + (percent * 255) / 100));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + (percent * 255) / 100));
  const b = Math.max(0, Math.min(255, (num & 0xff) + (percent * 255) / 100));
  return `#${[r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
}

/* ── Right detail panel ───────────────────────────────── */

const DetailPanel: React.FC<{ service: ServiceItem; idx: number }> = ({ service, idx }) => {
  return (
    <div key={idx} className="animate-fade-in-up">
      <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.18em] text-jackson-teal mb-4">
        Service {String(idx + 1).padStart(2, '0')}
      </span>
      <h3 className="font-display font-semibold text-jackson-deep leading-[1.1] tracking-[-0.5px] mb-5"
        style={{ fontSize: 'clamp(1.75rem, 3.4vw, 36px)' }}>
        {service.title}
      </h3>
      <p className="text-[17px] text-jackson-deep/70 leading-[1.6] mb-7">
        {service.longDescription ?? service.description}
      </p>

      {service.highlights && (
        <ul className="space-y-3 mb-8">
          {service.highlights.map(h => (
            <li key={h} className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-jackson-teal/10 flex items-center justify-center mt-0.5">
                <Check size={13} className="text-jackson-teal" strokeWidth={2.5} />
              </span>
              <span className="text-[15px] text-jackson-deep/85">{h}</span>
            </li>
          ))}
        </ul>
      )}

      {service.priceFrom && (
        <div className="inline-flex items-baseline gap-2 px-4 py-2 rounded-full bg-jackson-cream border border-jackson-teal/20 mb-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-jackson-teal">À partir de</span>
          <span className="text-[16px] font-bold text-jackson-deep">{service.priceFrom}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="#formulaire"
          onClick={e => {
            e.preventDefault();
            document.querySelector('#formulaire')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center justify-center gap-2 px-[22px] py-[12px] bg-jackson-teal hover:bg-jackson-teal-deep active:scale-95 text-white text-[16px] font-semibold rounded-full transition-all duration-200 cursor-pointer"
        >
          Demander un devis <ArrowRight size={15} />
        </a>
        <Link
          to="/services"
          className="inline-flex items-center justify-center gap-1.5 px-[22px] py-[12px] text-jackson-teal hover:text-jackson-teal-deep text-[16px] font-semibold transition-colors duration-200"
        >
          Toutes les garanties →
        </Link>
      </div>
    </div>
  );
};

/* ── Main section ─────────────────────────────────────── */

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const total = FEATURED_IDS.length;

  // Scroll-driven active idx
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handler = () => {
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      // Progress: 0 when top of section enters viewport, 1 when bottom leaves
      const total = rect.height - winH;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      // Map progress 0..1 → idx 0..N-1, with slight bias so last card hits before end
      const idx = Math.min(FEATURED_IDS.length - 1, Math.floor(progress * FEATURED_IDS.length));
      setActive(idx);
    };

    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, []);

  const activeService = ALL_SERVICES[FEATURED_IDS[active]];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative tile-parchment"
      style={{ height: `${FEATURED_IDS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* ── Left: stacked cards ── */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative w-full aspect-[3/4] max-w-[440px] mx-auto">
                {FEATURED_IDS.map((id, i) => (
                  <StackCard
                    key={id}
                    service={ALL_SERVICES[id]}
                    idx={i}
                    active={active}
                    total={total}
                  />
                ))}
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mt-8">
                {FEATURED_IDS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const el = sectionRef.current;
                      if (!el) return;
                      const rect = el.getBoundingClientRect();
                      const targetProgress = (i + 0.5) / FEATURED_IDS.length;
                      const total = rect.height - window.innerHeight;
                      const targetScroll = window.scrollY + rect.top + total * targetProgress;
                      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                    }}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      i === active ? 'w-8 bg-jackson-teal' : 'w-2 bg-jackson-teal/25 hover:bg-jackson-teal/50'
                    }`}
                    aria-label={`Service ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* ── Right: detail panel ── */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="max-w-[560px]">
                <span className="section-badge mb-4">Nos Solutions</span>
                <h2 className="section-title mb-8" style={{ fontSize: 'clamp(1.5rem, 3vw, 28px)', textAlign: 'left' }}>
                  Une couverture pour chaque besoin.
                </h2>

                <DetailPanel service={activeService} idx={active} />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom CTA banner appears after stack section */}
      <div className="absolute bottom-12 left-0 right-0 z-10 pointer-events-none">
        <div className="section-container text-center">
          <p className="text-[13px] text-jackson-deep/50 mb-3">
            Et 6 autres solutions — transport, chantier, voyage, RC décennale...
          </p>
          <Link
            to="/services"
            className="pointer-events-auto inline-flex items-center gap-1.5 px-[22px] py-[10px] bg-white border border-jackson-teal/30 text-jackson-teal text-[15px] font-semibold rounded-full hover:bg-jackson-teal/5 active:scale-95 transition-all duration-150 shadow-[0_4px_16px_rgba(15,118,110,0.08)]"
          >
            Voir nos 10 solutions complètes
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
