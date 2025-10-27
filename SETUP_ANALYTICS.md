# 📊 Product Analytics Dashboard - Setup Guide

## ✅ What's Built:
1. **Analytics Dashboard** - View product views, inquiries, and search trends
2. **Popular Products** - Track which products customers view the most
3. **Search Tracking** - Monitor what customers search for
4. **Inquiry Trends** - Visualize inquiry patterns over time
5. **Automatic Tracking** - Track product views and searches automatically

---

## 🚀 Quick Setup (5 Minutes):

### Step 1: Create Database Tables

1. Go to your **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the **entire content** from `ANALYTICS_DATABASE_SETUP.sql` file
6. Paste it into the SQL Editor
7. Click **Run** button

✅ You'll see: "Analytics tracking tables created successfully!"
✅ Sample analytics data will be created automatically

---

## 📊 How to Use:

### Viewing Analytics:

1. **Go to Admin**: `/admin/analytics`
2. **Select Time Range**:
   - Last 7 Days
   - Last 30 Days
   - Last 90 Days
3. **View Metrics**:
   - **Total Product Views** - How many times products were viewed
   - **Total Inquiries** - Number of customer inquiries
   - **Total Searches** - How many searches were performed

### Popular Products Report:

Shows your top 10 products by:
- **View Count** - Most viewed products
- **Inquiry Count** - Products with most inquiries
- **Rank** - Numbered 1-10 by popularity

**Use this to:**
- Stock popular items
- Promote trending products
- Understand customer preferences

### Search Analytics:

Shows recent searches with:
- **Search Query** - What customers searched for
- **Results Count** - How many results were found
- **Timestamp** - When the search was performed

**Use this to:**
- Improve product titles and descriptions
- Add missing products customers are looking for
- Optimize search functionality

### Inquiry Trends:

Daily breakdown showing:
- **Date** - Each day's data
- **Total Inquiries** - Total per day
- **Status Breakdown** - New, Contacted, Resolved, Cancelled

**Use this to:**
- Track business growth
- Identify busy periods
- Measure response effectiveness

---

## 🔄 Automatic Tracking:

### What Gets Tracked Automatically:

**Product Views:**
- Tracked when customers view product detail pages
- Includes product ID, name, and session
- No personal customer data stored

**Search Queries:**
- Tracked when customers use search
- Includes search term and results count
- Helps understand customer intent

---

## 💡 Best Practices:

### For Business Growth:
1. **Check Daily**: Review analytics every morning
2. **Promote Popular Products**: Feature top-viewed items
3. **Follow Search Trends**: Add products customers search for
4. **Track Seasonal Patterns**: Note festival and wedding season trends

### For Marketing:
1. **Showcase Top Products**: Use popular products in ads
2. **Create Content**: Write blog posts about trending jewelry
3. **Plan Inventory**: Stock up on high-demand items
4. **Targeted Promotions**: Focus on products with high views but low inquiries

---

## 📈 Sample Use Cases:

**Scenario 1: High Views, Low Inquiries**
- Product: "22K Gold Necklace" - 150 views, 5 inquiries
- **Action**: Add better images, improve description, highlight unique features

**Scenario 2: Popular Search with No Results**
- Search: "temple jewelry" - 20 searches, 0 results
- **Action**: Add temple jewelry products to your catalog

**Scenario 3: Inquiry Spike**
- Date: Akshaya Tritiya - 45 inquiries
- **Action**: Prepare extra staff, stock popular gold items for next year

---

## 🎯 Admin Features:

**Dashboard Metrics**:
- Visual cards with key numbers
- Color-coded for easy reading
- Trend indicators (up/down arrows)

**Time Range Filters**:
- 7-day, 30-day, 90-day views
- Helps spot weekly vs monthly trends

**Data Tables**:
- Sortable columns
- Clean, organized presentation
- Export-ready format

---

## 🔒 Privacy & Security:

- Only **admin email** (lbagade6@gmail.com) can view analytics
- No personal customer data is collected
- Session IDs are anonymous
- GDPR-friendly tracking
- Data stored securely in Supabase

---

## 📋 What Gets Measured:

✅ Product page views (anonymous)
✅ Search queries and results
✅ Inquiry counts and status
✅ Popular products ranking
✅ Daily trends

❌ NOT tracked:
- Customer names (unless they submit inquiry)
- IP addresses
- Browsing history
- Personal information

---

## 💻 Admin Access:

**Analytics Dashboard**: `/admin/analytics`

Features:
- Real-time metrics
- Time range selection
- Popular products list
- Recent searches
- Inquiry trends table
- Visual charts and graphs

---

## 📊 Sample Data Included:

The setup automatically creates sample analytics:
- 4 product views
- 3 search queries
- Linked to sample products

You can:
- View it in admin panel
- Understand the layout
- Delete sample data when ready

---

**Start making data-driven business decisions today! 📈**
