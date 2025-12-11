// Site Configuration
export const SITE_CONFIG = {
  name: 'WhiteBay Resort',
  tagline: 'Where Luxury Meets the Ocean',
  description: 'Experience unparalleled luxury at WhiteBay Resort. Nestled along the pristine shores of Nigeria, our resort offers world-class amenities, stunning ocean views, and unforgettable experiences.',
  contact: {
    phone: '+234 803 456 7890',
    email: 'reservations@whitebayresort.com.ng',
    address: '42 Atlantic Beach Road, Victoria Island, Lagos, Nigeria',
    whatsapp: '+2348034567890',
  },
  social: {
    instagram: 'https://instagram.com/whitebayresort',
    facebook: 'https://facebook.com/whitebayresort',
    twitter: 'https://twitter.com/whitebayresort',
    youtube: 'https://youtube.com/whitebayresort',
  },
};

// Navigation Links
export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Rooms', href: '/rooms' },
  { name: 'Facilities', href: '/facilities' },
  { name: 'Events', href: '/live-events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Offers', href: '/offers' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

// Room Types
export const ROOMS = [
  {
    id: 'ocean-view-suite',
    name: 'Ocean View Suite',
    description: 'Wake up to breathtaking panoramic ocean views in our spacious Ocean View Suite. Featuring a private balcony, king-size bed, and luxurious amenities.',
    price: 350000,
    capacity: 2,
    size: '55 sqm',
    bedType: 'King Size Bed',
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop&q=80',
    ],
    amenities: ['Ocean View', 'Private Balcony', 'Mini Bar', 'Smart TV', 'Free WiFi', 'Room Service', 'Air Conditioning', 'Safe'],
    featured: true,
  },
  {
    id: 'beachfront-villa',
    name: 'Beachfront Villa',
    description: 'Experience ultimate luxury in our exclusive Beachfront Villa. Direct beach access, private pool, and personalized butler service await you.',
    price: 650000,
    capacity: 4,
    size: '120 sqm',
    bedType: '2 King Size Beds',
    images: [
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop&q=80',
    ],
    amenities: ['Beach Access', 'Private Pool', 'Butler Service', 'Outdoor Shower', 'Kitchenette', 'Living Area', 'Smart TV', 'Premium WiFi'],
    featured: true,
  },
  {
    id: 'garden-retreat',
    name: 'Garden Retreat',
    description: 'Find serenity in our Garden Retreat rooms, surrounded by lush tropical gardens. Perfect for couples seeking a peaceful escape.',
    price: 250000,
    capacity: 2,
    size: '42 sqm',
    bedType: 'Queen Size Bed',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop&q=80',
    ],
    amenities: ['Garden View', 'Terrace', 'Mini Bar', 'Smart TV', 'Free WiFi', 'Coffee Maker', 'Air Conditioning', 'Safe'],
    featured: false,
  },
  {
    id: 'family-suite',
    name: 'Family Suite',
    description: 'Spacious and comfortable, our Family Suite is designed for memorable family vacations. Two bedrooms, living area, and child-friendly amenities.',
    price: 450000,
    capacity: 6,
    size: '95 sqm',
    bedType: '1 King + 2 Twin Beds',
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ez89a2cc8?w=800&h=600&fit=crop&q=80',
    ],
    amenities: ['Ocean View', 'Connecting Rooms', 'Kids Amenities', 'Gaming Console', 'Living Area', 'Kitchenette', 'Free WiFi', 'Room Service'],
    featured: false,
  },
  {
    id: 'presidential-suite',
    name: 'Presidential Suite',
    description: 'The pinnacle of luxury. Our Presidential Suite offers unparalleled elegance with 180° ocean views, private dining, and exclusive amenities.',
    price: 1200000,
    capacity: 4,
    size: '200 sqm',
    bedType: 'Master King Suite',
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop&q=80',
    ],
    amenities: ['Panoramic Views', 'Private Terrace', 'Butler Service', 'Private Chef', 'Jacuzzi', 'Study Room', 'Premium Bar', 'Chauffeur Service'],
    featured: true,
  },
  {
    id: 'honeymoon-haven',
    name: 'Honeymoon Haven',
    description: 'Celebrate love in our romantic Honeymoon Haven. Rose petal turndown, champagne on arrival, and couples spa treatment included.',
    price: 520000,
    capacity: 2,
    size: '65 sqm',
    bedType: 'Romantic King Bed',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop&q=80',
    ],
    amenities: ['Ocean View', 'Private Jacuzzi', 'Champagne', 'Rose Petals', 'Couples Spa', 'Romantic Dining', 'Sunset Cruise', 'Photography'],
    featured: true,
  },
];

