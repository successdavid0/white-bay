'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Users, Briefcase, PartyPopper, Check, ArrowRight, Star } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { EVENT_VENUES, WEDDING_PACKAGES } from '@/lib/constants';
import { formatCurrency, cn } from '@/lib/utils';

const venueTypeIcons: { [key: string]: React.ReactNode } = {
  wedding: <Heart size={20} />,
  conference: <Briefcase size={20} />,
  celebration: <PartyPopper size={20} />,
  both: <Users size={20} />,
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-sand-100">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop&q=80"
            alt="WhiteBay Events"
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
            <span className="inline-block px-4 py-2 bg-pink-400/20 backdrop-blur-sm rounded-full text-pink-300 text-sm font-accent mb-6">
              <Heart className="inline mr-2" size={14} />
              Weddings & Events
            </span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl mb-6">
              Celebrate in Paradise
            </h1>
            <p className="text-xl text-white/80 font-light max-w-2xl mx-auto">
              From intimate beach ceremonies to grand ballroom galas, create 
              unforgettable moments at the most breathtaking destination.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 px-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#weddings" className="px-6 py-2 bg-pink-50 text-pink-600 font-accent text-sm rounded-full hover:bg-pink-100 transition-colors">
              💒 Weddings
            </a>
            <a href="#conferences" className="px-6 py-2 bg-ocean-50 text-ocean-600 font-accent text-sm rounded-full hover:bg-ocean-100 transition-colors">
              💼 Conferences
            </a>
            <a href="#celebrations" className="px-6 py-2 bg-purple-50 text-purple-600 font-accent text-sm rounded-full hover:bg-purple-100 transition-colors">
              🎉 Celebrations
            </a>
          </div>
        </div>
      </section>

      {/* Venues Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-ocean-500 font-accent text-sm tracking-widest uppercase">
                Our Venues
              </span>
              <h2 className="font-heading text-4xl md:text-5xl text-navy-500 mt-4 mb-6">
                Stunning Event Spaces
              </h2>
              <p className="text-navy-500/70 text-lg max-w-2xl mx-auto">
                Choose from our collection of breathtaking venues, each offering 
                a unique setting for your special occasion.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-12">
            {EVENT_VENUES.map((venue, index) => (
              <motion.div
                key={venue.id}
                id={venue.type === 'wedding' ? 'weddings' : venue.type === 'conference' ? 'conferences' : 'celebrations'}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={cn(
                  'grid lg:grid-cols-2',
                  index % 2 === 1 && 'lg:flex-row-reverse'
                )}>
                  <div className={cn(
                    'relative h-72 lg:h-auto min-h-[300px]',
                    index % 2 === 1 && 'lg:order-2'
                  )}>
                    <Image
                      src={venue.image}
                      alt={venue.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-6 left-6">
                      <span className={cn(
                        'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-accent backdrop-blur-sm',
                        venue.type === 'wedding' && 'bg-pink-100/90 text-pink-700',
                        venue.type === 'conference' && 'bg-ocean-100/90 text-ocean-700',
                        venue.type === 'celebration' && 'bg-purple-100/90 text-purple-700',
                        venue.type === 'both' && 'bg-gold-100/90 text-gold-700',
                      )}>
                        {venueTypeIcons[venue.type]}
                        {venue.type === 'both' ? 'Multi-Purpose' : venue.type.charAt(0).toUpperCase() + venue.type.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className={cn('p-8 lg:p-12', index % 2 === 1 && 'lg:order-1')}>
                    <h3 className="font-heading text-3xl text-navy-500 mb-3">
                      {venue.name}
                    </h3>
                    <p className="text-navy-500/70 mb-6">
                      {venue.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-navy-500/60 text-sm mb-6">
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        Up to {venue.capacity} guests
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {venue.features.map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-sand-100 text-navy-500/70 text-sm rounded-full"
                        >
                          <Check size={12} className="text-teal-500" />
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-ocean-500 to-ocean-600 text-white font-accent font-semibold rounded-full hover:shadow-lg hover:shadow-ocean-500/30 transition-all"
                    >
                      Request Information
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Packages */}
      <section className="py-20 px-6 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Heart className="mx-auto mb-4 text-pink-500" size={40} />
              <h2 className="font-heading text-4xl md:text-5xl text-navy-500 mb-4">
                Wedding Packages
              </h2>
              <p className="text-navy-500/70 text-lg max-w-2xl mx-auto">
                Let our experienced wedding planners create the celebration of your dreams.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {WEDDING_PACKAGES.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all',
                  index === 1 && 'ring-2 ring-pink-400 relative'
                )}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-pink-500 text-white text-sm font-accent rounded-full">
                    Most Popular
                  </div>
                )}
                
                <h3 className="font-heading text-2xl text-navy-500 mb-2">
                  {pkg.name}
                </h3>
                <p className="text-navy-500/60 text-sm mb-4">{pkg.guests}</p>
                
                <div className="mb-6">
                  <span className="text-navy-500/50 text-sm">Starting from</span>
                  <div className="font-heading text-4xl text-pink-500">
                    {formatCurrency(pkg.price)}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-navy-500/70 text-sm">
                      <Check size={16} className="text-teal-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={cn(
                    'block text-center px-6 py-3 font-accent font-semibold rounded-full transition-all',
                    index === 1
                      ? 'bg-pink-500 text-white hover:bg-pink-600'
                      : 'border-2 border-pink-500 text-pink-500 hover:bg-pink-50'
                  )}
                >
                  Get Quote
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Events */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-3xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&h=600&fit=crop&q=80"
                alt="Corporate Events"
                fill
                className="object-cover"
              />
            </motion.div>

            <AnimatedSection>
              <Briefcase className="text-ocean-500 mb-4" size={40} />
              <h2 className="font-heading text-4xl text-navy-500 mb-6">
                Corporate Events & Conferences
              </h2>
              <p className="text-navy-500/70 text-lg mb-6">
                Combine business with pleasure in our state-of-the-art conference center. 
                We offer complete event planning, team-building activities, and executive 
                retreat packages.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'High-speed WiFi & video conferencing',
                  'Breakout rooms & boardroom facilities',
                  'Custom catering & coffee breaks',
                  'Team-building activities & excursions',
                  'Executive accommodation packages',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-navy-500/70">
                    <Check size={18} className="text-teal-500" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-ocean-500 text-white font-accent font-semibold rounded-full hover:bg-ocean-600 transition-colors"
              >
                Request Corporate Proposal
                <ArrowRight size={18} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-navy-500 to-navy-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <AnimatedSection>
            <Star className="mx-auto mb-6 text-gold-400" size={40} />
            <h2 className="font-heading text-4xl mb-6">Let&apos;s Plan Your Event</h2>
            <p className="text-white/70 text-lg mb-8">
              Our dedicated events team is ready to bring your vision to life. 
              Contact us for a personalized consultation and quote.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold-400 text-navy-500 font-accent font-semibold rounded-full hover:bg-gold-300 transition-colors"
            >
              Start Planning
              <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

