'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Ticket,
  Search,
  Calendar,
  DollarSign,
  User,
  Mail,
  Check,
  X,
  Clock,
  Filter
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { getTicketPurchases, TicketPurchase, getEvents, ResortEvent } from '@/lib/storage';

export default function AdminTicketsPage() {
  const [purchases, setPurchases] = useState<TicketPurchase[]>([]);
  const [events, setEvents] = useState<ResortEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'cancelled' | 'used'>('all');
  const [eventFilter, setEventFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const purchasesData = getTicketPurchases();
    const eventsData = getEvents();
    setPurchases(purchasesData);
    setEvents(eventsData);
    setLoading(false);
  };

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearch = 
      purchase.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.buyerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.confirmationCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.eventTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || purchase.status === statusFilter;
    const matchesEvent = eventFilter === 'all' || purchase.eventId === eventFilter;
    return matchesSearch && matchesStatus && matchesEvent;
  });

  const totalRevenue = purchases.filter(p => p.status === 'confirmed').reduce((sum, p) => sum + p.totalPrice, 0);
  const totalTickets = purchases.filter(p => p.status === 'confirmed').reduce((sum, p) => sum + p.quantity, 0);

  const uniqueEvents = Array.from(new Set(purchases.map(p => p.eventId)));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-ocean-200 border-t-ocean-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading text-navy-500">Ticket Sales</h1>
        <p className="text-gray-500">View and manage event ticket purchases</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Ticket className="text-ocean-500" size={24} />
            <span className="text-3xl font-heading text-navy-500">{purchases.length}</span>
          </div>
          <p className="text-gray-500 text-sm">Total Orders</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <User className="text-teal-500" size={24} />
            <span className="text-3xl font-heading text-navy-500">{totalTickets}</span>
          </div>
          <p className="text-gray-500 text-sm">Tickets Sold</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="text-green-500" size={24} />
            <span className="text-3xl font-heading text-navy-500">{formatCurrency(totalRevenue)}</span>
          </div>
          <p className="text-gray-500 text-sm">Total Revenue</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="text-purple-500" size={24} />
            <span className="text-3xl font-heading text-navy-500">{uniqueEvents.length}</span>
          </div>
          <p className="text-gray-500 text-sm">Events with Sales</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email, or confirmation code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-500"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="used">Used</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Event Filter */}
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-500"
          >
            <option value="all">All Events</option>
            {events.filter(e => uniqueEvents.includes(e.id)).map(event => (
              <option key={event.id} value={event.id}>{event.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Purchases List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredPurchases.length === 0 ? (
          <div className="text-center py-16">
            <Ticket size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-heading text-navy-500 mb-2">No Ticket Purchases</h3>
            <p className="text-gray-500">
              {purchases.length > 0 
                ? 'No purchases match your filters'
                : 'Ticket purchases will appear here when guests buy tickets'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 bg-gray-50">
                  <th className="px-6 py-4 font-medium">Confirmation</th>
                  <th className="px-6 py-4 font-medium">Event</th>
                  <th className="px-6 py-4 font-medium">Buyer</th>
                  <th className="px-6 py-4 font-medium">Tickets</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPurchases.map((purchase, index) => (
                  <motion.tr
                    key={purchase.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-ocean-600 font-medium">
                        {purchase.confirmationCode}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-navy-500 font-medium text-sm">{purchase.eventTitle}</p>
                        <p className="text-gray-400 text-xs">{purchase.ticketTypeName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-navy-500 text-sm">{purchase.buyerName}</p>
                        <p className="text-gray-400 text-xs flex items-center gap-1">
                          <Mail size={10} />
                          {purchase.buyerEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-navy-500">× {purchase.quantity}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-green-600">
                        {formatCurrency(purchase.totalPrice)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        purchase.status === 'confirmed' && 'bg-green-100 text-green-700',
                        purchase.status === 'used' && 'bg-blue-100 text-blue-700',
                        purchase.status === 'cancelled' && 'bg-red-100 text-red-700'
                      )}>
                        {purchase.status === 'confirmed' && <Check size={10} className="inline mr-1" />}
                        {purchase.status === 'cancelled' && <X size={10} className="inline mr-1" />}
                        {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(purchase.purchasedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-500 text-center">
        Showing {filteredPurchases.length} of {purchases.length} purchases
      </div>
    </div>
  );
}
