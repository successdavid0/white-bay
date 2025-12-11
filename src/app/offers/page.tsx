'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tag, Calendar, Clock, Copy, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { OFFERS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const featuredOffers = OFFERS.filter(o => o.featured);
  const otherOffers = OFFERS.filter(o => !o.featured);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-sand-100">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop&q=80"
            alt="WhiteBay Offers"
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
              <Tag className="inline mr-2" size={14} />
              Special Offers
            </span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl mb-6">
              Exclusive Deals
            </h1>
            <p className="text-xl text-white/80 font-light max-w-2xl mx-auto">
              Discover our curated packages and special rates designed to make 
              your WhiteBay experience even more memorable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-12">
              <Sparkles className="text-gold-500" size={32} />
              <div>
                <h2 className="font-heading text-3xl text-navy-500">Featured Offers</h2>
                <p className="text-navy-500/60">Our most popular packages and deals</p>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={offer.image}
                    alt={offer.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-500/60 via-transparent to-transparent" />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-gold-400 text-navy-500 px-4 py-2 rounded-full font-heading text-lg font-bold">
                    {offer.discount}
                  </div>

                  {/* Title on Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-heading text-2xl text-white mb-1">
                      {offer.name}
                    </h3>
                    <p className="text-white/80 text-sm">{offer.tagline}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-navy-500/70 text-sm mb-4">
                    {offer.description}
                  </p>

                  {/* Promo Code */}
                  <div className="bg-sand-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-navy-500/50 text-xs">Use code</span>
                        <p className="font-mono text-lg text-ocean-500 font-bold">
                          {offer.code}
                        </p>
                      </div>
                      <button
                        onClick={() => copyCode(offer.code)}
                        className={cn(
                          'p-2 rounded-lg transition-colors',
                          copiedCode === offer.code
                            ? 'bg-teal-100 text-teal-600'
                            : 'bg-white text-navy-500 hover:bg-ocean-50'
                        )}
                      >
                        {copiedCode === offer.code ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Valid Until */}
                  <div className="flex items-center gap-2 text-navy-500/50 text-sm mb-4">
                    <Calendar size={14} />
                    Valid until {new Date(offer.validUntil).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>

                  {/* Terms */}
                  <div className="text-xs text-navy-500/40 mb-4">
                    {offer.terms.join(' • ')}
                  </div>

                  <Link
                    href="/booking"
                    className="block text-center px-6 py-3 bg-gradient-to-r from-ocean-500 to-ocean-600 text-white font-accent font-semibold rounded-full hover:shadow-lg hover:shadow-ocean-500/30 transition-all"
                  >
                    Book This Offer
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Offers */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="font-heading text-3xl text-navy-500 mb-12 text-center">
              More Ways to Save
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-sand-50 rounded-2xl p-6 hover:bg-sand-100 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-heading text-xl text-navy-500 mb-1">
                      {offer.name}
                    </h3>
                    <p className="text-gold-500 text-sm font-accent">{offer.tagline}</p>
                  </div>
                  <span className="bg-ocean-100 text-ocean-600 px-3 py-1 rounded-full font-accent text-sm font-semibold">
                    {offer.discount}
                  </span>
                </div>

                <p className="text-navy-500/60 text-sm mb-4 line-clamp-2">
                  {offer.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-navy-500/40 text-xs">Code:</span>
                    <span className="font-mono text-sm text-ocean-500">{offer.code}</span>
                    <button
                      onClick={() => copyCode(offer.code)}
                      className="p-1 text-navy-500/40 hover:text-ocean-500 transition-colors"
                    >
                      {copiedCode === offer.code ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <Link
                    href="/booking"
                    className="text-ocean-500 text-sm font-accent hover:text-ocean-600 flex items-center gap-1"
                  >
                    Book <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-ocean-500 to-teal-500">
        <div className="max-w-2xl mx-auto text-center text-white">
          <AnimatedSection>
            <h2 className="font-heading text-4xl mb-4">Get Exclusive Offers</h2>
            <p className="text-white/80 mb-8">
              Subscribe to our newsletter for early access to special deals, 
              flash sales, and member-only packages.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-navy-500 placeholder:text-navy-500/50 focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gold-400 text-navy-500 font-accent font-semibold rounded-full hover:bg-gold-300 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-white/50 text-xs mt-4">
              No spam, unsubscribe anytime. By subscribing, you agree to our Privacy Policy.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Terms Note */}
      <section className="py-12 px-6 bg-sand-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-navy-500/50 text-sm">
            All offers are subject to availability and may be withdrawn at any time. 
            Offers cannot be combined unless otherwise stated. Blackout dates may apply. 
            Please contact our reservations team for full terms and conditions.
          </p>
        </div>
      </section>
    </div>
  );
}

