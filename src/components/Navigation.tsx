import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X, Moon, Sun, Phone } from 'lucide-react';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useAvailability } from '@/hooks/useAvailability';

const scrollLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Formules', href: '#comparateur' },
  { label: 'Avis', href: '#reassurance' },
  { label: 'Contact', href: '#formulaire' },
];

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
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (isHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 400);
    }
  };

  const navBg = scrolled
    ? 'h-[68px] bg-white/90 dark:bg-jackson-night/90 backdrop-blur-2xl border-b border-slate-200/60 dark:border-slate-700/40 shadow-soft'
    : 'h-[80px] bg-transparent';

  const linkBase = scrolled
    ? 'text-slate-600 dark:text-white/70 hover:text-jackson-deep dark:hover:text-jackson-vivid hover:bg-jackson-cream dark:hover:bg-slate-800'
    : 'text-white/80 hover:text-white hover:bg-white/10';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-container mx-auto h-full flex items-center justify-between px-6 lg:px-[5vw]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 cursor-pointer">
            <img src="/assets/logo-jackson.jpg" alt="Jackson Assurances" className="h-10 w-auto rounded-lg" />
            <span className={`hidden sm:block font-display font-bold text-lg transition-colors duration-300 ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
              Jackson
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {scrollLinks.map(link => (
              <a key={link.href} href={link.href} onClick={e => handleScrollLink(e, link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-250 cursor-pointer ${linkBase}`}>
                {link.label}
              </a>
            ))}
            {pageLinks.map(link => (
              <Link key={link.to} to={link.to}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-250 cursor-pointer ${linkBase} ${location.pathname === link.to ? 'text-jackson-deep dark:text-jackson-vivid bg-jackson-cream dark:bg-slate-800' : ''}`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              scrolled
                ? isAvailable ? 'bg-teal-50 dark:bg-teal-900/30 text-jackson-deep dark:text-jackson-vivid' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                : isAvailable ? 'bg-white/15 text-white' : 'bg-white/10 text-white/60'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-jackson-vivid animate-pulse-dot' : 'bg-slate-400'}`} />
              {isAvailable ? 'Disponible' : 'Indisponible'}
            </div>
            <button onClick={toggle}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-250 cursor-pointer ${
                scrolled ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700' : 'bg-white/10 text-white hover:bg-white/20'
              }`} aria-label="Toggle dark mode">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="#formulaire" onClick={e => handleScrollLink(e, '#formulaire')} className="btn-primary !py-2.5 !px-6 text-sm !rounded-xl">
              <Phone size={14} /> Devis gratuit
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={toggle}
              className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer ${scrolled ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-white' : 'bg-white/10 text-white'}`}
              aria-label="Toggle dark mode">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}
              aria-label="Menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-jackson-night shadow-float p-8 pt-24">
            <div className="flex flex-col gap-2">
              {scrollLinks.map(link => (
                <a key={link.href} href={link.href} onClick={e => handleScrollLink(e, link.href)}
                  className="text-lg font-medium text-slate-700 dark:text-white px-4 py-3 rounded-xl hover:bg-jackson-cream dark:hover:bg-slate-800 hover:text-jackson-deep dark:hover:text-jackson-vivid transition-all cursor-pointer">
                  {link.label}
                </a>
              ))}
              {pageLinks.map(link => (
                <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                  className={`text-lg font-medium px-4 py-3 rounded-xl transition-all cursor-pointer ${location.pathname === link.to ? 'bg-jackson-cream dark:bg-slate-800 text-jackson-deep dark:text-jackson-vivid' : 'text-slate-700 dark:text-white hover:bg-jackson-cream dark:hover:bg-slate-800 hover:text-jackson-deep dark:hover:text-jackson-vivid'}`}>
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium w-fit mb-4 ${isAvailable ? 'bg-teal-50 text-jackson-deep dark:bg-teal-900/30 dark:text-jackson-vivid' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-jackson-vivid animate-pulse-dot' : 'bg-slate-400'}`} />
                  {isAvailable ? 'Conseillers disponibles' : 'Indisponibles'}
                </div>
              </div>
              <a href="#formulaire" onClick={e => handleScrollLink(e, '#formulaire')} className="btn-primary text-center !rounded-xl">
                Obtenir un devis
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
