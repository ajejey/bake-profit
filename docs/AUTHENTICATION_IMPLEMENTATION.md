# Authentication Implementation Guide

**Date:** January 2025  
**Version:** 1.0  
**Status:** Implementation Ready

---

## Overview

We're implementing custom authentication (no NextAuth) with:
- ✅ Email/Password authentication
- ✅ Google OAuth Sign-In
- ✅ Free vs Pro tier management
- ✅ Session management with JWT
- ✅ Protected API routes

---

## 1. Google OAuth Setup Guide

### **Step 1: Create Google Cloud Project**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "BakeProfit"
4. Click "Create"

### **Step 2: Enable Google+ API**

1. In the left sidebar, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and click "Enable"

### **Step 3: Configure OAuth Consent Screen**

1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" (for public users)
3. Click "Create"
4. Fill in required fields:
   - **App name:** BakeProfit
   - **User support email:** your-email@example.com
   - **Developer contact:** your-email@example.com
5. Click "Save and Continue"
6. **Scopes:** Click "Add or Remove Scopes"
   - Select: `userinfo.email`
   - Select: `userinfo.profile`
   - Select: `drive.file` (for Google Drive sync later)
7. Click "Save and Continue"
8. **Test users:** Add your email for testing
9. Click "Save and Continue"

### **Step 4: Create OAuth Credentials**

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Application type: "Web application"
4. Name: "BakeProfit Web Client"
5. **Authorized JavaScript origins:**
   - `http://localhost:3000` (development)
   - `https://yourdomain.com` (production)
6. **Authorized redirect URIs:**
   - `http://localhost:3000/api/auth/google/callback` (development)
   - `https://yourdomain.com/api/auth/google/callback` (production)
