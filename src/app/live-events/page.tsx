'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  ArrowRight,
  Sparkles,
  Filter,
  Radio,
  CalendarClock,
  CalendarDays,
  List
} from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { cn, formatCurrency } from '@/lib/utils';
import { getUpcomingPublicEvents, ResortEvent, initializeSampleData } from '@/lib/storage';

const categoryConfig: { [key: string]: { label: string; color: string; emoji: string } } = {
  entertainment: { label: 'Entertainment', color: 'bg-purple-100 text-purple-700', emoji: '🎉' },
  dining: { label: 'Dining', color: 'bg-orange-100 text-orange-700', emoji: '🍽️' },
  wellness: { label: 'Wellness', color: 'bg-green-100 text-green-700', emoji: '🧘' },
  sports: { label: 'Sports', color: 'bg-blue-100 text-blue-700', emoji: '🏄' },
  kids: { label: 'Kids', color: 'bg-pink-100 text-pink-700', emoji: '👶' },
  special: { label: 'Special', color: 'bg-gold-100 text-gold-700', emoji: '⭐' },
};

type EventTab = 'all' | 'live' | 'upcoming' | 'ongoing';

const tabs: { id: EventTab; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'all', label: 'All Events', icon: <List size={18} />, description: 'View all events' },
  { id: 'live', label: 'Live Now', icon: <Radio size={18} />, description: 'Happening right now' },
  { id: 'ongoing', label: 'Ongoing', icon: <CalendarDays size={18} />, description: 'Multi-day events in progress' },
  { id: 'upcoming', label: 'Upcoming', icon: <CalendarClock size={18} />, description: 'Coming soon' },
];

