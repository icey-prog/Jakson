import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SOSButton from '@/components/SOSButton';
import ScrollReveal from '@/components/ScrollReveal';
import AmbientOrb from '@/components/AmbientOrb';

const stats = [
  { value: 2013, suffix: '', label: 'Année de création', display: '2013' },
  { value: 5, suffix: ' Md', label: 'Capital FCFA', display: '5 Mds' },
  { value: 50000, suffix: '+', label: 'Clients assurés', display: '50 000+' },
  { value: 10, suffix: '', label: 'Branches assurance', display: '10' },
];

const offices = [
  {
    name: 'Siège Social — Ouagadougou',
    address: 'Avenue TANSOBA Goolma, 01 BP 2545\nOuagadougou 01 (face au CCVA)',
    phone: '+226 25 38 02 00 / +226 25 38 03 00',
    email: 'infos@jacksonassurances.com',
    hours: 'Lun–Ven 7h30–16h30 | Sam 8h–12h',
  },
  {
    name: 'Agence UEMOA — Ouagadougou',
    address: 'Avenue UEMOA\nOuagadougou',
    phone: '+226 25 38 02 00',
    email: 'infos@jacksonassurances.com',
    hours: 'Lun–Ven 7h30–16h30 | Sam 8h–12h',
  },
  {
    name: 'Agence — Bobo-Dioulasso',
    address: 'Bobo-Dioulasso\nBurkina Faso',
    phone: '+226 25 38 02 00',
    email: 'infos@jacksonassurances.com',
    hours: 'Lun–Ven 8h00–16h00',
  },
];

const AboutPage: React.FC = () => {
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const statsRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const duration = 1400;
        const start = performance.now();
        const animate = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const e = 1 - Math.pow(1 - p, 3);
          setCounters(stats.map(s => Math.round(s.value * e)));
          if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-jackson-night">
      <Navigation />
      <main>

        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-jackson-deep overflow-hidden">
          <AmbientOrb size={500} opacity={0.2} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 section-container">
            <div className="section-inner">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors mb-10">
                <ArrowLeft size={16} /> Retour
              </Link>
              <span className="section-badge !text-jackson-vivid !border-jackson-vivid/30 !bg-jackson-vivid/10 mb-6">
                À Propos
              </span>
              <h1 className="font-body font-black text-white text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] tracking-tight mb-6 max-w-2xl">
                Dire ce que nous faisons, faire ce que nous disons.
              </h1>
              <p className="text-lg text-white/75 max-w-xl leading-relaxed">
                Depuis 2013, Jackson Assurances protège les familles, les professionnels et les biens
                au Burkina Faso avec intégrité et expertise.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding">
          <div className="section-container">
            <div className="section-inner">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <ScrollReveal>
                  <span className="section-badge mb-5">Notre Histoire</span>
                  <h2 className="section-title mb-6">Une entreprise née de la vision de promoteurs nationaux</h2>
                  <p className="text-slate-600 dark:text-white/70 leading-relaxed mb-4">
                    Société Anonyme au capital de <strong className="text-slate-900 dark:text-white">5 000 000 000 F CFA</strong>,
                    entièrement libéré, Jackson Assurances a été créée par des promoteurs nationaux burkinabè.
                    Elle a débuté ses activités en <strong className="text-slate-900 dark:text-white">janvier 2013</strong>.
                  </p>
                  <p className="text-slate-600 dark:text-white/70 leading-relaxed mb-4">
                    Située sur l'Avenue TANSOBA Goolma à Ouagadougou, elle est dirigée par une équipe dynamique,
                    pétrie de nombreuses années d'expérience dans le secteur des assurances au Burkina Faso.
                  </p>
                  <p className="text-slate-600 dark:text-white/70 leading-relaxed">
                    La société est spécialisée dans toutes les branches d'assurance non-Vie —
                    <strong className="text-slate-900 dark:text-white"> Incendie, Accidents, Risques Divers et Transport (IARDT)</strong> —
                    et opère sous agrément du Ministère des Finances, dans le cadre du <strong className="text-slate-900 dark:text-white">Traité CIMA</strong>.
                  </p>
                </ScrollReveal>

                {/* Stats */}
                <ScrollReveal delay={200}>
                  <div ref={statsRef} className="grid grid-cols-2 gap-5">
                    {stats.map((s, i) => (
                      <div key={s.label} className="p-6 rounded-2xl bg-jackson-cream dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/40">
                        <p className="font-body font-black text-[36px] text-jackson-deep dark:text-jackson-vivid leading-none mb-2">
                          {i === 0 ? stats[0].display : i === 3 ? stats[3].display : counters[i].toLocaleString('fr-FR') + s.suffix}
                        </p>
                        <p className="text-[13px] font-medium text-slate-500 dark:text-white/60">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Offices */}
        <section className="section-padding bg-jackson-cream dark:bg-slate-900/50">
          <div className="section-container">
            <div className="section-inner">
              <ScrollReveal className="text-center mb-14">
                <span className="section-badge mb-4">Nos Agences</span>
                <h2 className="section-title mb-4">Présents partout au Burkina Faso</h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
                {offices.map((office, i) => (
                  <ScrollReveal key={office.name} delay={i * 100}>
                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/40 hover:border-jackson-deep/20 transition-all duration-300 hover:shadow-card h-full">
                      <h3 className="font-bold text-[16px] text-slate-900 dark:text-white mb-4">{office.name}</h3>
                      <div className="space-y-3 text-[13px] text-slate-600 dark:text-white/60">
                        <div className="flex gap-2"><MapPin size={14} className="text-jackson-deep dark:text-jackson-vivid mt-0.5 shrink-0" /><span className="whitespace-pre-line">{office.address}</span></div>
                        <div className="flex gap-2"><Phone size={14} className="text-jackson-deep dark:text-jackson-vivid mt-0.5 shrink-0" /><a href={`tel:${office.phone.replace(/\s/g,'')}`} className="hover:text-jackson-deep dark:hover:text-jackson-vivid transition-colors">{office.phone}</a></div>
                        <div className="flex gap-2"><Mail size={14} className="text-jackson-deep dark:text-jackson-vivid mt-0.5 shrink-0" /><a href={`mailto:${office.email}`} className="hover:text-jackson-deep transition-colors">{office.email}</a></div>
                        <div className="flex gap-2"><Clock size={14} className="text-jackson-deep dark:text-jackson-vivid mt-0.5 shrink-0" /><span>{office.hours}</span></div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <SOSButton />
    </div>
  );
};

export default AboutPage;
