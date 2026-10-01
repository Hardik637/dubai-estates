import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyMap } from '../components/PropertyMap';
import { 
  MapPin, 
  TrendingUp, 
  Users, 
  Building2, 
  Percent, 
  ChevronRight, 
  Sparkles, 
  Utensils, 
  Anchor, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const CommunityDetailPage: React.FC = () => {
  const { 
    selectedCommunityId, 
    communities, 
    properties, 
    setCurrentPage, 
    setFilters 
  } = useApp();

  const community = communities.find(c => c.id === selectedCommunityId) || communities[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'lifestyle' | 'market'>('overview');

  // Filter properties in this community
  const communityProperties = properties.filter(
    p => p.community.toLowerCase() === community.name.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-transparent pt-24 sm:pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        
        {/* Breadcrumb matching Figma 06 */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <button 
            onClick={() => setCurrentPage('home')}
            className="hover:text-amber-400 transition cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button 
            onClick={() => setCurrentPage('communities')}
            className="hover:text-amber-400 transition cursor-pointer"
          >
            Communities
          </button>
          <span>/</span>
          <span className="text-white font-medium">{community.name}</span>
        </div>

        {/* Hero Panorama matching Figma 06 */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl mb-8">
          <img 
            src={community.heroImage} 
            alt={community.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b111e] via-black/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="px-3 py-1 text-xs font-bold uppercase rounded-md bg-amber-500 text-slate-950 mb-2 inline-block">
                {community.category} Community
              </span>
              <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white leading-tight">
                {community.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
                {community.tagline}
              </p>
            </div>

            <button
              onClick={() => {
                setFilters(prev => ({ ...prev, community: community.name }));
                setCurrentPage('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="gold-btn py-2.5 px-5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg whitespace-nowrap"
            >
              <span>View All Properties ({community.stats.propertiesCount})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Stats Bar matching Figma 06: 12,000+ Residents, AED 2.8M Avg Price, 320+ Properties, 8.5% Rental Yield */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#111a2e] border border-white/10 rounded-2xl p-5 mb-10 text-center">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">Total Residents</span>
            <span className="text-2xl font-bold font-serif-luxury text-white">
              {community.stats.residents}
            </span>
          </div>
          <div className="border-l border-white/10">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">Average Price</span>
            <span className="text-2xl font-bold font-serif-luxury text-amber-400">
              {community.stats.averagePriceAED.split('-')[0]}
            </span>
          </div>
          <div className="border-l border-white/10">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">Active Listings</span>
            <span className="text-2xl font-bold font-serif-luxury text-white">
              {community.stats.propertiesCount}+
            </span>
          </div>
          <div className="border-l border-white/10">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">Rental Yield</span>
            <span className="text-2xl font-bold font-serif-luxury text-emerald-400">
              {community.stats.rentalYield}
            </span>
          </div>
        </div>

        {/* Sub Tabs matching Figma 06: Overview, Properties, Lifestyle, Market Insights */}
        <div className="flex border-b border-white/10 mb-8 gap-4">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'properties', label: `Available Properties (${communityProperties.length})` },
            { id: 'lifestyle', label: 'Lifestyle & Amenities' },
            { id: 'market', label: 'Market Insights & ROI' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-2 text-xs sm:text-sm font-semibold transition cursor-pointer border-b-2 ${
                activeTab === tab.id
                  ? 'border-amber-400 text-amber-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview matching Figma 06 */}
        {activeTab === 'overview' && (
          <div className="space-y-10">
            <div>
              <h2 className="text-xl font-bold font-serif-luxury text-white mb-3">About {community.name}</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                {community.description}
              </p>
            </div>

            {/* Gallery Strip matching Figma 06 */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4">Community Snapshots</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {community.images.map((img, i) => (
                  <div key={i} className="aspect-[16/10] rounded-2xl overflow-hidden border border-white/10">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Key Highlights */}
            <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-4 font-serif-luxury">Key Highlights & Landmarks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {community.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Available Properties matching Figma 06 */}
        {(activeTab === 'properties' || activeTab === 'overview') && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
                  Available Properties in {community.name}
                </h3>
                <p className="text-xs text-slate-400">Exclusive verified villas and sky residences</p>
              </div>
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, community: community.name }));
                  setCurrentPage('properties');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-amber-400 hover:underline cursor-pointer"
              >
                View All Listings
              </button>
            </div>

            {communityProperties.length === 0 ? (
              <p className="text-xs text-slate-400 py-6">No direct listings active today. Contact Ahmad Al Mansoori for off-market inventory.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {communityProperties.map(p => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Lifestyle */}
        {activeTab === 'lifestyle' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {community.lifestylePoints.map((item, idx) => (
                <div key={idx} className="bg-[#111a2e] border border-white/10 rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Market Insights & ROI */}
        {activeTab === 'market' && (
          <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-6 space-y-6 animate-fade-in">
            <h3 className="text-base font-bold text-white font-serif-luxury">Investment Performance & Yield Projections</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <span className="text-xs text-slate-400 block mb-1">Gross Rental Yield</span>
                <span className="text-2xl font-bold text-emerald-400">{community.stats.rentalYield}</span>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <span className="text-xs text-slate-400 block mb-1">YoY Capital Growth</span>
                <span className="text-2xl font-bold text-amber-400">{community.stats.capitalAppreciation}</span>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <span className="text-xs text-slate-400 block mb-1">Avg Occupancy Rate</span>
                <span className="text-2xl font-bold text-white">92.4%</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Historical transaction analytics from Dubai Land Department confirm continuous institutional and high-net-worth liquidity in {community.name}. Ideal for capital preservation, tax-free rental dividends, and long-term appreciation.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
