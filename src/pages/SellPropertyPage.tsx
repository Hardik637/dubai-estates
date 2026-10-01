import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Property, PropertyType, ListingStatus } from '../types';
import { ArrowRight, ArrowLeft, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const SellPropertyPage: React.FC = () => {
  const { addNewProperty, user, navigateToProperty, formatPrice } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [submittedPropertyId, setSubmittedPropertyId] = useState<string | null>(null);

  // Form states
  const [propertyType, setPropertyType] = useState<PropertyType>('Villa');
  const [listingType, setListingType] = useState<ListingStatus>('For Sale');
  const [bedrooms, setBedrooms] = useState(4);
  const [bathrooms, setBathrooms] = useState(5);
  const [community, setCommunity] = useState('Palm Jumeirah');
  const [sizeSqFt, setSizeSqFt] = useState(5800);
  const [title, setTitle] = useState('Contemporary Waterfront Villa with Private Beachfront');
  const [description, setDescription] = useState('Spectacular modern architecture featuring floor-to-ceiling glass, custom European stone finishes, private infinity pool, and direct beach access.');
  const [furnishing, setFurnishing] = useState<'Furnished' | 'Unfurnished' | 'Semi-Furnished'>('Furnished');

  const presetImages = [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85'
  ];
  const [selectedImage, setSelectedImage] = useState(presetImages[0]);

  const [priceAED, setPriceAED] = useState(18500000);
  const [sellerName, setSellerName] = useState(user.name);
  const [sellerEmail, setSellerEmail] = useState(user.email);
  const [sellerPhone, setSellerPhone] = useState(user.phone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `custom-${Date.now()}`;
    const newProp: Property = {
      id: newId,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      priceAED,
      listingType,
      propertyType,
      bedrooms,
      bathrooms,
      areaSqFt: sizeSqFt,
      community,
      address: `${community}, Dubai, UAE`,
      completionStatus: 'Ready',
      furnishing,
      reraPermitNumber: `RERA-${Math.floor(10000 + Math.random() * 90000)}`,
      referenceNumber: `DE-${community.substring(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      description,
      featured: true,
      images: [selectedImage, ...presetImages.filter(img => img !== selectedImage)],
      amenities: ['Private Pool', 'Beach Access', 'Smart Home', '24/7 Security'],
      coordinates: { lat: 25.1185, lng: 55.2443 },
      agentId: 'agent-1',
      createdAt: new Date().toISOString()
    };

    addNewProperty(newProp);
    setSubmittedPropertyId(newId);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] pt-28 sm:pt-36 pb-24">
      <div className="editorial-container max-w-4xl">
        
        {/* Header */}
        <div className="border-b border-[#E7E3DA] pb-10 mb-12">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#8A877F] block mb-2">
            Owner Mandate & Consignment
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl text-[#111111] font-light">
            List Your Residence
          </h1>
          <p className="text-sm text-[#2B2A27] font-light mt-3 max-w-lg">
            Directly connect your property with sovereign entities, private family offices, and verified international capital.
          </p>
        </div>

        {submittedPropertyId ? (
          <div className="bg-[#F7F4EC] border border-[#E7E3DA] p-12 text-center space-y-6">
            <CheckCircle2 className="w-12 h-12 text-[#111111] mx-auto" />
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#111111] font-light">
              Property Consigned Successfully
            </h2>
            <p className="text-sm text-[#2B2A27] font-light max-w-md mx-auto">
              Your property has been indexed into the Dubai Estates private portfolio and is now active.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={() => navigateToProperty(submittedPropertyId)}
                className="btn-editorial-primary"
              >
                <span>View Property Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#F7F4EC] border border-[#E7E3DA] p-6 sm:p-10 space-y-8">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between border-b border-[#E7E3DA] pb-6">
              {[
                { s: 1, label: '01 / Specifications' },
                { s: 2, label: '02 / Photography' },
                { s: 3, label: '03 / Pricing' },
                { s: 4, label: '04 / Verification' }
              ].map(item => (
                <button
                  key={item.s}
                  onClick={() => setStep(item.s as any)}
                  className={`text-[10px] sm:text-xs font-mono uppercase transition cursor-pointer ${
                    step === item.s ? 'text-[#111111] font-bold border-b border-[#111111] pb-1' : 'text-[#8A877F]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Step 1: Specs */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1.5">Property Type</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value as any)}
                      className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-3 focus:outline-none"
                    >
                      <option value="Villa">Villa</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Mansion">Mansion</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1.5">Community Enclave</label>
                    <select
                      value={community}
                      onChange={(e) => setCommunity(e.target.value)}
                      className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-3 focus:outline-none"
                    >
                      <option value="Palm Jumeirah">Palm Jumeirah</option>
                      <option value="Downtown Dubai">Downtown Dubai</option>
                      <option value="Dubai Hills Estate">Dubai Hills Estate</option>
                      <option value="Emirates Hills">Emirates Hills</option>
                      <option value="Dubai Marina">Dubai Marina</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1.5">Bedrooms</label>
                    <input
                      type="number"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(parseInt(e.target.value) || 1)}
                      className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-3 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1.5">Bathrooms</label>
                    <input
                      type="number"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(parseInt(e.target.value) || 1)}
                      className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-3 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1.5">Area (Sq Ft)</label>
                    <input
                      type="number"
                      value={sizeSqFt}
                      onChange={(e) => setSizeSqFt(parseInt(e.target.value) || 500)}
                      className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-3 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1.5">Listing Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-3 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1.5">Architectural Narrative</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-3 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button onClick={() => setStep(2)} className="btn-editorial-primary">
                    <span>Next: Photography</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Photos */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <span className="text-[10px] font-mono uppercase text-[#8A877F] block">
                  Select Architectural Cover Imagery
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {presetImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative aspect-[16/10] overflow-hidden border cursor-pointer ${
                        selectedImage === img ? 'border-[#111111] ring-2 ring-[#111111]' : 'border-[#E7E3DA] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Preset Option" className="w-full h-full object-cover" />
                      {selectedImage === img && (
                        <span className="absolute top-2 right-2 bg-[#111111] text-white text-[9px] font-mono px-2 py-0.5">
                          Selected
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-between">
                  <button onClick={() => setStep(1)} className="btn-editorial-secondary">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button onClick={() => setStep(3)} className="btn-editorial-primary">
                    <span>Next: Pricing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Pricing */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1.5">Asking Price (AED)</label>
                  <input
                    type="number"
                    value={priceAED}
                    onChange={(e) => setPriceAED(parseInt(e.target.value) || 0)}
                    className="w-full text-base font-editorial text-[#111111] bg-white border border-[#E7E3DA] p-3 focus:outline-none"
                  />
                  <span className="text-xs font-mono text-[#8A877F] mt-1 block">
                    Formally evaluated: {formatPrice(priceAED)}
                  </span>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1.5">Furnishing Standard</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Furnished', 'Unfurnished', 'Semi-Furnished'] as const).map(f => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFurnishing(f)}
                        className={`text-xs py-3 border transition cursor-pointer ${
                          furnishing === f ? 'bg-[#111111] text-white border-[#111111]' : 'bg-white text-[#111111] border-[#E7E3DA]'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button onClick={() => setStep(2)} className="btn-editorial-secondary">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button onClick={() => setStep(4)} className="btn-editorial-primary">
                    <span>Next: Owner Verification</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Verification & Submit */}
            {step === 4 && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1.5">Principal / Owner Name</label>
                    <input
                      type="text"
                      required
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-3 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1.5">Direct Phone (WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      value={sellerPhone}
                      onChange={(e) => setSellerPhone(e.target.value)}
                      className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-3 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1.5">Official Email</label>
                  <input
                    type="email"
                    required
                    value={sellerEmail}
                    onChange={(e) => setSellerEmail(e.target.value)}
                    className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-3 focus:outline-none"
                  />
                </div>

                <div className="p-4 bg-white border border-[#E7E3DA] text-xs text-[#8A877F] font-light">
                  By submitting this listing mandate, you attest that you are the lawful owner or authorized fiduciary representative of the property. All submissions are cross-referenced with the Dubai Land Department (DLD) registry.
                </div>

                <div className="pt-4 flex justify-between">
                  <button type="button" onClick={() => setStep(3)} className="btn-editorial-secondary">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button type="submit" className="btn-editorial-primary">
                    <span>Submit & Publish Mandate</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
