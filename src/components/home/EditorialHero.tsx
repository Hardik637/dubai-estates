import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EditorialHero: React.FC = () => {
  const { setCurrentPage } = useApp();
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroRef.current) return;

      // Subtle parallax & reveal on headline and image block
      gsap.to(headlineRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });

      gsap.to(imageFrameRef.current, {
        y: 60,
        scale: 1.04,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative w-full min-h-[92vh] sm:min-h-screen bg-[#FFFFFF] text-[#111111] pt-32 sm:pt-40 pb-20 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Editorial Index Header */}
      <div className="editorial-container w-full">
        <div ref={metaRef} className="flex items-center justify-between border-b border-[#E7E3DA] pb-4 mb-12 sm:mb-16">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#8A877F]">
            NO. 01 / AN ARCHITECTURAL MONOGRAPH
          </span>
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#8A877F]">
            DUBAI, UNITED ARAB EMIRATES
          </span>
        </div>
      </div>

      {/* Main Editorial Spread: Oversized Typography + Asymmetric Image Block */}
      <div className="editorial-container w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Oversized Editorial Statement (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#8A877F] block">
              The Perspective
            </span>

            <h1 
              ref={headlineRef}
              className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.2rem] font-light text-[#111111] leading-[0.96] tracking-[-0.03em] will-change-transform"
            >
              DUBAI<br />
              HAS MORE<br />
              <span className="italic font-light">TO OFFER.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#2B2A27] font-light max-w-md leading-relaxed pt-2">
              A considered way to discover Dubai. We curate singular residential commissions that withstand the scrutiny of architectural proportion and sovereign capital.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={() => {
                  setCurrentPage('properties');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-editorial-primary group"
              >
                <span>Discover Collection</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setCurrentPage('sell');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-editorial-secondary"
              >
                <span>Private Consignment</span>
              </button>
            </div>
          </div>

          {/* Right Column: Carefully Cropped Asymmetric Architectural Image Block (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-end pt-4 sm:pt-8">
            <div 
              ref={imageFrameRef}
              className="relative w-full sm:w-[90%] aspect-[3/4] bg-[#F7F4EC] border border-[#E7E3DA] overflow-hidden will-change-transform"
            >
              <img
                src="/assets/hero/hero-architectural-residence.jpg"
                alt="Contemporary Villa in Dubai"
                className="w-full h-full object-cover object-center"
                fetchPriority="high"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 border-t border-[#E7E3DA] flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#8A877F]">
                <span>PALM JUMEIRAH</span>
                <span className="text-[#111111] font-semibold">FIG. 01</span>
              </div>
            </div>
            
            <p className="text-[11px] font-mono text-[#8A877F] mt-3 tracking-wider text-right w-full sm:w-[90%]">
              Bespoke Waterfront Pavilion • Private Frond
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Subtle Scroll Indicator */}
      <div className="editorial-container w-full pt-16">
        <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.25em] uppercase text-[#8A877F] border-t border-[#E7E3DA] pt-4">
          <span>SCROLL TO EXPLORE SPREAD</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