// Dining Options
export const DINING = [
  {
    id: 'ocean-terrace',
    name: 'The Ocean Terrace',
    tagline: 'Fine Dining with Sunset Views',
    description: 'Our signature restaurant offers an exquisite culinary journey with fresh seafood, prime cuts, and locally sourced ingredients. Watch the sun set over the ocean as our award-winning chefs create unforgettable dining experiences.',
    cuisine: 'Contemporary Seafood & International',
    priceRange: '$$$',
    hours: '6:00 PM - 11:00 PM',
    dressCode: 'Smart Casual',
    reservations: true,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&q=80',
    ],
    highlights: ['Oceanfront Tables', 'Wine Cellar', 'Chef\'s Table Experience', 'Live Music Fridays'],
  },
  {
    id: 'coral-kitchen',
    name: 'Coral Kitchen',
    tagline: 'All-Day International Dining',
    description: 'Start your day with our lavish breakfast buffet featuring international favorites and local specialties. Return for lunch to enjoy fresh salads, gourmet sandwiches, and Asian-inspired dishes.',
    cuisine: 'International Buffet & À La Carte',
    priceRange: '$$',
    hours: '6:30 AM - 10:30 PM',
    dressCode: 'Resort Casual',
    reservations: false,
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=600&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&h=600&fit=crop&q=80',
    ],
    highlights: ['Breakfast Buffet', 'Live Cooking Stations', 'Kids Menu', 'Outdoor Seating'],
  },
  {
    id: 'bay-lounge',
    name: 'Bay Lounge',
    tagline: 'Cocktails & Light Bites',
    description: 'Unwind at our sophisticated lounge bar with handcrafted cocktails, premium spirits, and a selection of light bites. Perfect for pre-dinner drinks or a nightcap under the stars.',
    cuisine: 'Tapas & Bar Snacks',
    priceRange: '$$',
    hours: '4:00 PM - 1:00 AM',
    dressCode: 'Smart Casual',
    reservations: false,
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&h=600&fit=crop&q=80',
    ],
    highlights: ['Signature Cocktails', 'Live DJ Saturdays', 'Cigar Lounge', 'Ocean View Terrace'],
  },
  {
    id: 'beach-grill',
    name: 'Beach Grill',
    tagline: 'Casual Beachfront Dining',
    description: 'Enjoy freshly grilled seafood and tropical drinks with your feet in the sand. Our beachside grill serves up casual favorites perfect for a laid-back lunch.',
    cuisine: 'Grilled Seafood & BBQ',
    priceRange: '$$',
    hours: '11:00 AM - 6:00 PM',
    dressCode: 'Beach Casual',
    reservations: false,
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&h=600&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1529543544277-750e850bb845?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&h=600&fit=crop&q=80',
    ],
    highlights: ['Fresh Catch Daily', 'Tropical Smoothies', 'Beach Service', 'Sunset BBQ'],
  },
];

// Spa & Wellness
export const SPA_SERVICES = [
  {
    id: 'signature-massage',
    name: 'WhiteBay Signature Massage',
    description: 'Our signature treatment combines traditional techniques with aromatherapy and hot stones for complete relaxation.',
    duration: '90 min',
    price: 85000,
    category: 'massage',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 'couples-retreat',
    name: 'Couples Retreat',
    description: 'Share a romantic spa experience with side-by-side massages, champagne, and chocolate-covered strawberries.',
    duration: '120 min',
    price: 150000,
    category: 'couples',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 'ocean-facial',
    name: 'Ocean Renewal Facial',
    description: 'Marine-based skincare treatment that hydrates, firms, and revitalizes your skin with sea minerals.',
    duration: '60 min',
    price: 65000,
    category: 'facial',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 'body-wrap',
    name: 'Tropical Body Wrap',
    description: 'Detoxifying wrap using local ingredients including coconut, papaya, and shea butter.',
    duration: '75 min',
    price: 70000,
    category: 'body',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 'hot-stone',
    name: 'Hot Stone Therapy',
    description: 'Warm basalt stones melt away tension while therapeutic oils nourish your skin.',
    duration: '90 min',
    price: 95000,
    category: 'massage',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 'day-spa',
    name: 'Full Day Spa Journey',
    description: 'Complete wellness experience including massage, facial, body treatment, lunch, and pool access.',
    duration: '6 hours',
    price: 250000,
    category: 'package',
    image: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?w=800&h=600&fit=crop&q=80',
  },
];

