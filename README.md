# 🏖️ WhiteBay Resort - Modern Web Platform

A stunning, fully responsive luxury resort website built with Next.js 14, TypeScript, TailwindCSS, and Framer Motion. Features beautiful animations, a complete booking system, and an admin dashboard.

![WhiteBay Resort](https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop&q=80)

## ✨ Features

### 🎨 Frontend Features
- **Home Page** - Hero section with parallax effects, animated entrance, availability search widget
- **Rooms & Suites** - Filterable room listings with carousels, amenities, and booking CTAs
- **Facilities** - Animated sections showcasing resort amenities
- **Gallery** - Masonry grid with category filtering and lightbox preview
- **Contact** - Contact form with Google Maps integration
- **About** - Resort story, team, milestones, and awards
- **Booking Flow** - Multi-step booking with date selection, room picker, guest details, and payment

### 🛠️ Admin Dashboard
- **Analytics** - Revenue charts, occupancy rates, booking statistics
- **Booking Management** - View, approve, decline bookings with detailed modals
- **Room Management** - Add, edit, remove rooms (extensible)
- **User Management** - Admin roles and permissions (extensible)

### 🎭 Animations & Effects
- Smooth page transitions with Framer Motion
- Parallax scrolling effects
- Fade-in and slide-up animations on scroll
- Hover effects on cards and images
- Animated counters and progress bars
- Loading states and skeleton screens

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Charts**: Recharts (admin dashboard)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for backend)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/whitebay-resort.git
cd whitebay-resort
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment example file:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout with header/footer
│   ├── globals.css           # Global styles & animations
│   ├── rooms/
│   │   ├── page.tsx          # Rooms listing
│   │   └── [id]/page.tsx     # Room detail page
│   ├── facilities/page.tsx   # Facilities page
│   ├── gallery/page.tsx      # Gallery with lightbox
│   ├── contact/page.tsx      # Contact form & map
│   ├── about/page.tsx        # About page
│   ├── booking/page.tsx      # Multi-step booking
│   └── admin/
│       ├── layout.tsx        # Admin layout with sidebar
│       ├── page.tsx          # Admin dashboard
│       └── bookings/page.tsx # Booking management
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Site footer
│   └── AnimatedSection.tsx   # Reusable animation wrappers
└── lib/
    ├── constants.ts          # Site config, rooms, facilities data
    ├── utils.ts              # Utility functions
    └── supabase.ts           # Supabase client & API functions
```

## 🎨 Design System

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Ocean Blue | `#0A72B5` | Primary actions, links |
| White Sand | `#F8F8F0` | Backgrounds |
| Deep Navy | `#052A3C` | Text, dark sections |
| Warm Gold | `#D4A859` | CTAs, accents |
| Teal Aqua | `#17C3B2` | Success states, highlights |

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Buttons/UI**: Poppins (sans-serif)

## 🗄️ Database Schema

### Rooms Table
```sql
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  capacity INTEGER NOT NULL,
  size TEXT,
  bed_type TEXT,
  images TEXT[],
  amenities TEXT[],
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'available',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  room_id UUID REFERENCES rooms(id),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL,
  total_amount DECIMAL NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  booking_status TEXT DEFAULT 'pending',
  booking_code TEXT UNIQUE NOT NULL,
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'guest',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📱 Responsive Design

- **Mobile**: 360px – 480px
- **Tablet**: 768px – 1024px
- **Desktop**: 1280px – 1920px

## 🔒 Security Features

- Input validation on all forms
- SQL injection protection via Supabase
- XSS protection
- CSRF protection
- Secure payment gateway integration ready

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Manual Deployment

```bash
npm run build
npm run start
```

## 📝 License

MIT License - feel free to use this for your projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for WhiteBay Resort

