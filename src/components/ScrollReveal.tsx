import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  threshold = 0.15,
}) => {
  const ref = useScrollReveal(threshold);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
