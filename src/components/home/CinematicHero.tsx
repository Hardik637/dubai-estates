import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CinematicHero: React.FC = () => {
  const { setCurrentPage, setIsEnquiryDrawerOpen, setSelectedDrawerProject } = useApp();

  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Camera layers
  const exteriorCamRef = useRef<HTMLDivElement>(null);
  const exteriorImgRef = useRef<HTMLImageElement>(null);
  const interiorCamRef = useRef<HTMLDivElement>(null);
  const interiorImgRef = useRef<HTMLImageElement>(null);
  const portalGlowRef = useRef<HTMLDivElement>(null);

  // Typography stages
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const stage4Ref = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const stageBadgeRef = useRef<HTMLDivElement>(null);

  const [activeStageTitle, setActiveStageTitle] = useState('01 / ESTABLISHING');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // 1. Accessibility: Check for prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setReducedMotion(true);
      return;
    }

    const ctx = gsap.context(() => {
      if (!containerRef.current || !viewportRef.current) return;

      const isMobile = window.innerWidth < 768;

      // Architectural focal point: Double-height structural glass entrance & pool axis
      // On desktop, the villa's main illuminated architectural portal sits around 36% X, 52% Y
      const focalOrigin = isMobile ? '48% 50%' : '36% 52%';

      // Initial visual states
      gsap.set(exteriorCamRef.current, {
        transformOrigin: focalOrigin,
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        opacity: 1
      });

      gsap.set(interiorCamRef.current, {
        opacity: 0,
        scale: 1.15,
        filter: 'blur(8px)',
        clipPath: 'circle(0% at 50% 50%)'
      });

      gsap.set(portalGlowRef.current, {
        opacity: 0
      });

      // Typography initial layout
      gsap.set(stage1Ref.current, { opacity: 1, y: 0 });
      gsap.set(stage2Ref.current, { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' });
      gsap.set(stage3Ref.current, { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' });
      gsap.set(stage4Ref.current, { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' });

      // Master scroll-controlled continuous camera timeline
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
              setActiveStageTitle('01 / ESTABLISHING');
            } else if (p < 0.54) {
              setActiveStageTitle('02 / CAMERA APPROACH');
            } else if (p < 0.74) {
              setActiveStageTitle('03 / ARCHITECTURAL FOCUS');
            } else {
              setActiveStageTitle('04 / ENTER SANCTUARY');
            }
          }
        }
      });

      // ================= CONTINUOUS OVERLAPPING TIMELINE CHOREOGRAPHY =================

      // --- STAGE 01 -> 02: Initial Departure & Camera Dolly Approach ---
      // Initial text and scroll indicator fade out
      tl.to(
        stage1Ref.current,
        {
          opacity: 0,
          y: -30,
          ease: 'power2.inOut',
          duration: 0.2
        },
        0.05
      );

      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: 15,
          ease: 'power2.in',
          duration: 0.15
        },
        0.04
      );

      // Camera smoothly dollies toward the property (scale 1.00 -> 1.22 + positional translation)
      tl.to(
        exteriorCamRef.current,
        {
          scale: 1.22,
          xPercent: isMobile ? 1.5 : 3.5,
          yPercent: isMobile ? -1 : -2,
          ease: 'none',
          duration: 0.42
        },
        0
      );

      // --- STAGE 03: Typographic Transition 1 ("A DIFFERENT WAY TO DISCOVER DUBAI") ---
      tl.to(
        stage2Ref.current,
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          ease: 'power2.out',
          duration: 0.16
        },
        0.24
      );

      tl.to(
        stage2Ref.current,
        {
          opacity: 0,
          y: -25,
          clipPath: 'inset(100% 0 0% 0)',
          ease: 'power2.in',
          duration: 0.12
        },
        0.44
      );

      // --- STAGE 04: Architectural Focus On The Main Glass Portal ---
      // Camera deepens approach toward the glass doorway (scale 1.22 -> 1.55)
      tl.to(
        exteriorCamRef.current,
        {
          scale: isMobile ? 1.48 : 1.62,
          xPercent: isMobile ? 3.5 : 7,
          yPercent: isMobile ? -2.5 : -4.5,
          ease: 'none',
          duration: 0.35
        },
        0.42
      );

      // --- STAGE 05: Story Content ("CURATED FOR THOSE WHO EXPECT MORE") ---
      tl.to(
        stage3Ref.current,
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          ease: 'power2.out',
          duration: 0.16
        },
        0.50
      );

      tl.to(
        stage3Ref.current,
        {
          opacity: 0,
          y: -25,
          clipPath: 'inset(100% 0 0% 0)',
          ease: 'power2.in',
          duration: 0.12
        },
        0.66
      );

      // --- STAGE 06: ENTER THE PROPERTY (Exterior Villa -> Glass Portal -> Luxury Interior) ---
      // Subtle architectural doorway light bloom
      tl.to(
        portalGlowRef.current,
        {
          opacity: 0.35,
          ease: 'power2.in',
          duration: 0.15
        },
        0.68
      );

      // Exterior pushes past the threshold (scale up and soft dissolve)
      tl.to(
        exteriorCamRef.current,
        {
          scale: isMobile ? 1.95 : 2.2,
          opacity: 0,
          ease: 'power2.inOut',
          duration: 0.28
        },
        0.72
      );

      // Interior expands outward seamlessly with masking & focus resolution
      tl.to(
        interiorCamRef.current,
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          clipPath: 'circle(120% at 50% 50%)',
          ease: 'power2.out',
          duration: 0.28
        },
        0.72
      );

      // Fade out doorway bloom once inside
      tl.to(
        portalGlowRef.current,
        {
          opacity: 0,
          ease: 'power2.out',
          duration: 0.15
        },
        0.82
      );

      // Final Private Office / Sanctuary Text Enters
      tl.to(
        stage4Ref.current,
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          ease: 'power2.out',
          duration: 0.18
        },
        0.78
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleScrollToNext = () => {
    if (containerRef.current) {
      const nextOffset = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      window.scrollTo({ top: nextOffset, behavior: 'smooth' });
    }
  };

  const handleEnquireAdvisory = () => {
    setSelectedDrawerProject('Private Advisory - Architectural Acquisitions');
    setIsEnquiryDrawerOpen(true);
  };

  // Static Fallback for prefers-reduced-motion
  if (reducedMotion) {
    return (
      <section className="relative w-full min-h-[92vh] flex items-end pb-24 bg-[#0a0b0d] text-[#FFFFFF]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_cinematic_residence.jpg"
            alt="Dubai Waterfront Villa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-black/40 to-transparent" />
        </div>
        <div className="editorial-container relative z-10 w-full">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/70 block mb-4">
            Dubai / Private Property House
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light text-[#FFFFFF] mb-6">
            Exceptional Property.<br />
            <span className="italic text-white/80">Considered Differently.</span>
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-lg mb-8 font-light">
            Connecting owners of Dubai’s finest architectural residences with qualified international capital.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage('properties')}
              className="btn-editorial-white"
            >
              Explore Collection
            </button>
            <button
              onClick={() => setCurrentPage('sell')}
              className="btn-editorial-ghost-white"
            >
              List Property
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360vh] sm:h-[400vh] bg-[#0a0b0d]"
    >
      {/* Sticky Viewport pinned across the scroll runway */}
      <div
        ref={viewportRef}
        className="sticky top-0 left-0 w-full h-[100svh] min-h-[600px] overflow-hidden select-none bg-[#0a0b0d] text-white"
      >
        {/* ================= LAYER 1: EXTERIOR VILLA CAMERA RIG ================= */}
        <div
          ref={exteriorCamRef}
          className="absolute inset-0 w-full h-full z-0 will-change-transform"
        >
          <img
            ref={exteriorImgRef}
            src="/images/hero_cinematic_residence.jpg"
            alt="Cinematic Dubai Waterfront Villa"
            className="w-full h-full object-cover object-center"
            decoding="async"
            fetchPriority="high"
          />
          {/* Subtle natural vignette for contrast without darkening the architecture */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-transparent to-black/25 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none hidden md:block" />
        </div>

        {/* ================= LAYER 2: INTERIOR LUXURY GALLERY RIG ================= */}
        <div
          ref={interiorCamRef}
          className="absolute inset-0 w-full h-full z-1 will-change-transform pointer-events-none"
        >
          <img
            ref={interiorImgRef}
            src="/images/private_client_advisory.jpg"
            alt="Interior Architectural Gallery Dubai"
            className="w-full h-full object-cover object-center"
            decoding="async"
          />
          {/* Subtle ambient interior tone */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/20 to-black/20" />
        </div>

        {/* Doorway Architectural Threshold Light Bloom */}
        <div
          ref={portalGlowRef}
          className="absolute inset-0 bg-white pointer-events-none z-2 will-change-opacity"
        />

        {/* Top Progress Meter */}
        <div className="absolute top-0 left-0 right-0 z-20 h-[1.5px] bg-white/10 pointer-events-none">
          <div
            ref={progressBarRef}
            className="h-full bg-white transition-all duration-75"
            style={{ width: '0%' }}
          />
        </div>

        {/* Stage Badge (Top Left) */}
        <div 
          ref={stageBadgeRef}
          className="absolute top-24 sm:top-28 left-6 sm:left-12 lg:left-16 z-20 hidden md:flex items-center gap-3 pointer-events-none"
        >
          <span className="w-2 h-2 bg-white animate-pulse" />
          <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/80">
            {activeStageTitle}
          </span>
        </div>

        {/* ================= TYPOGRAPHY STAGES CONTAINER ================= */}
        <div className="editorial-container relative z-10 w-full h-full flex items-end pb-16 sm:pb-24 pointer-events-none">
          
          {/* ---------------- STAGE 01: ESTABLISHING SHOT ---------------- */}
          <div
            ref={stage1Ref}
            className="max-w-4xl pointer-events-auto will-change-transform"
          >
            <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">
              <span className="w-8 h-[1px] bg-white" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-white/90">
                Dubai / Private Property House
              </span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.04] tracking-[-0.02em] text-[#FFFFFF] mb-5 sm:mb-7">
              Dubai Estates.<br />
              <span className="italic text-white/90">Exceptional Property.</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed max-w-xl mb-8 sm:mb-10">
              Considered differently. Connecting owners of Dubai’s finest architectural residences with qualified international capital.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  setCurrentPage('properties');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-editorial-white group"
              >
                <span>Explore Collection</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setCurrentPage('sell');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-editorial-ghost-white group"
              >
                <span>List With Us</span>
                <span className="w-1.5 h-1.5 bg-white opacity-75 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* ---------------- STAGE 03: TYPOGRAPHIC TRANSITION ---------------- */}
          <div
            ref={stage2Ref}
            className="absolute bottom-20 sm:bottom-28 left-6 sm:left-12 lg:left-16 max-w-2xl pointer-events-auto will-change-transform"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 font-semibold block mb-4">
              01 / The Perspective
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-[#FFFFFF] leading-[1.08] tracking-[-0.01em] mb-4">
              A Different Way<br />
              <span className="italic text-white/90">To Discover Dubai.</span>
            </h2>
            <p className="text-xs sm:text-base text-white/80 font-light max-w-lg leading-relaxed">
              Moving past algorithmic volume. We curate singular addresses that withstand scrutiny of architectural craftsmanship and generational capital.
            </p>
          </div>

          {/* ---------------- STAGE 05: STORY CONTENT ---------------- */}
          <div
            ref={stage3Ref}
            className="absolute bottom-20 sm:bottom-28 left-6 sm:left-12 lg:left-16 max-w-2xl pointer-events-auto will-change-transform"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 font-semibold block mb-4">
              02 / Architectural Craft
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-[#FFFFFF] leading-[1.08] tracking-[-0.01em] mb-4">
              Curated For<br />
              <span className="italic text-[#FFFFFF]">Those Who Expect More.</span>
            </h2>
            <p className="text-xs sm:text-base text-white/80 font-light max-w-lg leading-relaxed">
              Dubai Estates brings together exceptional waterfront villas, sky penthouses, and bespoke private estates with sovereign-grade fiduciary conveyance.
            </p>
          </div>

          {/* ---------------- STAGE 06: ENTER THE PROPERTY SANCTUARY ---------------- */}
          <div
            ref={stage4Ref}
            className="absolute bottom-20 sm:bottom-28 left-6 sm:left-12 lg:left-16 max-w-2xl pointer-events-auto will-change-transform"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 font-semibold block mb-4">
              03 / Private Sanctuary
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-[#FFFFFF] leading-[1.08] tracking-[-0.01em] mb-4">
              Welcome To<br />
              <span className="italic text-white/90">The Private Office.</span>
            </h2>
            <p className="text-xs sm:text-base text-white/80 font-light max-w-lg leading-relaxed mb-8">
              Access prime off-market allocations and discrete representation tailored to discerning global principals.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  setCurrentPage('properties');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-editorial-white"
              >
                <span>Browse Private Portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleEnquireAdvisory}
                className="btn-editorial-ghost-white"
              >
                <span>Consult With Advisor</span>
              </button>
            </div>
          </div>

        </div>

        {/* ================= SCROLL EXPLORATION INDICATOR ================= */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 right-6 sm:right-12 z-20 flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-white/60 pointer-events-auto"
        >
          <span className="hidden sm:inline font-mono">Scroll To Explore</span>
          <button
            onClick={handleScrollToNext}
            aria-label="Scroll forward through camera journey"
            className="w-6 h-10 border border-white/30 hover:border-white/60 flex items-start justify-center p-1.5 transition cursor-pointer"
          >
            <span className="w-1 h-2 bg-white animate-bounce" />
          </button>
        </div>

      </div>
    </div>
  );
};
