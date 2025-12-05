'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, Sparkles } from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { GALLERY_IMAGES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'resort', name: 'Resort' },
  { id: 'rooms', name: 'Rooms' },
  { id: 'beach', name: 'Beach' },
  { id: 'pool', name: 'Pool' },
  { id: 'spa', name: 'Spa' },
  { id: 'dining', name: 'Dining' },
  { id: 'activities', name: 'Activities' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  const filteredImages = activeCategory === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = () => {
    if (lightboxImage === null) return;
    setLightboxImage(lightboxImage === 0 ? filteredImages.length - 1 : lightboxImage - 1);
  };

  const goToNext = () => {
    if (lightboxImage === null) return;
    setLightboxImage(lightboxImage === filteredImages.length - 1 ? 0 : lightboxImage + 1);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop&q=80"
            alt="Gallery"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-500/60 via-navy-500/40 to-sand-100" />
        </div>

        {/* Floating Camera Icon */}
        <motion.div
          className="absolute top-32 right-20 text-white/10"
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Camera size={100} />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gold-400 font-accent text-sm tracking-widest uppercase mb-4 block"
          >
            Visual Journey
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl text-white text-shadow-lg mb-4"
          >
            Photo Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Explore the beauty of WhiteBay Resort through our stunning collection 
            of photographs capturing every magical moment.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white sticky top-20 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'px-6 py-2 rounded-full font-accent text-sm transition-all duration-300',
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-ocean-500 to-teal-400 text-white shadow-lg shadow-ocean-500/30'
                    : 'bg-sand-100 text-navy-500/70 hover:bg-sand-200'
                )}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-sand-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={cn(
                    'group relative cursor-pointer rounded-2xl overflow-hidden',
                    // Create masonry effect with varying heights
                    index % 5 === 0 ? 'row-span-2' : '',
                    index % 7 === 0 ? 'col-span-2 sm:col-span-1 lg:col-span-2' : ''
                  )}
                  onClick={() => openLightbox(index)}
                >
                  <div className={cn(
                    'relative w-full',
                    index % 5 === 0 ? 'h-[500px]' : 'h-[250px]',
                    index % 7 === 0 ? 'h-[300px]' : ''
                  )}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-navy-500/0 group-hover:bg-navy-500/40 transition-all duration-300" />
                    
                    {/* Zoom Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center"
                      >
                        <Sparkles className="text-ocean-500" size={24} />
                      </motion.div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-navy-500 text-xs font-accent capitalize">
                      {image.category}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy-500/95 backdrop-blur-lg flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={28} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[80vh] mx-6"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[lightboxImage].src}
                alt={filteredImages[lightboxImage].alt}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] rounded-lg"
              />
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy-500/80 to-transparent rounded-b-lg">
                <p className="text-white text-center font-accent">
                  {filteredImages[lightboxImage].alt}
                </p>
              </div>
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white font-accent text-sm">
              {lightboxImage + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instagram CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-500 mb-4">
              Follow Us on Instagram
            </h2>
            <p className="text-navy-500/70 mb-8">
              Tag your photos with #WhiteBayResort for a chance to be featured
            </p>
            <a
              href="https://instagram.com/whitebayresort"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-accent font-semibold rounded-full hover:shadow-lg transition-all"
            >
              @whitebayresort
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

