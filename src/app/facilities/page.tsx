'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Waves, 
  Sparkles, 
  Clock, 
  ArrowRight,
  Dumbbell,
  UtensilsCrossed,
  Umbrella,
  Anchor,
  Heart,
  Users
} from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { FACILITIES } from '@/lib/constants';

const facilityIcons: Record<string, React.ReactNode> = {
  'waves': <Waves size={24} />,
  'spa': <Heart size={24} />,
  'umbrella': <Umbrella size={24} />,
  'utensils': <UtensilsCrossed size={24} />,
  'dumbbell': <Dumbbell size={24} />,
  'anchor': <Anchor size={24} />,
};

export default function FacilitiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1920&h=1080&fit=crop&q=80"
            alt="Resort Facilities"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-500/60 via-navy-500/40 to-sand-100" />
        </div>

        {/* Floating Decorations */}
        <motion.div
          className="absolute top-40 left-10 text-white/10"
          animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Waves size={100} />
        </motion.div>
        <motion.div
          className="absolute bottom-40 right-10 text-white/10"
          animate={{ y: [15, -15, 15], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles size={80} />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gold-400 font-accent text-sm tracking-widest uppercase mb-4 block"
          >
            World-Class Amenities
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl text-white text-shadow-lg mb-4"
          >
            Resort Facilities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Discover our exceptional range of facilities designed to make your stay 
            extraordinary. From relaxation to adventure, we have it all.
          </motion.p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-24 bg-sand-100">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerContainer className="space-y-24">
            {FACILITIES.map((facility, index) => (
              <StaggerItem key={facility.id}>
                <FacilitySection facility={facility} index={index} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-ocean-500 font-accent text-sm tracking-widest uppercase mb-4 block">
              Extra Services
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-navy-500 mb-6">
              Personalized Experiences
            </h2>
            <p className="text-navy-500/70 max-w-2xl mx-auto text-lg">
              Enhance your stay with our curated selection of exclusive services 
              and experiences.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group bg-gradient-to-b from-sand-100 to-white p-8 rounded-2xl border border-sand-200 hover:shadow-xl hover:shadow-ocean-500/10 transition-all duration-500 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-ocean-500 to-teal-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-ocean-500/30 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="font-heading text-xl text-navy-500 mb-3">{service.title}</h3>
                  <p className="text-navy-500/60 text-sm">{service.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&h=1080&fit=crop&q=80"
            alt="Spa Experience"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy-500/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400/20 rounded-full text-gold-400 text-sm font-accent mb-6">
              <Sparkles size={16} />
              Spa Package Available
            </span>
            
            <h2 className="font-heading text-4xl md:text-6xl text-white mb-6">
              Rejuvenate Your Body & Soul
            </h2>
            
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Experience our signature spa treatments. Book a wellness package and 
              enjoy 20% off on all spa services.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking?package=spa"
                className="px-10 py-5 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-500 font-accent font-semibold rounded-full shadow-lg shadow-gold-400/30 hover:shadow-xl hover:shadow-gold-400/50 transform hover:-translate-y-1 transition-all duration-300"
              >
                Book Spa Package
              </Link>
              <Link
                href="/contact"
                className="px-10 py-5 bg-transparent border-2 border-white text-white font-accent font-medium rounded-full hover:bg-white hover:text-navy-500 transition-all duration-300"
              >
                Contact Concierge
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

// Facility Section Component
interface FacilitySectionProps {
  facility: typeof FACILITIES[0];
  index: number;
}

function FacilitySection({ facility, index }: FacilitySectionProps) {
  const isReversed = index % 2 !== 0;

  return (
    <div
      id={facility.id}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full lg:w-1/2"
      >
        <div className="relative group rounded-3xl overflow-hidden shadow-2xl shadow-navy-500/10">
          <div className="aspect-[4/3] relative">
            <Image
              src={facility.image}
              alt={facility.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-500/60 to-transparent" />
          </div>
          
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-6 left-6 right-6"
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl">
              <Clock size={18} className="text-ocean-500" />
              <span className="text-navy-500 font-accent">{facility.hours}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full lg:w-1/2"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-ocean-500 to-teal-400 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-ocean-500/30">
          {facilityIcons[facility.icon] || <Sparkles size={24} />}
        </div>
        
        <h2 className="font-heading text-4xl text-navy-500 mb-4">{facility.name}</h2>
        
        <p className="text-navy-500/70 text-lg mb-6 leading-relaxed">
          {facility.description}
        </p>

        <ul className="space-y-3 mb-8">
          {getFacilityFeatures(facility.id).map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 text-navy-500/70">
              <div className="w-6 h-6 bg-teal-400/20 rounded-full flex items-center justify-center">
                <ArrowRight size={12} className="text-teal-500" />
              </div>
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href="/booking"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-ocean-500 to-ocean-600 text-white font-accent font-medium rounded-xl hover:shadow-lg hover:shadow-ocean-500/30 transition-all"
        >
          Reserve Now
          <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  );
}

// Helper function to get facility features
function getFacilityFeatures(facilityId: string): string[] {
  const features: Record<string, string[]> = {
    'infinity-pool': [
      'Temperature-controlled water',
      'Poolside bar & dining',
      'Private cabanas available',
      'Children\'s pool area',
    ],
    'spa-wellness': [
      'Traditional & modern treatments',
      'Thermal circuits & saunas',
      'Meditation gardens',
      'Couples treatment rooms',
    ],
    'private-beach': [
      'Complimentary loungers & umbrellas',
      'Beach butler service',
      'Water sports equipment',
      'Sunset cocktail service',
    ],
    'fine-dining': [
      '3 award-winning restaurants',
      'Fresh seafood daily',
      'Wine cellar with 500+ selections',
      'Private dining experiences',
    ],
    'fitness-center': [
      'State-of-the-art equipment',
      'Personal trainers available',
      'Yoga & fitness classes',
      'Ocean view workout area',
    ],
    'water-sports': [
      'Jet skiing & parasailing',
      'Snorkeling & diving',
      'Paddleboarding & kayaking',
      'Sailing lessons',
    ],
  };
  return features[facilityId] || [];
}

// Additional services data
const additionalServices = [
  {
    icon: <Users size={28} />,
    title: 'Private Events',
    description: 'Host weddings, corporate retreats, and celebrations in stunning venues.',
  },
  {
    icon: <UtensilsCrossed size={28} />,
    title: 'In-Room Dining',
    description: '24/7 room service with gourmet selections from our restaurants.',
  },
  {
    icon: <Heart size={28} />,
    title: 'Concierge Service',
    description: 'Personal assistance for excursions, reservations, and special requests.',
  },
  {
    icon: <Anchor size={28} />,
    title: 'Yacht Charters',
    description: 'Explore the coast on our luxury yachts with full crew service.',
  },
];

