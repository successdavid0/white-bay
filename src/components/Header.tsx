'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-navy-500/5'
            : 'bg-transparent'
        )}
      >
        {/* Top Bar */}
        <div
          className={cn(
            'hidden lg:block transition-all duration-500 overflow-hidden',
            isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
          )}
        >
          <div className="bg-navy-500/90 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center text-sm text-white/90">
              <div className="flex items-center gap-6">
                <a href={`tel:${SITE_CONFIG.contact.phone}`} className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                  <Phone size={14} />
                  {SITE_CONFIG.contact.phone}
                </a>
                <span className="text-white/40">|</span>
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-gold-400 transition-colors">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
                  Instagram
                </a>
                <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-ocean-500 to-teal-400 rounded-full flex items-center justify-center shadow-lg shadow-ocean-500/30"
              >
                <span className="text-white font-heading text-lg sm:text-xl font-bold">W</span>
              </motion.div>
              <div>
                <h1 className={cn(
                  'font-heading text-lg sm:text-xl font-semibold transition-colors',
                  isScrolled ? 'text-navy-500' : 'text-white text-shadow'
                )}>
                  WhiteBay
                </h1>
                <p className={cn(
                  'text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-colors',
                  isScrolled ? 'text-ocean-500' : 'text-white/80'
                )}>
                  Resort & Spa
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'relative font-accent text-sm font-medium tracking-wide transition-colors link-underline',
                    isScrolled ? 'text-navy-500 hover:text-ocean-500' : 'text-white hover:text-gold-400'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/booking"
                className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-500 font-accent font-semibold text-sm rounded-full shadow-lg shadow-gold-400/30 hover:shadow-xl hover:shadow-gold-400/40 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="relative z-10">Book Now</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                isScrolled ? 'text-navy-500' : 'text-white'
              )}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-navy-500/95 backdrop-blur-lg" />
            <nav className="relative h-full flex flex-col items-center justify-center gap-8 p-6">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-2xl font-heading hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <Link
                  href="/booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-500 font-accent font-semibold rounded-full"
                >
                  Book Your Stay
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

