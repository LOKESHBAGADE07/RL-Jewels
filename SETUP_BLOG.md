# 📝 Blog Section - Setup Guide

## ✅ What's Built:
1. **Admin Blog Manager** - Create, edit, publish, and delete blog posts
2. **Public Blog Pages** - Beautiful blog list and individual post pages
3. **Markdown Support** - Write rich content using Markdown formatting
4. **Categories & Tags** - Organize posts by categories and tags
5. **Image Upload** - Upload featured images for blog posts

---

## 🚀 Quick Setup (5 Minutes):

### Step 1: Create Database Table

1. Go to your **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the **entire content** from `BLOG_DATABASE_SETUP.sql` file
6. Paste it into the SQL Editor
7. Click **Run** button

✅ You'll see: "Blog posts table created successfully!"
✅ A sample blog post will be created automatically

---

## 🎯 How to Use:

### Creating a Blog Post:

1. **Go to Admin**: `/admin/blog`
2. **Click "New Post"**
3. **Fill in the details**:
   - Title: e.g., "How to Care for Gold Jewelry"
   - Excerpt: Short summary (appears in blog list)
   - Content: Use Markdown formatting (see tips below)
   - Featured Image: Upload a relevant image
   - Category: Choose from 8 categories
   - Tags: Add comma-separated tags
   - Author: Your name or "RL Jewels Team"
4. **Check "Publish"** to make it live immediately
5. **Click "Create Post"**

### Publishing/Unpublishing:

- **Drafts**: Uncheck "Publish" to save as draft
- **Publish Later**: Save as draft, then click "Publish" button when ready
- **Unpublish**: Click "Unpublish" to hide from public

---

## ✍️ Markdown Formatting Guide:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet point 1
- Bullet point 2

1. Numbered list
2. Second item

Visit RL Jewels for expert advice!
```

---

## 📚 Blog Categories:

1. **Jewelry Care** - Cleaning, maintenance, storage tips
2. **Gold Investment** - Gold savings plans, market trends
3. **Gemstone Guide** - About diamonds, emeralds, rubies
4. **Wedding Jewelry** - Bridal sets, mangalsutra, wedding rings
5. **Fashion Trends** - Latest jewelry fashion
6. **Buying Guide** - What to look for when buying
7. **Traditional Jewelry** - Thushi, Kolhapuri saaj, temple jewelry
8. **Festival Special** - Diwali, Gudi Padwa, Akshaya Tritiya

---

## 💡 Blog Post Ideas:

### Jewelry Care:
- "5 Ways to Keep Your Gold Jewelry Shining"
- "How to Store Your Precious Jewelry Safely"
- "When to Get Your Jewelry Professionally Cleaned"

### Gold Investment:
- "Why Gold Savings Plans Are Perfect for Indian Families"
- "Best Time to Buy Gold in India"
- "Understanding 22K vs 24K Gold"

### Wedding Jewelry:
- "Complete Bridal Jewelry Set Guide"
- "Traditional Maharashtrian Wedding Jewelry"
- "How to Choose the Perfect Mangalsutra"

### Festivals:
- "Diwali Jewelry Shopping Guide"
- "Akshaya Tritiya: Auspicious Time for Gold Purchase"
- "Gudi Padwa Special Jewelry Collection"

---

## 🎨 Best Practices:

1. **Use High-Quality Images**: Upload clear, well-lit jewelry photos
2. **Write Engaging Titles**: Make them descriptive and interesting
3. **Keep it Helpful**: Focus on educating your customers
4. **SEO-Friendly**: Use relevant keywords naturally
5. **Regular Updates**: Post at least 1-2 blogs per month
6. **Add Call-to-Action**: Encourage visits to your showroom

---

## 🌐 Public Blog Pages:

**Blog List**: `/blog` - Shows all published posts with category filters
**Individual Post**: `/blog/post-slug` - Shows full blog post content

**Navigation**: Blog link is in the main website header

---

## 🔒 Security:

- Only **published** posts show on public website
- Only **admin email** (lbagade6@gmail.com) can create/edit posts
- Public users can **only read** published posts
- Drafts are hidden from public

---

## 💻 Admin Access:

**Admin Blog Manager**: `/admin/blog`
- View all posts (published & drafts)
- Filter by status
- Edit or delete posts
- Publish/unpublish with one click

---

## 📊 Sample Blog Post Included:

The setup automatically creates a sample post:
**"How to Clean and Maintain Your Gold Jewelry"**

You can:
- View it on `/blog`
- Edit it in admin
- Use it as a template
- Delete it and create your own

---

**Start creating valuable content for your customers today! 🎉**
