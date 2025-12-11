'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Home,
  Calendar,
  Star,
  FileText,
  Save
} from 'lucide-react';
import { createGuest } from '@/lib/storage';

export default function NewGuestPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    roomNumber: '',
    checkIn: '',
    checkOut: '',
    vipStatus: false,
    notes: '',
    preferences: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      createGuest({
        ...formData,
        createdBy: 'Staff User',
      });
      
      router.push('/staff/guests');
    } catch (error) {
      console.error('Error creating guest:', error);
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/staff/guests"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-teal-500 transition-colors mb-4"
        >
          <ArrowLeft size={18} />
          Back to Guests
        </Link>
        <h1 className="text-2xl font-heading text-navy-500">Register New Guest</h1>
        <p className="text-gray-500">Add a new guest to the registry.</p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm p-6 space-y-6"
      >
        {/* Name */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              First Name *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="John"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Last Name *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Smith"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Phone
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Room & Stay */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Room Number
            </label>
            <div className="relative">
              <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="101"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Check-in Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Check-out Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                min={formData.checkIn}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-accent text-navy-500 mb-2">
            Notes & Preferences
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Special requests, dietary restrictions, etc."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 resize-none"
          />
        </div>

        {/* VIP Toggle */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gold-50 to-amber-50 rounded-xl border border-gold-200">
          <div className="flex items-center gap-3">
            <Star className="text-gold-500" size={24} />
            <div>
              <p className="font-accent text-navy-500">VIP Guest</p>
              <p className="text-sm text-gray-500">Mark as VIP for priority service</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="vipStatus"
              checked={formData.vipStatus}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
          </label>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
          <Link
            href="/staff/guests"
            className="px-6 py-3 text-gray-500 font-accent hover:text-gray-700 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 bg-teal-500 text-white font-accent font-medium rounded-xl hover:bg-teal-600 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Registering...
              </>
            ) : (
              <>
                <Save size={18} />
                Register Guest
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
}

