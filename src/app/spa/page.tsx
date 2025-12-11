'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Sparkles, Heart, Waves, Dumbbell, Coffee, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { SPA_SERVICES, SPA_FACILITIES } from '@/lib/constants';
import { formatCurrency, cn } from '@/lib/utils';

const categoryIcons: { [key: string]: string } = {
  massage: '💆',
  facial: '✨',
  body: '🌿',
  couples: '💕',
  package: '🎁',
};

export default function SpaPage() {
  const categories = Array.from(new Set(SPA_SERVICES.map(s => s.category)));

  return (
    <div className="min-h-screen bg-sand-100">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&h=1080&fit=crop&q=80"
            alt="WhiteBay Spa"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-500/50 via-navy-500/30 to-navy-500/70" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-teal-400/20 backdrop-blur-sm rounded-full text-teal-300 text-sm font-accent mb-6">
              Serenity Spa
            </span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl mb-6">
              Wellness & Rejuvenation
            </h1>
            <p className="text-xl text-white/80 font-light max-w-2xl mx-auto">
              Escape to our sanctuary of tranquility where ancient healing traditions 
              meet modern wellness therapies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <Sparkles className="mx-auto mb-6 text-ocean-500" size={40} />
            <h2 className="font-heading text-4xl md:text-5xl text-navy-500 mb-6">
              A Journey to Inner Peace
            </h2>
            <p className="text-navy-500/70 text-lg leading-relaxed">
              Our 10,000 sq ft spa sanctuary features 12 treatment rooms with ocean views, 
              a thermal suite, vitality pool, and meditation garden. Let our expert therapists 
              guide you through a transformative wellness experience.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Spa Facilities */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="font-heading text-3xl text-navy-500 text-center mb-12">
              Spa Facilities
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {SPA_FACILITIES.map((facility, index) => (
              <motion.div
                key={facility.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-sand-50 rounded-2xl hover:bg-ocean-50 transition-colors group"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-ocean-100 rounded-xl flex items-center justify-center group-hover:bg-ocean-200 transition-colors">
                  {facility.icon === 'door' && <span className="text-2xl">🚪</span>}
                  {facility.icon === 'thermometer' && <span className="text-2xl">🌡️</span>}
                  {facility.icon === 'coffee' && <Coffee size={24} className="text-ocean-500" />}
                  {facility.icon === 'waves' && <Waves size={24} className="text-ocean-500" />}
                  {facility.icon === 'dumbbell' && <Dumbbell size={24} className="text-ocean-500" />}
                  {facility.icon === 'heart' && <Heart size={24} className="text-ocean-500" />}
                </div>
                <h3 className="font-accent font-semibold text-navy-500 text-sm mb-1">
                  {facility.name}
                </h3>
                <p className="text-navy-500/60 text-xs">
                  {facility.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section id="treatments" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-ocean-500 font-accent text-sm tracking-widest uppercase">
                Our Treatments
              </span>
              <h2 className="font-heading text-4xl md:text-5xl text-navy-500 mt-4">
                Signature Spa Experiences
              </h2>
            </div>
          </AnimatedSection>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button className="px-6 py-2 bg-ocean-500 text-white font-accent text-sm rounded-full">
              All Treatments
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                className="px-6 py-2 bg-white text-navy-500 font-accent text-sm rounded-full hover:bg-ocean-50 transition-colors"
              >
                {categoryIcons[cat]} {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SPA_SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-accent text-ocean-600">
                      {categoryIcons[service.category]} {service.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-heading text-xl text-navy-500 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-navy-500/60 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-navy-500/70">
                      <Clock size={16} />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                    <span className="font-heading text-2xl text-ocean-500">
                      {formatCurrency(service.price)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Yoga & Fitness */}
      <section id="fitness" className="py-20 px-6 bg-gradient-to-br from-teal-500 to-ocean-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="text-teal-200 font-accent text-sm tracking-widest uppercase">
                Mind & Body
              </span>
              <h2 className="font-heading text-4xl md:text-5xl text-white mt-4 mb-6">
                Fitness & Yoga
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Our state-of-the-art fitness center is open 24/7, featuring ocean views, 
                premium equipment, and personal training services. Join our daily yoga 
                and meditation classes in our beachfront studio.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { time: '6:30 AM', class: 'Sunrise Beach Yoga' },
                  { time: '8:00 AM', class: 'Power Flow' },
                  { time: '5:00 PM', class: 'Sunset Meditation' },
                  { time: '7:00 PM', class: 'Restorative Yoga' },
                ].map((item) => (
                  <div key={item.class} className="flex items-center gap-4 text-white">
                    <span className="w-20 text-teal-200 font-accent text-sm">{item.time}</span>
                    <span>{item.class}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ocean-600 font-accent font-semibold rounded-full hover:bg-gold-400 hover:text-navy-500 transition-colors"
              >
                Book a Class
                <ArrowRight size={18} />
              </Link>
            </AnimatedSection>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-3xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop&q=80"
                alt="Yoga at WhiteBay"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-heading text-4xl text-navy-500 mb-6">
              Begin Your Wellness Journey
            </h2>
            <p className="text-navy-500/70 text-lg mb-8">
              Book your spa experience today and let our expert therapists guide you 
              to a state of complete relaxation and renewal.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-accent font-semibold rounded-full hover:shadow-lg hover:shadow-ocean-500/30 transition-all"
              >
                Book Spa Treatment
              </Link>
              <Link
                href="/offers"
                className="px-8 py-4 border-2 border-ocean-500 text-ocean-500 font-accent font-medium rounded-full hover:bg-ocean-50 transition-colors"
              >
                View Spa Packages
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

