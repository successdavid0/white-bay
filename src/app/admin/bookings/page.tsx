'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Clock,
  Calendar,
  User,
  Mail,
  Phone,
  CreditCard,
  RefreshCw,
  Bell
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { getAdminBookings, subscribeToBookings, BookingWithGuest } from '@/lib/supabase';

// Transform database booking to display format
interface DisplayBooking {
  id: string;
  guest: { name: string; email: string; phone: string };
  room: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  amount: number;
  createdAt: string;
  specialRequests?: string;
}

function transformBooking(booking: BookingWithGuest): DisplayBooking {
  return {
    id: booking.booking_code || booking.id,
    guest: {
      name: `${booking.guest_first_name || ''} ${booking.guest_last_name || ''}`.trim() || 'Guest',
      email: booking.guest_email || '',
      phone: booking.guest_phone || '',
    },
    room: booking.room_name || 'Unknown Room',
    checkIn: booking.check_in,
    checkOut: booking.check_out,
    nights: booking.nights || 1,
    guests: booking.guests,
    status: booking.booking_status as DisplayBooking['status'],
    paymentStatus: booking.payment_status as DisplayBooking['paymentStatus'],
    amount: booking.total_amount,
    createdAt: booking.created_at,
    specialRequests: booking.special_requests,
  };
}

type Booking = DisplayBooking;

