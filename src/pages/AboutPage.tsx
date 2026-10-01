import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowUpRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] pt-28 sm:pt-36 pb-24">
      <div className="editorial-container">
        
        {/* Header */}
        <div className="border-b border-[#E7E3DA] pb-12 mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#8A877F] block mb-2">
            The Private Office
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#111111] font-light max-w-4xl leading-[1.04]">
            Connecting singular Dubai architecture with qualified international capital.
          </h1>
        </div>

        {/* 2-Column Split: Image & Core Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-6 border border-[#E7E3DA] overflow-hidden bg-[#F7F4EC]">
            <img
              src="/images/brand_statement_editorial.jpg"
              alt="Dubai Estates Advisory"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8A877F] block">
              01 / Who We Are
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#111111] font-light leading-snug">
              An independent private property house founded on discretion, architectural scrutiny, and fiduciary clarity.
            </h2>
            <p className="text-sm text-[#2B2A27] font-light leading-relaxed">
              Headquartered in the Dubai International Financial Centre (DIFC), Dubai Estates serves family offices, private principals, and institutional investors seeking prime and super-prime residential property across the United Arab Emirates.
            </p>
            <p className="text-sm text-[#2B2A27] font-light leading-relaxed">
              We operate deliberately outside algorithmic volume. Every residence presented in our portfolio undergoes structural assessment, title verification, and architectural valuation before representation.
            </p>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-t border-b border-[#E7E3DA] mb-24">
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#8A877F]">01</span>
            <h3 className="font-editorial text-2xl text-[#111111] font-light">Direct Title Mandates</h3>
            <p className="text-xs text-[#2B2A27] font-light leading-relaxed">
              We interact exclusively with verified asset owners and official power-of-attorney holders, completely eliminating ghost listings and broker friction.
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs text-[#8A877F]">02</span>
            <h3 className="font-editorial text-2xl text-[#111111] font-light">Discreet Off-Market Treaty</h3>
            <p className="text-xs text-[#2B2A27] font-light leading-relaxed">
              A significant portion of our transaction volume is executed through private placement agreements without public marketing footprint.
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs text-[#8A877F]">03</span>
            <h3 className="font-editorial text-2xl text-[#111111] font-light">Sovereign Fiduciary Standards</h3>
            <p className="text-xs text-[#2B2A27] font-light leading-relaxed">
              Licensed and regulated by the Dubai Real Estate Regulatory Agency (RERA), upholding strict anti-money laundering and escrow compliance.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[#F7F4EC] border border-[#E7E3DA] p-12 sm:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#111111] font-light mb-2">
              Begin a confidential discussion.
            </h3>
            <p className="text-xs sm:text-sm text-[#8A877F] font-light">
              Connect directly with our DIFC private office advisory directors.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-editorial-primary shrink-0"
          >
            <span>Contact Private Office</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
