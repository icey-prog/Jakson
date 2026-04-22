import React, { useEffect, useRef } from 'react';
import SectionLabel from '@/components/SectionLabel';

const partners = [
  { name: 'Africa Re',      abbr: 'AR', color: '#1e3a5f' },
  { name: 'Continental Re', abbr: 'CR', color: '#0F766E' },
  { name: 'NCARE',          abbr: 'NC', color: '#7c3aed' },
  { name: 'CICARE',         abbr: 'CI', color: '#b45309' },
  { name: 'CICA-RE',        abbr: 'CA', color: '#0369a1' },
  { name: 'SEN-RE',         abbr: 'SR', color: '#166534' },
];

// Spread 6 items in a fan arc (-75° → +75°)
const ORBIT_ANGLES = [-75, -45, -15, 15, 45, 75];

const getRadius = (): number => {
  if (typeof window === 'undefined') return 560;
  if (window.innerWidth < 640)  return 290;
  if (window.innerWidth < 1024) return 420;
  return 560;
};

const PartnersSection: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number>(0);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const items    = Array.from(ring.querySelectorAll<HTMLElement>('[data-orbit-item]'));
    const contents = Array.from(ring.querySelectorAll<HTMLElement>('[data-orbit-content]'));

    let rotation = 0;

    const tick = () => {
      rotation -= 0.04;
      ring.style.transform = `rotate(${rotation}deg)`;

      const r = getRadius();
      items.forEach((item, i) => {
        item.style.transform = `rotate(${ORBIT_ANGLES[i]}deg) translateY(${r}px)`;
      });
      // Counter-rotate content so text stays upright despite ring spin
      contents.forEach((content, i) => {
        content.style.transform = `rotate(${-ORBIT_ANGLES[i] - rotation}deg)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section
      id="partenaires"
      className="relative overflow-hidden bg-jackson-night text-white flex flex-col items-center pt-56 pb-20 px-6"
    >
      {/* Brand teal radial glow at top */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(15,118,110,0.20) 0%, transparent 55%)' }}
      />

      {/* Orbit anchor — slightly above section top */}
      <div className="absolute top-[-60px] md:top-[-100px] left-1/2 -translate-x-1/2 w-0 h-0 z-0 pointer-events-none">
        <div ref={ringRef} className="relative w-0 h-0">
          {partners.map((partner) => (
            <div
              key={partner.name}
              data-orbit-item=""
              className="absolute -ml-14 -mt-14 w-28 h-28"
            >
              <div
                data-orbit-content=""
                className="w-full h-full rounded-[1.75rem] flex flex-col items-center justify-center gap-1.5
                  bg-slate-800/70 border border-white/10 backdrop-blur-sm
                  shadow-[0_0_40px_-10px_rgba(0,0,0,0.8)]"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: partner.color }}
                >
                  {partner.abbr}
                </div>
                <span className="text-[10px] font-medium text-white/55 whitespace-nowrap text-center leading-tight px-2">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <SectionLabel dark className="mb-6">Nos Partenaires</SectionLabel>
        <h2 className="section-title text-white mb-4">
          Des réassureurs de confiance
        </h2>
        <p className="section-subtitle text-white/60 mx-auto">
          Jackson Assurances s&apos;appuie sur un réseau solide de réassureurs
          internationaux pour vous offrir des garanties robustes.
        </p>
      </div>

      {/* Trust statement */}
      <div className="relative z-10 mt-14 w-full max-w-2xl">
        <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <p className="text-white/75 leading-relaxed">
            <span className="font-semibold text-jackson-vivid">
              Agréée par le Ministère chargé des Finances du Burkina Faso,
            </span>{' '}
            Jackson Assurances opère sous le contrôle de la CRCA-UMOA
            et respecte les normes du Traité CIMA.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