7. Click "Create"
8. **Copy the Client ID and Client Secret** (you'll need these)

### **Step 5: Environment Variables**

Add to your `.env.local`:
```env
# Google OAuth
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# Database URL (MongoDB)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bakeprofit

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

---

## 2. Database Schema

### **Database Schema (MongoDB)**

**Users Collection:**

```typescript
{
  _id: ObjectId,
  email: String (unique, indexed),
  password_hash: String (optional - null for Google OAuth users),
  name: String (optional),
  business_name: String (optional),
  avatar_url: String (optional),
  
  // Authentication
  email_verified: Boolean (default: false),
  verification_token: String (optional, indexed),
  reset_token: String (optional, indexed),
  reset_token_expires: Date (optional),
  
  // OAuth
  google_id: String (optional, unique, indexed),
  google_refresh_token: String (optional), // For Google Drive sync
  
  // Subscription
  subscription_tier: String (enum: ['free', 'pro'], default: 'free'),
  subscription_status: String (enum: ['active', 'canceled', 'past_due'], default: 'active'),
  stripe_customer_id: String (optional, indexed),
  stripe_subscription_id: String (optional),
  subscription_ends_at: Date (optional),
  
  // Timestamps
  created_at: Date (auto),
  updated_at: Date (auto),
  last_login_at: Date (optional)
}
```

**Usage Tracking Collection:**

```typescript
{
  _id: ObjectId,
  user_id: String (indexed),
  month: String (format: 'YYYY-MM'),
  recipes_count: Number (default: 0),
  orders_count: Number (default: 0),
  customers_count: Number (default: 0),
  inventory_count: Number (default: 0),
  updated_at: Date (auto)
}

// Compound unique index on (user_id, month)
```

**Indexes:**
- `email` (unique)
- `google_id` (unique, sparse)
- `stripe_customer_id`
- `verification_token`
- `reset_token`
- `user_id + month` (compound, unique) on usage_tracking

---

## 3. Architecture Overview

{{ ... }}
```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Client)                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Components:                                                 │
│  • LoginForm.tsx                                            │
│  • SignupForm.tsx                                           │
│  • GoogleSignInButton.tsx                                   │
│  • ProtectedRoute.tsx                                       │
│  • UserMenu.tsx                                             │
│  • UpgradePrompt.tsx (Free tier limits)                    │
│                                                              │
│  Context:                                                    │
│  • AuthContext.tsx (user state, login/logout)              │
│  • SubscriptionContext.tsx (tier, limits)                  │
│                                                              │
│  Hooks:                                                      │
│  • useAuth() - Get current user                            │
│  • useSubscription() - Check tier, limits                  │
│  • useRequireAuth() - Redirect if not logged in           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                API ROUTES (Next.js /api/*)                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  /api/auth/signup                                           │
│  • POST - Create account (email/password)                  │
│  • Hash password with bcrypt                               │
│  • Create user in database                                 │
│  • Send verification email                                 │
│  • Return JWT token                                        │
│                                                              │
│  /api/auth/login                                            │
│  • POST - Login (email/password)                           │
│  • Verify password                                         │
│  • Return JWT token                                        │
│                                                              │
│  /api/auth/google                                           │
│  • GET - Redirect to Google OAuth                          │
│                                                              │
│  /api/auth/google/callback                                  │
│  • GET - Handle Google OAuth callback                      │
│  • Create or update user                                   │
│  • Return JWT token                                        │
│                                                              │
│  /api/auth/me                                               │
│  • GET - Get current user (requires JWT)                   │
│                                                              │
│  /api/auth/logout                                           │
│  • POST - Logout (clear session)                           │
│                                                              │
│  /api/auth/verify-email                                     │
│  • GET - Verify email with token                           │
│                                                              │
│  /api/auth/forgot-password                                  │
│  • POST - Send password reset email                        │
│                                                              │
│  /api/auth/reset-password                                   │
│  • POST - Reset password with token                        │
│                                                              │
│  /api/subscription/check-limit                              │
│  • POST - Check if user can create recipe/order           │
│  • Return: { allowed: boolean, limit: number, used: number }│
│                                                              │
│  /api/subscription/upgrade                                  │
│  • POST - Create Stripe checkout session                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    MIDDLEWARE                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  • Verify JWT token                                         │
│  • Attach user to request                                   │
│  • Check subscription status                                │
│  • Protect API routes                                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Free vs Pro Tier Configuration

### **4.1 Tier Limits**

```typescript
// lib/subscription-limits.ts

export const SUBSCRIPTION_LIMITS = {
  free: {
    recipes: 5,
    ordersPerMonth: 15,
    customers: 10,
    inventoryItems: 20,
    features: {
      googleDriveSync: false,
      advancedAnalytics: false,
      invoicing: true, // Basic invoicing
      emailNotifications: false,
      smsNotifications: false,
      prioritySupport: false,
      noBranding: false,
    }
  },
  pro: {
    recipes: Infinity,
    ordersPerMonth: Infinity,
    customers: Infinity,
    inventoryItems: Infinity,
    features: {
      googleDriveSync: true,
      advancedAnalytics: true,
      invoicing: true, // Full invoicing
      emailNotifications: true,
      smsNotifications: true,
      prioritySupport: true,
      noBranding: true,
    }
  }
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_LIMITS;
```

### **4.2 Component-Level Checks**

#### **Recipe Calculator Component**

```typescript
// app/bakery-business-tool/components/RecipeCalculator.tsx

import { useSubscription } from '@/contexts/SubscriptionContext';

export default function RecipeCalculator() {
  const { tier, checkLimit, usage } = useSubscription();
  const [recipes, setRecipes] = useState([]);

  const handleAddRecipe = async () => {
    // Check limit before allowing creation
    const canCreate = await checkLimit('recipes');
    
    if (!canCreate.allowed) {
      toast({
        title: "Recipe limit reached",
        description: `You've used ${canCreate.used}/${canCreate.limit} recipes on the free plan. Upgrade to Pro for unlimited recipes.`,
        action: <UpgradeButton />,
        variant: "destructive"
      });
      return;
    }

    // Proceed with recipe creation
    // ... existing code
  };

  return (
    <div>
      {/* Show usage indicator */}
      {tier === 'free' && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            📊 Recipes: {usage.recipes}/5 used
            {usage.recipes >= 4 && (
              <span className="ml-2 text-amber-600 font-semibold">
                Almost at limit! <UpgradeLink />
              </span>
            )}
          </p>
        </div>
      )}
      
      {/* Rest of component */}
    </div>
  );
}
```

#### **Order Tracker Component**

```typescript
// app/bakery-business-tool/components/OrderTracker.tsx

export default function OrderTracker() {
  const { tier, checkLimit, usage } = useSubscription();

  const handleAddOrder = async () => {
    const canCreate = await checkLimit('orders');
    
    if (!canCreate.allowed) {
      toast({
        title: "Monthly order limit reached",
        description: `You've created ${canCreate.used}/${canCreate.limit} orders this month. Upgrade to Pro for unlimited orders.`,
        action: <UpgradeButton />,
        variant: "destructive"
      });
      return;
    }

    // Proceed with order creation
  };

  return (
    <div>
      {tier === 'free' && (
        <UsageBanner 
          used={usage.ordersThisMonth} 
          limit={15} 
          type="orders"
        />
      )}
      {/* Rest of component */}
    </div>
  );
}
```

#### **Dashboard Component**

```typescript
// app/bakery-business-tool/components/Dashboard.tsx

