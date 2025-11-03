# 🔧 Collections Database Error - Fix Now!

## ⚠️ The Error You're Seeing

```
Failed to fetch collections: Could not find the table 'public.collections' in the schema cache
```

**What this means:** The database table for collections hasn't been created yet in Supabase.

---

## ✅ **2-Minute Fix**

### Step 1: Create the Collections Table

1. **Open this link in your browser:**
   - https://supabase.com/dashboard/project/hlqwxycvgxorvejhsqin/sql

2. **Open the SQL setup file:**
   - In VS Code, open: `COLLECTIONS_DATABASE_SETUP.sql`
   - Select ALL text (Ctrl+A)
   - Copy (Ctrl+C)

3. **Run in Supabase:**
   - Paste into the SQL Editor
   - Click the **"RUN"** button (or press Ctrl+Enter)
   - Wait for "Success" message

### Step 2: Create Storage Bucket for Images

1. **Open this link:**
   - https://supabase.com/dashboard/project/hlqwxycvgxorvejhsqin/storage/buckets

2. **Click "New Bucket"**

3. **Fill in:**
   - Name: `collections`
   - **Public bucket**: ✅ Check this box!
   - Click "Create bucket"

### Step 3: Test It Works

1. **Refresh your admin panel:**
   - Go to: http://localhost:5000/admin/collections
   - Press Ctrl+Shift+R (hard refresh)

2. **You should now see:**
   - ✅ Table with 5 default collections
   - ✅ No error message
   - ✅ Upload buttons on hover

---

## 🎯 What Gets Created

Running the SQL file creates:

| **Table** | **Fields** |
|-----------|------------|
| `collections` | id, title, description, image_url, featured, sort_order |

| **Default Collections** | **Featured** |
|------------------------|--------------|
| Gold Jewelry | Yes |
| Silver Jewelry | Yes |
| Diamond Jewelry | Yes |
| Bridal Collection | Yes |
| Daily Wear & Gifting | No |

---

## 🔐 Security (Automatic)

The SQL script also sets up Row Level Security (RLS):
- ✅ Anyone can **view** collections (public)
- ✅ Only **authenticated admins** can add/edit/delete

---

## 📸 Storage Bucket

The `collections` storage bucket:
- ✅ Stores uploaded collection thumbnail images
- ✅ Must be **PUBLIC** so images display on website
- ✅ Only admins can upload (via policy)

---

## ⚡ Quick Commands

### Check if Table Exists
Run in Supabase SQL Editor:
```sql
SELECT * FROM public.collections;
```
Should return 5 collections.

### Check if Storage Bucket Exists
Go to: Storage → Buckets
Should see: `collections` (public)

---

## 🆘 Still Getting Errors?

### "relation 'public.collections' does not exist"
❌ **Problem:** SQL script not run yet
✅ **Solution:** Complete Step 1 above

### "Failed to upload image"
❌ **Problem:** Storage bucket doesn't exist or isn't public
✅ **Solution:** Complete Step 2 above

### "Permission denied"
❌ **Problem:** Not logged in as admin
✅ **Solution:** Log in with magic link (lbagade6@gmail.com)

---

## ✅ Success Checklist

- [ ] Opened Supabase SQL Editor
- [ ] Copied COLLECTIONS_DATABASE_SETUP.sql
- [ ] Pasted and ran in SQL Editor
- [ ] Saw "Success" message
- [ ] Created `collections` storage bucket
- [ ] Made bucket PUBLIC
- [ ] Refreshed admin panel
- [ ] No more error messages!

---

**After completing these steps, the Collections Manager will work perfectly!** 🎉

Then you can upload custom thumbnails for each collection from the admin panel.

---

**File Location:** `COLLECTIONS_DATABASE_SETUP.sql` (in project root)
**Supabase Project:** hlqwxycvgxorvejhsqin
