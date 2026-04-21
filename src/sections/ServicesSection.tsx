import React from 'react';
import { ArrowRight, Car, Bike, Flame, HeartPulse, Home, Scale, HardHat, Truck, Hammer, Plane } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';

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
    title: 'Jackson Automobile',
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
  return (
    <div
      className="group relative p-6 rounded-[24px] overflow-hidden cursor-pointer
        transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_16px_48px_rgba(15,23,42,0.12)]
        border border-transparent hover:border-white/60"
      style={{ backgroundColor: service.bgLight }}
    >
      {/* Apple-style icon: clean stroke on tinted bg */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
        style={{ backgroundColor: service.iconBg + '18' }}
      >
        <Icon size={22} strokeWidth={1.75} style={{ color: service.iconBg }} />
      </div>

      {/* Tag */}
      {service.tag && (
        <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          {service.tag}
        </span>
      )}

      <h3 className="font-body font-bold text-[17px] text-slate-900 mb-1.5">{service.title}</h3>
      <p className="text-[13px] text-slate-500 leading-relaxed mb-5 line-clamp-2">{service.description}</p>

      <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-slate-600 group-hover:gap-2.5 transition-all duration-200 uppercase tracking-wide">
        En savoir plus <ArrowRight size={12} />
      </span>
    </div>
  );
};

const ServicesSection: React.FC = () => (
  <section id="services" className="section-padding bg-jackson-cream dark:bg-slate-900/60">
    <div className="section-container">
      <div className="section-inner">

        <ScrollReveal className="text-center mb-14">
          <SectionLabel className="mb-4">Nos Solutions</SectionLabel>
          <h2 className="section-title mb-4">Des assurances pour chaque aspect de votre vie</h2>
          <p className="section-subtitle mx-auto">
            Spécialisés en IARDT : Incendie, Accidents, Risques Divers & Transport.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 stagger-children">
          {FEATURED_IDS.map((idx, i) => (
            <ScrollReveal key={ALL_SERVICES[idx].title} delay={i * 80}>
              <ServiceFeaturedCard service={ALL_SERVICES[idx]} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center">
          <p className="text-slate-500 dark:text-white/60 text-sm mb-4">
            Et encore 6 autres solutions — auto-moto, transport, chantier, voyage...
          </p>
          <Link to="/services" className="btn-secondary !py-3 !px-7 !text-sm !rounded-xl inline-flex">
            Voir nos 10 solutions complètes
            <ArrowRight size={15} className="ml-1" />
          </Link>
        </ScrollReveal>

      </div>
    </div>
  </section>
);

export default ServicesSection;