export default function EventsPage() {
  const [allEvents, setAllEvents] = useState<ResortEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<EventTab>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    initializeSampleData();
    const data = getUpcomingPublicEvents();
    setAllEvents(data);
    setLoading(false);
  }, []);

  // Categorize events
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const categorizeEvents = (events: ResortEvent[]) => {
    const live: ResortEvent[] = [];
    const ongoing: ResortEvent[] = [];
    const upcoming: ResortEvent[] = [];

    events.forEach(event => {
      const eventDate = new Date(event.date);
      const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
      const endDate = event.endDate ? new Date(event.endDate) : null;
      const endDateOnly = endDate ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) : null;

      // Check if event is today (live)
      if (eventDateOnly.getTime() === today.getTime()) {
        live.push(event);
      }
      // Check if it's an ongoing multi-day event
      else if (endDateOnly && eventDateOnly < today && endDateOnly >= today) {
        ongoing.push(event);
      }
      // Future events
      else if (eventDateOnly > today) {
        upcoming.push(event);
      }
    });

    return { live, ongoing, upcoming };
  };

  const { live, ongoing, upcoming } = categorizeEvents(allEvents);

  // Get events based on active tab
  const getFilteredEvents = () => {
    let events: ResortEvent[] = [];
    
    switch (activeTab) {
      case 'live':
        events = live;
        break;
      case 'ongoing':
        events = ongoing;
        break;
      case 'upcoming':
        events = upcoming;
        break;
      default:
        events = allEvents;
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      events = events.filter(e => e.category === categoryFilter);
    }

    return events;
  };

  const filteredEvents = getFilteredEvents();
  const featuredEvents = filteredEvents.filter(e => e.isFeatured);
  const regularEvents = filteredEvents.filter(e => !e.isFeatured);

  const getLowestPrice = (event: ResortEvent): number | null => {
    if (!event.ticketsEnabled || !event.tickets || event.tickets.length === 0) return null;
    return Math.min(...event.tickets.map(t => t.price));
  };

  const getEventStatus = (event: ResortEvent): 'live' | 'ongoing' | 'upcoming' => {
    const eventDate = new Date(event.date);
    const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    const endDate = event.endDate ? new Date(event.endDate) : null;
    const endDateOnly = endDate ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) : null;

    if (eventDateOnly.getTime() === today.getTime()) return 'live';
    if (endDateOnly && eventDateOnly < today && endDateOnly >= today) return 'ongoing';
    return 'upcoming';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-100 pt-24 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-ocean-200 border-t-ocean-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-100">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=1080&fit=crop&q=80"
            alt="WhiteBay Events"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-500/70 via-navy-500/50 to-navy-500/80" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400/20 backdrop-blur-sm rounded-full text-gold-400 text-sm font-accent mb-6">
              <Sparkles size={16} />
              Resort Events & Experiences
            </span>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl mb-6">
              Events
            </h1>
            <p className="text-xl text-white/80 font-light max-w-2xl mx-auto">
              Discover extraordinary experiences at WhiteBay Resort. 
              From wine tastings to sunset yoga, there&apos;s something for everyone.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {live.length > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 backdrop-blur-sm rounded-full">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span className="text-white font-accent">{live.length} Live Now</span>
                </div>
              )}
              {ongoing.length > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-teal-500/20 backdrop-blur-sm rounded-full">
                  <CalendarDays size={16} className="text-teal-400" />
                  <span className="text-white font-accent">{ongoing.length} Ongoing</span>
                </div>
              )}
              <div className="flex items-center gap-2 px-4 py-2 bg-ocean-500/20 backdrop-blur-sm rounded-full">
                <CalendarClock size={16} className="text-ocean-400" />
                <span className="text-white font-accent">{upcoming.length} Upcoming</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-6 px-6 bg-white shadow-sm sticky top-16 z-20">
        <div className="max-w-7xl mx-auto">
          {/* Event Type Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 rounded-xl font-accent text-sm transition-all',
                  activeTab === tab.id
                    ? 'bg-ocean-500 text-white shadow-lg shadow-ocean-500/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {tab.icon}
                {tab.label}
                {tab.id === 'live' && live.length > 0 && (
                  <span className="relative flex h-2 w-2 ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                )}
                {tab.id !== 'all' && (
                  <span className={cn(
                    'px-2 py-0.5 rounded-full text-xs',
                    activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
                  )}>
                    {tab.id === 'live' ? live.length : tab.id === 'ongoing' ? ongoing.length : upcoming.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <span className="flex items-center gap-2 text-gray-500 text-sm whitespace-nowrap">
              <Filter size={16} />
              Category:
            </span>
            <button
              onClick={() => setCategoryFilter('all')}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-accent whitespace-nowrap transition-colors',
                categoryFilter === 'all'
                  ? 'bg-navy-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              All
            </button>
            {Object.entries(categoryConfig).map(([key, config]) => {
              const count = allEvents.filter(e => e.category === key).length;
              if (count === 0) return null;
              return (
                <button
                  key={key}
                  onClick={() => setCategoryFilter(key)}
                  className={cn(
                    'px-4 py-1.5 rounded-full text-sm font-accent whitespace-nowrap transition-colors flex items-center gap-1',
                    categoryFilter === key
                      ? 'bg-navy-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  <span>{config.emoji}</span>
                  {config.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Description */}
      <section className="py-4 px-6 bg-gradient-to-r from-ocean-50 to-teal-50 border-b border-ocean-100">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          {tabs.find(t => t.id === activeTab)?.icon}
          <div>
            <span className="font-accent text-navy-500 font-medium">
              {tabs.find(t => t.id === activeTab)?.label}
            </span>
            <span className="text-gray-500 text-sm ml-2">
              — {tabs.find(t => t.id === activeTab)?.description}
            </span>
          </div>
          <span className="ml-auto text-sm text-gray-500">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
          </span>
        </div>
      </section>

      {/* Live Events Alert */}
      <AnimatePresence>
        {activeTab === 'live' && live.length > 0 && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
              </span>
              <span className="font-accent font-medium">
                {live.length} event{live.length > 1 ? 's are' : ' is'} happening right now!
              </span>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="text-gold-500" size={28} />
                <h2 className="font-heading text-3xl text-navy-500">Featured Events</h2>
              </div>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredEvents.map((event, index) => {
                const lowestPrice = getLowestPrice(event);
                const config = categoryConfig[event.category];
                const status = getEventStatus(event);
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={`/live-events/${event.id}`}
                      className="group block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={event.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop&q=80'}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-500/80 via-navy-500/20 to-transparent" />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                          {status === 'live' && (
                            <span className="px-3 py-1 bg-red-500 text-white text-xs font-accent font-semibold rounded-full flex items-center gap-1">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                              </span>
                              LIVE NOW
                            </span>
                          )}
                          {status === 'ongoing' && (
                            <span className="px-3 py-1 bg-teal-500 text-white text-xs font-accent font-semibold rounded-full">
                              ONGOING
                            </span>
                          )}
                          <span className="px-3 py-1 bg-gold-400 text-navy-500 text-xs font-accent font-semibold rounded-full">
                            ⭐ Featured
                          </span>
                          <span className={cn('px-3 py-1 rounded-full text-xs font-accent', config.color)}>
                            {config.emoji} {config.label}
                          </span>
                        </div>

                        {/* Price Badge */}
                        {lowestPrice !== null && (
                          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl">
                            <span className="text-xs text-gray-500">From</span>
                            <p className="font-heading text-xl text-ocean-500">{formatCurrency(lowestPrice)}</p>
                          </div>
                        )}

                        {/* Title on Image */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="font-heading text-2xl text-white mb-2">{event.title}</h3>
                          <div className="flex items-center gap-4 text-white/80 text-sm">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(event.date).toLocaleDateString('en-US', { 
                                weekday: 'short', month: 'short', day: 'numeric' 
                              })}
                              {event.endDate && event.endDate !== event.date && (
                                <> - {new Date(event.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</>
                              )}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {event.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <p className="text-gray-600 line-clamp-2 mb-4">{event.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-gray-500 text-sm">
                            <MapPin size={14} />
                            {event.location}
                          </span>
                          <span className="inline-flex items-center gap-2 text-ocean-500 font-accent font-medium group-hover:gap-3 transition-all">
                            {event.ticketsEnabled ? 'Get Tickets' : 'Learn More'}
                            <ArrowRight size={16} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Events Grid */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {regularEvents.length > 0 && featuredEvents.length > 0 && (
          <AnimatedSection>
              <h2 className="font-heading text-3xl text-navy-500 mb-8">More Events</h2>
          </AnimatedSection>
          )}

          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="font-heading text-xl text-navy-500 mb-2">No Events Found</h3>
              <p className="text-gray-500 mb-4">
                {activeTab === 'live' && 'No events are happening right now. Check upcoming events!'}
                {activeTab === 'ongoing' && 'No multi-day events currently in progress.'}
                {activeTab === 'upcoming' && 'No upcoming events scheduled yet.'}
                {activeTab === 'all' && categoryFilter !== 'all' && 'No events in this category. Try another filter.'}
                {activeTab === 'all' && categoryFilter === 'all' && 'Check back soon for upcoming events!'}
              </p>
              {activeTab !== 'all' && (
                <button
                  onClick={() => setActiveTab('all')}
                  className="text-ocean-500 font-accent hover:underline"
                >
                  View all events
                </button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(featuredEvents.length === 0 ? filteredEvents : regularEvents).map((event, index) => {
                const lowestPrice = getLowestPrice(event);
                const config = categoryConfig[event.category];
                const status = getEventStatus(event);
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={`/live-events/${event.id}`}
                      className="group block bg-sand-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all h-full"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={event.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop&q=80'}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                          {status === 'live' && (
                            <span className="px-2 py-1 bg-red-500 text-white text-xs font-accent rounded-full flex items-center gap-1">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                              </span>
                              LIVE
                            </span>
                          )}
                          {status === 'ongoing' && (
                            <span className="px-2 py-1 bg-teal-500 text-white text-xs font-accent rounded-full">
                              ONGOING
                            </span>
                          )}
                          <span className={cn('px-2 py-1 rounded-full text-xs font-accent', config.color)}>
                            {config.emoji} {config.label}
                          </span>
                        </div>
                        {lowestPrice !== null && (
                          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg">
                            <span className="font-heading text-lg text-ocean-500">{formatCurrency(lowestPrice)}</span>
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <h3 className="font-heading text-lg text-navy-500 mb-2 group-hover:text-ocean-500 transition-colors">
                          {event.title}
                        </h3>
                        
                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            {event.endDate && event.endDate !== event.date && (
                              <> - {new Date(event.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</>
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {event.time}
                          </span>
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{event.description}</p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <MapPin size={12} />
                            {event.location}
                          </span>
                          {event.ticketsEnabled && (
                            <span className="flex items-center gap-1 text-ocean-500 text-sm font-accent">
                              <Ticket size={14} />
                              Tickets
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-ocean-500 to-teal-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <AnimatedSection>
            <h2 className="font-heading text-3xl mb-4">Planning a Private Event?</h2>
            <p className="text-white/80 mb-8">
              From intimate gatherings to grand celebrations, our events team can help 
              you create unforgettable moments at WhiteBay Resort.
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ocean-600 font-accent font-semibold rounded-full hover:bg-gold-400 hover:text-navy-500 transition-colors"
            >
              Explore Private Events
              <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
