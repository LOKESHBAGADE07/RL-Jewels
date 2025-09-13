# RL Jewels – E‑commerce (React + TypeScript + Vite)

A complete, mobile‑first e‑commerce frontend for RL Jewels with catalog, PDP, cart, checkout, account, admin (demo), and legal pages. Built with React 18, TypeScript, Tailwind, and Vite.

## Features
- Product Catalog: search, filters (purity, price range, in stock), sorting
- PDP: image gallery, transparent pricing (live rate), wishlist, ratings & reviews
- Cart: persistent cart, drawer in header, full cart page
- Checkout: multi‑step (login/guest, shipping with validation, summary, payment)
- Payments: Razorpay client integration helper (test mode), order confirmation page
- Account: Google sign‑in (Firebase), profile, orders, wishlist, addresses
- Admin (demo): order list and status updates (local only)
- Legal & Info: Terms, Privacy, Shipping Policy, Returns/Refund/Buy‑Back, About, FAQ
- Live Metal Rate ticker updating pricing store

## Tech Stack
- React 18 + TypeScript, Vite
- Tailwind CSS, Framer Motion, React Icons
- State: Zustand (cart/orders/addresses/goldRate)
- Router: react-router-dom v7

## Prerequisites
- Node 18+
- Optional: Firebase project for Google auth; Razorpay test key for payments

## Setup
```bash
npm install
npm run dev
```
Visit http://localhost:5173

### Environment Variables (optional but recommended)
Create `rl-jewels-react/.env` and set keys as needed.

Firebase (Auth via Google):
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_APP_ID=...
```

Razorpay (Payments):
```
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXX
```

If keys are missing, auth flows will display UI but won’t sign in; payments will show a friendly failure.

## Build
```bash
npm run build
npm run preview
```

## Project Structure
- `src/pages/*` – Pages (Home, Catalog, Product, Cart, Checkout, Account, Admin, Legal)
- `src/components/*` – Shared UI (Header, Footer, Ticker, Buttons, SiteLayout)
- `src/sections/*` – Home sections (Hero, Collections, Savings, etc.)
- `src/stores/*` – Zustand stores (cart, orders, addresses, goldRate)
- `src/lib/*` – Utilities (payment, validation, firebase init, placeholder images)

## Notes
- Data is currently static (see `src/data/products.ts`). Replace with your backend/API.
- Admin is a local, demo‑only panel. Real operations require server‑side auth and APIs.
- Logistics (Shiprocket) integration is not implemented; tracking URL helper exists for AWB links.

## Roadmap
- Server: product catalog, auth, orders, payments signatures, logistics webhooks
- Razorpay: server‑created orders + signature verification
- Shiprocket: rate calc, label creation, pickup scheduling, live tracking
- OTP login option; address book management UI; order detail page

## License
Internal project – usage restricted to RL Jewels.
