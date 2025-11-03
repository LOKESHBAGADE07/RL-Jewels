# 🎬 Hero Banners - Video Support Added

## ✅ What's New?

### **Video Upload Support** 
You can now upload **both images AND videos** to hero banners!

---

## 🚀 Features

### **1. Upload Options:**
- ✅ **Images** - JPG, PNG, WebP (Max 5MB)
- ✅ **Videos** - MP4, WebM, MOV (Max 50MB)
- ✅ Auto-detection of media type
- ✅ Visual indicators (Image/Video badges)

### **2. Admin Interface:**
- Hover over preview → Upload button appears
- Select image OR video file
- Automatic upload and preview
- Media type badge shows "Image" or "Video"
- Loading spinner during upload

### **3. Homepage Display:**
- Videos auto-play on loop
- Muted audio (best practice)
- Smooth transitions between media
- Same overlay and text support

---

## 📋 Setup Instructions

### **Step 1: Update Database** (If already set up)

If you've already created the hero_banners table, run this SQL:

```sql
-- Go to: https://supabase.com/dashboard/project/hlqwxycvgxorvejhsqin/sql

-- Copy and run this file: UPDATE_HERO_BANNERS_VIDEO.sql
```

**OR** if you're setting up fresh, use the updated:
- `HERO_BANNERS_DATABASE_SETUP.sql` (includes video fields)

### **Step 2: Test Upload**

1. Go to: http://localhost:5000/admin/hero-banners
2. Hover over any banner preview
3. Click "Upload"
4. Select an image OR video file
5. Wait for upload
6. See badge showing "Image" or "Video"

---

## 🎥 Video Guidelines

### **Recommended Settings:**
- **Format:** MP4 (H.264 codec)
- **Resolution:** 1920x1080 (Full HD)
- **Duration:** 10-30 seconds
- **File Size:** Under 50MB (smaller is better)
- **Aspect Ratio:** 16:9

### **Best Practices:**
- ✅ Keep videos short (15-20 seconds ideal)
- ✅ Use high-quality, professional footage
- ✅ Avoid videos with important audio
- ✅ Test on mobile devices
- ✅ Compress videos before uploading

### **Video Optimization Tools:**
- HandBrake (free video converter)
- CloudConvert (online converter)
- Adobe Media Encoder (professional)

---

## 🖼️ Image vs Video

### **When to Use Images:**
- Static offers/promotions
- Text-heavy banners
- Faster page load
- Works everywhere

### **When to Use Videos:**
- Product showcases
- Dynamic content
- Special events
- Premium feel
- Higher engagement

---

## 💡 How It Works

### **Upload Process:**

1. **File Selection**
   - User hovers over preview
   - Clicks "Upload"
   - Selects file (image or video)

2. **Validation**
   - Checks file type (image/* or video/*)
   - Checks file size (5MB images, 50MB videos)
   - Shows error if invalid

3. **Upload**
   - Uploads to Supabase Storage
   - Generates unique filename
   - Gets public URL

4. **Database Update**
   - Sets `video_url` for videos
   - Sets `image_url` for images
   - Sets `media_type` ('image' or 'video')
   - Clears opposite field

5. **Display**
   - Homepage shows video (auto-play, loop, muted)
   - Or shows image
   - Same text overlay works for both

---

## 🎨 Visual Indicators

### **In Admin Panel:**

**Image Badge:**
```
┌─────────────┐
│    Image    │ [Blue Badge]
│   Preview   │
└─────────────┘
```

**Video Badge:**
```
┌─────────────┐
│    Video    │ [Red Badge]
│   Preview   │ (paused frame)
└─────────────┘
```

**No Media:**
```
┌─────────────┐
│     📷      │
│  No Media   │
└─────────────┘
```

---

## 🔧 Technical Details

### **Database Fields:**
- `image_url` - Image URL (or null)
- `video_url` - Video URL (or null)
- `media_type` - 'image' | 'video' | null

### **Storage:**
- Bucket: `hero-banners`
- Path: `{bannerId}-{timestamp}.{ext}`
- Public access enabled

### **Functions Updated:**
- `uploadHeroBannerMedia()` - Handles both types
- `uploadHeroBannerImage()` - Legacy (still works)
- `deleteHeroBannerMedia()` - Deletes either type

### **Components Updated:**
- `HeroBannersManager.tsx` - Admin UI with video support
- `HeroSection.tsx` - Homepage display with video
- `hero-banners-database.ts` - Upload functions

---

## 📱 Mobile Considerations

### **Auto-play:**
- Works on iOS/Android (muted videos)
- No user interaction needed
- Smooth transitions

### **Performance:**
- Videos load asynchronously
- Optimized for mobile networks
- Falls back to image if needed

---

## 🆘 Troubleshooting

### **"File too large" Error:**
- **Images:** Compress to under 5MB
- **Videos:** Compress to under 50MB
- Use online tools or HandBrake

### **Video not playing:**
- Check format (MP4 works best)
- Check codec (H.264 recommended)
- Verify file uploaded correctly
- Check browser console (F12)

### **Upload fails:**
- Check internet connection
- Verify you're logged in
- Run `FIX_STORAGE_POLICIES.sql`
- Check bucket exists and is public

### **Video shows but doesn't auto-play:**
- Check if video is muted (required for auto-play)
- Check browser auto-play settings
- Videos must be muted to auto-play

---

## 📊 Supported Formats

### **Images:**
- ✅ JPG / JPEG
- ✅ PNG
- ✅ WebP
- ✅ GIF (animated)

### **Videos:**
- ✅ MP4 (recommended)
- ✅ WebM
- ✅ MOV
- ✅ OGG

---

## 🎯 Best Use Cases

### **1. Product Showcase Video:**
- Show jewelry being worn
- Close-up of craftsmanship
- 360° view of piece
- Duration: 15-20 seconds

### **2. Special Event:**
- Festival celebrations
- New collection launch
- Store opening
- Duration: 10-15 seconds

### **3. Brand Story:**
- Crafting process
- Heritage/tradition
- Customer testimonials
- Duration: 20-30 seconds

### **4. Static Offers (Images):**
- Discount announcements
- Sale banners
- New arrivals
- Quick load time

---

## ✅ Summary

**What Changed:**
- ✅ Added video upload support
- ✅ Updated admin interface
- ✅ Added media type indicators
- ✅ Updated homepage to play videos
- ✅ Increased size limits for videos

**Benefits:**
- 🎬 More engaging hero section
- 🎨 Dynamic content options
- 💎 Showcase products in motion
- 📈 Higher customer engagement
- ✨ Professional appearance

**Files to Run:**
- `UPDATE_HERO_BANNERS_VIDEO.sql` - Adds video fields

**Ready to Use!** 🚀💎✨

---

## 🎉 Quick Test

1. Go to `/admin/hero-banners`
2. Hover over any banner
3. Click "Upload"
4. Try uploading:
   - ✅ A small image (under 5MB)
   - ✅ A short video (under 50MB, MP4)
5. Check homepage to see them in action!

**Enjoy your new video-enabled hero banners!** 🎬✨
