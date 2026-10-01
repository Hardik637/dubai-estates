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
    window.open(`https://wa.me/971508924110?text=${text}`, '_blank');
  };

  return (
    <div 
      onClick={() => navigateToProperty(property.id)}
      className="group relative bg-[#251c17] border border-[#3d2f27] hover:border-[#c87a50]/70 rounded-2xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-2xl cursor-pointer flex flex-col text-[#f5ede6]"
    >
      {/* Property Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#18110e]">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1310] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md backdrop-blur-md shadow-md ${
            property.listingType === 'For Sale'
              ? 'bg-[#c87a50] text-white'
              : 'bg-emerald-600 text-white'
          }`}>
            {property.listingType}
          </span>
          {property.featured && (
            <span className="hidden sm:flex items-center gap-1 px-2 py-1 text-[10px] font-semibold bg-[#1a1310]/80 border border-[#3d2f27] backdrop-blur-md text-[#df8a5e] rounded-md shadow-sm">
              <Sparkles className="w-3 h-3 text-[#c87a50]" /> Featured
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
              : 'bg-black/50 text-white hover:text-red-400 hover:bg-black/70'
          }`}
          title={favorite ? 'Remove from saved' : 'Save property'}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-red-500' : ''}`} />
        </button>

        {/* Quick price tag at bottom left of image */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div>
            <div className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#f5ede6] drop-shadow-md">
              {formatPrice(property.priceAED, property.listingType === 'For Rent')}
            </div>
            {property.roiEstimatePercent && (
              <span className="text-[10px] text-emerald-300 font-semibold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                {property.roiEstimatePercent}% Expected ROI
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium text-[#baa99c] bg-[#1a1310]/80 backdrop-blur-md border border-[#3d2f27] px-2 py-0.5 rounded">
            Ref: {property.referenceNumber}
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#df8a5e] font-semibold mb-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{property.community}{property.subCommunity ? `, ${property.subCommunity}` : ''}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-[#f5ede6] group-hover:text-[#df8a5e] transition-colors line-clamp-1 mb-3">
            {property.title}
          </h3>

          {/* Specs Bar (Beds, Baths, Sqft) */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-[#1c1410] rounded-xl border border-[#3d2f27] text-xs text-[#baa99c] mb-4">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-[#df8a5e]" />
              <span className="font-bold text-[#f5ede6]">{property.bedrooms}</span>
              <span className="text-[#857467] text-[11px]">Beds</span>
            </div>
            <div className="flex items-center gap-1.5 justify-center border-x border-[#3d2f27]">
              <Bath className="w-4 h-4 text-[#df8a5e]" />
              <span className="font-bold text-[#f5ede6]">{property.bathrooms}</span>
              <span className="text-[#857467] text-[11px]">Baths</span>
            </div>
            <div className="flex items-center gap-1.5 justify-end">
              <Maximize2 className="w-4 h-4 text-[#df8a5e]" />
              <span className="font-bold text-[#f5ede6]">{property.areaSqFt.toLocaleString()}</span>
              <span className="text-[#857467] text-[11px]">sqft</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#3d2f27] flex items-center justify-between gap-2">
          <button
            onClick={handleWhatsApp}
            className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-[#1f2d24] text-emerald-300 hover:bg-[#25392d] border border-emerald-700/40 transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
          <button
            onClick={() => navigateToProperty(property.id)}
            className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-[#c87a50] hover:bg-[#b8683b] text-white transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <span>View Details</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
