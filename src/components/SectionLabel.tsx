/**
 * SectionLabel — Apple-style eyebrow text above section titles.
 * Replaces the old pill/badge pattern.
 * Clean uppercase tracking, no background, no border.
 */
import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  align?: 'left' | 'center';
  /** On dark backgrounds (e.g. FormulaireSection) */
  dark?: boolean;
  className?: string;
}

const SectionLabel: React.FC<SectionLabelProps> = ({
  children,
  align = 'center',
  dark = false,
  className = '',
}) => {
  const color = dark
    ? 'text-jackson-vivid'
    : 'text-jackson-deep dark:text-jackson-vivid';

  if (align === 'center') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <span className={`block h-px w-5 ${dark ? 'bg-jackson-vivid/40' : 'bg-jackson-deep/30 dark:bg-jackson-vivid/40'}`} />
        <span className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${color}`}>
          {children}
        </span>
        <span className={`block h-px w-5 ${dark ? 'bg-jackson-vivid/40' : 'bg-jackson-deep/30 dark:bg-jackson-vivid/40'}`} />
      </div>
    );
  }

  return (
    <span className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${color} ${className}`}>
      {children}
    </span>
  );
};

export default SectionLabel;
