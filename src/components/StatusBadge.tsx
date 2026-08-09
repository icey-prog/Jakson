import React from 'react';
import { CircleCheck, CircleDashed, CircleX, Clock5, TriangleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export type StatusTone = 'succes' | 'echec' | 'en-cours' | 'attente' | 'expire';

interface ToneStyle {
  /** Sur fond clair : pastel + texte saturé, comme la maquette de référence. */
  clair: string;
  /** Sur fond sombre : voile translucide + texte lumineux, sinon illisible. */
  sombre: string;
  Icone: typeof CircleCheck;
}

/**
 * Palette volontairement restreinte aux tons sémantiques dont le site a besoin.
 * Le vert reprend `jackson-meadow` (#2CC295) pour rester dans la charte.
 */
const TONES: Record<StatusTone, ToneStyle> = {
  succes: {
    clair: 'bg-emerald-50 text-[#0F766E]',
    sombre: 'bg-jackson-meadow/15 text-jackson-meadow',
    Icone: CircleCheck,
  },
  echec: {
    clair: 'bg-rose-50 text-[#D57463]',
    sombre: 'bg-red-400/15 text-red-300',
    Icone: CircleX,
  },
  'en-cours': {
    clair: 'bg-sky-50 text-[#0369A1]',
    sombre: 'bg-white/10 text-white/80',
    Icone: CircleDashed,
  },
  attente: {
    clair: 'bg-amber-50 text-[#B45309]',
    sombre: 'bg-amber-300/15 text-amber-200',
    Icone: TriangleAlert,
  },
  expire: {
    clair: 'bg-zinc-100 text-apple-ink-48',
    sombre: 'bg-white/5 text-white/40',
    Icone: Clock5,
  },
};

interface StatusBadgeProps {
  tone: StatusTone;
  children: React.ReactNode;
  /** Surface d'accueil. Le formulaire de devis est sombre, les pages de contenu sont claires. */
  surface?: 'clair' | 'sombre';
  /** L'icône de `en-cours` tourne quand une action est réellement en vol. */
  anime?: boolean;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  tone,
  children,
  surface = 'clair',
  anime = false,
  className,
}) => {
  const { Icone, ...styles } = TONES[tone];

  return (
    <span
      role="status"
      className={cn(
        // Valeurs de `text-caption` écrites en clair : tailwind-merge range la classe
        // nommée dans le même groupe que les couleurs et l'une écrase l'autre.
        'inline-flex h-[35px] items-center gap-2 rounded-md px-3.5',
        'text-[14px] leading-[1.43] tracking-[-0.224px] font-semibold',
        styles[surface],
        className,
      )}
    >
      <Icone
        size={16}
        strokeWidth={3}
        className={cn('shrink-0', anime && 'motion-safe:animate-spin')}
        aria-hidden
      />
      {children}
    </span>
  );
};

export default StatusBadge;
