# 🔧 Magic Link Login Fix

## ❌ Problem:
After clicking the magic link in your email, you see:
> "The app is currently not running. Deploy this app to keep it running externally."

## 🎯 Root Cause:
Supabase is redirecting to your old Replit URL instead of your local development URL.

---

## ✅ SOLUTION (5 Minutes):

### Step 1: Update Supabase URL Configuration

1. **Open Supabase Dashboard:**
   - Go to: https://supabase.com/dashboard/project/hlqwxycvgxorvejhsqin/auth/url-configuration

2. **Update Site URL:**
   - Find "Site URL" field
   - Change from: `https://your-replit-url` or whatever is there
   - Change to: `http://localhost:5002`
   - Click **Save**

3. **Add Redirect URLs:**
   - Find "Redirect URLs" section
   - Add these URLs (add each on a new line):
     ```
     http://localhost:5002/*
     http://localhost:5002/admin/dashboard
     http://localhost:5001/*
     http://localhost:5000/*
     ```
   - Click **Save**

4. **Wait 1-2 minutes** for Supabase to update

---

### Step 2: Request a New Magic Link

1. **Go to admin login:**
   - Visit: http://localhost:5002/admin

2. **Enter your email:**
   - Type: `lbagade6@gmail.com`
   - Click "Send Magic Link"

3. **Check your email:**
   - Open the NEW email from Supabase
   - Click the magic link

4. **Success! 🎉**
   - You should now be redirected to: http://localhost:5002/admin/dashboard
   - You're logged in!

---

## 🚀 After Login, You'll See:

- ✅ Admin Dashboard
- ✅ Product Management
- ✅ Blog Management
- ✅ Testimonials Management
- ✅ Inquiries Dashboard
- ✅ Analytics Dashboard

---

## 📝 For Production Deployment:

When you deploy to Vercel, you'll need to:

1. **Update Supabase Site URL again:**
   - Change to: `https://rl-jewels.vercel.app`

2. **Update Redirect URLs:**
   - Add: `https://rl-jewels.vercel.app/*`
   - Add: `https://rl-jewels.vercel.app/admin/dashboard`

3. **Keep localhost URLs** for local development

---

## 🆘 Still Not Working?

### Quick Debug:

1. **Check Supabase Console:**
   - Go to: https://supabase.com/dashboard/project/hlqwxycvgxorvejhsqin/auth/users
   - See if your email appears in the users list

2. **Check Browser Console:**
   - Open: http://localhost:5002/admin
   - Press F12 → Console tab
   - Look for any error messages

3. **Try Different Port:**
   - If your dev server is on a different port, use that instead
   - Check terminal output for the actual port

4. **Clear Browser Cache:**
   - Sometimes old auth tokens cause issues
   - Try in incognito/private mode

---

## 💡 Pro Tip:

For easier development, set multiple redirect URLs in Supabase:
```
http://localhost:5000/*
http://localhost:5001/*
http://localhost:5002/*
http://localhost:5003/*
http://127.0.0.1:5002/*
```

This way, no matter which port Vite uses, the magic link will work!

---

## ✅ Quick Checklist:

- [ ] Updated Site URL in Supabase to `http://localhost:5002`
- [ ] Added redirect URLs in Supabase
- [ ] Saved changes in Supabase
- [ ] Waited 1-2 minutes
- [ ] Requested new magic link from http://localhost:5002/admin
- [ ] Clicked new magic link from email
- [ ] Successfully logged into dashboard! 🎉

---

**After these changes, your magic link authentication will work perfectly!**
