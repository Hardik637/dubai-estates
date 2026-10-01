import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MortgageCalculator } from '../components/MortgageCalculator';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyMap } from '../components/PropertyMap';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Heart, 
  Share2, 
  MessageCircle, 
  Phone, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Download, 
  Check, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText
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
    showToast,
    navigateToAgent
  } = useApp();

  const property = properties.find(p => p.id === selectedPropertyId) || properties[0];
  const agent = agents.find(a => a.id === property.agentId) || agents[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'floorplan' | 'amenities' | 'location' | 'mortgage'>('overview');
  
  // Viewing schedule form state
  const [tourDate, setTourDate] = useState('2026-10-05');
  const [tourTime, setTourTime] = useState('11:00 AM');
  const [tourName, setTourName] = useState(user.name);
  const [tourEmail, setTourEmail] = useState(user.email);
  const [tourPhone, setTourPhone] = useState(user.phone);
  const [tourMessage, setTourMessage] = useState('I would like to request a private viewing of this residence.');
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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Direct property link copied to clipboard!');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${agent.name}, I am interested in inquiring about ${property.title} (Ref: ${property.referenceNumber}) listed at ${formatPrice(property.priceAED)}.`
    );
    window.open(`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  // Similar properties
  const similarProperties = properties
    .filter(p => p.id !== property.id && (p.community === property.community || p.propertyType === property.propertyType))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-transparent pt-24 sm:pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        
        {/* Breadcrumb Navigation matching Figma 03 */}
        <div className="flex items-center gap-2 text-xs text-[#baa99c] mb-6">
          <button 
            onClick={() => setCurrentPage('home')}
            className="hover:text-[#c87a50] transition cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button 
            onClick={() => setCurrentPage('properties')}
            className="hover:text-[#c87a50] transition cursor-pointer"
          >
            Properties
          </button>
          <span>/</span>
          <span className="text-[#c87a50]">{property.community}</span>
          <span>/</span>
          <span className="text-white truncate max-w-xs">{property.title}</span>
        </div>

        {/* Hero Gallery Section matching Figma 03 */}
        <div className="space-y-3 mb-8">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-slate-900 border border-[#3d2f27] shadow-2xl">
            <img 
              src={property.images[activeImageIdx]} 
              alt={property.title} 
              className="w-full h-full object-cover transition-all duration-500"
            />

            {/* Carousel navigation buttons */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIdx(prev => (prev === 0 ? property.images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImageIdx(prev => (prev === property.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 text-xs font-bold uppercase rounded-md bg-[#c87a50] text-[#120d0b] shadow-lg">
                {property.listingType}
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-md bg-black/60 text-white backdrop-blur-md">
                {property.completionStatus}
              </span>
            </div>

            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold text-white">
              Photo {activeImageIdx + 1} of {property.images.length}
            </div>
          </div>

          {/* Thumbnail Row matching Figma 03 */}
          <div className="grid grid-cols-5 gap-3">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                  activeImageIdx === idx ? 'border-[#c87a50] scale-[1.02] shadow-lg' : 'border-[#3d2f27] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Title, Pricing & Top Actions Bar matching Figma 03 */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-8 border-b border-[#3d2f27] gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#c87a50] font-semibold mb-1.5">
              <MapPin className="w-4 h-4" />
              <span>{property.address}</span>
            </div>
            <h1 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white leading-tight">
              {property.title}
            </h1>
            <div className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#c87a50] mt-2">
              {formatPrice(property.priceAED, property.listingType === 'For Rent')}
              <span className="text-xs text-[#baa99c] font-sans font-normal ml-3">
                (~{formatPrice(Math.round(property.priceAED / property.areaSqFt))} / sqft)
              </span>
            </div>
          </div>

          {/* Action Buttons: Contact Agent, WhatsApp, Save, Share matching Figma 03 */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleWhatsApp}
              className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-900/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Agent</span>
            </button>
            
            <button
              onClick={() => toggleFavorite(property.id)}
              className={`py-3 px-5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                favorite 
                  ? 'bg-red-500/20 text-red-400 border-red-500/40' 
                  : 'bg-[#18110e] border-[#3d2f27] text-white hover:bg-[#2b201a]'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{favorite ? 'Saved' : 'Save Property'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-3 rounded-xl bg-[#18110e] hover:bg-[#2b201a] border border-[#3d2f27] text-white transition cursor-pointer"
              title="Share Listing"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2-Column Main Content & Sticky Agent Sidebar matching Figma 03 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 8-COLS: Tabs & Detailed Info */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Specs Bar matching Figma 03 (Bedrooms, Bathrooms, Sqft, Type) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#221915] border border-[#3d2f27] rounded-2xl p-4 text-center">
              <div>
                <span className="text-[11px] text-[#baa99c] uppercase tracking-wider block mb-1">Bedrooms</span>
                <span className="text-xl font-bold font-serif-luxury text-white flex items-center justify-center gap-2">
                  <Bed className="w-5 h-5 text-[#c87a50]" /> {property.bedrooms}
                </span>
              </div>
              <div className="border-l border-[#3d2f27]">
                <span className="text-[11px] text-[#baa99c] uppercase tracking-wider block mb-1">Bathrooms</span>
                <span className="text-xl font-bold font-serif-luxury text-white flex items-center justify-center gap-2">
                  <Bath className="w-5 h-5 text-[#c87a50]" /> {property.bathrooms}
                </span>
              </div>
              <div className="border-l border-[#3d2f27]">
                <span className="text-[11px] text-[#baa99c] uppercase tracking-wider block mb-1">Built-Up Area</span>
                <span className="text-xl font-bold font-serif-luxury text-white flex items-center justify-center gap-2">
                  <Maximize2 className="w-5 h-5 text-[#c87a50]" /> {property.areaSqFt.toLocaleString()} sqft
                </span>
              </div>
              <div className="border-l border-[#3d2f27]">
                <span className="text-[11px] text-[#baa99c] uppercase tracking-wider block mb-1">Property Type</span>
                <span className="text-lg font-bold font-serif-luxury text-[#c87a50]">
                  {property.propertyType}
                </span>
              </div>
            </div>

            {/* Content Navigation Tabs matching Figma 03: Overview, Floor Plan, Amenities, Location, Mortgage */}
            <div className="flex border-b border-[#3d2f27] overflow-x-auto gap-2">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'floorplan', label: 'Floor Plan' },
                { id: 'amenities', label: 'Amenities' },
                { id: 'location', label: 'Location' },
                { id: 'mortgage', label: 'Mortgage Calculator' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition cursor-pointer border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#c87a50] text-[#c87a50] font-bold'
                      : 'border-transparent text-[#baa99c] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: OVERVIEW matching Figma 03 */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 font-serif-luxury">Property Description</h3>
                  <p className="text-xs sm:text-sm text-[#baa99c] leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>

                {/* Key Specifications Grid */}
                <div className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#c87a50] mb-4">
                    Property Specifications
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs">
                    <div>
                      <span className="text-[#baa99c] block mb-0.5">Property Type:</span>
                      <span className="font-semibold text-white">{property.propertyType}</span>
                    </div>
                    <div>
                      <span className="text-[#baa99c] block mb-0.5">Status:</span>
                      <span className="font-semibold text-white">{property.listingType}</span>
                    </div>
                    <div>
                      <span className="text-[#baa99c] block mb-0.5">Completion:</span>
                      <span className="font-semibold text-white">{property.completionStatus}</span>
                    </div>
                    <div>
                      <span className="text-[#baa99c] block mb-0.5">Furnishing:</span>
                      <span className="font-semibold text-white">{property.furnishing}</span>
                    </div>
                    <div>
                      <span className="text-[#baa99c] block mb-0.5">Developer:</span>
                      <span className="font-semibold text-[#df8a5e]">{property.developer || 'Prime Developer'}</span>
                    </div>
                    <div>
                      <span className="text-[#baa99c] block mb-0.5">Reference ID:</span>
                      <span className="font-semibold text-white font-mono">{property.referenceNumber}</span>
                    </div>
                    <div>
                      <span className="text-[#baa99c] block mb-0.5">RERA Permit #:</span>
                      <span className="font-semibold text-white font-mono">{property.reraPermitNumber}</span>
                    </div>
                    {property.plotSizeSqFt && (
                      <div>
                        <span className="text-[#baa99c] block mb-0.5">Plot Size:</span>
                        <span className="font-semibold text-white">{property.plotSizeSqFt.toLocaleString()} sqft</span>
                      </div>
                    )}
                    {property.serviceChargePerSqFt && (
                      <div>
                        <span className="text-[#baa99c] block mb-0.5">Service Charge:</span>
                        <span className="font-semibold text-white">AED {property.serviceChargePerSqFt} / sqft</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: FLOOR PLAN */}
            {activeTab === 'floorplan' && (
              <div className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-white font-serif-luxury">Architectural Floor Plan</h3>
                  <button 
                    onClick={() => showToast('Downloading high-res architectural PDF blueprint...')}
                    className="text-xs text-[#c87a50] hover:text-[#df8a5e] flex items-center gap-1.5 font-semibold cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> Download PDF Blueprint
                  </button>
                </div>
                <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900 border border-[#3d2f27] flex items-center justify-center p-4">
                  <img 
                    src={property.floorPlanUrl || 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'} 
                    alt="Floor Plan"
                    className="w-full h-full object-contain filter invert contrast-125" 
                  />
                </div>
                <p className="text-xs text-[#baa99c]">
                  Total Built-up Area: {property.areaSqFt.toLocaleString()} sqft. Certified by Dubai Municipality.
                </p>
              </div>
            )}

            {/* TAB 3: AMENITIES matching Figma 03 */}
            {activeTab === 'amenities' && (
              <div className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-4 font-serif-luxury">Residence & Community Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map(amenity => (
                    <div key={amenity} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#18110e] border border-[#3d2f27] text-xs text-slate-200">
                      <Sparkles className="w-4 h-4 text-[#c87a50] shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: LOCATION & MAP matching Figma 03 */}
            {activeTab === 'location' && (
              <div className="space-y-4">
                <div className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-4">
                  <h3 className="text-base font-bold text-white mb-2 font-serif-luxury">Location & Neighborhood</h3>
                  <p className="text-xs text-[#baa99c] mb-4">{property.address}</p>
                  <PropertyMap 
                    properties={[property]} 
                    highlightedPropertyId={property.id} 
                    className="h-[400px]"
                    zoom={14}
                  />
                </div>
              </div>
            )}

            {/* TAB 5: MORTGAGE CALCULATOR */}
            {activeTab === 'mortgage' && (
              <MortgageCalculator propertyPriceAED={property.priceAED} />
            )}
          </div>

          {/* RIGHT 4-COLS: Sticky Agent Card & Viewing Schedule Form matching Figma 03 */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            
            {/* Agent Card matching Figma 03 */}
            <div className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={agent.photo} 
                  alt={agent.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#c87a50]"
                />
                <div>
                  <h3 
                    onClick={() => navigateToAgent(agent.id)}
                    className="text-base font-bold text-white hover:text-[#c87a50] transition cursor-pointer"
                  >
                    {agent.name}
                  </h3>
                  <p className="text-xs text-[#baa99c]">{agent.title}</p>
                  <div className="flex items-center gap-2 text-[11px] text-[#c87a50] font-semibold mt-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>RERA No: {agent.reraNumber}</span>
                  </div>
                </div>
              </div>

              {/* Agent Quick Contact Buttons matching Figma 03 */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <button
                  onClick={() => alert(`Calling ${agent.name} at ${agent.phone}`)}
                  className="py-2.5 px-3 bg-[#2b201a] hover:bg-[#3d2f27] text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c87a50]" />
                  <span>Call Agent</span>
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>

              {/* Booking Form matching Figma 03: "Interested in this property? Schedule a viewing or get more information." */}
              <div className="border-t border-[#3d2f27] pt-5">
                <h4 className="text-sm font-bold text-white mb-1">Schedule Private Viewing</h4>
                <p className="text-xs text-[#baa99c] mb-4">Select preferred date & time for a guided walkthrough</p>

                {tourBooked ? (
                  <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-4 text-center">
                    <Check className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <h5 className="text-xs font-bold text-white">Viewing Requested!</h5>
                    <p className="text-[11px] text-[#baa99c] mt-1">
                      {agent.name} has received your request for {tourDate} at {tourTime}. You will receive a WhatsApp confirmation shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-[#baa99c] block mb-1">Date</label>
                        <input
                          type="date"
                          value={tourDate}
                          onChange={(e) => setTourDate(e.target.value)}
                          className="w-full bg-[#18110e] border border-[#3d2f27] rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#c87a50]"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-[#baa99c] block mb-1">Time</label>
                        <select
                          value={tourTime}
                          onChange={(e) => setTourTime(e.target.value)}
                          className="w-full bg-[#18110e] border border-[#3d2f27] rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#c87a50]"
                        >
                          <option>10:00 AM</option>
                          <option>11:30 AM</option>
                          <option>02:00 PM</option>
                          <option>04:30 PM</option>
                          <option>06:00 PM (Sunset)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-[#baa99c] block mb-1">Your Name</label>
                      <input
                        type="text"
                        value={tourName}
                        onChange={(e) => setTourName(e.target.value)}
                        placeholder="Hardik"
                        className="w-full bg-[#18110e] border border-[#3d2f27] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c87a50]"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-[#baa99c] block mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={tourPhone}
                        onChange={(e) => setTourPhone(e.target.value)}
                        placeholder="+971 50 123 4567"
                        className="w-full bg-[#18110e] border border-[#3d2f27] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c87a50]"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full cognac-btn py-3 rounded-xl text-xs font-bold text-center mt-2 cursor-pointer shadow-lg"
                    >
                      Book Private Tour
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Similar Properties Section matching Figma 03 */}
        {similarProperties.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#3d2f27]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-serif-luxury text-2xl font-bold text-white">Similar Properties</h3>
                <p className="text-xs text-[#baa99c]">Other prime residences in {property.community}</p>
              </div>
              <button
                onClick={() => setCurrentPage('properties')}
                className="text-xs font-semibold text-[#c87a50] hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map(sim => (
                <PropertyCard key={sim.id} property={sim} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

