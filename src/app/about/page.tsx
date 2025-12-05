'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Award, 
  Heart, 
  Globe, 
  Leaf, 
  Users,
  ArrowRight,
  Sparkles,
  Star
} from 'lucide-react';
import AnimatedSection, { StaggerContainer, StaggerItem, Counter } from '@/components/AnimatedSection';

const milestones = [
  { year: '2008', title: 'Founded', description: 'WhiteBay Resort opens its doors to guests' },
  { year: '2012', title: 'First Award', description: 'Received 5-star luxury resort designation' },
  { year: '2016', title: 'Expansion', description: 'Added beachfront villas and spa complex' },
  { year: '2020', title: 'Sustainability', description: 'Achieved carbon-neutral certification' },
  { year: '2023', title: 'Recognition', description: 'Named Best Beach Resort by Travel Awards' },
];

const values = [
  {
    icon: <Heart size={28} />,
    title: 'Exceptional Service',
    description: 'Every guest is treated like family, with personalized attention to detail.',
  },
  {
    icon: <Globe size={28} />,
    title: 'Cultural Respect',
    description: 'We celebrate diversity and honor local traditions in all we do.',
  },
  {
    icon: <Leaf size={28} />,
    title: 'Sustainability',
    description: 'Committed to protecting our beautiful environment for future generations.',
  },
  {
    icon: <Award size={28} />,
    title: 'Excellence',
    description: 'We continuously strive to exceed expectations in every experience.',
  },
];

const team = [
  {
    name: 'Alexandra Chen',
    role: 'General Manager',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80',
    bio: '15 years in luxury hospitality',
  },
  {
    name: 'Marcus Williams',
    role: 'Executive Chef',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80',
    bio: 'Michelin-starred culinary expert',
  },
  {
    name: 'Sophie Laurent',
    role: 'Spa Director',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80',
    bio: 'Wellness specialist from Bali',
  },
  {
    name: 'James Okonkwo',
    role: 'Guest Relations',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
    bio: 'Creating memorable experiences',
  },
];

