# RL Jewels - Jewelry Showcase Website

## Overview
A beautiful jewelry showcase website for RL Jewels, a trusted jeweler in Jalgaon, Maharashtra. This is **NOT an e-commerce site** - it's designed to display jewelry collections only, with customers contacting via WhatsApp or visiting the physical store to purchase.

**Current State**: Fully functional showcase website with product galleries, collections, and inquiry options via WhatsApp. **Now includes admin system for product management!**

## Recent Changes (October 27, 2025)
### Customer Testimonial Videos ✅ (Latest)
- **✅ Admin Panel**: Manage customer testimonial videos from admin dashboard
- **✅ Video Display**: Show approved testimonials on homepage (top 3) and dedicated page
- **✅ YouTube Integration**: Embed customer review videos using YouTube links
- **✅ Approval System**: Control which testimonials appear publicly
- **✅ Star Ratings**: Display customer ratings (1-5 stars)
- **✅ Database Ready**: SQL schema created in `TESTIMONIALS_DATABASE_SETUP.sql`
- **Note**: Run SQL file in Supabase to activate feature (see SETUP_TESTIMONIALS.md)

### Product System - Fully Functional! ✅
- **✅ Fixed Product Details**: Products added via admin now display correctly when clicked
- **✅ Database Integration**: All product pages now fetch from Supabase database
- **✅ Admin System Working**: Magic link login, product management fully functional
- **✅ Image Upload Working**: Upload product photos to cloud storage
- **✅ Real-time Updates**: Add products in admin, see them instantly on public website
- **No Errors**: Clean React hooks implementation, all console errors resolved

### Pure Photography Showcase
- **Removed All Pricing**: Website now shows only jewelry photos without any prices
- **No Price Displays**: Removed prices from product cards, detail pages, and search results
- **No Price Filters**: Removed min/max price filters from catalog page
- **No Gold Rate Ticker**: Removed live metal rate display from header
- **Showcase-Only Messaging**: Updated footer and messaging to direct customers to store for pricing
- **Admin Still Manages Pricing**: Price data can still be stored in backend but not shown publicly

### Admin System Integration
- **Supabase Backend**: Integrated PostgreSQL database and file storage
- **Admin Authentication**: Magic link email login for authorized staff (lbagade6@gmail.com)
- **Product Management Dashboard**: View all products with search and filters
- **Add/Edit Products**: Full CRUD operations with image upload
- **Image Management**: Upload multiple product images to cloud storage
- **Homepage Sections**: New Arrivals and Best Sellers dynamically fetch from database
- **Fixed Vite Config**: Added `allowedHosts: true` for Replit preview compatibility

### CMS Database Ready (Not Yet in Admin Panel)
- **Created Tables**: hero_slides, offers, site_settings tables created in database
- **Helper Functions**: Database functions ready in `src/lib/cms-database.ts`
- **Future Feature**: Will allow staff to manage homepage slides and offers
- **Note**: Tables exist but admin UI not yet built - coming in future update

## Recent Changes (October 26, 2025)
### Initial Setup
- Configured for Replit environment
- Updated Vite config to run on port 5000 with proper host configuration (0.0.0.0)
- Configured HMR for Replit proxy with WebSocket support
- Added TypeScript environment variable types
- Created .gitignore for Node.js/React project

### Showcase Conversion
- **Removed all e-commerce functionality** (cart, checkout, payments, user login)
- **Updated Header**: Removed cart and user icons, kept search, phone, and WhatsApp
- **Updated Product Cards**: Replaced "Add to Cart" with "Enquire on WhatsApp" button
- **Updated Product Pages**: Replaced cart functionality with WhatsApp enquiry, added notice about in-store purchase only
- **Updated Routing**: Removed cart, checkout, account, admin, and order pages
- **Updated Contact Section**: Added clear store information and "We Don't Sell Online" notice
- **Updated Footer**: Removed shipping/returns policies, added certifications and contact info

## Tech Stack
- **Frontend**: React 18 + TypeScript
- **Backend**: Supabase (PostgreSQL + Storage + Auth)
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Routing**: React Router DOM v7
- **State Management**: Zustand (addresses, gold rates)

## Project Structure
```
src/
├── pages/          
│   ├── admin/      # Admin pages (Login, Dashboard, ProductForm)
│   └── ...         # Public pages (Home, Catalog, Product, Collections, etc.)
├── components/     # Reusable UI components (Header, Navigation, Cards, etc.)
│   ├── AdminLayout.tsx      # Admin navigation and layout
│   └── ProtectedRoute.tsx   # Auth guard for admin routes
├── sections/       # Homepage sections (Hero, Collections, Testimonials, Contact, etc.)
├── stores/         # Zustand stores (addresses, goldRate)
├── data/           # Static data (collections, occasions)
├── hooks/          
│   └── useProducts.ts       # Fetch products from Supabase
├── lib/            
│   ├── supabase.ts          # Supabase client configuration
│   ├── database.ts          # Database helper functions
│   └── ...         # Other utilities
└── types/          # TypeScript type definitions
```

## Features
### Customer Features
- **Product Showcase**: Beautiful product galleries with search and filters (NO PRICING)
- **Product Details**: Image gallery, specifications, purity, and weight information
- **Collections**: Bridal, Gold, Silver, Diamond collections
- **Occasions**: Shop by occasion (Wedding, Festive, Daily, Office, Gifting)
- **Wishlist**: Save favorite items locally
- **WhatsApp Inquiry**: Direct WhatsApp contact for product enquiries and pricing
- **Contact Information**: Phone, WhatsApp, email, and store address
- **Pure Photography**: Website displays only beautiful jewelry images without prices

