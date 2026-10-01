import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CinematicMovieExperience: React.FC = () => {
  const { setCurrentPage, setIsEnquiryDrawerOpen, setSelectedDrawerProject } = useApp();

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scene Canvas Elements
  const scene1SkylineRef = useRef<HTMLDivElement>(null);
  const scene2CoastRef = useRef<HTMLDivElement>(null);
  const scene3DistrictRef = useRef<HTMLDivElement>(null);
  const scene4VillaExtRef = useRef<HTMLDivElement>(null);
  const scene5VillaZoomRef = useRef<HTMLDivElement>(null);
  const scene6InteriorRef = useRef<HTMLDivElement>(null);

  // Cinematic Chapter Overlays
  const chapter1Ref = useRef<HTMLDivElement>(null);
  const chapter2Ref = useRef<HTMLDivElement>(null);
  const chapter3Ref = useRef<HTMLDivElement>(null);
  const chapter4Ref = useRef<HTMLDivElement>(null);
  const chapter5Ref = useRef<HTMLDivElement>(null);
  const chapter6Ref = useRef<HTMLDivElement>(null);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const [currentChapter, setCurrentChapter] = useState('SCENE 01 • DUBAI HORIZON');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Initial visual states
      gsap.set(scene1SkylineRef.current, { opacity: 1, scale: 1 });
      gsap.set(scene2CoastRef.current, { opacity: 0, scale: 1.15 });
      gsap.set(scene3DistrictRef.current, { opacity: 0, scale: 1.2 });
      gsap.set(scene4VillaExtRef.current, { opacity: 0, scale: 1.15 });
      gsap.set(scene5VillaZoomRef.current, { opacity: 0, scale: 1.25 });
      gsap.set(scene6InteriorRef.current, { opacity: 0, scale: 1.1 });

      gsap.set(chapter1Ref.current, { opacity: 1, y: 0 });
      gsap.set([chapter2Ref.current, chapter3Ref.current, chapter4Ref.current, chapter5Ref.current, chapter6Ref.current], { 
        opacity: 0, 
        y: 40 
      });

      // Master Scroll-Driven Cinematic Film Timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=5000', // Expansive scroll runway for a continuous cinematic film journey
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${(p * 100).toFixed(1)}%`;
            }

            if (p < 0.16) {
              setCurrentChapter('SCENE 01 • DUBAI HORIZON');
            } else if (p < 0.35) {
              setCurrentChapter('SCENE 02 • COASTAL DESCENT');
            } else if (p < 0.54) {
              setCurrentChapter('SCENE 03 • THE DISTRICT');
            } else if (p < 0.72) {
              setCurrentChapter('SCENE 04 • ARCHITECTURAL APPROACH');
            } else if (p < 0.88) {
              setCurrentChapter('SCENE 05 • THE THRESHOLD');
            } else {
              setCurrentChapter('SCENE 06 • SANCTUARY');
            }
          }
        }
      });

      // ==============================================================
      // ACT I: DUBAI SKYLINE & BURJ HORIZON (0.00 -> 0.20)
      // ==============================================================
      masterTl.to(scene1SkylineRef.current, {
        scale: 1.28,
        ease: 'none',
        duration: 0.22
      }, 0);

      masterTl.to(chapter1Ref.current, {
        opacity: 0,
        y: -30,
        ease: 'power2.in',
        duration: 0.12
      }, 0.08);

      // Transition Scene 1 -> Scene 2 (Coastal Aerial Palm)
      masterTl.to(scene1SkylineRef.current, {
        opacity: 0,
        duration: 0.12,
        ease: 'power2.inOut'
      }, 0.16);

      masterTl.to(scene2CoastRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.14,
        ease: 'power2.out'
      }, 0.16);

      // ==============================================================
      // ACT II: COASTAL AERIAL & PALM JUMEIRAH (0.18 -> 0.38)
      // ==============================================================
      masterTl.to(chapter2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.12,
        ease: 'power2.out'
      }, 0.20);

      masterTl.to(scene2CoastRef.current, {
        scale: 1.32,
        ease: 'none',
        duration: 0.22
      }, 0.20);

      masterTl.to(chapter2Ref.current, {
        opacity: 0,
        y: -30,
        duration: 0.10,
        ease: 'power2.in'
      }, 0.32);

      // Transition Scene 2 -> Scene 3 (Entering Palm Frond & Villa District)
      masterTl.to(scene2CoastRef.current, {
        opacity: 0,
        duration: 0.12,
        ease: 'power2.inOut'
      }, 0.34);

      masterTl.to(scene3DistrictRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.14,
        ease: 'power2.out'
      }, 0.34);

      // ==============================================================
      // ACT III: DISTRICT APPROACH (0.36 -> 0.56)
      // ==============================================================
      masterTl.to(chapter3Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.12,
        ease: 'power2.out'
      }, 0.38);

      masterTl.to(scene3DistrictRef.current, {
        scale: 1.35,
        xPercent: 3,
        yPercent: -2,
        ease: 'none',
        duration: 0.22
      }, 0.38);

      masterTl.to(chapter3Ref.current, {
        opacity: 0,
        y: -30,
        duration: 0.10,
        ease: 'power2.in'
      }, 0.50);

      // Transition Scene 3 -> Scene 4 (Villa Exterior Establishing)
      masterTl.to(scene3DistrictRef.current, {
        opacity: 0,
        duration: 0.12,
        ease: 'power2.inOut'
      }, 0.52);

      masterTl.to(scene4VillaExtRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.14,
        ease: 'power2.out'
      }, 0.52);

      // ==============================================================
      // ACT IV: VILLA EXTERIOR ZOOM (0.54 -> 0.74)
      // ==============================================================
      masterTl.to(chapter4Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.12,
        ease: 'power2.out'
      }, 0.56);

      masterTl.to(scene4VillaExtRef.current, {
        scale: 1.40,
        xPercent: 4,
        yPercent: -3,
        ease: 'none',
        duration: 0.22
      }, 0.56);

      masterTl.to(chapter4Ref.current, {
        opacity: 0,
        y: -30,
        duration: 0.10,
        ease: 'power2.in'
      }, 0.68);

      // Transition Scene 4 -> Scene 5 (Deep Architectural Window Approach)
      masterTl.to(scene4VillaExtRef.current, {
        opacity: 0,
        duration: 0.12,
        ease: 'power2.inOut'
      }, 0.70);

      masterTl.to(scene5VillaZoomRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.14,
        ease: 'power2.out'
      }, 0.70);

      // ==============================================================
      // ACT V: ARCHITECTURAL PORTAL & ENTRY (0.72 -> 0.88)
      // ==============================================================
      masterTl.to(chapter5Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.12,
        ease: 'power2.out'
      }, 0.73);

      masterTl.to(scene5VillaZoomRef.current, {
        scale: 1.55,
        xPercent: 5,
        yPercent: -4,
        ease: 'none',
        duration: 0.18
      }, 0.73);

      masterTl.to(chapter5Ref.current, {
        opacity: 0,
        y: -30,
        duration: 0.08,
        ease: 'power2.in'
      }, 0.84);

      // Transition Scene 5 -> Scene 6 (Enter Interior Gallery)
      masterTl.to(scene5VillaZoomRef.current, {
        opacity: 0,
        duration: 0.12,
        ease: 'power2.inOut'
      }, 0.86);

      masterTl.to(scene6InteriorRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.14,
        ease: 'power2.out'
      }, 0.86);

      // ==============================================================
      // ACT VI: INTERIOR SANCTUARY & CALL TO ACTION (0.86 -> 1.00)
      // ==============================================================
      masterTl.to(scene6InteriorRef.current, {
        scale: 1.15,
        ease: 'none',
        duration: 0.14
      }, 0.86);

      masterTl.to(chapter6Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.12,
        ease: 'power2.out'
      }, 0.88);

    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleEnquireAdvisory = () => {
    setSelectedDrawerProject('Private Advisory - Architectural Acquisitions');
    setIsEnquiryDrawerOpen(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden select-none bg-[#0a0b0d] text-white"
    >
      {/* ============================================================== */}
      {/* 3D/CINEMATIC SCENE RIG (PINNED VIEWPORT CANVAS) */}
      {/* ============================================================== */}
      
      {/* SCENE 01: DUBAI SKYLINE & BURJ AT SUNSET */}
      <div
        ref={scene1SkylineRef}
        className="absolute inset-0 w-full h-full will-change-transform z-0"
      >
        <img
          src="/backgrounds/burj_sunset.jpg"
          alt="Dubai Skyline Horizon"
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />
      </div>

      {/* SCENE 02: AERIAL COASTLINE & PALM JUMEIRAH */}
      <div
        ref={scene2CoastRef}
        className="absolute inset-0 w-full h-full will-change-transform z-1"
      >
        <img
          src="/backgrounds/palm_aerial.jpg"
          alt="Dubai Palm Jumeirah Aerial Drone"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />
      </div>

      {/* SCENE 03: WATERFRONT MARINA / DISTRICT ENTRY */}
      <div
        ref={scene3DistrictRef}
        className="absolute inset-0 w-full h-full will-change-transform z-2"
      >
        <img
          src="/backgrounds/marina_twilight.jpg"
          alt="Dubai Enclave District"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />
      </div>

      {/* SCENE 04: WATERFRONT VILLA EXTERIOR ESTABLISHING SHOT */}
      <div
        ref={scene4VillaExtRef}
        className="absolute inset-0 w-full h-full will-change-transform z-3"
      >
        <img
          src="/images/hero_cinematic_residence.jpg"
          alt="Dubai Waterfront Villa Exterior"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />
      </div>

      {/* SCENE 05: VILLA EDITORIAL ZOOM / GLASS PORTAL */}
      <div
        ref={scene5VillaZoomRef}
        className="absolute inset-0 w-full h-full will-change-transform z-4"
      >
        <img
          src="/images/brand_statement_editorial.jpg"
          alt="Architectural Portal Approach"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />
      </div>

      {/* SCENE 06: ENTER THE INTERIOR SANCTUARY */}
      <div
        ref={scene6InteriorRef}
        className="absolute inset-0 w-full h-full will-change-transform z-5"
      >
        <img
          src="/images/private_client_advisory.jpg"
          alt="Dubai Modern Interior Gallery"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30 pointer-events-none" />
      </div>

      {/* ============================================================== */}
      {/* MOVIE PROGRESS & CHAPTER STATUS OVERLAY */}
      {/* ============================================================== */}
      <div className="absolute top-0 left-0 right-0 z-30 h-[2.5px] bg-white/10 pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full bg-white transition-all duration-75"
          style={{ width: '0%' }}
        />
      </div>

      {/* Movie Scene Tracker & Soundless Film Badge */}
      <div className="absolute top-20 sm:top-24 left-6 sm:left-12 z-30 flex items-center gap-4 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/90 font-medium">
          {currentChapter}
        </span>
      </div>

      {/* Scroll to Zoom Indicator (Bottom Right) */}
      <div className="absolute bottom-8 right-6 sm:right-12 z-30 flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-white/70 pointer-events-none">
        <span className="hidden sm:inline font-mono">Scroll Down To Travel Through Dubai</span>
        <div className="w-6 h-10 border border-white/40 rounded-full flex items-start justify-center p-1.5">
          <span className="w-1 h-2 bg-white rounded-full animate-bounce" />
        </div>
      </div>

      {/* ============================================================== */}
      {/* CINEMATIC STORYTELLING NARRATIVE CHAPTERS */}
      {/* ============================================================== */}
      <div className="editorial-container relative z-20 w-full h-full flex items-end pb-16 sm:pb-24 pointer-events-none">
        
        {/* CHAPTER 1: THE HORIZON */}
        <div
          ref={chapter1Ref}
          className="max-w-4xl pointer-events-auto will-change-transform"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-white" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase text-white/90">
              Dubai / Cinematic Voyage
            </span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[5.8rem] font-light leading-[1.03] tracking-[-0.02em] text-[#FFFFFF] mb-6">
            Dubai.<br />
            <span className="italic text-[#E7E3DA]">From the horizon to the hearth.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed max-w-xl mb-8">
            Scroll down to descend through the skyline, glide over the Arabian Gulf, and enter an extraordinary architectural residence.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/60 flex items-center gap-2">
              <span>Scroll to Begin Film</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </span>
          </div>
        </div>

        {/* CHAPTER 2: THE DESCENT OVER THE GULF */}
        <div
          ref={chapter2Ref}
          className="absolute bottom-20 sm:bottom-28 left-6 sm:left-12 lg:left-16 max-w-2xl pointer-events-auto will-change-transform"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 font-mono block mb-4">
            Act I / The Shoreline
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-[#FFFFFF] leading-[1.06] mb-4">
            Where Desert Stone<br />
            <span className="italic text-[#E7E3DA]">Meets Open Sea.</span>
          </h2>
          <p className="text-xs sm:text-base text-white/80 font-light max-w-lg leading-relaxed">
            Descending toward Palm Jumeirah. Finite freehold water frontage engineered as a global haven for architectural experimentation.
          </p>
        </div>

        {/* CHAPTER 3: THE ENCLAVE */}
        <div
          ref={chapter3Ref}
          className="absolute bottom-20 sm:bottom-28 left-6 sm:left-12 lg:left-16 max-w-2xl pointer-events-auto will-change-transform"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 font-mono block mb-4">
            Act II / The Destination
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-[#FFFFFF] leading-[1.06] mb-4">
            Approaching The Enclave.<br />
            <span className="italic text-[#E7E3DA]">A Singular Frond.</span>
          </h2>
          <p className="text-xs sm:text-base text-white/80 font-light max-w-lg leading-relaxed">
            Moving past the harbor. The camera focuses on a secluded shoreline commission secluded behind private security gates.
          </p>
        </div>

        {/* CHAPTER 4: THE RESIDENCE EXTERIOR */}
        <div
          ref={chapter4Ref}
          className="absolute bottom-20 sm:bottom-28 left-6 sm:left-12 lg:left-16 max-w-2xl pointer-events-auto will-change-transform"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 font-mono block mb-4">
            Act III / The Architecture
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-[#FFFFFF] leading-[1.06] mb-4">
            Waterfront Villa.<br />
            <span className="italic text-[#E7E3DA]">Form, Light & Water.</span>
          </h2>
          <p className="text-xs sm:text-base text-white/80 font-light max-w-lg leading-relaxed">
            Direct beach access, an infinity pool reflecting the Dubai sky, and limestone monolithic facades built for generational permanence.
          </p>
        </div>

        {/* CHAPTER 5: THE THRESHOLD */}
        <div
          ref={chapter5Ref}
          className="absolute bottom-20 sm:bottom-28 left-6 sm:left-12 lg:left-16 max-w-2xl pointer-events-auto will-change-transform"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 font-mono block mb-4">
            Act IV / The Glass Portal
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-[#FFFFFF] leading-[1.06] mb-4">
            Approaching The Threshold.<br />
            <span className="italic text-[#E7E3DA]">Step Beyond.</span>
          </h2>
          <p className="text-xs sm:text-base text-white/80 font-light max-w-lg leading-relaxed">
            The lens presses toward the double-height glass entryway. The exterior dissolves into private interior stillness.
          </p>
        </div>

        {/* CHAPTER 6: ENTER THE SANCTUARY & DESTINATION CTA */}
        <div
          ref={chapter6Ref}
          className="absolute bottom-16 sm:bottom-24 left-6 sm:left-12 lg:left-16 max-w-2xl pointer-events-auto will-change-transform"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 font-mono block mb-4">
            Conclusion / The Private Office
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-[#FFFFFF] leading-[1.06] mb-4">
            Welcome To<br />
            <span className="italic text-[#E7E3DA]">Dubai Estates.</span>
          </h2>
          <p className="text-xs sm:text-base text-white/80 font-light max-w-lg leading-relaxed mb-8">
            You have arrived. We connect buyers of verified international standing with the UAE’s most significant architectural residences.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => {
                setCurrentPage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-editorial-white group"
            >
              <span>Explore The Collection</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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

    </div>
  );
};
