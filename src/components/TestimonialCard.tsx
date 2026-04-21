import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  status: string;
  avatar: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, status, avatar, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-card p-6 md:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 card-hover-gradient ${className}`}>
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="fill-jackson-gold text-jackson-gold" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-base text-jackson-slate dark:text-white/70 leading-relaxed italic mb-5">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Separator */}
      <div className="h-px bg-jackson-deep/[0.08] dark:bg-white/10 mb-5" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <p className="text-[15px] font-semibold text-jackson-night dark:text-white">{name}</p>
          <p className="text-[13px] text-jackson-slate dark:text-white/50">{status}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TestimonialCard);
