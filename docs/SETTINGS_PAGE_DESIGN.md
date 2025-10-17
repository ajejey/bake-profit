# Settings Page Design - BakeProfit

## 🎯 Purpose
A comprehensive settings page designed for home bakers to manage their business preferences, account, and subscription.

---

## 📋 Settings Sections

### **1. Account Settings**
**Purpose:** Manage personal and business information

- **Profile Information**
  - Full Name
  - Email Address (with verification status)
  - Phone Number (optional)
  - Profile Picture (optional)

- **Business Information**
  - Business Name
  - Business Type (Home Bakery, Commercial, Hobby, etc.)
  - Business Address (for delivery calculations)
  - Tax ID / Business License (optional)

- **Change Password**
  - Current Password
  - New Password
  - Confirm Password

---

### **2. Subscription & Usage**
**Purpose:** View current plan, usage stats, and upgrade options

- **Current Plan**
  - Plan Name (Free / Pro)
  - Billing Cycle (if Pro)
  - Next Billing Date (if Pro)
  - [Upgrade to Pro] or [Manage Subscription] button

- **Usage Statistics** (This Month)
  - Recipes: X / 5 (or Unlimited)
  - Orders: X / 15 (or Unlimited)
  - Customers: X / 10 (or Unlimited)
  - Inventory Items: X / 20 (or Unlimited)
  - Storage Used: X MB / 512 MB (future)

- **Plan Comparison**
  - Side-by-side Free vs Pro features
  - Clear upgrade CTA

---

### **3. Business Preferences**
**Purpose:** Customize how the app works for their business

- **Currency & Pricing**
  - Default Currency (USD, EUR, INR, etc.)
  - Currency Symbol Position (before/after)
  - Default Markup Percentage (for pricing calculator)
  - Tax Rate (%) - for automatic tax calculations

- **Date & Time**
  - Date Format (MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD)
  - Time Format (12-hour / 24-hour)
  - Timezone
  - Week Start Day (Sunday / Monday)

- **Units of Measurement**
  - Weight System (Metric / Imperial / Both)
  - Volume System (Metric / Imperial / Both)
  - Temperature (Celsius / Fahrenheit)

---

### **4. Order Settings**
**Purpose:** Configure default order behaviors

- **Order Defaults**
  - Default Order Status (New / Pending)
  - Auto-increment Order Numbers (ON/OFF)
  - Order Number Prefix (e.g., "ORD-", "BK-")
  - Default Lead Time (days before delivery)

- **Customer Management**
  - Require Phone Number (Yes/No)
  - Auto-save New Customers (Yes/No)
  - Customer Notes Visible in Orders (Yes/No)

- **Notifications** (Pro Feature)
  - Email notifications for new orders
  - SMS reminders for upcoming deliveries
  - Low stock alerts

---

### **5. Recipe Settings**
**Purpose:** Configure recipe-related preferences

- **Recipe Defaults**
  - Default Servings
  - Default Labor Cost per Hour
  - Default Overhead Percentage
  - Show Cost Breakdown in Recipes (Yes/No)

- **Ingredient Management**
  - Preferred Unit System
  - Show Low Stock Warnings (Yes/No)
  - Auto-deduct Inventory on Order (Yes/No - future)

---

### **6. Data & Privacy**
**Purpose:** Manage data, backups, and privacy settings

- **Data Management**
  - Export All Data (JSON/CSV)
  - Import Data
  - Last Backup Date (Pro feature - Google Drive)
  - [Backup Now] button (Pro)

- **Data Retention**
  - Keep Completed Orders (30/60/90 days / Forever)
  - Archive Old Customers (Yes/No)
  - Clear Cancelled Orders Automatically (Yes/No)

- **Privacy**
  - Make Profile Public (future - for sharing recipes)
  - Allow Analytics (help improve the app)
  - Marketing Emails (Yes/No)

---

### **7. Integrations** (Pro Feature)
**Purpose:** Connect with external services

- **Google Drive Sync**
  - Status: Connected / Not Connected
  - Last Sync: [timestamp]
  - Auto-sync Frequency (Real-time / Hourly / Daily)
  - [Connect] or [Disconnect] button

- **Email Service** (Future)
  - Connect email for order confirmations
  - Email templates