export const SPA_FACILITIES = [
  { name: 'Treatment Rooms', description: '12 private rooms with ocean views', icon: 'door' },
  { name: 'Thermal Suite', description: 'Sauna, steam room, and ice fountain', icon: 'thermometer' },
  { name: 'Relaxation Lounge', description: 'Quiet space with herbal teas', icon: 'coffee' },
  { name: 'Vitality Pool', description: 'Hydrotherapy pool with jets', icon: 'waves' },
  { name: 'Fitness Center', description: '24/7 gym with ocean views', icon: 'dumbbell' },
  { name: 'Yoga Studio', description: 'Daily classes and private sessions', icon: 'heart' },
];

// Activities
export const ACTIVITIES = [
  {
    id: 'jet-ski',
    name: 'Jet Ski Adventure',
    description: 'Feel the rush as you race across the crystal-clear waters on our premium jet skis.',
    duration: '30 min',
    price: 55000,
    category: 'water-sports',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80',
    difficulty: 'Easy',
    minAge: 16,
  },
  {
    id: 'scuba-diving',
    name: 'Scuba Diving',
    description: 'Explore vibrant coral reefs and encounter tropical marine life with certified instructors.',
    duration: '3 hours',
    price: 85000,
    category: 'water-sports',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80',
    difficulty: 'Moderate',
    minAge: 12,
  },
  {
    id: 'snorkeling',
    name: 'Snorkeling Tour',
    description: 'Discover the underwater paradise with guided snorkeling tours to the best reef spots.',
    duration: '2 hours',
    price: 35000,
    category: 'water-sports',
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&h=600&fit=crop&q=80',
    difficulty: 'Easy',
    minAge: 6,
  },
  {
    id: 'sunset-cruise',
    name: 'Sunset Sailing Cruise',
    description: 'Sail into the sunset on our luxury catamaran with champagne and canapés.',
    duration: '2.5 hours',
    price: 75000,
    category: 'excursions',
    image: 'https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=800&h=600&fit=crop&q=80',
    difficulty: 'Easy',
    minAge: 0,
  },
  {
    id: 'island-tour',
    name: 'Lagos Discovery Tour',
    description: 'Full-day guided tour exploring beaches, local markets, and scenic viewpoints around Lagos.',
    duration: 'Full Day',
    price: 95000,
    category: 'excursions',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&h=600&fit=crop&q=80',
    difficulty: 'Easy',
    minAge: 0,
  },
  {
    id: 'paddleboard',
    name: 'Stand-Up Paddleboarding',
    description: 'Glide over calm waters on a paddleboard - lessons available for beginners.',
    duration: '1 hour',
    price: 25000,
    category: 'water-sports',
    image: 'https://images.unsplash.com/photo-1526188717906-ab4a2f949f25?w=800&h=600&fit=crop&q=80',
    difficulty: 'Easy',
    minAge: 10,
  },
  {
    id: 'kayaking',
    name: 'Kayak Exploration',
    description: 'Paddle through mangroves and discover hidden coves on a guided kayak tour.',
    duration: '2 hours',
    price: 30000,
    category: 'water-sports',
    image: 'https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=800&h=600&fit=crop&q=80',
    difficulty: 'Moderate',
    minAge: 8,
  },
  {
    id: 'fishing',
    name: 'Deep Sea Fishing',
    description: 'Charter our fishing boat for an exciting deep-sea fishing adventure.',
    duration: '4 hours',
    price: 180000,
    category: 'excursions',
    image: 'https://images.unsplash.com/photo-1544551763-8dd44758c2dd?w=800&h=600&fit=crop&q=80',
    difficulty: 'Moderate',
    minAge: 10,
  },
];

