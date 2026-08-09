import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useAvailability } from '@/hooks/useAvailability';
import { useAnchorNav } from '@/hooks/useAnchorNav';

const scrollLinks = [
  { label: 'Garanties', href: '#services' },
  { label: 'Formules', href: '#comparateur' },
  { label: 'Avis', href: '#reassurance' },
];

const pageLinks = [
  { label: 'À propos', to: '/about' },
  { label: 'FAQ', to: '/faq' },
];

/**
 * Île flottante plutôt que bandeau pleine largeur.
 *
 * Le bandeau noir précédent occupait 96 px de chrome permanent (12 % d'un écran
 * de 812 px), répartissait 10 liens sur deux rangées et coupait la photo du hero
 * avec une couleur absente de la charte. Ici : une seule capsule de 56 px, en
 * verre teinté teal, détachée des bords — la photo passe dessous.
 */
const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggle } = useDarkMode();
  const isAvailable = useAvailability();
  const location = useLocation();
  const allerAncre = useAnchorNav();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);
    allerAncre(e, href);
  };

  const lien =
    'text-[14px] font-normal tracking-[-0.224px] text-apple-ink-80 hover:text-jackson-teal dark:text-white/70 dark:hover:text-white transition-colors duration-150 cursor-pointer';

  return (
    <>
      {/* L'île — détachée du haut, jamais collée aux bords */}
      <div className="fixed inset-x-0 top-2 sm:top-4 z-50 px-3 sm:px-6 lg:px-[5vw] pointer-events-none">
        <div
          className={`pointer-events-auto mx-auto flex h-14 max-w-container items-center gap-3 rounded-full border pl-4 pr-2 sm:pl-6 sm:pr-3 transition-all duration-300 ${
            scrolled
              ? 'border-black/[0.06] shadow-[0_8px_32px_rgba(15,118,110,0.14)] dark:border-white/10'
              : 'border-white/50 shadow-[0_4px_20px_rgba(15,118,110,0.08)] dark:border-white/10'
          }`}
          style={{
            background: isDark
              ? 'linear-gradient(180deg, rgba(6,48,40,0.82), rgba(6,48,40,0.72))'
              : 'linear-gradient(180deg, rgba(255,255,255,0.88), rgba(240,253,250,0.78))',
            backdropFilter: 'saturate(180%) blur(20px)',
            WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          }}
        >
          {/* Marque */}
          <Link to="/" className="flex min-w-0 shrink items-center gap-2.5 cursor-pointer">
            <img src="/assets/logo-jackson.jpg" alt="" className="h-7 w-7 shrink-0 rounded-full object-cover" />
            <span className="truncate text-[15px] sm:text-[17px] font-semibold tracking-[-0.224px] text-apple-ink dark:text-white">
              Jackson Assurance
            </span>
          </Link>

          {/* Liens — une seule rangée, cinq entrées maximum */}
          <div className="ml-auto hidden lg:flex items-center gap-6">
            {scrollLinks.map(link => (
              <a key={link.href} href={`/${link.href}`} onClick={e => handleScrollLink(e, link.href)} className={lien}>
                {link.label}
              </a>
            ))}
            {pageLinks.map(link => (
              <Link key={link.to} to={link.to}
                className={`${lien} ${location.pathname === link.to ? 'text-jackson-teal dark:text-jackson-meadow' : ''}`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="ml-auto flex shrink-0 items-center gap-1.5 lg:ml-0 lg:gap-2.5">
            {/* Disponibilité : point seul en petit écran, point + texte au-delà */}
            <span
              className={`hidden sm:flex items-center gap-1.5 text-[12px] tracking-[-0.12px] ${
                isAvailable ? 'text-jackson-teal dark:text-jackson-meadow' : 'text-apple-ink-48 dark:text-white/40'
              }`}
              title={isAvailable ? 'Conseillers disponibles' : 'Conseillers indisponibles'}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${isAvailable ? 'bg-jackson-meadow animate-pulse-dot' : 'bg-apple-ink-48/50'}`} />
              <span className="hidden xl:inline">{isAvailable ? 'Disponible' : 'Fermé'}</span>
            </span>

            <button onClick={toggle}
              className="grid h-8 w-8 place-items-center rounded-full text-apple-ink-48 hover:text-apple-ink dark:text-white/60 dark:hover:text-white transition-colors duration-150 cursor-pointer"
              aria-label="Basculer le mode sombre">
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <Link
              to="/devis"
              className="inline-flex h-9 items-center rounded-full bg-apple-blue px-4 text-[13px] sm:text-[14px] font-normal tracking-[-0.224px] text-white hover:bg-apple-blue-focus active:scale-95 transition-all duration-150 cursor-pointer whitespace-nowrap"
            >
              <span className="sm:hidden">Devis</span>
              <span className="hidden sm:inline">Demander un devis</span>
            </Link>

            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="grid h-9 w-9 place-items-center rounded-full text-apple-ink dark:text-white lg:hidden cursor-pointer"
              aria-label="Menu" aria-expanded={mobileOpen}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Panneau mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-jackson-night shadow-float p-6 pt-24">
            <div className="flex flex-col gap-1">
              {scrollLinks.map(link => (
                <a key={link.href} href={`/${link.href}`} onClick={e => handleScrollLink(e, link.href)}
                  className="rounded-[11px] px-4 py-3 text-[17px] font-normal tracking-[-0.374px] text-apple-ink hover:bg-jackson-cream dark:text-white/80 dark:hover:bg-white/[0.08] transition-all cursor-pointer">
                  {link.label}
                </a>
              ))}
              {pageLinks.map(link => (
                <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                  className={`rounded-[11px] px-4 py-3 text-[17px] font-normal tracking-[-0.374px] transition-all cursor-pointer ${
                    location.pathname === link.to
                      ? 'bg-jackson-cream text-jackson-teal dark:bg-white/10 dark:text-white'
                      : 'text-apple-ink hover:bg-jackson-cream dark:text-white/80 dark:hover:bg-white/[0.08]'
                  }`}>
                  {link.label}
                </Link>
              ))}

              <div className="mt-6 border-t border-apple-hairline dark:border-white/10 pt-6">
                <div className={`mb-5 flex items-center gap-2 text-[12px] ${isAvailable ? 'text-jackson-teal dark:text-jackson-meadow' : 'text-apple-ink-48'}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${isAvailable ? 'bg-jackson-meadow animate-pulse-dot' : 'bg-apple-ink-48/50'}`} />
                  {isAvailable ? 'Conseillers disponibles' : 'Conseillers indisponibles'}
                </div>
                <Link to="/devis" onClick={() => setMobileOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-apple-blue px-6 py-3 text-[17px] font-normal tracking-[-0.374px] text-white hover:bg-apple-blue-focus active:scale-95 transition-all cursor-pointer">
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
