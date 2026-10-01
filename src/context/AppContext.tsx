import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, Community, Agent, Currency, PropertyInquiry } from '../types';
import { initialPropertiesData } from '../data/properties';
import { communitiesData } from '../data/communities';
import { agentsData } from '../data/agents';

export type PageRoute = 
  | 'home' 
  | 'properties' 
  | 'property-detail' 
  | 'sell' 
  | 'communities' 
  | 'community-detail' 
  | 'agent' 
  | 'dashboard' 
  | 'about' 
  | 'contact' 
  | 'not-found';

export interface FilterState {
  keyword: string;
  listingType: 'All' | 'For Sale' | 'For Rent';
  propertyType: string;
  community: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  amenities: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  isLoggedIn: boolean;
}

interface AppContextType {
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  selectedPropertyId: string | null;
  setSelectedPropertyId: (id: string | null) => void;
  selectedCommunityId: string | null;
  setSelectedCommunityId: (id: string | null) => void;
  selectedAgentId: string | null;
  setSelectedAgentId: (id: string | null) => void;
  properties: Property[];
  addNewProperty: (prop: Property) => void;
  communities: Community[];
  agents: Agent[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInAED: number, showPerYear?: boolean) => string;
  favorites: string[];
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  inquiries: PropertyInquiry[];
  submitInquiry: (inquiry: Omit<PropertyInquiry, 'id' | 'createdAt' | 'status'>) => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isGoldenVisaModalOpen: boolean;
  setIsGoldenVisaModalOpen: (open: boolean) => void;
  navigateToProperty: (propertyId: string) => void;
  navigateToCommunity: (communityId: string) => void;
  navigateToAgent: (agentId: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const defaultFilters: FilterState = {
  keyword: '',
  listingType: 'All',
  propertyType: 'All',
  community: 'All',
  minPrice: 0,
  maxPrice: 100000000,
  bedrooms: 'All',
  amenities: []
};

// Currency conversion rates against AED (UAE Dirham peg ~ 3.6725 USD)
const currencyRates: Record<Currency, { symbol: string; rate: number }> = {
  AED: { symbol: 'AED', rate: 1.0 },
  USD: { symbol: '$', rate: 0.2723 },
  EUR: { symbol: '€', rate: 0.2514 },
  GBP: { symbol: '£', rate: 0.2155 },
  SAR: { symbol: 'SAR', rate: 1.021 }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>('prop-1');
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>('palm-jumeirah');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>('agent-1');
  const [currency, setCurrency] = useState<Currency>('AED');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isGoldenVisaModalOpen, setIsGoldenVisaModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // User Profile initialized with "Hardik" to match Figma screen 08
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('dubai_estates_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      name: 'Hardik',
      email: 'hardik@luxuryinvest.ae',
      phone: '+971 50 892 4110',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      isLoggedIn: true
    };
  });

  // Properties list with localStorage cache support so submitted properties remain visible
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('dubai_estates_custom_props');
    if (saved) {
      try {
        const customProps: Property[] = JSON.parse(saved);
        return [...customProps, ...initialPropertiesData];
      } catch (e) {
        console.error(e);
      }
    }
    return initialPropertiesData;
  });

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('dubai_estates_favs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return ['prop-1', 'prop-2', 'prop-3'];
  });

  // Inquiries
  const [inquiries, setInquiries] = useState<PropertyInquiry[]>(() => {
    const saved = localStorage.getItem('dubai_estates_inquiries');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'inq-1',
        propertyId: 'prop-1',
        propertyTitle: '4 Bedroom Contemporary Villa in Dubai Hills Estate',
        propertyPriceAED: 12500000,
        propertyImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
        agentId: 'agent-1',
        agentName: 'Ahmad Al Mansoori',
        userName: 'Hardik',
        userEmail: 'hardik@luxuryinvest.ae',
        userPhone: '+971 50 892 4110',
        date: '2026-10-04',
        preferredTourTime: '11:00 AM',
        message: 'Interested in a private walkthrough on Saturday morning. Please confirm gate access.',
        status: 'Confirmed',
        createdAt: '2026-09-29'
      },
      {
        id: 'inq-2',
        propertyId: 'prop-3',
        propertyTitle: '5 Bedroom Bespoke Waterfront Signature Villa',
        propertyPriceAED: 28000000,
        propertyImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80',
        agentId: 'agent-2',
        agentName: 'Elena Rostova',
        userName: 'Hardik',
        userEmail: 'hardik@luxuryinvest.ae',
        userPhone: '+971 50 892 4110',
        date: '2026-10-06',
        preferredTourTime: '03:30 PM',
        message: 'Requested architectural blueprints and Golden Visa qualification breakdown.',
        status: 'Pending',
        createdAt: '2026-09-30'
      }
    ];
  });

  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('dubai_estates_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('dubai_estates_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('dubai_estates_user', JSON.stringify(user));
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(propertyId);
      if (exists) {
        showToast('Removed from saved properties');
        return prev.filter(id => id !== propertyId);
      } else {
        showToast('Added to your saved luxury collection');
        return [...prev, propertyId];
      }
    });
  };

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const addNewProperty = (prop: Property) => {
    const updated = [prop, ...properties];
    setProperties(updated);
    const customOnly = updated.filter(p => p.id.startsWith('custom-'));
    localStorage.setItem('dubai_estates_custom_props', JSON.stringify(customOnly));
    showToast(`Property "${prop.title.substring(0, 30)}..." listed successfully!`);
  };

  const submitInquiry = (inquiryData: Omit<PropertyInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInq: PropertyInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setInquiries(prev => [newInq, ...prev]);
    showToast('Viewing request sent directly to RERA Consultant via VIP line!');
  };

  const formatPrice = (amountInAED: number, showPerYear = false): string => {
    const rateObj = currencyRates[currency] || currencyRates.AED;
    const converted = amountInAED * rateObj.rate;
    const formatted = Math.round(converted).toLocaleString('en-US');
    const suffix = showPerYear ? ' / yr' : '';

    if (currency === 'AED') {
      return `AED ${formatted}${suffix}`;
    }
    if (currency === 'SAR') {
      return `${formatted} SAR${suffix}`;
    }
    return `${rateObj.symbol}${formatted}${suffix}`;
  };

  const navigateToProperty = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setCurrentPage('property-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCommunity = (communityId: string) => {
    setSelectedCommunityId(communityId);
    setCurrentPage('community-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAgent = (agentId: string) => {
    setSelectedAgentId(agentId);
    setCurrentPage('agent');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedPropertyId,
        setSelectedPropertyId,
        selectedCommunityId,
        setSelectedCommunityId,
        selectedAgentId,
        setSelectedAgentId,
        properties,
        addNewProperty,
        communities: communitiesData,
        agents: agentsData,
        currency,
        setCurrency,
        formatPrice,
        favorites,
        toggleFavorite,
        isFavorite,
        filters,
        setFilters,
        resetFilters,
        inquiries,
        submitInquiry,
        user,
        setUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isGoldenVisaModalOpen,
        setIsGoldenVisaModalOpen,
        navigateToProperty,
        navigateToCommunity,
        navigateToAgent,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
