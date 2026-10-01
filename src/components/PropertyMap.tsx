import React, { useEffect, useRef } from 'react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import L from 'leaflet';

interface PropertyMapProps {
  properties: Property[];
  highlightedPropertyId?: string | null;
  className?: string;
  zoom?: number;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({ 
  properties, 
  highlightedPropertyId, 
  className = 'h-[500px]',
  zoom = 11 
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const { formatPrice, navigateToProperty } = useApp();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if map instance exists
    if (!mapInstanceRef.current) {
      // Dubai center coordinates
      const map = L.map(mapContainerRef.current, {
        center: [25.1300, 55.2000],
        zoom: zoom,
        zoomControl: true,
        scrollWheelZoom: false
      });

      // CartoDB Dark Matter / Positron luxury map tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>, OpenStreetMap',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add luxury markers for each property
    properties.forEach(prop => {
      if (!prop.coordinates?.lat || !prop.coordinates?.lng) return;

      const isHighlighted = highlightedPropertyId === prop.id;

      // Price abbreviation helper: 12,500,000 -> 12.5M
      const priceText = prop.priceAED >= 1000000 
        ? `AED ${(prop.priceAED / 1000000).toFixed(1)}M`
        : `AED ${(prop.priceAED / 1000).toFixed(0)}k`;

      const customIcon = L.divIcon({
        className: 'custom-property-pin',
        html: `
          <div style="
            background: ${isHighlighted ? '#c87a50' : '#1a1310'};
            color: ${isHighlighted ? '#120d0b' : '#f5ede6'};
            border: 2px solid #c87a50;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 700;
            white-space: nowrap;
            box-shadow: 0 4px 14px rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${isHighlighted ? '#120d0b' : '#c87a50'}"></span>
            ${priceText}
          </div>
        `,
        iconSize: [80, 30],
        iconAnchor: [40, 15]
      });

      const marker = L.marker([prop.coordinates.lat, prop.coordinates.lng], { icon: customIcon }).addTo(map);

      // Popup
      const popupContent = `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 220px; background: #221915; color: #f5ede6; padding: 4px; border-radius: 8px;">
          <img src="${prop.images[0]}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 6px; margin-bottom: 8px;" />
          <div style="font-weight: 700; color: #df8a5e; font-size: 14px;">${formatPrice(prop.priceAED)}</div>
          <div style="font-weight: 600; font-size: 12px; margin: 2px 0 6px 0; color: #f5ede6;">${prop.title}</div>
          <div style="font-size: 11px; color: #baa99c; margin-bottom: 8px;">${prop.bedrooms} Beds • ${prop.bathrooms} Baths • ${prop.areaSqFt} sqft</div>
          <button id="view-prop-btn-${prop.id}" style="
            width: 100%;
            background: linear-gradient(135deg, #c87a50 0%, #a8582e 100%);
            color: #ffffff;
            border: none;
            padding: 7px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            cursor: pointer;
          ">View Listing</button>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('popupopen', () => {
        const btn = document.getElementById(`view-prop-btn-${prop.id}`);
        if (btn) {
          btn.onclick = () => navigateToProperty(prop.id);
        }
      });

      markersRef.current[prop.id] = marker;
    });

    // If highlighted property is provided, center on it
    if (highlightedPropertyId && markersRef.current[highlightedPropertyId]) {
      const targetMarker = markersRef.current[highlightedPropertyId];
      map.setView(targetMarker.getLatLng(), 14, { animate: true });
      targetMarker.openPopup();
    }

  }, [properties, highlightedPropertyId, zoom, formatPrice]);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-[#3d2f27] shadow-2xl ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      {/* Map Badge */}
      <div className="absolute top-3 left-3 z-10 bg-[#1a1310]/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#3d2f27] text-xs font-semibold text-[#f5ede6] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#c87a50] animate-pulse"></span>
        Dubai Prime Locations ({properties.length})
      </div>
    </div>
  );
};
