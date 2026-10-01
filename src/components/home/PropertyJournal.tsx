import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight } from 'lucide-react';

export const PropertyJournal: React.FC = () => {
  const { setCurrentPage } = useApp();

  const articles = [
    {
      id: 'art-1',
      category: 'Market Intelligence',
      date: 'Autumn 2026',
      title: 'The Shift Toward Architectural Pedigree in Prime Dubai',
      excerpt: 'How sovereign capital is reallocating toward architect-designed, custom-built residences across Palm Jumeirah and Emirates Hills.',
      readTime: '6 min read'
    },
    {
      id: 'art-2',
      category: 'Regulatory Charter',
      date: 'Late 2026',
      title: 'Navigating the 10-Year UAE Golden Visa via Prime Real Estate',
      excerpt: 'A comprehensive fiduciary overview of qualification thresholds, title-deed structuring, and family residency privileges.',
      readTime: '8 min read'
    },
    {
      id: 'art-3',
      category: 'Urban Analysis',
      date: 'Winter 2026',
      title: 'Waterfront Scarcity: The Evolution of Private Shoreline Living',
      excerpt: 'Examining the finite supply of freehold beach frontage on Dubai’s man-made islands and coastal corridors.',
      readTime: '5 min read'
    }
  ];

  return (
    <section id="journal-section" className="section-cream py-24 sm:py-36 border-b border-[#E7E3DA]">
      <div className="editorial-container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-6">
          <div>
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[#8A877F] block mb-3">
              05 / Dubai Property Journal
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-[#111111] leading-[1.08] tracking-[-0.01em]">
              Market intelligence &<br />
              <span className="italic text-[#8A877F]">architectural notes.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#2B2A27] max-w-md font-light leading-relaxed">
            Analytical insights, regulatory frameworks, and perspectives on Dubai’s prime and super-prime property landscape.
          </p>
        </div>

        {/* 3 Editorial Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <article
              key={art.id}
              className="bg-white border border-[#E7E3DA] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#111111] group cursor-pointer"
              onClick={() => {
                setCurrentPage('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[#8A877F] mb-4">
                  <span>{art.category}</span>
                  <span>{art.date}</span>
                </div>

                <h3 className="font-editorial text-2xl text-[#111111] font-light leading-snug mb-3 group-hover:text-[#8A877F] transition-colors">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#2B2A27] font-light leading-relaxed mb-6">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-[#E7E3DA] flex items-center justify-between text-xs font-medium uppercase tracking-[0.15em] text-[#111111]">
                <span>{art.readTime}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
