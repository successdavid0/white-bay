'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  BedDouble,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  MessageSquare,
  Tag,
  UserCog,
  FileText,
  Ticket,
  Gift
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { runAutoCleanup, getNewMessages, updateRoomStatusesFromBookings, initializeSampleData } from '@/lib/storage';

const sidebarLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { name: 'Ticket Sales', href: '/admin/tickets', icon: Ticket },
  { name: 'Rooms', href: '/admin/rooms', icon: BedDouble },
  { name: 'Guests', href: '/admin/guests', icon: Users },
  { name: 'Staff', href: '/admin/staff', icon: UserCog },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Promotions', href: '/admin/promotions', icon: Gift },
  { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newMessageCount, setNewMessageCount] = useState(0);

  useEffect(() => {
    // Initialize sample data and run cleanup on mount
    initializeSampleData();
    runAutoCleanup();
    updateRoomStatusesFromBookings();
    
    // Get new message count
    const messages = getNewMessages();
    setNewMessageCount(messages.length);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-navy-500/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-72 bg-navy-500 z-50 transform transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-ocean-400 to-teal-400 rounded-xl flex items-center justify-center">
              <span className="text-white font-heading text-lg font-bold">W</span>
            </div>
            <div>
              <h1 className="font-heading text-lg text-white">WhiteBay</h1>
              <p className="text-xs text-white/50">Admin Portal</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || 
              (link.href !== '/admin' && pathname.startsWith(link.href));
            const showBadge = link.href === '/admin/messages' && newMessageCount > 0;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative',
                  isActive
                    ? 'bg-ocean-500 text-white shadow-lg shadow-ocean-500/30'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon size={20} />
                <span className="font-accent">{link.name}</span>
                {showBadge && (
                  <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                    {newMessageCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Staff Portal Link */}
        <div className="absolute bottom-24 left-0 right-0 px-4">
          <Link
            href="/staff"
            className="flex items-center gap-3 px-4 py-3 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-all text-sm"
          >
            <FileText size={18} />
            <span>Staff Portal</span>
          </Link>
        </div>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center text-navy-500 font-semibold">
              A
            </div>
            <div className="flex-1">
              <p className="text-white font-accent text-sm">Admin User</p>
              <p className="text-white/50 text-xs">admin@whitebay.com</p>
            </div>
            <button className="text-white/50 hover:text-white">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Top Header */}
        <header className="h-20 bg-white shadow-sm sticky top-0 z-30">
          <div className="h-full px-6 flex items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-navy-500"
              >
                <Menu size={24} />
              </button>
              
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl w-80">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings, guests..."
                  className="bg-transparent outline-none text-sm text-navy-500 placeholder:text-gray-400 w-full"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* View Website */}
              <Link
                href="/"
                target="_blank"
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-ocean-500 transition-colors"
              >
                View Website
              </Link>

              {/* Notifications */}
              <button className="relative p-2 text-navy-500/70 hover:text-navy-500 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell size={20} />
                {newMessageCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>

              {/* User Menu */}
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-10 h-10 bg-ocean-500 rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <ChevronDown size={16} className="text-navy-500/50" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
