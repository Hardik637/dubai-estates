import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 150;

export const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(1);

  // Helper to get formatted frame path
  const getFramePath = (index: number) => {
    const frameNumber = String(index).padStart(4, '0');
    return `/hero-frame/frames_${frameNumber}.jpg`;
  };

  // Draw a frame covering the entire canvas (aspect ratio cover math)
  const renderFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
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

  // Resize canvas according to device pixel ratio for crystal-clear retina rendering
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    // Re-draw current frame immediately after resize
    const currImg = imagesRef.current[currentFrameRef.current - 1];
    if (currImg && currImg.complete) {
      renderFrame(currImg);
    }
  };

  useEffect(() => {
    // 1. Preload images
    const images: HTMLImageElement[] = [];
    imagesRef.current = images;

    // First load frame 1 immediately to paint initial view with zero delay
    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    firstImg.onload = () => {
      images[0] = firstImg;
      resizeCanvas();
      renderFrame(firstImg);
      setImagesLoaded(true);
    };

    // Load remaining frames
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      if (i === 1) {
        images[0] = firstImg;
        continue;
      }
      const img = new Image();
      img.src = getFramePath(i);
      images[i - 1] = img;
    }

    // 2. Setup Resize listener
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 3. Setup GSAP ScrollTrigger pinning and scrubbing
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const frameState = { frame: 1 };

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: '.hero-pinned-viewport',
        scrub: 0.5, // Crisp, ultra-smooth interpolation
        anticipatePin: 1,
        onUpdate: (self) => {
          // Map scroll progress (0.0 to 1.0) to frame index 1 to 150
          const targetFrame = Math.min(
            TOTAL_FRAMES,
            Math.max(1, Math.round(self.progress * (TOTAL_FRAMES - 1)) + 1)
          );

          if (targetFrame !== currentFrameRef.current) {
            currentFrameRef.current = targetFrame;
            frameState.frame = targetFrame;
            const img = imagesRef.current[targetFrame - 1];
            if (img && img.complete) {
              renderFrame(img);
            }
          }
        }
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero-scroll-container"
      className="relative w-full h-[380vh] bg-black select-none pointer-events-none"
    >
      {/* 
        Pinned 100vh viewport:
        ABSOLUTELY ZERO UI on initial load.
        No text, no navbar, no buttons, no branding, no overlay.
        Pure cinematic canvas experience.
      */}
      <div className="hero-pinned-viewport sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Subtle initial hint indicator that disappears as soon as user touches scroll */}
        <div 
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-700 ${
            imagesLoaded ? 'opacity-40 hover:opacity-70' : 'opacity-0'
          }`}
        >
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white font-light">
            Scroll to Enter
          </span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-white to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
};
