'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, ChevronRight, ArrowLeft } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { POLICIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const policyOrder = ['cancellation', 'checkInOut', 'children', 'pets', 'payment', 'dressCode'];

export default function PoliciesPage() {
  const [activePolicy, setActivePolicy] = useState<string | null>(null);

  const orderedPolicies = policyOrder.map(key => ({
    key,
    ...POLICIES[key as keyof typeof POLICIES],
  }));

  return (
    <div className="min-h-screen bg-sand-100 pt-24">
      {/* Header */}
      <section className="py-16 px-6 bg-gradient-to-b from-navy-500 to-navy-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FileText className="mx-auto mb-6 text-gold-400" size={48} />
            <h1 className="font-heading text-4xl md:text-5xl mb-4">
              Resort Policies
            </h1>
            <p className="text-white/70 text-lg">
              Important information to ensure a smooth and enjoyable stay.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Navigation - Desktop */}
      <section className="py-8 px-6 bg-white shadow-sm hidden lg:block sticky top-16 z-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center gap-2 flex-wrap">
            {orderedPolicies.map((policy) => (
              <a
                key={policy.key}
                href={`#${policy.key}`}
                className="px-4 py-2 bg-sand-100 text-navy-500 font-accent text-sm rounded-full hover:bg-ocean-50 hover:text-ocean-600 transition-colors"
              >
                {policy.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Policies Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Mobile Accordion */}
          <div className="lg:hidden space-y-4">
            {orderedPolicies.map((policy, index) => (
              <motion.div
                key={policy.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setActivePolicy(activePolicy === policy.key ? null : policy.key)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <h2 className="font-heading text-lg text-navy-500">{policy.title}</h2>
                  <ChevronRight
                    size={20}
                    className={cn(
                      'text-ocean-500 transition-transform',
                      activePolicy === policy.key && 'rotate-90'
                    )}
                  />
                </button>
                {activePolicy === policy.key && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className="px-6 pb-6"
                  >
                    <ul className="space-y-3">
                      {policy.content.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-navy-500/70">
                          <span className="w-1.5 h-1.5 bg-ocean-500 rounded-full mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Desktop Cards */}
          <div className="hidden lg:block space-y-8">
            {orderedPolicies.map((policy, index) => (
              <AnimatedSection key={policy.key}>
                <div
                  id={policy.key}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm scroll-mt-40"
                >
                  <div className="px-8 py-6 bg-gradient-to-r from-ocean-50 to-teal-50 border-b border-gray-100">
                    <h2 className="font-heading text-2xl text-navy-500">{policy.title}</h2>
                  </div>
                  <div className="px-8 py-6">
                    <ul className="space-y-4">
                      {policy.content.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-navy-500/70">
                          <span className="w-2 h-2 bg-ocean-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-lg">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="bg-gradient-to-r from-ocean-500 to-teal-500 rounded-3xl p-8 md:p-12 text-white">
              <h2 className="font-heading text-3xl mb-4">Need Clarification?</h2>
              <p className="text-white/80 mb-6">
                If you have any questions about our policies or require special accommodations, 
                please don&apos;t hesitate to contact us. Our team is happy to assist you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-ocean-600 font-accent font-semibold rounded-full hover:bg-gold-400 hover:text-navy-500 transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/faq"
                  className="px-6 py-3 border-2 border-white/30 text-white font-accent font-medium rounded-full hover:bg-white/10 transition-colors"
                >
                  View FAQ
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-8 px-6 bg-sand-100">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-navy-500/60 hover:text-ocean-500 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}

