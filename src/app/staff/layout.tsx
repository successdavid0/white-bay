'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Megaphone,
  FileImage,
  Menu,
  X,
  LogOut,
  Bell,
  User,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { runAutoCleanup, initializeSampleData, updateRoomStatusesFromBookings } from '@/lib/storage';

const sidebarLinks = [
  { name: 'Dashboard', href: '/staff', icon: LayoutDashboard },
  { name: 'Rooms', href: '/staff/rooms', icon: Home },
  { name: 'Events', href: '/staff/events', icon: Calendar },
  { name: 'Guests', href: '/staff/guests', icon: Users },
  { name: 'Announcements', href: '/staff/announcements', icon: Megaphone },
  { name: 'Content', href: '/staff/content', icon: FileImage },
];

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Initialize sample data and run cleanup on mount
    initializeSampleData();
    runAutoCleanup();
    updateRoomStatusesFromBookings();
  }, []);

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
          'fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-teal-600 to-teal-700 z-50 transform transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
          <Link href="/staff" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-heading text-lg font-bold">W</span>
            </div>
            <div>
              <h1 className="font-heading text-base text-white">WhiteBay</h1>
              <p className="text-[10px] text-white/60">Staff Portal</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || 
              (link.href !== '/staff' && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                  isActive
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon size={18} />
                <span className="font-accent text-sm">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Admin Link */}
        <div className="absolute bottom-20 left-0 right-0 px-4">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-all text-sm"
          >
            <LayoutDashboard size={18} />
            <span>Admin Portal</span>
          </Link>
        </div>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white text-sm font-medium">
              S
            </div>
            <div className="flex-1">
              <p className="text-white font-accent text-sm">Staff User</p>
              <p className="text-white/50 text-xs">staff@whitebay.com</p>
            </div>
            <button className="text-white/50 hover:text-white">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="h-16 bg-white shadow-sm sticky top-0 z-30">
          <div className="h-full px-4 lg:px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-navy-500"
              >
                <Menu size={24} />
              </button>
              <h2 className="font-heading text-lg text-navy-500 hidden sm:block">
                Staff Portal
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-navy-500/70 hover:text-navy-500 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-teal-500 rounded-full" />
              </button>
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                <User size={16} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

