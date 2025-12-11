'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  BedDouble,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Bell,
  RefreshCw
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { getDashboardStats, subscribeToBookings, BookingWithGuest } from '@/lib/supabase';

interface DashboardStats {
  totalRevenue: number;
  totalBookings: number;
  recentBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  bookings: BookingWithGuest[];
}

interface DisplayBooking {
  id: string;
  guest: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: string;
  amount: string;
}

const roomOccupancy = [
  { name: 'Ocean View Suite', occupied: 85, color: 'bg-ocean-500' },
  { name: 'Beachfront Villa', occupied: 92, color: 'bg-teal-500' },
  { name: 'Honeymoon Haven', occupied: 78, color: 'bg-pink-500' },
  { name: 'Presidential Suite', occupied: 65, color: 'bg-gold-400' },
  { name: 'Garden Retreat', occupied: 71, color: 'bg-green-500' },
  { name: 'Family Suite', occupied: 88, color: 'bg-purple-500' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<DisplayBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [newBookingAlert, setNewBookingAlert] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
      
      // Transform bookings for display
      const displayBookings = data.bookings.map((booking: BookingWithGuest) => ({
        id: booking.booking_code || booking.id,
        guest: `${booking.guest_first_name || ''} ${booking.guest_last_name || ''}`.trim() || 'Guest',
        room: booking.room_name || 'Unknown Room',
        checkIn: booking.check_in,
        checkOut: booking.check_out,
        status: booking.booking_status,
        amount: formatCurrency(booking.total_amount || 0),
      }));
      setRecentBookings(displayBookings);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();

    // Subscribe to real-time updates
    const unsubscribe = subscribeToBookings((payload) => {
      if (payload.eventType === 'INSERT' && payload.new) {
        // New booking received - refresh data and show alert
        fetchDashboardData();
        setNewBookingAlert(true);
        setTimeout(() => setNewBookingAlert(false), 5000);
      } else if (payload.eventType === 'UPDATE') {
        // Booking updated - refresh data
        fetchDashboardData();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [fetchDashboardData]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  // Calculate stats for display
  const displayStats = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats?.totalRevenue || 0),
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Total Bookings',
      value: String(stats?.totalBookings || 0),
      change: '+8.2%',
      trend: 'up' as const,
      icon: Calendar,
      color: 'from-ocean-500 to-ocean-600',
    },
    {
      title: 'Pending Bookings',
      value: String(stats?.pendingBookings || 0),
      change: stats?.pendingBookings ? `${stats.pendingBookings} awaiting` : 'None',
      trend: 'up' as const,
      icon: BedDouble,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Confirmed',
      value: String(stats?.confirmedBookings || 0),
      change: '+15.3%',
      trend: 'up' as const,
      icon: Users,
      color: 'from-gold-400 to-gold-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 border-4 border-ocean-200 border-t-ocean-500 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* New Booking Alert */}
      {newBookingAlert && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-24 right-6 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bell size={20} />
          </div>
          <div>
            <p className="font-accent font-semibold">New Booking Received!</p>
            <p className="text-sm text-white/80">Dashboard updated with new data</p>
          </div>
        </motion.div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading text-navy-500">Dashboard</h1>
          <p className="text-navy-500/60">Welcome back! Here&apos;s what&apos;s happening at WhiteBay.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-navy-500 hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
          <select className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-navy-500 focus:outline-none focus:border-ocean-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>This year</option>
          </select>
          <button className="px-4 py-2 bg-ocean-500 text-white rounded-xl text-sm font-medium hover:bg-ocean-600 transition-colors">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-r',
                  stat.color
                )}>
                  <Icon size={24} />
                </div>
                <span className={cn(
                  'flex items-center gap-1 text-sm font-medium',
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                )}>
                  {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-navy-500/60 text-sm">{stat.title}</p>
                <p className="text-2xl font-heading text-navy-500 mt-1">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm"
        >
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-heading text-lg text-navy-500">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-ocean-500 text-sm font-medium hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-navy-500/60 border-b border-gray-100">
                  <th className="px-6 py-3 font-medium">Booking ID</th>
                  <th className="px-6 py-3 font-medium">Guest</th>
                  <th className="px-6 py-3 font-medium">Room</th>
                  <th className="px-6 py-3 font-medium">Check-in</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <Calendar size={40} className="mx-auto text-gray-300 mb-3" />
                      <p className="text-navy-500/60">No bookings yet</p>
                      <p className="text-navy-500/40 text-sm">Bookings will appear here when guests make reservations</p>
                    </td>
                  </tr>
                ) : (
                  recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-4 text-sm font-mono text-ocean-500">
                      {booking.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-navy-500">
                      {booking.guest}
                    </td>
                    <td className="px-6 py-4 text-sm text-navy-500/70">
                      {booking.room}
                    </td>
                    <td className="px-6 py-4 text-sm text-navy-500/70">
                      {booking.checkIn}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        'px-2 py-1 text-xs font-medium rounded-full',
                        booking.status === 'confirmed' && 'bg-green-100 text-green-700',
                        booking.status === 'pending' && 'bg-yellow-100 text-yellow-700',
                        booking.status === 'cancelled' && 'bg-red-100 text-red-700'
                      )}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-navy-500">
                      {booking.amount}
                    </td>
                    <td className="px-6 py-4">
                        <Link href="/admin/bookings" className="text-navy-500/50 hover:text-navy-500">
                        <MoreHorizontal size={18} />
                        </Link>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Room Occupancy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm"
        >
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-heading text-lg text-navy-500">Room Occupancy</h2>
          </div>
          <div className="p-6 space-y-4">
            {roomOccupancy.map((room) => (
              <div key={room.name}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-navy-500/70">{room.name}</span>
                  <span className="font-medium text-navy-500">{room.occupied}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${room.occupied}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={cn('h-full rounded-full', room.color)}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Revenue Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-lg text-navy-500">Revenue Overview</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-ocean-500 rounded-full" />
              <span className="text-sm text-navy-500/60">This Year</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-ocean-200 rounded-full" />
              <span className="text-sm text-navy-500/60">Last Year</span>
            </div>
          </div>
        </div>
        
        {/* Simple chart visualization */}
        <div className="h-64 flex items-end justify-between gap-2">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => {
            const currentHeight = Math.random() * 80 + 20;
            const lastHeight = Math.random() * 60 + 10;
            return (
              <div key={month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end justify-center gap-1 h-48">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${lastHeight}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="w-2 bg-ocean-200 rounded-t"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${currentHeight}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 + 0.1 }}
                    className="w-2 bg-ocean-500 rounded-t"
                  />
                </div>
                <span className="text-xs text-navy-500/50">{month}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {[
          { label: 'Add Room', icon: BedDouble, color: 'bg-purple-500' },
          { label: 'Send Notification', icon: Users, color: 'bg-gold-400' },
          { label: 'Generate Report', icon: TrendingUp, color: 'bg-teal-500' },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-3 group"
            >
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center text-white',
                action.color
              )}>
                <Icon size={20} />
              </div>
              <span className="text-sm font-medium text-navy-500 group-hover:text-ocean-500 transition-colors">
                {action.label}
              </span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}

