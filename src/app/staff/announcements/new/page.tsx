'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  FileText,
  Calendar,
  Users,
  AlertTriangle,
  Save
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createAnnouncement } from '@/lib/storage';

const priorities = [
  { value: 'low', label: 'Low', description: 'General information', color: 'border-gray-300 bg-gray-50' },
  { value: 'medium', label: 'Medium', description: 'Important update', color: 'border-blue-300 bg-blue-50' },
  { value: 'high', label: 'High', description: 'Requires attention', color: 'border-orange-300 bg-orange-50' },
  { value: 'urgent', label: 'Urgent', description: 'Immediate action needed', color: 'border-red-300 bg-red-50' },
];

const audiences = [
  { value: 'all', label: 'Everyone', description: 'All guests and staff' },
  { value: 'guests', label: 'Guests Only', description: 'Resort guests' },
  { value: 'staff', label: 'Staff Only', description: 'Internal staff' },
];

export default function NewAnnouncementPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    targetAudience: 'all' as 'all' | 'guests' | 'staff',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      createAnnouncement({
        ...formData,
        createdBy: 'Staff User',
      });
      
      router.push('/staff/announcements');
    } catch (error) {
      console.error('Error creating announcement:', error);
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
          href="/staff/announcements"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-teal-500 transition-colors mb-4"
        >
          <ArrowLeft size={18} />
          Back to Announcements
        </Link>
        <h1 className="text-2xl font-heading text-navy-500">Create Announcement</h1>
        <p className="text-gray-500">Share important information with guests or staff.</p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm p-6 space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-accent text-navy-500 mb-2">
            Title *
          </label>
          <div className="relative">
            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Pool Maintenance Schedule"
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-accent text-navy-500 mb-2">
            Message *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Write your announcement here..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500 resize-none"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-accent text-navy-500 mb-2">
            Priority *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {priorities.map((priority) => (
              <button
                key={priority.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, priority: priority.value as typeof prev.priority }))}
                className={cn(
                  'p-3 rounded-xl border-2 transition-all text-left',
                  formData.priority === priority.value
                    ? `${priority.color} border-2`
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <p className={cn(
                  'text-sm font-accent',
                  formData.priority === priority.value ? 'text-navy-600' : 'text-gray-600'
                )}>
                  {priority.label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{priority.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-sm font-accent text-navy-500 mb-2">
            Target Audience *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {audiences.map((audience) => (
              <button
                key={audience.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, targetAudience: audience.value as typeof prev.targetAudience }))}
                className={cn(
                  'p-3 rounded-xl border-2 transition-all text-left',
                  formData.targetAudience === audience.value
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <p className={cn(
                  'text-sm font-accent',
                  formData.targetAudience === audience.value ? 'text-teal-600' : 'text-gray-600'
                )}>
                  {audience.label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{audience.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Start Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
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
                min={formData.startDate}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-500"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Leave empty for ongoing announcements</p>
          </div>
        </div>

        {/* Active Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <p className="font-accent text-navy-500">Publish Immediately</p>
            <p className="text-sm text-gray-500">Make this announcement visible now</p>
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

        {/* Submit */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
          <Link
            href="/staff/announcements"
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
                Publishing...
              </>
            ) : (
              <>
                <Save size={18} />
                Publish Announcement
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
}

