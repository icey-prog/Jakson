import { useEffect, useRef } from 'react';
import anime from 'animejs';

interface AnimeRevealOptions {
  stagger?: number;
  delay?: number;
  translateY?: number;
  duration?: number;
  selector?: string;
}

export function useAnimeReveal<T extends HTMLElement>(opts: AnimeRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const targets = opts.selector
      ? container.querySelectorAll(opts.selector)
      : [container];

    if (!targets.length) return;

    anime.set(targets, { opacity: 0, translateY: opts.translateY ?? 50, scale: 0.97 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        anime({
          targets,
          opacity: [0, 1],
          translateY: [opts.translateY ?? 50, 0],
          scale: [0.97, 1],
          duration: opts.duration ?? 680,
          easing: 'spring(1, 90, 12, 0)',
          delay: anime.stagger(opts.stagger ?? 90, { start: opts.delay ?? 0 }),
        });
        observer.disconnect();
      },
      { threshold: 0.12 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useMagneticHover(strength = 0.12) {
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    anime({ targets: el, translateX: x, translateY: y, duration: 200, easing: 'easeOutQuad' });
  };

  const onMouseLeave = () => {
    anime({ targets: ref.current, translateX: 0, translateY: 0, duration: 500, easing: 'spring(1, 80, 10, 0)' });
  };

  return { ref, onMouseMove, onMouseLeave };
}
