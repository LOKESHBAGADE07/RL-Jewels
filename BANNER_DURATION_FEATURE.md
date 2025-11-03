# ⏱️ Banner Duration Feature Added!

## ✅ What's New?

You can now set **custom display duration** for each banner! Control how long each banner shows before auto-advancing to the next one.

---

## 🎯 Features Added:

### **1. Database Field:**
- ✅ `duration_seconds` column added
- ✅ Default: 5 seconds
- ✅ Range: 1-60 seconds
- ✅ Database validation (CHECK constraint)

### **2. Admin Form:**
- ✅ Duration input field (1-60 seconds)
- ✅ Shows in 3-column layout: Order | Duration | Status
- ✅ Visual helper text: "Display time (1-60 sec)"

### **3. Admin Manager:**
- ✅ Duration column in table
- ✅ Blue badge showing "5s", "10s", etc.
- ✅ Easy to see at a glance

### **4. Homepage Carousel:**
- ✅ Each banner uses its own duration
- ✅ Smooth auto-advance based on duration
- ✅ Perfect timing control

---

## 🚀 How to Set Up:

### **Step 1: Run Migration SQL**

If you already have the hero_banners table:

**Go to Supabase SQL Editor and run:**
```sql
-- File: ADD_BANNER_DURATION.sql
```

This adds the `duration_seconds` column with default value of 5 seconds.

---

### **Step 2: Test It!**

**Your server:** http://localhost:5001

1. **Go to Hero Banners Manager:**
   http://localhost:5001/admin/hero-banners

2. **Create or Edit a Banner:**
   - Set **Duration: 3 seconds** (quick banner)
   - Or **Duration: 10 seconds** (longer banner)
   - Or **Duration: 15 seconds** (video showcase)

3. **Check Homepage:**
   - Go to: http://localhost:5001
   - Watch carousel auto-advance
   - Each banner shows for its set duration!

---

## 💡 Use Cases:

### **Short Duration (3-5 seconds):**
- ✅ Simple promotional text
- ✅ Quick announcements
- ✅ Flash sales
- ✅ "New Arrival" badges

**Example:**
```
Title: "50% OFF"
Subtitle: "Limited Time Only"
Duration: 3 seconds
```

### **Medium Duration (5-8 seconds):**
- ✅ Product showcases
- ✅ Collection highlights
- ✅ Brand messages
- ✅ Most images

**Example:**
```
Title: "New Collection"
Subtitle: "Explore our latest designs"
Duration: 7 seconds
```

### **Long Duration (10-15 seconds):**
- ✅ Videos
- ✅ Detailed information
- ✅ Story-telling
- ✅ Important announcements

**Example:**
```
Title: "Craftsmanship Video"
Video: product-showcase.mp4
Duration: 15 seconds
```

---

## 🎨 Examples:

### **Scenario 1: Fast-Paced Carousel**
```
Banner 1: "Flash Sale" - 3 seconds
Banner 2: "New Arrivals" - 3 seconds
Banner 3: "Free Shipping" - 3 seconds
Total cycle: 9 seconds (dynamic, engaging)
```

### **Scenario 2: Balanced Mix**
```
Banner 1: Image - "Welcome" - 5 seconds
Banner 2: Video - "Craftsmanship" - 15 seconds
Banner 3: Image - "Collection" - 7 seconds
Total cycle: 27 seconds (varied pacing)
```

### **Scenario 3: Video-Heavy**
```
Banner 1: Video - "Brand Story" - 20 seconds
Banner 2: Image - "Shop Now" - 5 seconds
Banner 3: Video - "Process" - 15 seconds
Total cycle: 40 seconds (immersive)
```

---

## 📋 Database Schema:

```sql
CREATE TABLE hero_banners (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  button_text TEXT,
  button_link TEXT,
  image_url TEXT,
  video_url TEXT,
  media_type TEXT,                    -- 'image' or 'video'
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  duration_seconds INTEGER DEFAULT 5,  -- NEW! 🎉
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  
  CHECK (media_type IN ('image', 'video')),
  CHECK (duration_seconds >= 1 AND duration_seconds <= 60)
);
```

---

## 🎯 Admin UI:

