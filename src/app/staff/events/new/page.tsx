'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  FileText,
  Save,
  Image as ImageIcon,
  Ticket,
  Plus,
  Trash2,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createEvent, TicketType } from '@/lib/storage';

const categories = [
  { value: 'entertainment', label: 'Entertainment', emoji: '🎉' },
  { value: 'dining', label: 'Dining', emoji: '🍽️' },
  { value: 'wellness', label: 'Wellness', emoji: '🧘' },
  { value: 'sports', label: 'Sports', emoji: '🏄' },
  { value: 'kids', label: 'Kids', emoji: '👶' },
  { value: 'special', label: 'Special', emoji: '⭐' },
];

const locations = [
  'Private Beach',
  'Infinity Pool',
  'Bay Lounge',
  'The Ocean Terrace',
  'Coral Kitchen',
  'Beach Grill',
  'Garden Pavilion',
  'Grand Ballroom',
  'Game Lounge',
  'Fitness Center',
  'Spa & Wellness',
  'Conference Center',
  'Beach Courts',
  'Rooftop Terrace',
];

interface TicketInput {
  name: string;
  price: string;
  description: string;
  available: string;
}

export default function NewEventPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    date: '',
    endDate: '',
    time: '',
    endTime: '',
    location: '',
    category: 'entertainment' as const,
    capacity: '',
    image: '',
    isActive: true,
    isFeatured: false,
    ticketsEnabled: false,
  });

  const [tickets, setTickets] = useState<TicketInput[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const ticketData: Omit<TicketType, 'id' | 'sold'>[] = tickets.map(t => ({
        name: t.name,
        price: parseFloat(t.price) || 0,
        description: t.description,
        available: parseInt(t.available) || 0,
        sold: 0,
      }));

      createEvent({
        ...formData,
        capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
        tickets: formData.ticketsEnabled ? ticketData as TicketType[] : undefined,
        createdBy: 'Staff User',
      });
      
      router.push('/staff/events');
    } catch (error) {
      console.error('Error creating event:', error);
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const addTicketType = () => {
    setTickets(prev => [...prev, { name: '', price: '', description: '', available: '' }]);
  };

  const updateTicket = (index: number, field: keyof TicketInput, value: string) => {
    setTickets(prev => prev.map((t, i) => i === index ? { ...t, [field]: value } : t));
  };

  const removeTicket = (index: number) => {
    setTickets(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/staff/events"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-teal-500 transition-colors mb-4"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>
        <h1 className="text-2xl font-heading text-navy-500">Create New Event</h1>
        <p className="text-gray-500">Fill in the details to create a new resort event with ticket options.</p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="font-heading text-lg text-navy-500 flex items-center gap-2">
            <FileText size={20} className="text-teal-500" />
            Basic Information
          </h2>

          {/* Title */}
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Event Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Beach Sunset Yoga"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Short Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={2}
              placeholder="Brief description for event cards..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 resize-none"
            />
          </div>

          {/* Long Description */}
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Full Description
            </label>
            <textarea
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              rows={4}
              placeholder="Detailed description for the event page..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 resize-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Image URL
            </label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="font-heading text-lg text-navy-500 flex items-center gap-2">
            <Calendar size={20} className="text-teal-500" />
            Date & Time
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-accent text-navy-500 mb-2">
                Start Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-accent text-navy-500 mb-2">
                End Date (optional)
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.date}
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-accent text-navy-500 mb-2">
                Start Time *
              </label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-accent text-navy-500 mb-2">
                End Time
              </label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location & Category */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="font-heading text-lg text-navy-500 flex items-center gap-2">
            <MapPin size={20} className="text-teal-500" />
            Location & Category
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-accent text-navy-500 mb-2">
                Location *
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 appearance-none"
              >
                <option value="">Select location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-accent text-navy-500 mb-2">
                Capacity (optional)
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="1"
                  placeholder="Max participants"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Category *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, category: cat.value as typeof prev.category }))}
                  className={cn(
                    'p-3 rounded-xl border-2 transition-all text-left',
                    formData.category === cat.value
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <span className="text-2xl">{cat.emoji}</span>
                  <p className={cn(
                    'text-sm font-accent mt-1',
                    formData.category === cat.value ? 'text-teal-600' : 'text-gray-600'
                  )}>
                    {cat.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tickets Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg text-navy-500 flex items-center gap-2">
              <Ticket size={20} className="text-teal-500" />
              Ticket Options
            </h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="ticketsEnabled"
                checked={formData.ticketsEnabled}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
              <span className="ml-3 text-sm text-gray-600">Enable ticket sales</span>
            </label>
          </div>

          {formData.ticketsEnabled && (
            <>
              <p className="text-sm text-gray-500">
                Add different ticket types for your event (e.g., General Admission, VIP, etc.)
              </p>

              {tickets.map((ticket, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 bg-gray-50 rounded-xl space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-accent text-sm text-navy-500">Ticket Type #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeTicket(index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Ticket Name *</label>
                      <input
                        type="text"
                        value={ticket.name}
                        onChange={(e) => updateTicket(index, 'name', e.target.value)}
                        placeholder="e.g., General Admission"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Price ($) *</label>
                      <input
                        type="number"
                        value={ticket.price}
                        onChange={(e) => updateTicket(index, 'price', e.target.value)}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Available Quantity *</label>
                      <input
                        type="number"
                        value={ticket.available}
                        onChange={(e) => updateTicket(index, 'available', e.target.value)}
                        placeholder="100"
                        min="1"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Description</label>
                      <input
                        type="text"
                        value={ticket.description}
                        onChange={(e) => updateTicket(index, 'description', e.target.value)}
                        placeholder="What's included"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}

              <button
                type="button"
                onClick={addTicketType}
                className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl hover:border-teal-500 hover:text-teal-500 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Add Ticket Type
              </button>
            </>
          )}
        </div>

        {/* Publishing Options */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="font-heading text-lg text-navy-500 flex items-center gap-2">
            <Star size={20} className="text-teal-500" />
            Publishing Options
          </h2>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-accent text-navy-500">Publish Immediately</p>
              <p className="text-sm text-gray-500">Make this event visible to guests</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gold-50 to-amber-50 rounded-xl border border-gold-200">
            <div>
              <p className="font-accent text-navy-500">⭐ Featured Event</p>
              <p className="text-sm text-gray-500">Highlight on the events page</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/staff/events"
            className="px-6 py-3 text-gray-500 font-accent hover:text-gray-700 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving || (formData.ticketsEnabled && tickets.length === 0)}
            className="inline-flex items-center gap-2 px-8 py-3 bg-teal-500 text-white font-accent font-medium rounded-xl hover:bg-teal-600 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save size={18} />
                Create Event
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