- **Payment Gateways** (Future)
  - Stripe, PayPal integration
  - Accept online payments

---

### **8. Appearance**
**Purpose:** Customize the look and feel

- **Theme**
  - Light Mode
  - Dark Mode
  - Auto (system preference)

- **Display**
  - Compact View / Comfortable View
  - Show Tooltips (Yes/No)
  - Animation Speed (Slow / Normal / Fast / Off)

- **Dashboard**
  - Default View (Dashboard / Orders / Recipes)
  - Show Quick Stats (Yes/No)
  - Widgets to Display (customizable)

---

### **9. Notifications & Alerts**
**Purpose:** Control what notifications user sees

- **In-App Notifications**
  - Order Status Changes
  - Low Stock Alerts
  - Upcoming Deliveries
  - Usage Limit Warnings (80%, 90%, 100%)

- **Email Notifications** (Pro)
  - Daily Summary
  - Weekly Report
  - Monthly Analytics
  - Payment Reminders

- **Push Notifications** (Future - Mobile App)
  - New Orders
  - Delivery Reminders

---

### **10. Help & Support**
**Purpose:** Get help and provide feedback

- **Resources**
  - Getting Started Guide
  - Video Tutorials
  - FAQ
  - Keyboard Shortcuts

- **Support**
  - Contact Support (Pro: Priority)
  - Submit Feedback
  - Report a Bug
  - Feature Requests

- **About**
  - App Version
  - Terms of Service
  - Privacy Policy
  - Changelog / What's New

---

### **11. Danger Zone**
**Purpose:** Destructive actions (at the bottom)

- **Account Actions**
  - Log Out All Devices
  - Delete All Data (with confirmation)
  - Deactivate Account (temporary)
  - Delete Account Permanently (with email confirmation)

---

## 🎨 UI/UX Considerations

### **Layout:**
- **Sidebar Navigation** (left) with icons
- **Main Content Area** (right) with sections
- **Save Button** (sticky at top or bottom)
- **Breadcrumbs** for navigation

### **Sections:**
- Each section is a card with clear heading
- Collapsible sections for advanced settings
- Inline help text for complex options
- Visual indicators for Pro features (crown icon)

### **Responsiveness:**
- Mobile: Tabs instead of sidebar
- Tablet: Collapsible sidebar
- Desktop: Full sidebar + content

### **Feedback:**
- Toast notifications for saved changes
- Loading states for async operations
- Confirmation dialogs for destructive actions

---

## 🔔 Notification Badge Design

### **Top Right Corner:**
```
[Profile Avatar] [🔔 Badge] [Settings Icon]
```

### **Badge Behavior:**
- **No Badge:** Usage < 80% (all good!)
- **Yellow Badge (!):** Any usage 80-89%
- **Orange Badge (!!):** Any usage 90-99%
- **Red Badge (!!!):** Any usage 100%

### **Dropdown Content:**
```
┌─────────────────────────────────┐
│ Usage Summary                   │
├─────────────────────────────────┤
│ ⚠️ Recipes: 4/5 (80%)           │
│ ✅ Orders: 8/15 (53%)           │
│ ✅ Customers: 3/10 (30%)        │
│ ✅ Inventory: 12/20 (60%)       │
├─────────────────────────────────┤
│ [View Details] [Upgrade to Pro] │
└─────────────────────────────────┘
```

---

## 🎯 Home Baker Priorities

### **Most Important:**
1. ✅ Easy pricing/costing (default markup, tax)
2. ✅ Order management defaults
3. ✅ Currency and units (metric/imperial)
4. ✅ Data backup (peace of mind)
5. ✅ Recipe defaults (labor cost, servings)

### **Nice to Have:**
6. ✅ Theme customization
7. ✅ Notifications control
8. ✅ Export data
9. ✅ Integrations (Google Drive)

### **Future:**
10. Payment gateway integration
11. Email templates
12. Mobile app notifications

---

## 📱 Mobile Considerations

- **Simplified Settings:** Only show essential settings on mobile
- **Tabs:** Use tabs instead of sidebar
- **Touch-Friendly:** Larger buttons and inputs
- **Offline:** Cache settings for offline access

---

This settings page gives home bakers full control while keeping the main app clean and focused on their daily work! 🎉
