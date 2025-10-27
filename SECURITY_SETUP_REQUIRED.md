# 🔒 CRITICAL: Supabase Security Setup Required

## ⚠️ Important Security Notice

Your admin system is currently **NOT SECURE** until you complete the following steps in your Supabase dashboard. Without these changes, anyone can modify your products database.

## Required Security Updates

### Step 1: Update Database RLS Policies

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **"Database"** in the left sidebar
4. Click **"Policies"** tab
5. Find the `products` table
6. **DELETE** the existing policy: "Authenticated users can do everything"
7. Click **"New Policy"** and create this policy:

**Policy Name**: `Admin users can modify products`

**Allowed operation**: SELECT **ALL** operations (SELECT, INSERT, UPDATE, DELETE)

**Target roles**: authenticated

**USING expression**:
```sql
auth.email() = 'lbagade6@gmail.com'
```

**WITH CHECK expression** (same as USING):
```sql
auth.email() = 'lbagade6@gmail.com'
```

8. Click **"Save policy"**

9. Verify the public read policy still exists:
   - **Policy Name**: "Public can view products"
   - **Operation**: SELECT
   - **Target roles**: anon
   - **USING**: `true`

### Step 2: Update Storage RLS Policies

1. In Supabase Dashboard, click **"Storage"** in the left sidebar
2. Click on the **"product-images"** bucket
3. Click **"Policies"** tab
4. **DELETE** all existing policies for this bucket
5. Create 4 new policies:

#### Policy 1: Public can view images
- **Name**: `Public can view product images`
- **Allowed operation**: SELECT
- **Target roles**: anon, authenticated
- **Policy definition**:
```sql
bucket_id = 'product-images'
```

#### Policy 2: Admin can upload images
- **Name**: `Admin can upload product images`
- **Allowed operation**: INSERT
- **Target roles**: authenticated
- **Policy definition**:
```sql
bucket_id = 'product-images' AND auth.email() = 'lbagade6@gmail.com'
```

#### Policy 3: Admin can update images
- **Name**: `Admin can update product images`
- **Allowed operation**: UPDATE
- **Target roles**: authenticated
- **Policy definition**:
```sql
bucket_id = 'product-images' AND auth.email() = 'lbagade6@gmail.com'
```

#### Policy 4: Admin can delete images
- **Name**: `Admin can delete product images`
- **Allowed operation**: DELETE
- **Target roles**: authenticated
- **Policy definition**:
```sql
bucket_id = 'product-images' AND auth.email() = 'lbagade6@gmail.com'
```

### Step 3: Verify Security

1. Try logging in to `/admin/login` with your authorized email
2. Verify you can add, edit, and delete products
3. Try logging in with a different email (for testing)
4. Verify that unauthorized emails get proper error messages

## Adding More Admins

To add additional authorized admin emails:

1. Update the RLS policies in Supabase to include multiple emails:

```sql
auth.email() IN ('lbagade6@gmail.com', 'another-admin@example.com')
```

2. Update the client-side code in two files:
   - `src/pages/admin/AdminLogin.tsx` (line 34)
   - `src/components/ProtectedRoute.tsx` (line 5)

Add the new email to the `AUTHORIZED_EMAILS` array:
```typescript
const AUTHORIZED_EMAILS = ['lbagade6@gmail.com', 'another-admin@example.com'];
```

## Why This Matters

Without these server-side policies:
- ❌ Anyone can sign up and access your admin dashboard
- ❌ Unauthorized users can modify your product catalog
- ❌ Product images can be uploaded/deleted by anyone

With these policies:
- ✅ Only lbagade6@gmail.com can modify products
- ✅ Only authorized emails can upload/delete images
- ✅ Public visitors can still view products normally

## Testing Security

After updating policies, test by:
1. ✅ Logging in with `lbagade6@gmail.com` - should work
2. ✅ Adding/editing products - should work
3. ❌ Trying to sign up with random email - should fail or have no admin access
4. ✅ Public website - should still show products normally

---

**🚨 DO NOT SKIP THIS STEP! Your jewelry inventory management depends on proper security.**
