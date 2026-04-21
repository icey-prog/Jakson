import React from 'react';
import { ArrowRight } from 'lucide-react';
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

  return (
    <div
      onClick={onClick}
      className={`
        group relative rounded-[28px] overflow-hidden bg-white cursor-pointer select-none
        transition-all duration-400 shrink-0
        ${isActive
          ? 'shadow-[0_20px_60px_rgba(15,118,110,0.25),0_0_0_2px_#0F766E] scale-[1.02]'
          : 'shadow-[0_4px_24px_rgba(15,23,42,0.08)] hover:shadow-[0_12px_40px_rgba(15,23,42,0.14)] hover:scale-[1.01]'
        }
      `}
      style={{ transitionTimingFunction: 'cubic-bezier(0.25,0.1,0.25,1)' }}
    >
      {/* Illustration */}
      <div
        className="relative h-56 overflow-hidden"
        style={{ backgroundColor: profile.illustrationBg ?? '#f0fdfa' }}
      >
        <img
          src={profile.image}
          alt={profile.title}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600"
          loading="lazy"
        />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/70 to-transparent" />

        {/* Badge — Apple-style: no pill, just clean uppercase text */}
        {profile.badge && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-[0.18em] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-slate-600 shadow-sm">
            {profile.badge}
          </span>
        )}

        {/* Active checkmark */}
        {isActive && (
          <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-jackson-deep flex items-center justify-center shadow-md">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}

        {/* Lucide icon chip — bottom-right */}
        <div
          className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center"
          style={{ color: profile.accentColor }}
        >
          <Icon size={16} strokeWidth={1.75} />
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 dark:bg-slate-800">

        {/* Title + price */}
        <div className="mb-2">
          <h3 className="font-body font-bold text-[20px] text-slate-900 dark:text-white leading-tight">
            {profile.title}
          </h3>
          <p className="text-[12px] font-medium text-slate-400 dark:text-white/40 mt-0.5 uppercase tracking-wide">
            {profile.priceLabel}
          </p>
        </div>

        <p className="text-[13px] text-slate-500 dark:text-white/60 leading-relaxed mb-4 line-clamp-2">
          {profile.description}
        </p>

        {/* Stats */}
        <div className="flex border-t border-slate-100 dark:border-slate-700 pt-4 mb-4">
          <div className="flex-1 text-center">
            <p className="text-[10px] font-semibold text-slate-400 dark:text-white/35 uppercase tracking-[0.16em]">
              {profile.stat1.label}
            </p>
            <p className="text-[18px] font-bold text-slate-900 dark:text-white mt-0.5">
              {profile.stat1.value}
            </p>
          </div>
          <div className="w-px bg-slate-100 dark:bg-slate-700 mx-2" />
          <div className="flex-1 text-center">
            <p className="text-[10px] font-semibold text-slate-400 dark:text-white/35 uppercase tracking-[0.16em]">
              {profile.stat2.label}
            </p>
            <p className="text-[18px] font-bold text-slate-900 dark:text-white mt-0.5">
              {profile.stat2.value}
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          className={`w-full py-3 rounded-[14px] font-semibold text-[14px] flex items-center justify-center gap-2 transition-all duration-250 ${
            isActive
              ? 'bg-jackson-deep text-white shadow-[0_4px_14px_rgba(15,118,110,0.4)]'
              : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-jackson-deep dark:hover:bg-jackson-cream'
          }`}
        >
          Voir mes offres <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default ProfileCardNew;
