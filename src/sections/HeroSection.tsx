import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import AmbientOrb from '@/components/AmbientOrb';
import { useAvailability } from '@/hooks/useAvailability';

const stats = [
  { value: 20,    suffix: '+',  label: "Années d'expérience" },
  { value: 50000, suffix: '+',  label: 'Clients protégés', format: true },
  { value: 98,    suffix: '%',  label: 'Satisfaction client' },
];

const HeroSection: React.FC = () => {
  const navigate    = useNavigate();
  const sectionRef  = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState<number[]>([0, 0, 0]);
  const isAvailable = useAvailability();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current,    { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 0.2);

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(words, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.07 }, 0.4);
      }

      tl.fromTo(subtitleRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.85);
      tl.fromTo(ctaRef.current,      { opacity: 0, y: 8  }, { opacity: 1, y: 0, duration: 0.4 }, 1.05);

      tl.call(() => {
        const duration = 1400;
        const startTime = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          setCounters(stats.map(s => Math.round(s.value * eased)));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }, [], 1.2);

      tl.fromTo(statsRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 1.2);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatNumber = (num: number, index: number) => {
    if ((stats[index] as any).isZero) return '0';
    if ((stats[index] as any).format && num >= 1000) return Math.round(num / 1000).toLocaleString('fr-FR') + ' 000';
    return num.toString();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Headline split into words for stagger animation
  const headlineWords = ['Assurer', 'ce qui', 'compte', 'pour vous.'];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
    >
      {/* Background photo */}
      {/* L'image est carrée (1:1) : sur un hero large, un cadrage centré couperait
          les visages. On ancre à 30 % de hauteur pour les garder dans le champ. */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat scale-105"
        style={{
          backgroundImage: "url('/assets/Family.jpg')",
          backgroundPosition: 'center 30%',
        }}
      />

      {/* Dark overlay — Apple photography-first: let the image breathe */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.30) 100%)' }}
      />

      {/* Decorative gradient glow (conservé) */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 0% 70%, rgba(15,118,110,0.18), transparent)' }} />

      {/* Ambient Orbs (conservés) */}
      <AmbientOrb size={500} opacity={0.12} className="-bottom-32 -right-32" />
      <AmbientOrb size={280} opacity={0.09} className="top-20 -left-20" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center px-6 lg:px-[5vw] pt-36 pb-12">
        <div className="max-w-[760px]">

          {/* Availability badge */}
          <div ref={badgeRef} className="mb-8 opacity-0">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-white text-[12px] font-normal tracking-[-0.12px]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot" />
              {isAvailable
                ? 'Conseillers disponibles · Ouaga & Bobo'
                : 'Lun-Ven 7h30-16h30 · Sam 8h-12h'}
            </span>
          </div>

          {/* Headline — Apple hero-display style */}
          <h1
            ref={headlineRef}
            className="font-display font-semibold text-white leading-[1.07] tracking-[-0.28px] mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 56px)' }}
          >
            {headlineWords.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.22em] opacity-0">
                {word}
              </span>
            ))}
          </h1>

          {/* Subtitle — Apple lead style, 17px */}
          <p
            ref={subtitleRef}
            className="text-[17px] text-white/75 leading-[1.47] tracking-[-0.374px] max-w-[600px] mb-10 opacity-0"
          >
            Depuis 2013 à Ouagadougou, Jackson Assurances couvre votre véhicule, votre habitation
            et votre activité — avec un conseiller dédié et un règlement rapide des sinistres.
          </p>

          {/* CTAs — Apple two-pill grammar */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 opacity-0">
            <a
              href="/devis"
              onClick={e => { e.preventDefault(); navigate('/devis'); }}
              className="inline-flex items-center justify-center gap-2 px-[22px] py-[11px] bg-apple-blue hover:bg-apple-blue-focus active:scale-95 text-white text-[17px] font-normal tracking-[-0.374px] rounded-full transition-all duration-150 cursor-pointer"
            >
              Demander un devis
              <ArrowRight size={15} />
            </a>
            <a
              href="#services"
              onClick={e => handleNavClick(e, '#services')}
              className="inline-flex items-center justify-center gap-2 px-[22px] py-[11px] bg-transparent border border-white/40 hover:border-white/70 text-white text-[17px] font-normal tracking-[-0.374px] rounded-full transition-all duration-150 cursor-pointer"
            >
              Découvrir nos services
            </a>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div ref={statsRef} className="relative z-10 mx-6 lg:mx-[5vw] mb-8 opacity-0">
        <div className="max-w-container mx-auto">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/12 rounded-[18px] p-5 sm:p-6 md:p-8">
            {/* gap resserré et libellés fluides : à 320 px, un gap de 24 px laissait
                58 px par colonne, trop peu pour « Années d'expérience ». */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8">
              {stats.map((stat, i) => (
                <div key={stat.label} className="min-w-0 text-center">
                  <p className="font-display font-semibold text-white leading-[1.07] tracking-[-0.28px]"
                    style={{ fontSize: 'clamp(1.5rem, 6vw, 36px)' }}>
                    {formatNumber(counters[i], i)}
                    <span className="text-apple-blue-dark">{stat.suffix}</span>
                  </p>
                  <p className="mt-1.5 text-[11px] sm:text-[12px] leading-snug text-white/60 tracking-[-0.12px] hyphens-auto">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
