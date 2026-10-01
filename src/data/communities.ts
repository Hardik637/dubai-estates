import { Community } from '../types';

export const communitiesData: Community[] = [
  {
    id: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    slug: 'palm-jumeirah',
    tagline: 'World-Renowned Island of Bespoke Waterfront Mansions & Five-Star Living',
    description: 'An iconic man-made island known for its luxurious waterfront villas, premium apartments, world-class dining, and exclusive lifestyle. Palm Jumeirah offers unmatched views and a truly unique living experience in Dubai.',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1200&q=85'
    ],
    category: 'Waterfront',
    stats: {
      residents: '12,000+',
      averagePriceAED: 'AED 2.8M - 45M',
      propertiesCount: 820,
      rentalYield: '8.5%',
      capitalAppreciation: '+18.4% YoY'
    },
    highlights: [
      'Private beach access for custom Signature Villas',
      'World-famous Atlantis The Royal & The Palm',
      'Nakheel Mall & The Pointe waterfront promenade',
      'Superyacht marinas and private water taxi berths'
    ],
    lifestylePoints: [
      {
        title: 'Michelin-Star Gastronomy',
        description: 'Home to Nobu, Ossiano, Dinner by Heston Blumenthal, and vibrant beach clubs.',
        icon: 'utensils'
      },
      {
        title: 'Private Marine Mooring',
        description: 'Direct dockage for yachts with seamless Arabian Gulf open-water cruising.',
        icon: 'anchor'
      },
      {
        title: 'Ultra-Exclusive Security',
        description: '24/7 guarded frond gates ensuring sovereign-level privacy and peace.',
        icon: 'shield-check'
      }
    ],
    coordinates: {
      lat: 25.1124,
      lng: 55.1390
    }
  },
  {
    id: 'downtown-dubai',
    name: 'Downtown Dubai',
    slug: 'downtown-dubai',
    tagline: 'The Center of Now: Burj Khalifa, Dubai Mall & Dubai Opera',
    description: 'The pulsing heart of high glamour and prestige. Downtown Dubai combines iconic skyline views, luxury branded residences, high-end shopping, and bustling boulevard culture.',
    heroImage: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1200&q=85'
    ],
    category: 'Luxury',
    stats: {
      residents: '35,000+',
      averagePriceAED: 'AED 2.2M - 35M',
      propertiesCount: 940,
      rentalYield: '7.8%',
      capitalAppreciation: '+14.2% YoY'
    },
    highlights: [
      'Direct views of Burj Khalifa and Dubai Fountain',
      'Walking distance to The Dubai Mall & Fashion Avenue',
      'Dubai Opera cultural performances',
      'Sheikh Mohammed Bin Rashid Boulevard dining strip'
    ],
    lifestylePoints: [
      {
        title: 'Branded Luxury Penthouses',
        description: 'Residences managed by Armani, Address Hotels, and St. Regis.',
        icon: 'gem'
      },
      {
        title: 'World-Class Connectivity',
        description: 'Direct highway access to DIFC Financial Center and DXB International Airport.',
        icon: 'plane'
      }
    ],
    coordinates: {
      lat: 25.1972,
      lng: 55.2744
    }
  },
  {
    id: 'dubai-hills-estate',
    name: 'Dubai Hills Estate',
    slug: 'dubai-hills-estate',
    tagline: 'The Green Heart of Dubai with Championship 18-Hole Golf Course',
    description: 'An exquisitely planned master community by Emaar featuring lush green parks, championship golf course, top-tier international schools, and Dubai Hills Mall.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85'
    ],
    category: 'Family Living',
    stats: {
      residents: '28,000+',
      averagePriceAED: 'AED 3.5M - 60M',
      propertiesCount: 560,
      rentalYield: '7.2%',
      capitalAppreciation: '+21.5% YoY'
    },
    highlights: [
      'Championship 18-Hole Golf Course with skyline views',
      'Dubai Hills Central Park & 54km bicycle track',
      'King’s College Hospital & Gems Wellington Academy',
      'Dubai Hills Mall with indoor roller-coaster and dining'
    ],
    lifestylePoints: [
      {
        title: 'Golf Course Living',
        description: 'Front-row fairway villas with sweeping Burj Khalifa skyline panoramas.',
        icon: 'trophy'
      },
      {
        title: 'Family & Education',
        description: 'Walking distance to British curriculum schools and lush botanical parks.',
        icon: 'smile'
      }
    ],
    coordinates: {
      lat: 25.1118,
      lng: 55.2443
    }
  },
  {
    id: 'dubai-marina',
    name: 'Dubai Marina',
    slug: 'dubai-marina',
    tagline: 'Cosmopolitan Riviera Living with Skyscraper Horizons & JBR Beach',
    description: 'One of Dubai’s most vibrant waterfront enclaves. Boasting a 3.5km waterway lined with luxury yachts, open-air alfresco dining, and direct pedestrian bridges to JBR Beach.',
    heroImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1200&q=85'
    ],
    category: 'Waterfront',
    stats: {
      residents: '55,000+',
      averagePriceAED: 'AED 1.8M - 20M',
      propertiesCount: 710,
      rentalYield: '8.2%',
      capitalAppreciation: '+12.8% YoY'
    },
    highlights: [
      '7km landscaped Marina Walk promenade',
      'Marina Mall with waterfront dining & cinema',
      'Direct tram and metro integration',
      'Adjacent to Bluewaters Island & Ain Dubai'
    ],
    lifestylePoints: [
      {
        title: 'High Rental Yields',
        description: 'Consistent tenant demand for short-term luxury holiday lets and corporate stays.',
        icon: 'trending-up'
      }
    ],
    coordinates: {
      lat: 25.0805,
      lng: 55.1403
    }
  },
  {
    id: 'emirates-hills',
    name: 'Emirates Hills',
    slug: 'emirates-hills',
    tagline: 'The Beverly Hills of Dubai: Palatial Mansions & Ultra-Privacy',
    description: 'Dubai’s most prestigious gated enclave for discerning global dignitaries and billionaires. Custom-designed palatial villas overlooking the Montgomerie Championship Golf Course.',
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85'
    ],
    category: 'Luxury',
    stats: {
      residents: '4,500+',
      averagePriceAED: 'AED 25M - 150M',
      propertiesCount: 240,
      rentalYield: '6.4%',
      capitalAppreciation: '+24.1% YoY'
    },
    highlights: [
      'Montgomerie 18-hole championship golf club',
      'Maximum privacy with multi-tier biometric security checkpoints',
      'Palatial plot sizes from 15,000 to 45,000+ sq.ft.',
      'Mature lush tree-lined lakes and serene parkways'
    ],
    lifestylePoints: [
      {
        title: 'Billionaires Row',
        description: 'Elite community of diplomats, royal family members, and Fortune 500 CEOs.',
        icon: 'crown'
      }
    ],
    coordinates: {
      lat: 25.0682,
      lng: 55.1768
    }
  },
  {
    id: 'business-bay',
    name: 'Business Bay',
    slug: 'business-bay',
    tagline: 'Dubai Water Canal Waterfront Towers & Prime Investment Gateway',
    description: 'A dynamic metropolis bordering Downtown Dubai. Business Bay combines canal-side pedestrian boardwalks with avant-garde architectural towers by Zaha Hadid and Omniyat.',
    heroImage: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=85'
    ],
    category: 'Investment',
    stats: {
      residents: '42,000+',
      averagePriceAED: 'AED 1.4M - 18M',
      propertiesCount: 490,
      rentalYield: '8.9%',
      capitalAppreciation: '+16.5% YoY'
    },
    highlights: [
      'Dubai Water Canal boardwalk with private boat docks',
      'Instant access to Downtown Dubai & Sheikh Zayed Road',
      'Luxury designer towers: The Opus, Peninsula, Vela',
      'High occupancy rates and rapid capital gains'
    ],
    lifestylePoints: [
      {
        title: 'Maximum ROI',
        description: 'Top-tier capital appreciation and 8.9%+ net rental yields.',
        icon: 'bar-chart'
      }
    ],
    coordinates: {
      lat: 25.1837,
      lng: 55.2666
    }
  }
];