### Business Features
- **Savings Calculator**: Gold savings plan calculator
- **Newsletter Signup**: Email collection for updates
- **Trust Badges**: BIS hallmark certifications
- **Legal Pages**: Terms, Privacy, FAQs
- **Heritage Section**: Company history and values

### Admin Features
- **Secure Login**: Magic link authentication via email (lbagade6@gmail.com)
- **Product Management**: Add, edit, and delete jewelry products
- **Image Upload**: Upload main and additional product images to cloud storage
- **Inventory Control**: Mark products as in-stock or out-of-stock
- **Testimonials Manager**: Add customer video testimonials, approve/unapprove, set display order
- **Real-time Updates**: Changes appear immediately on public website
- **Product Details**: Set price (stored privately), purity, weight, tags, badges, and more
- **Note**: Prices are stored in database but NOT displayed publicly on website

## Contact Information
- **Phone**: +91 99999 99999
- **WhatsApp**: Same number with pre-filled inquiry messages
- **Email**: info@rljewels.com
- **Address**: RL Jewels, Rajnimal Lakhichand Manish Jain Group, Gandhi Chowk, Jalgaon - The Gold City, Maharashtra, India
- **Hours**: Monday – Saturday: 10:00 AM – 8:00 PM (Closed Sunday)

## Important Notes
- **PURE SHOWCASE SITE**: This website displays only jewelry photography - NO PRICING SHOWN
- **No Online Sales**: All purchases must be made in-store or via phone/WhatsApp inquiry
- **Data**: Products stored in Supabase PostgreSQL database
- **Images**: Product images stored in Supabase Storage (cloud-hosted)
- **Pricing**: NO prices displayed publicly; customers must visit store or contact for pricing
- **Location**: Physical showroom located in Jalgaon, Maharashtra
- **Philosophy**: Like Chandukaka Saraf website - beautiful imagery showcase only

## ⚠️ CRITICAL SECURITY SETUP

**BEFORE USING THE ADMIN SYSTEM**, you **MUST** update your Supabase RLS policies to restrict admin access!

📄 **See `SECURITY_SETUP_REQUIRED.md` for complete instructions**

Without proper RLS policies, anyone can modify your product database. The client-side checks alone are NOT sufficient for security.

## How to Use the Admin System

### Accessing the Admin Panel
1. Go to: `/admin/login` (e.g., https://your-site.replit.app/admin/login)
2. Enter admin email: `lbagade6@gmail.com`
3. Click "Send Magic Link"
4. Check your email and click the login link
5. You'll be redirected to the admin dashboard

### Managing Products
**Add New Product:**
1. Click "Add Product" button
2. Fill in product details (title, price, purity, weight, tags)
3. Upload main product image (required)
4. Optionally upload additional images
5. Click "Add Product"

**Edit Existing Product:**
1. Find product in dashboard
2. Click edit icon (pencil)
3. Update details and images
4. Click "Update Product"

**Delete Product:**
1. Find product in dashboard
2. Click delete icon (trash)
3. Click again to confirm deletion

**Tips:**
- Use descriptive titles (e.g., "Heritage Thushi Necklace")
- Add relevant tags (necklace, gold, bridal) separated by commas
- Set badges like "New" or "Sale" to highlight products
- Upload high-quality images for best appearance
- Mark products as out-of-stock when inventory is low

## Database & Backend

### Supabase Configuration
- **Database**: PostgreSQL with `products` table
- **Storage**: `product-images` bucket for jewelry photos
- **Authentication**: Email magic links for admin access
- **Security**: Row-level security policies (public read, admin write)

### Environment Variables
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous/public key

### Database Schema
```sql
products table:
  - id (UUID, primary key)
  - title (text)
  - image (text, main image URL)
  - images (text[], additional images)
  - price (decimal)
  - original_price (decimal, for discounts)
  - badge (text, e.g., "New", "Sale")
  - tags (text[], for filtering)
  - purity (text, e.g., "22K")
  - gross_weight_grams (decimal)
  - net_weight_grams (decimal)
  - in_stock (boolean)
  - created_at (timestamp)
  - updated_at (timestamp)
```

## Development

### Running Locally
The workflow is already configured. The dev server runs on:
- Port: 5000
- Host: 0.0.0.0 (required for Replit)
- HMR: WebSocket via wss://

### Build for Production
```bash
npm run build
```
Outputs to `dist/` directory.

### Deployment
Configured for Replit's autoscale deployment:
- Build: `npm run build`
- Run: `vite preview` on port 5000

## Admin Access

**Authorized Admin Email**: lbagade6@gmail.com

To add more admins, update the Supabase Auth settings in the Supabase dashboard.

## Future Enhancements (In Progress)
- ✅ Customer testimonial videos - **COMPLETE!**
- 🔄 Implement blog section for jewelry care tips - **NEXT UP**
- 🔄 Multilingual support (Marathi/Hindi) - **PLANNED**
- 🔄 Product analytics dashboard - **PLANNED**
- 🔄 Customer inquiry tracking - **PLANNED**
- Add more product images and videos
- Integrate Google Maps for store location
- Add virtual showroom tour
- Bulk product import/export

## License
Internal project – usage restricted to RL Jewels.
