import React, { useRef } from 'react';
import { ArrowRight, Car, Bike, Flame, HeartPulse, Home, Scale, HardHat, Truck, Hammer, Plane } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router';
import ScrollReveal from '@/components/ScrollReveal';
import { useAnimeReveal } from '@/hooks/useAnimeReveal';

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  tag?: string;
  bgLight: string;
  bgDark: string;
  iconBg: string;
}

export const ALL_SERVICES: ServiceItem[] = [
  {
    icon: Car,
    title: 'Jackson Auto Secur',
    description: 'Formule automobile complète pour tous véhicules, options adaptées à votre budget.',
    tag: 'Populaire',
    bgLight: '#e2f6d5', bgDark: '#163300', iconBg: '#14B8A6',
  },
  {
    icon: Bike,
    title: 'Jackson Moto Secur',
    description: 'Protection optimale pour vos deux-roues, sérénité lors de tous vos déplacements.',
    bgLight: '#ffebcc', bgDark: '#663c00', iconBg: '#F59E0B',
  },
  {
    icon: Flame,
    title: 'Assurance Incendie',
    description: "Couvre vos biens immobiliers et professionnels contre les risques d'incendie.",
    bgLight: '#ffe5e5', bgDark: '#660000', iconBg: '#EF4444',
  },
  {
    icon: HeartPulse,
    title: 'Individuelle Accident',
    description: 'Protection face aux conséquences des accidents corporels de la vie privée.',
    bgLight: '#e5f0ff', bgDark: '#002266', iconBg: '#3B82F6',
  },
  {
    icon: Home,
    title: 'Multirisque Habitation',
    description: 'Couvrez votre habitation contre incendie, vol, dégâts des eaux et plus encore.',
    bgLight: '#f0e5ff', bgDark: '#330066', iconBg: '#8B5CF6',
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
    bgLight: '#ffebcc', bgDark: '#663c00', iconBg: '#D97706',
  },
  {
    icon: Hammer,
    title: 'Tous Risques Chantier',
    description: 'Protection complète des dommages matériels pendant vos travaux de construction.',
    bgLight: '#ffe5e5', bgDark: '#660000', iconBg: '#DC2626',
  },
  {
    icon: Plane,
    title: 'Assurance Voyages',
    description: 'Couverture médicale et assistance pour voyager sereinement dans le monde entier.',
    bgLight: '#e5f0ff', bgDark: '#002266', iconBg: '#2563EB',
  },
];

const FEATURED_IDS = [0, 1, 3, 4];

interface ServiceFeaturedCardProps {
  service: ServiceItem;
}

const ServiceFeaturedCard: React.FC<ServiceFeaturedCardProps> = ({ service }) => {
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) scale(1.025) translateZ(8px)`;
    el.style.transition = 'transform 0.1s linear';
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
      className="group relative p-6 rounded-[18px] overflow-hidden cursor-pointer
        border border-apple-hairline hover:border-apple-blue/30
        bg-white hover:shadow-[0_20px_60px_rgba(15,23,42,0.14)]
        shadow-[0_4px_24px_rgba(15,23,42,0.07)]"
    >
      <div
        className="w-11 h-11 rounded-[11px] flex items-center justify-center mb-4"
        style={{ backgroundColor: service.iconBg + '18' }}
      >
        <Icon size={20} strokeWidth={1.75} style={{ color: service.iconBg }} />
      </div>

      {service.tag && (
        <span className="absolute top-4 right-4 text-[12px] font-semibold text-apple-blue tracking-[-0.12px]">
          {service.tag}
        </span>
      )}

      <h3 className="font-body font-semibold text-[17px] text-apple-ink tracking-[-0.374px] leading-[1.24] mb-1.5">
        {service.title}
      </h3>
      <p className="text-[14px] text-apple-ink-48 leading-[1.43] tracking-[-0.224px] mb-5 line-clamp-2">
        {service.description}
      </p>

      <span className="btn-text-link text-[14px] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-150">
        En savoir plus <ArrowRight size={12} />
      </span>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const gridRef = useAnimeReveal<HTMLDivElement>({ selector: '[data-card]', stagger: 100, translateY: 45 });

  return (
    <section id="services" className="section-padding tile-parchment">
      <div className="section-container">
        <div className="section-inner">

          <ScrollReveal className="text-center mb-14">
            <span className="section-badge mb-4">Nos Solutions</span>
            <h2 className="section-title mb-4">
              Chaque risque, un expert humain dédié.
            </h2>
            <p className="section-subtitle mx-auto">
              Nos conseillers — pas des robots — analysent votre situation
              et vous proposent la couverture exactement adaptée à vos besoins.
            </p>
          </ScrollReveal>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {FEATURED_IDS.map((idx) => (
              <div key={ALL_SERVICES[idx].title} data-card>
                <ServiceFeaturedCard service={ALL_SERVICES[idx]} />
              </div>
            ))}
          </div>

          <ScrollReveal className="text-center">
            <p className="text-apple-ink-48 text-[14px] tracking-[-0.224px] mb-4">
              Et encore 6 autres solutions — auto-moto, transport, chantier, voyage...
            </p>
            <Link to="/services"
              className="inline-flex items-center gap-1.5 px-[22px] py-[11px] bg-transparent border border-apple-blue text-apple-blue text-[17px] font-normal tracking-[-0.374px] rounded-full hover:bg-apple-blue/5 active:scale-95 transition-all duration-150">
              Voir nos 10 solutions complètes
              <ArrowRight size={15} />
            </Link>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
