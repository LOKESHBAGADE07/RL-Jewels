# RL Jewels Admin System - Complete Setup Guide

## 🎯 Overview

This admin system allows you to manage ALL content on your RL Jewels website through a secure dashboard:
- Hero Banners (homepage carousel)
- Collections (product categories)
- Products (jewelry items)
- Blog Posts
- Testimonials
- Store Locations
- Occasions
- Customer Inquiries
- Analytics

---

## 📋 Prerequisites

Before setting up the admin system, ensure you have:
1. A Supabase account (free tier works fine)
2. Your RL Jewels project already running locally
3. Basic understanding of your Supabase dashboard

---

## 🚀 Step-by-Step Setup

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in or create account
4. Click "New Project"
5. Fill in:
   - **Name**: `rl-jewels-prod` (or your preferred name)
   - **Database Password**: Create a strong password and SAVE IT
   - **Region**: Choose closest to your users (e.g., Mumbai for India)
6. Click "Create new project" (takes 2-3 minutes)

### Step 2: Run Database Setup Scripts

1. Once project is created, go to **SQL Editor** in left sidebar
2. Click "+ New Query"
3. Copy entire contents of `ADMIN_SYSTEM_DATABASE_SETUP.sql`
4. Paste into SQL editor
5. Click "RUN" button (bottom right)
6. Wait for success message ✅

7. Create another new query
8. Copy entire contents of `ADMIN_SYSTEM_STORAGE_SETUP.sql`
9. Paste and click "RUN"
10. Verify success ✅

### Step 3: Create Storage Buckets

1. Go to **Storage** in left sidebar
2. Click "Create a new bucket"
3. Create these 8 buckets (one by one):
   - `products` (Public: Yes)
   - `collections` (Public: Yes)
   - `banners` (Public: Yes)
   - `blog` (Public: Yes)
   - `testimonials` (Public: Yes)
   - `stores` (Public: Yes)
   - `gallery` (Public: Yes)
   - `occasions` (Public: Yes)

### Step 4: Get Your API Keys

1. Go to **Settings** (gear icon) in left sidebar
2. Click **API** section
3. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: Long string starting with `eyJ...`

### Step 5: Add Environment Variables

