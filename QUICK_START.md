# BakeProfit - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### **Step 1: Install Dependencies**

```bash
npm install
```

### **Step 2: Set Up MongoDB**

**Option A: MongoDB Atlas (Recommended - Free)**

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free cluster (M0)
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (for development)
5. Get connection string

**Option B: Local MongoDB**

```bash
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community
# Linux: apt-get install mongodb-org
```

### **Step 3: Create .env.local**

Create `.env.local` in project root:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bakeprofit?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Generate JWT Secret:**
```bash
# PowerShell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

### **Step 4: Start Development Server**

```bash
npm run dev
```

### **Step 5: Test Authentication**

1. Open http://localhost:3000
2. Click "Get Started" or go to `/signup`
3. Create an account
4. You'll be redirected to `/bakery-business-tool`
5. ✅ Authentication is working!

---

## 📁 Project Structure

```
bakery-management-software/
├── app/
│   ├── (auth)/              # Auth pages (login, signup)
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   └── subscription/   # Subscription/limits endpoints
│   ├── bakery-business-tool/  # Main app (protected)
│   └── page.tsx            # Landing page
├── components/
│   ├── auth/               # Auth components
│   └── ui/                 # UI components
├── contexts/
│   ├── AuthContext.tsx     # User state
│   └── SubscriptionContext.tsx  # Tier & limits
├── lib/
│   ├── auth/               # JWT, password utilities
│   ├── db/                 # Database layer
│   │   ├── models/        # Mongoose schemas
│   │   ├── mongodb.ts     # Connection
│   │   ├── users.ts       # User queries
│   │   └── usage.ts       # Usage tracking
│   └── subscription-limits.ts  # Free/Pro limits
├── types/
│   ├── auth.ts            # Auth types
│   └── subscription.ts    # Subscription types
└── docs/                  # Documentation
```

---

## 🔑 Key Features

### **Authentication**
- ✅ Email/password signup/login
- ✅ JWT-based sessions
- ✅ Protected routes
- ✅ Password hashing (bcrypt)
- ⏳ Google OAuth (coming soon)

### **Subscription Tiers**

| Feature | Free | Pro ($6.99/mo) |
|---------|------|----------------|
| Recipes | 5 | ∞ Unlimited |
| Orders/month | 15 | ∞ Unlimited |
| Customers | 10 | ∞ Unlimited |
| Inventory | 20 | ∞ Unlimited |
| Google Drive Sync | ❌ | ✅ |
| Email Notifications | ❌ | ✅ |

---

## 🛠️ Development

### **Run Development Server**
```bash
npm run dev
```

### **Build for Production**
```bash
npm run build
npm start
```

### **Lint Code**
```bash
npm run lint
```

---

## 📝 Environment Variables

```env
# Required
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key-min-32-chars
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional (for later)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
STRIPE_SECRET_KEY=sk_test_...
RESEND_API_KEY=re_...
```

---

## 🐛 Troubleshooting

### **MongoDB Connection Error**
- Check `MONGODB_URI` in `.env.local`
- Verify IP is whitelisted in MongoDB Atlas
- Ensure username/password are correct

### **"Invalid token" Error**
- Clear browser localStorage
- Log in again
- Check `JWT_SECRET` is set

### **Can't Access Protected Routes**
- Make sure you're logged in
- Check browser console for errors
- Verify token in localStorage

---

## 📚 Documentation

- **MongoDB Setup:** `docs/MONGODB_SETUP.md`
- **Auth Guide:** `docs/AUTH_SETUP_GUIDE.md`
- **Migration Summary:** `docs/MONGODB_MIGRATION_SUMMARY.md`
- **Implementation Status:** `docs/IMPLEMENTATION_STATUS.md`

---

## 🎯 Next Steps

1. ✅ **Test authentication** (signup/login)
2. ⏳ **Integrate limits** into components
3. ⏳ **Add Google OAuth**
4. ⏳ **Integrate Stripe** payments
5. ⏳ **Add Google Drive** sync
6. ⏳ **Deploy to production**

---

## 🚀 Deployment

### **Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### **Environment Variables in Vercel**

Add these in Vercel Dashboard → Settings → Environment Variables:
- `MONGODB_URI`
- `JWT_SECRET`
- `NEXT_PUBLIC_APP_URL`

---

## 💡 Tips

- **MongoDB Atlas:** Use free M0 tier for development
- **JWT Secret:** Generate a strong random string (32+ chars)
- **IP Whitelist:** Use `0.0.0.0/0` for dev, specific IPs for production
- **Testing:** Create multiple test accounts to verify limits

---

## 🆘 Need Help?

- Check `docs/` folder for detailed guides
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Next.js Docs: https://nextjs.org/docs
- Mongoose Docs: https://mongoosejs.com/docs/

---

**Happy Coding!** 🎉
