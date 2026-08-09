import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Moon, Sun, Phone } from 'lucide-react';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useAvailability } from '@/hooks/useAvailability';
import { useAnchorNav } from '@/hooks/useAnchorNav';

const scrollLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Formules', href: '#comparateur' },
  { label: 'Avis', href: '#reassurance' },
];

/* « Contact » retiré : il pointait sur le formulaire, doublon du bouton « Demander un devis ». */
const pageLinks = [
  { label: 'À propos', to: '/about' },
  { label: 'FAQ', to: '/faq' },
];

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggle } = useDarkMode();
  const isAvailable = useAvailability();
  const location = useLocation();
  const allerAncre = useAnchorNav();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);
    allerAncre(e, href);
  };

  // Apple global-nav style: always dark bg, frosted glass on scroll
  const navBg = scrolled
    ? 'h-[44px] bg-black/85 backdrop-blur-[20px] saturate-180 border-b border-white/10'
    : 'h-[64px] bg-black/70 backdrop-blur-[20px] saturate-180';

  // Nav links: Apple 12px, always white on dark nav
  const linkBase = 'text-[12px] font-normal tracking-[-0.12px] text-white/80 hover:text-white transition-colors duration-150 cursor-pointer';
  const linkActive = 'text-apple-blue-dark';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-container mx-auto h-full flex items-center justify-between px-6 lg:px-[5vw]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 cursor-pointer">
            <img src="/assets/logo-jackson.jpg" alt="Jackson Assurances" className="h-7 w-auto rounded-[5px]" />
            <span className="hidden sm:block text-[14px] font-semibold text-white tracking-[-0.224px]">
              Jackson
            </span>
          </Link>

          {/* Desktop links — Apple nav-link style: 12px centered row */}
          <div className="hidden lg:flex items-center gap-6">
            {scrollLinks.map(link => (
              <a key={link.href} href={link.href} onClick={e => handleScrollLink(e, link.href)}
                className={linkBase}>
                {link.label}
              </a>
            ))}
            {pageLinks.map(link => (
              <Link key={link.to} to={link.to}
                className={`${linkBase} ${location.pathname === link.to ? linkActive : ''}`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Availability badge */}
            <div className={`flex items-center gap-1.5 text-[12px] tracking-[-0.12px] ${
              isAvailable ? 'text-white/70' : 'text-white/40'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-green-400 animate-pulse-dot' : 'bg-white/30'}`} />
              {isAvailable ? 'Disponible' : 'Fermé'}
            </div>

            {/* Dark mode toggle */}
            <button onClick={toggle}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer bg-white/10 hover:bg-white/20 text-white"
              aria-label="Toggle dark mode">
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Primary CTA — Apple blue pill */}
            <Link to="/devis"
              className="inline-flex items-center gap-1.5 px-[18px] py-[8px] bg-apple-blue hover:bg-apple-blue-focus active:scale-95 text-white text-[14px] font-normal tracking-[-0.224px] rounded-full transition-all duration-150 cursor-pointer">
              <Phone size={12} /> Demander un devis
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={toggle}
              className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer bg-white/10 text-white"
              aria-label="Toggle dark mode">
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-white"
              aria-label="Menu">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — Apple style: slide-in panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-apple-tile-1 shadow-float p-8 pt-20">
            <div className="flex flex-col gap-1">
              {scrollLinks.map(link => (
                <a key={link.href} href={link.href} onClick={e => handleScrollLink(e, link.href)}
                  className="text-[17px] font-normal text-white/80 hover:text-white px-4 py-3 rounded-[11px] hover:bg-white/08 transition-all cursor-pointer tracking-[-0.374px]">
                  {link.label}
                </a>
              ))}
              {pageLinks.map(link => (
                <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                  className={`text-[17px] font-normal px-4 py-3 rounded-[11px] transition-all cursor-pointer tracking-[-0.374px] ${
                    location.pathname === link.to
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/08'
                  }`}>
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className={`flex items-center gap-2 text-[12px] mb-5 ${isAvailable ? 'text-green-400' : 'text-white/40'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-green-400 animate-pulse-dot' : 'bg-white/30'}`} />
                  {isAvailable ? 'Conseillers disponibles' : 'Conseillers indisponibles'}
                </div>
              </div>
              <Link to="/devis" onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-apple-blue hover:bg-apple-blue-focus text-white text-[17px] font-normal tracking-[-0.374px] rounded-full transition-all active:scale-95 cursor-pointer">
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
