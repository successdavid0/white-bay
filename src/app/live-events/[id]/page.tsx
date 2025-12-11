'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  ArrowLeft,
  Users,
  Minus,
  Plus,
  Check,
  X,
  Share2,
  Heart,
  Info
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { 
  getEventById, 
  purchaseTickets, 
  getTicketAvailability, 
  ResortEvent,
  TicketPurchase,
  initializeSampleData 
} from '@/lib/storage';

const categoryConfig: { [key: string]: { label: string; color: string; emoji: string } } = {
  entertainment: { label: 'Entertainment', color: 'bg-purple-100 text-purple-700', emoji: '🎉' },
  dining: { label: 'Dining', color: 'bg-orange-100 text-orange-700', emoji: '🍽️' },
  wellness: { label: 'Wellness', color: 'bg-green-100 text-green-700', emoji: '🧘' },
  sports: { label: 'Sports', color: 'bg-blue-100 text-blue-700', emoji: '🏄' },
  kids: { label: 'Kids', color: 'bg-pink-100 text-pink-700', emoji: '👶' },
  special: { label: 'Special', color: 'bg-gold-100 text-gold-700', emoji: '⭐' },
};

interface TicketSelection {
  ticketId: string;
  name: string;
  price: number;
  quantity: number;
  available: number;
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [event, setEvent] = useState<ResortEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [ticketSelections, setTicketSelections] = useState<TicketSelection[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [purchaseResult, setPurchaseResult] = useState<TicketPurchase | null>(null);
  const [processing, setProcessing] = useState(false);
  
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    initializeSampleData();
    const eventData = getEventById(eventId);
      if (eventData) {
        setEvent(eventData);
      
      // Initialize ticket selections
      const availability = getTicketAvailability(eventId);
      setTicketSelections(availability.map(t => ({
        ticketId: t.ticketId,
        name: t.name,
        price: t.price,
        quantity: 0,
        available: t.available,
      })));
      }
      setLoading(false);
  }, [eventId]);

  const updateQuantity = (ticketId: string, delta: number) => {
    setTicketSelections(prev => prev.map(t => {
      if (t.ticketId === ticketId) {
        const newQty = Math.max(0, Math.min(t.available, t.quantity + delta));
        return { ...t, quantity: newQty };
      }
      return t;
    }));
  };

  const totalTickets = ticketSelections.reduce((sum, t) => sum + t.quantity, 0);
  const totalPrice = ticketSelections.reduce((sum, t) => sum + (t.price * t.quantity), 0);

  const handleProceedToCheckout = () => {
    if (totalTickets > 0) {
      setShowCheckout(true);
      setCheckoutStep('details');
    }
  };

  const handlePurchase = async () => {
    if (!event) return;
    
    setProcessing(true);

    // Process each ticket type selection
    const selectedTickets = ticketSelections.filter(t => t.quantity > 0);
    
    try {
      // For simplicity, we'll create one purchase for the first ticket type
      // In a real app, you might want to handle multiple ticket types differently
      for (const ticket of selectedTickets) {
        const result = purchaseTickets(
          eventId,
          ticket.ticketId,
          ticket.quantity,
          buyerInfo
        );
        
        if (result) {
          setPurchaseResult(result);
        }
      }
      
      setCheckoutStep('confirmation');
    } catch (error) {
      console.error('Purchase error:', error);
    } finally {
    setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-100 pt-24 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-ocean-200 border-t-ocean-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-sand-100 pt-24">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="font-heading text-3xl text-navy-500 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/live-events"
            className="inline-flex items-center gap-2 text-ocean-500 font-accent hover:text-ocean-600"
          >
            <ArrowLeft size={18} />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const config = categoryConfig[event.category];
  const eventDate = new Date(event.date);

  return (
    <div className="min-h-screen bg-sand-100">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
        <Image
          src={event.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=1080&fit=crop&q=80'}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-500/90 via-navy-500/50 to-navy-500/30" />
        </div>
        
        {/* Back Button */}
        <div className="absolute top-24 left-6 z-10">
          <Link
            href="/live-events"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={18} />
            All Events
          </Link>
        </div>

        {/* Event Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              {event.isFeatured && (
                <span className="px-3 py-1 bg-gold-400 text-navy-500 text-xs font-accent font-semibold rounded-full">
                  ⭐ Featured
                </span>
              )}
              <span className={cn('px-3 py-1 rounded-full text-xs font-accent', config.color)}>
                {config.emoji} {config.label}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {eventDate.toLocaleDateString('en-US', { 
                  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={18} />
                {event.time}
                {event.endTime && ` - ${event.endTime}`}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={18} />
                {event.location}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <h2 className="font-heading text-2xl text-navy-500 mb-4">About This Event</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {event.longDescription || event.description}
                </p>
              </motion.div>

              {/* Event Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <h2 className="font-heading text-2xl text-navy-500 mb-6">Event Details</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center text-ocean-500">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium text-navy-500">
                        {eventDate.toLocaleDateString('en-US', { 
                          weekday: 'long', month: 'long', day: 'numeric' 
                        })}
                      </p>
                      {event.endDate && event.endDate !== event.date && (
                        <p className="text-sm text-gray-500">
                          to {new Date(event.endDate).toLocaleDateString('en-US', { 
                            month: 'long', day: 'numeric' 
                          })}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center text-ocean-500">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium text-navy-500">{event.time}</p>
                      {event.endTime && <p className="text-sm text-gray-500">Ends at {event.endTime}</p>}
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center text-ocean-500">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-navy-500">{event.location}</p>
                      <p className="text-sm text-gray-500">WhiteBay Resort</p>
                    </div>
                  </div>

                  {event.capacity && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center text-ocean-500">
                        <Users size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Capacity</p>
                        <p className="font-medium text-navy-500">
                          {event.registered} / {event.capacity} spots filled
                        </p>
                        <div className="w-32 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                          <div 
                            className="h-full bg-ocean-500 rounded-full"
                            style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Share & Save */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-gray-600 hover:text-ocean-500 hover:shadow-md transition-all">
                  <Share2 size={18} />
                  Share Event
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-gray-600 hover:text-red-500 hover:shadow-md transition-all">
                  <Heart size={18} />
                  Save
                </button>
              </motion.div>
            </div>

            {/* Right Column - Ticket Selection */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg sticky top-24"
              >
                {event.ticketsEnabled && event.tickets && event.tickets.length > 0 ? (
                  <>
                    <div className="flex items-center gap-2 mb-6">
                      <Ticket className="text-ocean-500" size={24} />
                      <h2 className="font-heading text-xl text-navy-500">Select Tickets</h2>
                    </div>

                    <div className="space-y-4 mb-6">
                      {ticketSelections.map((ticket) => (
                        <div 
                          key={ticket.ticketId}
                          className={cn(
                            'p-4 border-2 rounded-xl transition-colors',
                            ticket.quantity > 0 ? 'border-ocean-500 bg-ocean-50' : 'border-gray-200'
                          )}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-accent font-medium text-navy-500">{ticket.name}</h3>
                              <p className="text-sm text-gray-500">{ticket.available} available</p>
                            </div>
                            <span className="font-heading text-xl text-ocean-500">
                              {formatCurrency(ticket.price)}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-sm text-gray-500">Quantity</span>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateQuantity(ticket.ticketId, -1)}
                                disabled={ticket.quantity === 0}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-8 text-center font-medium text-navy-500">
                                {ticket.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(ticket.ticketId, 1)}
                                disabled={ticket.quantity >= ticket.available}
                                className="w-8 h-8 rounded-full bg-ocean-500 flex items-center justify-center text-white hover:bg-ocean-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total & Checkout */}
                    {totalTickets > 0 && (
                      <div className="border-t border-gray-100 pt-4 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-600">Total ({totalTickets} ticket{totalTickets > 1 ? 's' : ''})</span>
                          <span className="font-heading text-2xl text-navy-500">
                            {formatCurrency(totalPrice)}
                          </span>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleProceedToCheckout}
                      disabled={totalTickets === 0}
                      className="w-full py-4 bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-accent font-semibold rounded-xl hover:shadow-lg hover:shadow-ocean-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                    >
                      {totalTickets > 0 ? `Proceed to Checkout` : 'Select Tickets'}
                    </button>

                    <p className="text-xs text-gray-400 text-center mt-4">
                      <Info size={12} className="inline mr-1" />
                      Tickets are non-refundable. Check our policies for details.
                    </p>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="font-heading text-lg text-navy-500 mb-2">Free Event</h3>
                    <p className="text-gray-500 text-sm mb-6">
                      This event is complimentary for all resort guests.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-block w-full py-3 bg-ocean-500 text-white font-accent font-medium rounded-xl hover:bg-ocean-600 transition-colors"
                    >
                      Inquire About This Event
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy-500/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => checkoutStep !== 'confirmation' && setShowCheckout(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Checkout Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-heading text-xl text-navy-500">
                  {checkoutStep === 'details' && 'Your Details'}
                  {checkoutStep === 'payment' && 'Payment'}
                  {checkoutStep === 'confirmation' && 'Booking Confirmed!'}
                </h2>
                {checkoutStep !== 'confirmation' && (
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Checkout Content */}
              <div className="p-6">
                {checkoutStep === 'details' && (
                  <div className="space-y-4">
                  {/* Order Summary */}
                  <div className="bg-sand-50 rounded-xl p-4 mb-6">
                      <h3 className="font-accent font-medium text-navy-500 mb-3">{event.title}</h3>
                      {ticketSelections.filter(t => t.quantity > 0).map(ticket => (
                        <div key={ticket.ticketId} className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>{ticket.name} × {ticket.quantity}</span>
                          <span>{formatCurrency(ticket.price * ticket.quantity)}</span>
                      </div>
                    ))}
                      <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-medium">
                      <span>Total</span>
                      <span className="text-ocean-500">{formatCurrency(totalPrice)}</span>
                    </div>
                  </div>

                  {/* Buyer Info Form */}
                    <div>
                      <label className="block text-sm font-accent text-navy-500 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={buyerInfo.name}
                        onChange={(e) => setBuyerInfo(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-accent text-navy-500 mb-2">Email *</label>
                      <input
                        type="email"
                        value={buyerInfo.email}
                        onChange={(e) => setBuyerInfo(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-accent text-navy-500 mb-2">Phone (optional)</label>
                      <input
                        type="tel"
                        value={buyerInfo.phone}
                        onChange={(e) => setBuyerInfo(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500"
                      />
                    </div>

                    <button
                      onClick={() => setCheckoutStep('payment')}
                      disabled={!buyerInfo.name || !buyerInfo.email}
                      className="w-full mt-6 py-4 bg-ocean-500 text-white font-accent font-semibold rounded-xl hover:bg-ocean-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Payment
                    </button>
                  </div>
                )}

                {checkoutStep === 'payment' && (
                  <div className="space-y-4">
                    <div className="bg-sand-50 rounded-xl p-4 mb-6">
                      <div className="flex justify-between font-medium">
                        <span>Total to Pay</span>
                        <span className="text-ocean-500 text-xl">{formatCurrency(totalPrice)}</span>
                      </div>
                    </div>

                    {/* Simulated Payment Form */}
                    <div>
                      <label className="block text-sm font-accent text-navy-500 mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-accent text-navy-500 mb-2">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-accent text-navy-500 mb-2">CVC</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setCheckoutStep('details')}
                        className="flex-1 py-4 border-2 border-gray-200 text-gray-600 font-accent font-medium rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePurchase}
                        disabled={processing}
                        className="flex-1 py-4 bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-accent font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                      >
                        {processing ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                          </span>
                        ) : (
                          `Pay ${formatCurrency(totalPrice)}`
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-gray-400 text-center">
                      🔒 Secure payment powered by Stripe (demo mode)
                    </p>
                </div>
              )}

                {checkoutStep === 'confirmation' && purchaseResult && (
                  <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} className="text-green-500" />
                  </div>
                    
                    <h3 className="font-heading text-2xl text-navy-500 mb-2">Thank You!</h3>
                    <p className="text-gray-600 mb-6">Your tickets have been booked successfully.</p>

                    <div className="bg-sand-50 rounded-xl p-6 text-left mb-6">
                      <div className="text-center mb-4">
                        <p className="text-sm text-gray-500">Confirmation Code</p>
                        <p className="font-mono text-2xl text-ocean-500 font-bold">
                          {purchaseResult.confirmationCode}
                        </p>
                  </div>

                      <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Event</span>
                          <span className="text-navy-500">{purchaseResult.eventTitle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Tickets</span>
                          <span className="text-navy-500">{purchaseResult.quantity}× {purchaseResult.ticketTypeName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Total Paid</span>
                          <span className="text-ocean-500 font-medium">{formatCurrency(purchaseResult.totalPrice)}</span>
                        </div>
                      </div>
                  </div>

                  <p className="text-sm text-gray-500 mb-6">
                      A confirmation email has been sent to <strong>{purchaseResult.buyerEmail}</strong>
                  </p>

                    <div className="flex gap-3">
                      <Link
                        href="/live-events"
                        className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-accent font-medium rounded-xl hover:bg-gray-50 transition-colors text-center"
                      >
                        Browse More Events
                      </Link>
                  <button
                    onClick={() => {
                          setShowCheckout(false);
                          router.refresh();
                    }}
                        className="flex-1 py-3 bg-ocean-500 text-white font-accent font-medium rounded-xl hover:bg-ocean-600 transition-colors"
                  >
                        Done
                  </button>
                    </div>
                </div>
              )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
