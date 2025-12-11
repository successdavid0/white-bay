import { createClient, SupabaseClient } from '@supabase/supabase-js';

// These would come from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create client only if configured
let supabase: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured');
  }
  if (!supabase) {
    supabase = createClient(supabaseUrl!, supabaseAnonKey!);
  }
  return supabase;
}

// Database types
export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  size: string;
  bed_type: string;
  images: string[];
  amenities: string[];
  featured: boolean;
  status: 'available' | 'maintenance' | 'booked';
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  room_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'refunded';
  booking_status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  booking_code: string;
  special_requests?: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: 'guest' | 'admin' | 'manager' | 'staff';
  created_at: string;
}

// Extended booking type with guest info for admin views
export interface BookingWithGuest extends Booking {
  guest_first_name: string;
  guest_last_name: string;
  guest_email: string;
  guest_phone: string;
  room_name: string;
  nights?: number;
}

// ============================================
// LOCAL STORAGE FALLBACK (for demo/dev mode)
// ============================================
const BOOKINGS_STORAGE_KEY = 'whitebay_bookings';

// Storage event listeners for real-time updates across tabs
type BookingListener = (bookings: BookingWithGuest[]) => void;
const bookingListeners: BookingListener[] = [];

function notifyListeners() {
  const bookings = getLocalBookings();
  bookingListeners.forEach(listener => listener(bookings));
}

// Listen for storage changes from other tabs
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === BOOKINGS_STORAGE_KEY) {
      notifyListeners();
    }
  });
}

function getLocalBookings(): BookingWithGuest[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveLocalBooking(booking: BookingWithGuest): BookingWithGuest {
  if (typeof window === 'undefined') return booking;
  const bookings = getLocalBookings();
  bookings.unshift(booking); // Add to beginning (newest first)
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
  // Notify listeners (for real-time updates within same tab)
  setTimeout(() => notifyListeners(), 100);
  return booking;
}

function subscribeToLocalBookings(callback: BookingListener): () => void {
  bookingListeners.push(callback);
  return () => {
    const index = bookingListeners.indexOf(callback);
    if (index > -1) {
      bookingListeners.splice(index, 1);
    }
  };
}

// API Functions
export async function getRooms() {
  if (!isSupabaseConfigured) return [];
  
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('rooms')
    .select('*')
    .eq('status', 'available')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Room[];
}

export async function getRoomById(id: string) {
  if (!isSupabaseConfigured) return null;
  
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('rooms')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Room;
}

export async function createBooking(booking: Omit<Booking, 'id' | 'created_at'>) {
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured - booking not saved');
    return null;
  }
  
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('bookings')
    .insert([booking])
    .select()
    .single();
  
  if (error) throw error;
  return data as Booking;
}