export default function Dashboard() {
  const { tier, usage } = useSubscription();

  return (
    <div>
      {/* Show tier badge */}
      <div className="flex items-center justify-between mb-6">
        <h1>Dashboard</h1>
        <TierBadge tier={tier} />
      </div>

      {/* Free tier upgrade prompt */}
      {tier === 'free' && (
        <Card className="mb-6 border-rose-200 bg-rose-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Sparkles className="h-6 w-6 text-rose-500 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Unlock Pro Features</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get unlimited recipes, orders, and customers. Plus Google Drive auto-sync, 
                  advanced analytics, and priority support.
                </p>
                <div className="flex items-center gap-4">
                  <Button asChild>
                    <Link href="/upgrade">
                      Upgrade to Pro - $6.99/mo
                    </Link>
                  </Button>
                  <span className="text-sm text-gray-500">30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Usage stats for free tier */}
      {tier === 'free' && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          <UsageCard 
            label="Recipes" 
            used={usage.recipes} 
            limit={5} 
            icon={<Calculator />}
          />
          <UsageCard 
            label="Orders (This Month)" 
            used={usage.ordersThisMonth} 
            limit={15} 
            icon={<ShoppingCart />}
          />
          <UsageCard 
            label="Customers" 
            used={usage.customers} 
            limit={10} 
            icon={<Users />}
          />
          <UsageCard 
            label="Inventory Items" 
            used={usage.inventoryItems} 
            limit={20} 
            icon={<Package />}
          />
        </div>
      )}

      {/* Rest of dashboard */}
    </div>
  );
}
```

#### **Google Drive Sync (Pro Only)**

```typescript
// components/GoogleDriveSync.tsx

export default function GoogleDriveSync() {
  const { tier, hasFeature } = useSubscription();

  if (!hasFeature('googleDriveSync')) {
    return (
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <div className="flex items-center gap-3 mb-3">
          <Lock className="h-5 w-5 text-gray-400" />
          <h3 className="font-semibold text-gray-700">Google Drive Sync</h3>
          <Badge variant="secondary">Pro Feature</Badge>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Automatically backup your data to Google Drive. Never lose your recipes, 
          orders, or customer information.
        </p>
        <Button asChild variant="outline">
          <Link href="/upgrade">
            Upgrade to Pro to Enable
          </Link>
        </Button>
      </div>
    );
  }

  // Pro user - show sync controls
  return (
    <div className="p-4 border border-green-200 rounded-lg bg-green-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Cloud className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold">Google Drive Sync</h3>
        </div>
        <SyncStatus />
      </div>
      {/* Sync controls */}
    </div>
  );
}
```

---

## 5. File Structure

```
app/
├── api/
│   ├── auth/
│   │   ├── signup/
│   │   │   └── route.ts
│   │   ├── login/
│   │   │   └── route.ts
│   │   ├── logout/
│   │   │   └── route.ts
│   │   ├── me/
│   │   │   └── route.ts
│   │   ├── google/
│   │   │   ├── route.ts
│   │   │   └── callback/
│   │   │       └── route.ts
│   │   ├── verify-email/
│   │   │   └── route.ts
│   │   ├── forgot-password/
│   │   │   └── route.ts
│   │   └── reset-password/
│   │       └── route.ts
│   └── subscription/
│       ├── check-limit/
│       │   └── route.ts
│       ├── usage/
│       │   └── route.ts
│       └── upgrade/
│           └── route.ts
│
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   ├── verify-email/
│   │   └── page.tsx
│   ├── forgot-password/
│   │   └── page.tsx
│   └── reset-password/
│       └── page.tsx
│
└── bakery-business-tool/
    └── (requires auth)

components/
├── auth/
│   ├── LoginForm.tsx
│   ├── SignupForm.tsx
│   ├── GoogleSignInButton.tsx
│   ├── ProtectedRoute.tsx
│   └── UserMenu.tsx
└── subscription/
    ├── TierBadge.tsx
    ├── UsageBanner.tsx
    ├── UsageCard.tsx
    ├── UpgradeButton.tsx
    └── UpgradePrompt.tsx

contexts/
├── AuthContext.tsx
└── SubscriptionContext.tsx

