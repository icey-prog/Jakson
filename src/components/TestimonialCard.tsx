import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  status: string;
  avatar: string;
  city?: string;
  className?: string;
}

/** Avatar initial fallback — évite la stock photo "trop IA". */
const InitialAvatar: React.FC<{ name: string; color: string }> = ({ name, color }) => {
  const initials = name.split(' ').map(p => p[0]).slice(0, 2).join('');
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white text-[15px] shrink-0"
      style={{ background: color }}
    >
      {initials}
    </div>
  );
};

// Palette teintes vertes pour avatars
const AVATAR_COLORS = ['#0F766E', '#03624C', '#2FA98C', '#134E4A', '#0D5F58'];

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, status, city, className = '' }) => {
  const colorIdx = name.charCodeAt(0) % AVATAR_COLORS.length;

  return (
    <div className={`relative bg-white rounded-[18px] p-6 md:p-7 border border-jackson-border/60 hover:border-jackson-teal/30 hover:shadow-[0_16px_48px_rgba(15,118,110,0.12)] transition-all duration-300 ${className}`}>
      {/* Quote glyph en background */}
      <Quote
        size={48}
        className="absolute top-5 right-5 text-jackson-teal/8"
        strokeWidth={1}
      />

      <div className="relative">
        {/* Stars */}
        <div className="flex gap-0.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="fill-jackson-gold text-jackson-gold" />
          ))}
        </div>

        {/* Quote — pas d'italique, ton naturel */}
        <p className="text-[15px] text-jackson-deep leading-[1.6] mb-6">
          {quote}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-jackson-border/60">
          <InitialAvatar name={name} color={AVATAR_COLORS[colorIdx]} />
          <div>
            <p className="text-[14px] font-semibold text-jackson-deep">{name}</p>
            <p className="text-[12px] text-jackson-stone">
              {status}{city ? ` · ${city}` : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TestimonialCard);
