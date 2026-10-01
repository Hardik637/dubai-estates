import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { 
  ShieldCheck, 
  MessageCircle, 
  Phone, 
  Mail, 
  Award, 
  Star, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  Building
} from 'lucide-react';

export const AgentProfilePage: React.FC = () => {
  const { selectedAgentId, setSelectedAgentId, agents, properties, formatPrice } = useApp();
  const agent = agents.find(a => a.id === selectedAgentId) || agents[0];
  const [activeTab, setActiveTab] = useState<'listings' | 'sold' | 'reviews'>('listings');

  // Agent's active properties
  const agentProperties = properties.filter(p => p.agentId === agent.id);

  const reviews = [
    {
      author: 'Sheikh M. Al-Qasimi',
      role: 'Family Office Principal',
      rating: 5,
      date: 'August 2026',
      comment: 'Ahmad provided exceptional, discreet guidance during our acquisition of a Palm Jumeirah Signature Villa. His understanding of off-market channels is second to none.'
    },
    {
      author: 'Alexander & Viktoria Vance',
      role: 'European Tech Founder',
      rating: 5,
      date: 'July 2026',
      comment: 'Elena and the Dubai Estates team handled our Golden Visa application and Downtown penthouse closing in under two weeks. Exemplary professionalism.'
    },
    {
      author: 'Dr. Rahul Singhania',
      role: 'Private Investor',
      rating: 5,
      date: 'May 2026',
      comment: 'Consistently provides top tier yields and transparent service charges calculations. Wouldn’t buy in Dubai with anyone else.'
    }
  ];

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${agent.name}, I would like to schedule an advisory consultation regarding prime Dubai real estate.`
    );
    window.open(`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-transparent pt-24 sm:pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        
        {/* Agent Directory Selector Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10 overflow-x-auto gap-4">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider whitespace-nowrap">
            Select Senior Consultant:
          </span>
          <div className="flex gap-2">
            {agents.map(a => (
              <button
                key={a.id}
                onClick={() => setSelectedAgentId(a.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                  agent.id === a.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'bg-[#111a2e] text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <img src={a.photo} alt="" className="w-5 h-5 rounded-full object-cover" />
                <span>{a.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 07. AGENT PROFILE CARD matching Figma screen 07 */}
        <div className="bg-[#111a2e] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Agent Photo */}
            <div className="relative shrink-0">
              <img 
                src={agent.photo} 
                alt={agent.name} 
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl object-cover border-2 border-amber-500/50 shadow-2xl"
              />
              <div className="absolute -bottom-3 -right-3 bg-amber-500 text-slate-950 p-2 rounded-xl font-bold shadow-lg flex items-center gap-1 text-xs">
                <Star className="w-3.5 h-3.5 fill-slate-950" />
                <span>{agent.rating}</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                  <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                    {agent.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{agent.title}</p>
                </div>

                <div className="flex items-center justify-center md:justify-end gap-2">
                  <span className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>RERA No: {agent.reraNumber}</span>
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl mb-6">
                {agent.bio}
              </p>

              {/* Specializations Pills matching Figma 07 */}
              <div className="mb-6">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                  Specializations:
                </span>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {agent.specializations.map(spec => (
                    <span 
                      key={spec}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-200"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons matching Figma 07: Contact, WhatsApp, Save */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button
                  onClick={handleWhatsApp}
                  className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-900/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Consultant</span>
                </button>
                <button
                  onClick={() => alert(`Calling ${agent.name} at ${agent.phone}`)}
                  className="py-2.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center gap-2 transition cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>{agent.phone}</span>
                </button>
                <a
                  href={`mailto:${agent.email}`}
                  className="py-2.5 px-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs flex items-center gap-2 transition"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* 3 Stats Bar matching Figma 07: 150+ Properties Sold, 8+ Years Experience, 4.9 Rating */}
          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 mt-8 text-center">
            <div>
              <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                {agent.propertiesSoldCount}+
              </div>
              <div className="text-xs text-slate-400 mt-1">Properties Sold</div>
            </div>
            <div className="border-x border-white/10">
              <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-amber-400">
                {agent.experienceYears}+
              </div>
              <div className="text-xs text-slate-400 mt-1">Years Experience</div>
            </div>
            <div>
              <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-1">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> {agent.rating}
              </div>
              <div className="text-xs text-slate-400 mt-1">Client Rating ({agent.reviewsCount})</div>
            </div>
          </div>
        </div>

        {/* Sub Tabs matching Figma 07: Active Listings, Sold Properties, Client Reviews */}
        <div className="flex border-b border-white/10 mb-8 gap-4">
          {[
            { id: 'listings', label: `Active Listings (${agentProperties.length})` },
            { id: 'sold', label: 'Recently Sold Properties (150+)' },
            { id: 'reviews', label: `Verified Client Reviews (${reviews.length})` }
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

        {/* Tab Content */}
        {activeTab === 'listings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentProperties.map(prop => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}

        {activeTab === 'sold' && (
          <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">Notable Closed Deals</h3>
            <div className="space-y-3">
              {[
                { name: 'Custom Palm Jumeirah Signature Villa', price: 'AED 62,000,000', date: 'Closed Aug 2026' },
                { name: 'Full Floor Penthouse, Downtown Dubai', price: 'AED 34,500,000', date: 'Closed June 2026' },
                { name: 'Emirates Hills Golf Mansion', price: 'AED 51,000,000', date: 'Closed April 2026' },
              ].map((deal, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5 text-xs">
                  <div>
                    <span className="font-semibold text-white block">{deal.name}</span>
                    <span className="text-slate-400 text-[11px]">{deal.date}</span>
                  </div>
                  <span className="font-serif-luxury font-bold text-amber-400 text-sm">{deal.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div key={idx} className="bg-[#111a2e] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 text-xs">
                  <div className="font-bold text-white">{rev.author}</div>
                  <div className="text-[11px] text-slate-400">{rev.role} • {rev.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
