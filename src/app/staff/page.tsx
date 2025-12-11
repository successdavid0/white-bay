'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  Users,
  Megaphone,
  ArrowRight,
  Clock,
  MapPin,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getStaffDashboardStats, ResortEvent, Guest } from '@/lib/storage';

interface DashboardStats {
  activeEvents: number;
  totalGuests: number;
  activeAnnouncements: number;
  newMessages: number;
  upcomingEvents: ResortEvent[];
  recentGuests: Guest[];
}

export default function StaffDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getStaffDashboardStats();
    setStats(data);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin" />
      </div>
    );
  }

  const quickStats = [
    {
      title: 'Active Events',
      value: stats?.activeEvents || 0,
      icon: Calendar,
      color: 'from-teal-500 to-teal-600',
      href: '/staff/events',
    },
    {
      title: 'Registered Guests',
      value: stats?.totalGuests || 0,
      icon: Users,
      color: 'from-ocean-500 to-ocean-600',
      href: '/staff/guests',
    },
    {
      title: 'Announcements',
      value: stats?.activeAnnouncements || 0,
      icon: Megaphone,
      color: 'from-purple-500 to-purple-600',
      href: '/staff/announcements',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
        <h1 className="font-heading text-2xl mb-2">Welcome to Staff Portal</h1>
        <p className="text-white/80">
          Manage events, register guests, and keep the resort running smoothly.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={stat.href}
                className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-r',
                    stat.color
                  )}>
                    <Icon size={24} />
                  </div>
                  <ArrowRight size={20} className="text-gray-300" />
                </div>
                <div className="mt-4">
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className="text-3xl font-heading text-navy-500 mt-1">{stat.value}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm"
        >
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-heading text-lg text-navy-500">Upcoming Events</h2>
            <Link
              href="/staff/events/new"
              className="text-teal-500 text-sm font-accent hover:text-teal-600 flex items-center gap-1"
            >
              <Plus size={16} />
              Add New
            </Link>
          </div>

          <div className="p-4">
            {stats?.upcomingEvents && stats.upcomingEvents.length > 0 ? (
              <div className="space-y-3">
                {stats.upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex flex-col items-center justify-center text-teal-600">
                      <span className="text-xs font-accent">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-lg font-heading leading-none">
                        {new Date(event.date).getDate()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-accent font-medium text-navy-500">{event.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <span className={cn(
                      'px-2 py-1 text-xs rounded-full',
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
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No upcoming events</p>
                <Link
                  href="/staff/events/new"
                  className="text-teal-500 text-sm font-accent hover:underline mt-2 inline-block"
                >
                  Create your first event
                </Link>
              </div>
            )}
          </div>

          {stats?.upcomingEvents && stats.upcomingEvents.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-100">
              <Link
                href="/staff/events"
                className="text-teal-500 text-sm font-accent hover:underline"
              >
                View all events →
              </Link>
            </div>
          )}
        </motion.div>

        {/* Recent Guests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm"
        >
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-heading text-lg text-navy-500">Recent Guests</h2>
            <Link
              href="/staff/guests/new"
              className="text-teal-500 text-sm font-accent hover:text-teal-600 flex items-center gap-1"
            >
              <Plus size={16} />
              Register Guest
            </Link>
          </div>

          <div className="p-4">
            {stats?.recentGuests && stats.recentGuests.length > 0 ? (
              <div className="space-y-3">
                {stats.recentGuests.map((guest) => (
                  <div
                    key={guest.id}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-10 bg-ocean-100 rounded-full flex items-center justify-center text-ocean-600 font-medium">
                      {guest.firstName.charAt(0)}{guest.lastName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-accent font-medium text-navy-500">
                        {guest.firstName} {guest.lastName}
                        {guest.vipStatus && (
                          <span className="ml-2 px-2 py-0.5 bg-gold-100 text-gold-700 text-xs rounded-full">
                            VIP
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-gray-500">{guest.email}</p>
                    </div>
                    {guest.roomNumber && (
                      <span className="text-sm text-gray-500">Room {guest.roomNumber}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No guests registered</p>
                <Link
                  href="/staff/guests/new"
                  className="text-teal-500 text-sm font-accent hover:underline mt-2 inline-block"
                >
                  Register a guest
                </Link>
              </div>
            )}
          </div>

          {stats?.recentGuests && stats.recentGuests.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-100">
              <Link
                href="/staff/guests"
                className="text-teal-500 text-sm font-accent hover:underline"
              >
                View all guests →
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'New Event', icon: Calendar, href: '/staff/events/new', color: 'bg-teal-500' },
          { label: 'Register Guest', icon: Users, href: '/staff/guests/new', color: 'bg-ocean-500' },
          { label: 'Announcement', icon: Megaphone, href: '/staff/announcements/new', color: 'bg-purple-500' },
          { label: 'View Website', icon: ArrowRight, href: '/', color: 'bg-gray-500' },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-3 group"
            >
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center text-white',
                action.color
              )}>
                <Icon size={20} />
              </div>
              <span className="text-sm font-medium text-navy-500 group-hover:text-teal-500 transition-colors">
                {action.label}
              </span>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}

