'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Users, 
  Maximize, 
  Bed,
  Star,
  Calendar,
  ArrowRight,
  X
} from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { ROOMS, TESTIMONIALS } from '@/lib/constants';
import { formatCurrency, cn } from '@/lib/utils';

export default function RoomDetailPage() {
  const params = useParams();
  const room = ROOMS.find((r) => r.id === params.id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-navy-500/60">Room not found</p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  // Get similar rooms
  const similarRooms = ROOMS.filter((r) => r.id !== room.id).slice(0, 3);

  return (
    <>
      {/* Hero Gallery */}
      <section className="relative pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-navy-500/60 mb-6"
          >
            <Link href="/" className="hover:text-ocean-500">Home</Link>
            <span>/</span>
            <Link href="/rooms" className="hover:text-ocean-500">Rooms</Link>
            <span>/</span>
            <span className="text-navy-500">{room.name}</span>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[500px]">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-2 lg:row-span-2 relative rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                src={room.images[0]}
                alt={room.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-navy-500/0 group-hover:bg-navy-500/20 transition-colors" />
              {room.featured && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-gold-400 text-navy-500 text-sm font-accent font-semibold rounded-full flex items-center gap-1">
                  <Star size={14} className="fill-current" />
                  Featured
                </div>
              )}
            </motion.div>

            {/* Side Images */}
            {room.images.slice(1, 3).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="relative rounded-2xl overflow-hidden cursor-pointer group hidden lg:block"
                onClick={() => {
                  setCurrentImageIndex(index + 1);
                  setLightboxOpen(true);
                }}
              >
                <Image
                  src={image}
                  alt={`${room.name} ${index + 2}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-navy-500/0 group-hover:bg-navy-500/20 transition-colors" />
              </motion.div>
            ))}

            {/* View All Photos Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-navy-500 text-sm font-accent hover:bg-white transition-colors shadow-lg"
            >
              View All Photos
            </motion.button>
          </div>
        </div>
      </section>

      {/* Room Details */}
      <section className="py-12 bg-sand-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatedSection>
                <h1 className="font-heading text-4xl md:text-5xl text-navy-500 mb-4">
                  {room.name}
                </h1>
                
                {/* Quick Info */}
                <div className="flex flex-wrap gap-6 text-navy-500/70 mb-6">
                  <span className="flex items-center gap-2">
                    <Users size={18} className="text-ocean-500" />
                    Up to {room.capacity} guests
                  </span>
                  <span className="flex items-center gap-2">
                    <Maximize size={18} className="text-ocean-500" />
                    {room.size}
                  </span>
                  <span className="flex items-center gap-2">
                    <Bed size={18} className="text-ocean-500" />
                    {room.bedType}
                  </span>
                </div>

                <p className="text-navy-500/70 text-lg leading-relaxed">
                  {room.description}
                </p>
              </AnimatedSection>

              {/* Amenities */}
              <AnimatedSection delay={0.1}>
                <h2 className="font-heading text-2xl text-navy-500 mb-6">
                  Room Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {room.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 p-4 bg-white rounded-xl"
                    >
                      <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                        <Check size={16} className="text-teal-500" />
                      </div>
                      <span className="text-navy-500">{amenity}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Room Policies */}
              <AnimatedSection delay={0.2}>
                <h2 className="font-heading text-2xl text-navy-500 mb-6">
                  Room Policies
                </h2>
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between py-3 border-b border-sand-200">
                    <span className="text-navy-500/70">Check-in</span>
                    <span className="text-navy-500 font-medium">3:00 PM</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-sand-200">
                    <span className="text-navy-500/70">Check-out</span>
                    <span className="text-navy-500 font-medium">11:00 AM</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-sand-200">
                    <span className="text-navy-500/70">Cancellation</span>
                    <span className="text-navy-500 font-medium">Free up to 48 hours</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-navy-500/70">Extra Bed</span>
                    <span className="text-navy-500 font-medium">Available on request</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 shadow-xl sticky top-28"
              >
                {/* Price */}
                <div className="text-center pb-6 border-b border-sand-200">
                  <p className="text-navy-500/60 text-sm mb-1">Starting from</p>
                  <p className="font-heading text-4xl text-ocean-500">
                    {formatCurrency(room.price)}
                  </p>
                  <p className="text-navy-500/50 text-sm">per night</p>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-2 py-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="text-gold-400 fill-gold-400" />
                    ))}
                  </div>
                  <span className="text-navy-500 font-medium">4.9</span>
                  <span className="text-navy-500/50 text-sm">(128 reviews)</span>
                </div>

                {/* Quick Dates */}
                <div className="space-y-4 py-6 border-b border-sand-200">
                  <div>
                    <label className="block text-navy-500/70 text-sm mb-2">Check-in</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-500" size={18} />
                      <input
                        type="date"
                        className="w-full pl-11 pr-4 py-3 border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-navy-500/70 text-sm mb-2">Check-out</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-500" size={18} />
                      <input
                        type="date"
                        className="w-full pl-11 pr-4 py-3 border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-navy-500/70 text-sm mb-2">Guests</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-500" size={18} />
                      <select className="w-full pl-11 pr-4 py-3 border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500 appearance-none">
                        {[...Array(room.capacity)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-6 space-y-3">
                  <Link
                    href={`/booking?room=${room.id}`}
                    className="block w-full py-4 text-center bg-gradient-to-r from-gold-400 to-gold-500 text-navy-500 font-accent font-semibold rounded-xl hover:shadow-lg hover:shadow-gold-400/30 transition-all"
                  >
                    Book Now
                  </Link>
                  <Link
                    href="/contact"
                    className="block w-full py-4 text-center border-2 border-ocean-500 text-ocean-500 font-accent font-medium rounded-xl hover:bg-ocean-500 hover:text-white transition-all"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Rooms */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="flex items-center justify-between mb-10">
            <h2 className="font-heading text-3xl text-navy-500">Similar Rooms</h2>
            <Link
              href="/rooms"
              className="text-ocean-500 font-accent flex items-center gap-2 hover:underline"
            >
              View All Rooms
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarRooms.map((similarRoom, index) => (
              <AnimatedSection key={similarRoom.id} delay={index * 0.1}>
                <Link href={`/rooms/${similarRoom.id}`}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="group bg-sand-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500"
                  >
                    <div className="relative h-48">
                      <Image
                        src={similarRoom.images[0]}
                        alt={similarRoom.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-xl text-navy-500 mb-2">
                        {similarRoom.name}
                      </h3>
                      <p className="text-navy-500/60 text-sm mb-3">
                        {similarRoom.size} • {similarRoom.capacity} guests
                      </p>
                      <p className="font-heading text-xl text-ocean-500">
                        {formatCurrency(similarRoom.price)}
                        <span className="text-sm text-navy-500/50 font-normal"> /night</span>
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy-500/95 backdrop-blur-lg flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20"
            >
              <ChevronRight size={28} />
            </button>

            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl max-h-[80vh] mx-6"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={room.images[currentImageIndex]}
                alt={`${room.name} ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] rounded-lg"
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {room.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'
                  )}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

