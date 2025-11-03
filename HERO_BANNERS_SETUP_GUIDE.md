# 🎯 Hero Banners Setup Guide

## ✅ What's Been Added

### 1. **Database Table for Hero Banners**
- Table: `hero_banners`
- Stores: title, description, button text/link, image, active status, sort order

### 2. **Admin Management Page**
- Route: `/admin/hero-banners`
- Features:
  - ✅ View all banners in table format
  - ✅ Upload images by hovering over preview
  - ✅ Toggle active/inactive status
  - ✅ Edit banner details
  - ✅ Delete banners
  - ✅ Sort order control

### 3. **Auto-Sliding Hero Section**
- Homepage hero section now displays banners from database
- Auto-slides every 5 seconds
- Smooth fade transitions
- Navigation dots at bottom
- Click dots to jump to specific banner

---

## 🚀 Setup Instructions (3 Steps)

### **STEP 1: Create Storage Bucket** 📁

1. Go to: https://supabase.com/dashboard/project/hlqwxycvgxorvejhsqin/storage/buckets

2. Click **"New bucket"**

3. Settings:
   - **Name:** `hero-banners`
   - **Public bucket:** ✅ Turn ON
   - Click **"Create bucket"**

---

### **STEP 2: Run Database Setup** 🛠️

1. Go to: https://supabase.com/dashboard/project/hlqwxycvgxorvejhsqin/sql

2. Open the file: `HERO_BANNERS_DATABASE_SETUP.sql`

3. **Copy all the code** (Ctrl+A, Ctrl+C)

4. **Paste in SQL Editor** (Ctrl+V)

5. **Click "RUN"** button

6. Wait for success message ✅

---

### **STEP 3: Run Storage Policies** 🔒

1. Still in SQL Editor: https://supabase.com/dashboard/project/hlqwxycvgxorvejhsqin/sql

2. Open the file: `FIX_STORAGE_POLICIES.sql`

3. **Copy all the code** (Ctrl+A, Ctrl+C)

4. **Paste in SQL Editor** (Ctrl+V)

5. **Click "RUN"** button

6. Wait for success message ✅

---

## 📝 How to Use

### **Managing Hero Banners:**

1. **Login to Admin:**
   - Go to: http://localhost:5000/admin
   - Email: lbagade6@gmail.com

2. **Access Hero Banners:**
   - Click "Hero Banners" in top navigation
   - Or go to: http://localhost:5000/admin/hero-banners

3. **Add New Banner:**
   - Click "Add Banner" button
   - Fill in:
     * **Title:** Main heading (e.g., "Festive Offer")
     * **Description:** Subtitle text (e.g., "Flat 50% off this season")
     * **Button Text:** CTA text (e.g., "Shop Now")
     * **Button Link:** Where button goes (e.g., "#collections" or "/collections")
     * **Sort Order:** Display sequence (1 = first)
     * **Active:** Toggle to show/hide
   - Click "Create Banner"

4. **Upload Banner Image:**
   - In the banners table, hover over the preview image
   - Click "Upload" when it appears
   - Select image (recommended: 1920x1080px, max 5MB)
   - Wait for upload to complete ✅

5. **Edit Banner:**
   - Click the edit icon (pencil) in Actions column
   - Update any fields
   - Click "Update Banner"

6. **Toggle Active/Inactive:**
   - Click the status badge (Active/Inactive)
   - Toggles instantly without page reload

7. **Delete Banner:**
   - Click the delete icon (trash) in Actions column
   - Confirm deletion

---

## 🎨 Default Banners

After running the SQL setup, you'll have 4 default banners:

1. **Welcome to RL Jewels** (Sort: 1)
   - Button: "Browse Collections" → #collections

2. **Festive Offer** (Sort: 2)
   - Button: "Shop Now" → #collections

3. **New Bridal Collection** (Sort: 3)
   - Button: "Explore Collection" → /collections

4. **Gold Savings Plan** (Sort: 4)
   - Button: "Learn More" → #savings

---

## 💡 Tips & Best Practices

### **Image Guidelines:**
- ✅ **Recommended Size:** 1920x1080px (16:9 aspect ratio)
- ✅ **Max File Size:** 5MB
- ✅ **Format:** JPG, PNG, WebP
- ✅ **Subject Placement:** Keep important content centered
- ✅ **Text Overlay:** Use dark/red overlay-friendly images

### **Button Links:**
- **Scroll to section:** Use `#collections`, `#savings`, `#contact`, etc.
- **Navigate to page:** Use `/collections`, `/blog`, `/catalog`, etc.
- **External link:** Use full URL like `https://example.com`

### **Sort Order:**
- Lower number = appears first
- Increment by 1 or use 10, 20, 30 for easy reordering
- Example: 10, 20, 30, 40 (easy to insert 15 between 10 and 20)

### **Active vs Inactive:**
- **Active:** Banner shows in carousel
- **Inactive:** Hidden but not deleted (good for seasonal offers)
- Only active banners appear on homepage

---

## 🔍 Troubleshooting

### **"Failed to fetch hero banners"**
- Make sure you ran `HERO_BANNERS_DATABASE_SETUP.sql`
- Check that table exists in Supabase → Table Editor

### **Upload Error: "new row violates row-level security policy"**
- Run `FIX_STORAGE_POLICIES.sql` again
- Make sure `hero-banners` bucket exists
- Verify bucket is PUBLIC

### **No banners showing on homepage**
- Check that at least one banner is marked "Active"
- Refresh homepage (Ctrl+F5)
- Check browser console for errors (F12)

### **Images not loading**
- Verify `hero-banners` bucket is PUBLIC
- Check Storage → Buckets → hero-banners settings
- Make sure upload was successful

---

## 📋 Quick Checklist

After setup, verify:

- [ ] Created `hero-banners` storage bucket (PUBLIC)
- [ ] Ran `HERO_BANNERS_DATABASE_SETUP.sql`
- [ ] Ran `FIX_STORAGE_POLICIES.sql`
- [ ] Can access `/admin/hero-banners` page
- [ ] See 4 default banners in table
- [ ] Can upload image by hovering over preview
- [ ] Image uploads successfully
- [ ] Homepage hero section shows carousel
- [ ] Banners auto-slide every 5 seconds
- [ ] Can click dots to change banner
- [ ] Button clicks work correctly

---

## 🎉 You're Done!

Your hero section now has:
- ✅ Auto-sliding carousel
- ✅ Multiple offer banners
- ✅ Easy admin management
- ✅ Image upload capability
- ✅ Active/inactive toggle
- ✅ Custom button links

**Update banners anytime from the admin panel!** 💎✨

---

## 🆘 Need Help?

If something's not working:
1. Check the troubleshooting section above
2. Verify all 3 setup steps were completed
3. Check browser console (F12) for errors
4. Make sure you're logged into admin panel
