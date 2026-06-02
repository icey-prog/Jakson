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
  const numberLabel = String(idx + 1).padStart(2, '0');

  return (
    <div
      className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/15"
      style={{
        background: `linear-gradient(155deg, ${service.iconBg} 0%, ${shade(service.iconBg, -30)} 65%, ${shade(service.iconBg, -45)} 100%)`,
        boxShadow: `0 24px 60px ${service.iconBg}45, inset 0 1px 0 rgba(255,255,255,0.10)`,
      }}
    >
      {/* ── Layer 1: SVG grain texture (premium editorial) ── */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.10] mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id={`noise-${idx}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#noise-${idx})`} />
      </svg>

      {/* ── Layer 2: Decorative concentric arcs (top-right) ── */}
      <svg
        className="absolute -top-12 -right-12 w-64 h-64 pointer-events-none opacity-[0.18]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="90" stroke="white" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="70" stroke="white" strokeWidth="0.8" strokeDasharray="3 4" />
        <circle cx="100" cy="100" r="50" stroke="white" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="30" stroke="white" strokeWidth="0.8" strokeDasharray="2 3" />
      </svg>

      {/* ── Layer 3: Big watermark number (background) ── */}
      <div
        className="absolute right-4 bottom-2 font-display font-bold leading-none pointer-events-none select-none"
        style={{
          fontSize: '180px',
          color: 'rgba(255,255,255,0.06)',
          letterSpacing: '-8px',
        }}
      >
        {numberLabel}
      </div>

      {/* ── Layer 4: Diagonal gradient highlight ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, transparent 35%, transparent 70%, rgba(0,0,0,0.20) 100%)',
        }}
      />

      {/* ── Layer 5: Giant icon silhouette (illustration) ── */}
      <div className="absolute -bottom-6 -left-6 pointer-events-none opacity-[0.10]">
        <Icon size={220} strokeWidth={0.9} className="text-white" />
      </div>

      {/* ── Foreground content ── */}
      <div className="relative h-full p-6 md:p-7 flex flex-col justify-between text-white">

        {/* Top row: tag + numbering */}
        <div className="flex items-start justify-between">
          {service.tag ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-xl text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] border border-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
              <span className="text-amber-200">★</span> {service.tag}
            </span>
          ) : <span />}
          <div className="text-right">
            <span className="font-display font-semibold text-[13px] md:text-[14px] text-white tracking-[0.08em]">
              {numberLabel}
            </span>
            <span className="font-display text-[11px] text-white/40 tracking-[0.10em]">
              /{String(total).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Middle: icon glass chip — smaller, refined */}
        <div className="my-auto">
          <div
            className="w-16 h-16 md:w-[68px] md:h-[68px] rounded-2xl flex items-center justify-center"
            style={{
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.18)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.20)',
            }}
          >
            <Icon size={30} strokeWidth={1.5} className="text-white" />
          </div>
        </div>

        {/* Bottom: title + price chip + dotted divider */}
        <div>
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/55 font-semibold mb-1.5">
            Jackson Assurances
          </p>
          <h3
            className="font-display font-semibold leading-[1.0] tracking-[-0.5px] mb-3"
            style={{ fontSize: 'clamp(20px, 3vw, 26px)' }}
          >
            {service.title}
          </h3>

          {/* Dotted hairline */}
          <div
            className="h-px w-full mb-3"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.30) 50%, transparent 0%)',
              backgroundSize: '6px 1px',
              backgroundRepeat: 'repeat-x',
            }}
          />

          {/* Price + metric */}
          <div className="flex items-center justify-between gap-3">
            {service.priceFrom ? (
              <p className="text-[12px] md:text-[13px] text-white/85 font-medium">
                <span className="text-white/55">À partir de</span>{' '}
                <span className="text-white font-semibold">{service.priceFrom.replace('Dès ', '')}</span>
              </p>
            ) : <span />}
            {isActive && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-white/65 font-semibold">
                <span className="w-1 h-1 rounded-full bg-white/80 animate-pulse-dot" />
                Actif
              </span>
            )}
          </div>
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
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  // SSR-safe init — prevents initial layout flash desktop→mobile→desktop
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth >= 1024
  );
  const total = FEATURED_IDS.length;
  const sectionRef = useRef<HTMLElement>(null);

  // Haptic feedback helper (Android support; iOS no-op safe)
  const haptic = useCallback(() => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate?.(10); } catch { /* noop */ }
    }
  }, []);

  // Track viewport
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Stack pile animée (anime.js) ────────────────────────
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isHoveringRef = useRef(false);
  const autoCycleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Apply stack transforms — active on top, others stacked behind
  const applyStack = useCallback((activeIdx: number, animated = true) => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      // Relative offset in cyclic stack
      // Behind: positive offset (1, 2, 3...)
      // Active: 0
      const rel = (i - activeIdx + total) % total;
      // rel: 0 (active), 1 (next behind), 2, 3 (deepest)
      const translateY = rel === 0 ? 0 : 18 * rel;
      const translateX = rel === 0 ? 0 : 6 * rel;
      const scale = rel === 0 ? 1 : 1 - 0.05 * rel;
      const opacity = rel >= total - 1 ? 0 : rel === 0 ? 1 : 0.85 - 0.15 * rel;
      const rotate = rel === 0 ? 0 : -2 * rel;
      const zIndex = total - rel;

      if (animated) {
        anime.remove(el);
        anime({
          targets: el,
          translateY,
          translateX,
          scale,
          opacity,
          rotate,
          duration: 700,
          easing: 'cubicBezier(0.22, 1, 0.36, 1)',
        });
        el.style.zIndex = String(zIndex);
      } else {
        el.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(zIndex);
      }
    });
  }, [total]);

  // Mount / mode change → init stack
  useEffect(() => {
    if (!isDesktop) return;
    applyStack(active, false);
    return () => {
      cardRefs.current.forEach(el => el && anime.remove(el));
      if (autoCycleRef.current) {
        clearInterval(autoCycleRef.current);
        autoCycleRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop]);

  // On active change, animate stack
  useEffect(() => {
    if (!isDesktop) return;
    applyStack(active, true);
  }, [active, isDesktop, applyStack]);

  // Auto-cycle every 5s (hover pauses)
  useEffect(() => {
    if (!isDesktop) return;
    autoCycleRef.current = setInterval(() => {
      if (isHoveringRef.current) return;
      setActive(prev => (prev + 1) % total);
    }, 5000);
    return () => {
      if (autoCycleRef.current) {
        clearInterval(autoCycleRef.current);
        autoCycleRef.current = null;
      }
    };
  }, [isDesktop, total]);

  // Mobile carousel ref
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const lastMobileIdxRef = useRef(0);
  const handleMobileScroll = useCallback(() => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const cardW = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 16 : 1;
    const idx = Math.min(total - 1, Math.round(el.scrollLeft / cardW));
    if (idx !== lastMobileIdxRef.current) {
      lastMobileIdxRef.current = idx;
      setActive(idx);
      setShowSwipeHint(false);
      haptic();
    }
  }, [total, haptic]);

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
                    style={{ width: '380px', height: '500px' }}
                    onMouseEnter={() => { isHoveringRef.current = true; }}
                    onMouseLeave={() => { isHoveringRef.current = false; }}
                  >
                    {/* Stacked cards — anime.js driven */}
                    {FEATURED_IDS.map((id, i) => (
                      <div
                        key={id}
                        ref={el => { cardRefs.current[i] = el; }}
                        className="absolute inset-0 cursor-pointer"
                        style={{ willChange: 'transform, opacity' }}
                        onClick={() => goTo(i)}
                      >
                        <OrbitCard
                          service={ALL_SERVICES[id]}
                          idx={i}
                          total={total}
                          isActive={i === active}
                        />
                      </div>
                    ))}

                    {/* Soft floor shadow under stack */}
                    <div
                      className="absolute left-1/2 bottom-[-24px] -translate-x-1/2 w-[320px] h-[28px] pointer-events-none"
                      style={{
                        background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(15,118,110,0.20), transparent 70%)',
                        filter: 'blur(8px)',
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

                  {/* Dots with 44px hit area wrapper */}
                  <div className="flex justify-center mt-3">
                    {FEATURED_IDS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className="w-11 h-11 flex items-center justify-center cursor-pointer group"
                        aria-label={`Service ${i + 1}`}
                      >
                        <span
                          className={`h-2 rounded-full transition-all duration-300 ${
                            i === active ? 'w-8 bg-jackson-teal' : 'w-2 bg-jackson-teal/25 group-hover:bg-jackson-teal/50'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Swipe hint — disparait après 1ère interaction */}
                  {showSwipeHint && (
                    <p className="text-center text-[12px] text-jackson-deep/45 mt-2 animate-pulse-dot">
                      ← Faites glisser →
                    </p>
                  )}
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
              className="inline-flex items-center gap-1.5 px-6 py-3 lg:py-2.5 bg-white border border-jackson-teal/30 text-jackson-teal text-[14px] md:text-[15px] font-semibold rounded-full hover:bg-jackson-teal/5 active:scale-95 transition-all duration-150 shadow-[0_4px_16px_rgba(15,118,110,0.08)] min-h-[44px]"
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
