'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Search, 
  ChevronRight, 
  Star, 
  Waves, 
  Sparkles,
  Play,
  ArrowRight,
  Quote
} from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem, Counter } from '@/components/AnimatedSection';
import { ROOMS, FACILITIES, TESTIMONIALS, RESORT_STATS, SITE_CONFIG } from '@/lib/constants';
import { formatCurrency, cn } from '@/lib/utils';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <RoomsPreview />
      <FacilitiesPreview />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}

// ============================================
// HERO SECTION
// ============================================
function HeroSection() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop&q=80"
          alt="WhiteBay Resort"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-500/60 via-navy-500/40 to-navy-500/70" />
        
        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-ocean-500/20 to-teal-400/20"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Floating Decorative Elements - Hidden on mobile */}
      <motion.div
        className="absolute top-32 left-20 text-white/10 hidden md:block"
        animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Waves size={120} />
      </motion.div>
      <motion.div
        className="absolute bottom-40 right-20 text-white/10 hidden md:block"
        animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkles size={80} />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center pt-20 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-accent">
            <Star size={14} className="text-gold-400 fill-gold-400" />
            Award-Winning Luxury Resort
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-4 sm:mb-6 text-shadow-lg"
        >
          Where Luxury
          <br />
          <span className="text-gradient-gold bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 bg-clip-text text-transparent">
            Meets the Ocean
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 sm:mb-12 px-2"
        >
          Discover an extraordinary escape at WhiteBay Resort. Pristine beaches, 
          world-class amenities, and unforgettable experiences await.
        </motion.p>

        {/* Booking Widget */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {/* Check In */}
              <div className="relative">
                <label className="block text-white/60 text-sm font-accent mb-2 text-left">
                  Check In
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-400" size={20} />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
              </div>

              {/* Check Out */}
              <div className="relative">
                <label className="block text-white/60 text-sm font-accent mb-2 text-left">
                  Check Out
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-400" size={20} />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="relative">
                <label className="block text-white/60 text-sm font-accent mb-2 text-left">
                  Guests
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-400" size={20} />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white appearance-none focus:outline-none focus:border-gold-400 transition-colors cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num} className="bg-navy-500 text-white">
                        {num} Guest{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end sm:col-span-2 md:col-span-1">
                <Link
                  href={`/rooms?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                  className="w-full py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-500 font-accent font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold-400/30 transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Search size={20} />
                  <span className="hidden sm:inline">Check Availability</span>
                  <span className="sm:hidden">Search</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-3 bg-white/60 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// FEATURES SECTION
// ============================================
function FeaturesSection() {
  const features = [
    {
      icon: '🏖️',
      title: 'Private Beach',
      description: 'Exclusive access to pristine white sand beaches',
    },
    {
      icon: '🍽️',
      title: 'Fine Dining',
      description: 'Award-winning restaurants with ocean views',
    },
    {
      icon: '💆',
      title: 'Luxury Spa',
      description: 'World-class treatments for ultimate relaxation',
    },
    {
      icon: '🏊',
      title: 'Infinity Pool',
      description: 'Stunning pool merging with the horizon',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ocean-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-ocean-500 font-accent text-sm tracking-widest uppercase mb-4 block">
            Why Choose Us
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-navy-500 mb-6">
            Experience Excellence
          </h2>
          <p className="text-navy-500/70 max-w-2xl mx-auto text-lg">
            Every moment at WhiteBay is crafted to perfection, offering you an unparalleled 
            blend of luxury, comfort, and natural beauty.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -10 }}
                className="group relative bg-gradient-to-b from-sand-100 to-white p-8 rounded-2xl border border-sand-200 hover:shadow-xl hover:shadow-ocean-500/10 transition-all duration-500"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="font-heading text-xl text-navy-500 mb-3">{feature.title}</h3>
                <p className="text-navy-500/60">{feature.description}</p>
                
                {/* Hover Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-ocean-500 to-teal-400 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ============================================
// ROOMS PREVIEW
// ============================================
function RoomsPreview() {
  const featuredRooms = ROOMS.filter((room) => room.featured).slice(0, 3);

  return (
    <section className="py-24 bg-sand-100 relative">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-ocean-500 font-accent text-sm tracking-widest uppercase mb-4 block">
              Accommodations
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-navy-500">
              Luxurious Rooms & Suites
            </h2>
          </div>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-ocean-500 font-accent font-medium hover:text-ocean-600 mt-4 md:mt-0 group"
          >
            View All Rooms
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room, index) => (
            <AnimatedSection key={room.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-navy-500/5 hover:shadow-2xl hover:shadow-navy-500/10 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-500/60 to-transparent" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                    <span className="text-navy-500 font-accent font-semibold">
                      {formatCurrency(room.price)}
                      <span className="text-navy-500/60 text-sm">/night</span>
                    </span>
                  </div>

                  {/* Room Name Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-heading text-2xl text-white mb-1">{room.name}</h3>
                    <p className="text-white/80 text-sm">{room.size} • {room.capacity} Guests</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-navy-500/70 text-sm mb-4 line-clamp-2">
                    {room.description}
                  </p>
                  
                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities.slice(0, 4).map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1 bg-sand-100 text-navy-500/70 text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/rooms/${room.id}`}
                    className="block w-full py-3 text-center bg-gradient-to-r from-ocean-500 to-ocean-600 text-white font-accent font-medium rounded-xl hover:shadow-lg hover:shadow-ocean-500/30 transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// FACILITIES PREVIEW
// ============================================
function FacilitiesPreview() {
  const displayedFacilities = FACILITIES.slice(0, 4);

  return (
    <section className="py-24 bg-navy-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20">
          <Waves size={200} />
        </div>
        <div className="absolute bottom-20 right-20">
          <Waves size={150} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="text-gold-400 font-accent text-sm tracking-widest uppercase mb-4 block">
            World-Class Amenities
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">
            Resort Facilities
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Indulge in our comprehensive range of facilities designed for your 
            ultimate comfort and enjoyment.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedFacilities.map((facility, index) => (
            <AnimatedSection 
              key={facility.id} 
              delay={index * 0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative h-80 rounded-2xl overflow-hidden"
              >
                <Image
                  src={facility.image}
                  alt={facility.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-500/90 via-navy-500/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gold-400 rounded-full flex items-center justify-center">
                      <span className="text-navy-500 text-xl">✨</span>
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl text-white">{facility.name}</h3>
                      <p className="text-white/60 text-sm">{facility.hours}</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm group-hover:text-white transition-colors">
                    {facility.description}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link
            href="/facilities"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-500 font-accent font-semibold rounded-full hover:shadow-xl hover:shadow-gold-400/30 transition-all"
          >
            Explore All Facilities
            <ArrowRight size={18} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============================================
// STATS SECTION
// ============================================
function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-ocean-500 to-teal-400 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {RESORT_STATS.map((stat, index) => (
            <StaggerItem key={index} className="text-center">
              <div className="text-3xl sm:text-5xl md:text-6xl font-heading text-white mb-1 sm:mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/80 font-accent text-xs sm:text-base">{stat.label}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ============================================
// TESTIMONIALS SECTION
// ============================================
function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Quote */}
      <div className="absolute top-20 left-10 text-ocean-500/5">
        <Quote size={200} />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-ocean-500 font-accent text-sm tracking-widest uppercase mb-4 block">
            Guest Stories
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-navy-500">
            What Our Guests Say
          </h2>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                  <Star key={i} size={24} className="text-gold-400 fill-gold-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-2xl md:text-3xl text-navy-500 font-heading italic mb-8">
                &ldquo;{TESTIMONIALS[activeIndex].text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <Image
                  src={TESTIMONIALS[activeIndex].avatar}
                  alt={TESTIMONIALS[activeIndex].name}
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-gold-400"
                />
                <div className="text-left">
                  <p className="font-accent font-semibold text-navy-500">
                    {TESTIMONIALS[activeIndex].name}
                  </p>
                  <p className="text-navy-500/60 text-sm">
                    {TESTIMONIALS[activeIndex].location} • {TESTIMONIALS[activeIndex].room}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  index === activeIndex
                    ? 'bg-ocean-500 w-8'
                    : 'bg-ocean-500/20 hover:bg-ocean-500/40'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// CTA SECTION
// ============================================
function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&h=1080&fit=crop&q=80"
          alt="Book your stay"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-500/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400/20 rounded-full text-gold-400 text-sm font-accent mb-6">
            <Sparkles size={16} />
            Special Offers Available
          </span>
          
          <h2 className="font-heading text-4xl md:text-6xl text-white mb-6">
            Begin Your Extraordinary Journey
          </h2>
          
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Book your stay today and experience the magic of WhiteBay Resort. 
            Create memories that will last a lifetime.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="px-10 py-5 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-500 font-accent font-semibold rounded-full shadow-lg shadow-gold-400/30 hover:shadow-xl hover:shadow-gold-400/50 transform hover:-translate-y-1 transition-all duration-300"
            >
              Book Your Stay
            </Link>
            <Link
              href="/contact"
              className="px-10 py-5 bg-transparent border-2 border-white text-white font-accent font-medium rounded-full hover:bg-white hover:text-navy-500 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

