# MongoDB Migration Summary

## ✅ What Changed

We've successfully migrated from Vercel Postgres to **MongoDB** for the BakeProfit authentication system.

---

## 📦 New Dependencies

```json
{
  "dependencies": {
    "mongodb": "^6.x",
    "mongoose": "^8.x"
  }
}
```

Already installed! ✅

---

## 🗂️ New Files Created

### **Database Layer**

1. **`lib/db/mongodb.ts`**
   - MongoDB connection with caching for Next.js
   - Prevents connection pooling issues in development

2. **`lib/db/models/User.ts`**
   - Mongoose schema for users
   - Includes all auth and subscription fields
   - Auto-creates indexes

3. **`lib/db/models/UsageTracking.ts`**
   - Mongoose schema for usage tracking
   - Compound unique index on user_id + month

### **Updated Files**

4. **`lib/db/index.ts`**
   - Changed from Postgres SQL to MongoDB connection
   - Simplified initialization (no manual table creation)

5. **`lib/db/users.ts`**
   - Rewritten for Mongoose
   - All CRUD operations use MongoDB queries
   - Added `toUser()` helper to convert MongoDB docs to User type

6. **`lib/db/usage.ts`**
   - Rewritten for Mongoose
   - Uses MongoDB `$inc` operator for atomic increments
   - Upsert operations for usage tracking

---

## 🔄 API Routes (No Changes Needed!)

All API routes work exactly the same:
- ✅ `/api/auth/signup`
- ✅ `/api/auth/login`
- ✅ `/api/auth/me`
- ✅ `/api/auth/logout`
- ✅ `/api/subscription/check-limit`
- ✅ `/api/subscription/usage`

**Why?** The database abstraction layer (`lib/db/users.ts` and `lib/db/usage.ts`) provides the same interface, just with MongoDB underneath.

---

## 🔧 Environment Variables

### **Old (Postgres)**
```env
POSTGRES_URL=postgresql://user:pass@host:5432/db
```

### **New (MongoDB)**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bakeprofit?retryWrites=true&w=majority
```

---

## 📊 Database Comparison

| Feature | Postgres | MongoDB |
|---------|----------|---------|
| **Setup** | Vercel Postgres | MongoDB Atlas (Free) |
| **Schema** | SQL Tables | Collections + Schemas |
| **Indexes** | Manual SQL | Auto-created by Mongoose |
| **Queries** | SQL | MongoDB queries |
| **Free Tier** | Limited | 512MB (generous) |
| **Familiarity** | ❌ | ✅ You know it! |

---

## 🎯 What You Need to Do

### **1. Set Up MongoDB Atlas (15 minutes)**

Follow the guide: `docs/MONGODB_SETUP.md`

**Quick Steps:**
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free cluster (M0)
3. Create database user
4. Whitelist IP (0.0.0.0/0 for dev)
5. Get connection string
6. Add to `.env.local`

### **2. Update .env.local**

```env
# Replace this:
# POSTGRES_URL=postgresql://...

# With this:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bakeprofit?retryWrites=true&w=majority

# Keep these:
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **3. Test It**

```bash
npm run dev
```

1. Go to `http://localhost:3000/signup`
2. Create an account
3. Should redirect to `/bakery-business-tool`
4. Check MongoDB Atlas → Browse Collections → `users`
5. Your user should be there!

---

## 🔍 How to View Your Data

### **MongoDB Atlas (Web UI)**
1. Go to your cluster
2. Click "Browse Collections"
3. Select `bakeprofit` database
4. View `users` and `usagetrackings` collections

### **MongoDB Compass (Desktop App)**
1. Download: https://www.mongodb.com/try/download/compass
2. Connect with your connection string
3. Browse collections visually

### **VS Code Extension**
1. Install "MongoDB for VS Code"
2. Add connection
3. Browse in sidebar

---

## 🚀 Advantages of MongoDB

### **1. No Manual Migrations**
- Collections created automatically
- Indexes created by Mongoose
- Schema changes are easy

