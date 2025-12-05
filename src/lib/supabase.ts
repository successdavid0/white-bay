import { createClient } from '@supabase/supabase-js';

// These would come from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

// API Functions
export async function getRooms() {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('status', 'available')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Room[];
}

export async function getRoomById(id: string) {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Room;
}

export async function createBooking(booking: Omit<Booking, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([booking])
    .select()
    .single();
  
  if (error) throw error;
  return data as Booking;
}

export async function getBookingByCode(code: string) {
  const { data, error } = await supabase
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
  const { data, error } = await supabase
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
  const { data, error } = await supabase
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
  const { data, error } = await supabase
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
  const { data, error } = await supabase
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
  const { data, error } = await supabase
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
  const { data, error } = await supabase
    .from('bookings')
    .select('id')
    .eq('room_id', roomId)
    .neq('booking_status', 'cancelled')
    .or(`check_in.lte.${checkOut},check_out.gte.${checkIn}`);
  
  if (error) throw error;
  return data.length === 0; // Returns true if available
}

