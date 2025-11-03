# 🚀 Deploy to Vercel - Quick Start

## Prerequisites
- ✅ Build completed successfully
- ✅ All tests passing (145/145)
- ✅ GitHub account
- ✅ Vercel account (free)

## Option A: Deploy via Vercel Website (Easiest)

### Step 1: Push to GitHub
```powershell
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "feat: production-ready RL Jewels website"

# Set main branch
git branch -M main

# Add remote (replace with your repo URL)
git remote add origin https://github.com/LOKESHBAGADE07/RL-Jewels.git

# Push
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to **https://vercel.com**
2. Click **"Sign Up"** (use GitHub)
3. Click **"New Project"**
4. Click **"Import Git Repository"**
5. Select **"LOKESHBAGADE07/RL-Jewels"**
6. Click **"Import"**
7. Vercel auto-detects settings:
   - Framework Preset: **Vite**
   - Build Command: **`npm run build`**
   - Output Directory: **`dist`**
   - Install Command: **`npm install`**
8. Click **"Deploy"** 🚀

**Done!** Your site will be live in ~2 minutes at:
`https://rl-jewels.vercel.app` (or similar)

### Step 3: Add Environment Variables
1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add:
   - Key: `VITE_SUPABASE_URL`
   - Value: `https://hlqwxycvgxorvejhsqin.supabase.co`
4. Add:
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: `your_anon_key_here`
5. Click **"Redeploy"** to apply changes

---

## Option B: Deploy via Vercel CLI (Fastest)

### Step 1: Install Vercel CLI
```powershell
npm install -g vercel
```

### Step 2: Login
```powershell
vercel login
```
Follow the browser authentication flow.

### Step 3: Deploy
```powershell
# First deployment (preview)
vercel

# Production deployment
vercel --prod
```

### Step 4: Set Environment Variables
```powershell
vercel env add VITE_SUPABASE_URL production
# Enter: https://hlqwxycvgxorvejhsqin.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY production
# Enter: your_anon_key_here
```

---

## Post-Deployment

### Update Supabase Settings
1. Go to **Supabase Dashboard**
2. **Settings** → **Authentication**
3. **Site URL:** Add your Vercel URL
4. **Redirect URLs:** Add:
   - `https://your-site.vercel.app/admin`
   - `https://your-site.vercel.app/*`

### Test Your Deployment
Visit these URLs:
- ✅ Homepage: `https://your-site.vercel.app`
- ✅ Admin: `https://your-site.vercel.app/admin`
- ✅ Collections: `https://your-site.vercel.app/collections`
- ✅ WhatsApp: Test enquiry buttons

---

## Custom Domain (Optional)

### Add Your Domain
1. Go to Vercel Dashboard → Your Project
2. Click **Settings** → **Domains**
3. Click **"Add Domain"**
4. Enter your domain: `rljewels.com`
5. Follow DNS configuration instructions
6. Wait for DNS propagation (~24 hours)

### DNS Records
Add these to your domain provider:

**For root domain (rljewels.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## Automatic Deployments

Every `git push` to `main` branch triggers:
1. **Build** → Vercel builds your site
2. **Test** → Runs your tests
3. **Deploy** → Deploys to production
4. **Notification** → You get deployment status

---

## Deployment URL Examples

Vercel gives you:
- **Production:** `https://rl-jewels.vercel.app`
- **Preview (branches):** `https://rl-jewels-git-feature-branch.vercel.app`
- **Custom Domain:** `https://rljewels.com` (if configured)

---

## Need Help?

**Vercel Docs:** https://vercel.com/docs  
**Supabase Docs:** https://supabase.com/docs  
**Support:** lbagade6@gmail.com

---

**🎉 Your site is ready to go live! Follow Option A or B above.**
