import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface AutoCarouselProps {
  children: React.ReactNode[];
  intervalMs?: number;
  autoPlay?: boolean;
  className?: string;
  itemClassName?: string;
}

export const AutoCarousel: React.FC<AutoCarouselProps> = ({
  children,
  intervalMs = 3800,
  autoPlay = true,
  className = '',
  itemClassName = 'shrink-0 w-[84vw] sm:w-[360px] lg:w-[390px] snap-start'
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeDot, setActiveDot] = useState(0);

  const getScrollStep = () => {
    const el = scrollContainerRef.current;
    if (!el || !el.firstElementChild) return 340;
    return (el.firstElementChild as HTMLElement).offsetWidth + 24;
  };

  const checkScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    const step = getScrollStep();
    const currentIdx = Math.round(el.scrollLeft / step);
    setActiveDot(Math.min(children.length - 1, Math.max(0, currentIdx)));
  }, [children.length]);

  const scrollNext = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const step = getScrollStep();

    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 20) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: step, behavior: 'smooth' });
    }
  }, []);

  const scrollPrev = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const step = getScrollStep();

    if (el.scrollLeft <= 20) {
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: -step, behavior: 'smooth' });
    }
  }, []);

  const scrollToItem = (idx: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const step = getScrollStep();
    el.scrollTo({ left: idx * step, behavior: 'smooth' });
  };

  // Auto-play timer
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(() => {
      scrollNext();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, intervalMs, scrollNext]);

  // Listener for user manual scrolling to update dots
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScrollState, { passive: true });
    return () => el.removeEventListener('scroll', checkScrollState);
  }, [checkScrollState]);

  return (
    <div
      className={`relative w-full group ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
    >
      {/* Scrollable Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 px-1 -mx-1 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className={itemClassName}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Carousel Navigation Bar */}
      <div className="flex items-center justify-between mt-4 px-2">
        {/* Progress Dots */}
        <div className="flex items-center gap-1.5">
          {children.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToItem(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeDot
                  ? 'w-7 bg-[#c87a50]'
                  : 'w-1.5 bg-[#3d2f27] hover:bg-[#523f35]'
              }`}
              aria-label={`Jump to property ${idx + 1}`}
            />
          ))}
          <span className="text-[10px] text-[#baa99c] ml-2 font-medium hidden sm:inline">
            {isPaused ? 'Paused' : 'Auto-moving'}
          </span>
        </div>

        {/* Left & Right Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={scrollPrev}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#221915]/90 hover:bg-[#c87a50] hover:text-[#120d0b] border border-[#3d2f27] text-[#f5ede6] flex items-center justify-center transition cursor-pointer shadow-lg active:scale-95"
            aria-label="Previous property"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollNext}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#221915]/90 hover:bg-[#c87a50] hover:text-[#120d0b] border border-[#3d2f27] text-[#f5ede6] flex items-center justify-center transition cursor-pointer shadow-lg active:scale-95"
            aria-label="Next property"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
