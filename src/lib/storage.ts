// Local Storage Management System for Staff & Admin
// This handles all data persistence for the resort management system

// Storage Keys
const STORAGE_KEYS = {
  EVENTS: 'whitebay_events',
  GUESTS: 'whitebay_guests',
  ANNOUNCEMENTS: 'whitebay_announcements',
  STAFF: 'whitebay_staff',
  MESSAGES: 'whitebay_messages',
  PROMOTIONS: 'whitebay_promotions',
  CONTENT: 'whitebay_content',
  TICKET_PURCHASES: 'whitebay_ticket_purchases',
  ROOMS: 'whitebay_rooms',
  ROOM_BOOKINGS: 'whitebay_room_bookings',
};

// Types
export interface TicketType {
  id: string;
  name: string;
  price: number;
  description?: string;
  available: number;
  sold: number;
}

export interface ResortEvent {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  date: string;
  endDate?: string;
  time: string;
  endTime?: string;
  location: string;
  category: 'entertainment' | 'dining' | 'wellness' | 'sports' | 'kids' | 'special';
  image?: string;
  gallery?: string[];
  capacity?: number;
  registered: number;
  isActive: boolean;
  isFeatured?: boolean;
  ticketsEnabled: boolean;
  tickets?: TicketType[];
  createdAt: string;
  createdBy: string;
}

export interface TicketPurchase {
  id: string;
  eventId: string;
  eventTitle: string;
  ticketTypeId: string;
  ticketTypeName: string;
  quantity: number;
  totalPrice: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone?: string;
  confirmationCode: string;
  purchasedAt: string;
  status: 'confirmed' | 'cancelled' | 'used';
}

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roomNumber?: string;
  checkIn?: string;
  checkOut?: string;
  vipStatus: boolean;
  notes?: string;
  preferences?: string[];
  createdAt: string;
  createdBy: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetAudience: 'all' | 'guests' | 'staff';
  isActive: boolean;
  startDate: string;
  endDate?: string;
  createdAt: string;
  createdBy: string;
}

export interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'staff' | 'manager' | 'admin';
  department: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  permissions: string[];
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  type: 'inquiry' | 'feedback' | 'complaint' | 'booking';
  status: 'new' | 'read' | 'replied' | 'closed';
  createdAt: string;
  repliedAt?: string;
  repliedBy?: string;
}

export interface Promotion {
  id: string;
  name: string;
  code: string;
  discount: string;
  description: string;
  terms: string[];
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  usageCount: number;
  maxUsage?: number;
  createdAt: string;
  createdBy: string;
}

// Room Management Types
export interface Room {
  id: string;
  roomNumber: string;
  name: string;
  type: 'ocean-view-suite' | 'beachfront-villa' | 'garden-retreat' | 'family-suite' | 'presidential-suite' | 'honeymoon-haven';
  floor: number;
  pricePerNight: number;
  capacity: number;
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  amenities: string[];
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  lastUpdated: string;
}

export interface RoomBooking {
  id: string;
  bookingCode: string;
  roomId: string;
  roomNumber: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
  totalAmount: number;
  amountPaid: number;
  paymentStatus: 'pending' | 'partial' | 'paid' | 'refunded';
  bookingStatus: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled' | 'no-show';
  specialRequests?: string;
  notes?: string;
  createdAt: string;
  createdBy: string;
  cancelledAt?: string;
  cancelledBy?: string;
  cancellationReason?: string;
}

// Helper functions
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getFromStorage<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveToStorage<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

// ============ EVENTS ============
export function getEvents(): ResortEvent[] {
  return getFromStorage<ResortEvent>(STORAGE_KEYS.EVENTS);
}

