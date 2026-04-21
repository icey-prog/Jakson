import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';
import AmbientOrb from '@/components/AmbientOrb';
import TestimonialCard from '@/components/TestimonialCard';

const stats = [
  { value: 99.9, suffix: '%', label: 'de sinistres traités en moins de 48h' },
  { value: 50000, suffix: '+', label: 'familles nous font confiance', format: true },
  { value: 4.8, suffix: '/5', label: 'note moyenne de satisfaction', isDecimal: true },
  { value: 0, suffix: '24/7', label: 'service d\'assistance disponible', isSpecial: true },
];

const testimonials = [
  {
    quote:
      "Jackson Assurances a transformé ma vision de l'assurance. Enfin une entreprise qui répond au téléphone et traite mes dossiers rapidement. Mon sinistre a été réglé en 24 heures chrono !",
    name: 'Marc Dubois',
    status: 'Client depuis 2019',
    avatar: '/assets/avatar-1.jpg',
  },
  {
    quote:
      "J'ai comparé plusieurs assureurs et Jackson offre de loin le meilleur rapport qualité-prix. Leur application mobile est intuitive et leur équipe est toujours à l'écoute.",
    name: 'Sophie Martin',
    status: 'Client depuis 2021',
    avatar: '/assets/avatar-2.jpg',
  },
  {
    quote:
      "En tant que jeune conducteur, je pensais que l'assurance me coûterait une fortune. Jackson m'a proposé une formule adaptée à mon budget sans compromis sur les garanties.",
    name: 'Thomas Bernard',
    status: 'Client depuis 2022',
    avatar: '/assets/avatar-3.jpg',
  },
  {
    quote:
      "Le simulateur en ligne m'a permis de trouver la formule parfaite pour ma famille en quelques clics. Le conseiller qui m'a rappelée a confirmé mon choix avec professionnalisme.",
    name: 'Claire Petit',
    status: 'Client depuis 2020',
    avatar: '/assets/avatar-1.jpg',
  },
  {
    quote:
      'Après un dégât des eaux important, l\'équipe de Jackson a été incroyable. Un interlocuteur dédié, des réponses claires et un règlement rapide. Je recommande les yeux fermés.',
    name: 'Pierre Leroy',
    status: 'Client depuis 2018',
    avatar: '/assets/avatar-3.jpg',
  },
];

const ReassuranceSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedStats, setAnimatedStats] = useState<number[]>([0, 0, 0, 0]);
  const statsAnimated = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // Animate stats on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsAnimated.current) {
          statsAnimated.current = true;
          const duration = 1500;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setAnimatedStats(
              stats.map((s) => {
                if (s.isSpecial) return 0;
                return s.isDecimal ? parseFloat((s.value * eased).toFixed(1)) : Math.round(s.value * eased);
              })
            );

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, testimonials.length - 2));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? Math.max(0, testimonials.length - 3) : prev - 1));
  }, []);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  const formatStat = (value: number, index: number) => {
    const stat = stats[index];
    if (stat.isSpecial) return '24/7';
    if (stat.isDecimal) return value.toFixed(1);
    if (stat.format && value >= 1000) {
      return Math.round(value / 1000) + ' 000';
    }
    return value.toString();
  };

  return (
    <section
      id="reassurance"
      ref={sectionRef}
      className="relative section-padding bg-jackson-cream dark:bg-jackson-night overflow-hidden"
    >
      <AmbientOrb size={300} opacity={0.12} className="-top-20 -left-20" />
      <AmbientOrb size={300} opacity={0.12} className="-bottom-20 -right-20" />

      <div className="relative z-10 section-container">
        
        {/* À propos de nous */}
        <ScrollReveal className="mb-16 md:mb-24">
          <div className="max-w-[800px] mx-auto text-center">
            <SectionLabel className="mb-4">À propos de nous</SectionLabel>
            <h2 className="section-title mb-6">Jackson Assurances</h2>
            <p className="text-lg md:text-xl text-slate-700 dark:text-white/80 leading-relaxed mb-6">
              Créée en 2013 par des promoteurs nationaux, Jackson Assurances est spécialisée dans toutes les branches d’assurance non Vie (Incendie, Accidents, Risques Divers et Transport). Notre équipe dynamique et experte met son savoir-faire à votre service pour vous garantir la meilleure protection.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 font-semibold text-jackson-deep dark:text-jackson-vivid hover:underline">
              Découvrir notre histoire <ChevronRight size={18} />
            </Link>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <ScrollReveal className="mb-16 md:mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-container mx-auto">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center p-6 premium-card bg-white/50 backdrop-blur-sm dark:bg-slate-800/50">
                <p className="font-display text-[40px] md:text-[56px] font-bold text-jackson-deep dark:text-jackson-vivid leading-none mb-3">
                  {formatStat(animatedStats[i], i)}
                  {!stat.isSpecial && stat.suffix}
                </p>
                <p className="text-[15px] font-medium text-slate-600 dark:text-white/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="section-inner">
          {/* Testimonials Title */}
          <ScrollReveal className="text-center mb-16">
            <SectionLabel className="mb-4">Témoignages</SectionLabel>
            <h2 className="section-title mb-4">
              Ils nous font confiance
            </h2>
            <p className="section-subtitle mx-auto">
              Découvrez ce que nos clients disent de leur expérience avec Jackson Assurances.
            </p>
          </ScrollReveal>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Desktop Navigation */}
          <div className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 border border-jackson-deep/10 dark:border-white/10 flex items-center justify-center text-jackson-night dark:text-white hover:bg-jackson-light dark:hover:bg-slate-600 transition-colors shadow-card cursor-pointer"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
          <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 border border-jackson-deep/10 dark:border-white/10 flex items-center justify-center text-jackson-night dark:text-white hover:bg-jackson-light dark:hover:bg-slate-600 transition-colors shadow-card cursor-pointer"
              aria-label="Témoignage suivant"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Mobile: 1 card at a time */}
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
                  avatar={t.avatar}
                  className="shrink-0 w-full"
                />
              ))}
            </div>

            {/* Desktop: 3 cards visible */}
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
                  avatar={t.avatar}
                  className="shrink-0 w-[calc(33.333%-16px)]"
                />
              ))}
            </div>
          </div>

          {/* Mobile pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: typeof window !== 'undefined' && window.innerWidth < 768 ? testimonials.length : Math.max(1, testimonials.length - 2) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                  i === currentSlide ? 'bg-jackson-deep dark:bg-jackson-vivid' : 'bg-jackson-deep/20 dark:bg-white/20'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default ReassuranceSection;
