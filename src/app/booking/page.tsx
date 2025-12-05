'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  CreditCard, 
  Check, 
  ChevronRight,
  Bed,
  Star,
  Shield,
  ArrowLeft,
  Sparkles,
  Mail,
  Phone,
  User
} from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { ROOMS } from '@/lib/constants';
import { formatCurrency, cn, generateBookingCode, calculateNights } from '@/lib/utils';

type BookingStep = 1 | 2 | 3 | 4;

interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  paymentMethod: 'card' | 'paypal';
}

const steps = [
  { id: 1, name: 'Dates & Guests', icon: Calendar },
  { id: 2, name: 'Select Room', icon: Bed },
  { id: 3, name: 'Your Details', icon: User },
  { id: 4, name: 'Payment', icon: CreditCard },
];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  
  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    guests: parseInt(searchParams.get('guests') || '2'),
    roomId: searchParams.get('room') || '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    paymentMethod: 'card',
  });

  const selectedRoom = ROOMS.find((r) => r.id === bookingData.roomId);
  const nights = bookingData.checkIn && bookingData.checkOut 
    ? calculateNights(new Date(bookingData.checkIn), new Date(bookingData.checkOut))
    : 0;
  const totalPrice = selectedRoom ? selectedRoom.price * nights : 0;
  const taxes = totalPrice * 0.12;
  const grandTotal = totalPrice + taxes;

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as BookingStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as BookingStep);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setBookingCode(generateBookingCode());
    setIsProcessing(false);
    setBookingComplete(true);
  };

  if (bookingComplete) {
    return <BookingConfirmation bookingCode={bookingCode} bookingData={bookingData} selectedRoom={selectedRoom!} nights={nights} grandTotal={grandTotal} />;
  }

  return (
    <div className="min-h-screen bg-sand-100 pt-24">
      {/* Progress Steps */}
      <div className="bg-white shadow-sm sticky top-20 z-30">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        backgroundColor: isCompleted ? '#17C3B2' : isActive ? '#0A72B5' : '#E8E8D8',
                      }}
                      className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
                        isCompleted || isActive ? 'text-white' : 'text-navy-500/50'
                      )}
                    >
                      {isCompleted ? <Check size={20} /> : <StepIcon size={20} />}
                    </motion.div>
                    <span className={cn(
                      'text-xs mt-2 font-accent hidden sm:block',
                      isActive ? 'text-ocean-500 font-semibold' : 'text-navy-500/50'
                    )}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      'w-12 md:w-24 h-1 mx-2 rounded-full transition-colors',
                      isCompleted ? 'bg-teal-400' : 'bg-sand-200'
                    )} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <Step1Dates 
                  bookingData={bookingData} 
                  updateBookingData={updateBookingData} 
                  onNext={nextStep} 
                />
              )}
              {currentStep === 2 && (
                <Step2Room 
                  bookingData={bookingData} 
                  updateBookingData={updateBookingData} 
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 3 && (
                <Step3Details 
                  bookingData={bookingData} 
                  updateBookingData={updateBookingData} 
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 4 && (
                <Step4Payment 
                  bookingData={bookingData} 
                  updateBookingData={updateBookingData}
                  onBack={prevStep}
                  onSubmit={handleSubmit}
                  isProcessing={isProcessing}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <BookingSummary 
              bookingData={bookingData} 
              selectedRoom={selectedRoom} 
              nights={nights}
              totalPrice={totalPrice}
              taxes={taxes}
              grandTotal={grandTotal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 1: Dates & Guests
function Step1Dates({ 
  bookingData, 
  updateBookingData, 
  onNext 
}: { 
  bookingData: BookingData; 
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
}) {
  const isValid = bookingData.checkIn && bookingData.checkOut && 
    new Date(bookingData.checkOut) > new Date(bookingData.checkIn);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-3xl p-8 shadow-lg"
    >
      <h2 className="font-heading text-3xl text-navy-500 mb-2">Select Your Dates</h2>
      <p className="text-navy-500/60 mb-8">Choose your check-in and check-out dates</p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-navy-500 font-accent text-sm mb-2">Check-in Date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-500" size={20} />
              <input
                type="date"
                value={bookingData.checkIn}
                onChange={(e) => updateBookingData({ checkIn: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-12 pr-4 py-4 border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-navy-500 font-accent text-sm mb-2">Check-out Date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-500" size={20} />
              <input
                type="date"
                value={bookingData.checkOut}
                onChange={(e) => updateBookingData({ checkOut: e.target.value })}
                min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                className="w-full pl-12 pr-4 py-4 border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-navy-500 font-accent text-sm mb-2">Number of Guests</label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-500" size={20} />
            <select
              value={bookingData.guests}
              onChange={(e) => updateBookingData({ guests: parseInt(e.target.value) })}
              className="w-full pl-12 pr-4 py-4 border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500 transition-colors appearance-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} Guest{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={!isValid}
          className={cn(
            'px-8 py-4 bg-gradient-to-r from-ocean-500 to-ocean-600 text-white font-accent font-semibold rounded-xl flex items-center gap-2 transition-all',
            isValid 
              ? 'hover:shadow-lg hover:shadow-ocean-500/30 cursor-pointer' 
              : 'opacity-50 cursor-not-allowed'
          )}
        >
          Continue
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}

// Step 2: Select Room
function Step2Room({ 
  bookingData, 
  updateBookingData, 
  onNext,
  onBack 
}: { 
  bookingData: BookingData; 
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const availableRooms = ROOMS.filter((room) => room.capacity >= bookingData.guests);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="font-heading text-3xl text-navy-500 mb-2">Choose Your Room</h2>
        <p className="text-navy-500/60 mb-8">
          Select from our available accommodations for {bookingData.guests} guest{bookingData.guests > 1 ? 's' : ''}
        </p>

        <div className="space-y-4">
          {availableRooms.map((room) => (
            <motion.div
              key={room.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => updateBookingData({ roomId: room.id })}
              className={cn(
                'flex flex-col md:flex-row gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all',
                bookingData.roomId === room.id 
                  ? 'border-ocean-500 bg-ocean-50/50' 
                  : 'border-sand-200 hover:border-ocean-300'
              )}
            >
              <div className="relative w-full md:w-40 h-32 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={room.images[0]}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
                {room.featured && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-gold-400 text-navy-500 text-xs font-accent rounded-full flex items-center gap-1">
                    <Star size={10} className="fill-current" />
                    Featured
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-heading text-xl text-navy-500">{room.name}</h3>
                    <p className="text-navy-500/60 text-sm mt-1">{room.size} • Up to {room.capacity} guests</p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-2xl text-ocean-500">{formatCurrency(room.price)}</p>
                    <p className="text-navy-500/50 text-sm">per night</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {room.amenities.slice(0, 4).map((amenity) => (
                    <span key={amenity} className="px-2 py-1 bg-sand-100 text-navy-500/70 text-xs rounded-md">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              {bookingData.roomId === room.id && (
                <div className="flex items-center justify-center md:justify-end">
                  <div className="w-8 h-8 bg-ocean-500 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-4 text-navy-500 font-accent font-medium flex items-center gap-2 hover:text-ocean-500 transition-colors"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!bookingData.roomId}
          className={cn(
            'px-8 py-4 bg-gradient-to-r from-ocean-500 to-ocean-600 text-white font-accent font-semibold rounded-xl flex items-center gap-2 transition-all',
            bookingData.roomId 
              ? 'hover:shadow-lg hover:shadow-ocean-500/30 cursor-pointer' 
              : 'opacity-50 cursor-not-allowed'
          )}
        >
          Continue
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}

// Step 3: Guest Details
function Step3Details({ 
  bookingData, 
  updateBookingData, 
  onNext,
  onBack 
}: { 
  bookingData: BookingData; 
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const isValid = bookingData.firstName && bookingData.lastName && 
    bookingData.email && bookingData.phone;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-3xl p-8 shadow-lg"
    >
      <h2 className="font-heading text-3xl text-navy-500 mb-2">Your Details</h2>
      <p className="text-navy-500/60 mb-8">Enter your contact information</p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-navy-500 font-accent text-sm mb-2">First Name *</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-500" size={20} />
              <input
                type="text"
                value={bookingData.firstName}
                onChange={(e) => updateBookingData({ firstName: e.target.value })}
                className="w-full pl-12 pr-4 py-4 border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500 transition-colors"
                placeholder="John"
              />
            </div>
          </div>
          <div>
            <label className="block text-navy-500 font-accent text-sm mb-2">Last Name *</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-500" size={20} />
              <input
                type="text"
                value={bookingData.lastName}
                onChange={(e) => updateBookingData({ lastName: e.target.value })}
                className="w-full pl-12 pr-4 py-4 border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500 transition-colors"
                placeholder="Doe"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-navy-500 font-accent text-sm mb-2">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-500" size={20} />
            <input
              type="email"
              value={bookingData.email}
              onChange={(e) => updateBookingData({ email: e.target.value })}
              className="w-full pl-12 pr-4 py-4 border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500 transition-colors"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-navy-500 font-accent text-sm mb-2">Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-500" size={20} />
            <input
              type="tel"
              value={bookingData.phone}
              onChange={(e) => updateBookingData({ phone: e.target.value })}
              className="w-full pl-12 pr-4 py-4 border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500 transition-colors"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label className="block text-navy-500 font-accent text-sm mb-2">Special Requests (Optional)</label>
          <textarea
            value={bookingData.specialRequests}
            onChange={(e) => updateBookingData({ specialRequests: e.target.value })}
            rows={3}
            className="w-full px-4 py-4 border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500 transition-colors resize-none"
            placeholder="Any special requirements or preferences..."
          />
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-4 text-navy-500 font-accent font-medium flex items-center gap-2 hover:text-ocean-500 transition-colors"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className={cn(
            'px-8 py-4 bg-gradient-to-r from-ocean-500 to-ocean-600 text-white font-accent font-semibold rounded-xl flex items-center gap-2 transition-all',
            isValid 
              ? 'hover:shadow-lg hover:shadow-ocean-500/30 cursor-pointer' 
              : 'opacity-50 cursor-not-allowed'
          )}
        >
          Continue
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}

// Step 4: Payment
function Step4Payment({ 
  bookingData, 
  updateBookingData,
  onBack,
  onSubmit,
  isProcessing
}: { 
  bookingData: BookingData; 
  updateBookingData: (data: Partial<BookingData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isProcessing: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-3xl p-8 shadow-lg"
    >
      <h2 className="font-heading text-3xl text-navy-500 mb-2">Payment</h2>
      <p className="text-navy-500/60 mb-8">Choose your payment method</p>

      <div className="space-y-6">
        {/* Payment Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => updateBookingData({ paymentMethod: 'card' })}
            className={cn(
              'p-6 rounded-xl border-2 cursor-pointer transition-all',
              bookingData.paymentMethod === 'card'
                ? 'border-ocean-500 bg-ocean-50/50'
                : 'border-sand-200 hover:border-ocean-300'
            )}
          >
            <CreditCard size={32} className="text-ocean-500 mb-3" />
            <h3 className="font-accent font-semibold text-navy-500">Credit/Debit Card</h3>
            <p className="text-navy-500/60 text-sm">Pay securely with your card</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => updateBookingData({ paymentMethod: 'paypal' })}
            className={cn(
              'p-6 rounded-xl border-2 cursor-pointer transition-all',
              bookingData.paymentMethod === 'paypal'
                ? 'border-ocean-500 bg-ocean-50/50'
                : 'border-sand-200 hover:border-ocean-300'
            )}
          >
            <div className="w-8 h-8 bg-[#00457C] rounded-lg flex items-center justify-center text-white text-sm font-bold mb-3">
              PP
            </div>
            <h3 className="font-accent font-semibold text-navy-500">PayPal</h3>
            <p className="text-navy-500/60 text-sm">Pay with your PayPal account</p>
          </motion.div>
        </div>

        {/* Card Form (shown if card selected) */}
        {bookingData.paymentMethod === 'card' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4 pt-4 border-t border-sand-200"
          >
            <div>
              <label className="block text-navy-500 font-accent text-sm mb-2">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-4 border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500 transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-navy-500 font-accent text-sm mb-2">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-4 border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-navy-500 font-accent text-sm mb-2">CVC</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-4 border border-sand-300 rounded-xl focus:outline-none focus:border-ocean-500 transition-colors"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Security Note */}
        <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-xl">
          <Shield size={24} className="text-teal-500" />
          <div>
            <p className="text-navy-500 font-accent text-sm font-medium">Secure Payment</p>
            <p className="text-navy-500/60 text-xs">Your payment information is encrypted and secure</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          disabled={isProcessing}
          className="px-6 py-4 text-navy-500 font-accent font-medium flex items-center gap-2 hover:text-ocean-500 transition-colors disabled:opacity-50"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={isProcessing}
          className="px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-500 font-accent font-semibold rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-gold-400/30 transition-all disabled:opacity-70"
        >
          {isProcessing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-navy-500/30 border-t-navy-500 rounded-full"
              />
              Processing...
            </>
          ) : (
            <>
              Complete Booking
              <ChevronRight size={18} />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

// Booking Summary Sidebar
function BookingSummary({ 
  bookingData, 
  selectedRoom, 
  nights,
  totalPrice,
  taxes,
  grandTotal
}: { 
  bookingData: BookingData; 
  selectedRoom: typeof ROOMS[0] | undefined;
  nights: number;
  totalPrice: number;
  taxes: number;
  grandTotal: number;
}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg sticky top-44">
      <h3 className="font-heading text-xl text-navy-500 mb-6">Booking Summary</h3>

      {selectedRoom && (
        <>
          <div className="relative h-40 rounded-xl overflow-hidden mb-4">
            <Image
              src={selectedRoom.images[0]}
              alt={selectedRoom.name}
              fill
              className="object-cover"
            />
          </div>
          <h4 className="font-heading text-lg text-navy-500">{selectedRoom.name}</h4>
          <p className="text-navy-500/60 text-sm mb-4">{selectedRoom.size} • {selectedRoom.capacity} guests</p>
        </>
      )}

      <div className="space-y-3 py-4 border-t border-b border-sand-200">
        <div className="flex justify-between text-sm">
          <span className="text-navy-500/70">Check-in</span>
          <span className="text-navy-500 font-medium">
            {bookingData.checkIn || '--'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-navy-500/70">Check-out</span>
          <span className="text-navy-500 font-medium">
            {bookingData.checkOut || '--'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-navy-500/70">Guests</span>
          <span className="text-navy-500 font-medium">{bookingData.guests}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-navy-500/70">Nights</span>
          <span className="text-navy-500 font-medium">{nights || '--'}</span>
        </div>
      </div>

      {selectedRoom && nights > 0 && (
        <div className="space-y-3 py-4">
          <div className="flex justify-between text-sm">
            <span className="text-navy-500/70">
              {formatCurrency(selectedRoom.price)} × {nights} nights
            </span>
            <span className="text-navy-500">{formatCurrency(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-navy-500/70">Taxes & Fees (12%)</span>
            <span className="text-navy-500">{formatCurrency(taxes)}</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-sand-200">
            <span className="font-accent font-semibold text-navy-500">Total</span>
            <span className="font-heading text-2xl text-ocean-500">
              {formatCurrency(grandTotal)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Booking Confirmation
function BookingConfirmation({ 
  bookingCode, 
  bookingData, 
  selectedRoom,
  nights,
  grandTotal
}: { 
  bookingCode: string;
  bookingData: BookingData;
  selectedRoom: typeof ROOMS[0];
  nights: number;
  grandTotal: number;
}) {
  return (
    <div className="min-h-screen bg-sand-100 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 mx-auto bg-gradient-to-br from-teal-400 to-teal-500 rounded-full flex items-center justify-center mb-8"
          >
            <Check size={48} className="text-white" />
          </motion.div>

          <h1 className="font-heading text-4xl text-navy-500 mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-navy-500/60 mb-8">
            Thank you for choosing WhiteBay Resort. We can&apos;t wait to welcome you!
          </p>

          <div className="bg-sand-100 rounded-2xl p-6 mb-8">
            <p className="text-navy-500/60 text-sm mb-2">Your Booking Code</p>
            <p className="font-heading text-3xl text-ocean-500 tracking-wider">{bookingCode}</p>
          </div>

          <div className="text-left space-y-4 p-6 bg-gradient-to-r from-ocean-50 to-teal-50 rounded-2xl mb-8">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={selectedRoom.images[0]}
                  alt={selectedRoom.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-heading text-lg text-navy-500">{selectedRoom.name}</h3>
                <p className="text-navy-500/60 text-sm">{nights} nights • {bookingData.guests} guests</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-ocean-100">
              <div>
                <p className="text-navy-500/60 text-xs">Check-in</p>
                <p className="text-navy-500 font-medium">{bookingData.checkIn}</p>
              </div>
              <div>
                <p className="text-navy-500/60 text-xs">Check-out</p>
                <p className="text-navy-500 font-medium">{bookingData.checkOut}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-ocean-100 flex justify-between items-center">
              <span className="text-navy-500/60">Total Paid</span>
              <span className="font-heading text-2xl text-ocean-500">{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <p className="text-navy-500/60 text-sm mb-8">
            A confirmation email has been sent to <span className="text-navy-500">{bookingData.email}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-ocean-500 to-ocean-600 text-white font-accent font-semibold rounded-xl hover:shadow-lg hover:shadow-ocean-500/30 transition-all"
            >
              Return Home
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-ocean-500 text-ocean-500 font-accent font-medium rounded-xl hover:bg-ocean-500 hover:text-white transition-all"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

