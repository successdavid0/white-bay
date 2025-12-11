'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Users, Anchor, Gamepad2, Map, ArrowRight, Star } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { ACTIVITIES, GAME_LOUNGE } from '@/lib/constants';
import { formatCurrency, cn } from '@/lib/utils';

const categoryLabels: { [key: string]: { label: string; icon: string } } = {
  'water-sports': { label: 'Water Sports', icon: '🌊' },
  'excursions': { label: 'Excursions', icon: '🗺️' },
};

export default function ActivitiesPage() {
  const waterSports = ACTIVITIES.filter(a => a.category === 'water-sports');
  const excursions = ACTIVITIES.filter(a => a.category === 'excursions');

  return (
    <div className="min-h-screen bg-sand-100">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop&q=80"
            alt="WhiteBay Activities"
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
            <span className="inline-block px-4 py-2 bg-ocean-400/20 backdrop-blur-sm rounded-full text-ocean-300 text-sm font-accent mb-6">
              Adventure Awaits
            </span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl mb-6">
              Activities & Adventures
            </h1>
            <p className="text-xl text-white/80 font-light max-w-2xl mx-auto">
              From thrilling water sports to relaxing sunset cruises, discover 
              endless ways to make your stay unforgettable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 px-6 bg-white shadow-sm sticky top-16 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#water-sports" className="px-6 py-2 bg-ocean-50 text-ocean-600 font-accent text-sm rounded-full hover:bg-ocean-100 transition-colors">
              🌊 Water Sports
            </a>
            <a href="#excursions" className="px-6 py-2 bg-ocean-50 text-ocean-600 font-accent text-sm rounded-full hover:bg-ocean-100 transition-colors">
              🗺️ Excursions
            </a>
            <a href="#game-lounge" className="px-6 py-2 bg-ocean-50 text-ocean-600 font-accent text-sm rounded-full hover:bg-ocean-100 transition-colors">
              🎮 Game Lounge
            </a>
          </div>
        </div>
      </section>

      {/* Water Sports Section */}
      <section id="water-sports" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <Anchor className="text-ocean-500" size={32} />
              <span className="text-ocean-500 font-accent text-sm tracking-widest uppercase">
                Water Sports
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-navy-500 mb-4">
              Dive Into Adventure
            </h2>
            <p className="text-navy-500/70 text-lg max-w-2xl mb-12">
              Our water sports center offers equipment rental, lessons, and guided tours 
              for all skill levels. Non-motorized equipment is complimentary for guests.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {waterSports.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={cn(
                      'px-3 py-1 rounded-full text-xs font-accent',
                      activity.difficulty === 'Easy' && 'bg-green-100 text-green-700',
                      activity.difficulty === 'Moderate' && 'bg-yellow-100 text-yellow-700',
                      activity.difficulty === 'Advanced' && 'bg-red-100 text-red-700',
                    )}>
                      {activity.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-heading text-xl text-navy-500 mb-2">
                    {activity.name}
                  </h3>
                  <p className="text-navy-500/60 text-sm mb-4 line-clamp-2">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-navy-500/70 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {activity.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      Ages {activity.minAge}+
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="font-heading text-2xl text-ocean-500">
                      {formatCurrency(activity.price)}
                    </span>
                    <Link
                      href="/contact"
                      className="px-4 py-2 bg-ocean-500 text-white text-sm font-accent rounded-full hover:bg-ocean-600 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Excursions Section */}
      <section id="excursions" className="py-20 px-6 bg-gradient-to-br from-ocean-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <Map className="text-ocean-500" size={32} />
              <span className="text-ocean-500 font-accent text-sm tracking-widest uppercase">
                Excursions & Tours
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-navy-500 mb-4">
              Explore Beyond the Resort
            </h2>
            <p className="text-navy-500/70 text-lg max-w-2xl mb-12">
              Discover hidden gems, local culture, and breathtaking scenery with our 
              curated selection of tours and excursions.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {excursions.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col md:flex-row"
              >
                <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                  <Image
                    src={activity.image}
                    alt={activity.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={cn(
                      'px-2 py-1 rounded text-xs font-accent',
                      activity.difficulty === 'Easy' && 'bg-green-100 text-green-700',
                      activity.difficulty === 'Moderate' && 'bg-yellow-100 text-yellow-700',
                    )}>
                      {activity.difficulty}
                    </span>
                    <span className="text-navy-500/50 text-sm">{activity.duration}</span>
                  </div>
                  
                  <h3 className="font-heading text-2xl text-navy-500 mb-2">
                    {activity.name}
                  </h3>
                  <p className="text-navy-500/60 text-sm mb-4">
                    {activity.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="font-heading text-2xl text-ocean-500">
                      {formatCurrency(activity.price)}
                    </span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-ocean-500 font-accent text-sm hover:text-ocean-600 transition-colors"
                    >
                      Book Excursion
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Lounge Section */}
      <section id="game-lounge" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-4">
                <Gamepad2 className="text-purple-500" size={32} />
                <span className="text-purple-500 font-accent text-sm tracking-widest uppercase">
                  Entertainment
                </span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl text-navy-500 mb-4">
                {GAME_LOUNGE.name}
              </h2>
              <p className="text-gold-500 font-accent text-lg mb-4">
                {GAME_LOUNGE.tagline}
              </p>
              <p className="text-navy-500/70 text-lg mb-6">
                {GAME_LOUNGE.description}
              </p>
              
              <div className="flex items-center gap-4 text-navy-500/70 mb-8">
                <Clock size={18} className="text-purple-500" />
                <span>Open {GAME_LOUNGE.hours}</span>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-accent font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                Reserve Game Room
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
                src={GAME_LOUNGE.image}
                alt={GAME_LOUNGE.name}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Game Lounge Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GAME_LOUNGE.features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg text-navy-500 mb-1">
                    {feature.name}
                  </h3>
                  <p className="text-navy-500/60 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-navy-500 to-navy-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <AnimatedSection>
            <Star className="mx-auto mb-6 text-gold-400" size={40} />
            <h2 className="font-heading text-4xl mb-6">Ready for Adventure?</h2>
            <p className="text-white/70 text-lg mb-8">
              Our activities desk is open daily to help you plan your perfect 
              adventure. Contact our concierge for personalized recommendations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gold-400 text-navy-500 font-accent font-semibold rounded-full hover:bg-gold-300 transition-colors"
              >
                Contact Activities Desk
              </Link>
              <Link
                href="/offers"
                className="px-8 py-4 border-2 border-white/30 text-white font-accent font-medium rounded-full hover:bg-white/10 transition-colors"
              >
                View Adventure Packages
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

