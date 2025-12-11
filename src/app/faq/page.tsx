'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, Phone, Mail, MessageCircle } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { FAQ_ITEMS, SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  const toggleQuestion = (question: string) => {
    setOpenQuestions(prev =>
      prev.includes(question)
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

  const filteredFAQ = FAQ_ITEMS.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.a.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-sand-100 pt-24">
      {/* Header */}
      <section className="py-16 px-6 bg-gradient-to-b from-navy-500 to-navy-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <HelpCircle className="mx-auto mb-6 text-gold-400" size={48} />
            <h1 className="font-heading text-4xl md:text-5xl mb-4">
              How Can We Help?
            </h1>
            <p className="text-white/70 text-lg mb-8">
              Find answers to common questions about your stay at WhiteBay Resort.
            </p>

            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-500/50" size={20} />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full text-navy-500 placeholder:text-navy-500/50 focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 px-6 bg-white shadow-sm sticky top-16 z-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                'px-6 py-2 rounded-full font-accent text-sm transition-colors',
                activeCategory === null
                  ? 'bg-ocean-500 text-white'
                  : 'bg-sand-100 text-navy-500 hover:bg-sand-200'
              )}
            >
              All Questions
            </button>
            {FAQ_ITEMS.map((category) => (
              <button
                key={category.category}
                onClick={() => setActiveCategory(category.category)}
                className={cn(
                  'px-6 py-2 rounded-full font-accent text-sm transition-colors',
                  activeCategory === category.category
                    ? 'bg-ocean-500 text-white'
                    : 'bg-sand-100 text-navy-500 hover:bg-sand-200'
                )}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-navy-500/60 text-lg">
                No results found for &quot;{searchTerm}&quot;
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-ocean-500 font-accent hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFAQ
                .filter(category => !activeCategory || category.category === activeCategory)
                .map((category) => (
                  <AnimatedSection key={category.category}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                      <div className="px-6 py-4 bg-gradient-to-r from-ocean-50 to-teal-50 border-b border-gray-100">
                        <h2 className="font-heading text-xl text-navy-500">
                          {category.category}
                        </h2>
                      </div>

                      <div className="divide-y divide-gray-100">
                        {category.questions.map((item, index) => {
                          const isOpen = openQuestions.includes(item.q);
                          return (
                            <div key={index} className="px-6">
                              <button
                                onClick={() => toggleQuestion(item.q)}
                                className="w-full py-5 flex items-center justify-between text-left"
                              >
                                <span className="font-accent text-navy-500 pr-4">
                                  {item.q}
                                </span>
                                <ChevronDown
                                  size={20}
                                  className={cn(
                                    'text-ocean-500 transition-transform flex-shrink-0',
                                    isOpen && 'rotate-180'
                                  )}
                                />
                              </button>
                              <AnimatePresence>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <p className="pb-5 text-navy-500/70 leading-relaxed">
                                      {item.a}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl text-navy-500 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-navy-500/60">
                Our team is here to help you 24/7
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="flex flex-col items-center p-6 bg-sand-50 rounded-2xl hover:bg-ocean-50 transition-colors group"
              >
                <div className="w-14 h-14 bg-ocean-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-ocean-200 transition-colors">
                  <Phone className="text-ocean-500" size={24} />
                </div>
                <h3 className="font-heading text-lg text-navy-500 mb-1">Call Us</h3>
                <p className="text-navy-500/60 text-sm">{SITE_CONFIG.contact.phone}</p>
              </a>

              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="flex flex-col items-center p-6 bg-sand-50 rounded-2xl hover:bg-ocean-50 transition-colors group"
              >
                <div className="w-14 h-14 bg-ocean-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-ocean-200 transition-colors">
                  <Mail className="text-ocean-500" size={24} />
                </div>
                <h3 className="font-heading text-lg text-navy-500 mb-1">Email Us</h3>
                <p className="text-navy-500/60 text-sm">{SITE_CONFIG.contact.email}</p>
              </a>

              <Link
                href="/contact"
                className="flex flex-col items-center p-6 bg-sand-50 rounded-2xl hover:bg-ocean-50 transition-colors group"
              >
                <div className="w-14 h-14 bg-ocean-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-ocean-200 transition-colors">
                  <MessageCircle className="text-ocean-500" size={24} />
                </div>
                <h3 className="font-heading text-lg text-navy-500 mb-1">Live Chat</h3>
                <p className="text-navy-500/60 text-sm">Chat with our team</p>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Policies Link */}
      <section className="py-12 px-6 bg-sand-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-navy-500/60 mb-4">
            Looking for detailed information about our policies?
          </p>
          <Link
            href="/policies"
            className="inline-flex items-center gap-2 text-ocean-500 font-accent hover:text-ocean-600 transition-colors"
          >
            View Our Policies
            <ChevronDown className="rotate-[-90deg]" size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

