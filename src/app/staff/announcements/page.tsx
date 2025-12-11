'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Plus,
  Megaphone,
  AlertTriangle,
  Info,
  Bell,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAnnouncements, updateAnnouncement, deleteAnnouncement, Announcement } from '@/lib/storage';

const priorityConfig = {
  low: { label: 'Low', icon: Info, color: 'bg-gray-100 text-gray-600' },
  medium: { label: 'Medium', icon: Bell, color: 'bg-blue-100 text-blue-600' },
  high: { label: 'High', icon: AlertTriangle, color: 'bg-orange-100 text-orange-600' },
  urgent: { label: 'Urgent', icon: AlertTriangle, color: 'bg-red-100 text-red-600' },
};

const audienceLabels = {
  all: 'Everyone',
  guests: 'Guests Only',
  staff: 'Staff Only',
};

export default function StaffAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = () => {
    const data = getAnnouncements();
    setAnnouncements(data);
    setLoading(false);
  };

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    updateAnnouncement(id, { isActive: !currentStatus });
    loadAnnouncements();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      deleteAnnouncement(id);
      loadAnnouncements();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading text-navy-500">Announcements</h1>
          <p className="text-gray-500">Create and manage guest announcements</p>
        </div>
        <Link
          href="/staff/announcements/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white font-accent font-medium rounded-xl hover:bg-teal-600 transition-colors"
        >
          <Plus size={20} />
          New Announcement
        </Link>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm text-center py-16">
            <Megaphone size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-heading text-navy-500 mb-2">No Announcements</h3>
            <p className="text-gray-500 mb-4">Create your first announcement</p>
            <Link
              href="/staff/announcements/new"
              className="inline-flex items-center gap-2 text-teal-500 font-accent hover:text-teal-600"
            >
              <Plus size={16} />
              Create Announcement
            </Link>
          </div>
        ) : (
          announcements.map((announcement, index) => {
            const PriorityIcon = priorityConfig[announcement.priority].icon;
            return (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  'bg-white rounded-xl shadow-sm overflow-hidden',
                  !announcement.isActive && 'opacity-60'
                )}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={cn(
                          'inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium',
                          priorityConfig[announcement.priority].color
                        )}>
                          <PriorityIcon size={12} />
                          {priorityConfig[announcement.priority].label}
                        </span>
                        <span className="text-xs text-gray-400">
                          {audienceLabels[announcement.targetAudience]}
                        </span>
                      </div>
                      
                      <h3 className="font-heading text-lg text-navy-500 mb-2">
                        {announcement.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {announcement.content}
                      </p>

                      <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          From {new Date(announcement.startDate).toLocaleDateString()}
                        </span>
                        {announcement.endDate && (
                          <span>
                            Until {new Date(announcement.endDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleActive(announcement.id, announcement.isActive)}
                        className={cn(
                          'p-2 rounded-lg transition-colors',
                          announcement.isActive
                            ? 'text-teal-500 hover:bg-teal-50'
                            : 'text-gray-400 hover:bg-gray-100'
                        )}
                        title={announcement.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {announcement.isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                      </button>
                      <Link
                        href={`/staff/announcements/${announcement.id}/edit`}
                        className="p-2 text-gray-400 hover:text-teal-500 hover:bg-teal-50 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(announcement.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}

