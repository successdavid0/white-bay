'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Calendar,
  Clock,
  MapPin,
  Users,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getEvents, updateEvent, deleteEvent, ResortEvent } from '@/lib/storage';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'dining', label: 'Dining' },
  { value: 'wellness', label: 'Wellness' },
  { value: 'sports', label: 'Sports' },
  { value: 'kids', label: 'Kids' },
  { value: 'special', label: 'Special' },
];

export default function StaffEventsPage() {
  const [events, setEvents] = useState<ResortEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    const data = getEvents();
    setEvents(data);
    setLoading(false);
  };

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    updateEvent(id, { isActive: !currentStatus });
    loadEvents();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
      loadEvents();
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'active' && event.isActive) ||
      (statusFilter === 'inactive' && !event.isActive);
    return matchesSearch && matchesCategory && matchesStatus;
  });

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
          <h1 className="text-2xl font-heading text-navy-500">Events Management</h1>
          <p className="text-gray-500">Create and manage resort events</p>
        </div>
        <Link
          href="/staff/events/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white font-accent font-medium rounded-xl hover:bg-teal-600 transition-colors"
        >
          <Plus size={20} />
          Create Event
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-500"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-heading text-navy-500 mb-2">No Events Found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Create your first event to get started'}
            </p>
            <Link
              href="/staff/events/new"
              className="inline-flex items-center gap-2 text-teal-500 font-accent hover:text-teal-600"
            >
              <Plus size={16} />
              Create Event
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  'p-4 md:p-6 hover:bg-gray-50 transition-colors',
                  !event.isActive && 'bg-gray-50/50'
                )}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Date Badge */}
                  <div className={cn(
                    'w-16 h-16 rounded-xl flex flex-col items-center justify-center flex-shrink-0',
                    event.isActive ? 'bg-teal-100 text-teal-600' : 'bg-gray-200 text-gray-500'
                  )}>
                    <span className="text-xs font-accent">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-2xl font-heading leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>

                  {/* Event Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={cn(
                          'font-heading text-lg',
                          event.isActive ? 'text-navy-500' : 'text-gray-400'
                        )}>
                          {event.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-1 mt-1">
                          {event.description}
                        </p>
                      </div>
                      <span className={cn(
                        'px-3 py-1 text-xs font-accent rounded-full flex-shrink-0 ml-4',
                        event.category === 'wellness' && 'bg-green-100 text-green-700',
                        event.category === 'dining' && 'bg-orange-100 text-orange-700',
                        event.category === 'entertainment' && 'bg-purple-100 text-purple-700',
                        event.category === 'sports' && 'bg-blue-100 text-blue-700',
                        event.category === 'kids' && 'bg-pink-100 text-pink-700',
                        event.category === 'special' && 'bg-gold-100 text-gold-700',
                      )}>
                        {event.category}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {event.location}
                      </span>
                      {event.capacity && (
                        <span className="flex items-center gap-1">
                          <Users size={14} />
                          {event.registered}/{event.capacity}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(event.id, event.isActive)}
                      className={cn(
                        'p-2 rounded-lg transition-colors',
                        event.isActive
                          ? 'text-teal-500 hover:bg-teal-50'
                          : 'text-gray-400 hover:bg-gray-100'
                      )}
                      title={event.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {event.isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                    </button>
                    <Link
                      href={`/staff/events/${event.id}/edit`}
                      className="p-2 text-gray-400 hover:text-teal-500 hover:bg-teal-50 rounded-lg transition-colors"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>
          Showing {filteredEvents.length} of {events.length} events
        </p>
        <p>
          {events.filter(e => e.isActive).length} active • {events.filter(e => !e.isActive).length} inactive
        </p>
      </div>
    </div>
  );
}