const awards = [
  { year: '2023', title: 'Best Luxury Beach Resort', org: 'World Travel Awards' },
  { year: '2023', title: 'Top 10 Romantic Resorts', org: 'Condé Nast Traveler' },
  { year: '2022', title: 'Excellence in Sustainability', org: 'Green Globe' },
  { year: '2022', title: 'Best Spa Resort', org: 'Spa Awards International' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&h=1080&fit=crop&q=80"
            alt="About WhiteBay Resort"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-500/60 via-navy-500/40 to-sand-100" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gold-400 font-accent text-sm tracking-widest uppercase mb-4 block"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl text-white text-shadow-lg mb-6"
          >
            A Legacy of Luxury
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg md:text-xl leading-relaxed"
          >
            For over 15 years, WhiteBay Resort has been a sanctuary of elegance and 
            tranquility, where the azure waters meet golden sands and dreams come alive.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-sand-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-ocean-500 font-accent text-sm tracking-widest uppercase mb-4 block">
                The Beginning
              </span>
              <h2 className="font-heading text-4xl md:text-5xl text-navy-500 mb-6">
                From Vision to Paradise
              </h2>
              <div className="space-y-4 text-navy-500/70 text-lg leading-relaxed">
                <p>
                  WhiteBay Resort was born from a simple yet profound vision: to create 
                  a haven where luxury meets nature, where every guest feels not just 
                  welcomed, but truly at home.
                </p>
                <p>
                  Founded in 2008 by a family of hoteliers with a passion for excellence, 
                  our resort has grown from a boutique property into an award-winning 
                  destination, all while maintaining the intimate, personalized service 
                  that has been our hallmark from day one.
                </p>
                <p>
                  Today, WhiteBay stands as a testament to our commitment to exceptional 
                  hospitality, sustainable practices, and creating unforgettable memories 
                  for guests from around the world.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop&q=80"
                    alt="Resort History"
                    width={800}
                    height={600}
                    className="w-full"
                  />
                </div>
                {/* Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-500 rounded-xl flex items-center justify-center">
                      <Award size={32} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading text-3xl text-navy-500">
                        <Counter value={50} suffix="+" />
                      </p>
                      <p className="text-navy-500/60">Awards Won</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-ocean-500 font-accent text-sm tracking-widest uppercase mb-4 block">
              Our Journey
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-navy-500">
              Milestones & Achievements
            </h2>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-ocean-500 via-teal-400 to-gold-400 hidden md:block" />

            <StaggerContainer className="space-y-12">
              {milestones.map((milestone, index) => (
                <StaggerItem key={index}>
                  <div className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-sand-100 p-6 rounded-2xl inline-block"
                      >
                        <span className="text-gold-500 font-heading text-2xl block mb-2">
                          {milestone.year}
                        </span>
                        <h3 className="font-heading text-xl text-navy-500 mb-1">
                          {milestone.title}
                        </h3>
                        <p className="text-navy-500/60">{milestone.description}</p>
                      </motion.div>
                    </div>
                    
                    {/* Center Dot */}
                    <div className="hidden md:flex w-6 h-6 bg-ocean-500 rounded-full border-4 border-white shadow-lg z-10" />
                    
                    <div className="flex-1 hidden md:block" />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-navy-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10"><Sparkles size={150} /></div>
          <div className="absolute bottom-10 right-10"><Sparkles size={100} /></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="text-gold-400 font-accent text-sm tracking-widest uppercase mb-4 block">
              What Guides Us
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">
              Our Core Values
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              These principles shape every interaction, every decision, and every 
              experience we create for our guests.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-colors"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-gold-400 to-gold-500 rounded-2xl flex items-center justify-center text-navy-500">
                    {value.icon}
                  </div>
                  <h3 className="font-heading text-xl text-white mb-3">{value.title}</h3>
                  <p className="text-white/60">{value.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-sand-100">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-ocean-500 font-accent text-sm tracking-widest uppercase mb-4 block">
              Meet Our Team
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-navy-500 mb-6">
              The People Behind the Magic
            </h2>
            <p className="text-navy-500/70 max-w-2xl mx-auto text-lg">
              Our dedicated team of hospitality professionals is committed to making 
              your stay extraordinary.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-navy-500/5 hover:shadow-2xl hover:shadow-navy-500/10 transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-500/60 to-transparent" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-heading text-xl text-navy-500">{member.name}</h3>
                    <p className="text-ocean-500 font-accent text-sm mb-2">{member.role}</p>
                    <p className="text-navy-500/60 text-sm">{member.bio}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Awards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-ocean-500 font-accent text-sm tracking-widest uppercase mb-4 block">
              Recognition
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-navy-500">
              Awards & Accolades
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-b from-sand-100 to-white p-6 rounded-2xl border border-sand-200 text-center"
                >
                  <Star size={32} className="text-gold-400 fill-gold-400 mx-auto mb-4" />
                  <span className="text-ocean-500 font-accent text-sm">{award.year}</span>
                  <h3 className="font-heading text-lg text-navy-500 mt-2 mb-1">
                    {award.title}
                  </h3>
                  <p className="text-navy-500/60 text-sm">{award.org}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1920&h=1080&fit=crop&q=80"
            alt="Experience WhiteBay"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy-500/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-heading text-4xl md:text-6xl text-white mb-6">
              Experience WhiteBay
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Join the thousands of guests who have discovered their perfect escape. 
              Your extraordinary journey awaits.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="px-10 py-5 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-500 font-accent font-semibold rounded-full shadow-lg shadow-gold-400/30 hover:shadow-xl hover:shadow-gold-400/50 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                Book Your Stay
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/rooms"
                className="px-10 py-5 bg-transparent border-2 border-white text-white font-accent font-medium rounded-full hover:bg-white hover:text-navy-500 transition-all duration-300"
              >
                Explore Rooms
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

