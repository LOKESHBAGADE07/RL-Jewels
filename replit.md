# RL Jewels - Jewelry Showcase Website

## Overview
A beautiful jewelry showcase website for RL Jewels, a trusted jeweler in Jalgaon, Maharashtra. This is **NOT an e-commerce site** - it's designed to display jewelry collections only, with customers contacting via WhatsApp or visiting the physical store to purchase.

**Current State**: Fully functional showcase website with product galleries, collections, and inquiry options via WhatsApp.

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
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Routing**: React Router DOM v7
- **State Management**: Zustand (addresses, gold rates)

## Project Structure
```
src/
├── pages/          # Route pages (Home, Catalog, Product, Collections, Occasions, About, FAQ, etc.)
├── components/     # Reusable UI components (Header, Navigation, Cards, etc.)
├── sections/       # Homepage sections (Hero, Collections, Testimonials, Contact, etc.)
├── stores/         # Zustand stores (addresses, goldRate)
├── data/           # Static data (products, collections, occasions)
├── hooks/          # Custom React hooks
├── lib/            # Utilities (placeholders, validation)
└── types/          # TypeScript type definitions
```

## Features
### Customer Features
- **Product Showcase**: Beautiful product galleries with search and filters
- **Product Details**: Image gallery, transparent pricing with live gold rates, specifications
- **Collections**: Bridal, Gold, Silver, Diamond collections
- **Occasions**: Shop by occasion (Wedding, Festive, Daily, Office, Gifting)
- **Wishlist**: Save favorite items locally
- **Live Metal Rates**: Real-time gold/silver rate display affecting pricing
- **WhatsApp Inquiry**: Direct WhatsApp contact for product enquiries
- **Contact Information**: Phone, WhatsApp, email, and store address

### Business Features
- **Savings Calculator**: Gold savings plan calculator
- **Newsletter Signup**: Email collection for updates
- **Trust Badges**: BIS hallmark certifications
- **Legal Pages**: Terms, Privacy, FAQs
- **Heritage Section**: Company history and values

## Contact Information
- **Phone**: +91 99999 99999
- **WhatsApp**: Same number with pre-filled inquiry messages
- **Email**: info@rljewels.com
- **Address**: RL Jewels, Rajnimal Lakhichand Manish Jain Group, Gandhi Chowk, Jalgaon - The Gold City, Maharashtra, India
- **Hours**: Monday – Saturday: 10:00 AM – 8:00 PM (Closed Sunday)

## Important Notes
- **NOT AN E-COMMERCE SITE**: This website showcases jewelry collections only
- **No Online Sales**: All purchases must be made in-store or via phone/WhatsApp inquiry
- **Data**: Currently uses static product data (`src/data/products.ts`)
- **Pricing**: Prices shown are indicative and vary with daily gold rates
- **Location**: Physical showroom located in Jalgaon, Maharashtra

## Removed Features (From E-commerce Version)
- Shopping cart functionality
- Online checkout process
- Payment gateway integration (Razorpay)
- User authentication and accounts
- Order management system
- Admin panel
- Shipping integration
- Online purchase capabilities

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

## Future Enhancements
- Add more product images and videos
- Integrate Google Maps for store location
- Add customer testimonial videos
- Implement blog section for jewelry care tips
- Add virtual showroom tour
- Multilingual support (Marathi/Hindi)

## License
Internal project – usage restricted to RL Jewels.
