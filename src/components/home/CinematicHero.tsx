import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CinematicHero: React.FC = () => {
  const { setCurrentPage, setFilters, setIsEnquiryDrawerOpen, setSelectedDrawerProject } = useApp();

  const heroSectionRef = useRef<HTMLDivElement>(null);
  const outerBgRef = useRef<HTMLDivElement>(null);
  const floatingFrameRef = useRef<HTMLDivElement>(null);
  const innerImageRef = useRef<HTMLImageElement>(null);
  const megaTextRef = useRef<HTMLHeadingElement>(null);
  const leftMetaRef = useRef<HTMLDivElement>(null);
  const editorialStatementRef = useRef<HTMLDivElement>(null);
  const rightMetaRef = useRef<HTMLDivElement>(null);
  const topNavRef = useRef<HTMLDivElement>(null);

  // High-end architectural Dubai residence asset
  const heroImageSrc = '/images/hero_cinematic_residence.jpg';

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!heroSectionRef.current || !floatingFrameRef.current) return;

      // Master scroll scrub animation
      // As user scrolls:
      // 1. Floating frame expands from floating inset (scale 1 -> 1.05 / 1.08, width & borderRadius morph toward full viewport)
      // 2. Outer ambient blurred background shifts & fades out
      // 3. Inner image experiences subtle parallax
      // 4. Oversized headline ("DUBAI") & typography gently translate upward & fade
      // 5. Seamlessly transforms from magazine cover into the editorial page flow
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          anticipatePin: 1
        }
      });

      // Frame scale and subtle translation
      tl.to(
        floatingFrameRef.current,
        {
          scale: 1.04,
          y: -20,
          boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.7)',
          ease: 'power1.out',
          duration: 1
        },
        0
      );

      // Outer ambient background fade and scale
      tl.to(
        outerBgRef.current,
        {
          scale: 1.22,
          opacity: 0.15,
          filter: 'blur(30px)',
          ease: 'none',
          duration: 1
        },
        0
      );

      // Inner image parallax (moves slightly slower than frame)
      tl.to(
        innerImageRef.current,
        {
          yPercent: 8,
          scale: 1.06,
          ease: 'none',
          duration: 1
        },
        0
      );

      // Mega Typography subtle architectural shift
      tl.to(
        megaTextRef.current,
        {
          y: -45,
          opacity: 0.75,
          letterSpacing: '0.08em',
          ease: 'none',
          duration: 1
        },
        0
      );

      // Editorial statement and meta shifts
      tl.to(
        [editorialStatementRef.current, leftMetaRef.current, rightMetaRef.current],
        {
          y: -25,
          opacity: 0.6,
          ease: 'none',
          duration: 0.8
        },
        0
      );

      // Internal top navigation fades smoothly into the scroll
      tl.to(
        topNavRef.current,
        {
          opacity: 0.2,
          y: -10,
          duration: 0.5
        },
        0
      );
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (page: any, listingType?: string) => {
    if (listingType) {
      setFilters(prev => ({ ...prev, listingType: listingType as any }));
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactClick = () => {
    setSelectedDrawerProject('Private Advisory - Architectural Residences');
    setIsEnquiryDrawerOpen(true);
  };

  return (
    <section 
      ref={heroSectionRef}
      className="relative w-full min-h-[105vh] lg:min-h-[110vh] flex items-center justify-center overflow-hidden bg-[#0a0b0d] py-6 sm:py-8 lg:py-12 select-none"
    >
      {/* ========================================================
          01. OUTER AMBIENT ATMOSPHERIC BACKGROUND
          Heavily enlarged, softly blurred, desaturated, ambient
          ======================================================== */}
      <div 
        ref={outerBgRef}
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 will-change-transform"
        style={{
          transform: 'scale(1.15)',
          filter: 'blur(22px) brightness(0.65) saturate(0.85)',
          opacity: 0.45
        }}
      >
        <img 
          src={heroImageSrc} 
          alt="Ambient Background" 
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        {/* Soft dark vignette to frame the central floating composition */}
        <div className="absolute inset-0 bg-[#0a0b0d]/50" />
      </div>

      {/* ========================================================
          02. CENTRAL FLOATING EDITORIAL HERO FRAME
          Inset: ~92vw × 85vh, sharp, architectural magazine cover
          ======================================================== */}
      <div
        ref={floatingFrameRef}
        className="relative z-10 w-[92vw] sm:w-[93vw] max-w-[1720px] h-[82vh] sm:h-[84vh] min-h-[560px] sm:min-h-[620px] max-h-[960px] overflow-hidden rounded-[2px] border border-white/15 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.85)] flex flex-col justify-between p-6 sm:p-8 lg:p-12 text-white will-change-transform bg-[#0a0b0d]"
      >
        {/* Crisp Hero Image Background with Subtle Contrast Overlay */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img 
            ref={innerImageRef}
            src={heroImageSrc} 
            alt="Contemporary Dubai Luxury Residence" 
            className="w-full h-full object-cover object-[center_42%] sm:object-[center_45%] brightness-[0.92] contrast-[1.04]"
            fetchPriority="high"
          />
          {/* Restrained cinematic grading - never pitch black */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/35 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* ========================================================
            A. TOP NAVIGATION INSIDE FLOATING FRAME
            Extremely small, discreet, architectural typography
            ======================================================== */}
        <div 
          ref={topNavRef}
          className="relative z-10 w-full flex items-center justify-between pb-4"
        >
          {/* Top Left Wordmark */}
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer group flex items-center gap-2.5"
          >
            <span className="w-1.5 h-1.5 bg-white opacity-80 group-hover:scale-125 transition-transform" />
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-white/95 group-hover:text-white transition-colors">
              DUBAI ESTATES
            </span>
          </div>

          {/* Top Center/Right Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-10 text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase text-white/80">
            <button 
              onClick={() => handleNavClick('properties', 'For Sale')} 
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              BUY
            </button>
            <button 
              onClick={() => handleNavClick('properties', 'For Rent')} 
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              RENT
            </button>
            <button 
              onClick={() => handleNavClick('sell')} 
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              SELL
            </button>
            <button 
              onClick={() => handleNavClick('communities')} 
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              COMMUNITIES
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('journal-section') || document.querySelector('section:nth-of-type(4)');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              JOURNAL
            </button>
          </nav>

          {/* Top Right Contact */}
          <button 
            onClick={handleContactClick}
            className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase text-white/90 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>CONTACT</span>
            <span className="w-1 h-1 bg-white/70 rounded-full" />
          </button>
        </div>

        {/* ========================================================
            B. CENTER-UPPER: OVERSIZED ARCHITECTURAL TYPOGRAPHY
            "DUBAI" or "ESTATES" - Massive, clean, high-contrast
            Interacting boldly with the villa architecture
            ======================================================== */}
        <div className="relative z-10 w-full my-auto flex flex-col items-center justify-center text-center pointer-events-none select-none py-4 sm:py-6">
          <h1 
            ref={megaTextRef}
            className="font-sans font-light tracking-[0.06em] uppercase text-white/95 text-[15vw] sm:text-[14vw] md:text-[13vw] lg:text-[11.5vw] leading-[0.88] drop-shadow-[0_10px_35px_rgba(0,0,0,0.4)]"
            style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}
          >
            DUBAI
          </h1>
          <span className="font-mono text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.45em] uppercase text-white/70 mt-2 font-medium">
            AN ARCHITECTURAL MONOGRAPH • PRIVATE PROPERTY HOUSE
          </span>
        </div>

        {/* ========================================================
            C. LOWER COMPOSITION: EDITORIAL SPREAD & INFORMATION
            Left: Tiny vertical descriptors + Editorial Statement + Minimal CTA
            Right: Tiny supporting narrative
            ======================================================== */}
        <div className="relative z-10 w-full flex flex-col md:flex-row items-end justify-between gap-6 sm:gap-8 pt-4">
          
          {/* Lower Left Block: Tiny meta labels + Strong Editorial Statement + CTA */}
          <div className="space-y-4 sm:space-y-5 max-w-md">
            
            {/* Tiny information descriptors (similar to reference) */}
            <div 
              ref={leftMetaRef}
              className="flex items-center gap-3 sm:gap-5 text-[9px] font-mono tracking-[0.26em] uppercase text-white/70"
            >
              <span>PRIVATE RESIDENCES</span>
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              <span>CURATED PORTFOLIO</span>
            </div>

            {/* Editorial Statement */}
            <div ref={editorialStatementRef} className="space-y-1">
              <p className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-[1.08] tracking-[-0.01em]">
                Where space meets<br />
                <span className="italic text-white/90">singular Dubai architecture.</span>
              </p>
            </div>

            {/* Small Restrained CTA Button */}
            <div>
              <button
                onClick={() => handleNavClick('properties')}
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 hover:border-white bg-black/20 hover:bg-white hover:text-[#111111] backdrop-blur-sm text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer group"
              >
                <span>EXPLORE PROPERTIES</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Lower Right Block: Tiny supporting narrative */}
          <div 
            ref={rightMetaRef}
            className="text-right md:text-right max-w-xs space-y-2 hidden sm:block"
          >
            <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/60 block">
              VOLUME 01 / EDITION 2026
            </span>
            <p className="text-xs text-white/75 font-light leading-relaxed font-sans">
              A curated collection of residences, sky penthouses and waterfront villas across Dubai's most singular addresses.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
