import React, { useState } from 'react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, ArrowUpRight } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { formatPrice, isFavorite, toggleFavorite, navigateToProperty } = useApp();
  const favorite = isFavorite(property.id);

  return (
    <div 
      onClick={() => navigateToProperty(property.id)}
      className="group cursor-pointer bg-white border border-[#E7E3DA] p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#111111]"
    >
      <div>
        {/* Architectural Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden mb-5 bg-[#F7F4EC] border border-[#E7E3DA]">
          <img 
            src={property.images[0]} 
            alt={property.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
            loading="lazy"
          />

          {/* Minimal Status Tag */}
          <div className="absolute top-3 left-3 bg-[#111111] text-white text-[9px] font-mono tracking-[0.2em] uppercase px-2.5 py-1">
            {property.listingType}
          </div>

          {/* Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 text-[#111111] hover:bg-white transition cursor-pointer"
            aria-label="Save residence"
          >
            <Heart className={`w-3.5 h-3.5 ${favorite ? 'fill-[#111111]' : ''}`} />
          </button>
        </div>

        {/* Property Metadata */}
        <div className="space-y-1 mb-4">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[#8A877F]">
            <span>{property.community}</span>
            <span>{property.propertyType}</span>
          </div>

          <h3 className="font-editorial text-2xl text-[#111111] font-light leading-snug line-clamp-2">
            {property.title}
          </h3>

          <p className="text-xs text-[#8A877F] font-mono pt-1">
            {property.bedrooms} Beds • {property.bathrooms} Baths • {property.areaSqFt.toLocaleString()} Sq Ft
          </p>
        </div>
      </div>

      {/* Footer / Price & Action */}
      <div className="pt-4 border-t border-[#E7E3DA] flex items-center justify-between">
        <div>
          <span className="text-[9px] font-mono uppercase text-[#8A877F] block">
            Offered At
          </span>
          <span className="font-editorial text-2xl text-[#111111] font-medium">
            {formatPrice(property.priceAED, property.listingType === 'For Rent')}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-[#111111]">
          <span className="hidden sm:inline">Dossier</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
