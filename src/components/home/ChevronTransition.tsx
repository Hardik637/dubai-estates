import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ChevronTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Animate row 1 sliding gently left-to-right on scroll
      gsap.to(row1Ref.current, {
        x: '180px',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      // Animate row 2 sliding gently right-to-left on scroll
      gsap.to(row2Ref.current, {
        x: '-180px',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full py-16 sm:py-24 overflow-hidden bg-[#FFFFFF] border-t border-b border-[#E7E3DA] select-none pointer-events-none"
    >
      {/* Top Track of Oversized Architectural Chevrons */}
      <div 
        ref={row1Ref}
        className="flex items-center gap-12 sm:gap-20 whitespace-nowrap will-change-transform opacity-30"
      >
        {[...Array(14)].map((_, i) => (
          <svg 
            key={i} 
            className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 text-[#111111] shrink-0" 
            viewBox="0 0 100 100" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3.5"
            strokeLinecap="square"
          >
            <polyline points="28,15 68,50 28,85" />
          </svg>
        ))}
      </div>

      {/* Center Editorial Spacer Line with Meta Marker */}
      <div className="editorial-container flex items-center justify-between my-4 sm:my-6">
        <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#8A877F]">
          SECTION TRANSITION // ARCHITECTURAL INDEX
        </span>
        <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#8A877F]">
          DUBAI ESTATES • 2026
        </span>
      </div>

      {/* Bottom Track of Oversized Architectural Chevrons */}
      <div 
        ref={row2Ref}
        className="flex items-center gap-12 sm:gap-20 whitespace-nowrap will-change-transform opacity-15"
      >
        {[...Array(14)].map((_, i) => (
          <svg 
            key={i} 
            className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 text-[#111111] shrink-0" 
            viewBox="0 0 100 100" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3.5"
            strokeLinecap="square"
          >
            <polyline points="28,15 68,50 28,85" />
          </svg>
        ))}
      </div>
    </div>
  );
};
