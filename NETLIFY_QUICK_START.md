# 🚀 QUICK START: Deploy to Netlify in 5 Minutes

## 🎯 **Follow These Steps Exactly**

### **Step 1: Open Netlify** (30 seconds)
1. Open browser
2. Go to: **https://app.netlify.com**
3. Click **"Sign up with GitHub"**
4. Authorize Netlify

---

### **Step 2: Add New Site** (1 minute)
1. Click green **"Add new site"** button (top right)
2. Click **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. Search for: **RL-Jewels**
5. Click on your repository

---

### **Step 3: Configure Build** (1 minute)
You should see these auto-detected:
```
Build command: npm run build
Publish directory: dist
```

**If empty, enter manually:**
- Build command: `npm run build`
- Publish directory: `dist`

---

### **Step 4: Add Environment Variables** (2 minutes)
**IMPORTANT:** Scroll down to **"Advanced build settings"**

Click **"New variable"** button twice and add:

**Variable 1:**
```
Key: VITE_SUPABASE_URL
Value: https://hlqwxycvgxorvejhsqin.supabase.co
```

**Variable 2:**
```
Key: VITE_SUPABASE_ANON_KEY
Value: [YOUR_SUPABASE_ANON_KEY]
```

**To get your Supabase Anon Key:**
1. Go to: https://supabase.com/dashboard
2. Select your project: **hlqwxycvgxorvejhsqin**
3. Click ⚙️ **Settings** → **API**
4. Copy the **anon public** key (starts with `eyJ...`)

---

### **Step 5: Deploy!** (2-3 minutes)
1. Click green **"Deploy site"** button
2. Watch the build logs
3. Wait for "Site is live" message

**Your site URL will be:**
```
https://[random-name].netlify.app
```

---

## ✅ **After Deployment**

### **Update Supabase Settings** (REQUIRED)

1. Go to **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** → **URL Configuration**
4. Update these:

**Site URL:**
```
https://[your-netlify-url].netlify.app
```

**Redirect URLs (add both):**
```
https://[your-netlify-url].netlify.app/*
https://[your-netlify-url].netlify.app/admin
```

5. Click **"Save"**

---

## 🧪 **Test Your Site**

Visit these URLs and check:

✅ **Homepage:** `https://[your-site].netlify.app`
- Hero banners rotate
- Products display
- Images load

✅ **WhatsApp:** Click any product enquiry button
- Opens WhatsApp with 919403891854

✅ **Admin:** `https://[your-site].netlify.app/admin`
- Login page loads
- Can request magic link

✅ **Mobile:** Test on phone
- Responsive design works
- Touch targets work

---

## 🎨 **Optional: Change Site Name**

Your site has a random name like `brave-unicorn-12345.netlify.app`

**To change it:**
1. In Netlify Dashboard → **Site settings**
2. Click **"Change site name"**
3. Enter: `rl-jewels`
4. New URL: `https://rl-jewels.netlify.app`

---

## 🔄 **Automatic Updates**

Now whenever you push to GitHub:
```powershell
git add .
git commit -m "update something"
git push origin main
```

**Netlify automatically:**
- Detects the push
- Runs build
- Deploys new version
- Takes ~2-3 minutes

---

## 💡 **Pro Tips**

### **View Deploy Logs**
In Netlify Dashboard → **Deploys** → Click latest deploy → View logs

### **Rollback to Previous Version**
Deploys → Click older deploy → **"Publish deploy"**

### **Deploy Previews**
Create a branch → Push → Netlify creates preview URL automatically

### **Custom Domain**
Site settings → Domain management → Add custom domain

---

## ⚠️ **Troubleshooting**

### **Build Fails**
- Check build logs for errors
- Verify `package.json` has all dependencies
- Try building locally first: `npm run build`

### **Site Loads But No Data**
- Check environment variables are set
- Verify Supabase anon key is correct
- Check browser console for errors

### **Admin Login Doesn't Work**
- Update Supabase redirect URLs (see above)
- Check Supabase project is active
- Verify magic link email settings

### **404 on Page Refresh**
- `netlify.toml` should handle this automatically
- Check file exists in repository
- Verify redirect rules in netlify.toml

---

## 📞 **Need Help?**

**Stuck?** Contact:
- Email: lbagade6@gmail.com
- WhatsApp: +91 87672 04972

**Netlify Docs:**
- https://docs.netlify.com

---

## 📋 **Quick Checklist**

- [ ] Netlify account created
- [ ] Repository connected (RL-Jewels)
- [ ] Build settings configured
- [ ] Environment variables added (2 variables)
- [ ] Site deployed successfully
- [ ] Supabase URLs updated
- [ ] Homepage tested
- [ ] WhatsApp links tested
- [ ] Admin login tested
- [ ] Mobile responsive tested

---

## 🎉 **That's It!**

Your RL Jewels website is now live on Netlify!

**Share your site:** `https://[your-site].netlify.app`

**Next Steps:**
- Add custom domain (optional)
- Set up analytics
- Monitor performance
- Keep developing!

---

*Deployment takes ~5 minutes total. You've got this!* 🚀
