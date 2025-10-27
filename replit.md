# RL Jewels - Jewelry Showcase Website

## Overview
RL Jewels is a jewelry showcase website for a trusted jeweler in Jalgaon, Maharashtra. Its primary purpose is to display jewelry collections, allowing customers to inquire via WhatsApp or visit the physical store for purchases, rather than facilitating online e-commerce transactions. The project aims to provide a rich visual experience of jewelry, enhance customer engagement through various features, and streamline internal business operations with an intuitive admin system. All five major features (Customer Inquiry Tracking, Blog, Testimonial Videos, Product Analytics, Multilingual Support) are complete, along with a robust product management system.

## User Preferences
I prefer clear, concise communication and detailed explanations when necessary. For coding, I appreciate clean, modern JavaScript/TypeScript practices and a focus on maintainability. I want an iterative development process, where I can review changes and provide feedback frequently. Please ask before making any major architectural changes or introducing new libraries. Ensure all solutions are scalable and performant. Do not make changes to the file `SECURITY_SETUP_REQUIRED.md`.

## System Architecture
The application is built with a modern web stack.

### UI/UX Decisions
- **Design Philosophy**: Pure photography showcase, emphasizing jewelry visuals without pricing.
- **Color Scheme**: Elegant and clean to highlight product imagery.
- **Language Switcher**: Globe icon in the header for easy access to English, Hindi, and Marathi.
- **No Pricing Display**: Prices are explicitly removed from all public-facing elements; customers must inquire directly.

### Technical Implementations
- **Frontend**: React 18 with TypeScript, using Vite 5 for tooling.
- **Styling**: Tailwind CSS for utility-first styling.
- **Animations**: Framer Motion for smooth UI transitions.
- **Routing**: React Router DOM v7 for navigation.
- **State Management**: Zustand for efficient local state management.
- **Multilingual Support**: Implemented without a database, saving user preferences automatically.

### Feature Specifications
- **Product Showcase**: Galleries with search and filters, detailed product pages (images, specs, purity, weight).
- **Collections**: Dedicated sections for Bridal, Gold, Silver, Diamond, and Occasions.
- **WhatsApp Integration**: Direct inquiry buttons on product pages and throughout the site.
- **Admin System**:
    - **Authentication**: Magic link email login via Supabase Auth.
    - **Product Management**: Full CRUD for jewelry products, including image uploads to cloud storage.
    - **Inquiry Tracking**: Dashboard to view, manage, and track customer inquiries with status updates and private notes.
    - **Blog Manager**: Create, edit, publish blog posts with Markdown support, categories, and tags.
    - **Testimonial Videos**: Manage customer video testimonials (YouTube embeds) with approval and star ratings.
    - **Analytics Dashboard**: Track product views, popular products, search trends, and inquiry metrics with time range filters.
    - **CMS Database Ready**: Tables for `hero_slides`, `offers`, `site_settings` are provisioned for future admin UI.

### System Design Choices
- **Showcase-Only**: No e-commerce functionalities like cart, checkout, or online payments.
- **Supabase Backend**: Utilizes PostgreSQL for database, Supabase Storage for images, and Supabase Auth for admin access.
- **Secure Admin**: Employs Row-Level Security (RLS) policies in Supabase for data protection; client-side checks are not sufficient.
- **Environment Configuration**: Optimized for Replit deployment with Vite HMR and specific port/host settings.

## External Dependencies
- **Supabase**:
    - **PostgreSQL**: Primary database for products, inquiries, blog posts, testimonials, and analytics data.
    - **Supabase Storage**: Cloud storage for product images and blog post featured images.
    - **Supabase Auth**: For secure magic link email authentication for admin users.
- **YouTube**: Integrated for embedding customer testimonial videos.