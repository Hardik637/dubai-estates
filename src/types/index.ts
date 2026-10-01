export type Currency = 'AED' | 'USD' | 'EUR' | 'GBP' | 'SAR';

export interface CurrencyRate {
  code: Currency;
  symbol: string;
  rateFromAED: number; // e.g. 1 AED = 0.272 USD
  label: string;
}

export type PropertyType = 'Villa' | 'Apartment' | 'Penthouse' | 'Townhouse' | 'Mansion' | 'Plot';
export type ListingStatus = 'For Sale' | 'For Rent';
export type CompletionStatus = 'Ready' | 'Off-Plan';

export interface Property {
  id: string;
  title: string;
  slug: string;
  priceAED: number;
  listingType: ListingStatus;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  plotSizeSqFt?: number;
  community: string;
  subCommunity?: string;
  address: string;
  completionStatus: CompletionStatus;
  handoverDate?: string;
  furnishing: 'Furnished' | 'Unfurnished' | 'Semi-Furnished';
  developer?: string;
  reraPermitNumber: string;
  referenceNumber: string;
  description: string;
  featured: boolean;
  images: string[];
  floorPlanUrl?: string;
  virtualTourUrl?: string;
  amenities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  agentId: string;
  serviceChargePerSqFt?: number;
  roiEstimatePercent?: number;
  createdAt: string;
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  heroImage: string;
  images: string[];
  category: 'Waterfront' | 'Luxury' | 'Family Living' | 'Investment' | 'Golf';
  stats: {
    residents: string;
    averagePriceAED: string;
    propertiesCount: number;
    rentalYield: string;
    capitalAppreciation: string;
  };
  highlights: string[];
  lifestylePoints: {
    title: string;
    description: string;
    icon: string;
  }[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  reraNumber: string;
  phone: string;
  whatsapp: string;
  email: string;
  photo: string;
  experienceYears: number;
  propertiesSoldCount: number;
  rating: number;
  reviewsCount: number;
  languages: string[];
  specializations: string[];
  bio: string;
  socials?: {
    linkedin?: string;
    instagram?: string;
  };
}

export interface PropertyInquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyPriceAED: number;
  propertyImage: string;
  agentId: string;
  agentName: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  date: string;
  preferredTourTime?: string;
  message: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  createdAt: string;
}

export interface SavedSearch {
  id: string;
  title: string;
  filters: {
    community?: string;
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
  };
  createdDate: string;
}
