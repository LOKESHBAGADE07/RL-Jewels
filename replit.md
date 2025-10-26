# RL Jewels E-commerce Platform

## Overview
A complete, mobile-first e-commerce frontend for RL Jewels, a jewelry store in Jalgaon, India. Built with React 18, TypeScript, Tailwind CSS, and Vite.

**Current State**: Fully functional frontend with product catalog, cart, checkout, user authentication (Firebase/Google), and admin demo panel.

## Recent Changes (October 26, 2025)
- Configured for Replit environment
- Updated Vite config to run on port 5000 with proper host configuration (0.0.0.0)
- Configured HMR for Replit proxy with WebSocket support
- Added TypeScript environment variable types for Firebase and Razorpay
- Removed transpiled .js files from source tree
- Clean reinstall of all dependencies
- Configured deployment for autoscale hosting
- Created .gitignore for Node.js/React project

## Tech Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Routing**: React Router DOM v7
- **State Management**: Zustand (cart, orders, addresses, gold rates)
- **Authentication**: Firebase (Google Sign-In)
- **Payments**: Razorpay (test mode integration ready)

## Project Structure
```
src/
├── pages/          # Route pages (Home, Catalog, Product, Cart, Checkout, Account, etc.)
├── components/     # Reusable UI components (Header, Navigation, Cards, etc.)
├── sections/       # Homepage sections (Hero, Collections, Testimonials, etc.)
├── stores/         # Zustand state stores
├── lib/            # Utilities (Firebase, payment helpers, validation)
├── data/           # Static data (products, collections, occasions)
├── hooks/          # Custom React hooks
├── context/        # React context providers
└── types/          # TypeScript type definitions
```

## Features
### Customer Features
- **Product Catalog**: Browse products with search, filters (purity, price, stock), and sorting
- **Product Details**: Image gallery, transparent pricing with live gold rates, wishlist, ratings
- **Shopping Cart**: Persistent cart with drawer view and full cart page
- **Checkout**: Multi-step process (login/guest, shipping with validation, payment)
- **User Account**: Google sign-in, profile management, order history, wishlist, addresses
- **Live Metal Rates**: Real-time gold/silver rate ticker affecting pricing
- **Collections**: Bridal, Gold, Silver, Diamond collections
- **Occasions**: Shop by occasion (Wedding, Festive, Daily, Office, Gifting)

### Business Features
- **Admin Panel**: Demo-only order management and status updates (local state)
- **Savings Calculator**: Gold savings plan calculator
- **Newsletter Signup**: Email collection
- **Trust Badges**: BIS hallmark, certifications
- **Legal Pages**: Terms, Privacy, Shipping, Returns/Buyback policies

## Environment Variables (Optional)
The app works without these, but functionality is limited:

### Firebase (Google Authentication)
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

### Razorpay (Payment Gateway)
```
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXX
```

**Note**: If keys are missing, auth and payment features show UI but won't complete transactions.

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

## Notes & Limitations
- **Data**: Currently uses static product data (`src/data/products.ts`). Needs backend API integration.
- **Admin**: Local demo only. Real admin requires server-side authentication and database.
- **Logistics**: Shiprocket integration placeholder exists but not implemented.
- **Payments**: Razorpay client-side only. Needs server-side order creation and signature verification.

## Roadmap
- Backend API for product catalog, authentication, orders
- Server-side Razorpay integration with signature verification
- Shiprocket integration for shipping rate calculation and tracking
- OTP login option
- Enhanced address book management
- Order detail page improvements

## License
Internal project – usage restricted to RL Jewels.
