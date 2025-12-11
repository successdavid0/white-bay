'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown, ChevronRight } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  megaMenu?: boolean;
  sections?: {
    title: string;
    items: {
      name: string;
      href: string;
      description: string;
    }[];
  }[];
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMegaMenuEnter = (name: string) => {
    setActiveMegaMenu(name);
  };

  const handleMegaMenuLeave = () => {
    setActiveMegaMenu(null);
  };

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
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4" ref={megaMenuRef}>
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
            <div className="hidden lg:flex items-center gap-6">
              {(NAV_LINKS as NavItem[]).map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.megaMenu && handleMegaMenuEnter(link.name)}
                  onMouseLeave={handleMegaMenuLeave}
                >
                  {link.megaMenu ? (
                    <button
                      className={cn(
                        'relative font-accent text-sm font-medium tracking-wide transition-colors flex items-center gap-1',
                        isScrolled ? 'text-navy-500 hover:text-ocean-500' : 'text-white hover:text-gold-400',
                        activeMegaMenu === link.name && (isScrolled ? 'text-ocean-500' : 'text-gold-400')
                      )}
                    >
                      {link.name}
                      <ChevronDown size={14} className={cn(
                        'transition-transform',
                        activeMegaMenu === link.name && 'rotate-180'
                      )} />
                    </button>
                  ) : (
                    <Link
                  href={link.href}
                  className={cn(
                    'relative font-accent text-sm font-medium tracking-wide transition-colors link-underline',
                    isScrolled ? 'text-navy-500 hover:text-ocean-500' : 'text-white hover:text-gold-400'
                  )}
                >
                  {link.name}
                </Link>
                  )}

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {link.megaMenu && activeMegaMenu === link.name && link.sections && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-[72px] left-1/2 -translate-x-1/2 pt-4 z-50"
                      >
                        <div className="bg-white rounded-2xl shadow-2xl shadow-navy-500/20 overflow-hidden min-w-[600px] max-w-[90vw]">
                          <div className="grid grid-cols-4 gap-0">
                            {link.sections.map((section) => (
                              <div key={section.title} className="p-6 border-r border-gray-100 last:border-r-0">
                                <h3 className="font-heading text-sm font-semibold text-navy-500 mb-4 uppercase tracking-wider">
                                  {section.title}
                                </h3>
                                <ul className="space-y-3">
                                  {section.items.map((item) => (
                                    <li key={item.name}>
                                      <Link
                                        href={item.href}
                                        onClick={() => setActiveMegaMenu(null)}
                                        className="group block"
                                      >
                                        <span className="text-navy-500 font-medium text-sm group-hover:text-ocean-500 transition-colors">
                                          {item.name}
                                        </span>
                                        <p className="text-navy-500/50 text-xs mt-0.5">
                                          {item.description}
                                        </p>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
              ))}
            </div>
                          <div className="bg-gradient-to-r from-ocean-50 to-teal-50 px-6 py-4 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-navy-500/70">
                                Discover our world-class amenities and experiences
                              </p>
              <Link
                                href="/facilities"
                                onClick={() => setActiveMegaMenu(null)}
                                className="text-sm font-medium text-ocean-500 hover:text-ocean-600 flex items-center gap-1"
                              >
                                View All Facilities
                                <ChevronRight size={14} />
              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-navy-500/95 backdrop-blur-lg" />
            <nav className="relative h-full overflow-y-auto pt-24 pb-8 px-6">
              <div className="flex flex-col gap-4">
                {(NAV_LINKS as NavItem[]).map((link, index) => (
                <motion.div
                  key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.megaMenu ? (
                      <div>
                        <button
                          onClick={() => setMobileSubmenu(mobileSubmenu === link.name ? null : link.name)}
                          className="w-full text-left text-white text-xl font-heading flex items-center justify-between py-2"
                        >
                          {link.name}
                          <ChevronDown size={20} className={cn(
                            'transition-transform',
                            mobileSubmenu === link.name && 'rotate-180'
                          )} />
                        </button>
                        <AnimatePresence>
                          {mobileSubmenu === link.name && link.sections && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-4 space-y-4 mt-2">
                                {link.sections.map((section) => (
                                  <div key={section.title}>
                                    <h4 className="text-gold-400 text-sm font-accent uppercase tracking-wider mb-2">
                                      {section.title}
                                    </h4>
                                    <ul className="space-y-2">
                                      {section.items.map((item) => (
                                        <li key={item.name}>
                                          <Link
                                            href={item.href}
                                            onClick={() => {
                                              setIsMobileMenuOpen(false);
                                              setMobileSubmenu(null);
                                            }}
                                            className="text-white/80 hover:text-white text-base"
                                          >
                                            {item.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                        className="text-white text-xl font-heading block py-2 hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                    )}
                </motion.div>
              ))}
              </div>

              {/* Mobile Menu Footer */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex flex-col gap-4 text-white/70 text-sm">
                  <a href={`tel:${SITE_CONFIG.contact.phone}`} className="flex items-center gap-2">
                    <Phone size={16} />
                    {SITE_CONFIG.contact.phone}
                  </a>
                  <a href={`mailto:${SITE_CONFIG.contact.email}`}>
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