lib/
├── auth/
│   ├── jwt.ts (JWT utilities)
│   ├── password.ts (bcrypt utilities)
│   └── google-oauth.ts (Google OAuth helpers)
├── db/
│   ├── index.ts (Database connection)
│   ├── users.ts (User queries)
│   └── usage.ts (Usage tracking queries)
├── subscription-limits.ts
└── middleware.ts (Auth middleware)

types/
├── auth.ts
└── subscription.ts
```

---

## 6. Implementation Steps

### **Phase 1: Database Setup (Day 1)**
- [ ] Set up Vercel Postgres
- [ ] Create users table
- [ ] Create sessions table
- [ ] Create usage_tracking table
- [ ] Add indexes

### **Phase 2: Core Auth (Day 2-3)**
- [ ] Create JWT utilities
- [ ] Create password hashing utilities
- [ ] Implement /api/auth/signup
- [ ] Implement /api/auth/login
- [ ] Implement /api/auth/me
- [ ] Implement /api/auth/logout
- [ ] Create AuthContext
- [ ] Create login/signup pages

### **Phase 3: Google OAuth (Day 4)**
- [ ] Set up Google Cloud project
- [ ] Configure OAuth consent screen
- [ ] Create OAuth credentials
- [ ] Implement /api/auth/google
- [ ] Implement /api/auth/google/callback
- [ ] Create GoogleSignInButton component

### **Phase 4: Subscription System (Day 5)**
- [ ] Create subscription limits config
- [ ] Implement /api/subscription/check-limit
- [ ] Implement /api/subscription/usage
- [ ] Create SubscriptionContext
- [ ] Create useSubscription hook

### **Phase 5: UI Integration (Day 6-7)**
- [ ] Add auth checks to all components
- [ ] Create UpgradePrompt components
- [ ] Add usage indicators
- [ ] Create protected routes
- [ ] Add tier badges
- [ ] Test free tier limits

### **Phase 6: Email & Password Reset (Day 8)**
- [ ] Set up email service (Resend)
- [ ] Implement /api/auth/verify-email
- [ ] Implement /api/auth/forgot-password
- [ ] Implement /api/auth/reset-password
- [ ] Create email templates

---

## 7. Security Considerations

### **Password Security**
- ✅ Use bcrypt with salt rounds = 12
- ✅ Never store plain text passwords
- ✅ Enforce minimum password length (8 chars)
- ✅ Optional: Password strength requirements

### **JWT Security**
- ✅ Use strong secret (min 32 chars)
- ✅ Set expiration (7 days for access token)
- ✅ Use httpOnly cookies (not localStorage)
- ✅ Implement refresh tokens for long sessions

### **API Security**
- ✅ Rate limiting on auth endpoints
- ✅ CSRF protection
- ✅ Input validation (Zod)
- ✅ SQL injection prevention (parameterized queries)

### **OAuth Security**
- ✅ Verify state parameter
- ✅ Use PKCE flow (if supported)
- ✅ Validate redirect URIs
- ✅ Store tokens securely

---

## 8. Testing Checklist

### **Authentication Flow**
- [ ] User can sign up with email/password
- [ ] User can log in with email/password
- [ ] User can log in with Google
- [ ] User can log out
- [ ] User stays logged in after page refresh
- [ ] Invalid credentials show error
- [ ] Duplicate email shows error

### **Free Tier Limits**
- [ ] Cannot create 6th recipe (free tier)
- [ ] Cannot create 16th order in a month (free tier)
- [ ] Cannot create 11th customer (free tier)
- [ ] Cannot create 21st inventory item (free tier)
- [ ] Upgrade prompt shows when limit reached
- [ ] Usage indicators show correct counts

### **Pro Tier**
- [ ] Can create unlimited recipes
- [ ] Can create unlimited orders
- [ ] Can create unlimited customers
- [ ] Can create unlimited inventory
- [ ] Google Drive sync is enabled
- [ ] No upgrade prompts shown

---

## 9. Environment Variables Summary

```env
# Database
POSTGRES_URL=postgresql://user:pass@host:5432/dbname

# JWT
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# Email (Resend)
RESEND_API_KEY=re_your_api_key

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Stripe (for later)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 10. Next Steps

Once authentication is implemented:
1. ✅ Users can sign up and log in
2. ✅ Free tier limits are enforced
3. ✅ Pro tier unlocks all features
4. ➡️ **Next:** Implement Stripe payment integration
5. ➡️ **Then:** Implement Google Drive sync
6. ➡️ **Then:** Implement invoicing system

---

**Ready to start implementation!** 🚀

Let's begin with Phase 1: Database setup and core authentication.
