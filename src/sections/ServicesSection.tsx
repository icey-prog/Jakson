import React, { useRef, useState, useEffect, useCallback } from 'react';
import anime from 'animejs';
import { ArrowRight, Car, Bike, Flame, HeartPulse, Home, Scale, HardHat, Truck, Hammer, Plane, Check, ChevronLeft, ChevronRight } from 'lucide-react';
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
  longDescription?: string;
  highlights?: string[];
  priceFrom?: string;
}

export const ALL_SERVICES: ServiceItem[] = [
  {
    icon: Car,
    title: 'Jackson Auto Secur',
    description: 'Formule automobile complète pour tous véhicules.',
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
    description: 'Protection optimale pour vos deux-roues.',
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
    description: 'Protection face aux accidents corporels de la vie privée.',
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
    description: 'Habitation protégée contre incendie, vol, dégâts des eaux.',
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
  { icon: Flame, title: 'Assurance Incendie', description: "Biens immobiliers et professionnels.", bgLight: '#ffe5e5', bgDark: '#660000', iconBg: '#0D5F58' },
  { icon: Scale, title: 'Responsabilité Civile', description: 'Dommages causés aux tiers.', bgLight: '#e2f6d5', bgDark: '#163300', iconBg: '#0F766E' },
  { icon: HardHat, title: 'RC Décennale', description: 'Pros du bâtiment, post-réception.', bgLight: '#e5fcfb', bgDark: '#004d4d', iconBg: '#0D9488' },
  { icon: Truck, title: 'Transport Marchandises', description: 'Import/export tous moyens.', bgLight: '#ffebcc', bgDark: '#663c00', iconBg: '#03624C' },
  { icon: Hammer, title: 'Tous Risques Chantier', description: 'Dommages pendant travaux.', bgLight: '#ffe5e5', bgDark: '#660000', iconBg: '#134E4A' },
  { icon: Plane, title: 'Assurance Voyages', description: 'Médical et assistance monde.', bgLight: '#e5f0ff', bgDark: '#002266', iconBg: '#2CC295' },
];

const FEATURED_IDS = [0, 1, 2, 3];

/** Helper: shade a hex color */
function shade(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, ((num >> 16) & 0xff) + (percent * 255) / 100));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + (percent * 255) / 100));
  const b = Math.max(0, Math.min(255, (num & 0xff) + (percent * 255) / 100));
  return `#${[r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
}

/* ── Card (shared visual for orbit + mobile) ────────── */

interface OrbitCardProps {
  service: ServiceItem;
  idx: number;
  total: number;
  isActive: boolean;
}

const OrbitCard: React.FC<OrbitCardProps> = ({ service, idx, total, isActive }) => {
  const Icon = service.icon;
  return (
    <div
      className="w-full h-full rounded-[28px] overflow-hidden border border-white/20 shadow-[0_24px_60px_rgba(15,118,110,0.18)]"
      style={{
        background: `linear-gradient(160deg, ${service.iconBg} 0%, ${shade(service.iconBg, -25)} 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.6) 0%, transparent 50%)',
        }}
      />
      <div className="relative h-full p-6 md:p-8 flex flex-col justify-between text-white">
        <div className="flex items-start justify-between">
          {service.tag ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em]">
              ★ {service.tag}
            </span>
          ) : <span />}
          <span className="font-display font-semibold text-[13px] md:text-[15px] text-white/55">
            {String(idx + 1).padStart(2, '0')}<span className="text-white/30">/{String(total).padStart(2, '0')}</span>
          </span>
        </div>

        <div className="flex items-center justify-center my-auto">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-[20px] bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Icon size={40} strokeWidth={1.5} className="text-white" />
          </div>
        </div>

        <div>
          <h3 className="font-display font-semibold text-[22px] md:text-[26px] leading-[1.1] tracking-[-0.4px] mb-1.5">
            {service.title}
          </h3>
          {service.priceFrom && isActive && (
            <p className="text-[13px] md:text-[14px] text-white/80 font-medium">{service.priceFrom}</p>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Right detail panel ───────────────────────────────── */

const DetailPanel: React.FC<{ service: ServiceItem; idx: number }> = ({ service, idx }) => {
  return (
    <div key={idx} className="animate-fade-in-up">
      <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.18em] text-jackson-teal mb-3">
        Service {String(idx + 1).padStart(2, '0')}
      </span>
      <h3
        className="font-display font-semibold text-jackson-deep leading-[1.1] tracking-[-0.5px] mb-4"
        style={{ fontSize: 'clamp(1.5rem, 3vw, 32px)' }}
      >
        {service.title}
      </h3>
      <p className="text-[15px] md:text-[16px] text-jackson-deep/70 leading-[1.6] mb-6">
        {service.longDescription ?? service.description}
      </p>

      {service.highlights && (
        <ul className="space-y-2.5 mb-6">
          {service.highlights.map(h => (
            <li key={h} className="flex items-start gap-2.5">
              <span className="shrink-0 w-5 h-5 rounded-full bg-jackson-teal/10 flex items-center justify-center mt-0.5">
                <Check size={11} className="text-jackson-teal" strokeWidth={2.5} />
              </span>
              <span className="text-[14px] text-jackson-deep/85">{h}</span>
            </li>
          ))}
        </ul>
      )}

      {service.priceFrom && (
        <div className="inline-flex items-baseline gap-2 px-3.5 py-2 rounded-full bg-jackson-cream border border-jackson-teal/20 mb-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-jackson-teal">À partir de</span>
          <span className="text-[15px] font-bold text-jackson-deep">{service.priceFrom}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="#formulaire"
          onClick={e => {
            e.preventDefault();
            document.querySelector('#formulaire')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-jackson-teal hover:bg-jackson-teal-deep active:scale-95 text-white text-[15px] font-semibold rounded-full transition-all duration-200 cursor-pointer"
        >
          Demander un devis <ArrowRight size={14} />
        </a>
        <Link
          to="/services"
          className="inline-flex items-center justify-center gap-1.5 px-5 py-3 text-jackson-teal hover:text-jackson-teal-deep text-[15px] font-semibold transition-colors duration-200"
        >
          Toutes les garanties →
        </Link>
      </div>
    </div>
  );
};

/* ── Main ─────────────────────────────────────────────── */

const ServicesSection: React.FC = () => {
  const [active, setActive] = useState(0);
  // SSR-safe init — prevents initial layout flash desktop→mobile→desktop
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth >= 1024
  );
  const total = FEATURED_IDS.length;
  const angleStep = 360 / total;
  const sectionRef = useRef<HTMLElement>(null);

  // Track viewport
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Orbital tilt + anime.js continuous drift ────────────
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const driftRef = useRef<{ value: number }>({ value: 0 });
  const isHoveringRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Apply tilt + rotation + counter-rotate cards
  const applyTransforms = useCallback((ringAngle: number) => {
    const ring = ringRef.current;
    if (!ring) return;
    ring.style.transform = `rotateX(-22deg) rotateY(${ringAngle}deg)`;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const cardAngle = i * angleStep;
      const inner = el.firstElementChild as HTMLElement | null;
      if (inner) {
        inner.style.transform = `rotateY(${-ringAngle - cardAngle}deg) rotateX(22deg)`;
      }
    });
  }, [angleStep]);

  // Helper: start continuous drift from current value
  const startDrift = useCallback(() => {
    anime.remove(driftRef.current);
    const startValue = driftRef.current.value;
    anime({
      targets: driftRef.current,
      value: startValue + 360,
      duration: 32000,
      easing: 'linear',
      loop: true,
      update: () => {
        if (isHoveringRef.current) return;
        applyTransforms(driftRef.current.value % 360);
      },
    });
  }, [applyTransforms]);

  // Mount / mode change → init drift baseline from current active
  useEffect(() => {
    if (!isDesktop) {
      anime.remove(driftRef.current);
      return;
    }
    // Sync baseline to current active so no fight on first paint
    driftRef.current.value = -active * angleStep;
    applyTransforms(driftRef.current.value % 360);
    startDrift();
    return () => {
      anime.remove(driftRef.current);
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop]);

  // On active change (dots/chevrons), cancel drift + snap + restart drift
  useEffect(() => {
    if (!isDesktop) return;
    // Cancel any pending resume + ALL animations on driftRef
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    anime.remove(driftRef.current);
    isHoveringRef.current = true;

    const target = -active * angleStep;
    const current = driftRef.current.value;
    const diff = ((target - current) % 360 + 540) % 360 - 180;

    anime({
      targets: driftRef.current,
      value: current + diff,
      duration: 900,
      easing: 'cubicBezier(0.22, 1, 0.36, 1)',
      update: () => {
        applyTransforms(driftRef.current.value % 360);
      },
      complete: () => {
        resumeTimeoutRef.current = setTimeout(() => {
          isHoveringRef.current = false;
          startDrift();
        }, 800);
      },
    });
  }, [active, isDesktop, angleStep, applyTransforms, startDrift]);

  // Mobile carousel ref
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const handleMobileScroll = useCallback(() => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const cardW = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 16 : 1;
    const idx = Math.round(el.scrollLeft / cardW);
    setActive(Math.min(idx, total - 1));
  }, [total]);

  useEffect(() => {
    if (isDesktop) return;
    const el = mobileScrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleMobileScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleMobileScroll);
  }, [isDesktop, handleMobileScroll]);

  const goTo = (idx: number) => {
    setActive(idx);
    if (!isDesktop) {
      const el = mobileScrollRef.current;
      if (!el) return;
      const card = el.children[idx] as HTMLElement;
      if (card) el.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    }
    // Desktop: orbit anime.js snap handled by useEffect on `active` change
  };

  const activeService = ALL_SERVICES[FEATURED_IDS[active]];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative tile-parchment overflow-hidden"
    >
      <div className={isDesktop ? 'py-24 lg:py-32' : 'py-16'}>
        <div className="w-full section-container">

          {/* Header — mobile only above carousel */}
          {!isDesktop && (
            <div className="text-center mb-10">
              <span className="section-badge mb-4">Nos Solutions</span>
              <h2 className="section-title mb-3" style={{ fontSize: 'clamp(1.5rem, 5vw, 28px)' }}>
                Une couverture pour chaque besoin.
              </h2>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* ── Left: orbit (desktop) | carousel (mobile) ── */}
            <div className="lg:col-span-5">

              {/* DESKTOP — tilted orbital 3D wheel (anime.js drift) */}
              {isDesktop && (
                <>
                  <div
                    className="relative mx-auto"
                    style={{
                      width: '380px',
                      height: '460px',
                      perspective: '1600px',
                    }}
                    onMouseEnter={() => { isHoveringRef.current = true; }}
                    onMouseLeave={() => { isHoveringRef.current = false; }}
                  >
                    {/* Saturn-style horizontal disc shadow under orbit */}
                    <div
                      className="absolute left-1/2 bottom-[-30px] -translate-x-1/2 w-[420px] h-[40px] pointer-events-none"
                      style={{
                        background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(15,118,110,0.22), transparent 70%)',
                        filter: 'blur(8px)',
                      }}
                    />

                    {/* Orbit ring — tilted, driven by anime.js */}
                    <div
                      ref={ringRef}
                      className="absolute inset-0"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: 'rotateX(-22deg) rotateY(0deg)',
                        willChange: 'transform',
                      }}
                    >
                      {FEATURED_IDS.map((id, i) => {
                        const angle = i * angleStep;
                        const radius = 340;
                        return (
                          <div
                            key={id}
                            ref={el => { cardRefs.current[i] = el; }}
                            className="absolute inset-0"
                            style={{
                              transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                              transformStyle: 'preserve-3d',
                            }}
                          >
                            <div
                              className="relative w-full h-full transition-all duration-500"
                              style={{
                                willChange: 'transform',
                                transform: 'rotateY(0deg) rotateX(22deg)',
                                opacity: i === active ? 1 : 0.55,
                                filter: i === active ? 'none' : 'saturate(0.7)',
                              }}
                            >
                              <OrbitCard
                                service={ALL_SERVICES[id]}
                                idx={i}
                                total={total}
                                isActive={i === active}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Center radial glow */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 50%, rgba(15,118,110,0.10) 0%, transparent 55%)',
                      }}
                    />
                  </div>

                  {/* Orbit controls */}
                  <div className="flex items-center justify-center gap-3 mt-8">
                    <button
                      onClick={() => goTo((active - 1 + total) % total)}
                      className="w-11 h-11 rounded-full bg-white border border-jackson-border flex items-center justify-center text-jackson-deep hover:border-jackson-teal hover:text-jackson-teal transition-colors cursor-pointer shadow-[0_4px_12px_rgba(15,118,110,0.08)]"
                      aria-label="Service précédent"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <div className="flex gap-2">
                      {FEATURED_IDS.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goTo(i)}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            i === active ? 'w-8 bg-jackson-teal' : 'w-2 bg-jackson-teal/25 hover:bg-jackson-teal/50'
                          }`}
                          aria-label={`Service ${i + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => goTo((active + 1) % total)}
                      className="w-11 h-11 rounded-full bg-white border border-jackson-border flex items-center justify-center text-jackson-deep hover:border-jackson-teal hover:text-jackson-teal transition-colors cursor-pointer shadow-[0_4px_12px_rgba(15,118,110,0.08)]"
                      aria-label="Service suivant"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </>
              )}

              {/* MOBILE — horizontal scroll carousel */}
              {!isDesktop && (
                <>
                  <div
                    ref={mobileScrollRef}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {FEATURED_IDS.map((id, i) => (
                      <div
                        key={id}
                        className="snap-center shrink-0 w-[78vw] max-w-[320px] aspect-[3/4] relative"
                      >
                        <OrbitCard
                          service={ALL_SERVICES[id]}
                          idx={i}
                          total={total}
                          isActive={i === active}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center gap-2 mt-5">
                    {FEATURED_IDS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          i === active ? 'w-8 bg-jackson-teal' : 'w-2 bg-jackson-teal/25'
                        }`}
                        aria-label={`Service ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* ── Right: detail panel ── */}
            <div className="lg:col-span-7">
              <div className="max-w-[560px] lg:mx-0 mx-auto">
                {isDesktop && (
                  <>
                    <span className="section-badge mb-4">Nos Solutions</span>
                    <h2
                      className="section-title mb-6"
                      style={{ fontSize: 'clamp(1.5rem, 2.6vw, 26px)', textAlign: 'left' }}
                    >
                      Une couverture pour chaque besoin.
                    </h2>
                  </>
                )}
                <DetailPanel service={activeService} idx={active} />
              </div>
            </div>

          </div>

          {/* Bottom link */}
          <div className="text-center mt-12 lg:mt-16">
            <p className="text-[12px] md:text-[13px] text-jackson-deep/50 mb-3">
              Et 6 autres solutions — transport, chantier, voyage, RC décennale...
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white border border-jackson-teal/30 text-jackson-teal text-[14px] md:text-[15px] font-semibold rounded-full hover:bg-jackson-teal/5 active:scale-95 transition-all duration-150 shadow-[0_4px_16px_rgba(15,118,110,0.08)]"
            >
              Voir nos 10 solutions complètes
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
