import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Shield } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onComplete,
      });

      // Initial state
      gsap.set(logoRef.current, { scale: 0.8, opacity: 0 });
      gsap.set(textRef.current, { y: 20, opacity: 0 });
      gsap.set(wipeRef.current, { scaleY: 0, transformOrigin: 'top' });

      // Animation sequence
      tl.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      })
      .to(textRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4')
      .to([logoRef.current, textRef.current], {
        y: -30,
        opacity: 0,
        duration: 0.5,
        delay: 0.8,
        ease: 'power2.in',
      })
      .to(wipeRef.current, {
        scaleY: 1,
        duration: 0.6,
        ease: 'power4.inOut',
      }, '-=0.2')
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-jackson-night flex flex-col items-center justify-center overflow-hidden"
    >
      <div ref={logoRef} className="text-jackson-vivid mb-4">
        <Shield size={64} strokeWidth={1.5} />
      </div>
      <div ref={textRef} className="text-white font-display text-2xl md:text-4xl tracking-widest uppercase">
        Jackson Assurances
      </div>
      
      {/* Wipe element for transition out */}
      <div 
        ref={wipeRef} 
        className="absolute inset-0 bg-jackson-deep z-10 pointer-events-none" 
      />
    </div>
  );
};

export default Preloader;
