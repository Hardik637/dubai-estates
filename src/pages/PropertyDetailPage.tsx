import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyMap } from '../components/PropertyMap';
import { 
  Heart, 
  Share2, 
  Calendar, 
  MapPin, 
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const PropertyDetailPage: React.FC = () => {
  const { 
    selectedPropertyId, 
    properties, 
    agents, 
    formatPrice, 
    isFavorite, 
    toggleFavorite, 
    setCurrentPage, 
    submitInquiry,
    user,
    showToast
  } = useApp();

  const property = properties.find(p => p.id === selectedPropertyId) || properties[0];
  const agent = agents.find(a => a.id === property.agentId) || agents[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  
  // Viewing schedule form state
  const [tourDate, setTourDate] = useState('2026-10-10');
  const [tourTime, setTourTime] = useState('11:00 AM');
  const [tourName, setTourName] = useState(user.name);
  const [tourEmail, setTourEmail] = useState(user.email);
  const [tourPhone, setTourPhone] = useState(user.phone);
  const [tourMessage, setTourMessage] = useState('I would like to arrange a private walkthrough of this residence.');
  const [tourBooked, setTourBooked] = useState(false);

  const favorite = isFavorite(property.id);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyPriceAED: property.priceAED,
      propertyImage: property.images[0],
      agentId: agent.id,
      agentName: agent.name,
      userName: tourName,
      userEmail: tourEmail,
      userPhone: tourPhone,
      date: tourDate,
      preferredTourTime: tourTime,
      message: tourMessage
    });
    setTourBooked(true);
  };

  const similarProperties = properties
    .filter(p => p.id !== property.id && (p.community === property.community || p.propertyType === property.propertyType))
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] pt-24 sm:pt-32 pb-24">
      <div className="editorial-container">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E7E3DA]">
          <button
            onClick={() => {
              setCurrentPage('properties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8A877F] hover:text-[#111111] transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Collection</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleFavorite(property.id)}
              className="p-2 border border-[#E7E3DA] hover:border-[#111111] transition cursor-pointer flex items-center gap-2 text-xs"
              title="Save residence"
            >
              <Heart className={`w-3.5 h-3.5 ${favorite ? 'fill-[#111111]' : ''}`} />
              <span className="hidden sm:inline font-mono">{favorite ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                showToast('Private dossier link copied to clipboard');
              }}
              className="p-2 border border-[#E7E3DA] hover:border-[#111111] transition cursor-pointer flex items-center gap-2 text-xs"
              title="Share residence dossier"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-mono">Share</span>
            </button>
          </div>
        </div>

        {/* ================= HERO CINEMATIC GALLERY ================= */}
        <div className="mb-14 space-y-4">
          {/* Main Massive Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F7F4EC] border border-[#E7E3DA]">
            <img
              src={property.images[activeImageIdx]}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            
            {/* Gallery Navigation Arrows */}
            {property.images.length > 1 && (
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => setActiveImageIdx(prev => (prev === 0 ? property.images.length - 1 : prev - 1))}
                  className="p-3 bg-white/90 text-[#111111] hover:bg-white transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveImageIdx(prev => (prev === property.images.length - 1 ? 0 : prev + 1))}
                  className="p-3 bg-white/90 text-[#111111] hover:bg-white transition cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="absolute top-4 left-4 bg-[#111111] text-white text-[9px] font-mono tracking-[0.2em] uppercase px-3 py-1.5">
              Ref: {property.referenceNumber}
            </div>
          </div>

          {/* Thumbnail Track */}
          {property.images.length > 1 && (
            <div className="grid grid-cols-5 gap-3">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`aspect-[16/10] overflow-hidden border transition cursor-pointer ${
                    activeImageIdx === idx ? 'border-[#111111] ring-1 ring-[#111111]' : 'border-[#E7E3DA] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================= 2-COLUMN DOSSIER LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Architectural Story & Facts (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Title & Key Header Facts */}
            <div className="border-b border-[#E7E3DA] pb-8 space-y-4">
              <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.25em] text-[#8A877F]">
                <span>{property.community}</span>
                <span>•</span>
                <span>{property.propertyType}</span>
                <span>•</span>
                <span>{property.completionStatus}</span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-5xl text-[#111111] font-light leading-tight">
                {property.title}
              </h1>

              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase text-[#8A877F] block">
                  Offered At
                </span>
                <span className="font-editorial text-3xl sm:text-4xl text-[#111111] font-medium">
                  {formatPrice(property.priceAED, property.listingType === 'For Rent')}
                </span>
              </div>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 bg-[#F7F4EC] border border-[#E7E3DA]">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8A877F] block">Bedrooms</span>
                <span className="font-editorial text-2xl text-[#111111] font-light">{property.bedrooms} Suites</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8A877F] block">Bathrooms</span>
                <span className="font-editorial text-2xl text-[#111111] font-light">{property.bathrooms} Baths</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8A877F] block">Internal Area</span>
                <span className="font-editorial text-2xl text-[#111111] font-light">{property.areaSqFt.toLocaleString()} Sq Ft</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8A877F] block">Furnishing</span>
                <span className="font-editorial text-2xl text-[#111111] font-light">{property.furnishing}</span>
              </div>
            </div>

            {/* Architectural Narrative Description */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8A877F] block">
                Architectural Overview
              </span>
              <p className="text-sm sm:text-base text-[#2B2A27] font-light leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Key Amenities */}
            <div className="space-y-4 pt-8 border-t border-[#E7E3DA]">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8A877F] block">
                Amenities & Features
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-3 p-3 bg-white border border-[#E7E3DA]">
                    <span className="w-1.5 h-1.5 bg-[#111111]" />
                    <span className="text-xs text-[#2B2A27] font-light">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map Frame */}
            <div className="space-y-4 pt-8 border-t border-[#E7E3DA]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8A877F]">
                  Location & Setting
                </span>
                <span className="text-xs font-mono text-[#8A877F]">{property.address}</span>
              </div>
              <div className="h-72 border border-[#E7E3DA] bg-[#F7F4EC] overflow-hidden">
                <PropertyMap
                  properties={[property]}
                  highlightedPropertyId={property.id}
                />
              </div>
            </div>

          </div>

          {/* Right Column: Private Client Consultation & Viewing Form (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-[#F7F4EC] border border-[#E7E3DA] p-6 sm:p-8 space-y-6">
              
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8A877F] block mb-1">
                  Private Client Desk
                </span>
                <h3 className="font-editorial text-2xl text-[#111111] font-light">
                  Arrange Private Viewing
                </h3>
              </div>

              {tourBooked ? (
                <div className="p-6 bg-white border border-[#E7E3DA] text-center space-y-3">
                  <ShieldCheck className="w-8 h-8 text-[#111111] mx-auto" />
                  <h4 className="font-editorial text-xl text-[#111111]">Viewing Request Received</h4>
                  <p className="text-xs text-[#8A877F] font-light">
                    Our Senior Advisory Consultant for {property.community} will contact you shortly to coordinate security access.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={tourName}
                      onChange={(e) => setTourName(e.target.value)}
                      className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-2.5 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={tourEmail}
                      onChange={(e) => setTourEmail(e.target.value)}
                      className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-2.5 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={tourPhone}
                      onChange={(e) => setTourPhone(e.target.value)}
                      className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-2.5 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1">Date</label>
                      <input
                        type="date"
                        value={tourDate}
                        onChange={(e) => setTourDate(e.target.value)}
                        className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-2 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1">Time</label>
                      <input
                        type="text"
                        value={tourTime}
                        onChange={(e) => setTourTime(e.target.value)}
                        className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-2 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1">Private Message</label>
                    <textarea
                      rows={2}
                      value={tourMessage}
                      onChange={(e) => setTourMessage(e.target.value)}
                      className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-2.5 focus:outline-none resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-editorial-primary w-full justify-center">
                    <span>Submit Viewing Mandate</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              {/* RERA Vetted Stamp */}
              <div className="pt-4 border-t border-[#E7E3DA] flex items-center justify-between text-[10px] font-mono text-[#8A877F]">
                <span>RERA Permit: {property.reraPermitNumber}</span>
                <span>ORN #88921</span>
              </div>

            </div>
          </div>

        </div>

        {/* Similar Residences */}
        {similarProperties.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#E7E3DA]">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8A877F] block mb-4">
              Comparable Commissions
            </span>
            <h2 className="font-editorial text-3xl text-[#111111] font-light mb-8">
              Similar Addresses in {property.community}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {similarProperties.map(p => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
