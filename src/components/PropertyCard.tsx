import React from 'react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Heart, 
  MessageCircle, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, featured }) => {
  const { formatPrice, isFavorite, toggleFavorite, navigateToProperty } = useApp();
  const favorite = isFavorite(property.id);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello Dubai Estates, I am interested in inquiring about ${property.title} (Ref: ${property.referenceNumber}) listed at ${formatPrice(property.priceAED)}.`
    );
    window.open(`https://wa.me/971501234567?text=${text}`, '_blank');
  };

  return (
    <div 
      onClick={() => navigateToProperty(property.id)}
      className="group relative bg-white border border-[#e8e2d8] hover:border-[#b88d3d]/60 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer flex flex-col"
    >
      {/* Property Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md backdrop-blur-md shadow-md ${
            property.listingType === 'For Sale'
              ? 'bg-[#b88d3d] text-white'
              : 'bg-emerald-600 text-white'
          }`}>
            {property.listingType}
          </span>
          {property.featured && (
            <span className="hidden sm:flex items-center gap-1 px-2 py-1 text-[10px] font-semibold bg-white/90 backdrop-blur-md text-[#16191f] rounded-md shadow-sm">
              <Sparkles className="w-3 h-3 text-[#b88d3d]" /> Featured
            </span>
          )}
          <span className="px-2 py-1 text-[10px] font-semibold bg-black/60 backdrop-blur-md text-white rounded-md">
            {property.propertyType}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer ${
            favorite 
              ? 'bg-red-500/20 text-red-500 scale-110 border border-red-500/40' 
              : 'bg-black/40 text-white hover:text-red-400 hover:bg-black/60'
          }`}
          title={favorite ? 'Remove from saved' : 'Save property'}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-red-500' : ''}`} />
        </button>

        {/* Quick price tag at bottom left of image */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div>
            <div className="text-xl sm:text-2xl font-bold font-serif-luxury text-white drop-shadow-md">
              {formatPrice(property.priceAED, property.listingType === 'For Rent')}
            </div>
            {property.roiEstimatePercent && (
              <span className="text-[10px] text-emerald-300 font-semibold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                {property.roiEstimatePercent}% Expected ROI
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium text-slate-200 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
            Ref: {property.referenceNumber}
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#b88d3d] font-semibold mb-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{property.community}{property.subCommunity ? `, ${property.subCommunity}` : ''}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-[#16191f] group-hover:text-[#b88d3d] transition-colors line-clamp-1 mb-3">
            {property.title}
          </h3>

          {/* Specs Bar (Beds, Baths, Sqft) */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-[#f8f6f2] rounded-xl border border-[#ebe5db] text-xs text-[#545c6b] mb-4">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-[#b88d3d]" />
              <span className="font-bold text-[#16191f]">{property.bedrooms}</span>
              <span className="text-[#7d8797] text-[11px]">Beds</span>
            </div>
            <div className="flex items-center gap-1.5 justify-center border-x border-[#ebe5db]">
              <Bath className="w-4 h-4 text-[#b88d3d]" />
              <span className="font-bold text-[#16191f]">{property.bathrooms}</span>
              <span className="text-[#7d8797] text-[11px]">Baths</span>
            </div>
            <div className="flex items-center gap-1.5 justify-end">
              <Maximize2 className="w-4 h-4 text-[#b88d3d]" />
              <span className="font-bold text-[#16191f]">{property.areaSqFt.toLocaleString()}</span>
              <span className="text-[#7d8797] text-[11px]">sqft</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#ebe5db] flex items-center justify-between gap-2">
          <button
            onClick={handleWhatsApp}
            className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
          <button
            onClick={() => navigateToProperty(property.id)}
            className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-[#16191f] text-white hover:bg-[#b88d3d] transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>View Details</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
