import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SOSButton from '@/components/SOSButton';
import ScrollReveal from '@/components/ScrollReveal';
import { ALL_SERVICES } from '@/sections/ServicesSection';

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-jackson-night">
      <Navigation />
      <main className="pt-28 pb-20">
        <div className="section-container">
          <div className="section-inner">

            {/* Back */}
            <ScrollReveal className="mb-10">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-white/60 hover:text-jackson-deep dark:hover:text-jackson-vivid transition-colors">
                <ArrowLeft size={16} /> Retour à l'accueil
              </Link>
            </ScrollReveal>

            {/* Header */}
            <ScrollReveal className="mb-16 max-w-2xl">
              <span className="section-badge mb-4">Nos Solutions</span>
              <h1 className="section-title mb-4">
                10 assurances pour protéger chaque aspect de votre vie
              </h1>
              <p className="section-subtitle">
                Jackson Assurances est spécialisée en IARDT — Incendie, Accidents, Risques Divers et Transport.
                Toutes nos solutions sont disponibles à Ouagadougou et Bobo-Dioulasso.
              </p>
            </ScrollReveal>

            {/* Full grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {ALL_SERVICES.map((service, i) => (
                <ScrollReveal key={service.title} delay={i * 60}>
                  <div
                    className="group relative p-7 rounded-[24px] overflow-hidden cursor-pointer
                      transition-all duration-300 hover:scale-[1.02]
                      hover:shadow-[0_16px_48px_rgba(15,23,42,0.10)]
                      border border-transparent hover:border-white/60"
                    style={{ backgroundColor: service.bgLight }}
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm"
                      style={{ backgroundColor: service.iconBg + '20' }}>
                      <img src={service.icon} alt={service.title} className="w-8 h-8 object-contain" loading="lazy" />
                    </div>

                    {service.tag && (
                      <span className="absolute top-5 right-5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[11px] font-bold text-slate-700">
                        {service.tag}
                      </span>
                    )}

                    <h3 className="font-body font-bold text-[19px] text-slate-900 mb-2">{service.title}</h3>
                    <p className="text-[14px] text-slate-600 leading-relaxed mb-5">{service.description}</p>

                    <a
                      href="/#formulaire"
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-700 group-hover:gap-2.5 transition-all duration-200"
                    >
                      Demander un devis <ArrowRight size={13} />
                    </a>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* CTA */}
            <ScrollReveal className="mt-16 text-center">
              <p className="text-slate-500 dark:text-white/60 mb-5">
                Besoin d'aide pour choisir ?
              </p>
              <Link to="/#formulaire" className="btn-primary !rounded-xl">
                Parler à un conseiller
              </Link>
            </ScrollReveal>

          </div>
        </div>
      </main>
      <Footer />
      <SOSButton />
    </div>
  );
};

export default ServicesPage;