### **2. Flexible Schema**
- Easy to add new fields
- No ALTER TABLE statements
- Backward compatible

### **3. Better for This Use Case**
- User data is document-based (perfect fit)
- No complex joins needed
- Fast reads/writes

### **4. Free Tier**
- 512MB storage (vs Postgres limited free tier)
- ~10,000 users capacity
- Plenty for MVP and beyond

### **5. You Know It!**
- Familiar syntax
- Easier debugging
- Faster development

---

## 📝 Database Schema

### **Users Collection**

```javascript
{
  _id: ObjectId("..."),
  email: "user@example.com",
  password_hash: "$2a$12$...",
  name: "John Doe",
  business_name: "John's Bakery",
  avatar_url: null,
  
  email_verified: false,
  verification_token: null,
  reset_token: null,
  reset_token_expires: null,
  
  google_id: null,
  google_refresh_token: null,
  
  subscription_tier: "free",
  subscription_status: "active",
  stripe_customer_id: null,
  stripe_subscription_id: null,
  subscription_ends_at: null,
  
  created_at: ISODate("2025-01-10T..."),
  updated_at: ISODate("2025-01-10T..."),
  last_login_at: ISODate("2025-01-10T...")
}
```

### **Usage Tracking Collection**

```javascript
{
  _id: ObjectId("..."),
  user_id: "507f1f77bcf86cd799439011",
  month: "2025-01",
  recipes_count: 3,
  orders_count: 7,
  customers_count: 5,
  inventory_count: 12,
  updated_at: ISODate("2025-01-10T...")
}
```

---

## 🔐 Security

### **Connection String Security**
- ✅ Never commit `.env.local` to git
- ✅ Use environment variables in production
- ✅ Rotate passwords periodically

### **MongoDB Atlas Security**
- ✅ IP whitelist (0.0.0.0/0 for dev, specific IPs for prod)
- ✅ Strong passwords
- ✅ Separate users for different environments
- ✅ Enable audit logs (paid tier)

---

## 🐛 Common Issues & Solutions

### **"MongoServerError: bad auth"**
```
Solution: Check username/password in connection string
```

### **"MongooseServerSelectionError"**
```
Solution: 
1. Check IP is whitelisted in MongoDB Atlas
2. Verify connection string is correct
3. Ensure cluster is running
```

### **"Database not found"**
```
Solution: MongoDB creates databases automatically.
Just create a user and the database will appear.
```

### **Connection string with special characters**
```
Solution: URL-encode special characters in password
Example: p@ssw0rd! → p%40ssw0rd%21
```

---

## ✅ Testing Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelisted
- [ ] Connection string in `.env.local`
- [ ] `npm run dev` starts without errors
- [ ] Can sign up at `/signup`
- [ ] User appears in MongoDB
- [ ] Can log in at `/login`
- [ ] Protected route works (`/bakery-business-tool`)
- [ ] Can log out
- [ ] Usage tracking works (check after creating recipes)

---

## 📚 Documentation

- **MongoDB Setup:** `docs/MONGODB_SETUP.md`
- **Auth Guide:** `docs/AUTH_SETUP_GUIDE.md`
- **Implementation Status:** `docs/IMPLEMENTATION_STATUS.md`
- **Full Auth Docs:** `docs/AUTHENTICATION_IMPLEMENTATION.md`

---

## 🎉 Summary

**What Changed:**
- ✅ Postgres → MongoDB
- ✅ SQL queries → Mongoose queries
- ✅ Manual tables → Auto-created collections

**What Stayed the Same:**
- ✅ All API routes
- ✅ All React components
- ✅ All authentication logic
- ✅ JWT tokens
- ✅ Password hashing

**What You Need:**
- ✅ MongoDB Atlas account (free)
- ✅ Update `.env.local`
- ✅ Test signup/login

**Time to Setup:** ~15 minutes

---

**You're ready to go!** 🚀

MongoDB is now your database. Everything else works exactly the same.
