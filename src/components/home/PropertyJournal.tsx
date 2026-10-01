import React from 'react';
import { Reveal } from '../motion/Reveal';
import { ArrowUpRight } from 'lucide-react';

interface JournalArticle {
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

export const PropertyJournal: React.FC = () => {
  const articles: JournalArticle[] = [
    {
      category: 'Market Intelligence',
      readTime: '6 min read',
      title: 'Waterfront Scarcity: Why Coastal Real Estate Remains Dubai’s Strongest Capital Sanctuary',
      excerpt: 'With finite natural shoreline and stringent planning covenants across Palm Jumeirah and Jumeirah Bay, prime waterfront villas have detached from cyclical domestic macroeconomics.',
      date: 'Autumn 2026',
      image: '/backgrounds/marina_twilight.jpg'
    },
    {
      category: 'Sovereign Framework',
      readTime: '4 min read',
      title: 'The Freehold Advantage: Navigating 10-Year Golden Visa & Zero-Tax Capital Preservation',
      excerpt: 'A comprehensive briefing on foreign freehold title protections, zero personal and capital gains taxation, and streamlined family residency conventions under UAE law.',
      date: 'Autumn 2026',
      image: '/backgrounds/burj_sunset.jpg'
    },
    {
      category: 'Architectural Perspective',
      readTime: '5 min read',
      title: 'Beyond the Cliché: The Ascendance of Minimalist Brutalism and Tropical Modernism in Emirates Hills',
      excerpt: 'How leading international architectural practices are reshaping private Dubai mansions from ornate classical facades toward bioclimatic, rammed-earth, and travertine sanctuaries.',
      date: 'Autumn 2026',
      image: '/images/brand_statement_editorial.jpg'
    }
  ];

  return (
    <section className="relative py-28 sm:py-36 bg-[#0c0d10] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <Reveal delayMs={100}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c4ad8e] font-semibold block mb-3">
                07 / Intelligence & Discourse
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-light text-[#f7f5f0] tracking-[-0.01em]">
                The Dubai<br />
                <span className="italic text-[#eae6df]">Property Journal.</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#96938a] max-w-md font-light leading-relaxed">
              Thought leadership and macro analysis on micro-enclave yields, architectural innovation, and regulatory movements for serious investors.
            </p>
          </div>
        </Reveal>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <Reveal key={article.title} delayMs={150 * (idx + 1)} durationMs={900}>
              <article className="group cursor-pointer flex flex-col justify-between h-full bg-[#121316] border border-white/10 hover:border-[#c4ad8e]/40 transition-colors duration-400">
                
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#18191d]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 bg-[#0a0b0d]/85 backdrop-blur-md px-2.5 py-1 text-[9px] tracking-[0.2em] uppercase font-semibold text-[#c4ad8e] border border-white/10">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between text-[10px] tracking-[0.15em] uppercase text-[#96938a] font-mono mb-2">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-editorial text-xl sm:text-2xl text-[#f7f5f0] font-light group-hover:text-[#c4ad8e] transition-colors leading-snug mb-3">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#b8b5ad] font-light line-clamp-3 leading-relaxed mb-6">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#c4ad8e]">
                    <span className="text-[11px] tracking-[0.16em] uppercase font-semibold">
                      Read Monograph
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

              </article>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};
