'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Search,
  Plus,
  Eye,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Wrench,
  RefreshCw,
  DoorOpen,
  DoorClosed,
  Edit,
  Trash2,
  X,
  Ban,
  History,
  CreditCard,
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import {
  getRooms,
  getRoomBookings,
  getRoomStats,
  updateRoomStatus,
  updateRoom,
  deleteRoom,
  createRoom,
  getCurrentBookingForRoom,
  getBookingsForRoom,
  checkInGuest,
  checkOutGuest,
  cancelRoomBooking,
  updateRoomStatusesFromBookings,
  createRoomBooking,
  Room,
  RoomBooking,
} from '@/lib/storage';

const statusConfig = {
  available: { label: 'Available', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  occupied: { label: 'Occupied', color: 'bg-red-100 text-red-700', icon: DoorClosed },
  reserved: { label: 'Reserved', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  maintenance: { label: 'Maintenance', color: 'bg-gray-100 text-gray-700', icon: Wrench },
};

const bookingStatusConfig: Record<string, { label: string; color: string }> = {
  confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-700' },
  'checked-in': { label: 'Checked In', color: 'bg-green-100 text-green-700' },
  'checked-out': { label: 'Checked Out', color: 'bg-gray-100 text-gray-700' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700' },
  'no-show': { label: 'No Show', color: 'bg-orange-100 text-orange-700' },
};

const roomTypeLabels: Record<string, string> = {
  'ocean-view-suite': 'Ocean View Suite',
  'beachfront-villa': 'Beachfront Villa',
  'garden-retreat': 'Garden Retreat',
  'family-suite': 'Family Suite',
  'presidential-suite': 'Presidential Suite',
  'honeymoon-haven': 'Honeymoon Haven',
};

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<RoomBooking[]>([]);
  const [stats, setStats] = useState<ReturnType<typeof getRoomStats> | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'rooms' | 'bookings' | 'history'>('rooms');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<RoomBooking | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);

  const loadData = () => {
    updateRoomStatusesFromBookings();
    setRooms(getRooms());
    setBookings(getRoomBookings());
    setStats(getRoomStats());
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const activeBookings = bookings.filter(b => b.bookingStatus === 'confirmed' || b.bookingStatus === 'checked-in');
  const pastBookings = bookings.filter(b => ['checked-out', 'cancelled', 'no-show'].includes(b.bookingStatus));

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredBookings = (activeTab === 'bookings' ? activeBookings : pastBookings).filter(booking => {
    const matchesSearch = 
      booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.roomNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleStatusChange = (roomId: string, newStatus: Room['status']) => {
    updateRoomStatus(roomId, newStatus);
    loadData();
  };

  const handleCheckIn = (bookingId: string) => {
    checkInGuest(bookingId);
    loadData();
  };

  const handleCheckOut = (bookingId: string) => {
    checkOutGuest(bookingId);
    loadData();
  };

  const handleCancelBooking = () => {
    if (!selectedBooking) return;
    cancelRoomBooking(selectedBooking.id, 'Admin', cancelReason);
    setShowCancelModal(false);
    setCancelReason('');
    setSelectedBooking(null);
    loadData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-ocean-200 border-t-ocean-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading text-navy-500">Room Management</h1>
          <p className="text-gray-500 text-sm">Manage rooms, bookings, and availability</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadData}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
          <button
            onClick={() => setShowNewBookingModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-ocean-500 text-white rounded-lg hover:bg-ocean-600 transition-colors"
          >
            <Plus size={18} />
            New Booking
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Total Rooms</p>
            <p className="text-2xl font-heading text-navy-500">{stats.totalRooms}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Available</p>
            <p className="text-2xl font-heading text-green-600">{stats.available}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Occupied</p>
            <p className="text-2xl font-heading text-red-600">{stats.occupied}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Reserved</p>
            <p className="text-2xl font-heading text-yellow-600">{stats.reserved}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Occupancy Rate</p>
            <p className="text-2xl font-heading text-ocean-600">{stats.occupancyRate}%</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Total Bookings</p>
            <p className="text-2xl font-heading text-purple-600">{stats.totalBookings}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Total Revenue</p>
            <p className="text-lg font-heading text-teal-600">{formatCurrency(stats.totalRevenue)}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-100">
          <div className="flex">
            <button
              onClick={() => setActiveTab('rooms')}
              className={cn(
                'px-6 py-4 font-accent text-sm transition-colors border-b-2',
                activeTab === 'rooms'
                  ? 'text-ocean-500 border-ocean-500'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              )}
            >
              <Home size={16} className="inline mr-2" />
              Rooms ({rooms.filter(r => r.isActive).length})
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={cn(
                'px-6 py-4 font-accent text-sm transition-colors border-b-2',
                activeTab === 'bookings'
                  ? 'text-ocean-500 border-ocean-500'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              )}
            >
              <Calendar size={16} className="inline mr-2" />
              Active Bookings ({activeBookings.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={cn(
                'px-6 py-4 font-accent text-sm transition-colors border-b-2',
                activeTab === 'history'
                  ? 'text-ocean-500 border-ocean-500'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              )}
            >
              <History size={16} className="inline mr-2" />
              Booking History ({pastBookings.length})
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={activeTab === 'rooms' ? 'Search rooms...' : 'Search bookings...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
              />
            </div>
            {activeTab === 'rooms' && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
                <option value="maintenance">Maintenance</option>
              </select>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === 'rooms' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                    <th className="pb-3 font-medium">Room</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Floor</th>
                    <th className="pb-3 font-medium">Capacity</th>
                    <th className="pb-3 font-medium">Price/Night</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Current Guest</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRooms.map((room) => {
                    const currentBooking = getCurrentBookingForRoom(room.id);
                    return (
                      <tr key={room.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="py-3 font-medium text-navy-500">{room.roomNumber}</td>
                        <td className="py-3 text-sm text-gray-600">{roomTypeLabels[room.type]}</td>
                        <td className="py-3 text-sm text-gray-600">{room.floor}</td>
                        <td className="py-3 text-sm text-gray-600">{room.capacity}</td>
                        <td className="py-3 text-sm font-medium text-ocean-600">{formatCurrency(room.pricePerNight)}</td>
                        <td className="py-3">
                          <select
                            value={room.status}
                            onChange={(e) => handleStatusChange(room.id, e.target.value as Room['status'])}
                            className={cn(
                              'px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer',
                              statusConfig[room.status].color
                            )}
                          >
                            <option value="available">Available</option>
                            <option value="occupied">Occupied</option>
                            <option value="reserved">Reserved</option>
                            <option value="maintenance">Maintenance</option>
                          </select>
                        </td>
                        <td className="py-3 text-sm">
                          {currentBooking ? (
                            <div>
                              <p className="font-medium text-navy-500">{currentBooking.guestName}</p>
                              <p className="text-xs text-gray-500">Until {new Date(currentBooking.checkOut).toLocaleDateString()}</p>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-3">
                          <div className="flex gap-1">
                            {currentBooking && currentBooking.bookingStatus === 'confirmed' && (
                              <button
                                onClick={() => handleCheckIn(currentBooking.id)}
                                className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors"
                                title="Check In"
                              >
                                <DoorOpen size={14} />
                              </button>
                            )}
                            {currentBooking && currentBooking.bookingStatus === 'checked-in' && (
                              <button
                                onClick={() => handleCheckOut(currentBooking.id)}
                                className="p-1.5 bg-purple-100 text-purple-600 rounded hover:bg-purple-200 transition-colors"
                                title="Check Out"
                              >
                                <DoorClosed size={14} />
                              </button>
                            )}
                            <button
                              onClick={() => setSelectedRoom(room)}
                              className="p-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                              title="View Details"
                            >
                              <Eye size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {(activeTab === 'bookings' || activeTab === 'history') && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                    <th className="pb-3 font-medium">Booking Code</th>
                    <th className="pb-3 font-medium">Guest</th>
                    <th className="pb-3 font-medium">Room</th>
                    <th className="pb-3 font-medium">Check-in</th>
                    <th className="pb-3 font-medium">Check-out</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Payment</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="py-3 font-mono text-sm text-ocean-500">{booking.bookingCode}</td>
                      <td className="py-3">
                        <p className="font-medium text-navy-500">{booking.guestName}</p>
                        <p className="text-xs text-gray-500">{booking.guestEmail}</p>
                      </td>
                      <td className="py-3 text-sm text-gray-600">{booking.roomNumber}</td>
                      <td className="py-3 text-sm text-gray-600">{new Date(booking.checkIn).toLocaleDateString()}</td>
                      <td className="py-3 text-sm text-gray-600">{new Date(booking.checkOut).toLocaleDateString()}</td>
                      <td className="py-3 text-sm font-medium text-ocean-600">{formatCurrency(booking.totalAmount)}</td>
                      <td className="py-3">
                        <span className={cn(
                          'px-2 py-1 rounded text-xs font-medium',
                          booking.paymentStatus === 'paid' && 'bg-green-100 text-green-700',
                          booking.paymentStatus === 'partial' && 'bg-yellow-100 text-yellow-700',
                          booking.paymentStatus === 'pending' && 'bg-gray-100 text-gray-700',
                          booking.paymentStatus === 'refunded' && 'bg-red-100 text-red-700'
                        )}>
                          {booking.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={cn('px-2 py-1 rounded text-xs font-medium', bookingStatusConfig[booking.bookingStatus]?.color)}>
                          {bookingStatusConfig[booking.bookingStatus]?.label}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="p-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                            title="View Details"
                          >
                            <Eye size={14} />
                          </button>
                          {(booking.bookingStatus === 'confirmed' || booking.bookingStatus === 'checked-in') && (
                            <button
                              onClick={() => {
                                setSelectedBooking(booking);
                                setShowCancelModal(true);
                              }}
                              className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                              title="Cancel Booking"
                            >
                              <Ban size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredBookings.length === 0 && (
                <div className="text-center py-12">
                  <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No bookings found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Room Details Modal */}
      <AnimatePresence>
        {selectedRoom && !showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedRoom(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-heading text-2xl text-navy-500">Room {selectedRoom.roomNumber}</h2>
                  <p className="text-gray-500">{roomTypeLabels[selectedRoom.type]}</p>
                </div>
                <button onClick={() => setSelectedRoom(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-sand-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Floor</p>
                    <p className="text-xl font-heading text-navy-500">{selectedRoom.floor}</p>
                  </div>
                  <div className="bg-sand-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Capacity</p>
                    <p className="text-xl font-heading text-navy-500">{selectedRoom.capacity}</p>
                  </div>
                  <div className="bg-sand-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-xl font-heading text-ocean-600">{formatCurrency(selectedRoom.pricePerNight)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Booking History</p>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {getBookingsForRoom(selectedRoom.id).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-navy-500">{booking.guestName}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={cn('px-2 py-1 rounded text-xs font-medium', bookingStatusConfig[booking.bookingStatus]?.color)}>
                          {bookingStatusConfig[booking.bookingStatus]?.label}
                        </span>
                      </div>
                    ))}
                    {getBookingsForRoom(selectedRoom.id).length === 0 && (
                      <p className="text-center text-gray-400 py-4">No booking history</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {selectedBooking && !showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedBooking(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-heading text-2xl text-navy-500">Booking Details</h2>
                  <p className="text-ocean-500 font-mono">{selectedBooking.bookingCode}</p>
                </div>
                <button onClick={() => setSelectedBooking(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Guest Name</p>
                    <p className="font-medium">{selectedBooking.guestName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Room</p>
                    <p className="font-medium">{selectedBooking.roomNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedBooking.guestEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedBooking.guestPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check-in</p>
                    <p className="font-medium">{new Date(selectedBooking.checkIn).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check-out</p>
                    <p className="font-medium">{new Date(selectedBooking.checkOut).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium text-ocean-600">{formatCurrency(selectedBooking.totalAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount Paid</p>
                    <p className="font-medium text-green-600">{formatCurrency(selectedBooking.amountPaid)}</p>
                  </div>
                </div>

                {selectedBooking.specialRequests && (
                  <div>
                    <p className="text-sm text-gray-500">Special Requests</p>
                    <p className="text-sm bg-sand-50 p-3 rounded-lg">{selectedBooking.specialRequests}</p>
                  </div>
                )}

                {selectedBooking.cancellationReason && (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">Cancellation Reason:</p>
                    <p className="text-sm text-red-700">{selectedBooking.cancellationReason}</p>
                    <p className="text-xs text-red-500 mt-1">
                      Cancelled by {selectedBooking.cancelledBy} on {new Date(selectedBooking.cancelledAt!).toLocaleString()}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  {selectedBooking.bookingStatus === 'confirmed' && (
                    <button
                      onClick={() => {
                        handleCheckIn(selectedBooking.id);
                        setSelectedBooking(null);
                      }}
                      className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Check In
                    </button>
                  )}
                  {selectedBooking.bookingStatus === 'checked-in' && (
                    <button
                      onClick={() => {
                        handleCheckOut(selectedBooking.id);
                        setSelectedBooking(null);
                      }}
                      className="flex-1 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Check Out
                    </button>
                  )}
                  {(selectedBooking.bookingStatus === 'confirmed' || selectedBooking.bookingStatus === 'checked-in') && (
                    <button
                      onClick={() => setShowCancelModal(true)}
                      className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cancel Booking Modal */}
      <AnimatePresence>
        {showCancelModal && selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle size={24} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-navy-500">Cancel Booking</h3>
                  <p className="text-sm text-gray-500">{selectedBooking.bookingCode}</p>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                Are you sure you want to cancel the booking for <strong>{selectedBooking.guestName}</strong>? 
                This action will free up Room <strong>{selectedBooking.roomNumber}</strong>.
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cancellation Reason (Optional)
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Enter reason for cancellation..."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCancelModal(false);
                    setCancelReason('');
                  }}
                  className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleCancelBooking}
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Cancel Booking
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* New Booking Modal */}
      <AnimatePresence>
        {showNewBookingModal && (
          <NewBookingModal
            rooms={rooms.filter(r => r.status === 'available')}
            onClose={() => setShowNewBookingModal(false)}
            onSuccess={() => {
              setShowNewBookingModal(false);
              loadData();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// New Booking Modal Component
function NewBookingModal({ 
  rooms, 
  onClose, 
  onSuccess 
}: { 
  rooms: Room[]; 
  onClose: () => void; 
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    roomId: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkIn: '',
    checkOut: '',
    numberOfGuests: 1,
    specialRequests: '',
    paymentStatus: 'pending' as RoomBooking['paymentStatus'],
  });

  const selectedRoom = rooms.find(r => r.id === formData.roomId);
  const nights = formData.checkIn && formData.checkOut 
    ? Math.ceil((new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const totalAmount = selectedRoom ? selectedRoom.pricePerNight * nights : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom || nights <= 0) return;

    createRoomBooking({
      roomId: formData.roomId,
      roomNumber: selectedRoom.roomNumber,
      roomName: selectedRoom.name,
      guestName: formData.guestName,
      guestEmail: formData.guestEmail,
      guestPhone: formData.guestPhone,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      numberOfGuests: formData.numberOfGuests,
      totalAmount,
      amountPaid: formData.paymentStatus === 'paid' ? totalAmount : 0,
      paymentStatus: formData.paymentStatus,
      bookingStatus: 'confirmed',
      specialRequests: formData.specialRequests,
      createdBy: 'Admin',
    });

    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl text-navy-500">New Booking</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room *</label>
            <select
              value={formData.roomId}
              onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
              required
            >
              <option value="">Select a room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  Room {room.roomNumber} - {roomTypeLabels[room.type]} ({formatCurrency(room.pricePerNight)}/night)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in *</label>
              <input
                type="date"
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out *</label>
              <input
                type="date"
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Guest Name *</label>
            <input
              type="text"
              value={formData.guestName}
              onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={formData.guestEmail}
                onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input
                type="tel"
                value={formData.guestPhone}
                onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
              <input
                type="number"
                value={formData.numberOfGuests}
                onChange={(e) => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) })}
                min={1}
                max={selectedRoom?.capacity || 10}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
              <select
                value={formData.paymentStatus}
                onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as RoomBooking['paymentStatus'] })}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
              >
                <option value="pending">Pending</option>
                <option value="partial">Partial</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
            <textarea
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
              rows={2}
            />
          </div>

          {nights > 0 && selectedRoom && (
            <div className="bg-ocean-50 p-4 rounded-lg">
              <div className="flex justify-between text-sm mb-2">
                <span>{formatCurrency(selectedRoom.pricePerNight)} × {nights} nights</span>
                <span className="font-medium">{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between font-heading text-lg text-ocean-600">
                <span>Total</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.roomId || nights <= 0}
              className="flex-1 py-3 bg-ocean-500 text-white rounded-lg hover:bg-ocean-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Booking
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