export async function getBookingByCode(code: string) {
  if (!isSupabaseConfigured) return null;
  
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('bookings')
    .select(`
      *,
      room:rooms(*),
      user:users(*)
    `)
    .eq('booking_code', code)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getUserBookings(userId: string) {
  if (!isSupabaseConfigured) return [];
  
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('bookings')
    .select(`
      *,
      room:rooms(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Admin functions
export async function getAllBookings() {
  if (!isSupabaseConfigured) return [];
  
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('bookings')
    .select(`
      *,
      room:rooms(*),
      user:users(*)
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function updateBookingStatus(
  bookingId: string, 
  status: Booking['booking_status']
) {
  if (!isSupabaseConfigured) return null;
  
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('bookings')
    .update({ booking_status: status })
    .eq('id', bookingId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updatePaymentStatus(
  bookingId: string, 
  status: Booking['payment_status']
) {
  if (!isSupabaseConfigured) return null;
  
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('bookings')
    .update({ payment_status: status })
    .eq('id', bookingId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Analytics functions
export async function getBookingStats() {
  if (!isSupabaseConfigured) {
    return {
      totalRevenue: 0,
      totalBookings: 0,
      pendingBookings: 0,
      confirmedBookings: 0,
    };
  }
  
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('bookings')
    .select('total_amount, booking_status, created_at');
  
  if (error) throw error;
  
  const stats = {
    totalRevenue: data
      .filter(b => b.booking_status === 'confirmed' || b.booking_status === 'completed')
      .reduce((sum, b) => sum + b.total_amount, 0),
    totalBookings: data.length,
    pendingBookings: data.filter(b => b.booking_status === 'pending').length,
    confirmedBookings: data.filter(b => b.booking_status === 'confirmed').length,
  };
  
  return stats;
}

export async function checkRoomAvailability(
  roomId: string,
  checkIn: string,
  checkOut: string
) {
  if (!isSupabaseConfigured) return true;
  
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('bookings')
    .select('id')
    .eq('room_id', roomId)
    .neq('booking_status', 'cancelled')
    .or(`check_in.lte.${checkOut},check_out.gte.${checkIn}`);
  
  if (error) throw error;
  return data.length === 0; // Returns true if available
}

// Create a booking with guest info (for guest bookings without user accounts)
export async function createGuestBooking(bookingData: {
  room_id: string;
  room_name: string;
  check_in: string;
  check_out: string;
  guests: number;
  nights: number;
  total_amount: number;
  booking_code: string;
  guest_first_name: string;
  guest_last_name: string;
  guest_email: string;
  guest_phone: string;
  special_requests?: string;
  payment_method: string;
}) {
  const bookingRecord: BookingWithGuest = {
    id: `local-${Date.now()}`,
    user_id: '',
    room_id: bookingData.room_id,
    room_name: bookingData.room_name,
    check_in: bookingData.check_in,
    check_out: bookingData.check_out,
    guests: bookingData.guests,
    total_amount: bookingData.total_amount,
    payment_status: 'paid',
    booking_status: 'confirmed',
    booking_code: bookingData.booking_code,
    special_requests: bookingData.special_requests,
    created_at: new Date().toISOString(),
    guest_first_name: bookingData.guest_first_name,
    guest_last_name: bookingData.guest_last_name,
    guest_email: bookingData.guest_email,
    guest_phone: bookingData.guest_phone,
  };

  // Use local storage when Supabase is not configured
  if (!isSupabaseConfigured) {
    console.log('Using local storage for booking (Supabase not configured)');
    return saveLocalBooking(bookingRecord);
  }
  
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('bookings')
    .insert([{
      ...bookingData,
      payment_status: 'paid',
      booking_status: 'confirmed',
      created_at: new Date().toISOString(),
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// Get all bookings for admin with real-time support
export async function getAdminBookings() {
  // Use local storage when Supabase is not configured
  if (!isSupabaseConfigured) {
    return getLocalBookings();
  }
  
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as BookingWithGuest[];
}

// Subscribe to new bookings (real-time)
export function subscribeToBookings(callback: (payload: { 
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: BookingWithGuest | null;
  old: BookingWithGuest | null;
}) => void) {
  // Use local storage subscription when Supabase is not configured
  if (!isSupabaseConfigured) {
    let previousBookings = getLocalBookings();
    
    const unsubscribe = subscribeToLocalBookings((bookings) => {
      // Check if there's a new booking
      if (bookings.length > previousBookings.length) {
        const newBooking = bookings[0]; // Newest booking is first
        callback({
          eventType: 'INSERT',
          new: newBooking,
          old: null,
        });
      }
      previousBookings = bookings;
    });
    
    return unsubscribe;
  }
  
  const client = getSupabaseClient();
  const channel = client
    .channel('bookings-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'bookings'
      },
      (payload) => {
        callback({
          eventType: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE',
          new: payload.new as BookingWithGuest | null,
          old: payload.old as BookingWithGuest | null,
        });
      }
    )
    .subscribe();
  
  return () => {
    client.removeChannel(channel);
  };
}

// Get dashboard stats
export async function getDashboardStats() {
  let bookings: BookingWithGuest[];
  
  // Use local storage when Supabase is not configured
  if (!isSupabaseConfigured) {
    bookings = getLocalBookings();
  } else {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    bookings = data as BookingWithGuest[];
  }
  
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const recentBookings = bookings.filter(b => 
    new Date(b.created_at) >= thirtyDaysAgo
  );
  
  const confirmedBookings = bookings.filter(b => 
    b.booking_status === 'confirmed' || b.booking_status === 'completed'
  );
  
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0);
  
  return {
    totalRevenue,
    totalBookings: bookings.length,
    recentBookings: recentBookings.length,
    pendingBookings: bookings.filter(b => b.booking_status === 'pending').length,
    confirmedBookings: confirmedBookings.length,
    cancelledBookings: bookings.filter(b => b.booking_status === 'cancelled').length,
    bookings: bookings.slice(0, 10), // Get latest 10 for dashboard
  };
}

