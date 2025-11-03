# 🔧 Fix: "Could not find the 'active' column" Error

## ❌ Error Message:
```
Failed to update hero banner: Could not find the 'active' column of 'hero_banners' in the schema cache
```

## 🎯 Cause:
Supabase has cached the old database schema and hasn't picked up the new column names yet.

---

## ✅ Solution (Quick Fix)

### **Method 1: Restart Dev Server** (Try This First)

1. **Stop your dev server:**
   - Press `Ctrl+C` in PowerShell

2. **Start it again:**
   ```powershell
   npm run dev
   ```

3. **Try uploading again**

---

### **Method 2: Refresh Supabase Schema Cache**

If restarting doesn't work:

1. **Go to Supabase SQL Editor:**
   - https://supabase.com/dashboard/project/hlqwxycvgxorvejhsqin/sql

2. **Run this SQL:**
   ```sql
   NOTIFY pgrst, 'reload schema';
   ```

3. **Restart your dev server:**
   ```powershell
   # Press Ctrl+C first, then:
   npm run dev
   ```

---

### **Method 3: Hard Refresh**

If still not working:

1. **Clear browser cache:**
   - Press `Ctrl+Shift+Delete`
   - Clear cached images and files
   - Click "Clear data"

2. **Restart dev server:**
   ```powershell
   # Press Ctrl+C, then:
   npm run dev
   ```

3. **Hard refresh the page:**
   - Press `Ctrl+F5` or `Ctrl+Shift+R`

---

## 🔍 Verify the Fix

**Test if columns are correct:**

Go to Supabase SQL Editor and run:
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'hero_banners'
ORDER BY ordinal_position;
```

**You should see:**
- ✅ `subtitle` (not `description`)
- ✅ `is_active` (not `active`)
- ✅ `display_order` (not `sort_order`)
- ✅ `video_url`
- ✅ `media_type`

---

## 🚀 After Fix

Once the schema is refreshed:

1. **Go to Hero Banners Manager:**
   http://localhost:5000/admin/hero-banners

2. **Try toggling a banner active/inactive:**
   - Click the green "Active" or gray "Inactive" button
   - It should work without errors now

3. **Try uploading a video:**
   - Hover over banner
   - Click "Upload"
   - Select video file
   - Should upload successfully

---

## 💡 Why This Happens

**Supabase PostgREST** caches the database schema for performance. When you:
1. Create a table with columns A, B, C
2. Then alter it to have columns X, Y, Z
3. The cache still thinks it has A, B, C

**The fix:** Tell PostgREST to reload the schema with `NOTIFY pgrst, 'reload schema';`

---

## ✅ Prevention

**In the future:**
- Always restart your dev server after running database migrations
- Clear browser cache if you see old data
- Use `NOTIFY pgrst, 'reload schema'` after schema changes

---

## 🆘 Still Not Working?

**Try this complete reset:**

1. **Stop dev server** (Ctrl+C)

2. **Run in Supabase SQL:**
   ```sql
   -- Force schema refresh
   NOTIFY pgrst, 'reload schema';
   
   -- Verify table structure
   \d hero_banners
   ```

3. **Clear node modules cache:**
   ```powershell
   Remove-Item -Recurse -Force node_modules\.vite
   ```

4. **Restart:**
   ```powershell
   npm run dev
   ```

5. **Hard refresh browser:**
   - Press `Ctrl+Shift+R`

---

**Try the restart first - it should fix it!** 🚀✨
