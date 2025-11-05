# 🚀 RL Jewels Admin System - Quick Start

## What You Got

A complete admin panel to manage your jewelry website! No more editing code to update products, images, or content.

---

## ⚡ 5-Minute Setup

### 1. Create Supabase Account (2 min)
- Go to https://supabase.com
- Sign up (free)
- Create new project: `rl-jewels`
- Save your database password!

### 2. Run Database Scripts (1 min)
- Open Supabase → SQL Editor
- Copy/paste `ADMIN_SYSTEM_DATABASE_SETUP.sql`
- Click RUN
- Copy/paste `ADMIN_SYSTEM_STORAGE_SETUP.sql`  
- Click RUN

### 3. Get API Keys (30 sec)
- Supabase → Settings → API
- Copy Project URL
- Copy anon/public key

### 4. Add to Your Project (30 sec)
Create `.env` file:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here
```

### 5. Create Admin User (1 min)
- Supabase → Authentication → Users
- Add user with your email
- Edit user → Raw Meta Data:
```json
{"role": "admin"}
```

Done! 🎉

---

## 🎯 Access Admin Panel

**Local**: http://localhost:5001/admin/login

**Live** (after deployment): https://your-site.com/admin/login

---

## 📝 What You Can Manage

✅ **Hero Banners** - Homepage carousel (images/videos)
✅ **Collections** - Product categories
✅ **Products** - All jewelry items with prices, images
✅ **Blog Posts** - Write articles
✅ **Testimonials** - Customer reviews
✅ **Stores** - Location with maps
✅ **Occasions** - Categories (Wedding, Festival, etc)
✅ **Inquiries** - Customer messages
✅ **Analytics** - Website stats

---

## 💡 Common Tasks

### Add a New Product
1. Login to admin
2. Click "Products" → "+ Add Product"
3. Fill form (name, price, image, etc)
4. Click "Save"
5. Product appears on website instantly!

### Update Homepage Banner
1. Click "Hero Banners"
2. Click "+ Add Banner"
3. Upload image (or paste URL)
4. Add title/subtitle
5. Set display order
6. Save!

### Add Collection
1. Click "Collections" → "+ Add"
2. Name your collection
3. Upload thumbnail
4. Save
5. Assign products to it

---

## 🔐 Security

- Only users with 'admin' role can access
- All uploads go to secure Supabase Storage
- Automatic session management
- Activity logging

---

## 📱 Multi-Language

Every content has 3 language fields:
- English
- Hindi (optional)
- Marathi (optional)

Fill what you need!

---

## 🆘 Help

**Can't login?**
- Check admin role is set in user metadata
- Verify email/password correct

**Images not uploading?**
- Create storage buckets (Step 2)
- Make buckets public

**Don't see data on site?**
- Mark items as "Active" in admin
- Refresh website page

---

## 📚 Full Documentation

See `ADMIN_SYSTEM_COMPLETE_GUIDE.md` for detailed instructions.

---

## ✨ You're Ready!

Start adding content through the admin panel. No coding required! 🎨

**Questions?** Check the complete guide or contact support.

Happy managing! 🚀
