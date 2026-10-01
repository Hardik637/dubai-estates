import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { Heart, MessageSquare, Clock, LogOut } from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const { 
    user, 
    setUser, 
    properties, 
    favorites, 
    inquiries, 
    setCurrentPage, 
    formatPrice,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'collection' | 'inquiries' | 'profile'>('collection');

  const savedProperties = properties.filter(p => favorites.includes(p.id));

  const handleLogout = () => {
    setUser({
      name: 'Guest',
      email: '',
      phone: '',
      avatar: '',
      isLoggedIn: false
    });
    showToast('Logged out of private portal.');
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] pt-28 sm:pt-36 pb-24">
      <div className="editorial-container">
        
        {/* Header */}
        <div className="border-b border-[#E7E3DA] pb-10 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#8A877F] block mb-2">
              Private Client Desk
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl text-[#111111] font-light">
              My Collection
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-[#8A877F]">
              Principal: {user.name} ({user.email})
            </span>
            <button
              onClick={handleLogout}
              className="text-xs text-[#8A877F] hover:text-[#111111] flex items-center gap-1.5 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Disconnect</span>
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-8 border-b border-[#E7E3DA] pb-4 mb-12">
          <button
            onClick={() => setActiveTab('collection')}
            className={`text-xs font-mono tracking-wider uppercase transition cursor-pointer ${
              activeTab === 'collection' ? 'text-[#111111] font-bold border-b-2 border-[#111111] pb-4 -mb-4' : 'text-[#8A877F]'
            }`}
          >
            Saved Residences ({savedProperties.length})
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`text-xs font-mono tracking-wider uppercase transition cursor-pointer ${
              activeTab === 'inquiries' ? 'text-[#111111] font-bold border-b-2 border-[#111111] pb-4 -mb-4' : 'text-[#8A877F]'
            }`}
          >
            Active Inquiries ({inquiries.length})
          </button>
        </div>

        {/* Tab 1: Saved Properties */}
        {activeTab === 'collection' && (
          <div>
            {savedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {savedProperties.map(p => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            ) : (
              <div className="bg-[#F7F4EC] border border-[#E7E3DA] p-16 text-center space-y-4">
                <Heart className="w-8 h-8 text-[#8A877F] mx-auto" />
                <h3 className="font-editorial text-2xl text-[#111111]">
                  Your private collection is empty.
                </h3>
                <p className="text-xs text-[#8A877F] max-w-sm mx-auto">
                  Browse our architectural portfolio and select the heart icon to curate your personal dossier.
                </p>
                <button
                  onClick={() => {
                    setCurrentPage('properties');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-editorial-primary mt-4"
                >
                  Explore Portfolio
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            {inquiries.map(inq => (
              <div key={inq.id} className="bg-[#F7F4EC] border border-[#E7E3DA] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-[#8A877F] mb-1">
                    <span>Inquiry Ref: {inq.id}</span>
                    <span>•</span>
                    <span>Date: {inq.createdAt}</span>
                    <span>•</span>
                    <span className="text-[#111111] font-semibold">{inq.status}</span>
                  </div>
                  <h4 className="font-editorial text-xl text-[#111111]">
                    {inq.propertyTitle}
                  </h4>
                  <p className="text-xs text-[#2B2A27] font-light mt-1">
                    "{inq.message}"
                  </p>
                </div>

                <div className="text-right sm:border-l sm:border-[#E7E3DA] sm:pl-6">
                  <span className="text-[10px] font-mono uppercase text-[#8A877F] block">Consultant</span>
                  <span className="text-xs font-medium text-[#111111]">{inq.agentName}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
