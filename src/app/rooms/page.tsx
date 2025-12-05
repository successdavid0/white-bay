'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Maximize, 
  Check, 
  Filter, 
  ChevronDown, 
  Star,
  Bed,
  ArrowRight
} from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { ROOMS } from '@/lib/constants';
import { formatCurrency, cn } from '@/lib/utils';

type SortOption = 'price-low' | 'price-high' | 'capacity' | 'size';
type FilterCapacity = 'all' | '2' | '4' | '6+';

export default function RoomsPage() {
  const [sortBy, setSortBy] = useState<SortOption>('price-low');
  const [filterCapacity, setFilterCapacity] = useState<FilterCapacity>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedRooms = useMemo(() => {
    let result = [...ROOMS];

    // Filter by capacity
    if (filterCapacity !== 'all') {
      if (filterCapacity === '6+') {
        result = result.filter((room) => room.capacity >= 6);
      } else {
        result = result.filter((room) => room.capacity <= parseInt(filterCapacity));
      }
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'capacity':
        result.sort((a, b) => b.capacity - a.capacity);
        break;
    }

    return result;
  }, [sortBy, filterCapacity]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1920&h=1080&fit=crop&q=80"
            alt="Luxury Rooms"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-500/60 via-navy-500/40 to-sand-100" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gold-400 font-accent text-sm tracking-widest uppercase mb-4 block"
          >
            Accommodations
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl text-white text-shadow-lg mb-4"
          >
            Rooms & Suites
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Discover our collection of beautifully appointed rooms and suites, each designed 
            for your ultimate comfort and relaxation.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white sticky top-20 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Results Count */}
            <p className="text-navy-500/70">
              Showing <span className="font-semibold text-navy-500">{filteredAndSortedRooms.length}</span> rooms
            </p>

            {/* Filters */}
            <div className="flex items-center gap-4">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 border border-navy-500/20 rounded-lg"
              >
                <Filter size={18} />
                Filters
              </button>

              {/* Desktop Filters */}
              <div className={cn(
                'flex flex-col md:flex-row items-center gap-4',
                showFilters ? 'flex' : 'hidden md:flex'
              )}>
                {/* Capacity Filter */}
                <div className="relative">
                  <select
                    value={filterCapacity}
                    onChange={(e) => setFilterCapacity(e.target.value as FilterCapacity)}
                    className="appearance-none px-4 py-2 pr-10 border border-navy-500/20 rounded-lg bg-white text-navy-500 cursor-pointer focus:outline-none focus:border-ocean-500"
                  >
                    <option value="all">All Capacities</option>
                    <option value="2">Up to 2 Guests</option>
                    <option value="4">Up to 4 Guests</option>
                    <option value="6+">6+ Guests</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-500/50 pointer-events-none" size={16} />
                </div>

                {/* Sort By */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="appearance-none px-4 py-2 pr-10 border border-navy-500/20 rounded-lg bg-white text-navy-500 cursor-pointer focus:outline-none focus:border-ocean-500"
                  >
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="capacity">Capacity</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-500/50 pointer-events-none" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16 bg-sand-100">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredAndSortedRooms.map((room) => (
                <StaggerItem key={room.id}>
                  <RoomCard room={room} />
                </StaggerItem>
              ))}
            </AnimatePresence>
          </StaggerContainer>

          {filteredAndSortedRooms.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-navy-500/60 text-lg">
                No rooms match your filters. Try adjusting your criteria.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="py-16 bg-gradient-to-r from-ocean-500 to-teal-400">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
              Special Early Bird Discount
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Book at least 30 days in advance and save up to 20% on your stay. 
              Plus, enjoy complimentary breakfast for two!
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ocean-500 font-accent font-semibold rounded-full hover:shadow-lg transition-all"
            >
              Book Now & Save
              <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

// Room Card Component
interface RoomCardProps {
  room: typeof ROOMS[0];
}

function RoomCard({ room }: RoomCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-navy-500/5 hover:shadow-2xl hover:shadow-navy-500/10 transition-all duration-500"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative w-full md:w-2/5 h-64 md:h-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={room.images[currentImageIndex]}
                alt={room.name}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Image Navigation */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            {room.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  index === currentImageIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/80'
                )}
              />
            ))}
          </div>

          {/* Featured Badge */}
          {room.featured && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-gold-400 text-navy-500 text-xs font-accent font-semibold rounded-full flex items-center gap-1">
              <Star size={12} className="fill-current" />
              Featured
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-heading text-2xl text-navy-500">{room.name}</h3>
              <div className="text-right">
                <p className="font-heading text-2xl text-ocean-500">
                  {formatCurrency(room.price)}
                </p>
                <p className="text-navy-500/50 text-sm">per night</p>
              </div>
            </div>

            <p className="text-navy-500/70 text-sm mb-4 line-clamp-2">
              {room.description}
            </p>

            {/* Room Details */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-navy-500/70">
              <span className="flex items-center gap-1">
                <Users size={16} />
                {room.capacity} Guests
              </span>
              <span className="flex items-center gap-1">
                <Maximize size={16} />
                {room.size}
              </span>
              <span className="flex items-center gap-1">
                <Bed size={16} />
                {room.bedType}
              </span>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2">
              {room.amenities.slice(0, 5).map((amenity) => (
                <span
                  key={amenity}
                  className="flex items-center gap-1 px-2 py-1 bg-sand-100 text-navy-500/70 text-xs rounded-md"
                >
                  <Check size={12} className="text-teal-400" />
                  {amenity}
                </span>
              ))}
              {room.amenities.length > 5 && (
                <span className="px-2 py-1 bg-sand-100 text-navy-500/50 text-xs rounded-md">
                  +{room.amenities.length - 5} more
                </span>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 mt-6">
            <Link
              href={`/rooms/${room.id}`}
              className="flex-1 py-3 text-center border-2 border-ocean-500 text-ocean-500 font-accent font-medium rounded-xl hover:bg-ocean-500 hover:text-white transition-all"
            >
              View Details
            </Link>
            <Link
              href={`/booking?room=${room.id}`}
              className="flex-1 py-3 text-center bg-gradient-to-r from-ocean-500 to-ocean-600 text-white font-accent font-medium rounded-xl hover:shadow-lg hover:shadow-ocean-500/30 transition-all"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

