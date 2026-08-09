import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, GraduationCap, Users, Briefcase, Shield } from 'lucide-react';
import { Link } from 'react-router';
import ScrollReveal from '@/components/ScrollReveal';
import ProfileCardNew from '@/components/ProfileCardNew';
import type { ProfileData } from '@/components/ProfileCardNew';

const profiles: ProfileData[] = [
  {
    id: 'etudiant',
    title: 'Étudiant',
    tagline: 'Moins de 25 ans',
    description: 'Solutions économiques adaptées à votre budget et à votre mobilité étudiante.',
    image: '/assets/profile-etudiant.jpg', // L'image 3.png
    illustrationBg: '#e8ecff',
    priceLabel: 'Dès 3 000 FCFA / mois',
    stat1: { label: 'Produits', value: '3' },
    stat2: { label: 'Budget', value: 'Éco.' },
    icon: GraduationCap,
    badge: 'Populaire',
    // Couleur d'accent inspirée de la pièce d'or et de l'épargne.
    accentColor: '#F5A623',
    // Gradient de carte inspiré des tons de l'arrière-plan de l'image 3.png.
    cardBg: '#0E1128',
    cardBgGradient: 'linear-gradient(160deg, #0E1128 0%, #1A237E 100%)', // Bleu profond vers bleu royal.
    products: ['Individuelle Accident', 'Responsabilité Civile', 'Assurance Voyage'],
  },
  {
    id: 'famille',
    title: 'Famille',
    tagline: 'Parents avec enfants',
    description: 'Couverture complète pour protéger chaque membre de votre foyer au quotidien.',
    image: '/assets/profile-famille.jpg', // L'image 1.png
    illustrationBg: '#fdfce8',
    priceLabel: 'Dès 12 000 FCFA / mois',
    stat1: { label: 'Produits', value: '5' },
    stat2: { label: 'Budget', value: 'Moyen' },
    icon: Users,
    // Couleur d'accent inspirée de la robe orange et de la main corail.
    accentColor: '#FF8C00',
    // Gradient de carte inspiré de la pelouse et de la barrière d'or.
    cardBg: '#3B5323',
    cardBgGradient: 'linear-gradient(160deg, #3B5323 0%, #A5B35C 100%)', // Vert olive profond vers or vert doux.
    products: ['Multirisque Habitation', 'Individuelle Accident', 'Assurance Auto', 'RC Vie Privée', 'Assurance Voyage'],
  },
  {
    id: 'pro',
    title: 'Professionnel',
    tagline: 'Indépendant ou salarié',
    description: 'Protégez votre activité, vos biens professionnels et votre responsabilité.',
    image: '/assets/profile-pro.jpg', // L'image 2.png
    illustrationBg: '#f0f9ff',
    priceLabel: 'Dès 20 000 FCFA / mois',
    stat1: { label: 'Produits', value: '6' },
    stat2: { label: 'Budget', value: 'Pro' },
    icon: Briefcase,
    // Couleur d'accent inspirée de la peau corail et des pions rouges/orange.
    accentColor: '#FF6F61',
    // Gradient de carte inspiré du bleu du plateau de jeu et de l'arrière-plan.
    cardBg: '#0A2351',
    cardBgGradient: 'linear-gradient(160deg, #0A2351 0%, #1565C0 100%)', // Bleu marine profond vers bleu royal vif.
    products: ['RC Décennale', 'Tous Risques Chantier', 'Transport Marchandises', 'Incendie', 'Individuelle Accident', 'RC Pro'],
  },
  {
    id: 'senior',
    title: 'Senior',
    tagline: 'Plus de 60 ans',
    description: 'Sérénité et protection premium adaptées à votre retraite et votre patrimoine.',
    image: '/assets/profile-senior.jpg', // L'image 0.png
    illustrationBg: '#fefce8',
    priceLabel: 'Dès 8 000 FCFA / mois',
    stat1: { label: 'Produits', value: '4' },
    stat2: { label: 'Budget', value: 'Confort' },
    icon: Shield,
    // Couleur d'accent inspirée de la peau corail douce et de la chaise rose.
    accentColor: '#FF7F50',
    // Gradient de carte inspiré de la pelouse et du bureau en or/jaune.
    cardBg: '#064E3B',
    cardBgGradient: 'linear-gradient(160deg, #064E3B 0%, #B8860B 100%)', // Vert sapin profond vers or patiné.
    products: ['Multirisque Habitation', 'Individuelle Accident', 'RC Vie Privée', 'Assurance Voyage'],
  },
];

