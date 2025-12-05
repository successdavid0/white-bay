// Site Configuration
export const SITE_CONFIG = {
  name: 'WhiteBay Resort',
  tagline: 'Where Luxury Meets the Ocean',
  description: 'Experience unparalleled luxury at WhiteBay Resort. Nestled along pristine shores, our resort offers world-class amenities, stunning ocean views, and unforgettable experiences.',
  contact: {
    phone: '+1 (555) 123-4567',
    email: 'reservations@whitebayresort.com',
    address: '123 Ocean Boulevard, Paradise Bay, FL 33139',
    whatsapp: '+15551234567',
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
  { name: 'Gallery', href: '/gallery' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

// Room Types
export const ROOMS = [
  {
    id: 'ocean-view-suite',
    name: 'Ocean View Suite',
    description: 'Wake up to breathtaking panoramic ocean views in our spacious Ocean View Suite. Featuring a private balcony, king-size bed, and luxurious amenities.',
    price: 450,
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
    price: 850,
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
    price: 320,
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
    price: 580,
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
    price: 1500,
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
    price: 680,
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

// Facilities
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
];

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    location: 'New York, USA',
    rating: 5,
    text: 'Absolutely breathtaking! The Ocean View Suite exceeded all expectations. The staff made us feel like royalty from the moment we arrived.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80',
    room: 'Ocean View Suite',
  },
  {
    id: 2,
    name: 'James & Emma Thompson',
    location: 'London, UK',
    rating: 5,
    text: 'Our honeymoon was magical! The Honeymoon Haven was perfect - rose petals, champagne, and that sunset view. We are already planning our return.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80',
    room: 'Honeymoon Haven',
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    location: 'Miami, USA',
    rating: 5,
    text: 'The Presidential Suite is worth every penny. Private chef, butler service, and that view! Perfect for celebrating my anniversary.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80',
    room: 'Presidential Suite',
  },
];

// Stats for homepage
export const RESORT_STATS = [
  { value: 15, suffix: '+', label: 'Years of Excellence' },
  { value: 50, suffix: '+', label: 'Luxury Rooms' },
  { value: 25000, suffix: '+', label: 'Happy Guests' },
  { value: 4.9, suffix: '', label: 'Guest Rating' },
];

