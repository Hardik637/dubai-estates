import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, setIsGoldenVisaModalOpen, setIsEnquiryDrawerOpen, setSelectedDrawerProject } = useApp();

  const handleEnquiryClick = (mandateName: string) => {
    setSelectedDrawerProject(mandateName);
    setIsEnquiryDrawerOpen(true);
  };

  return (
    <footer className="bg-[#111111] text-[#F7F4EC] border-t border-[#1B1B1B]">
      
      {/* Editorial Top Hero Statement */}
      <div className="editorial-container pt-20 pb-16 border-b border-[#2B2A27]">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase font-mono text-[#8A877F] block mb-4">
              Dubai Estates • Private Property House
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-light tracking-[-0.02em] text-[#FFFFFF] leading-[1.05]">
              Property, considered.<br />
              <span className="italic text-[#8A877F]">A distinct perspective on Dubai.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                setCurrentPage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-editorial-white"
            >
              <span>Explore Collection</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setCurrentPage('sell');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-editorial-ghost-white"
            >
              <span>List With Us</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 4 Column Index */}
      <div className="editorial-container py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-xs">
        
        {/* Col 1: Selected Addresses */}
        <div className="space-y-4">
          <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#8A877F] block pb-2 border-b border-[#2B2A27]">
            01 / Singular Addresses
          </span>
          <ul className="space-y-2.5 text-[#E7E3DA] font-light">
            {[
              'Palm Jumeirah Signature Beachfront',
              'Downtown Dubai Sky Penthouse',
              'Dubai Hills Fairway Vista',
              'Emirates Hills Private Sanctuary',
              'Dubai Marina Waterfront Duplex'
            ].map(item => (
              <li key={item}>
                <button
                  onClick={() => handleEnquiryClick(item)}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 2: Sovereign Communities */}
        <div className="space-y-4">
          <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#8A877F] block pb-2 border-b border-[#2B2A27]">
            02 / Communities
          </span>
          <ul className="space-y-2.5 text-[#E7E3DA] font-light">
            {[
              'Palm Jumeirah',
              'Downtown Dubai',
              'Dubai Hills Estate',
              'Emirates Hills',
              'Dubai Marina'
            ].map(comm => (
              <li key={comm}>
                <button
                  onClick={() => {
                    setCurrentPage('communities');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  {comm}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Fiduciary Advisory */}
        <div className="space-y-4">
          <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#8A877F] block pb-2 border-b border-[#2B2A27]">
            03 / Advisory & Representation
          </span>
          <ul className="space-y-2.5 text-[#E7E3DA] font-light">
            <li>
              <button
                onClick={() => setIsGoldenVisaModalOpen(true)}
                className="hover:text-white transition cursor-pointer text-left"
              >
                UAE 10-Year Golden Visa Desk
              </button>
            </li>
            <li>
              <button
                onClick={() => { setCurrentPage('sell'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-white transition cursor-pointer text-left"
              >
                Owner Mandate & Private Consignment
              </button>
            </li>
            <li>
              <button
                onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-white transition cursor-pointer text-left"
              >
                Heritage & Fiduciary Charter
              </button>
            </li>
            <li>
              <button
                onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-white transition cursor-pointer text-left"
              >
                Private Client Office (DIFC)
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Private Desk Location */}
        <div className="space-y-4">
          <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#8A877F] block pb-2 border-b border-[#2B2A27]">
            04 / DIFC Private Office
          </span>
          <div className="text-[#8A877F] space-y-2 font-light leading-relaxed">
            <p className="text-[#F7F4EC]">
              Burj Daman Tower, Level 42<br />
              Dubai International Financial Centre<br />
              Dubai, United Arab Emirates
            </p>
            <p className="pt-2 text-xs">
              <span className="text-white block font-medium">+971 4 800 3782</span>
              <span>private@dubaiestates.ae</span>
            </p>
            <p className="text-[11px] pt-1">
              RERA Certified Agency • ORN #88921
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="editorial-container py-8 border-t border-[#2B2A27] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#8A877F]">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-[#F7F4EC]" />
          <span>© 2026 DUBAI ESTATES. All rights reserved. Registered with Dubai Land Department.</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-white transition cursor-pointer">Privacy Charter</span>
          <span>•</span>
          <span className="hover:text-white transition cursor-pointer">Regulatory Disclosures</span>
          <span>•</span>
          <span className="hover:text-white transition cursor-pointer">Fiduciary Governance</span>
        </div>
      </div>

    </footer>
  );
};
