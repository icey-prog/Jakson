import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Building2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';
import ScrollReveal from '@/components/ScrollReveal';
import TestimonialCard from '@/components/TestimonialCard';

// Stats vérifiables (publiques, site jacksonassurances.com)
const stats = [
  { value: 2013, suffix: '',     label: "Année de création" },
  { value: 10,   suffix: '',     label: "Produits d'assurance" },
  { value: 5,    suffix: ' Mds', label: "FCFA de capital" },
  { value: 4,    suffix: '',     label: "Agences au Burkina" },
];

// Témoignages locaux Burkina — voix authentiques, vocabulaire local
const testimonials = [
  {
    quote:
      "Après mon accident sur la route de Bobo, j'ai été pris en charge en moins de 48h. Mon conseiller m'a appelé personnellement, pas un email automatique.",
    name: 'Issouf Ouédraogo',
    status: 'Client Auto Secur',
    city: 'Ouagadougou',
    avatar: '/assets/avatar-1.jpg',
  },
  {
    quote:
      "Notre boutique a subi un dégât des eaux pendant l'hivernage. Le dossier a été réglé sous deux semaines. Sérieux et professionnel.",
    name: 'Fatimata Sawadogo',
    status: 'Multirisque Habitation',
    city: 'Bobo-Dioulasso',
    avatar: '/assets/avatar-2.jpg',
  },
  {
    quote:
      "Pour la RC Décennale de mon chantier, j'ai comparé trois assureurs. Jackson a été le plus clair sur les garanties et le plus compétitif.",
    name: 'Abdoul Karim Zongo',
    status: 'Entrepreneur BTP',
    city: 'Ouagadougou',
    avatar: '/assets/avatar-3.jpg',
  },
  {
    quote:
      "J'apprécie le bureau de la Patte d'Oie. On me reçoit sans rendez-vous, on prend le temps d'expliquer. Ça change des grandes compagnies.",
    name: 'Mariam Kaboré',
    status: 'Cliente depuis 2019',
    city: 'Ouagadougou',
    avatar: '/assets/avatar-1.jpg',
  },
  {
    quote:
      "Mon transport de marchandises Lomé-Ouaga est couvert depuis 3 ans. Quand j'ai eu une question, j'ai eu mon contact en 5 minutes.",
    name: 'Boureima Compaoré',
    status: 'Transport Marchandises',
    city: 'Ouagadougou',
    avatar: '/assets/avatar-3.jpg',
  },
];

const AGENCIES = [
  { city: 'Ouagadougou', address: "Patte d'Oie · Face CCVA", phone: '+226 25 38 02 00' },
  { city: 'Ouagadougou', address: 'Bureau Direct', phone: '+226 25 33 27 27' },
  { city: 'Bobo-Dioulasso', address: 'Agence régionale', phone: '+226 20 97 05 95' },
];

const ReassuranceSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedStats, setAnimatedStats] = useState<number[]>([0, 0, 0, 0]);
  const statsAnimated = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsAnimated.current) {
          statsAnimated.current = true;
          const duration = 1400;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setAnimatedStats(stats.map(s => Math.round(s.value * eased)));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % Math.max(1, testimonials.length - 2));
  }, []);
  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === 0 ? Math.max(0, testimonials.length - 3) : prev - 1));
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) (diff > 0 ? nextSlide() : prevSlide());
  };

  const formatStat = (value: number) => value.toLocaleString('fr-FR');

  return (
    <section
      id="reassurance"
      ref={sectionRef}
      className="relative section-padding bg-jackson-cream overflow-hidden"
    >
      <div className="relative z-10 section-container">

        {/* ─── Notre Histoire — split asymmetric, photo + storytelling ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-24 md:mb-32 items-center">

          {/* Left: photo + agencies grid */}
          <ScrollReveal className="lg:col-span-5">
            <div className="relative">
              {/* Image principale */}
              <div
                className="aspect-[4/5] rounded-[24px] overflow-hidden shadow-[0_24px_60px_rgba(15,118,110,0.18)]"
                style={{
                  background: 'linear-gradient(160deg, #0F766E 0%, #03624C 100%)',
                }}
              >
                <img
                  src="/assets/hero-family.jpg"
                  alt="Équipe Jackson Assurances"
                  className="w-full h-full object-cover mix-blend-luminosity opacity-90"
                  loading="lazy"
                />
              </div>
              {/* Badge superposé */}
              <div className="absolute -bottom-6 -right-4 lg:right-6 bg-white rounded-[18px] p-5 shadow-[0_16px_40px_rgba(15,118,110,0.20)] border border-jackson-border/50 max-w-[220px]">
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck size={16} className="text-jackson-teal" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-jackson-teal">Agréée CIMA</span>
                </div>
                <p className="text-[13px] text-jackson-deep leading-snug">
                  Sous contrôle de la <strong>CRCA-UMOA</strong> et du Ministère des Finances du Burkina.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: text + agencies */}
          <ScrollReveal className="lg:col-span-7" delay={120}>
            <span className="section-badge mb-4">Notre Histoire</span>
            <h2 className="font-display font-semibold text-jackson-deep leading-[1.1] tracking-[-0.5px] mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 44px)' }}>
              Une compagnie burkinabè,<br />
              <span className="text-jackson-teal">au plus près de ses assurés.</span>
            </h2>
            <p className="text-[17px] text-jackson-deep/75 leading-[1.6] mb-5">
              Créée en <strong>janvier 2013</strong> à Ouagadougou, Jackson Assurances est une société
              anonyme spécialisée dans toutes les branches d'assurance non-Vie : Incendie, Accidents,
              Risques Divers et Transport.
            </p>
            <p className="text-[17px] text-jackson-deep/75 leading-[1.6] mb-8">
              Sous la direction de <strong>M. Zerbo</strong>, notre équipe accompagne particuliers et
              entreprises dans la protection de leur patrimoine. Notre devise :
              <em className="text-jackson-teal not-italic font-semibold"> « dire ce que nous faisons,
              faire ce que nous disons »</em>.
            </p>

            {/* Agences */}
            <div className="grid sm:grid-cols-3 gap-3">
              {AGENCIES.map((a, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[14px] p-4 border border-jackson-border/60 hover:border-jackson-teal/40 hover:shadow-[0_8px_24px_rgba(15,118,110,0.08)] transition-all"
                >
                  <div className="flex items-center gap-1.5 text-jackson-teal mb-1.5">
                    <Building2 size={13} strokeWidth={2} />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.10em]">{a.city}</span>
                  </div>
                  <p className="text-[13px] text-jackson-deep leading-snug mb-1">{a.address}</p>
                  <a href={`tel:${a.phone.replace(/\s/g, '')}`} className="text-[12px] text-jackson-deep/55 hover:text-jackson-teal transition-colors">
                    {a.phone}
                  </a>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* ─── Stats — 4 cards green-tinted ─── */}
        <ScrollReveal className="mb-24 md:mb-32">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-0 max-w-container mx-auto rounded-[24px] overflow-hidden border border-jackson-border/60"
            style={{ background: 'linear-gradient(135deg, #0F766E 0%, #03624C 100%)' }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center p-7 md:p-9 ${i < stats.length - 1 ? 'md:border-r border-white/10' : ''} ${i < 2 ? 'border-b md:border-b-0 border-white/10' : ''}`}
              >
                <p
                  className="font-display font-semibold text-white leading-[1.0] tracking-[-0.5px] mb-2"
                  style={{ fontSize: 'clamp(2rem, 4vw, 44px)' }}
                >
                  {formatStat(animatedStats[i])}
                  {stat.suffix && <span className="text-[0.55em] ml-1 text-jackson-meadow font-medium">{stat.suffix}</span>}
                </p>
                <p className="text-[13px] text-white/75 leading-[1.4] uppercase tracking-[0.06em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ─── Testimonials ─── */}
        <div className="section-inner">
          <ScrollReveal className="text-center mb-12">
            <span className="section-badge mb-4">Témoignages</span>
            <h2 className="section-title mb-4">Nos assurés parlent.</h2>
            <p className="section-subtitle mx-auto">
              Des clients de Ouaga à Bobo qui ont vécu un sinistre, un renouvellement, ou simplement
              un appel à leur conseiller.
            </p>
          </ScrollReveal>

          <div className="relative">
            {/* Desktop nav */}
            <div className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={prevSlide}
                className="w-11 h-11 rounded-full bg-white border border-jackson-border flex items-center justify-center text-jackson-deep hover:border-jackson-teal hover:text-jackson-teal transition-colors shadow-[0_4px_16px_rgba(15,118,110,0.10)] cursor-pointer"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
            <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={nextSlide}
                className="w-11 h-11 rounded-full bg-white border border-jackson-border flex items-center justify-center text-jackson-deep hover:border-jackson-teal hover:text-jackson-teal transition-colors shadow-[0_4px_16px_rgba(15,118,110,0.10)] cursor-pointer"
                aria-label="Témoignage suivant"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div
              ref={carouselRef}
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Mobile */}
              <div
                className="flex gap-6 transition-transform duration-400 md:hidden"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
              >
                {testimonials.map((t, i) => (
                  <TestimonialCard
                    key={i}
                    quote={t.quote}
                    name={t.name}
                    status={t.status}
                    city={t.city}
                    avatar={t.avatar}
                    className="shrink-0 w-full"
                  />
                ))}
              </div>

              {/* Desktop */}
              <div
                className="hidden md:flex gap-6 transition-transform duration-400"
                style={{
                  transform: `translateX(-${currentSlide * (100 / 3 + 2)}%)`,
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
              >
                {testimonials.map((t, i) => (
                  <TestimonialCard
                    key={i}
                    quote={t.quote}
                    name={t.name}
                    status={t.status}
                    city={t.city}
                    avatar={t.avatar}
                    className="shrink-0 w-[calc(33.333%-16px)]"
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: typeof window !== 'undefined' && window.innerWidth < 768 ? testimonials.length : Math.max(1, testimonials.length - 2) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === currentSlide ? 'w-6 bg-jackson-teal' : 'w-2 bg-jackson-border'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <ScrollReveal className="text-center mt-12">
            <Link to="/about" className="inline-flex items-center gap-1.5 text-jackson-teal font-semibold text-[15px] hover:gap-2.5 transition-all">
              Lire toute notre histoire <ChevronRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ReassuranceSection;
