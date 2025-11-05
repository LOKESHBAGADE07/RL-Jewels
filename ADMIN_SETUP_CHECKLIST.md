# ✅ RL Jewels Admin System - Setup Checklist

Use this checklist to track your setup progress!

---

## 📋 Setup Checklist

### Part 1: Supabase Account (5 minutes)

- [ ] Go to https://supabase.com
- [ ] Create free account
- [ ] Click "New Project"
- [ ] Name: `rl-jewels` (or your choice)
- [ ] Set strong database password
- [ ] **IMPORTANT**: Save password in safe place!
- [ ] Choose region (closest to users)
- [ ] Wait for project creation (2-3 min)

### Part 2: Database Setup (3 minutes)

- [ ] Open project in Supabase
- [ ] Go to "SQL Editor" (left sidebar)
- [ ] Click "+ New Query"
- [ ] Open file: `ADMIN_SYSTEM_DATABASE_SETUP.sql`
- [ ] Copy ALL content (500+ lines)
- [ ] Paste in SQL Editor
- [ ] Click "RUN" button
- [ ] Verify: See "Success. No rows returned" ✅
- [ ] Create new query again
- [ ] Open file: `ADMIN_SYSTEM_STORAGE_SETUP.sql`
- [ ] Copy and paste content
- [ ] Click "RUN"
- [ ] Verify success ✅

### Part 3: Storage Buckets (2 minutes)

- [ ] Go to "Storage" (left sidebar)
- [ ] Click "Create a new bucket"
- [ ] Create bucket: `products` (Public: Yes)
- [ ] Create bucket: `collections` (Public: Yes)
- [ ] Create bucket: `banners` (Public: Yes)
- [ ] Create bucket: `blog` (Public: Yes)
- [ ] Create bucket: `testimonials` (Public: Yes)
- [ ] Create bucket: `stores` (Public: Yes)
- [ ] Create bucket: `gallery` (Public: Yes)
- [ ] Create bucket: `occasions` (Public: Yes)
- [ ] Verify: Should see 8 buckets total

### Part 4: Get API Credentials (1 minute)