export default function AdminBookingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [newBookingAlert, setNewBookingAlert] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch bookings from database
  const fetchBookings = useCallback(async () => {
    try {
      const data = await getAdminBookings();
      const transformedBookings = data.map(transformBooking);
      setBookings(transformedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial fetch and real-time subscription
  useEffect(() => {
    fetchBookings();

    // Subscribe to real-time updates
    const unsubscribe = subscribeToBookings((payload) => {
      if (payload.eventType === 'INSERT' && payload.new) {
        // New booking received!
        const newBooking = transformBooking(payload.new);
        setBookings(prev => [newBooking, ...prev]);
        setNewBookingAlert(true);
        
        // Auto-hide notification after 5 seconds
        setTimeout(() => setNewBookingAlert(false), 5000);
      } else if (payload.eventType === 'UPDATE' && payload.new) {
        // Booking updated
        const updatedBooking = transformBooking(payload.new);
        setBookings(prev => 
          prev.map(b => b.id === updatedBooking.id ? updatedBooking : b)
        );
      } else if (payload.eventType === 'DELETE' && payload.old) {
        // Booking deleted
        setBookings(prev => 
          prev.filter(b => b.id !== (payload.old?.booking_code || payload.old?.id))
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, [fetchBookings]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
      <AnimatePresence>
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
              <p className="text-sm text-white/80">A new reservation has just been made</p>
            </div>
            <button 
              onClick={() => setNewBookingAlert(false)}
              className="ml-4 p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading text-navy-500">Bookings</h1>
          <p className="text-navy-500/60">
            Manage all resort bookings 
            <span className="ml-2 px-2 py-0.5 bg-ocean-100 text-ocean-600 text-xs rounded-full">
              {bookings.length} total
            </span>
          </p>
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
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-navy-500 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by booking ID, guest name, or room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-500"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-navy-500/60 bg-gray-50">
                <th className="px-6 py-4 font-medium">Booking ID</th>
                <th className="px-6 py-4 font-medium">Guest</th>
                <th className="px-6 py-4 font-medium">Room</th>
                <th className="px-6 py-4 font-medium">Dates</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-ocean-500">{booking.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-navy-500">{booking.guest.name}</p>
                      <p className="text-xs text-navy-500/50">{booking.guest.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-navy-500">{booking.room}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-navy-500">{booking.checkIn}</p>
                      <p className="text-navy-500/50">to {booking.checkOut}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'px-3 py-1 text-xs font-medium rounded-full',
                      booking.status === 'confirmed' && 'bg-green-100 text-green-700',
                      booking.status === 'pending' && 'bg-yellow-100 text-yellow-700',
                      booking.status === 'cancelled' && 'bg-red-100 text-red-700'
                    )}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'px-3 py-1 text-xs font-medium rounded-full',
                      booking.paymentStatus === 'paid' && 'bg-green-100 text-green-700',
                      booking.paymentStatus === 'pending' && 'bg-yellow-100 text-yellow-700',
                      booking.paymentStatus === 'refunded' && 'bg-gray-100 text-gray-700'
                    )}>
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-navy-500">
                      {formatCurrency(booking.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="p-2 text-navy-500/50 hover:text-ocean-500 hover:bg-ocean-50 rounded-lg transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-navy-500/50 hover:text-ocean-500 hover:bg-ocean-50 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-navy-500/50 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="px-6 py-16 text-center">
            <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-heading text-navy-500 mb-2">No Bookings Found</h3>
            <p className="text-navy-500/60">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Bookings will appear here when guests make reservations'}
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-navy-500/60">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              <ChevronLeft size={16} />
            </button>
            <button className="px-3 py-1 bg-ocean-500 text-white rounded-lg text-sm">1</button>
            {bookings.length > 10 && (
            <button className="px-3 py-1 text-navy-500 hover:bg-gray-100 rounded-lg text-sm">2</button>
            )}
            {bookings.length > 20 && (
            <button className="px-3 py-1 text-navy-500 hover:bg-gray-100 rounded-lg text-sm">3</button>
            )}
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Booking Detail Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy-500/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
                <div>
                  <h2 className="font-heading text-xl text-navy-500">Booking Details</h2>
                  <p className="text-sm text-navy-500/50">{selectedBooking.id}</p>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Status */}
                <div className="flex items-center gap-4">
                  <span className={cn(
                    'px-4 py-2 text-sm font-medium rounded-full',
                    selectedBooking.status === 'confirmed' && 'bg-green-100 text-green-700',
                    selectedBooking.status === 'pending' && 'bg-yellow-100 text-yellow-700',
                    selectedBooking.status === 'cancelled' && 'bg-red-100 text-red-700'
                  )}>
                    {selectedBooking.status === 'confirmed' && <Check size={14} className="inline mr-1" />}
                    {selectedBooking.status === 'pending' && <Clock size={14} className="inline mr-1" />}
                    {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                  </span>
                  <span className={cn(
                    'px-4 py-2 text-sm font-medium rounded-full',
                    selectedBooking.paymentStatus === 'paid' && 'bg-green-100 text-green-700',
                    selectedBooking.paymentStatus === 'pending' && 'bg-yellow-100 text-yellow-700',
                    selectedBooking.paymentStatus === 'refunded' && 'bg-gray-100 text-gray-700'
                  )}>
                    <CreditCard size={14} className="inline mr-1" />
                    Payment {selectedBooking.paymentStatus}
                  </span>
                </div>

                {/* Guest Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-accent font-medium text-navy-500 mb-3">Guest Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <User size={18} className="text-ocean-500" />
                      <div>
                        <p className="text-xs text-navy-500/50">Name</p>
                        <p className="text-sm text-navy-500">{selectedBooking.guest.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-ocean-500" />
                      <div>
                        <p className="text-xs text-navy-500/50">Email</p>
                        <p className="text-sm text-navy-500">{selectedBooking.guest.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-ocean-500" />
                      <div>
                        <p className="text-xs text-navy-500/50">Phone</p>
                        <p className="text-sm text-navy-500">{selectedBooking.guest.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-accent font-medium text-navy-500 mb-3">Booking Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-navy-500/50">Room</p>
                      <p className="text-sm text-navy-500 font-medium">{selectedBooking.room}</p>
                    </div>
                    <div>
                      <p className="text-xs text-navy-500/50">Check-in</p>
                      <p className="text-sm text-navy-500">{selectedBooking.checkIn}</p>
                    </div>
                    <div>
                      <p className="text-xs text-navy-500/50">Check-out</p>
                      <p className="text-sm text-navy-500">{selectedBooking.checkOut}</p>
                    </div>
                    <div>
                      <p className="text-xs text-navy-500/50">Nights</p>
                      <p className="text-sm text-navy-500">{selectedBooking.nights}</p>
                    </div>
                    <div>
                      <p className="text-xs text-navy-500/50">Guests</p>
                      <p className="text-sm text-navy-500">{selectedBooking.guests}</p>
                    </div>
                    <div>
                      <p className="text-xs text-navy-500/50">Booked On</p>
                      <p className="text-sm text-navy-500">{selectedBooking.createdAt}</p>
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="bg-ocean-50 rounded-xl p-4 flex items-center justify-between">
                  <span className="font-accent text-navy-500">Total Amount</span>
                  <span className="font-heading text-2xl text-ocean-500">
                    {formatCurrency(selectedBooking.amount)}
                  </span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
                {selectedBooking.status === 'pending' && (
                  <>
                    <button className="px-4 py-2 border border-red-200 text-red-600 rounded-xl text-sm hover:bg-red-50 transition-colors">
                      Decline
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm hover:bg-green-600 transition-colors">
                      Approve
                    </button>
                  </>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <button className="px-4 py-2 bg-ocean-500 text-white rounded-xl text-sm hover:bg-ocean-600 transition-colors">
                    Send Reminder
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

