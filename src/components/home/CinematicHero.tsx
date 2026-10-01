import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const CinematicHero: React.FC = () => {
  const { setCurrentPage, setIsEnquiryDrawerOpen, setSelectedDrawerProject } = useApp();

  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const exteriorCamRef = useRef<HTMLDivElement>(null);
  const interiorCamRef = useRef<HTMLDivElement>(null);

  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const stage4Ref = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [activeStageName, setActiveStageName] = useState('01 / ESTABLISHING');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setReducedMotion(true);
      return;
    }

    // Initialize smooth scrolling with Lenis for cinema-grade interpolation
    let lenis: Lenis | null = null;
    try {
      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        autoRaf: false
      });

      lenis.on('scroll', ScrollTrigger.update);

      const rafCallback = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(rafCallback);
      gsap.ticker.lagSmoothing(0);
    } catch (e) {
      // Graceful fallback to native scroll
    }

    const ctx = gsap.context(() => {
      if (!containerRef.current || !stickyRef.current) return;

      const isMobile = window.innerWidth < 768;
      // Focal point toward the illuminated glass double-height living room portal
      const exteriorOrigin = isMobile ? '45% 50%' : '32% 52%';

      gsap.set(exteriorCamRef.current, {
        transformOrigin: exteriorOrigin,
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        opacity: 1
      });

      gsap.set(interiorCamRef.current, {
        opacity: 0,
        scale: 1.15,
        filter: 'blur(6px)'
      });

      gsap.set(stage1Ref.current, { opacity: 1, y: 0 });
      gsap.set(stage2Ref.current, { opacity: 0, y: 35 });
      gsap.set(stage3Ref.current, { opacity: 0, y: 35 });
      gsap.set(stage4Ref.current, { opacity: 0, y: 35 });

      // Master scroll-scrubbed timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress;
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${(p * 100).toFixed(1)}%`;
            }
            if (p < 0.28) {
              setActiveStageName('01 / ESTABLISHING');
            } else if (p < 0.55) {
              setActiveStageName('02 / APPROACH');
            } else if (p < 0.76) {
              setActiveStageName('03 / ARCHITECTURAL FOCUS');
            } else {
              setActiveStageName('04 / ENTER SANCTUARY');
            }
          }
        }
      });

      // ================= TIMELINE ANIMATION CHOREOGRAPHY =================
      // Stage 1 -> Camera begins approach & Stage 1 text departs (0.00 -> 0.25)
      tl.to(
        stage1Ref.current,
        {
          opacity: 0,
          y: -35,
          ease: 'power2.inOut',
          duration: 0.22
        },
        0.04
      );

      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: 15,
          ease: 'power2.in',
          duration: 0.15
        },
        0.03
      );

      // Camera movements: gradual, smooth, controlled
      tl.to(
        exteriorCamRef.current,
        {
          scale: 1.26,
          xPercent: isMobile ? 2 : 4,
          yPercent: isMobile ? -1 : -2.5,
          ease: 'none',
          duration: 0.45
        },
        0
      );

      // Stage 2 text enters (0.22 -> 0.34) and fades (0.42 -> 0.52)
      tl.to(
        stage2Ref.current,
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.14
        },
        0.22
      );

      tl.to(
        stage2Ref.current,
        {
          opacity: 0,
          y: -25,
          ease: 'power2.in',
          duration: 0.12
        },
        0.44
      );

      // Camera deepens approach toward the glass doors (0.45 -> 0.75)
      tl.to(
        exteriorCamRef.current,
        {
          scale: isMobile ? 1.55 : 1.72,
          xPercent: isMobile ? 4 : 7.5,
          yPercent: isMobile ? -2 : -4.5,
          ease: 'none',
          duration: 0.35
        },
        0.45
      );

      // Stage 3 text enters (0.50 -> 0.62) and fades (0.66 -> 0.74)
      tl.to(
        stage3Ref.current,
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.14
        },
        0.50
      );

      tl.to(
        stage3Ref.current,
        {
          opacity: 0,
          y: -25,
          ease: 'power2.in',
          duration: 0.12
        },
        0.66
      );

      // ================= TRANSITION: ENTER PROPERTY =================
      // As camera touches the glass threshold, exterior dissolves into interior (0.72 -> 1.00)
      tl.to(
        exteriorCamRef.current,
        {
          scale: isMobile ? 1.95 : 2.25,
          opacity: 0,
          ease: 'power2.inOut',
          duration: 0.28
        },
        0.72
      );

      tl.to(
        interiorCamRef.current,
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
          duration: 0.28
        },
        0.72
      );

      // Stage 4 text enters inside the interior (0.78 -> 0.95)
      tl.to(
        stage4Ref.current,
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.18
        },
        0.78
      );
    }, containerRef);

    return () => {
      ctx.revert();
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  const handleScrollToNext = () => {
    const nextEl = document.getElementById('brand-statement');
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnquireAdvisory = () => {
    setSelectedDrawerProject('Private Advisory - Architectural Acquisitions');
    setIsEnquiryDrawerOpen(true);
  };

  // Static fallback if user prefers reduced motion
  if (reducedMotion) {
    return (
      <section className="relative w-full min-h-[90vh] flex items-end pb-24 bg-[#0a0b0d]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_cinematic_residence.jpg"
            alt="Dubai Waterfront Residence"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/50 to-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#c4ad8e] block mb-4">
            Dubai / Private Property House
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light text-[#f7f5f0] mb-6">
            Property, Curated.
          </h1>
          <p className="text-base text-[#b8b5ad] max-w-lg mb-8 font-light">
            Exceptional property. Considered differently. Connecting verified asset owners with qualified international capital.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage('properties')}
              className="editorial-btn-primary cursor-pointer"
            >
              Explore Properties
            </button>
            <button
              onClick={() => setCurrentPage('sell')}
              className="editorial-btn-secondary cursor-pointer"
            >
              List Your Property
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380vh] sm:h-[420vh] bg-[#0a0b0d]"
    >
      {/* Sticky Viewport Frame pinned during scroll runway */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-[100svh] min-h-[600px] overflow-hidden select-none bg-[#0a0b0d]"
      >
        {/* ================= LAYER 1: EXTERIOR CAMERA RIG ================= */}
        <div
          ref={exteriorCamRef}
          className="absolute inset-0 w-full h-full z-0 will-change-transform"
        >
          <img
            src="/images/hero_cinematic_residence.jpg"
            alt="Cinematic Dubai Waterfront Villa"
            className="w-full h-full object-cover object-center"
            decoding="async"
            fetchPriority="high"
          />
          {/* Natural Vignette & Atmospheric Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/35 to-black/35 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0d]/70 via-transparent to-transparent pointer-events-none hidden md:block" />
        </div>

        {/* ================= LAYER 2: INTERIOR CONTINUATION CAMERA RIG ================= */}
        <div
          ref={interiorCamRef}
          className="absolute inset-0 w-full h-full z-1 will-change-transform pointer-events-none"
        >
          <img
            src="/images/private_client_advisory.jpg"
            alt="Interior Architectural Gallery Dubai"
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          {/* Subtle Ambient Interior Tone */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/40 to-black/30" />
          <div className="absolute inset-0 bg-radial from-transparent to-[#0a0b0d]/60" />
        </div>

        {/* ================= EDITORIAL TOP PROGRESS METER ================= */}
        <div className="absolute top-0 left-0 right-0 z-20 h-[1.5px] bg-white/10 pointer-events-none">
          <div
            ref={progressBarRef}
            className="h-full bg-[#c4ad8e] transition-all duration-75"
            style={{ width: '0%' }}
          />
        </div>

        {/* Camera Journey Phase Indicator (Bottom Left) */}
        <div className="absolute top-20 sm:top-24 left-6 sm:left-10 lg:left-14 z-20 hidden md:flex items-center gap-3 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c4ad8e] animate-pulse" />
          <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#c4ad8e]">
            {activeStageName}
          </span>
        </div>

        {/* ================= TYPOGRAPHY STAGES CONTAINER ================= */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-end pb-16 sm:pb-24 pointer-events-none">
          
          {/* ---------------- STAGE 01: ESTABLISHING SHOT ---------------- */}
          <div
            ref={stage1Ref}
            className="max-w-4xl pointer-events-auto will-change-transform"
          >
            <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">
              <span className="w-8 h-[1px] bg-[#c4ad8e]" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#c4ad8e]">
                Dubai / Private Property House
              </span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.04] tracking-[-0.02em] text-[#f7f5f0] mb-5 sm:mb-7">
              Dubai Estates.<br />
              <span className="italic text-[#eae6df]">Exceptional Property.</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#b8b5ad] font-light leading-relaxed max-w-xl mb-8 sm:mb-10">
              Considered differently. Connecting owners of Dubai’s finest architectural residences with qualified international capital.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  setCurrentPage('properties');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="editorial-btn-primary cursor-pointer group"
              >
                <span>Explore Properties</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setCurrentPage('sell');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="editorial-btn-secondary cursor-pointer group"
              >
                <span>List Your Property</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c4ad8e] opacity-75 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* ---------------- STAGE 02 & 03: APPROACH STATEMENT ---------------- */}
          <div
            ref={stage2Ref}
            className="absolute bottom-20 sm:bottom-28 left-6 sm:left-12 lg:left-16 max-w-2xl pointer-events-auto will-change-transform"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4ad8e] font-semibold block mb-4">
              01 / A New Perspective
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-[#f7f5f0] leading-[1.08] tracking-[-0.01em] mb-4">
              A Different Way<br />
              <span className="italic text-[#eae6df]">To Discover Dubai.</span>
            </h2>
            <p className="text-xs sm:text-base text-[#b8b5ad] font-light max-w-lg leading-relaxed">
              Moving past algorithmic volume. We curate singular addresses that withstand scrutiny of architectural craftsmanship and generational value.
            </p>
          </div>

          {/* ---------------- STAGE 04 & 05: ARCHITECTURAL FOCUS ---------------- */}
          <div
            ref={stage3Ref}
            className="absolute bottom-20 sm:bottom-28 left-6 sm:left-12 lg:left-16 max-w-2xl pointer-events-auto will-change-transform"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4ad8e] font-semibold block mb-4">
              02 / The Architectural Sanctuary
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-[#f7f5f0] leading-[1.08] tracking-[-0.01em] mb-4">
              Curated For<br />
              <span className="italic text-[#c4ad8e]">Those Who Expect More.</span>
            </h2>
            <p className="text-xs sm:text-base text-[#b8b5ad] font-light max-w-lg leading-relaxed">
              Dubai Estates brings together exceptional waterfront villas, sky penthouses, and bespoke estates with sovereign-grade fiduciary conveyance.
            </p>
          </div>

          {/* ---------------- STAGE 06: ENTER PROPERTY SANCTUARY ---------------- */}
          <div
            ref={stage4Ref}
            className="absolute bottom-20 sm:bottom-28 left-6 sm:left-12 lg:left-16 max-w-2xl pointer-events-auto will-change-transform"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4ad8e] font-semibold block mb-4">
              03 / Step Inside
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-[#f7f5f0] leading-[1.08] tracking-[-0.01em] mb-4">
              Welcome To<br />
              <span className="italic text-[#eae6df]">The Private Office.</span>
            </h2>
            <p className="text-xs sm:text-base text-[#b8b5ad] font-light max-w-lg leading-relaxed mb-8">
              Access prime off-market allocations and discrete representation tailored to discerning global principals.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  setCurrentPage('properties');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="editorial-btn-champagne cursor-pointer group"
              >
                <span>Browse Private Portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleEnquireAdvisory}
                className="editorial-btn-secondary cursor-pointer"
              >
                <span>Consult With Advisor</span>
              </button>
            </div>
          </div>

        </div>

        {/* ================= SCROLL EXPLORATION INDICATOR ================= */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 right-6 sm:right-12 z-20 flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-[#96938a] pointer-events-auto"
        >
          <span className="hidden sm:inline font-mono">Scroll To Explore</span>
          <button
            onClick={handleScrollToNext}
            aria-label="Scroll forward through camera journey"
            className="w-6 h-10 rounded-full border border-white/20 hover:border-white/40 flex items-start justify-center p-1.5 transition-colors cursor-pointer"
          >
            <span className="w-1 h-2 rounded-full bg-[#c4ad8e] animate-bounce" />
          </button>
        </div>

      </div>
    </div>
  );
};
