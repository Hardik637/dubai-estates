import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CinematicHero: React.FC = () => {
  const { setCurrentPage, setIsEnquiryDrawerOpen, setSelectedDrawerProject } = useApp();

  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const stage4Ref = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [activeStage, setActiveStage] = useState('01 / DUBAI PANORAMA');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Reliable, high-definition stock footage for architectural storytelling
  const desktopVideoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4';
  const posterImageUrl = '/images/hero_cinematic_residence.jpg';
  const interiorImageUrl = '/images/private_client_advisory.jpg';

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setReducedMotion(true);
      return;
    }

    const video = videoRef.current;
    if (video) {
      video.load();
      video.onloadeddata = () => {
        setVideoLoaded(true);
      };
      video.onerror = () => {
        setVideoFailed(true);
      };
    }

    const ctx = gsap.context(() => {
      if (!heroRef.current) return;

      gsap.set(stage1Ref.current, { opacity: 1, y: 0 });
      gsap.set(stage2Ref.current, { opacity: 0, y: 30 });
      gsap.set(stage3Ref.current, { opacity: 0, y: 30 });
      gsap.set(stage4Ref.current, { opacity: 0, y: 30 });

      // Target video playback time for rAF interpolation
      let targetTime = 0;
      let animFrameId: number;

      const updateVideoTime = () => {
        if (video && video.duration && !isNaN(video.duration) && video.readyState >= 2) {
          // Smooth interpolation towards target time
          const diff = targetTime - video.currentTime;
          if (Math.abs(diff) > 0.02) {
            video.currentTime += diff * 0.15;
          }
        }
        animFrameId = requestAnimationFrame(updateVideoTime);
      };
      animFrameId = requestAnimationFrame(updateVideoTime);

      // GSAP Pinning Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=2400',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${(p * 100).toFixed(1)}%`;
            }

            if (video && video.duration) {
              targetTime = p * video.duration;
            }

            if (p < 0.28) {
              setActiveStage('01 / DUBAI PANORAMA');
            } else if (p < 0.58) {
              setActiveStage('02 / DESCENT & DISTRICT');
            } else if (p < 0.82) {
              setActiveStage('03 / ARCHITECTURAL APPROACH');
            } else {
              setActiveStage('04 / ENTER SANCTUARY');
            }
          }
        }
      });

      // Stage 1 fades out
      tl.to(
        stage1Ref.current,
        {
          opacity: 0,
          y: -25,
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
          duration: 0.15
        },
        0.03
      );

      // Stage 2: Editorial perspective
      tl.to(
        stage2Ref.current,
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.15
        },
        0.25
      );
      tl.to(
        stage2Ref.current,
        {
          opacity: 0,
          y: -20,
          ease: 'power2.in',
          duration: 0.12
        },
        0.48
      );

      // Stage 3: Architectural detail
      tl.to(
        stage3Ref.current,
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.15
        },
        0.54
      );
      tl.to(
        stage3Ref.current,
        {
          opacity: 0,
          y: -20,
          ease: 'power2.in',
          duration: 0.12
        },
        0.75
      );

      // Stage 4: Enter Interior Sanctuary
      tl.to(
        stage4Ref.current,
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.18
        },
        0.82
      );

      return () => {
        cancelAnimationFrame(animFrameId);
      };
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleScrollToNext = () => {
    const nextEl = document.getElementById('brand-story');
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnquireAdvisory = () => {
    setSelectedDrawerProject('Private Advisory - Architectural Portfolio');
    setIsEnquiryDrawerOpen(true);
  };

  // Static Fallback for prefers-reduced-motion
  if (reducedMotion) {
    return (
      <section className="relative w-full min-h-[90vh] flex items-end pb-24 bg-[#111111] text-[#FFFFFF]">
        <div className="absolute inset-0 z-0">
          <img
            src={posterImageUrl}
            alt="Dubai Waterfront Residence"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/40 to-transparent" />
        </div>
        <div className="editorial-container relative z-10 w-full">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#E7E3DA] block mb-4">
            Dubai / Private Property House
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light text-[#FFFFFF] mb-6">
            Property, Curated.
          </h1>
          <p className="text-base text-[#E7E3DA] max-w-lg mb-8 font-light">
            Exceptional property. Considered differently. Connecting owners with qualified international capital.
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
      ref={heroRef}
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden select-none bg-[#111111] text-white"
    >
      {/* ================= LAYER 1: VIDEO CINEMATIC SCROLL LAYER ================= */}
      {!videoFailed && (
        <video
          ref={videoRef}
          src={desktopVideoUrl}
          playsInline
          muted
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-90' : 'opacity-0'
          }`}
        />
      )}

      {/* ================= LAYER 2: HIGH-RES POSTER FALLBACK / BASE ================= */}
      <div
        ref={posterRef}
        className={`absolute inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-700 ${
          videoLoaded && !videoFailed ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <img
          src={posterImageUrl}
          alt="Dubai Waterfront Villa"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Atmospheric Vignette & Contrast Control */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-black/25 pointer-events-none z-1" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none hidden md:block z-1" />

      {/* Editorial Top Scroll Meter */}
      <div className="absolute top-0 left-0 right-0 z-20 h-[2px] bg-white/10 pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full bg-white transition-all duration-75"
          style={{ width: '0%' }}
        />
      </div>

      {/* Stage Tracker in Top Left */}
      <div className="absolute top-24 left-6 sm:left-12 lg:left-16 z-20 hidden md:flex items-center gap-3 pointer-events-none">
        <span className="w-2 h-2 bg-white animate-pulse" />
        <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/80">
          {activeStage}
        </span>
      </div>

      {/* ================= EDITORIAL STAGES CONTAINER ================= */}
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
            <span className="italic text-[#E7E3DA]">Exceptional Property.</span>
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

        {/* ---------------- STAGE 02: EDITORIAL PERSPECTIVE ---------------- */}
        <div
          ref={stage2Ref}
          className="absolute bottom-20 sm:bottom-28 left-6 sm:left-12 lg:left-16 max-w-2xl pointer-events-auto will-change-transform"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 font-semibold block mb-4">
            01 / The Perspective
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-[#FFFFFF] leading-[1.08] tracking-[-0.01em] mb-4">
            A Different Way<br />
            <span className="italic text-[#E7E3DA]">To Discover Dubai.</span>
          </h2>
          <p className="text-xs sm:text-base text-white/80 font-light max-w-lg leading-relaxed">
            Beyond algorithmic volume. We curate singular addresses that withstand the scrutiny of architectural craftsmanship and generational capital.
          </p>
        </div>

        {/* ---------------- STAGE 03: ARCHITECTURAL FOCUS ---------------- */}
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

        {/* ---------------- STAGE 04: ENTER SANCTUARY ---------------- */}
        <div
          ref={stage4Ref}
          className="absolute bottom-20 sm:bottom-28 left-6 sm:left-12 lg:left-16 max-w-2xl pointer-events-auto will-change-transform"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 font-semibold block mb-4">
            03 / Private Sanctuary
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-[#FFFFFF] leading-[1.08] tracking-[-0.01em] mb-4">
            Welcome To<br />
            <span className="italic text-[#E7E3DA]">The Private Office.</span>
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

      {/* ================= SCROLL EXPLORATION PROMPT ================= */}
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
  );
};
