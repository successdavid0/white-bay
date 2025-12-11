'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, MapPin, Star, Utensils, Wine, ChefHat, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { DINING } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function DiningPage() {
  return (
    <div className="min-h-screen bg-sand-100">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop&q=80"
            alt="WhiteBay Dining"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-500/60 via-navy-500/40 to-navy-500/80" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-gold-400/20 backdrop-blur-sm rounded-full text-gold-400 text-sm font-accent mb-6">
              Culinary Excellence
            </span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl mb-6">
              Dining at WhiteBay
            </h1>
            <p className="text-xl text-white/80 font-light max-w-2xl mx-auto">
              From sunrise breakfasts to moonlit dinners, embark on a culinary journey 
              that celebrates the freshest ingredients and finest flavors.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-ocean-500 font-accent text-sm tracking-widest uppercase">
              A Feast for the Senses
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-navy-500 mt-4 mb-6">
              Four Unique Dining Experiences
            </h2>
            <p className="text-navy-500/70 text-lg leading-relaxed">
              Each of our restaurants offers a distinct atmosphere and menu, from elegant 
              fine dining to casual beachfront fare. Our award-winning chefs use locally 
              sourced ingredients to create memorable dishes that celebrate the region&apos;s 
              rich culinary heritage.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          {DINING.map((restaurant, index) => (
            <AnimatedSection key={restaurant.id}>
              <div 
                id={restaurant.id}
                className={cn(
                  'grid lg:grid-cols-2 gap-12 items-center',
                  index % 2 === 1 && 'lg:flex-row-reverse'
                )}
              >
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={cn(
                    'relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden group',
                    index % 2 === 1 && 'lg:order-2'
                  )}
                >
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-500/60 via-transparent to-transparent" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-ocean-500 font-accent font-semibold">
                      {restaurant.priceRange}
                    </span>
                  </div>

                  {/* Gallery Thumbnails */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex gap-3">
                      {restaurant.gallery.slice(0, 3).map((img, i) => (
                        <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-white/50">
                          <Image src={img} alt="" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className={cn(index % 2 === 1 && 'lg:order-1')}>
                  <span className="inline-flex items-center gap-2 text-ocean-500 font-accent text-sm mb-4">
                    <Utensils size={16} />
                    {restaurant.cuisine}
                  </span>
                  
                  <h3 className="font-heading text-4xl text-navy-500 mb-2">
                    {restaurant.name}
                  </h3>
                  <p className="text-gold-500 font-accent text-lg mb-6">
                    {restaurant.tagline}
                  </p>
                  
                  <p className="text-navy-500/70 leading-relaxed mb-8">
                    {restaurant.description}
                  </p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 text-navy-500/70">
                      <Clock size={18} className="text-ocean-500" />
                      <span className="text-sm">{restaurant.hours}</span>
                    </div>
                    <div className="flex items-center gap-3 text-navy-500/70">
                      <Star size={18} className="text-ocean-500" />
                      <span className="text-sm">{restaurant.dressCode}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {restaurant.highlights.map((highlight) => (
                      <span 
                        key={highlight}
                        className="px-4 py-2 bg-ocean-50 text-ocean-600 text-sm rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {restaurant.reservations && (
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-ocean-500 to-ocean-600 text-white font-accent font-semibold rounded-full hover:shadow-lg hover:shadow-ocean-500/30 transition-all"
                    >
                      Make a Reservation
                      <ArrowRight size={18} />
                    </Link>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Private Dining CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-navy-500 to-navy-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <AnimatedSection>
            <ChefHat size={48} className="mx-auto mb-6 text-gold-400" />
            <h2 className="font-heading text-4xl mb-6">Private Dining &amp; Chef&apos;s Table</h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              For a truly exclusive experience, book our Chef&apos;s Table for a personalized 
              multi-course journey, or arrange a private dinner on the beach under the stars.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gold-400 text-navy-500 font-accent font-semibold rounded-full hover:bg-gold-300 transition-colors"
              >
                Inquire About Private Dining
              </Link>
              <Link
                href="/offers"
                className="px-8 py-4 border-2 border-white/30 text-white font-accent font-medium rounded-full hover:bg-white/10 transition-colors"
              >
                View Dining Packages
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

