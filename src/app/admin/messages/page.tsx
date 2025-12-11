'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Mail,
  Phone,
  Clock,
  Eye,
  Reply,
  Trash2,
  CheckCircle,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getMessages, updateMessage, deleteMessage, Message } from '@/lib/storage';

const statusConfig = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-700' },
  read: { label: 'Read', color: 'bg-gray-100 text-gray-700' },
  replied: { label: 'Replied', color: 'bg-green-100 text-green-700' },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-500' },
};

const typeConfig = {
  inquiry: { label: 'Inquiry', color: 'bg-ocean-100 text-ocean-700' },
  feedback: { label: 'Feedback', color: 'bg-purple-100 text-purple-700' },
  complaint: { label: 'Complaint', color: 'bg-red-100 text-red-700' },
  booking: { label: 'Booking', color: 'bg-gold-100 text-gold-700' },
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | Message['status']>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    const data = getMessages();
    setMessages(data);
    setLoading(false);
  };

  const handleStatusChange = (id: string, status: Message['status']) => {
    updateMessage(id, { status });
    loadMessages();
    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, status });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      deleteMessage(id);
      loadMessages();
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    if (message.status === 'new') {
      updateMessage(message.id, { status: 'read' });
      loadMessages();
    }
  };

  const filteredMessages = messages.filter(
    m => statusFilter === 'all' || m.status === statusFilter
  );

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
        <h1 className="text-2xl font-heading text-navy-500">Messages & Inquiries</h1>
        <p className="text-gray-500">Manage guest messages and contact form submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = messages.filter(m => m.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status as Message['status'])}
              className={cn(
                'p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-left',
                statusFilter === status && 'ring-2 ring-ocean-500'
              )}
            >
              <p className="text-2xl font-heading text-navy-500">{count}</p>
              <p className="text-sm text-gray-500">{config.label}</p>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-heading text-lg text-navy-500">Inbox</h2>
            <button
              onClick={() => setStatusFilter('all')}
              className={cn(
                'text-sm',
                statusFilter === 'all' ? 'text-ocean-500' : 'text-gray-400'
              )}
            >
              Show All
            </button>
          </div>

          <div className="max-h-[600px] overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No messages</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredMessages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => handleViewMessage(message)}
                    className={cn(
                      'w-full p-4 text-left hover:bg-gray-50 transition-colors',
                      selectedMessage?.id === message.id && 'bg-ocean-50',
                      message.status === 'new' && 'bg-blue-50/50'
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className={cn(
                        'font-accent text-navy-500',
                        message.status === 'new' && 'font-semibold'
                      )}>
                        {message.name}
                      </p>
                      <span className={cn(
                        'px-2 py-0.5 text-xs rounded-full',
                        statusConfig[message.status].color
                      )}>
                        {statusConfig[message.status].label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-1 mb-1">{message.subject}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className={cn(
                        'px-1.5 py-0.5 rounded',
                        typeConfig[message.type].color
                      )}>
                        {typeConfig[message.type].label}
                      </span>
                      <span>{new Date(message.createdAt).toLocaleDateString()}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          {selectedMessage ? (
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-heading text-xl text-navy-500">{selectedMessage.subject}</h2>
                    <p className="text-sm text-gray-500">
                      From {selectedMessage.name} • {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'px-3 py-1 text-xs rounded-full',
                      statusConfig[selectedMessage.status].color
                    )}>
                      {statusConfig[selectedMessage.status].label}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <a href={`mailto:${selectedMessage.email}`} className="flex items-center gap-2 text-ocean-500 hover:underline">
                    <Mail size={14} />
                    {selectedMessage.email}
                  </a>
                  {selectedMessage.phone && (
                    <a href={`tel:${selectedMessage.phone}`} className="flex items-center gap-2 text-ocean-500 hover:underline">
                      <Phone size={14} />
                      {selectedMessage.phone}
                    </a>
                  )}
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="p-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <select
                    value={selectedMessage.status}
                    onChange={(e) => handleStatusChange(selectedMessage.id, e.target.value as Message['status'])}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-ocean-500"
                  >
                    {Object.entries(statusConfig).map(([status, config]) => (
                      <option key={status} value={status}>{config.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-ocean-500 text-white font-accent text-sm rounded-lg hover:bg-ocean-600 transition-colors"
                  >
                    <Reply size={16} />
                    Reply
                  </a>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center p-12">
              <div>
                <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Select a message to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
