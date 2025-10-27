# 📞 Customer Inquiry Tracking - Setup Guide

## ✅ What's Built:
1. **Admin Inquiry Manager** - View and manage all customer inquiries in one place
2. **Status Tracking** - Track inquiry status (New, Contacted, Resolved, Cancelled)
3. **Admin Notes** - Add private notes to each inquiry for your reference
4. **Auto-Tracking** - Automatically log WhatsApp and phone clicks
5. **Multi-Channel** - Track inquiries from WhatsApp, phone, forms, and other sources

---

## 🚀 Quick Setup (5 Minutes):

### Step 1: Create Database Table

1. Go to your **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the **entire content** from `INQUIRIES_DATABASE_SETUP.sql` file
6. Paste it into the SQL Editor
7. Click **Run** button

✅ You'll see: "Customer inquiries table created successfully!"
✅ A sample inquiry will be created automatically

---

## 📊 How to Use:

### Viewing Inquiries:

1. **Go to Admin**: `/admin/inquiries`
2. **Filter by Status**:
   - **New** - Fresh inquiries that need your attention
   - **Contacted** - Inquiries you've already reached out to
   - **Resolved** - Successfully completed inquiries
   - **Cancelled** - Inquiries that won't proceed
3. **View Details**: Each inquiry shows:
   - Customer name and contact info
   - Inquiry type (WhatsApp, Phone, Form)
   - Product of interest (if any)
   - Message/inquiry details
   - Timestamp

### Managing Inquiries:

**Update Status**:
- Use dropdown to change status (New → Contacted → Resolved)

**Add Admin Notes**:
- Click "Add Note" to record your follow-up actions
- Example: "Called customer, shared pricing, will visit showroom on Saturday"

**Contact Customer**:
- Click "Call" to directly call from admin panel
- Click "Email" to send email (if provided)

**Delete Inquiry**:
- Use delete button for spam or test inquiries

---

## 📝 Inquiry Types:

### 💬 WhatsApp Clicks
- Automatically tracked when customer clicks WhatsApp button
- Shows which product they were interested in

### 📞 Phone Calls  
- Automatically tracked when customer clicks phone button

### 📝 Form Submissions
- Manual inquiries submitted through website forms

### 📩 Other
- Any other type of inquiry or lead

---

## 💡 Best Practices:

### For Daily Management:
1. **Morning Routine**: Check all "New" inquiries first thing
2. **Quick Response**: Contact new inquiries within 24 hours
3. **Update Status**: Change to "Contacted" after first response
4. **Add Notes**: Record all conversations and next steps
5. **Mark Resolved**: Close successful inquiries

### For Better Tracking:
1. **Use Admin Notes**: Document all customer interactions
2. **Track Products**: Note which products customers are interested in
3. **Set Reminders**: Add follow-up dates in notes
4. **Clean Up**: Delete spam/test inquiries regularly

---

## 📈 Sample Workflow:

**Day 1:**
- New inquiry comes in for "22K Gold Necklace"
- Status: **New**
- You call customer and share pricing
- Update status to: **Contacted**
- Add note: "Shared pricing ₹1,25,000. Customer will visit showroom Saturday 2PM"

**Day 3 (Saturday):**
- Customer visits showroom and purchases
- Update status to: **Resolved**
- Add note: "Customer purchased. Bill #12345. Very happy with service!"

---

## 🎯 Admin Features:

**Filter & Search**:
- View all inquiries or filter by status
- See count of inquiries in each status
- Sort by date (newest first)

**Quick Actions**:
- Call directly from dashboard
- Email customers
- Update status with one click
- Add/edit notes easily

**Organized View**:
- Color-coded status badges
- Icon indicators for inquiry type
- Product interest highlighted
- Timestamp for each inquiry

---

## 🔒 Security:

- Only **admin email** (lbagade6@gmail.com) can view inquiries
- Customers can submit inquiries but cannot view others
- Admin notes are private and not visible to customers
- All contact information is secure

---

## 📊 Benefits:

✅ Never miss a customer inquiry
✅ Track all interactions in one place  
✅ Know which products customers want
✅ Measure response times
✅ Build customer database
✅ Improve follow-up process

---

## 💻 Admin Access:

**Inquiries Manager**: `/admin/inquiries`

Features:
- View all customer inquiries
- Filter by status (New/Contacted/Resolved/Cancelled)
- Add private admin notes
- Update inquiry status
- Call/Email customers directly
- Delete inquiries

---

## 📋 Sample Inquiry Included:

The setup automatically creates a sample inquiry:
**From Priya Sharma** - Interested in 22K Gold Necklace

You can:
- View it in admin panel
- Practice updating status
- Add test notes
- Delete it when ready

---

**Start tracking your customer inquiries professionally today! 🎉**