1. In your project root, create `.env` file (if it doesn't exist)
2. Add these lines:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Replace with YOUR actual values from Step 4
4. Save the file

### Step 6: Install Dependencies

Open terminal in your project folder:

```bash
npm install @supabase/supabase-js
```

### Step 7: Create Admin User

1. Go to **Authentication** in Supabase dashboard
2. Click **Users** tab
3. Click "Add user" → "Create new user"
4. Fill in:
   - **Email**: your-admin@email.com
   - **Password**: Create strong admin password
   - **Auto Confirm**: Yes (check this)
5. Click "Create User"

6. After user is created, click on the user email
7. Scroll to "Raw User Meta Data"
8. Click "Edit" and add:

```json
{
  "role": "admin"
}
```

9. Click "Save"

**Alternative Method (SQL)**:

Go to SQL Editor and run:

```sql
SELECT set_user_admin_role('your-admin@email.com');
```

Replace with your actual admin email.

### Step 8: Test Admin Login

1. Start your development server:

```bash
npm run dev
```

2. Navigate to: `http://localhost:5001/admin/login`
3. Login with your admin credentials from Step 7
4. You should see the admin dashboard! 🎉

---

## 🎨 Using the Admin System

### Accessing the Admin Panel

**URL**: `http://localhost:5001/admin/login`

After login, you'll see:
- **Dashboard**: Overview of all content counts
- **Hero Banners**: Manage homepage carousel
- **Collections**: Product categories/groups
- **Products**: Individual jewelry items
- **Blog Posts**: Articles and content
- **Testimonials**: Customer reviews
- **Stores**: Physical locations with maps
- **Occasions**: Category sections
- **Inquiries**: Customer contact forms
- **Analytics**: Website statistics

### Adding a Collection

1. Click "Collections" in sidebar
2. Click "+ Add Collection" button
3. Fill in:
   - **Title** (English)
   - **Title (Hindi)** - optional
   - **Title (Marathi)** - optional
   - **Description**
   - **Thumbnail Image** - upload or paste URL
   - **Display Order** - number for sorting
   - **Active** - check to make visible
4. Click "Save Collection"

### Adding a Product

1. Click "Products" in sidebar
2. Click "+ Add Product" button
3. Fill in all fields:
   - Basic info (name, description)
   - Pricing (price, discount)
   - Category selection
   - Collection assignment
   - Main image + gallery images
   - Specifications (weight, purity, etc)
   - Tags
   - Stock status
4. Click "Save Product"

### Managing Hero Banners

1. Click "Hero Banners" in sidebar
2. Click "+ Add Banner"
3. Upload image/video
4. Add title and subtitle (English/Hindi/Marathi)
5. Set display order (determines sequence)
6. Set duration (seconds to show)
7. Add call-to-action button (optional)
8. Click "Save Banner"

### Uploading Images

The system supports TWO methods:

**Method 1: Direct Upload**
- Click "Upload" button
- Select image from computer
- System automatically uploads to Supabase Storage
- URL is generated and used

**Method 2: External URL**
- If you have images on Unsplash, Imgur, etc
- Just paste the URL directly
- System will use that URL

---

## 🔒 Security Features

✅ **Row Level Security**: Only admins can modify data
✅ **Authentication Required**: Must login to access admin
✅ **Session Management**: Auto-logout on inactivity
✅ **Role-Based Access**: Only users with 'admin' role can access
✅ **Secure File Upload**: Files stored in Supabase Storage
✅ **Activity Logging**: All changes are tracked

---

## 📊 Database Structure

### Tables Created:

1. **collections** - Product collections/categories
2. **products** - Individual jewelry items
3. **hero_banners** - Homepage carousel slides
4. **blog_posts** - Blog articles
5. **testimonials** - Customer reviews
6. **stores** - Physical store locations
7. **gallery** - Section-specific media
8. **occasions** - Occasion categories
9. **inquiries** - Customer contact forms
10. **analytics_events** - Usage tracking

### Multi-Language Support:

Each content table has fields for:
- `title` / `title_hi` / `title_mr`
- `description` / `description_hi` / `description_mr`

This allows you to provide content in English, Hindi, and Marathi.

---

## 🛠️ Troubleshooting

### "Missing Supabase credentials" Error

**Solution**: Check your `.env` file has correct values

### "Access denied. Admin privileges required"

**Solution**: Make sure you added `{"role": "admin"}` to user metadata (Step 7)

### Images not uploading

**Solution**: 
1. Check storage buckets are created
2. Verify buckets are set to "Public"
3. Check storage policies are applied

### Can't see new data on website

**Solution**: 
1. Make sure item is marked as "Active" in admin
2. Check `is_active` field is `true`
3. Refresh the website page
4. Check browser console for errors

### Lost admin password

**Solution**:
1. Go to Supabase Dashboard → Authentication → Users
2. Click on admin user
3. Click "Send password recovery"
4. Check email and reset password

---

## 📱 Frontend Integration

### Fetching Data on Website

The frontend will automatically fetch data from Supabase. Example:

```typescript
// Fetch active collections
const { data: collections } = await supabase
  .from('collections')
  .select('*')
  .eq('is_active', true)
  .order('display_order');

// Fetch published blog posts
const { data: posts } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('is_published', true)
  .order('published_at', { ascending: false });
```

---

## 🎯 Next Steps

After setup is complete:

1. ✅ Add your first collection
2. ✅ Upload 5-10 products
3. ✅ Create 2-3 hero banners
4. ✅ Add customer testimonials
5. ✅ Write a blog post
6. ✅ Add store locations
7. ✅ Test on website
8. ✅ Go live!

---

## 💡 Pro Tips

1. **Image Sizes**:
   - Products: 800x800px minimum
   - Hero Banners: 1920x800px recommended
   - Collection Thumbnails: 600x400px
   - Blog Featured: 1200x630px

2. **SEO Best Practices**:
   - Always fill in descriptions
   - Use descriptive titles
   - Add alt text to images
   - Create friendly slugs for blog posts

3. **Performance**:
   - Compress images before upload
   - Use WebP format when possible
   - Don't upload images larger than 2MB
   - Keep video files under 50MB

4. **Backup Strategy**:
   - Supabase auto-backups daily
   - Export data monthly via SQL
   - Save image URLs in spreadsheet
   - Document your admin password securely

---

## 📞 Support

If you need help:

1. Check this guide first
2. Review error messages in browser console (F12)
3. Check Supabase logs (Dashboard → Logs)
4. Verify database policies are correct
5. Ensure all environment variables are set

---

## 🎉 You're Ready!

Your admin system is now fully functional. You can:
- ✅ Add/edit/delete all content
- ✅ Upload images and videos
- ✅ Manage products and collections
- ✅ Handle customer inquiries
- ✅ Track analytics
- ✅ Update homepage banners
- ✅ Publish blog posts
- ✅ Everything from one place!

**Admin Login**: `http://localhost:5001/admin/login`

Happy managing! 🚀✨