export function getActiveEvents(): ResortEvent[] {
  const events = getEvents();
  const now = new Date();
  return events.filter(e => {
    const eventDate = new Date(e.date);
    return e.isActive && eventDate >= now;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function createEvent(event: Omit<ResortEvent, 'id' | 'registered' | 'createdAt'>): ResortEvent {
  const events = getEvents();
  const newEvent: ResortEvent = {
    ...event,
    id: generateId(),
    registered: 0,
    createdAt: new Date().toISOString(),
    ticketsEnabled: event.ticketsEnabled || false,
    tickets: event.tickets?.map(t => ({ ...t, id: generateId(), sold: 0 })) || [],
  };
  events.unshift(newEvent);
  saveToStorage(STORAGE_KEYS.EVENTS, events);
  return newEvent;
}

export function getEventById(id: string): ResortEvent | null {
  const events = getEvents();
  return events.find(e => e.id === id) || null;
}

export function getUpcomingPublicEvents(): ResortEvent[] {
  const events = getEvents();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  return events.filter(e => {
    if (!e.isActive) return false;
    
    const eventDate = new Date(e.date);
    const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    const endDate = e.endDate ? new Date(e.endDate) : null;
    const endDateOnly = endDate ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) : null;
    
    // Include if: event is today or in the future
    if (eventDateOnly >= today) return true;
    
    // Include if: multi-day event that hasn't ended yet (ongoing)
    if (endDateOnly && endDateOnly >= today) return true;
    
    return false;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getFeaturedEvents(): ResortEvent[] {
  return getUpcomingPublicEvents().filter(e => e.isFeatured);
}

export function updateEvent(id: string, updates: Partial<ResortEvent>): ResortEvent | null {
  const events = getEvents();
  const index = events.findIndex(e => e.id === id);
  if (index === -1) return null;
  events[index] = { ...events[index], ...updates };
  saveToStorage(STORAGE_KEYS.EVENTS, events);
  return events[index];
}

export function deleteEvent(id: string): boolean {
  const events = getEvents();
  const filtered = events.filter(e => e.id !== id);
  if (filtered.length === events.length) return false;
  saveToStorage(STORAGE_KEYS.EVENTS, filtered);
  return true;
}

// ============ TICKET PURCHASES ============
export function getTicketPurchases(): TicketPurchase[] {
  return getFromStorage<TicketPurchase>(STORAGE_KEYS.TICKET_PURCHASES);
}

export function getTicketPurchasesByEvent(eventId: string): TicketPurchase[] {
  return getTicketPurchases().filter(p => p.eventId === eventId);
}

export function purchaseTickets(
  eventId: string,
  ticketTypeId: string,
  quantity: number,
  buyerInfo: { name: string; email: string; phone?: string }
): TicketPurchase | null {
  const events = getEvents();
  const eventIndex = events.findIndex(e => e.id === eventId);
  if (eventIndex === -1) return null;

  const event = events[eventIndex];
  if (!event.ticketsEnabled || !event.tickets) return null;

  const ticketIndex = event.tickets.findIndex(t => t.id === ticketTypeId);
  if (ticketIndex === -1) return null;

  const ticket = event.tickets[ticketIndex];
  if (ticket.available - ticket.sold < quantity) return null;

  // Update ticket sold count
  event.tickets[ticketIndex].sold += quantity;
  event.registered += quantity;
  events[eventIndex] = event;
  saveToStorage(STORAGE_KEYS.EVENTS, events);

  // Create purchase record
  const purchases = getTicketPurchases();
  const confirmationCode = `WB${Date.now().toString(36).toUpperCase()}`;
  const purchase: TicketPurchase = {
    id: generateId(),
    eventId,
    eventTitle: event.title,
    ticketTypeId,
    ticketTypeName: ticket.name,
    quantity,
    totalPrice: ticket.price * quantity,
    buyerName: buyerInfo.name,
    buyerEmail: buyerInfo.email,
    buyerPhone: buyerInfo.phone,
    confirmationCode,
    purchasedAt: new Date().toISOString(),
    status: 'confirmed',
  };
  purchases.unshift(purchase);
  saveToStorage(STORAGE_KEYS.TICKET_PURCHASES, purchases);

  return purchase;
}

export function getTicketAvailability(eventId: string): { ticketId: string; name: string; price: number; available: number }[] {
  const event = getEventById(eventId);
  if (!event || !event.ticketsEnabled || !event.tickets) return [];
  
  return event.tickets.map(t => ({
    ticketId: t.id,
    name: t.name,
    price: t.price,
    available: t.available - t.sold,
  }));
}

// ============ GUESTS ============
export function getGuests(): Guest[] {
  return getFromStorage<Guest>(STORAGE_KEYS.GUESTS);
}

export function createGuest(guest: Omit<Guest, 'id' | 'createdAt'>): Guest {
  const guests = getGuests();
  const newGuest: Guest = {
    ...guest,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  guests.unshift(newGuest);
  saveToStorage(STORAGE_KEYS.GUESTS, guests);
  return newGuest;
}

export function updateGuest(id: string, updates: Partial<Guest>): Guest | null {
  const guests = getGuests();
  const index = guests.findIndex(g => g.id === id);
  if (index === -1) return null;
  guests[index] = { ...guests[index], ...updates };
  saveToStorage(STORAGE_KEYS.GUESTS, guests);
  return guests[index];
}

export function deleteGuest(id: string): boolean {
  const guests = getGuests();
  const filtered = guests.filter(g => g.id !== id);
  if (filtered.length === guests.length) return false;
  saveToStorage(STORAGE_KEYS.GUESTS, filtered);
  return true;
}

// ============ ANNOUNCEMENTS ============
export function getAnnouncements(): Announcement[] {
  return getFromStorage<Announcement>(STORAGE_KEYS.ANNOUNCEMENTS);
}

export function getActiveAnnouncements(audience?: 'all' | 'guests' | 'staff'): Announcement[] {
  const announcements = getAnnouncements();
  const now = new Date();
  return announcements.filter(a => {
    const startDate = new Date(a.startDate);
    const endDate = a.endDate ? new Date(a.endDate) : null;
    const isInDateRange = startDate <= now && (!endDate || endDate >= now);
    const matchesAudience = !audience || a.targetAudience === 'all' || a.targetAudience === audience;
    return a.isActive && isInDateRange && matchesAudience;
  });
}

export function createAnnouncement(announcement: Omit<Announcement, 'id' | 'createdAt'>): Announcement {
  const announcements = getAnnouncements();
  const newAnnouncement: Announcement = {
    ...announcement,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  announcements.unshift(newAnnouncement);
  saveToStorage(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
  return newAnnouncement;
}

export function updateAnnouncement(id: string, updates: Partial<Announcement>): Announcement | null {
  const announcements = getAnnouncements();
  const index = announcements.findIndex(a => a.id === id);
  if (index === -1) return null;
  announcements[index] = { ...announcements[index], ...updates };
  saveToStorage(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
  return announcements[index];
}

export function deleteAnnouncement(id: string): boolean {
  const announcements = getAnnouncements();
  const filtered = announcements.filter(a => a.id !== id);
  if (filtered.length === announcements.length) return false;
  saveToStorage(STORAGE_KEYS.ANNOUNCEMENTS, filtered);
  return true;
}

// ============ STAFF ============
export function getStaff(): StaffMember[] {
  return getFromStorage<StaffMember>(STORAGE_KEYS.STAFF);
}

export function getActiveStaff(): StaffMember[] {
  return getStaff().filter(s => s.isActive);
}

export function createStaffMember(staff: Omit<StaffMember, 'id' | 'createdAt'>): StaffMember {
  const staffList = getStaff();
  const newStaff: StaffMember = {
    ...staff,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  staffList.unshift(newStaff);
  saveToStorage(STORAGE_KEYS.STAFF, staffList);
  return newStaff;
}

export function updateStaffMember(id: string, updates: Partial<StaffMember>): StaffMember | null {
  const staffList = getStaff();
  const index = staffList.findIndex(s => s.id === id);
  if (index === -1) return null;
  staffList[index] = { ...staffList[index], ...updates };
  saveToStorage(STORAGE_KEYS.STAFF, staffList);
  return staffList[index];
}

export function deleteStaffMember(id: string): boolean {
  const staffList = getStaff();
  const filtered = staffList.filter(s => s.id !== id);
  if (filtered.length === staffList.length) return false;
  saveToStorage(STORAGE_KEYS.STAFF, filtered);
  return true;
}

// ============ MESSAGES ============
export function getMessages(): Message[] {
  return getFromStorage<Message>(STORAGE_KEYS.MESSAGES);
}

export function getNewMessages(): Message[] {
  return getMessages().filter(m => m.status === 'new');
}

export function createMessage(message: Omit<Message, 'id' | 'status' | 'createdAt'>): Message {
  const messages = getMessages();
  const newMessage: Message = {
    ...message,
    id: generateId(),
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  messages.unshift(newMessage);
  saveToStorage(STORAGE_KEYS.MESSAGES, messages);
  return newMessage;
}

export function updateMessage(id: string, updates: Partial<Message>): Message | null {
  const messages = getMessages();
  const index = messages.findIndex(m => m.id === id);
  if (index === -1) return null;
  messages[index] = { ...messages[index], ...updates };
  saveToStorage(STORAGE_KEYS.MESSAGES, messages);
  return messages[index];
}

export function deleteMessage(id: string): boolean {
  const messages = getMessages();
  const filtered = messages.filter(m => m.id !== id);
  if (filtered.length === messages.length) return false;
  saveToStorage(STORAGE_KEYS.MESSAGES, filtered);
  return true;
}

// ============ PROMOTIONS ============
export function getPromotions(): Promotion[] {
  return getFromStorage<Promotion>(STORAGE_KEYS.PROMOTIONS);
}

export function getActivePromotions(): Promotion[] {
  const promotions = getPromotions();
  const now = new Date();
  return promotions.filter(p => {
    const validFrom = new Date(p.validFrom);
    const validUntil = new Date(p.validUntil);
    const isInDateRange = validFrom <= now && validUntil >= now;
    const hasUsageLeft = !p.maxUsage || p.usageCount < p.maxUsage;
    return p.isActive && isInDateRange && hasUsageLeft;
  });
}

export function createPromotion(promotion: Omit<Promotion, 'id' | 'usageCount' | 'createdAt'>): Promotion {
  const promotions = getPromotions();
  const newPromotion: Promotion = {
    ...promotion,
    id: generateId(),
    usageCount: 0,
    createdAt: new Date().toISOString(),
  };
  promotions.unshift(newPromotion);
  saveToStorage(STORAGE_KEYS.PROMOTIONS, promotions);
  return newPromotion;
}

export function updatePromotion(id: string, updates: Partial<Promotion>): Promotion | null {
  const promotions = getPromotions();
  const index = promotions.findIndex(p => p.id === id);
  if (index === -1) return null;
  promotions[index] = { ...promotions[index], ...updates };
  saveToStorage(STORAGE_KEYS.PROMOTIONS, promotions);
  return promotions[index];
}

export function deletePromotion(id: string): boolean {
  const promotions = getPromotions();
  const filtered = promotions.filter(p => p.id !== id);
  if (filtered.length === promotions.length) return false;
  saveToStorage(STORAGE_KEYS.PROMOTIONS, filtered);
  return true;
}

// ============ ROOM MANAGEMENT ============
export function getRooms(): Room[] {
  return getFromStorage<Room>(STORAGE_KEYS.ROOMS);
}

export function getActiveRooms(): Room[] {
  return getRooms().filter(r => r.isActive);
}

export function getAvailableRooms(): Room[] {
  return getRooms().filter(r => r.isActive && r.status === 'available');
}

export function getOccupiedRooms(): Room[] {
  return getRooms().filter(r => r.status === 'occupied');
}

export function getRoomById(id: string): Room | undefined {
  return getRooms().find(r => r.id === id);
}

export function getRoomByNumber(roomNumber: string): Room | undefined {
  return getRooms().find(r => r.roomNumber === roomNumber);
}

export function createRoom(room: Omit<Room, 'id' | 'createdAt' | 'lastUpdated'>): Room {
  const newRoom: Room = {
    ...room,
    id: generateId(),
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  };
  const rooms = getRooms();
  rooms.push(newRoom);
  saveToStorage(STORAGE_KEYS.ROOMS, rooms);
  return newRoom;
}

export function updateRoom(id: string, updates: Partial<Room>): Room | null {
  const rooms = getRooms();
  const index = rooms.findIndex(r => r.id === id);
  if (index === -1) return null;
  rooms[index] = { ...rooms[index], ...updates, lastUpdated: new Date().toISOString() };
  saveToStorage(STORAGE_KEYS.ROOMS, rooms);
  return rooms[index];
}

export function updateRoomStatus(id: string, status: Room['status']): Room | null {
  return updateRoom(id, { status });
}

export function deleteRoom(id: string): boolean {
  const rooms = getRooms();
  const filtered = rooms.filter(r => r.id !== id);
  if (filtered.length === rooms.length) return false;
  saveToStorage(STORAGE_KEYS.ROOMS, filtered);
  return true;
}

// ============ ROOM BOOKINGS ============
export function getRoomBookings(): RoomBooking[] {
  return getFromStorage<RoomBooking>(STORAGE_KEYS.ROOM_BOOKINGS);
}

export function getActiveRoomBookings(): RoomBooking[] {
  return getRoomBookings().filter(b => 
    b.bookingStatus === 'confirmed' || b.bookingStatus === 'checked-in'
  );
}

export function getPastRoomBookings(): RoomBooking[] {
  return getRoomBookings().filter(b => 
    b.bookingStatus === 'checked-out' || b.bookingStatus === 'cancelled' || b.bookingStatus === 'no-show'
  );
}

export function getRoomBookingById(id: string): RoomBooking | undefined {
  return getRoomBookings().find(b => b.id === id);
}

export function getRoomBookingByCode(code: string): RoomBooking | undefined {
  return getRoomBookings().find(b => b.bookingCode === code);
}

export function getBookingsForRoom(roomId: string): RoomBooking[] {
  return getRoomBookings().filter(b => b.roomId === roomId);
}

export function getCurrentBookingForRoom(roomId: string): RoomBooking | undefined {
  const today = new Date().toISOString().split('T')[0];
  return getRoomBookings().find(b => 
    b.roomId === roomId && 
    (b.bookingStatus === 'confirmed' || b.bookingStatus === 'checked-in') &&
    b.checkIn <= today && 
    b.checkOut > today
  );
}

function generateBookingCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'WB-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function createRoomBooking(booking: Omit<RoomBooking, 'id' | 'bookingCode' | 'createdAt'>): RoomBooking {
  const newBooking: RoomBooking = {
    ...booking,
    id: generateId(),
    bookingCode: generateBookingCode(),
    createdAt: new Date().toISOString(),
  };
  
  const bookings = getRoomBookings();
  bookings.push(newBooking);
  saveToStorage(STORAGE_KEYS.ROOM_BOOKINGS, bookings);
  
  // Update room status to reserved/occupied
  const room = getRoomById(booking.roomId);
  if (room) {
    const today = new Date().toISOString().split('T')[0];
    if (booking.checkIn <= today && booking.checkOut > today) {
      updateRoomStatus(booking.roomId, 'occupied');
    } else if (booking.checkIn > today) {
      updateRoomStatus(booking.roomId, 'reserved');
    }
  }
  
  return newBooking;
}

export function updateRoomBooking(id: string, updates: Partial<RoomBooking>): RoomBooking | null {
  const bookings = getRoomBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index === -1) return null;
  bookings[index] = { ...bookings[index], ...updates };
  saveToStorage(STORAGE_KEYS.ROOM_BOOKINGS, bookings);
  return bookings[index];
}

export function cancelRoomBooking(id: string, cancelledBy: string, reason?: string): RoomBooking | null {
  const booking = getRoomBookingById(id);
  if (!booking) return null;
  
  const updatedBooking = updateRoomBooking(id, {
    bookingStatus: 'cancelled',
    cancelledAt: new Date().toISOString(),
    cancelledBy,
    cancellationReason: reason,
  });
  
  // Update room status back to available
  if (updatedBooking) {
    updateRoomStatus(booking.roomId, 'available');
  }
  
  return updatedBooking;
}

export function checkInGuest(bookingId: string): RoomBooking | null {
  const booking = getRoomBookingById(bookingId);
  if (!booking) return null;
  
  const updated = updateRoomBooking(bookingId, { bookingStatus: 'checked-in' });
  if (updated) {
    updateRoomStatus(booking.roomId, 'occupied');
  }
  return updated;
}

export function checkOutGuest(bookingId: string): RoomBooking | null {
  const booking = getRoomBookingById(bookingId);
  if (!booking) return null;
  
  const updated = updateRoomBooking(bookingId, { bookingStatus: 'checked-out' });
  if (updated) {
    updateRoomStatus(booking.roomId, 'available');
  }
  return updated;
}

// Get room statistics
export function getRoomStats() {
  const rooms = getRooms();
  const bookings = getRoomBookings();
  const today = new Date().toISOString().split('T')[0];
  
  const totalRooms = rooms.filter(r => r.isActive).length;
  const available = rooms.filter(r => r.isActive && r.status === 'available').length;
  const occupied = rooms.filter(r => r.status === 'occupied').length;
  const reserved = rooms.filter(r => r.status === 'reserved').length;
  const maintenance = rooms.filter(r => r.status === 'maintenance').length;
  
  const todayCheckIns = bookings.filter(b => b.checkIn === today && b.bookingStatus === 'confirmed').length;
  const todayCheckOuts = bookings.filter(b => b.checkOut === today && b.bookingStatus === 'checked-in').length;
  
  const totalBookings = bookings.length;
  const activeBookings = bookings.filter(b => b.bookingStatus === 'confirmed' || b.bookingStatus === 'checked-in').length;
  const cancelledBookings = bookings.filter(b => b.bookingStatus === 'cancelled').length;
  
  const totalRevenue = bookings
    .filter(b => b.bookingStatus !== 'cancelled')
    .reduce((sum, b) => sum + b.amountPaid, 0);
  
  return {
    totalRooms,
    available,
    occupied,
    reserved,
    maintenance,
    occupancyRate: totalRooms > 0 ? Math.round((occupied / totalRooms) * 100) : 0,
    todayCheckIns,
    todayCheckOuts,
    totalBookings,
    activeBookings,
    cancelledBookings,
    totalRevenue,
  };
}

// Auto-update room statuses based on booking dates
export function updateRoomStatusesFromBookings(): void {
  if (typeof window === 'undefined') return;
  
  const rooms = getRooms();
  const bookings = getRoomBookings();
  const today = new Date().toISOString().split('T')[0];
  
  rooms.forEach(room => {
    if (room.status === 'maintenance') return; // Don't change maintenance rooms
    
    // Find current active booking for this room
    const activeBooking = bookings.find(b => 
      b.roomId === room.id &&
      (b.bookingStatus === 'confirmed' || b.bookingStatus === 'checked-in') &&
      b.checkIn <= today &&
      b.checkOut > today
    );
    
    // Find upcoming booking for this room
    const upcomingBooking = bookings.find(b => 
      b.roomId === room.id &&
      b.bookingStatus === 'confirmed' &&
      b.checkIn > today
    );
    
    if (activeBooking) {
      if (room.status !== 'occupied') {
        updateRoomStatus(room.id, 'occupied');
      }
    } else if (upcomingBooking) {
      // Check if booking starts within next 24 hours
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      if (upcomingBooking.checkIn <= tomorrow) {
        if (room.status !== 'reserved') {
          updateRoomStatus(room.id, 'reserved');
        }
      } else if (room.status !== 'available') {
        updateRoomStatus(room.id, 'available');
      }
    } else {
      // No active or upcoming booking
      if (room.status !== 'available') {
        updateRoomStatus(room.id, 'available');
      }
    }
  });
  
  // Also check for expired bookings and mark them as checked-out
  bookings.forEach(booking => {
    if (booking.bookingStatus === 'checked-in' && booking.checkOut <= today) {
      checkOutGuest(booking.id);
    }
  });
}

// ============ DASHBOARD STATS ============
export function getStaffDashboardStats() {
  const events = getActiveEvents();
  const guests = getGuests();
  const announcements = getActiveAnnouncements();
  const messages = getNewMessages();

  return {
    activeEvents: events.length,
    totalGuests: guests.length,
    activeAnnouncements: announcements.length,
    newMessages: messages.length,
    upcomingEvents: events.slice(0, 5),
    recentGuests: guests.slice(0, 5),
  };
}

export function getAdminDashboardStats() {
  const staffStats = getStaffDashboardStats();
  const staff = getActiveStaff();
  const promotions = getActivePromotions();
  const allMessages = getMessages();
  const roomStats = getRoomStats();

  return {
    ...staffStats,
    totalStaff: staff.length,
    activePromotions: promotions.length,
    totalMessages: allMessages.length,
    messagesByStatus: {
      new: allMessages.filter(m => m.status === 'new').length,
      read: allMessages.filter(m => m.status === 'read').length,
      replied: allMessages.filter(m => m.status === 'replied').length,
      closed: allMessages.filter(m => m.status === 'closed').length,
    },
    roomStats,
  };
}

// ============ AUTO-CLEANUP (for expired events, etc.) ============
export function runAutoCleanup(): void {
  if (typeof window === 'undefined') return;

  // Archive past events (mark as inactive)
  const events = getEvents();
  const now = new Date();
  let eventsUpdated = false;
  events.forEach(event => {
    const eventDate = new Date(event.date);
    if (eventDate < now && event.isActive) {
      event.isActive = false;
      eventsUpdated = true;
    }
  });
  if (eventsUpdated) {
    saveToStorage(STORAGE_KEYS.EVENTS, events);
  }

  // Deactivate expired announcements
  const announcements = getAnnouncements();
  let announcementsUpdated = false;
  announcements.forEach(announcement => {
    if (announcement.endDate) {
      const endDate = new Date(announcement.endDate);
      if (endDate < now && announcement.isActive) {
        announcement.isActive = false;
        announcementsUpdated = true;
      }
    }
  });
  if (announcementsUpdated) {
    saveToStorage(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
  }

  // Deactivate expired promotions
  const promotions = getPromotions();
  let promotionsUpdated = false;
  promotions.forEach(promotion => {
    const validUntil = new Date(promotion.validUntil);
    if (validUntil < now && promotion.isActive) {
      promotion.isActive = false;
      promotionsUpdated = true;
    }
  });
  if (promotionsUpdated) {
    saveToStorage(STORAGE_KEYS.PROMOTIONS, promotions);
  }
}

// Track if initialization has run
let initialized = false;

// Initialize sample data if empty - runs once per session
export function initializeSampleData(): void {
  if (typeof window === 'undefined') return;
  if (initialized) return;
  
  // Check if data already exists to avoid unnecessary work
  const existingEvents = localStorage.getItem(STORAGE_KEYS.EVENTS);
  if (existingEvents) {
    initialized = true;
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const in2Days = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const in3Days = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const in5Days = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const in7Days = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Sample Events
  if (getEvents().length === 0) {
    const sampleEvents: Omit<ResortEvent, 'id' | 'registered' | 'createdAt'>[] = [
      // LIVE EVENT - Happening Today
      {
        title: 'Pool Party DJ Set',
        description: 'Join our resident DJ for an amazing pool party with tropical cocktails!',
        longDescription: 'Get ready for the ultimate pool party experience! Our resident DJ will be spinning tropical house and summer hits all afternoon. Enjoy complimentary welcome cocktails, pool games, and great vibes. Floaties and pool toys provided. Perfect for adults and families alike!',
        date: today,
        time: '2:00 PM',
        endTime: '6:00 PM',
        location: 'Infinity Pool',
        category: 'entertainment',
        image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&h=600&fit=crop&q=80',
        capacity: 100,
        isActive: true,
        isFeatured: true,
        ticketsEnabled: true,
        tickets: [
          { id: '', name: 'Pool Access', price: 15000, description: 'Includes welcome cocktail', available: 100, sold: 12 },
          { id: '', name: 'VIP Cabana', price: 120000, description: 'Private cabana for 4 + bottle service', available: 5, sold: 1 },
        ],
        createdBy: 'System',
      },
      // LIVE EVENT - Happening Today
      {
        title: 'Sunset Beach Meditation',
        description: 'End your day with a peaceful guided meditation on the beach.',
        longDescription: 'Find your inner peace as the sun sets over the ocean. Our experienced meditation guide will lead you through breathing exercises and mindfulness practices designed to relax and rejuvenate. No experience necessary. Blankets and cushions provided.',
        date: today,
        time: '5:30 PM',
        endTime: '6:30 PM',
        location: 'Private Beach',
        category: 'wellness',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop&q=80',
        capacity: 30,
        isActive: true,
        isFeatured: false,
        ticketsEnabled: true,
        tickets: [
          { id: '', name: 'General Admission', price: 0, description: 'Complimentary for resort guests', available: 30, sold: 8 },
        ],
        createdBy: 'System',
      },
      // ONGOING EVENT - Multi-day wellness retreat
      {
        title: 'Wellness Week Retreat',
        description: 'A 5-day immersive wellness experience with yoga, spa, and healthy dining.',
        longDescription: 'Transform your mind and body with our comprehensive Wellness Week Retreat. Includes daily yoga sessions, meditation classes, spa treatments, nutritional workshops, healthy gourmet meals, and personal wellness consultations. Join at any point during the week or book the full experience.',
        date: yesterday,
        endDate: in3Days,
        time: '7:00 AM',
        endTime: '9:00 PM',
        location: 'Spa & Wellness Center',
        category: 'wellness',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop&q=80',
        capacity: 20,
        isActive: true,
        isFeatured: true,
        ticketsEnabled: true,
        tickets: [
          { id: '', name: 'Full Week Pass', price: 500000, description: 'All activities + 3 spa treatments', available: 15, sold: 7 },
          { id: '', name: 'Day Pass', price: 75000, description: 'Single day access to all activities', available: 10, sold: 3 },
        ],
        createdBy: 'System',
      },
      // ONGOING EVENT - Art exhibition
      {
        title: 'Ocean Art Exhibition',
        description: 'Featuring works by local artists inspired by the sea and coastal life.',
        longDescription: 'Explore our curated collection of paintings, sculptures, and photographs celebrating the beauty of ocean life. Meet the artists during evening receptions, participate in workshops, and find the perfect piece to take home. Exhibition runs daily with special events throughout.',
        date: yesterday,
        endDate: in7Days,
        time: '10:00 AM',
        endTime: '8:00 PM',
        location: 'Garden Pavilion',
        category: 'special',
        image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&h=600&fit=crop&q=80',
        capacity: 200,
        isActive: true,
        isFeatured: false,
        ticketsEnabled: true,
        tickets: [
          { id: '', name: 'Exhibition Entry', price: 0, description: 'Free entry for all guests', available: 200, sold: 45 },
          { id: '', name: 'Art Workshop', price: 45000, description: 'Includes materials and instruction', available: 12, sold: 5 },
        ],
        createdBy: 'System',
      },
      // UPCOMING EVENT
      {
        title: 'Beach Sunset Yoga',
        description: 'Join us for a relaxing yoga session as the sun sets over the ocean.',
        longDescription: 'Experience the ultimate relaxation as you flow through gentle yoga poses while the sun paints the sky in brilliant oranges and pinks. Our certified yoga instructor will guide you through a 75-minute session designed for all skill levels. Mats and props provided. Light refreshments served after class.',
        date: tomorrow,
        time: '5:30 PM',
        endTime: '6:45 PM',
        location: 'Private Beach',
        category: 'wellness',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop&q=80',
        capacity: 20,
        isActive: true,
        isFeatured: true,
        ticketsEnabled: true,
        tickets: [
          { id: '', name: 'General Admission', price: 20000, description: 'Includes yoga mat and props', available: 20, sold: 0 },
        ],
        createdBy: 'System',
      },
      // UPCOMING EVENT
      {
        title: 'Wine Tasting Evening',
        description: 'Sample exquisite wines from around the world paired with gourmet cheeses.',
        longDescription: 'Join our sommelier for an exclusive evening of wine discovery. Taste 8 premium wines from renowned vineyards across France, Italy, and California, expertly paired with artisanal cheeses, charcuterie, and gourmet bites. Learn about wine regions, tasting techniques, and food pairings in this sophisticated evening experience.',
        date: in2Days,
        time: '7:00 PM',
        endTime: '9:30 PM',
        location: 'Bay Lounge',
        category: 'dining',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop&q=80',
        capacity: 30,
        isActive: true,
        isFeatured: true,
        ticketsEnabled: true,
        tickets: [
          { id: '', name: 'Standard Tasting', price: 50000, description: '8 wines + cheese pairing', available: 20, sold: 0 },
          { id: '', name: 'Premium Experience', price: 85000, description: 'Includes rare vintages + private table', available: 10, sold: 0 },
        ],
        createdBy: 'System',
      },
      // UPCOMING EVENT
      {
        title: 'Kids Treasure Hunt',
        description: 'An exciting treasure hunt adventure for our young guests.',
        longDescription: 'Pirates ahoy! Young adventurers aged 4-12 are invited to join Captain Jack on a thrilling treasure hunt through the resort grounds. Follow clues, solve puzzles, and discover hidden treasures. Every child receives a treasure bag of goodies and a certificate of completion. Parents welcome to watch or enjoy some free time!',
        date: tomorrow,
        time: '10:00 AM',
        endTime: '12:00 PM',
        location: 'Garden Area',
        category: 'kids',
        image: 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800&h=600&fit=crop&q=80',
        capacity: 15,
        isActive: true,
        isFeatured: false,
        ticketsEnabled: true,
        tickets: [
          { id: '', name: 'Child Ticket', price: 15000, description: 'Ages 4-12, includes treasure bag', available: 15, sold: 0 },
        ],
        createdBy: 'System',
      },
      // UPCOMING EVENT
      {
        title: 'Live Jazz Night',
        description: 'Enjoy smooth jazz under the stars with cocktails and dinner.',
        longDescription: 'Transform your evening with the enchanting sounds of the WhiteBay Jazz Quartet. This special dinner event features a 4-course gourmet meal, premium cocktails, and live jazz performance on our oceanfront terrace. Dance under the stars or simply relax and let the music wash over you.',
        date: in5Days,
        time: '7:30 PM',
        endTime: '11:00 PM',
        location: 'Ocean Terrace',
        category: 'entertainment',
        image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop&q=80',
        capacity: 60,
        isActive: true,
        isFeatured: true,
        ticketsEnabled: true,
        tickets: [
          { id: '', name: 'Dinner & Show', price: 65000, description: '4-course dinner + premium seating', available: 40, sold: 0 },
          { id: '', name: 'VIP Table', price: 250000, description: 'Table for 4 + champagne + priority seating', available: 5, sold: 0 },
        ],
        createdBy: 'System',
      },
      // UPCOMING EVENT
      {
        title: 'Beach Volleyball Tournament',
        description: 'Join our friendly beach volleyball competition with prizes!',
        longDescription: 'Bump, set, spike! Whether you\'re a pro or just looking for fun, join our beach volleyball tournament. Form a team of 4 or sign up solo and we\'ll match you. Prizes for winners, refreshments for all participants, and great beach vibes guaranteed. All skill levels welcome!',
        date: in3Days,
        time: '3:00 PM',
        endTime: '6:00 PM',
        location: 'Beach Courts',
        category: 'sports',
        image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=600&fit=crop&q=80',
        capacity: 32,
        isActive: true,
        isFeatured: false,
        ticketsEnabled: true,
        tickets: [
          { id: '', name: 'Team Entry (4 players)', price: 45000, description: 'Register your team', available: 8, sold: 0 },
          { id: '', name: 'Solo Player', price: 15000, description: 'We\'ll match you with a team', available: 16, sold: 0 },
        ],
        createdBy: 'System',
      },
      // UPCOMING EVENT
      {
        title: 'Seafood BBQ Night',
        description: 'Fresh-caught seafood grilled to perfection on the beach.',
        longDescription: 'Join us for an unforgettable beachfront dining experience. Our chefs will grill the freshest lobster, shrimp, fish, and more right before your eyes. Includes unlimited sides, tropical cocktails, and live acoustic music as the sun sets.',
        date: in3Days,
        time: '6:30 PM',
        endTime: '10:00 PM',
        location: 'Beach Grill',
        category: 'dining',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop&q=80',
        capacity: 50,
        isActive: true,
        isFeatured: false,
        ticketsEnabled: true,
        tickets: [
          { id: '', name: 'Adult', price: 55000, description: 'Full seafood buffet + 2 drinks', available: 40, sold: 0 },
          { id: '', name: 'Child (under 12)', price: 25000, description: 'Kids menu + soft drinks', available: 20, sold: 0 },
        ],
        createdBy: 'System',
      },
    ];
    sampleEvents.forEach(event => createEvent(event));
  }

  // Sample Announcements
  if (getAnnouncements().length === 0) {
    createAnnouncement({
      title: 'Pool Maintenance Schedule',
      content: 'The infinity pool will undergo maintenance every Tuesday from 8-10 AM.',
      priority: 'medium',
      targetAudience: 'guests',
      isActive: true,
      startDate: new Date().toISOString(),
      createdBy: 'System',
    });
  }

  // Sample Rooms
  if (getRooms().length === 0) {
    const roomTypes: Array<{ type: Room['type']; name: string; price: number; capacity: number; amenities: string[] }> = [
      { type: 'ocean-view-suite', name: 'Ocean View Suite', price: 350000, capacity: 2, amenities: ['Ocean View', 'Private Balcony', 'Mini Bar', 'Smart TV', 'Free WiFi', 'Room Service'] },
      { type: 'beachfront-villa', name: 'Beachfront Villa', price: 650000, capacity: 4, amenities: ['Beach Access', 'Private Pool', 'Butler Service', 'Outdoor Shower', 'Kitchenette', 'Living Area'] },
      { type: 'garden-retreat', name: 'Garden Retreat', price: 250000, capacity: 2, amenities: ['Garden View', 'Terrace', 'Mini Bar', 'Smart TV', 'Free WiFi', 'Coffee Maker'] },
      { type: 'family-suite', name: 'Family Suite', price: 450000, capacity: 6, amenities: ['Ocean View', 'Connecting Rooms', 'Kids Amenities', 'Gaming Console', 'Living Area', 'Kitchenette'] },
      { type: 'presidential-suite', name: 'Presidential Suite', price: 1200000, capacity: 4, amenities: ['Panoramic Views', 'Private Terrace', 'Butler Service', 'Private Chef', 'Jacuzzi', 'Study Room'] },
      { type: 'honeymoon-haven', name: 'Honeymoon Haven', price: 520000, capacity: 2, amenities: ['Ocean View', 'Private Jacuzzi', 'Champagne', 'Rose Petals', 'Couples Spa', 'Romantic Dining'] },
    ];

    let roomNumber = 100;
    roomTypes.forEach((rt, typeIndex) => {
      // Create multiple rooms of each type
      const count = rt.type === 'presidential-suite' ? 2 : rt.type === 'beachfront-villa' ? 4 : 6;
      for (let i = 0; i < count; i++) {
        createRoom({
          roomNumber: String(roomNumber + typeIndex * 100 + i + 1),
          name: `${rt.name} ${i + 1}`,
          type: rt.type,
          floor: Math.floor(roomNumber / 100),
          pricePerNight: rt.price,
          capacity: rt.capacity,
          status: Math.random() > 0.7 ? 'occupied' : 'available',
          amenities: rt.amenities,
          description: `Luxurious ${rt.name} with premium amenities and stunning views.`,
          isActive: true,
        });
      }
    });
  }

  // Sample Room Bookings (a few active ones)
  if (getRoomBookings().length === 0) {
    const rooms = getRooms();
    const occupiedRooms = rooms.filter(r => r.status === 'occupied').slice(0, 3);
    
    const yesterday = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const in3Days = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const in5Days = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    occupiedRooms.forEach((room, idx) => {
      createRoomBooking({
        roomId: room.id,
        roomNumber: room.roomNumber,
        roomName: room.name,
        guestName: ['Chinedu Okafor', 'Amara Eze', 'Tunde Bakare'][idx] || 'Guest',
        guestEmail: `guest${idx + 1}@example.com`,
        guestPhone: `+234 80${idx}1234567`,
        checkIn: yesterday,
        checkOut: idx === 0 ? in3Days : in5Days,
        numberOfGuests: room.capacity,
        totalAmount: room.pricePerNight * (idx === 0 ? 4 : 6),
        amountPaid: room.pricePerNight * (idx === 0 ? 4 : 6),
        paymentStatus: 'paid',
        bookingStatus: 'checked-in',
        createdBy: 'System',
      });
    });
  }
  
  initialized = true;
}

