import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Property, PropertyType, ListingStatus } from '../types';
import confetti from 'canvas-confetti';
import { 
  Building2, 
  Globe, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon,
  Sparkles,
  DollarSign,
  User,
  Key
} from 'lucide-react';

export const SellPropertyPage: React.FC = () => {
  const { addNewProperty, user, navigateToProperty, setCurrentPage, formatPrice } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [submittedPropertyId, setSubmittedPropertyId] = useState<string | null>(null);

  // Form states matching Figma 04
  // Step 1: Details
  const [propertyType, setPropertyType] = useState<PropertyType>('Villa');
  const [listingType, setListingType] = useState<ListingStatus>('For Sale');
  const [bedrooms, setBedrooms] = useState(4);
  const [bathrooms, setBathrooms] = useState(5);
  const [community, setCommunity] = useState('Palm Jumeirah');
  const [subCommunity, setSubCommunity] = useState('Frond M');
  const [sizeSqFt, setSizeSqFt] = useState(5800);
  const [title, setTitle] = useState('Luxury Beachfront Villa with Private Infinity Pool');
  const [description, setDescription] = useState('Spectacular contemporary villa featuring custom Italian interiors, private beach frontage, manicured tropical gardens, and smart home automation.');
  const [furnishing, setFurnishing] = useState<'Furnished' | 'Unfurnished' | 'Semi-Furnished'>('Furnished');

  // Step 2: Photos
  const presetLuxuryImages = [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85'
  ];
  const [selectedImages, setSelectedImages] = useState<string[]>([presetLuxuryImages[0], presetLuxuryImages[1]]);
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Step 3: Pricing
  const [priceAED, setPriceAED] = useState(18500000);
  const [developer, setDeveloper] = useState('Emaar Properties');
  const [serviceCharge, setServiceCharge] = useState(4.5);

  // Step 4: Seller Info
  const [sellerName, setSellerName] = useState(user.name);
  const [sellerEmail, setSellerEmail] = useState(user.email);
  const [sellerPhone, setSellerPhone] = useState(user.phone);
  const [titleDeedStatus, setTitleDeedStatus] = useState('Ready Title Deed (Oqood/DLD)');

  const handleAddCustomImage = () => {
    if (customImageUrl && customImageUrl.startsWith('http')) {
      setSelectedImages(prev => [...prev, customImageUrl]);
      setCustomImageUrl('');
    }
  };

  const handleTogglePresetImage = (url: string) => {
    if (selectedImages.includes(url)) {
      if (selectedImages.length > 1) {
        setSelectedImages(selectedImages.filter(img => img !== url));
      }
    } else {
      setSelectedImages([...selectedImages, url]);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `custom-${Date.now()}`;
    const refNum = `DE-SELL-${Math.floor(1000 + Math.random() * 9000)}`;

    const newProp: Property = {
      id: newId,
      title: title || `${bedrooms} Bedroom ${propertyType} in ${community}`,
      slug: `custom-${newId}`,
      priceAED: Number(priceAED),
      listingType: listingType,
      propertyType: propertyType,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      areaSqFt: Number(sizeSqFt),
      community: community,
      subCommunity: subCommunity,
      address: `${subCommunity ? subCommunity + ', ' : ''}${community}, Dubai, UAE`,
      completionStatus: 'Ready',
      handoverDate: 'Ready to Move',
      furnishing: furnishing,
      developer: developer,
      reraPermitNumber: `RERA-REG-${Math.floor(10000 + Math.random() * 90000)}`,
      referenceNumber: refNum,
      description: description,
      featured: true,
      images: selectedImages.length > 0 ? selectedImages : presetLuxuryImages.slice(0, 3),
      amenities: [
        'Private Swimming Pool',
        'Concierge Service',
        'Security 24/7',
        'Smart Home System',
        'Balcony'
      ],
      coordinates: {
        lat: community === 'Palm Jumeirah' ? 25.1124 : community === 'Downtown Dubai' ? 25.1972 : 25.1118,
        lng: community === 'Palm Jumeirah' ? 55.1390 : community === 'Downtown Dubai' ? 55.2744 : 55.2443
      },
      agentId: 'agent-1',
      createdAt: new Date().toISOString().split('T')[0]
    };

    addNewProperty(newProp);
    setSubmittedPropertyId(newId);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) { /* ignore */ }
  };

  return (
    <div className="min-h-screen bg-transparent pt-24 sm:pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">


        
        {/* Hero Banner matching Figma 04 */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" /> High-End Landlord & Seller Portal
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white leading-tight">
            Sell Your Property <br />
            <span className="gold-gradient-text">with Confidence</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-3">
            Reach serious buyers worldwide. Get the best market valuation. Work with Dubai's certified real estate leaders.
          </p>
        </div>

        {/* 3 Value Pillars matching Figma 04 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-5 text-center">
            <Globe className="w-8 h-8 text-amber-400 mx-auto mb-2.5" />
            <h3 className="text-sm font-bold text-white mb-1">Wide Exposure</h3>
            <p className="text-xs text-slate-400">Direct syndication across local & international high-net-worth investor channels.</p>
          </div>

          <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-5 text-center">
            <TrendingUp className="w-8 h-8 text-amber-400 mx-auto mb-2.5" />
            <h3 className="text-sm font-bold text-white mb-1">Expert Valuation</h3>
            <p className="text-xs text-slate-400">Get the true market price powered by recent Dubai Land Department closed transactions.</p>
          </div>

          <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-5 text-center">
            <ShieldCheck className="w-8 h-8 text-amber-400 mx-auto mb-2.5" />
            <h3 className="text-sm font-bold text-white mb-1">Dedicated Support</h3>
            <p className="text-xs text-slate-400">From listing, VIP staging, and private viewings to final DLD conveyance and funds transfer.</p>
          </div>
        </div>

        {/* Main Form Container */}
        {submittedPropertyId ? (
          /* Success Screen */
          <div className="bg-[#111a2e] border border-amber-500/40 rounded-3xl p-8 sm:p-12 text-center shadow-2xl animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center mx-auto mb-6 text-amber-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-2">
              Property Successfully Listed!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-6">
              Your property has been indexed into Dubai Estates active inventory and assigned to Senior Consultant Ahmad Al Mansoori.
            </p>

            <div className="bg-[#0b111e] rounded-2xl p-5 max-w-md mx-auto mb-8 border border-white/10 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Property Title:</span>
                <span className="text-white font-semibold">{title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Asking Price:</span>
                <span className="text-amber-400 font-bold">{formatPrice(priceAED)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="text-white font-semibold">{community}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-bold">Active & Verified</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => navigateToProperty(submittedPropertyId)}
                className="gold-btn py-3 px-6 rounded-xl text-xs font-bold cursor-pointer"
              >
                View Your Live Listing Page
              </button>
              <button
                onClick={() => {
                  setCurrentPage('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                Manage in Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Wizard matching Figma 04 */
          <div className="bg-[#111a2e] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {/* Step Header matching Figma 04: 1. Property Details, 2. Photos, 3. Price, 4. Your Details */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
              <h2 className="text-xl font-bold font-serif-luxury text-white">List Your Property</h2>
              
              <div className="flex items-center gap-2 sm:gap-4 text-xs">
                {[
                  { num: 1, label: 'Details' },
                  { num: 2, label: 'Photos' },
                  { num: 3, label: 'Pricing' },
                  { num: 4, label: 'Contact' }
                ].map((s) => (
                  <div key={s.num} className="flex items-center gap-1.5">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      step === s.num
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : step > s.num
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-white/10 text-slate-400'
                    }`}>
                      {step > s.num ? '✓' : s.num}
                    </span>
                    <span className={`hidden sm:inline font-medium ${
                      step === s.num ? 'text-white' : 'text-slate-400'
                    }`}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 1: PROPERTY DETAILS matching Figma 04 */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Property Type */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Property Type</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value as any)}
                      className="w-full bg-[#0b111e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="Villa">Villa</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="Mansion">Mansion</option>
                    </select>
                  </div>

                  {/* Listing Type */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Listing Category</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setListingType('For Sale')}
                        className={`py-2 text-xs font-semibold rounded-xl border transition cursor-pointer ${
                          listingType === 'For Sale' ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold' : 'border-white/10 text-slate-300'
                        }`}
                      >
                        For Sale
                      </button>
                      <button
                        type="button"
                        onClick={() => setListingType('For Rent')}
                        className={`py-2 text-xs font-semibold rounded-xl border transition cursor-pointer ${
                          listingType === 'For Rent' ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold' : 'border-white/10 text-slate-300'
                        }`}
                      >
                        For Rent
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bedrooms & Bathrooms */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Bedrooms</label>
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      className="w-full bg-[#0b111e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map(n => (
                        <option key={n} value={n}>{n} Bedroom{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Bathrooms</label>
                    <select
                      value={bathrooms}
                      onChange={(e) => setBathrooms(Number(e.target.value))}
                      className="w-full bg-[#0b111e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <option key={n} value={n}>{n} Bathroom{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Property Size (sqft)</label>
                    <input
                      type="number"
                      value={sizeSqFt}
                      onChange={(e) => setSizeSqFt(Number(e.target.value))}
                      placeholder="e.g. 6200"
                      className="w-full bg-[#0b111e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                {/* Community / Location matching Figma 04 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Community / Location</label>
                    <select
                      value={community}
                      onChange={(e) => setCommunity(e.target.value)}
                      className="w-full bg-[#0b111e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Palm Jumeirah">Palm Jumeirah</option>
                      <option value="Downtown Dubai">Downtown Dubai</option>
                      <option value="Dubai Hills Estate">Dubai Hills Estate</option>
                      <option value="Dubai Marina">Dubai Marina</option>
                      <option value="Emirates Hills">Emirates Hills</option>
                      <option value="Business Bay">Business Bay</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Sub-Community / Tower</label>
                    <input
                      type="text"
                      value={subCommunity}
                      onChange={(e) => setSubCommunity(e.target.value)}
                      placeholder="e.g. Frond M, Opera District, etc."
                      className="w-full bg-[#0b111e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Listing Headline</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 4 Bedroom Contemporary Villa with Palm Views"
                    className="w-full bg-[#0b111e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                {/* Description matching Figma 04 */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Additional Details</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us more about your property (view, upgrades, high floor, private pool)..."
                    className="w-full bg-[#0b111e] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 resize-none h-24"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="gold-btn py-2.5 px-6 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Upload Photos</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PHOTOS */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Select / Add High-Resolution Imagery</label>
                  <p className="text-xs text-slate-400 mb-3">Choose from our curated Dubai architectural library or paste your custom image URL</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                    {presetLuxuryImages.map((img, i) => {
                      const isChosen = selectedImages.includes(img);
                      return (
                        <div
                          key={i}
                          onClick={() => handleTogglePresetImage(img)}
                          className={`relative aspect-[16/10] rounded-xl overflow-hidden cursor-pointer border-2 transition ${
                            isChosen ? 'border-amber-500 shadow-lg' : 'border-white/10 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          {isChosen && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                              ✓
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Add URL field */}
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      placeholder="Paste online image URL (https://...)"
                      className="flex-1 bg-[#0b111e] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomImage}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Add Photo
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="gold-btn py-2.5 px-6 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Pricing & Terms</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PRICING */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Asking Price (AED) {listingType === 'For Rent' ? 'per Year' : ''}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={priceAED}
                      onChange={(e) => setPriceAED(Number(e.target.value))}
                      placeholder="e.g. 12500000"
                      className="w-full bg-[#0b111e] border border-white/10 rounded-xl px-4 py-3 text-base font-bold text-amber-400 focus:outline-none focus:border-amber-500"
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      AED
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Equivalent: ~{formatPrice(priceAED)}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Master Developer</label>
                    <select
                      value={developer}
                      onChange={(e) => setDeveloper(e.target.value)}
                      className="w-full bg-[#0b111e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Emaar Properties">Emaar Properties</option>
                      <option value="Nakheel">Nakheel</option>
                      <option value="DAMAC">DAMAC</option>
                      <option value="Sobha Realty">Sobha Realty</option>
                      <option value="Meraas">Meraas</option>
                      <option value="Custom Builder">Custom / Private Builder</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Furnishing</label>
                    <select
                      value={furnishing}
                      onChange={(e) => setFurnishing(e.target.value as any)}
                      className="w-full bg-[#0b111e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Furnished">Furnished</option>
                      <option value="Unfurnished">Unfurnished</option>
                      <option value="Semi-Furnished">Semi-Furnished</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="gold-btn py-2.5 px-6 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next: Owner Contact</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: CONTACT & VERIFICATION */}
            {step === 4 && (
              <form onSubmit={handleFinalSubmit} className="space-y-5 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Owner / Agent Full Name</label>
                    <input
                      type="text"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      placeholder="Hardik"
                      className="w-full bg-[#0b111e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={sellerPhone}
                      onChange={(e) => setSellerPhone(e.target.value)}
                      placeholder="+971 50 123 4567"
                      className="w-full bg-[#0b111e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={sellerEmail}
                    onChange={(e) => setSellerEmail(e.target.value)}
                    placeholder="hardik@luxuryinvest.ae"
                    className="w-full bg-[#0b111e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Title Deed Status</label>
                  <select
                    value={titleDeedStatus}
                    onChange={(e) => setTitleDeedStatus(e.target.value)}
                    className="w-full bg-[#0b111e] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option>Ready Title Deed (Oqood/DLD Registered)</option>
                    <option>Off-Plan SPA (Sales & Purchase Agreement)</option>
                    <option>Power of Attorney (POA Verified)</option>
                  </select>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-300 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>By submitting, you agree to listing your property under RERA Trakheesi regulatory requirements. Our compliance officer will verify deed status within 2 hours.</span>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    className="gold-btn py-3 px-8 rounded-xl text-xs font-bold cursor-pointer shadow-xl"
                  >
                    Submit & Publish Property Listing
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
