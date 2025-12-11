'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Users,
  Mail,
  Phone,
  Edit,
  Trash2,
  Star,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getGuests, updateGuest, deleteGuest, Guest } from '@/lib/storage';

export default function StaffGuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [vipFilter, setVipFilter] = useState<'all' | 'vip' | 'regular'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGuests();
  }, []);

  const loadGuests = () => {
    const data = getGuests();
    setGuests(data);
    setLoading(false);
  };

  const handleToggleVIP = (id: string, currentStatus: boolean) => {
    updateGuest(id, { vipStatus: !currentStatus });
    loadGuests();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this guest record?')) {
      deleteGuest(id);
      loadGuests();
    }
  };

  const filteredGuests = guests.filter((guest) => {
    const searchString = `${guest.firstName} ${guest.lastName} ${guest.email}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());
    const matchesVIP = 
      vipFilter === 'all' ||
      (vipFilter === 'vip' && guest.vipStatus) ||
      (vipFilter === 'regular' && !guest.vipStatus);
    return matchesSearch && matchesVIP;
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
          <h1 className="text-2xl font-heading text-navy-500">Guest Registry</h1>
          <p className="text-gray-500">Manage guest information and preferences</p>
        </div>
        <Link
          href="/staff/guests/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white font-accent font-medium rounded-xl hover:bg-teal-600 transition-colors"
        >
          <Plus size={20} />
          Register Guest
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
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* VIP Filter */}
          <div className="flex gap-2">
            {(['all', 'vip', 'regular'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setVipFilter(filter)}
                className={cn(
                  'px-4 py-2 rounded-lg font-accent text-sm transition-colors',
                  vipFilter === filter
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {filter === 'all' ? 'All Guests' : filter === 'vip' ? '⭐ VIP' : 'Regular'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Guests List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredGuests.length === 0 ? (
          <div className="text-center py-16">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-heading text-navy-500 mb-2">No Guests Found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || vipFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Register your first guest to get started'}
            </p>
            <Link
              href="/staff/guests/new"
              className="inline-flex items-center gap-2 text-teal-500 font-accent hover:text-teal-600"
            >
              <Plus size={16} />
              Register Guest
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 bg-gray-50">
                  <th className="px-6 py-4 font-medium">Guest</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Room</th>
                  <th className="px-6 py-4 font-medium">Stay</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredGuests.map((guest, index) => (
                  <motion.tr
                    key={guest.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center font-medium',
                          guest.vipStatus
                            ? 'bg-gold-100 text-gold-700'
                            : 'bg-ocean-100 text-ocean-600'
                        )}>
                          {guest.firstName.charAt(0)}{guest.lastName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-navy-500">
                            {guest.firstName} {guest.lastName}
                          </p>
                          {guest.notes && (
                            <p className="text-xs text-gray-400 line-clamp-1">{guest.notes}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Mail size={12} className="text-gray-400" />
                          {guest.email}
                        </p>
                        {guest.phone && (
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Phone size={12} className="text-gray-400" />
                            {guest.phone}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {guest.roomNumber ? (
                        <span className="px-2 py-1 bg-ocean-100 text-ocean-600 text-sm rounded">
                          Room {guest.roomNumber}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {guest.checkIn && guest.checkOut ? (
                        <div className="text-sm">
                          <p className="text-gray-600">
                            {new Date(guest.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                          <p className="text-gray-400 text-xs">
                            to {new Date(guest.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleVIP(guest.id, guest.vipStatus)}
                        className={cn(
                          'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                          guest.vipStatus
                            ? 'bg-gold-100 text-gold-700 hover:bg-gold-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        )}
                      >
                        {guest.vipStatus ? '⭐ VIP' : 'Regular'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/staff/guests/${guest.id}/edit`}
                          className="p-2 text-gray-400 hover:text-teal-500 hover:bg-teal-50 rounded-lg transition-colors"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(guest.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>
          Showing {filteredGuests.length} of {guests.length} guests
        </p>
        <p>
          {guests.filter(g => g.vipStatus).length} VIP • {guests.filter(g => !g.vipStatus).length} Regular
        </p>
      </div>
    </div>
  );
}

