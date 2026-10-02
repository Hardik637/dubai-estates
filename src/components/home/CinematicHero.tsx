import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 150;

export const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrameNum, setCurrentFrameNum] = useState<number>(1);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef<number>(1);
  const isRenderingRef = useRef<boolean>(false);

  // Helper to format frame path
  const getFramePath = (index: number) => {
    const frameNumber = String(index).padStart(4, '0');
    return `/hero-frame/frames_${frameNumber}.jpg`;
  };

  // Draw frame on canvas with object-fit: cover logic
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = imagesRef.current[frameIndex - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const hRatio = canvasWidth / imgWidth;
    const vRatio = canvasHeight / imgHeight;
    const ratio = Math.max(hRatio, vRatio);

    const centerShiftX = (canvasWidth - imgWidth * ratio) / 2;
    const centerShiftY = (canvasHeight - imgHeight * ratio) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(
      img,
      0,
      0,
      imgWidth,
      imgHeight,
      centerShiftX,
      centerShiftY,
      imgWidth * ratio,
      imgHeight * ratio
    );
  };

  // Resize canvas to client dimensions taking DPR into account
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = rect.width || window.innerWidth;
    const height = rect.height || window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    drawFrame(currentFrameRef.current);
  };

  useEffect(() => {
    // Initialize image cache array
    imagesRef.current = new Array(TOTAL_FRAMES).fill(null);

    // 1. Immediately load frame 1
    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      setIsFirstFrameLoaded(true);
      handleResize();
      drawFrame(1);
    };

    // 2. Preload remaining frames progressively
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        imagesRef.current[i - 1] = img;
        // If scroll landed on this frame before it finished loading, draw it now
        if (currentFrameRef.current === i) {
          drawFrame(i);
        }
      };
    }

    // 3. Setup resize handler
    window.addEventListener('resize', handleResize);
    handleResize();

    // 4. GSAP ScrollTrigger
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        anticipatePin: 1,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            TOTAL_FRAMES,
            Math.max(1, Math.round(self.progress * (TOTAL_FRAMES - 1)) + 1)
          );

          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            setCurrentFrameNum(frameIndex);

            if (!isRenderingRef.current) {
              isRenderingRef.current = true;
              requestAnimationFrame(() => {
                drawFrame(currentFrameRef.current);
                isRenderingRef.current = false;
              });
            }
          }
        }
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero-scroll-container"
      className="relative w-full h-[400vh] bg-[#0a0b0d] select-none"
    >
      {/* 
        Sticky full-viewport container:
        Zero UI on initial load. Pure cinematic visual experience.
        Uses dual-layer fallback: Background <img> element + HTML5 <canvas>
        guaranteeing the frame is NEVER black even before canvas paints or during rapid scrolls.
      */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#0a0b0d]">
        
        {/* Layer 1: Guaranteed Image Fallback (Always displays current frame) */}
        <img
          src={getFramePath(currentFrameNum)}
          alt="Dubai Residence Hero Frame"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none transition-none"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />

        {/* Layer 2: Smooth Hardware-Accelerated Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Subtle Scroll Hint on First Load */}
        <div 
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-700 ${
            isFirstFrameLoaded && currentFrameNum === 1 ? 'opacity-50' : 'opacity-0'
          }`}
        >
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white font-light drop-shadow-md">
            Scroll to Enter
          </span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-white to-transparent animate-pulse" />
        </div>

      </div>
    </div>
  );
};
