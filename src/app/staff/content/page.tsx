'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Image as ImageIcon,
  FileText,
  Calendar,
  Upload,
  ExternalLink,
  Folder
} from 'lucide-react';
import { cn } from '@/lib/utils';

const contentSections = [
  {
    title: 'Resort Events',
    description: 'Manage upcoming events and activities',
    icon: Calendar,
    href: '/staff/events',
    color: 'from-teal-500 to-teal-600',
    count: 'Manage events and activities schedule',
  },
  {
    title: 'Guest Announcements',
    description: 'Create and publish announcements',
    icon: FileText,
    href: '/staff/announcements',
    color: 'from-purple-500 to-purple-600',
    count: 'Share updates with guests',
  },
  {
    title: 'Guest Registry',
    description: 'Register and manage guests',
    icon: ImageIcon,
    href: '/staff/guests',
    color: 'from-ocean-500 to-ocean-600',
    count: 'Track guest information',
  },
];

const quickLinks = [
  { label: 'View Website Home', href: '/', icon: ExternalLink },
  { label: 'Dining Page', href: '/dining', icon: ExternalLink },
  { label: 'Activities Page', href: '/activities', icon: ExternalLink },
  { label: 'Events Page', href: '/events', icon: ExternalLink },
  { label: 'Offers Page', href: '/offers', icon: ExternalLink },
];

export default function StaffContentPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading text-navy-500">Content Management</h1>
        <p className="text-gray-500">Manage resort content and updates</p>
      </div>

      {/* Content Sections */}
      <div className="grid md:grid-cols-3 gap-6">
        {contentSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={section.href}
                className="block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className={cn('h-32 bg-gradient-to-r flex items-center justify-center', section.color)}>
                  <Icon size={48} className="text-white/80 group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg text-navy-500 mb-1">{section.title}</h3>
                  <p className="text-gray-500 text-sm">{section.description}</p>
                  <p className="text-xs text-gray-400 mt-2">{section.count}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Links to Website */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="font-heading text-lg text-navy-500 mb-4">Quick Links to Website</h2>
        <p className="text-gray-500 text-sm mb-4">
          Preview how content appears on the guest-facing website.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition-colors"
              >
                <Icon size={14} />
                {link.label}
              </a>
            );
          })}
        </div>
      </motion.div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white"
      >
        <h2 className="font-heading text-xl mb-2">Need Help?</h2>
        <p className="text-white/80 mb-4">
          Contact the admin team for assistance with content management or to request new features.
        </p>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-6 py-2 bg-white text-teal-600 font-accent text-sm font-medium rounded-lg hover:bg-gold-400 hover:text-navy-500 transition-colors"
        >
          Go to Admin Portal
        </Link>
      </motion.div>
    </div>
  );
}

