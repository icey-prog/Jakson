import React, { useRef, useEffect } from 'react';
import type { ElementType } from 'react';
import gsap from 'gsap';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({ 
  text, 
  className = '', 
  as: Tag = 'h2', 
  delay = 0 
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && containerRef.current) {
          const words = containerRef.current.querySelectorAll('.reveal-word');
          gsap.fromTo(
            words,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.04, ease: 'power3.out', delay: delay / 1000 }
          );
          observer.unobserve(containerRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={containerRef as any} className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="reveal-word inline-block mr-[0.25em] opacity-0">
          {word}
        </span>
      ))}
    </Tag>
  );
};

export default TextReveal;