// Game Lounge
export const GAME_LOUNGE = {
  name: 'The Game Lounge',
  tagline: 'Entertainment for All Ages',
  description: 'Our state-of-the-art Game Lounge offers entertainment for guests of all ages. From the latest video games to classic arcade machines, billiards, and board games, there\'s something for everyone.',
  hours: '10:00 AM - 12:00 AM',
  image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&h=600&fit=crop&q=80',
  features: [
    {
      name: 'Gaming Zone',
      description: 'PlayStation 5, Xbox Series X, and Nintendo Switch with the latest games',
      icon: 'gamepad',
      image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800&h=600&fit=crop&q=80',
    },
    {
      name: 'Arcade Classics',
      description: 'Retro arcade machines including Pac-Man, Space Invaders, and more',
      icon: 'joystick',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop&q=80',
    },
    {
      name: 'Billiards & Table Games',
      description: 'Professional billiard tables, foosball, and air hockey',
      icon: 'target',
      image: 'https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?w=800&h=600&fit=crop&q=80',
    },
    {
      name: 'Board Game Library',
      description: 'Over 100 board games and puzzles for family fun',
      icon: 'dice',
      image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=600&fit=crop&q=80',
    },
    {
      name: 'VR Experience',
      description: 'Immersive virtual reality games and adventures',
      icon: 'vr',
      image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=600&fit=crop&q=80',
    },
    {
      name: 'Snack Bar',
      description: 'Refreshments, snacks, and gaming fuel available',
      icon: 'coffee',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop&q=80',
    },
  ],
};

// Events & Weddings
export const EVENT_VENUES = [
  {
    id: 'beach-ceremony',
    name: 'Beach Ceremony',
    description: 'Say "I do" with your toes in the sand and the ocean as your backdrop.',
    capacity: 150,
    type: 'wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&q=80',
    features: ['Oceanfront Location', 'Sunset Ceremonies', 'Floral Arch', 'White Chairs'],
  },
  {
    id: 'garden-pavilion',
    name: 'Garden Pavilion',
    description: 'Elegant covered venue surrounded by tropical gardens and fairy lights.',
    capacity: 200,
    type: 'wedding',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop&q=80',
    features: ['Covered Venue', 'Garden Setting', 'Dance Floor', 'Built-in Bar'],
  },
  {
    id: 'grand-ballroom',
    name: 'Grand Ballroom',
    description: 'Our magnificent ballroom with crystal chandeliers and ocean views.',
    capacity: 300,
    type: 'both',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop&q=80',
    features: ['Ocean Views', 'State-of-art AV', 'Pre-function Area', 'Bridal Suite'],
  },
  {
    id: 'conference-center',
    name: 'Conference Center',
    description: 'Modern meeting facilities with the latest technology and breakout rooms.',
    capacity: 100,
    type: 'conference',
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&h=600&fit=crop&q=80',
    features: ['High-speed WiFi', 'Video Conferencing', 'Breakout Rooms', 'Catering'],
  },
  {
    id: 'rooftop-terrace',
    name: 'Rooftop Terrace',
    description: 'Stunning rooftop venue with panoramic views perfect for cocktail events.',
    capacity: 80,
    type: 'celebration',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop&q=80',
    features: ['360° Views', 'Open Air', 'Bar Setup', 'Lounge Seating'],
  },
];

export const WEDDING_PACKAGES = [
  {
    name: 'Intimate Escape',
    price: 2500000,
    guests: 'Up to 20',
    includes: ['Beach ceremony', 'Floral bouquet', 'Wedding cake', 'Champagne toast', 'Photography (2 hrs)'],
  },
  {
    name: 'Tropical Romance',
    price: 6000000,
    guests: 'Up to 50',
    includes: ['Choice of venue', 'Full floral décor', 'Wedding cake', 'Dinner reception', 'Photography (4 hrs)', 'DJ'],
  },
  {
    name: 'Grand Celebration',
    price: 15000000,
    guests: 'Up to 150',
    includes: ['Premium venue', 'Luxury décor', 'Custom menu', 'Open bar', 'Full day photography', 'Live band', 'Fireworks'],
  },
];

