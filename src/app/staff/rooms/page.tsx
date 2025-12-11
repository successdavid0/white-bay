'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Home,
  Search,
  Filter,
  Eye,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Wrench,
  RefreshCw,
  Plus,
  DoorOpen,
  DoorClosed,
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import {
  getRooms,
  getRoomBookings,
  getRoomStats,
  updateRoomStatus,
  getCurrentBookingForRoom,
  checkInGuest,
  checkOutGuest,
  updateRoomStatusesFromBookings,
  Room,
  RoomBooking,
} from '@/lib/storage';

const statusConfig = {
  available: { label: 'Available', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  occupied: { label: 'Occupied', color: 'bg-red-100 text-red-700', icon: DoorClosed },
  reserved: { label: 'Reserved', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  maintenance: { label: 'Maintenance', color: 'bg-gray-100 text-gray-700', icon: Wrench },
};

const roomTypeLabels: Record<string, string> = {
  'ocean-view-suite': 'Ocean View Suite',
  'beachfront-villa': 'Beachfront Villa',
  'garden-retreat': 'Garden Retreat',
  'family-suite': 'Family Suite',
  'presidential-suite': 'Presidential Suite',
  'honeymoon-haven': 'Honeymoon Haven',
};

export default function StaffRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<RoomBooking[]>([]);
  const [stats, setStats] = useState<ReturnType<typeof getRoomStats> | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

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

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    const matchesType = typeFilter === 'all' || room.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType && room.isActive;
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

  const getRoomCurrentBooking = (roomId: string) => {
    return getCurrentBookingForRoom(roomId);
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
          <p className="text-gray-500 text-sm">View and manage room availability</p>
        </div>
        <button
          onClick={loadData}
          className="flex items-center gap-2 px-4 py-2 bg-ocean-500 text-white rounded-lg hover:bg-ocean-600 transition-colors"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Home size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-heading text-navy-500">{stats.totalRooms}</p>
                <p className="text-xs text-gray-500">Total Rooms</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-heading text-green-600">{stats.available}</p>
                <p className="text-xs text-gray-500">Available</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <DoorClosed size={20} className="text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-heading text-red-600">{stats.occupied}</p>
                <p className="text-xs text-gray-500">Occupied</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-heading text-yellow-600">{stats.reserved}</p>
                <p className="text-xs text-gray-500">Reserved</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-ocean-100 rounded-lg flex items-center justify-center">
                <DoorOpen size={20} className="text-ocean-600" />
              </div>
              <div>
                <p className="text-2xl font-heading text-ocean-600">{stats.todayCheckIns}</p>
                <p className="text-xs text-gray-500">Check-ins Today</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-heading text-purple-600">{stats.occupancyRate}%</p>
                <p className="text-xs text-gray-500">Occupancy</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by room number or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
            />
          </div>
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
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
          >
            <option value="all">All Types</option>
            {Object.entries(roomTypeLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredRooms.map((room) => {
          const StatusIcon = statusConfig[room.status].icon;
          const currentBooking = getRoomCurrentBooking(room.id);
          
          return (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'bg-white rounded-xl p-4 shadow-sm border-2 transition-all cursor-pointer hover:shadow-md',
                room.status === 'available' && 'border-green-200',
                room.status === 'occupied' && 'border-red-200',
                room.status === 'reserved' && 'border-yellow-200',
                room.status === 'maintenance' && 'border-gray-200'
              )}
              onClick={() => setSelectedRoom(room)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-heading text-lg text-navy-500">Room {room.roomNumber}</h3>
                  <p className="text-sm text-gray-500">{roomTypeLabels[room.type]}</p>
                </div>
                <span className={cn('px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1', statusConfig[room.status].color)}>
                  <StatusIcon size={12} />
                  {statusConfig[room.status].label}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users size={14} />
                  <span>Capacity: {room.capacity} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home size={14} />
                  <span>Floor {room.floor}</span>
                </div>
                <div className="font-medium text-ocean-600">
                  {formatCurrency(room.pricePerNight)}/night
                </div>
              </div>

              {currentBooking && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Current Guest:</p>
                  <p className="text-sm font-medium text-navy-500">{currentBooking.guestName}</p>
                  <p className="text-xs text-gray-500">
                    Check-out: {new Date(currentBooking.checkOut).toLocaleDateString()}
                  </p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                {room.status === 'available' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(room.id, 'maintenance');
                    }}
                    className="flex-1 text-xs px-2 py-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                  >
                    Set Maintenance
                  </button>
                )}
                {room.status === 'maintenance' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(room.id, 'available');
                    }}
                    className="flex-1 text-xs px-2 py-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors"
                  >
                    Mark Available
                  </button>
                )}
                {currentBooking && currentBooking.bookingStatus === 'confirmed' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCheckIn(currentBooking.id);
                    }}
                    className="flex-1 text-xs px-2 py-1.5 bg-ocean-100 text-ocean-600 rounded hover:bg-ocean-200 transition-colors"
                  >
                    Check In
                  </button>
                )}
                {currentBooking && currentBooking.bookingStatus === 'checked-in' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCheckOut(currentBooking.id);
                    }}
                    className="flex-1 text-xs px-2 py-1.5 bg-purple-100 text-purple-600 rounded hover:bg-purple-200 transition-colors"
                  >
                    Check Out
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <Home size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="font-heading text-lg text-navy-500 mb-2">No Rooms Found</h3>
          <p className="text-gray-500">Try adjusting your filters</p>
        </div>
      )}

      {/* Room Details Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedRoom(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-heading text-2xl text-navy-500">Room {selectedRoom.roomNumber}</h2>
                <p className="text-gray-500">{roomTypeLabels[selectedRoom.type]}</p>
              </div>
              <span className={cn('px-3 py-1 rounded-full text-sm font-medium', statusConfig[selectedRoom.status].color)}>
                {statusConfig[selectedRoom.status].label}
              </span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Floor</p>
                  <p className="font-medium">{selectedRoom.floor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Capacity</p>
                  <p className="font-medium">{selectedRoom.capacity} guests</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price per Night</p>
                  <p className="font-medium text-ocean-600">{formatCurrency(selectedRoom.pricePerNight)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRoom.amenities.map((amenity, idx) => (
                    <span key={idx} className="px-2 py-1 bg-sand-100 text-navy-500 text-xs rounded-full">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Change Actions */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Change Status</p>
                <div className="flex flex-wrap gap-2">
                  {(['available', 'occupied', 'reserved', 'maintenance'] as Room['status'][]).map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        handleStatusChange(selectedRoom.id, status);
                        setSelectedRoom({ ...selectedRoom, status });
                      }}
                      disabled={selectedRoom.status === status}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                        selectedRoom.status === status
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : statusConfig[status].color + ' hover:opacity-80'
                      )}
                    >
                      {statusConfig[status].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Booking Info */}
              {(() => {
                const booking = getRoomCurrentBooking(selectedRoom.id);
                if (!booking) return null;
                return (
                  <div className="bg-sand-50 rounded-lg p-4">
                    <h4 className="font-medium text-navy-500 mb-2">Current Booking</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-500">Guest:</span> {booking.guestName}</p>
                      <p><span className="text-gray-500">Email:</span> {booking.guestEmail}</p>
                      <p><span className="text-gray-500">Phone:</span> {booking.guestPhone}</p>
                      <p><span className="text-gray-500">Check-in:</span> {new Date(booking.checkIn).toLocaleDateString()}</p>
                      <p><span className="text-gray-500">Check-out:</span> {new Date(booking.checkOut).toLocaleDateString()}</p>
                      <p><span className="text-gray-500">Status:</span> {booking.bookingStatus}</p>
                    </div>
                  </div>
                );
              })()}
            </div>

            <button
              onClick={() => setSelectedRoom(null)}
              className="mt-6 w-full py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