const ProfileSimulator: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement;
    if (card) el.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    setCurrent(idx);
  }, []);

  const prev = useCallback(() => {
    const next = Math.max(0, current - 1);
    scrollTo(next);
    setSelected(null);
  }, [current, scrollTo]);

  const next = useCallback(() => {
    const nextIdx = Math.min(profiles.length - 1, current + 1);
    scrollTo(nextIdx);
    setSelected(null);
  }, [current, scrollTo]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const scrollMid = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      if (i >= profiles.length) return;
      const mid = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(mid - scrollMid);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setCurrent(closest);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSelect = (id: string, idx: number) => {
    setCurrent(idx);
    setSelected(prev => (prev === id ? null : id));
    scrollTo(idx);
  };

  const selectedProfile = profiles.find(p => p.id === selected);

  return (
    <section id="profil" className="section-padding tile-parchment overflow-hidden">
      <div className="section-container">
        <div className="section-inner">

          <ScrollReveal className="text-center mb-12">
            <span className="section-badge mb-4">Votre Profil</span>
            <h2 className="section-title mb-4">Trouvez votre formule idéale.</h2>
            <p className="section-subtitle mx-auto">
              Validée par votre conseiller en moins de 15 minutes. Devis sans engagement.
            </p>
          </ScrollReveal>

          {/* Carousel — CSS scroll-snap, no JS transform */}
          <div
            ref={scrollRef}
            className="flex items-stretch gap-5 overflow-x-auto snap-x snap-mandatory pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {profiles.map((p, i) => (
              <div
                key={p.id}
                className="snap-start shrink-0 w-[min(320px,82vw)] flex"
              >
                <ProfileCardNew
                  profile={p}
                  isActive={selected === p.id}
                  onClick={() => handleSelect(p.id, i)}
                />
              </div>
            ))}
            {/* trailing spacer so last card snaps to start without empty gap on desktop */}
            <div className="shrink-0 w-px" aria-hidden />
          </div>

          {/* Dots + arrows */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {profiles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { scrollTo(i); setSelected(null); }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === current ? 'w-6 bg-apple-blue' : 'w-2 bg-apple-hairline hover:bg-apple-ink-48'
                  }`}
                  aria-label={`Profil ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                disabled={current === 0}
                aria-label="Précédent"
                className="w-11 h-11 rounded-full border border-apple-hairline flex items-center justify-center text-apple-ink hover:border-apple-blue hover:text-apple-blue disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer bg-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                disabled={current === profiles.length - 1}
                aria-label="Suivant"
                className="w-11 h-11 rounded-full border border-apple-hairline flex items-center justify-center text-apple-ink hover:border-apple-blue hover:text-apple-blue disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer bg-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Results panel */}
          {selectedProfile && (
            <div className="mt-8 p-6 md:p-8 rounded-[18px] bg-white border border-apple-hairline animate-fade-in-up">
              <p className="text-[12px] font-semibold text-apple-blue mb-4 tracking-[-0.12px] uppercase">
                Recommandé pour {selectedProfile.title}
              </p>
              <div className="flex flex-wrap gap-2.5 mb-6">
                {selectedProfile.products.map(prod => (
                  <span key={prod} className="inline-flex items-center gap-1.5 px-[14px] py-[8px] rounded-[11px] bg-apple-parchment border border-apple-hairline text-[14px] text-apple-ink tracking-[-0.224px]">
                    <Check size={12} className="text-apple-blue" />
                    {prod}
                  </span>
                ))}
              </div>
              {/* Un seul appel : le tunnel de devis. */}
              <Link
                to="/devis"
                className="inline-flex items-center gap-1.5 px-[22px] py-[11px] bg-apple-blue hover:bg-apple-blue-focus active:scale-95 text-white text-[17px] font-normal tracking-[-0.374px] rounded-full transition-all duration-150 cursor-pointer"
              >
                Demander un devis — {selectedProfile.title}
              </Link>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ProfileSimulator;
