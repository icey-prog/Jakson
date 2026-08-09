import React, { useRef, useState, useEffect, useCallback } from 'react';
import anime from 'animejs';
import { ArrowRight, Car, Bike, Flame, HeartPulse, Home, Scale, HardHat, Truck, Hammer, Plane, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router';

/* ── Data ─────────────────────────────────────────────── */

export type IllustrationKey = 'auto' | 'moto' | 'accident' | 'home';

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
  illustrationKey?: IllustrationKey;
  /** Illustration bitmap. Prioritaire sur `illustrationKey` quand elle est fournie. */
  illustrationSrc?: string;
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
    illustrationKey: 'auto',
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
    illustrationKey: 'moto',
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
    illustrationKey: 'accident',
    illustrationSrc: '/assets/illustration/CONTI DI FAMIGLIA - De Agostini - Frelly (Enrico Focarelli Barone).jpg',
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
    illustrationKey: 'home',
    illustrationSrc: '/assets/illustration/THOMAS DANTHONY (1).jpg',
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

/* ── Illustrations SVG éditoriales par service ───────── */

interface IllusProps { accent: string; deep: string; }

/** Auto Secur — voiture sur route avec ciel et nuages */
const IllusAuto: React.FC<IllusProps> = ({ accent, deep }) => (
  <svg viewBox="0 0 320 220" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    {/* sky */}
    <rect width="320" height="220" fill="#F0FDFA" />
    {/* sun */}
    <circle cx="260" cy="55" r="22" fill={accent} opacity="0.85" />
    <circle cx="260" cy="55" r="34" fill={accent} opacity="0.12" />
    {/* clouds */}
    <ellipse cx="60" cy="50" rx="28" ry="9" fill="white" opacity="0.95" />
    <ellipse cx="80" cy="45" rx="20" ry="7" fill="white" opacity="0.95" />
    <ellipse cx="180" cy="70" rx="22" ry="7" fill="white" opacity="0.9" />
    {/* horizon line */}
    <path d="M0 140 Q160 130, 320 145" stroke={deep} strokeWidth="1.5" fill="none" opacity="0.3" strokeDasharray="3 5" />
    {/* road */}
    <path d="M0 215 L60 150 L260 150 L320 215 Z" fill={deep} opacity="0.75" />
    {/* road markings */}
    <path d="M160 215 L160 150" stroke="#FFD93D" strokeWidth="2.5" strokeDasharray="6 8" />
    {/* car body */}
    <g transform="translate(105 110)">
      <path d="M5 35 L18 18 L52 14 L85 18 L100 35 L100 50 L5 50 Z" fill={accent} />
      <path d="M18 18 L25 6 L75 6 L82 14 L85 18 Z" fill={accent} opacity="0.85" />
      {/* windows */}
      <path d="M28 16 L33 8 L52 8 L52 16 Z" fill="#1E293B" opacity="0.85" />
      <path d="M52 8 L72 8 L78 16 L52 16 Z" fill="#1E293B" opacity="0.85" />
      {/* wheels */}
      <circle cx="22" cy="50" r="9" fill="#1E293B" />
      <circle cx="22" cy="50" r="4" fill={accent} />
      <circle cx="82" cy="50" r="9" fill="#1E293B" />
      <circle cx="82" cy="50" r="4" fill={accent} />
      {/* headlight */}
      <circle cx="100" cy="32" r="3" fill="#FEF3C7" />
    </g>
    {/* speed lines */}
    <path d="M40 165 L70 165 M30 175 L80 175 M50 185 L75 185" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
  </svg>
);

/** Moto Secur — moto en mouvement avec casque */
const IllusMoto: React.FC<IllusProps> = ({ accent, deep }) => (
  <svg viewBox="0 0 320 220" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <rect width="320" height="220" fill="#F0FDFA" />
    {/* ground gradient */}
    <path d="M0 180 L320 180 L320 220 L0 220 Z" fill={deep} opacity="0.10" />
    {/* circular sun behind */}
    <circle cx="240" cy="80" r="50" fill={accent} opacity="0.20" />
    <circle cx="240" cy="80" r="32" fill={accent} opacity="0.50" />
    {/* speed lines */}
    <path d="M10 100 L60 100" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.85" />
    <path d="M20 115 L75 115" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.65" />
    <path d="M5 130 L50 130" stroke={accent} strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
    {/* motorcycle */}
    <g transform="translate(105 110)">
      {/* rear wheel */}
      <circle cx="20" cy="65" r="22" fill="#1E293B" />
      <circle cx="20" cy="65" r="12" fill="white" opacity="0.15" />
      <circle cx="20" cy="65" r="5" fill={accent} />
      {/* front wheel */}
      <circle cx="100" cy="65" r="22" fill="#1E293B" />
      <circle cx="100" cy="65" r="12" fill="white" opacity="0.15" />
      <circle cx="100" cy="65" r="5" fill={accent} />
      {/* frame */}
      <path d="M22 65 L48 30 L72 32 L100 65" stroke={accent} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M48 30 L40 18 L52 12" stroke={deep} strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* seat */}
      <ellipse cx="62" cy="28" rx="14" ry="4" fill="#1E293B" />
      {/* rider helmet */}
      <circle cx="48" cy="0" r="13" fill={accent} />
      <path d="M37 -3 L60 -3 L57 6 L40 6 Z" fill="#1E293B" opacity="0.85" />
      {/* rider body */}
      <path d="M48 12 L42 28 L56 30 L52 14 Z" fill={deep} />
      {/* tank */}
      <path d="M50 35 L72 36 L68 50 L52 50 Z" fill={accent} opacity="0.8" />
    </g>
    {/* ground shadow */}
    <ellipse cx="170" cy="180" rx="80" ry="5" fill="#1E293B" opacity="0.18" />
  </svg>
);

/** Individuelle Accident — figure protégée par bouclier (style éditorial) */
const IllusAccident: React.FC<IllusProps> = ({ accent, deep }) => (
  <svg viewBox="0 0 320 220" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <rect width="320" height="220" fill="#F0FDFA" />
    {/* concentric rings background */}
    <circle cx="160" cy="120" r="95" fill="none" stroke={accent} strokeWidth="1" opacity="0.18" strokeDasharray="4 6" />
    <circle cx="160" cy="120" r="70" fill="none" stroke={accent} strokeWidth="1" opacity="0.25" />
    <circle cx="160" cy="120" r="45" fill={accent} opacity="0.12" />
    {/* shield */}
    <g transform="translate(110 50)">
      <path
        d="M50 0 L95 18 L95 60 Q95 100, 50 130 Q5 100, 5 60 L5 18 Z"
        fill={accent}
        opacity="0.95"
      />
      <path
        d="M50 0 L95 18 L95 60 Q95 100, 50 130 Q5 100, 5 60 L5 18 Z"
        fill="none"
        stroke={deep}
        strokeWidth="2"
        opacity="0.5"
      />
      {/* check mark */}
      <path
        d="M28 60 L45 78 L75 38"
        stroke="white"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    {/* particles around */}
    <circle cx="60" cy="60" r="4" fill={accent} opacity="0.6" />
    <circle cx="270" cy="70" r="3" fill={accent} opacity="0.7" />
    <circle cx="50" cy="160" r="3" fill={accent} opacity="0.5" />
    <circle cx="280" cy="170" r="4" fill={accent} opacity="0.6" />
    <path d="M40 100 L48 100 M44 96 L44 104" stroke={accent} strokeWidth="1.5" opacity="0.5" />
    <path d="M270 110 L278 110 M274 106 L274 114" stroke={accent} strokeWidth="1.5" opacity="0.5" />
  </svg>
);

/** Multirisque Habitation — maison sous dôme protecteur (réf. user) */
const IllusHome: React.FC<IllusProps> = ({ accent, deep }) => (
  <svg viewBox="0 0 320 220" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <rect width="320" height="220" fill="#F0FDFA" />
    {/* ground table */}
    <ellipse cx="160" cy="195" rx="80" ry="8" fill={deep} opacity="0.15" />
    <rect x="80" y="180" width="160" height="20" rx="6" fill={deep} opacity="0.75" />
    {/* dome glow */}
    <ellipse cx="160" cy="130" rx="105" ry="80" fill={accent} opacity="0.10" />
    {/* glass dome */}
    <path
      d="M55 180 Q55 50, 160 50 Q265 50, 265 180"
      fill={accent}
      opacity="0.18"
    />
    <path
      d="M55 180 Q55 50, 160 50 Q265 50, 265 180"
      fill="none"
      stroke={accent}
      strokeWidth="2"
      opacity="0.55"
    />
    {/* dome handle */}
    <rect x="152" y="36" width="16" height="14" rx="3" fill={deep} opacity="0.8" />
    <circle cx="160" cy="35" r="5" fill={accent} />
    {/* house base */}
    <rect x="115" y="125" width="90" height="55" fill="white" stroke={deep} strokeWidth="1.5" />
    {/* roof */}
    <path d="M105 125 L160 80 L215 125 Z" fill={accent} />
    <path d="M105 125 L160 80 L215 125 Z" fill="none" stroke={deep} strokeWidth="1.5" />
    {/* door */}
    <rect x="148" y="148" width="24" height="32" fill={deep} opacity="0.85" />
    <circle cx="166" cy="164" r="1.5" fill={accent} />
    {/* windows */}
    <rect x="124" y="138" width="16" height="16" fill={accent} opacity="0.6" stroke={deep} strokeWidth="1" />
    <rect x="180" y="138" width="16" height="16" fill={accent} opacity="0.6" stroke={deep} strokeWidth="1" />
    {/* chimney */}
    <rect x="190" y="92" width="10" height="20" fill={deep} opacity="0.85" />
    {/* sparkles */}
    <path d="M75 100 L75 112 M69 106 L81 106" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    <path d="M245 110 L245 118 M241 114 L249 114" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const IllusByKey: Record<IllustrationKey, React.FC<IllusProps>> = {
  auto: IllusAuto,
  moto: IllusMoto,
  accident: IllusAccident,
  home: IllusHome,
};

/* ── Card (shared visual for orbit + mobile) ────────── */

interface OrbitCardProps {
  service: ServiceItem;
  idx: number;
  total: number;
  isActive: boolean;
}

const OrbitCard: React.FC<OrbitCardProps> = ({ service, idx, total, isActive }) => {
  const numberLabel = String(idx + 1).padStart(2, '0');
  const Illus = service.illustrationKey ? IllusByKey[service.illustrationKey] : null;

  return (
    <div
      className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/15 flex flex-col bg-white"
      style={{
        boxShadow: `0 24px 60px ${service.iconBg}45`,
      }}
    >
      {/* ─── Top zone: illustration ─── */}
      <div className="relative w-full" style={{ height: '55%', minHeight: '180px' }}>
        {service.illustrationSrc ? (
          <img
            src={encodeURI(service.illustrationSrc)}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : Illus ? (
          <Illus accent={service.iconBg} deep={shade(service.iconBg, -40)} />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(155deg, ${service.iconBg} 0%, ${shade(service.iconBg, -30)} 100%)`,
            }}
          />
        )}

        {/* Top overlay: tag + numbering */}
        <div className="absolute inset-x-0 top-0 p-5 flex items-start justify-between">
          {service.tag ? (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] border border-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
              style={{ color: shade(service.iconBg, -30) }}
            >
              <span style={{ color: '#F59E0B' }}>★</span> {service.tag}
            </span>
          ) : <span />}
          <div
            className="text-right backdrop-blur-md bg-white/70 px-2.5 py-1 rounded-full border border-white/40"
            style={{ color: shade(service.iconBg, -35) }}
          >
            <span className="font-display font-bold text-[12px] md:text-[13px] tracking-[0.08em]">
              {numberLabel}
            </span>
            <span className="font-display text-[10px] opacity-50 tracking-[0.10em]">
              /{String(total).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Soft fade to white at bottom of illustration */}
        <div
          className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.95))' }}
        />
      </div>

      {/* ─── Bottom zone: editorial info on dark gradient ─── */}
      <div
        className="relative flex-1 flex flex-col justify-between p-5 md:p-6 text-white overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${service.iconBg} 0%, ${shade(service.iconBg, -30)} 65%, ${shade(service.iconBg, -45)} 100%)`,
        }}
      >
        {/* Watermark number BG */}
        <div
          className="absolute right-2 -bottom-6 font-display font-bold leading-none pointer-events-none select-none"
          style={{
            fontSize: '130px',
            color: 'rgba(255,255,255,0.07)',
            letterSpacing: '-6px',
          }}
        >
          {numberLabel}
        </div>

        {/* Noise texture */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.08] mix-blend-overlay pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id={`noise-${idx}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#noise-${idx})`} />
        </svg>

        <div className="relative">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/60 font-semibold mb-1.5">
            Jackson Assurances
          </p>
          <h3
            className="font-display font-semibold leading-[1.0] tracking-[-0.5px] mb-3"
            style={{ fontSize: 'clamp(19px, 3vw, 24px)' }}
          >
            {service.title}
          </h3>

          {/* Dotted hairline */}
          <div
            className="h-px w-full mb-3"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.35) 50%, transparent 0%)',
              backgroundSize: '6px 1px',
              backgroundRepeat: 'repeat-x',
            }}
          />

          <div className="flex items-center justify-between gap-3">
            {service.priceFrom ? (
              <p className="text-[12px] md:text-[13px] text-white/90 font-medium">
                <span className="text-white/55">À partir de</span>{' '}
                <span className="text-white font-semibold">{service.priceFrom.replace('Dès ', '')}</span>
              </p>
            ) : <span />}
            {isActive && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-white/70 font-semibold">
                <span className="w-1 h-1 rounded-full bg-white animate-pulse-dot" />
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

      {/* Appel au devis retiré : la section CTA finale et le hero le portent déjà. */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/services"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-jackson-teal hover:bg-jackson-teal-deep active:scale-95 text-white text-[15px] font-semibold rounded-full transition-all duration-200 cursor-pointer"
        >
          Toutes les garanties <ArrowRight size={14} />
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

  // Mount → init stack (mobile + desktop)
  useEffect(() => {
    applyStack(active, false);
    return () => {
      cardRefs.current.forEach(el => el && anime.remove(el));
      if (autoCycleRef.current) {
        clearInterval(autoCycleRef.current);
        autoCycleRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On active change, animate stack
  useEffect(() => {
    applyStack(active, true);
  }, [active, applyStack]);

  // Auto-cycle desktop only (hover pauses)
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

  // Touch swipe (mobile stack)
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return;
    setShowSwipeHint(false);
    haptic();
    if (diff > 0) setActive(prev => (prev + 1) % total);
    else setActive(prev => (prev - 1 + total) % total);
  };

  const goTo = (idx: number) => {
    setActive(idx);
    setShowSwipeHint(false);
    haptic();
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

            {/* ── Left: stack pile (mobile + desktop unified) ── */}
            <div className="lg:col-span-5">
              {/* Stack container — touch swipe + hover pause */}
              <div
                className="relative mx-auto"
                style={{
                  width: '100%',
                  maxWidth: isDesktop ? '380px' : '300px',
                  aspectRatio: '3 / 4',
                  touchAction: 'pan-y',
                }}
                onMouseEnter={() => { isHoveringRef.current = true; }}
                onMouseLeave={() => { isHoveringRef.current = false; }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
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

                {/* Soft floor shadow */}
                <div
                  className="absolute left-1/2 -bottom-6 -translate-x-1/2 w-[80%] h-[24px] pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(15,118,110,0.20), transparent 70%)',
                    filter: 'blur(8px)',
                  }}
                />
              </div>

              {/* Controls — chevrons + dots (mobile + desktop) */}
              <div className="flex items-center justify-center gap-3 mt-10">
                <button
                  onClick={() => goTo((active - 1 + total) % total)}
                  className="w-11 h-11 rounded-full bg-white border border-jackson-border flex items-center justify-center text-jackson-deep hover:border-jackson-teal hover:text-jackson-teal transition-colors cursor-pointer shadow-[0_4px_12px_rgba(15,118,110,0.08)]"
                  aria-label="Service précédent"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex">
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
                <button
                  onClick={() => goTo((active + 1) % total)}
                  className="w-11 h-11 rounded-full bg-white border border-jackson-border flex items-center justify-center text-jackson-deep hover:border-jackson-teal hover:text-jackson-teal transition-colors cursor-pointer shadow-[0_4px_12px_rgba(15,118,110,0.08)]"
                  aria-label="Service suivant"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Swipe hint mobile only — disappears after first interaction */}
              {!isDesktop && showSwipeHint && (
                <p className="text-center text-[12px] text-jackson-deep/45 mt-3 animate-pulse-dot">
                  ← Faites glisser ou tapez sur une carte →
                </p>
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
