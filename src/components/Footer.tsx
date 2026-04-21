import React from 'react';
import { Linkedin, Facebook } from 'lucide-react';

const footerNav = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Nos Services', href: '#services' },
  { label: 'Nos Formules', href: '#comparateur' },
  { label: 'Témoignages', href: '#reassurance' },
  { label: 'Partenaires', href: '#partenaires' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#formulaire' },
];

const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-jackson-night text-white section-padding !pb-10">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-container mx-auto">
          {/* Column 1: Logo & Description */}
          <div>
            <img
              src="/assets/logo-jackson.jpg"
              alt="Jackson Assurances"
              className="h-12 w-auto rounded-sm brightness-0 invert"
            />
            <p className="mt-5 text-sm text-white/60 leading-relaxed">
              Société Anonyme au capital de 5 000 000 000 F CFA.
              <br/><br/>
              Jackson Assurances, dire ce que nous faisons, faire ce que nous disons.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-display text-base font-semibold mb-5">Navigation</h4>
            <ul className="space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm text-white/60 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 cursor-pointer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Nos Produits */}
          <div>
            <h4 className="font-display text-base font-semibold mb-5">Nos Produits</h4>
            <ul className="space-y-3">
              {['Auto / Moto', 'Incendie & Habitation', 'Individuelle Accident', 'Transport', 'Risques Divers'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-white/60">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-display text-base font-semibold mb-5">Contact</h4>
            <div className="space-y-3 text-sm">
              <p className="text-white/60">
                Avenue TANSOBA Goolma<br/>
                01 BP 2545 Ouagadougou 01<br/>
                Face au CCVA
              </p>
              <a href="tel:+22625380200" className="block text-white font-medium hover:text-jackson-vivid transition-colors cursor-pointer">
                +226 25 38 02 00
              </a>
              <a href="tel:+22625380300" className="block text-white font-medium hover:text-jackson-vivid transition-colors cursor-pointer">
                +226 25 38 03 00
              </a>
              <a href="mailto:infos@jacksonassurances.com" className="block text-white font-medium hover:text-jackson-vivid transition-colors cursor-pointer">
                infos@jacksonassurances.com
              </a>
            </div>
            <div className="flex items-center gap-4 mt-6">
              {[
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Facebook, label: 'Facebook' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-white/40 hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer"
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Jackson Assurances. Tous droits réservés.
          </p>
          <div className="text-xs text-white/40 space-x-4">
            <a href="#" className="hover:text-white/60 transition-colors cursor-pointer" onClick={(e) => e.preventDefault()}>
              Mentions légales
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white/60 transition-colors cursor-pointer" onClick={(e) => e.preventDefault()}>
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
