# 🚀 Netlify Deployment Guide - RL Jewels

## ✅ Prerequisites Checklist

- ✅ Code pushed to GitHub (https://github.com/LOKESHBAGADE07/RL-Jewels)
- ✅ Production build tested (`npm run build` successful)
- ✅ All tests passing (145/145 ✅)
- ⏳ Netlify account (create at netlify.com)
- ⏳ Supabase anon key ready

---

## 🎯 **Method 1: Deploy via Netlify Website (Recommended - Easiest)**

### Step 1: Sign Up / Login to Netlify

1. Go to **https://netlify.com**
2. Click **"Sign up"** or **"Log in"**
3. Choose **"Sign up with GitHub"**
4. Authorize Netlify to access your GitHub repositories

### Step 2: Import Your Project

1. Click **"Add new site"** button
2. Select **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify if prompted
5. Select your repository: **LOKESHBAGADE07/RL-Jewels**

### Step 3: Configure Build Settings

Netlify should auto-detect Vite settings. Verify these:

```
Build command: npm run build
Publish directory: dist
```

If not auto-filled, enter manually:
- **Base directory:** (leave blank)
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Functions directory:** (leave blank)

### Step 4: Add Environment Variables

**BEFORE clicking Deploy**, scroll down to **"Advanced build settings"**:

Click **"New variable"** and add:

1. **Key:** `VITE_SUPABASE_URL`  
   **Value:** `https://hlqwxycvgxorvejhsqin.supabase.co`

2. **Key:** `VITE_SUPABASE_ANON_KEY`  
   **Value:** (your actual Supabase anon key - get from Supabase Dashboard → Settings → API)

3. **Key:** `VITE_WHATSAPP_NUMBER` (optional - already in code)  
   **Value:** `919403891854`

4. **Key:** `VITE_PHONE_NUMBER` (optional - already in code)  
   **Value:** `+919403891854`

### Step 5: Deploy!

1. Click **"Deploy site"** button
2. Wait 2-3 minutes for build to complete
3. Watch the deploy logs in real-time

### Step 6: Get Your Site URL

Once deployed, you'll see:
```
Your site is live at: https://random-name-12345.netlify.app
```

---

## 🎯 **Method 2: Deploy via Netlify CLI (Faster for Updates)**

### Step 1: Install Netlify CLI

```powershell
npm install -g netlify-cli
```

### Step 2: Login to Netlify

```powershell
netlify login
```

This will open a browser for authorization.

### Step 3: Build Your Project

```powershell
npm run build
```

### Step 4: Deploy

**For initial deployment:**
```powershell
netlify deploy
```

Follow the prompts:
- **Create & configure a new site?** Yes
- **Team:** Choose your team
- **Site name:** rl-jewels (or your preferred name)
- **Publish directory:** dist

**For production deployment:**
```powershell
netlify deploy --prod
```

### Step 5: Add Environment Variables via CLI

```powershell
# Set environment variables
netlify env:set VITE_SUPABASE_URL "https://hlqwxycvgxorvejhsqin.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "your_actual_anon_key_here"
```

Then redeploy:
```powershell
netlify deploy --prod
```

---

## 🎯 **Method 3: Drag & Drop (Quickest Test)**

### Step 1: Build Locally

```powershell
npm run build
```

This creates the `dist` folder.

### Step 2: Deploy via Drag & Drop

1. Go to **https://app.netlify.com/drop**
2. **Drag the `dist` folder** onto the page
3. Site deployed instantly!

⚠️ **Note:** Drag & drop deployments:
- Don't include environment variables
- Won't auto-deploy on git push
- Good for testing only

To add environment variables after drag & drop:
1. Go to **Site settings → Environment variables**
2. Add your variables
3. Trigger a manual redeploy

---

## ⚙️ **Netlify Configuration File (Optional but Recommended)**

You already have `vercel.json`. Let me create `netlify.toml`:

Create file: `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## 🔧 **Post-Deployment Configuration**

### 1. Update Supabase Settings

Go to **Supabase Dashboard → Authentication → URL Configuration**:

**Site URL:**
```
https://your-site-name.netlify.app
```

**Redirect URLs (add these):**
```
https://your-site-name.netlify.app/*
https://your-site-name.netlify.app/admin
https://your-site-name.netlify.app/admin/login
```

### 2. Custom Domain Setup (Optional)

**If you have a custom domain:**

1. Go to **Netlify Dashboard → Domain settings**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `rl-jewels.com`)
4. Follow DNS configuration instructions

**DNS Records to add:**
```
Type: A
Name: @ (or your domain)
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

Netlify automatically provides **free SSL certificate** 🔒

### 3. Configure Site Settings

In **Netlify Dashboard → Site settings**:

**General:**
- **Site name:** Change from random name to `rl-jewels`
- **URL becomes:** `https://rl-jewels.netlify.app`

**Build & deploy:**
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Production branch:** `main`

**Environment variables:**
- Verify all variables are set (see Step 4 from Method 1)

---

## 🔄 **Automatic Deployments**

Once connected to GitHub, Netlify automatically:
- ✅ Deploys on every push to `main` branch
- ✅ Creates preview deployments for pull requests
- ✅ Runs build command before deployment
- ✅ Invalidates CDN cache
- ✅ Provides deploy previews with unique URLs

---

## 📊 **Netlify Features You Get**

- ✅ **Automatic SSL/HTTPS** - Free Let's Encrypt certificate
- ✅ **CDN** - Global edge network (fast worldwide)
- ✅ **Continuous Deployment** - Auto-deploy on git push
- ✅ **Deploy Previews** - Test PRs before merging
- ✅ **Rollback** - Instant rollback to previous version
- ✅ **Forms** - Built-in form handling (can replace some backend)
- ✅ **Analytics** - Basic analytics included
- ✅ **Functions** - Serverless functions support
- ✅ **Split Testing** - A/B testing built-in

---

## 🧪 **Testing Your Deployment**

After deployment, test these:

### 1. Homepage
- Visit: `https://your-site.netlify.app`
- ✅ Hero banners load
- ✅ Images lazy load
- ✅ Products display

### 2. WhatsApp Links
- Click product enquiry buttons
- ✅ Opens WhatsApp with correct number (919403891854)

### 3. Admin Panel
- Visit: `https://your-site.netlify.app/admin`
- ✅ Can access login page
- ✅ Magic link email works (check after Supabase URL update)

### 4. Mobile Responsive
- Test on phone or use browser dev tools
- ✅ Navigation works
- ✅ Touch targets are usable
- ✅ Images load properly

### 5. Performance
- Run Lighthouse audit in Chrome DevTools
- Target: 90+ performance score

---

## ⚠️ **Common Issues & Solutions**

### Issue 1: "Build Failed"
**Error:** `npm run build` fails

**Solutions:**
- Check build logs in Netlify dashboard
- Ensure all dependencies in `package.json`
- Verify Node version (use Node 18+)
- Check for TypeScript errors

### Issue 2: "Page Not Found" on Refresh
**Error:** 404 on page refresh

**Solution:** Add redirect rule in `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Issue 3: "Supabase Connection Error"
**Error:** Can't connect to Supabase

**Solutions:**
- Verify environment variables are set correctly
- Check Supabase URL is correct
- Ensure anon key is the public key (not service key)
- Update Supabase redirect URLs

### Issue 4: "Images Not Loading"
**Error:** Images show broken

**Solutions:**
- Check image paths are relative (not absolute)
- Verify images are in `public` or `src/assets`
- Check Supabase storage bucket is public
- Verify storage policies in Supabase

### Issue 5: "Magic Link Redirect Error"
**Error:** Magic link doesn't redirect back

**Solution:** Update Supabase Site URL and Redirect URLs (see Post-Deployment section)

---

## 🔒 **Security Checklist**

Before going live:

- ✅ Environment variables set (not in code)
- ✅ Supabase RLS policies enabled
- ✅ HTTPS enabled (automatic on Netlify)
- ✅ Security headers configured (in netlify.toml)
- ✅ No API keys in frontend code
- ✅ Admin routes protected
- ✅ CORS configured in Supabase

---

## 📈 **Performance Optimization**

Netlify automatically provides:
- ✅ Asset compression (gzip/brotli)
- ✅ CDN caching
- ✅ HTTP/2 support
- ✅ Image optimization (via Netlify Image CDN - paid feature)

Additional optimizations (already implemented):
- ✅ Lazy loading images
- ✅ Code splitting
- ✅ Optimized build output

---

## 🎯 **Quick Command Reference**

```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize site
netlify init

# Build locally
npm run build

# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod

# Open site in browser
netlify open:site

# Open admin dashboard
netlify open:admin

# View site logs
netlify logs

# Check environment variables
netlify env:list

# Set environment variable
netlify env:set VAR_NAME "value"

# Link to existing site
netlify link
```

---

## 📞 **Need Help?**

**Netlify Support:**
- Docs: https://docs.netlify.com
- Community: https://answers.netlify.com
- Status: https://netlifystatus.com

**Your Project:**
- Email: lbagade6@gmail.com
- WhatsApp: +91 87672 04972
- GitHub: https://github.com/LOKESHBAGADE07/RL-Jewels

---

## 🎉 **You're Ready to Deploy!**

Choose your preferred method:
1. **Method 1 (Easiest):** Netlify Website - No CLI needed
2. **Method 2 (Fastest):** Netlify CLI - Good for regular updates
3. **Method 3 (Quickest test):** Drag & Drop - Instant test deployment

**Recommended:** Start with Method 1 (Website) for your first deployment.

---

## 📋 **Deployment Checklist**

Use this checklist when deploying:

- [ ] Supabase anon key ready
- [ ] Create/login to Netlify account
- [ ] Connect GitHub repository
- [ ] Configure build settings (build command: `npm run build`, publish: `dist`)
- [ ] Add environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- [ ] Click "Deploy site"
- [ ] Wait for deployment to complete (2-3 minutes)
- [ ] Copy your site URL
- [ ] Update Supabase redirect URLs
- [ ] Test homepage, admin, WhatsApp links
- [ ] Test on mobile device
- [ ] Run Lighthouse audit
- [ ] (Optional) Configure custom domain
- [ ] (Optional) Set up deploy notifications

---

**Good luck with your deployment! Your RL Jewels website will be live in minutes!** 🚀

*Last updated: November 3, 2025*
