'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  ArrowRight,
  Waves
} from 'lucide-react';
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants';

const footerLinks = {
  explore: [
    { name: 'Our Rooms', href: '/rooms' },
    { name: 'Facilities', href: '/facilities' },
    { name: 'Dining', href: '/facilities#dining' },
    { name: 'Spa & Wellness', href: '/facilities#spa' },
    { name: 'Activities', href: '/facilities#activities' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Partners', href: '/partners' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-navy-500 text-white overflow-hidden">
      {/* Wave Decoration */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          className="relative block w-full h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-sand-100"
          />
        </svg>
      </div>

      {/* Newsletter Section */}
      <div className="relative pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-ocean-500/20 to-teal-400/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-white/10"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8">
              <div className="text-center md:text-left">
                <h3 className="font-heading text-xl sm:text-2xl md:text-3xl mb-2">
                  Subscribe for Exclusive Offers
                </h3>
                <p className="text-white/70 text-sm sm:text-base">
                  Get the latest news and special rates delivered to your inbox.
                </p>
              </div>
              <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 sm:px-6 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/50 focus:outline-none focus:border-gold-400 transition-colors w-full sm:min-w-[280px]"
                />
                <button
                  type="submit"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-500 font-accent font-semibold rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold-400/30 transition-all whitespace-nowrap"
                >
                  Subscribe
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-ocean-400 to-teal-400 rounded-full flex items-center justify-center">
                <span className="text-white font-heading text-xl font-bold">W</span>
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold">WhiteBay</h2>
                <p className="text-xs tracking-[0.2em] uppercase text-white/60">Resort & Spa</p>
              </div>
            </Link>
            <p className="text-white/70 mb-6 max-w-sm">
              {SITE_CONFIG.description}
            </p>
            <div className="space-y-3">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.contact.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/70 hover:text-gold-400 transition-colors"
              >
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span>{SITE_CONFIG.contact.address}</span>
              </a>
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="flex items-center gap-3 text-white/70 hover:text-gold-400 transition-colors"
              >
                <Phone size={20} />
                <span>{SITE_CONFIG.contact.phone}</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="flex items-center gap-3 text-white/70 hover:text-gold-400 transition-colors"
              >
                <Mail size={20} />
                <span>{SITE_CONFIG.contact.email}</span>
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-accent font-semibold text-lg mb-6 text-gold-400">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-accent font-semibold text-lg mb-6 text-gold-400">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-accent font-semibold text-lg mb-6 text-gold-400">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear} WhiteBay Resort. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-gold-400 hover:text-navy-500 transition-all"
            >
              <Instagram size={18} />
            </a>
            <a
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-gold-400 hover:text-navy-500 transition-all"
            >
              <Facebook size={18} />
            </a>
            <a
              href={SITE_CONFIG.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-gold-400 hover:text-navy-500 transition-all"
            >
              <Twitter size={18} />
            </a>
            <a
              href={SITE_CONFIG.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-gold-400 hover:text-navy-500 transition-all"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-20 left-10 opacity-5">
        <Waves size={200} />
      </div>
      <div className="absolute top-40 right-10 opacity-5">
        <Waves size={150} />
      </div>
    </footer>
  );
}