### **Form Layout:**
```
┌─────────────────────────────────────┐
│ Title: "Special Offer"              │
│ Subtitle: "Limited time only"       │
│ Button Text: "Shop Now"             │
│ Button Link: "/collections"         │
│                                      │
│ ┌──────┐ ┌──────────┐ ┌──────────┐ │
│ │Order │ │ Duration │ │  Status  │ │
│ │  1   │ │  10 sec  │ │ ☑ Active │ │
│ └──────┘ └──────────┘ └──────────┘ │
└─────────────────────────────────────┘
```

### **Manager Table:**
```
┌─────────┬─────────────┬───────┬──────────┬────────┬─────────┐
│ Preview │   Details   │ Order │ Duration │ Status │ Actions │
├─────────┼─────────────┼───────┼──────────┼────────┼─────────┤
│ [IMAGE] │ Welcome     │  #1   │   5s     │ Active │ Edit ✏️ │
│ [VIDEO] │ Showcase    │  #2   │  15s     │ Active │ Edit ✏️ │
│ [IMAGE] │ Sale Banner │  #3   │   7s     │ Active │ Edit ✏️ │
└─────────┴─────────────┴───────┴──────────┴────────┴─────────┘
```

---

## ⚙️ Technical Details:

### **Frontend Logic:**
```typescript
// Auto-advance with dynamic duration
useEffect(() => {
  if (banners.length <= 1) return;
  
  const currentDuration = (banners[currentIndex]?.duration_seconds || 5) * 1000;
  
  const timer = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, currentDuration);

  return () => clearInterval(timer);
}, [banners.length, currentIndex, banners]);
```

**How it works:**
1. Gets current banner's duration
2. Converts seconds to milliseconds
3. Sets interval with that duration
4. Clears interval when banner changes
5. Next banner uses its own duration

---

## 🎬 Video Recommendations:

### **For Videos:**
- **Short clips (10-15 sec):** Set duration to 15 seconds
- **Long clips (20-30 sec):** Set duration to 25-30 seconds
- **Always:** Duration ≥ video length + 2 seconds

### **For Images:**
- **Text-heavy:** 7-10 seconds (reading time)
- **Simple images:** 5-7 seconds
- **Promotions:** 3-5 seconds (quick impact)

---

## ✅ Files Updated:

1. ✅ `ADD_BANNER_DURATION.sql` - Migration script (NEW)
2. ✅ `SETUP_HERO_BANNERS_COMPLETE.sql` - Updated with duration
3. ✅ `hero-banners-database.ts` - Interface with duration_seconds
4. ✅ `HeroBannerForm.tsx` - Duration input field
5. ✅ `HeroBannersManager.tsx` - Duration column
6. ✅ `HeroSection.tsx` - Dynamic carousel timing

---

## 🆘 Migration Steps:

### **If You Already Have hero_banners Table:**

**Option 1: Run Migration (Recommended)**
```sql
-- Run: ADD_BANNER_DURATION.sql
ALTER TABLE hero_banners 
ADD COLUMN duration_seconds INTEGER DEFAULT 5 
CHECK (duration_seconds >= 1 AND duration_seconds <= 60);
```

**Option 2: Recreate Table**
- Drop existing table (⚠️ loses data)
- Run: SETUP_HERO_BANNERS_COMPLETE.sql
- Includes duration field from start

---

## 🎉 Summary:

**Before:**
- ❌ All banners: 5 seconds (hardcoded)
- ❌ No flexibility
- ❌ Videos cut off early

**After:**
- ✅ Each banner: Custom duration (1-60 sec)
- ✅ Perfect timing control
- ✅ Videos show fully
- ✅ Text banners can be quick
- ✅ Professional carousel experience

---

## 📊 Example Setup:

```
Banner 1: Flash Sale Image
- Duration: 4 seconds
- Quick impact

Banner 2: Craftsmanship Video
- Duration: 20 seconds
- Full showcase

Banner 3: New Collection Image
- Duration: 6 seconds
- Adequate reading time

Total: ~30 seconds per full cycle
Perfect balance! 🎯
```

---

**Now you have complete control over your hero carousel timing!** ⏱️💎✨

**Next Steps:**
1. Run `ADD_BANNER_DURATION.sql` in Supabase
2. Edit existing banners to set custom durations
3. Test on homepage
4. Upload your compressed videos with perfect timing!

**Enjoy your perfectly-timed carousel!** 🚀
