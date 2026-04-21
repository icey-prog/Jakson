import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import ProfileCardNew from '@/components/ProfileCardNew';
import type { ProfileData } from '@/components/ProfileCardNew';

const profiles: ProfileData[] = [
  {
    id: 'etudiant',
    title: 'Étudiant',
    tagline: 'Moins de 25 ans',
    description: 'Solutions économiques adaptées à votre budget et à votre mobilité étudiante.',
    // Illustration : boîte d'épargne bleue avec objets du quotidien (budget/vie active)
    image: '/assets/profile-etudiant.jpg',
    illustrationBg: '#e8ecff',
    priceLabel: 'Dès 3 000 FCFA / mois',
    stat1: { label: 'Produits', value: '3' },
    stat2: { label: 'Budget', value: 'Éco.' },
    icon: 'https://img.icons8.com/fluency/96/student-male.png',
    badge: 'Populaire',
    accentColor: '#0F766E',
    products: ['Individuelle Accident', 'Responsabilité Civile', 'Assurance Voyage'],
  },
  {
    id: 'famille',
    title: 'Famille',
    tagline: 'Parents avec enfants',
    description: 'Couverture complète pour protéger chaque membre de votre foyer au quotidien.',
    // Illustration : personnage protégeant des maisons avec ses grandes mains (protection foyer)
    image: '/assets/profile-famille.jpg',
    illustrationBg: '#f0fdf4',
    priceLabel: 'Dès 12 000 FCFA / mois',
    stat1: { label: 'Produits', value: '5' },
    stat2: { label: 'Budget', value: 'Moyen' },
    icon: 'https://img.icons8.com/fluency/96/family.png',
    accentColor: '#0369A1',
    products: ['Multirisque Habitation', 'Individuelle Accident', 'Assurance Auto', 'RC Vie Privée', 'Assurance Voyage'],
  },
  {
    id: 'pro',
    title: 'Professionnel',
    tagline: 'Indépendant ou salarié',
    description: 'Protégez votre activité, vos biens professionnels et votre responsabilité.',
    // Illustration : jeu de société isométrique avec risques — métaphore de la gestion des risques pro
    image: '/assets/profile-pro.jpg',
    illustrationBg: '#f0f9ff',
    priceLabel: 'Dès 20 000 FCFA / mois',
    stat1: { label: 'Produits', value: '6' },
    stat2: { label: 'Budget', value: 'Pro' },
    icon: 'https://img.icons8.com/fluency/96/businessman.png',
    accentColor: '#7C3AED',
    products: ['RC Décennale', 'Tous Risques Chantier', 'Transport Marchandises', 'Incendie', 'Individuelle Accident', 'RC Pro'],
  },
  {
    id: 'senior',
    title: 'Senior',
    tagline: 'Plus de 60 ans',
    description: 'Sérénité et protection premium adaptées à votre retraite et votre patrimoine.',
    // Illustration : stéthoscope + document médical + familles — santé et suivi médical
    image: '/assets/profile-senior.jpg',
    illustrationBg: '#fefce8',
    priceLabel: 'Dès 8 000 FCFA / mois',
    stat1: { label: 'Produits', value: '4' },
    stat2: { label: 'Budget', value: 'Confort' },
    icon: 'https://img.icons8.com/fluency/96/elderly-person.png',
    accentColor: '#B45309',
    products: ['Multirisque Habitation', 'Individuelle Accident', 'RC Vie Privée', 'Assurance Voyage'],
  },
];

const ProfileSimulator: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const touchStart = useRef(0);

  const handleSelect = (id: string, idx: number) => {
    setCurrent(idx);
    setSelected(prev => (prev === id ? null : id));
  };

  const prev = () => { setCurrent(c => (c - 1 + profiles.length) % profiles.length); setSelected(null); };
  const next = () => { setCurrent(c => (c + 1) % profiles.length); setSelected(null); };

  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
  };

  const selectedProfile = profiles.find(p => p.id === selected);
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#formulaire')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="simulateur" className="section-padding bg-white dark:bg-[#0F172A] overflow-hidden">
      <div className="section-container">
        <div className="section-inner">

          <ScrollReveal className="text-center mb-12">
            <span className="section-badge mb-4">Votre Profil</span>
            <h2 className="section-title mb-4">Quelle assurance vous correspond ?</h2>
            <p className="section-subtitle mx-auto">
              Sélectionnez votre profil — nous vous guidons vers vos meilleures solutions.
            </p>
          </ScrollReveal>

          {/* Carousel track */}
          <div className="relative overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div
              className="flex gap-5 transition-transform duration-500"
              style={{
                transform: `translateX(calc(-${current} * (min(320px, 82vw) + 20px)))`,
                transitionTimingFunction: 'cubic-bezier(0.25,0.1,0.25,1)',
              }}
            >
              {profiles.map((p, i) => (
                <div key={p.id} className="shrink-0 w-[min(320px,82vw)]">
                  <ProfileCardNew profile={p} isActive={selected === p.id} onClick={() => handleSelect(p.id, i)} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots + arrows */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {profiles.map((_, i) => (
                <button key={i} onClick={() => { setCurrent(i); setSelected(null); }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current ? 'w-6 bg-jackson-deep' : 'w-2 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300'}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} aria-label="Précédent"
                className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-white hover:bg-jackson-cream dark:hover:bg-slate-800 hover:border-jackson-deep transition-all cursor-pointer">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} aria-label="Suivant"
                className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-white hover:bg-jackson-cream dark:hover:bg-slate-800 hover:border-jackson-deep transition-all cursor-pointer">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Results panel */}
          {selectedProfile && (
            <div className="mt-8 p-6 md:p-8 rounded-2xl bg-jackson-cream dark:bg-slate-800/60 border border-jackson-deep/10 dark:border-jackson-vivid/10 animate-fade-in-up">
              <p className="text-xs font-bold text-jackson-deep dark:text-jackson-vivid mb-4 uppercase tracking-widest">
                Recommandé pour {selectedProfile.title}
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {selectedProfile.products.map(prod => (
                  <span key={prod} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-white shadow-sm">
                    <Check size={13} className="text-jackson-deep dark:text-jackson-vivid" />
                    {prod}
                  </span>
                ))}
              </div>
              <a href="#formulaire" onClick={scrollToForm} className="btn-primary !py-3 !px-6 text-sm !rounded-xl">
                Obtenir mon devis — {selectedProfile.title}
              </a>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ProfileSimulator;
