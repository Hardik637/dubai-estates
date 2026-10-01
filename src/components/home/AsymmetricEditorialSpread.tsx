import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AsymmetricEditorialSpread: React.FC = () => {
  const { setCurrentPage } = useApp();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Parallax choreography: Text and image translate at independent rates
      gsap.to(imageRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });

      gsap.to(textRef.current, {
        y: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-cream py-28 sm:py-40 border-b border-[#E7E3DA] overflow-hidden"
    >
      <div className="editorial-container">
        
        {/* Editorial Top Marker */}
        <div className="flex items-center justify-between mb-16 sm:mb-24 pb-4 border-b border-[#E7E3DA]">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#8A877F]">
            PLATE II / COMPOSITION & FORM
          </span>
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#8A877F]">
            SPATIAL PROPORTION
          </span>
        </div>

        {/* Asymmetric Split Layout matching user spec:
            small label
                                large architectural image
            large headline
                                small description
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Label & Large Serif Headline (5 cols) */}
          <div ref={textRef} className="lg:col-span-5 space-y-8 will-change-transform">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#8A877F] block">
              Architectural Scrutiny
            </span>

            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light text-[#111111] leading-[1.0] tracking-[-0.02em]">
              PROPERTY<br />
              IS MORE THAN<br />
              <span className="italic font-light">AN ADDRESS.</span>
            </h2>

            <div className="pt-6 border-t border-[#E7E3DA] space-y-4">
              <p className="text-sm text-[#2B2A27] font-light leading-relaxed">
                We believe true architectural value cannot be reduced to algorithmic filters or square footage metrics. It is felt in natural illumination, materiality, acoustic isolation, and spatial intention.
              </p>
              
              <button
                onClick={() => {
                  setCurrentPage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#111111] hover:text-[#8A877F] transition pt-2"
              >
                <span>Read The Manifesto</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Large Architectural Image & Supporting Description (7 cols) */}
          <div ref={imageRef} className="lg:col-span-7 space-y-6 will-change-transform">
            <div className="relative aspect-[16/11] bg-white border border-[#E7E3DA] overflow-hidden shadow-sm">
              <img
                src="/assets/editorial/architectural-facade.jpg"
                alt="Architectural Composition"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[9px] font-mono uppercase tracking-wider text-[#111111] border border-[#E7E3DA]">
                CANOPY & TRAVERTINE
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#8A877F] font-mono gap-2 pt-2">
              <span>DUBAI HILLS ESTATE • MODERNIST RESIDENCE</span>
              <span>FIGURE 02.4</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
