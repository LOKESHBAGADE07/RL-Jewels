# 📋 Credentials Checklist

## ✅ What You Need to Collect

Before deploying, gather these credentials from your existing Supabase and Firebase projects:

---

## 1️⃣ SUPABASE CREDENTIALS (2 values needed)

### Where to Find:
1. Go to: https://supabase.com/dashboard
2. Login with the account you used in Replit
3. Select your **RL Jewels** project
4. Click **Settings** (gear icon) in left sidebar
5. Click **API** section

### What to Copy:

```
☐ VITE_SUPABASE_URL
   Location: "Project URL" section
   Format: https://xxxxxxxxxxxxx.supabase.co
   Example: https://abcdefghijklmnop.supabase.co
   
☐ VITE_SUPABASE_ANON_KEY
   Location: "Project API keys" section → "anon public"
   Format: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx...
   Note: This is a LONG key (200+ characters)
```

---

## 2️⃣ FIREBASE CREDENTIALS (7 values needed)

### Where to Find:
1. Go to: https://console.firebase.google.com
2. Select your **RL Jewels** project
3. Click **Project Settings** (gear icon)
4. Scroll down to **"Your apps"** section
5. Find your **Web app** (or create one if missing)
6. Click **"Config"** or SDK setup

### What to Copy:

You'll see something like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXX",
  authDomain: "rl-jewels.firebaseapp.com",
  projectId: "rl-jewels",
  storageBucket: "rl-jewels.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxxxxxxxxxx",
  measurementId: "G-XXXXXXXXXX"
};
```

Copy each value:

```
☐ VITE_FIREBASE_API_KEY
   Example: AIzaSyXXXXXXXXXXXXXXXXXX
   
☐ VITE_FIREBASE_AUTH_DOMAIN
   Example: rl-jewels.firebaseapp.com
   
☐ VITE_FIREBASE_PROJECT_ID
   Example: rl-jewels
   
☐ VITE_FIREBASE_STORAGE_BUCKET
   Example: rl-jewels.appspot.com
   
☐ VITE_FIREBASE_MESSAGING_SENDER_ID
   Example: 123456789
   
☐ VITE_FIREBASE_APP_ID
   Example: 1:123456789:web:xxxxxxxxxxxxx
   
☐ VITE_FIREBASE_MEASUREMENT_ID
   Example: G-XXXXXXXXXX
```

---

## 3️⃣ RAZORPAY (Optional - for payment testing)

### Where to Find:
1. Go to: https://dashboard.razorpay.com
2. Login to your account
3. Go to **Settings** → **API Keys**
4. Copy the **Test Key ID**

### What to Copy:

```
☐ VITE_RAZORPAY_KEY_ID
   Format: rzp_test_XXXXXXXXXXXXXX
   Note: Use TEST key, not LIVE key
```

**Note**: This is optional. Leave blank if not using payments yet.

---

## 📝 How to Use These Credentials

### Step 1: Open the `.env` File
Located in your project root: `c:\Users\lbaga\OneDrive\Desktop\RL-Jewels\.env`

### Step 2: Fill in Each Value
Replace the placeholder text with your actual credentials:

**Before**:
```env
VITE_SUPABASE_URL=your_supabase_url_here
```

**After**:
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
```

### Step 3: Save the File
Make sure all 9 values are filled (or 8 if skipping Razorpay)

### Step 4: Test Locally
```powershell
npm run dev
```

Visit http://localhost:5000 and verify:
- ✅ Products load → Supabase connected
- ✅ Can navigate to `/admin` → Firebase ready

---

## 🔐 Security Reminders

- ✅ **Never share these credentials publicly**
- ✅ **Never commit `.env` to GitHub** (already in `.gitignore`)
- ✅ **Use environment variables in Vercel/Netlify** (add them in dashboard)
- ✅ **Keep a backup** (save to password manager or secure note)

---

## ⚠️ Important Notes

### About Supabase:
- Your Supabase project is **still active** even though Replit plan ended
- Supabase is **independent** of Replit
- **No migration needed** - just reconnect with same credentials
- Free tier includes 500 MB database (plenty for jewelry store)

### About Firebase:
- Your Firebase project is **still active**
- Firebase is **independent** of Replit
- **No setup needed** - just use same credentials
- Free tier includes 10,000 auth users (more than enough)

### About Replit:
- Only the **hosting** was on Replit
- Database (Supabase) and Auth (Firebase) were **always external**
- You're just **moving the frontend** to Vercel
- All your **data is safe** and accessible

---

## 🆘 Troubleshooting

### Can't Find Supabase Project
- Login to Supabase with the **same email** you used in Replit
- Check "All Projects" - your RL Jewels project should be there
- If you can't find it, check if you used a different email account

### Can't Find Firebase Project
- Login to Firebase with the **same Google account** used in Replit
- Your RL Jewels project should appear in the project list
- Check both personal and work accounts if you have multiple

### Don't Remember Which Accounts
- **Check Replit settings** - might show connected accounts
- **Check your email** - search for "Supabase" or "Firebase" confirmation emails
- **Try common emails** - lbagade6@gmail.com or your business email

### Credentials Not Working
- Make sure you copied the **entire key** (especially Supabase anon key - it's very long)
- Check for **extra spaces** at the beginning or end
- Make sure you copied from the **correct project** (RL Jewels)

---

## ✅ Quick Verification

After filling `.env`, run this test:

```powershell
# Start local server
npm run dev

# Then visit http://localhost:5000
```

**If you see**:
- ✅ Homepage loads → Everything configured correctly!
- ✅ Products display → Supabase connected!
- ✅ No console errors (press F12) → All good!

**If you see errors**:
- ❌ "Missing Supabase credentials" → Check `.env` has Supabase URL and key
- ❌ "Firebase initialization failed" → Check all Firebase values in `.env`
- ❌ Products not loading → Check Supabase credentials are correct

---

## 📞 Need Help?

1. **Double-check** you copied entire keys (no truncation)
2. **Verify** you're using the correct Supabase/Firebase project
3. **Test** each credential source separately
4. **Review** `DEPLOYMENT_GUIDE.md` for detailed steps

---

## 🎯 Next Steps After Collecting Credentials

1. ✅ Fill `.env` file with all credentials
2. ✅ Test locally: `npm run dev`
3. ✅ If local test works, proceed to deployment
4. ✅ Follow `READY_TO_DEPLOY.md` for deployment steps

---

**Once you have all 9 credentials, you're 5 minutes away from deployment! 🚀**
