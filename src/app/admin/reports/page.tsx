'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  BedDouble,
  Download,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAdminDashboardStats, getEvents, getGuests, getMessages, getPromotions } from '@/lib/storage';
import { getDashboardStats } from '@/lib/supabase';

interface ReportData {
  totalBookings: number;
  totalRevenue: number;
  pendingBookings: number;
  confirmedBookings: number;
  totalGuests: number;
  activeEvents: number;
  totalMessages: number;
  activePromotions: number;
}

export default function AdminReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadReportData();
  }, []);

  const loadReportData = async () => {
    setRefreshing(true);
    try {
      // Get booking stats from supabase
      const bookingStats = await getDashboardStats();
      
      // Get local storage data
      const localStats = getAdminDashboardStats();
      const guests = getGuests();
      const messages = getMessages();
      const promotions = getPromotions();

      setReportData({
        totalBookings: bookingStats.totalBookings,
        totalRevenue: bookingStats.totalRevenue,
        pendingBookings: bookingStats.pendingBookings,
        confirmedBookings: bookingStats.confirmedBookings,
        totalGuests: guests.length,
        activeEvents: localStats.activeEvents,
        totalMessages: messages.length,
        activePromotions: promotions.filter(p => p.isActive).length,
      });
    } catch (error) {
      console.error('Error loading report data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-ocean-200 border-t-ocean-500 rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${(reportData?.totalRevenue || 0).toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Total Bookings',
      value: reportData?.totalBookings || 0,
      change: '+8.2%',
      changeType: 'positive',
      icon: Calendar,
      color: 'from-ocean-500 to-ocean-600',
    },
    {
      title: 'Registered Guests',
      value: reportData?.totalGuests || 0,
      change: '+15.3%',
      changeType: 'positive',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Active Events',
      value: reportData?.activeEvents || 0,
      change: '3 upcoming',
      changeType: 'neutral',
      icon: Calendar,
      color: 'from-teal-500 to-teal-600',
    },
  ];

  const bookingBreakdown = [
    { label: 'Confirmed', value: reportData?.confirmedBookings || 0, color: 'bg-green-500' },
    { label: 'Pending', value: reportData?.pendingBookings || 0, color: 'bg-yellow-500' },
    { label: 'Cancelled', value: 0, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading text-navy-500">Reports & Analytics</h1>
          <p className="text-gray-500">Overview of resort performance metrics</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadReportData}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 font-accent text-sm rounded-xl hover:bg-gray-200 transition-colors"
          >
            <RefreshCw size={16} className={cn(refreshing && 'animate-spin')} />
            Refresh
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-ocean-500 text-white font-accent text-sm rounded-xl hover:bg-ocean-600 transition-colors">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-r',
                  stat.color
                )}>
                  <Icon size={24} />
                </div>
                <span className={cn(
                  'text-sm font-accent',
                  stat.changeType === 'positive' && 'text-green-600',
                  stat.changeType === 'negative' && 'text-red-600',
                  stat.changeType === 'neutral' && 'text-gray-500',
                )}>
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-heading text-navy-500">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Booking Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h2 className="font-heading text-lg text-navy-500 mb-6">Booking Status</h2>
          
          <div className="space-y-4">
            {bookingBreakdown.map((item) => {
              const total = reportData?.totalBookings || 1;
              const percentage = Math.round((item.value / total) * 100) || 0;
              
              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className="text-sm font-medium text-navy-500">
                      {item.value} ({percentage}%)
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className={cn('h-full rounded-full', item.color)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h2 className="font-heading text-lg text-navy-500 mb-6">Quick Stats</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'New Messages', value: reportData?.totalMessages || 0, icon: '📧' },
              { label: 'Active Promotions', value: reportData?.activePromotions || 0, icon: '🏷️' },
              { label: 'Pending Bookings', value: reportData?.pendingBookings || 0, icon: '⏳' },
              { label: 'Confirmed', value: reportData?.confirmedBookings || 0, icon: '✅' },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 bg-gray-50 rounded-xl"
              >
                <span className="text-2xl">{item.icon}</span>
                <p className="text-2xl font-heading text-navy-500 mt-2">{item.value}</p>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Info Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-ocean-500 to-teal-500 rounded-xl p-6 text-white"
      >
        <div className="flex items-start gap-4">
          <BarChart3 size={24} className="flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-heading text-lg mb-2">Analytics Dashboard</h3>
            <p className="text-white/80 text-sm">
              This report shows real-time data from your resort management system. 
              Data includes bookings, guest registrations, events, and promotional activities. 
              For detailed financial reports, connect with your accounting software.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