// Special Offers
export const OFFERS = [
  {
    id: 'early-bird',
    name: 'Early Bird Special',
    tagline: 'Book 60 days in advance',
    discount: '25% OFF',
    description: 'Plan ahead and save! Book your stay at least 60 days in advance and receive 25% off our best available rates.',
    validUntil: '2025-12-31',
    terms: ['Minimum 3-night stay', 'Non-refundable', 'Subject to availability'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80',
    code: 'EARLY25',
    featured: true,
  },
  {
    id: 'honeymoon',
    name: 'Honeymoon Package',
    tagline: 'Start your forever with us',
    discount: 'From ₦1,500,000',
    description: 'Celebrate your new beginning with 5 nights in our Honeymoon Haven, including couples spa, romantic dinner, and sunset cruise.',
    validUntil: '2025-12-31',
    terms: ['5-night minimum', 'Marriage certificate required', 'Within 6 months of wedding'],
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop&q=80',
    code: 'HONEYMOON',
    featured: true,
  },
  {
    id: 'family-fun',
    name: 'Family Fun Package',
    tagline: 'Kids stay & eat free',
    discount: 'Kids FREE',
    description: 'Family vacation made easy! Children under 12 stay and eat free. Includes daily activities, game lounge access, and beach toys.',
    validUntil: '2025-12-31',
    terms: ['Maximum 2 children per room', 'Ages 0-12', 'Minimum 4-night stay'],
    image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&h=600&fit=crop&q=80',
    code: 'FAMILYFUN',
    featured: true,
  },
  {
    id: 'spa-escape',
    name: 'Spa Retreat',
    tagline: 'Rejuvenate & Relax',
    discount: '20% OFF Spa',
    description: 'Book any 3+ night stay and receive 20% off all spa treatments, plus complimentary access to thermal facilities.',
    validUntil: '2025-12-31',
    terms: ['3-night minimum', 'Spa bookings subject to availability'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop&q=80',
    code: 'SPARELAX',
    featured: false,
  },
  {
    id: 'long-stay',
    name: 'Extended Stay',
    tagline: 'Stay longer, save more',
    discount: '30% OFF',
    description: 'Make the most of paradise! Stay 7 nights or more and enjoy 30% off your entire stay plus complimentary airport transfers.',
    validUntil: '2025-12-31',
    terms: ['7-night minimum', 'Cannot combine with other offers'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&q=80',
    code: 'LONGSTAY30',
    featured: false,
  },
  {
    id: 'adventure',
    name: 'Adventure Package',
    tagline: 'Thrill seeker special',
    discount: '15% OFF Activities',
    description: 'For the adventurous! 15% off all water sports and excursions when you book a 4+ night stay.',
    validUntil: '2025-12-31',
    terms: ['4-night minimum', 'Activities subject to availability'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80',
    code: 'ADVENTURE15',
    featured: false,
  },
];

// FAQ
export const FAQ_ITEMS = [
  {
    category: 'Reservations',
    questions: [
      {
        q: 'What time is check-in and check-out?',
        a: 'Check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request, subject to availability.',
      },
      {
        q: 'How can I modify or cancel my reservation?',
        a: 'You can modify or cancel your reservation through our website, by email, or by calling our reservations team. Please note that cancellation policies vary by rate type.',
      },
      {
        q: 'Is a deposit required?',
        a: 'Yes, a one-night deposit is required at the time of booking. Full payment is due upon check-in.',
      },
      {
        q: 'Do you offer airport transfers?',
        a: 'Yes, we offer complimentary airport transfers for guests staying in suites and villas. Standard room guests can arrange transfers for an additional fee.',
      },
    ],
  },
  {
    category: 'Amenities',
    questions: [
      {
        q: 'Is WiFi available?',
        a: 'Yes, complimentary high-speed WiFi is available throughout the resort, including all rooms and public areas.',
      },
      {
        q: 'Is breakfast included?',
        a: 'Breakfast is included with most room rates. Please check your booking confirmation for details.',
      },
      {
        q: 'Do you have a swimming pool?',
        a: 'Yes, we have three pools: an infinity pool overlooking the ocean, a family pool, and a quiet adults-only pool.',
      },
      {
        q: 'Is the spa open to non-hotel guests?',
        a: 'Yes, our spa welcomes day visitors. Advance booking is recommended.',
      },
    ],
  },
  {
    category: 'Policies',
    questions: [
      {
        q: 'What is your pet policy?',
        a: 'We are a pet-friendly resort for small dogs and cats (under 20 lbs). A pet fee applies, and advance notice is required.',
      },
      {
        q: 'Is smoking allowed?',
        a: 'All indoor areas are non-smoking. Designated outdoor smoking areas are available throughout the resort.',
      },
      {
        q: 'What is the minimum age for check-in?',
        a: 'Guests must be at least 21 years old to check in. Guests under 21 must be accompanied by a parent or guardian.',
      },
      {
        q: 'Do you accommodate dietary restrictions?',
        a: 'Absolutely! Our restaurants cater to various dietary requirements including vegetarian, vegan, gluten-free, and allergies. Please inform us at booking.',
      },
    ],
  },
  {
    category: 'Activities',
    questions: [
      {
        q: 'Do I need to book activities in advance?',
        a: 'We recommend booking popular activities like diving, fishing, and spa treatments in advance to secure your preferred time.',
      },
      {
        q: 'Are water sports included in the room rate?',
        a: 'Non-motorized water sports (kayaks, paddleboards, snorkel gear) are complimentary. Motorized activities have an additional fee.',
      },
      {
        q: 'Do you offer kids programs?',
        a: 'Yes! Our Kids Club offers supervised activities for children ages 4-12, including beach games, arts & crafts, and water play.',
      },
      {
        q: 'Can I arrange private excursions?',
        a: 'Absolutely. Our concierge team can arrange customized private tours and experiences tailored to your interests.',
      },
    ],
  },
];

// Policies
export const POLICIES = {
  cancellation: {
    title: 'Cancellation Policy',
    content: [
      'Cancellations made 14+ days before arrival: Full refund minus processing fee',
      'Cancellations made 7-13 days before arrival: 50% refund',
      'Cancellations made 0-6 days before arrival: No refund',
      'No-shows will be charged the full amount',
      'Special event dates and holiday periods may have different policies',
    ],
  },
  checkInOut: {
    title: 'Check-in & Check-out',
    content: [
      'Check-in time: 3:00 PM',
      'Check-out time: 11:00 AM',
      'Early check-in (from 12:00 PM): Subject to availability, ₦25,000 fee',
      'Late check-out (until 3:00 PM): Subject to availability, ₦25,000 fee',
      'Extended late check-out (until 6:00 PM): Subject to availability, half-day rate',
    ],
  },
  children: {
    title: 'Children Policy',
    content: [
      'Children of all ages are welcome',
      'Children under 12 stay free when using existing bedding',
      'Cribs and rollaway beds available upon request (₦15,000/night)',
      'Kids Club available for ages 4-12 (complimentary)',
      'Baby-sitting services available (₦10,000/hour, 24-hour advance notice)',
    ],
  },
  pets: {
    title: 'Pet Policy',
    content: [
      'Small pets (under 10 kg) welcome in designated rooms',
      'Pet fee: ₦35,000 per night',
      'Maximum 2 pets per room',
      'Pets must be leashed in public areas',
      'Pet amenities package available (bed, bowls, treats)',
      'Service animals always welcome at no charge',
    ],
  },
  payment: {
    title: 'Payment Policy',
    content: [
      'We accept Visa, MasterCard, Verve, Bank Transfer, and Paystack',
      'One-night deposit required at booking',
      'Full payment due at check-in',
      'Card authorization or cash deposit for incidentals',
      'Resort fees of ₦25,000/night include WiFi, fitness center, and beach amenities',
    ],
  },
  dressCode: {
    title: 'Dress Code',
    content: [
      'The Ocean Terrace: Smart casual (no beachwear, flip-flops, or tank tops)',
      'Bay Lounge: Smart casual',
      'Coral Kitchen: Resort casual',
      'Beach Grill: Beach attire welcome',
      'Pool areas: Swimwear required, cover-ups when leaving pool deck',
    ],
  },
};

// Facilities (updated)
export const FACILITIES = [
  {
    id: 'infinity-pool',
    name: 'Infinity Pool',
    description: 'Our stunning infinity pool overlooks the ocean, offering a seamless horizon view. Features temperature control, poolside bar, and private cabanas.',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop&q=80',
    icon: 'waves',
    hours: '6:00 AM - 10:00 PM',
  },
  {
    id: 'spa-wellness',
    name: 'Spa & Wellness',
    description: 'Rejuvenate mind and body at our world-class spa. Traditional and modern treatments, thermal circuits, and meditation gardens await.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop&q=80',
    icon: 'spa',
    hours: '8:00 AM - 9:00 PM',
  },
  {
    id: 'private-beach',
    name: 'Private Beach',
    description: 'Exclusive access to our pristine private beach. Complimentary loungers, umbrellas, and beach butler service for all guests.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80',
    icon: 'umbrella',
    hours: 'Sunrise - Sunset',
  },
  {
    id: 'fine-dining',
    name: 'Fine Dining',
    description: 'Three award-winning restaurants offering international cuisine, fresh seafood, and local delicacies. Sunset dining on the terrace available.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&q=80',
    icon: 'utensils',
    hours: '7:00 AM - 11:00 PM',
  },
  {
    id: 'fitness-center',
    name: 'Fitness Center',
    description: 'State-of-the-art gym with ocean views, personal trainers, yoga classes, and outdoor workout areas. 24/7 access for hotel guests.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop&q=80',
    icon: 'dumbbell',
    hours: '24/7',
  },
  {
    id: 'water-sports',
    name: 'Water Sports',
    description: 'Adventure awaits with our water sports center. Jet skiing, snorkeling, diving, paddleboarding, and sailing lessons available.',
    image: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800&h=600&fit=crop&q=80',
    icon: 'anchor',
    hours: '8:00 AM - 6:00 PM',
  },
  {
    id: 'game-lounge',
    name: 'Game Lounge',
    description: 'Entertainment for all ages with video games, arcade machines, billiards, VR experiences, and board games.',
    image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&h=600&fit=crop&q=80',
    icon: 'gamepad',
    hours: '10:00 AM - 12:00 AM',
  },
  {
    id: 'kids-club',
    name: 'Kids Club',
    description: 'Supervised activities for children ages 4-12 including beach games, arts & crafts, and educational programs.',
    image: 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800&h=600&fit=crop&q=80',
    icon: 'child',
    hours: '9:00 AM - 6:00 PM',
  },
];

// Gallery Images
export const GALLERY_IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80', category: 'resort', alt: 'Resort exterior view' },
  { id: 2, src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop&q=80', category: 'rooms', alt: 'Luxury room interior' },
  { id: 3, src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80', category: 'beach', alt: 'Private beach' },
  { id: 4, src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop&q=80', category: 'pool', alt: 'Infinity pool' },
  { id: 5, src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop&q=80', category: 'spa', alt: 'Spa treatment' },
  { id: 6, src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&q=80', category: 'dining', alt: 'Fine dining restaurant' },
  { id: 7, src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&q=80', category: 'rooms', alt: 'Villa bedroom' },
  { id: 8, src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop&q=80', category: 'resort', alt: 'Resort pool area' },
  { id: 9, src: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800&h=600&fit=crop&q=80', category: 'activities', alt: 'Water sports' },
  { id: 10, src: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&h=600&fit=crop&q=80', category: 'rooms', alt: 'Beachfront villa' },
  { id: 11, src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop&q=80', category: 'resort', alt: 'Resort sunset' },
  { id: 12, src: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop&q=80', category: 'rooms', alt: 'Family suite' },
  { id: 13, src: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&h=600&fit=crop&q=80', category: 'activities', alt: 'Game lounge' },
  { id: 14, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&q=80', category: 'events', alt: 'Beach wedding' },
  { id: 15, src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop&q=80', category: 'spa', alt: 'Couples spa' },
  { id: 16, src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80', category: 'activities', alt: 'Scuba diving' },
];

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Chioma Okonkwo',
    location: 'Lagos, Nigeria',
    rating: 5,
    text: 'Absolutely breathtaking! The Ocean View Suite exceeded all expectations. The staff made us feel like royalty from the moment we arrived.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80',
    room: 'Ocean View Suite',
  },
  {
    id: 2,
    name: 'Emeka & Adaeze Nnamdi',
    location: 'Abuja, Nigeria',
    rating: 5,
    text: 'Our honeymoon was magical! The Honeymoon Haven was perfect - rose petals, champagne, and that sunset view. We are already planning our return.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80',
    room: 'Honeymoon Haven',
  },
  {
    id: 3,
    name: 'Olumide Adeyemi',
    location: 'Port Harcourt, Nigeria',
    rating: 5,
    text: 'The Presidential Suite is worth every naira. Private chef, butler service, and that view! Perfect for celebrating my anniversary.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80',
    room: 'Presidential Suite',
  },
  {
    id: 4,
    name: 'Funke Balogun',
    location: 'Ibadan, Nigeria',
    rating: 5,
    text: 'The spa treatments were incredible and the Game Lounge kept our kids entertained for hours. Perfect family vacation!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80',
    room: 'Family Suite',
  },
];

// Stats for homepage
export const RESORT_STATS = [
  { value: 15, suffix: '+', label: 'Years of Excellence' },
  { value: 50, suffix: '+', label: 'Luxury Rooms' },
  { value: 25000, suffix: '+', label: 'Happy Guests' },
  { value: 4.9, suffix: '', label: 'Guest Rating' },
];