- [ ] Go to "Settings" (gear icon, left sidebar)
- [ ] Click "API" section
- [ ] Find "Project URL"
- [ ] Copy URL (looks like: https://xxxxx.supabase.co)
- [ ] **Save this URL** in notepad
- [ ] Find "Project API keys"
- [ ] Copy "anon/public" key (long string starting with "eyJ...")
- [ ] **Save this key** in notepad

### Part 5: Project Configuration (2 minutes)

- [ ] Open your RL-Jewels project folder
- [ ] Find `.env` file (create if doesn't exist)
- [ ] Add these two lines:
  ```
  VITE_SUPABASE_URL=paste-your-project-url-here
  VITE_SUPABASE_ANON_KEY=paste-your-anon-key-here
  ```
- [ ] Replace with YOUR actual values
- [ ] Save `.env` file
- [ ] **IMPORTANT**: Don't commit `.env` to Git!

### Part 6: Install Package (30 seconds)

- [ ] Open terminal in project folder
- [ ] Run: `npm install @supabase/supabase-js`
- [ ] Wait for installation
- [ ] Verify: No errors

### Part 7: Create Admin User (2 minutes)

**Option A: Via Dashboard (Recommended)**
- [ ] In Supabase, go to "Authentication"
- [ ] Click "Users" tab
- [ ] Click "Add user" → "Create new user"
- [ ] Enter your email (save it!)
- [ ] Enter strong password (save it!)
- [ ] Check "Auto Confirm" checkbox
- [ ] Click "Create User"
- [ ] Click on the user email in list
- [ ] Scroll to "Raw User Meta Data"
- [ ] Click "Edit"
- [ ] Replace content with:
  ```json
  {
    "role": "admin"
  }
  ```
- [ ] Click "Save"
- [ ] Verify: Meta data shows role: admin

**Option B: Via SQL**
- [ ] Go to SQL Editor
- [ ] Run this (replace with your email):
  ```sql
  SELECT set_user_admin_role('your-admin@email.com');
  ```
- [ ] Verify success ✅

### Part 8: Test Admin Login (1 minute)

- [ ] Start your dev server: `npm run dev`
- [ ] Open browser
- [ ] Go to: `http://localhost:5001/admin/login`
- [ ] Enter your admin email
- [ ] Enter your admin password
- [ ] Click "Sign In"
- [ ] **SUCCESS**: You should see admin dashboard! 🎉
- [ ] Verify: Dashboard shows stats cards
- [ ] Click different menu items
- [ ] Verify: Navigation works

---

## 🎯 Verification Tests

After completing setup, verify these work:

### Test 1: Login System
- [ ] Can access `/admin/login` page
- [ ] Can login with admin credentials
- [ ] Redirects to dashboard after login
- [ ] Logout button works
- [ ] Can't access admin pages when logged out

### Test 2: Dashboard
- [ ] Dashboard loads without errors
- [ ] Stats cards show numbers (probably all 0 initially)
- [ ] Sidebar navigation visible
- [ ] Can click menu items

### Test 3: Database Connection
- [ ] Open browser console (F12)
- [ ] Check for Supabase connection errors
- [ ] Should see NO red errors
- [ ] Network tab shows successful requests

### Test 4: Storage Access
- [ ] Go to Supabase → Storage
- [ ] Click on "products" bucket
- [ ] Should be able to view (empty is OK)
- [ ] No access errors

---

## ❌ Troubleshooting

### Problem: Can't login / "Access denied"
**Check:**
- [ ] Admin user has `role: admin` in metadata
- [ ] Used correct email/password
- [ ] User is confirmed (not pending)
- [ ] Check browser console for errors

**Fix:**
- Re-add admin role to user metadata
- Or delete user and create new one

### Problem: "Missing Supabase credentials"
**Check:**
- [ ] `.env` file exists in project root
- [ ] Has both URL and KEY variables
- [ ] No typos in variable names
- [ ] Values are YOUR actual credentials
- [ ] File is saved

**Fix:**
- Copy credentials again from Supabase
- Restart dev server after editing `.env`

### Problem: Storage/bucket errors
**Check:**
- [ ] All 8 buckets created
- [ ] Buckets are set to "Public"
- [ ] Storage policies script ran successfully

**Fix:**
- Re-run storage setup SQL
- Or manually create buckets in dashboard

### Problem: Database queries failing
**Check:**
- [ ] Database setup script ran completely
- [ ] No SQL errors during execution
- [ ] Tables exist (check Supabase → Table Editor)

**Fix:**
- Re-run database setup script
- Check Supabase logs for errors

---

## 📊 Progress Tracker

**Setup Status:**
- [ ] Supabase account created
- [ ] Database tables created (10 tables)
- [ ] Storage buckets created (8 buckets)
- [ ] API credentials obtained
- [ ] Environment variables set
- [ ] Admin user created
- [ ] Admin login tested
- [ ] Dashboard accessible

**When ALL boxes checked above:**
✅ **SETUP COMPLETE!** 🎉

---

## 🎯 What's Next?

After completing this checklist:

1. **Start adding content:**
   - Add your first collection
   - Upload some products
   - Create hero banners

2. **Request CRUD pages:**
   - I'll build the management interfaces
   - For collections, products, etc.

3. **Connect frontend:**
   - Update website to use database
   - Replace static data

4. **Go live:**
   - Deploy to production
   - Share admin login with team

---

## 📁 Important Files

Keep these safe:
- [ ] Supabase Project URL
- [ ] Supabase Anon Key
- [ ] Database Password
- [ ] Admin Email
- [ ] Admin Password

**Store in password manager!** 🔐

---

## ✅ Completion

Date completed: _______________

Admin email: _______________

Supabase project: _______________

**Ready to add content!** 🚀

---

## 📞 Need Help?

1. Read: `ADMIN_QUICK_START.md`
2. Check: `ADMIN_SYSTEM_COMPLETE_GUIDE.md`
3. Review: Error messages in browser console
4. Verify: All checkboxes above are marked

**Once setup is complete, let me know and I'll build the CRUD pages!** 🎨
