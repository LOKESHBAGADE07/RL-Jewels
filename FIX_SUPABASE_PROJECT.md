# 🔧 FIX: Update Supabase Configuration for rl-jewels-inventory

## ⚠️ **Problem Identified**

Your website is deployed but not working because:
- Your code references a Supabase project: `hlqwxycvgxorvejhsqin`
- But your actual Supabase project is: `rl-jewels-inventory`
- Environment variables need to be updated!

---

## 🎯 **Solution: Get Your Correct Supabase Credentials**

### **Step 1: Open Your Supabase Project**

1. Go to: **https://supabase.com/dashboard**
2. Click on your project: **rl-jewels-inventory**

---

### **Step 2: Get Project URL**

1. In the left sidebar, click **Settings ⚙️**
2. Click **API**
3. Find the section: **Project URL**
4. Copy the URL (example: `https://abcdefgh.supabase.co`)

**Write it down here:**
```
Project URL: https://_________________.supabase.co
```

---

### **Step 3: Get Anon Key**

1. Still on the same **API** page
2. Find section: **Project API keys**
3. Look for the key labeled: **`anon` `public`**
4. Click **"Copy"** or **"Reveal"** button
5. Copy the LONG key (starts with `eyJ...`)

⚠️ **IMPORTANT:** Use the `anon` `public` key, NOT the `service_role` key!

**Write it down here:**
```
Anon Key: eyJ_________________________________
```

---

## 🔄 **Update Netlify Environment Variables**

### **Step 1: Go to Netlify Dashboard**

1. Go to: **https://app.netlify.com**
2. Click on your **RL-Jewels** site

---

### **Step 2: Update Environment Variables**

1. Click **"Site settings"**
2. Scroll to **"Environment variables"** section
3. Click **"Environment variables"**

---

### **Step 3: Edit or Add Variables**

#### **If variables already exist:**
1. Find `VITE_SUPABASE_URL`
2. Click **"Edit"** or **"..."** menu → **"Edit"**
3. Replace with your NEW Project URL from Step 2 above
4. Click **"Save"**

5. Find `VITE_SUPABASE_ANON_KEY`
6. Click **"Edit"**
7. Replace with your NEW Anon Key from Step 3 above
8. Click **"Save"**

#### **If variables don't exist:**
1. Click **"Add a variable"**
2. Enter:
   - Key: `VITE_SUPABASE_URL`
   - Value: (your Project URL)
3. Click **"Add variable"** again
4. Enter:
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: (your Anon Key)

---

### **Step 4: Redeploy Site**

1. Go to **"Deploys"** tab
2. Click **"Trigger deploy"** dropdown
3. Select **"Clear cache and deploy site"**
4. Wait 2-3 minutes

---

## ✅ **Update Local Environment Too**

Let's also update your local `.env` file so development works:

### **Open File:** `.env` in your project root

### **Update these lines:**
```properties
VITE_SUPABASE_URL=https://YOUR_NEW_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_NEW_ANON_KEY_HERE
```

**Replace with the values you got from Supabase!**

---

## 📝 **Quick Checklist**

- [ ] Opened Supabase dashboard
- [ ] Found rl-jewels-inventory project
- [ ] Copied Project URL from Settings → API
- [ ] Copied anon public key from Settings → API
- [ ] Updated VITE_SUPABASE_URL in Netlify
- [ ] Updated VITE_SUPABASE_ANON_KEY in Netlify
- [ ] Triggered redeploy on Netlify
- [ ] Updated local .env file (optional but recommended)
- [ ] Tested website after redeploy

---

## 🧪 **Test After Redeploy**

Once redeployed, visit your site and check:

✅ Homepage loads (not blank)  
✅ Products display  
✅ Hero banners show  
✅ Images load  
✅ No console errors (press F12 → Console)  

---

## 🆘 **Still Need Help?**

If you're having trouble finding your credentials, tell me:

1. **Can you access your Supabase dashboard?**
   - Yes / No

2. **Do you see the "rl-jewels-inventory" project?**
   - Yes / No

3. **Are you in the Settings → API page?**
   - Yes / No

I'll help you find exactly where to look! 🔍

---

## 📸 **Visual Guide - What You Should See**

### **In Supabase Dashboard:**
```
┌─────────────────────────────────────────┐
│  rl-jewels-inventory                     │
├─────────────────────────────────────────┤
│  Settings ⚙️                             │
│    └─ API                                │
│       ├─ Project URL                     │
│       │   https://xxxxx.supabase.co      │
│       │   [Copy] ← COPY THIS             │
│       │                                  │
│       └─ Project API keys                │
│           ├─ anon public                 │
│           │   eyJhbGc... [Reveal] [Copy] │
│           │   ↑ USE THIS ONE             │
│           │                              │
│           └─ service_role secret         │
│               (DON'T USE THIS)           │
└─────────────────────────────────────────┘
```

---

## 🎯 **Next Steps**

1. Get your credentials from Supabase (Steps 1-3 above)
2. Add them to Netlify (Update Netlify Environment Variables section)
3. Redeploy your site
4. Test and enjoy your live website! 🎉

---

**Let me know once you have the Project URL and Anon Key, and I'll help you add them!** 🚀
