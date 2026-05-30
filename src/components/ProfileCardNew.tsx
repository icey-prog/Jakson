import React, { useRef } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface ProfileData {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  illustrationBg?: string;
  priceLabel: string;
  stat1: { label: string; value: string };
  stat2: { label: string; value: string };
  icon: LucideIcon;
  badge?: string;
  accentColor: string;
  products: string[];
}

interface ProfileCardNewProps {
  profile: ProfileData;
  isActive: boolean;
  onClick: () => void;
}

const ProfileCardNew: React.FC<ProfileCardNewProps> = ({ profile, isActive, onClick }) => {
  const Icon = profile.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateZ(6px)`;
    el.style.transition = 'transform 0.1s linear';
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    el.style.transition = 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)';
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
      className={`
        relative rounded-[28px] overflow-hidden cursor-pointer select-none
        ${isActive
          ? 'shadow-[0_24px_60px_rgba(15,118,110,0.35),0_0_0_2.5px_#0F766E]'
          : 'shadow-[0_8px_32px_rgba(15,23,42,0.18)]'
        }
      `}
    >
      {/* ── Photo ── */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={profile.image}
          alt={profile.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.04]"
          loading="lazy"
        />

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0f1923] to-transparent" />

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          <span className="w-4 h-1.5 rounded-full bg-white" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>

        {profile.badge && (
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-[0.18em] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-slate-700 shadow-sm">
            {profile.badge}
          </span>
        )}

        {isActive && (
          <div
            className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center shadow-lg z-10"
            style={{ backgroundColor: profile.accentColor }}
          >
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
              <path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}

        <div
          className="absolute bottom-10 right-3 w-8 h-8 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center z-10"
          style={{ color: 'white' }}
        >
          <Icon size={14} strokeWidth={1.75} />
        </div>
      </div>

      {/* ── Dark content ── */}
      <div className="bg-[#0f1923] px-5 pt-4 pb-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-white font-bold text-[19px] leading-tight tracking-[-0.3px]">
            {profile.title}
          </h3>
          <span className="shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white/75 whitespace-nowrap mt-0.5 border border-white/10">
            {profile.priceLabel.replace(' / mois', '/m')}
          </span>
        </div>

        <p className="text-white/50 text-[13px] leading-relaxed mb-4 line-clamp-2">
          {profile.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {profile.products.slice(0, 2).map(prod => (
            <span
              key={prod}
              className="text-[11px] font-medium text-white/60 bg-white/[0.07] border border-white/10 px-2.5 py-1 rounded-full"
            >
              {prod}
            </span>
          ))}
          {profile.products.length > 2 && (
            <span className="text-[11px] font-medium text-white/40 px-2 py-1">
              +{profile.products.length - 2}
            </span>
          )}
        </div>

        <button
          className="w-full bg-white text-slate-900 font-semibold text-[15px] py-[13px] rounded-[16px] hover:bg-white/90 active:scale-95 transition-all duration-150"
        >
          Voir mes offres
        </button>
      </div>
    </div>
  );
};

export default ProfileCardNew;
