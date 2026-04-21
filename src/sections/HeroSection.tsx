import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Shield, ArrowRight } from 'lucide-react';
import AmbientOrb from '@/components/AmbientOrb';
import { useAvailability } from '@/hooks/useAvailability';

const stats = [
  { value: 20, suffix: '+', label: "Années d'expérience" },
  { value: 50000, suffix: '+', label: 'Clients protégés', format: true },
  { value: 98, suffix: '%', label: 'Taux de satisfaction' },
  { value: 2, suffix: ' min', label: 'Devis en ligne' },
];

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);
  const isAvailable = useAvailability();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.2
      );

      // Headline word-by-word
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          0.4
        );
      }

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.9
      );

      // CTAs
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        1.1
      );

      // Stats counter animation
      tl.call(
        () => {
          const duration = 1500;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setCounters(
              stats.map((s) => Math.round(s.value * eased))
            );

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        },
        [],
        1.3
      );

      // Stats bar
      tl.fromTo(
        statsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.3
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatNumber = (num: number, index: number) => {
    if (stats[index].format && num >= 1000) {
      return Math.round(num / 1000).toLocaleString('fr-FR') + ' 000';
    }
    return num.toString();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const headlineText = 'Dire ce que nous faisons, faire ce que nous disons.';

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/assets/hero-family.jpg')" }}
      />

      {/* Gradient Overlay — inspired by Dignity Insurance */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(15, 118, 110, 0.75) 50%, rgba(15, 118, 110, 0.45) 100%)',
        }}
      />

      {/* Subtle grain texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
      }} />

      {/* Ambient Orbs */}
      <AmbientOrb size={500} opacity={0.15} className="-bottom-32 -right-32" />
      <AmbientOrb size={300} opacity={0.1} className="top-20 -left-20" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center px-6 lg:px-[5vw] pt-32 pb-12">
        <div className="max-w-[800px]">
          {/* Availability Badge */}
          <div ref={badgeRef} className="mb-8 opacity-0">
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-white text-[13px] font-medium">
              <Shield size={14} className="text-jackson-vivid" />
              {isAvailable
                ? 'Conseillers disponibles maintenant'
                : 'Conseillers disponibles lun-ven 8h30-18h30'}
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display text-[42px] md:text-[56px] lg:text-[72px] font-bold text-white leading-[1.08] mb-6 tracking-tight"
          >
            {headlineText.split(' ').map((word, i) => (
              <span key={i} className="word inline-block mr-[0.25em] opacity-0">
                {word}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-white/75 leading-relaxed max-w-[650px] mb-10 opacity-0"
          >
            Bienvenue à Jackson Assurances. Nous sommes une nouvelle génération d’assureur. Choisissez-nous pour vous protéger et sécuriser vos biens meubles et immeubles.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 opacity-0">
            <a
              href="#formulaire"
              onClick={(e) => handleNavClick(e, '#formulaire')}
              className="group px-8 py-4 bg-white text-jackson-deep font-semibold rounded-xl hover:bg-jackson-cream transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] text-center cursor-pointer flex items-center justify-center gap-2"
            >
              Obtenir mon devis gratuit
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, '#services')}
              className="px-8 py-4 bg-white/8 backdrop-blur-sm border border-white/20 text-white font-medium rounded-xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 text-center cursor-pointer"
            >
              Découvrir nos services
            </a>
          </div>
        </div>
      </div>

      {/* Stats Bar — Floating card style */}
      <div
        ref={statsRef}
        className="relative z-10 mx-6 lg:mx-[5vw] mb-8 opacity-0"
      >
        <div className="max-w-container mx-auto">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/15 rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-3xl md:text-[36px] font-bold text-white tracking-tight">
                    {formatNumber(counters[i], i)}
                    <span className="text-jackson-vivid">{stat.suffix}</span>
                  </p>
                  <p className="text-[13px] text-white/60 mt-1.5 font-medium">{stat.label}</p>
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
