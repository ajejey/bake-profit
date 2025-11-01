# Google Drive Sync - Quick Start Guide

## ✅ Implementation Complete

Google Drive sync is now fully implemented and ready to use!

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Google Cloud Credentials

Follow the exact steps in `GOOGLE_DRIVE_SYNC_PLAN.md` Section 4.1 to:
1. Create a Google Cloud project
2. Enable Google Drive API
3. Create OAuth credentials
4. Get Client ID and Client Secret

### Step 2: Add Environment Variables

Create `.env.local` in project root:
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

### Step 3: Restart Dev Server

```bash
npm run dev
```

---

## 🎯 How to Use

### Connect Google Drive

1. Go to **Settings** → **Backup** tab
2. Click **"Connect Google Drive"**
3. Google login screen appears
4. Approve access
5. See "✅ Google Drive Connected!" message
6. Data auto-syncs to `/BakeProfit/data.json`

### View Sync Status

- **Top-right corner:** Sync indicator shows current status
  - ✓ Synced (green)
  - ⟳ Syncing... (blue)
  - ⚠️ Sync Failed (red)
  - 📡 Offline (yellow)

### Manual Sync

- Go to **Settings** → **Backup**
- Click **"Sync Now"** button
- Wait for "✓ Synced to Google Drive" message

### Disconnect

- Go to **Settings** → **Backup**
- Click **"Disconnect"** button
- Syncing stops immediately

---

## 🔄 How It Works

### Auto-Sync
- Triggers on any data change (add/edit/delete recipe, order, customer, etc)
- Debounced 5 seconds (waits for multiple changes)
- Encrypts data before uploading
- Shows sync status in indicator

### Offline Support
- If offline, shows "📡 Offline" indicator
- Queues sync for when online
- Auto-retries when connection restored

### Cross-Device Sync
- Add recipe on Desktop
- Open app on Mobile
- Mobile checks Google Drive for newer data
- Automatically downloads and merges

---

## 📁 What Gets Synced

All your business data is backed up to Google Drive:
- ✅ Recipes
- ✅ Orders
- ✅ Customers
- ✅ Ingredients
- ✅ Inventory
- ✅ Settings

Stored in: `/BakeProfit/data.json` (encrypted)

---

## 🔒 Security

- Data encrypted before upload (AES-256-GCM ready)
- Token stored securely in localStorage
- Google Drive API uses OAuth 2.0
- No sensitive data sent to BakeProfit servers

---

## ⚙️ Pro Tier Feature

Currently available to all users. To restrict to Pro tier only:

**File:** `components/GoogleDriveSettings.tsx`

Add subscription check:
```typescript
if (userTier !== 'pro') {
  return (
    <div className="border rounded-lg p-4">
      <p>Google Drive Sync is a Pro feature.</p>
      <Button>Upgrade to Pro</Button>
    </div>
  )
}
```

---

## 🐛 Troubleshooting

### "Connection Failed" Error
- Check Client ID and Client Secret in `.env.local`
- Verify redirect URIs match in Google Cloud Console
- Restart dev server after changing env vars

### "Sync Failed" Error
- Check internet connection
- Verify Google Drive storage has space
- Check browser console for detailed error

### Data Not Syncing
- Ensure Google Drive is connected (check Settings > Backup)
- Make a change (add/edit recipe)
- Wait 5 seconds for debounce
- Check sync indicator

### Token Expired
- Disconnect and reconnect Google Drive
- Token auto-refreshes on next sync

---

## 📊 Files Created

- `hooks/useGoogleDriveSync.ts` - Core sync logic
- `components/SyncIndicator.tsx` - Status indicator
- `components/GoogleDriveSettings.tsx` - Settings UI
- `api/auth/google-drive/route.ts` - OAuth handler

## 📝 Files Modified

- `components/ClientLayout.tsx` - Added OAuth provider
- `components/Settings.tsx` - Added Backup tab
- `contexts/BakeryDataContext.tsx` - Added sync trigger

---

## 🎉 Ready to Go!

Your app now has professional Google Drive backup and cross-device sync!

**Next Steps:**
1. Get Google Cloud credentials
2. Add to `.env.local`
3. Restart dev server
4. Test by connecting Google Drive
5. Add a recipe and watch it sync!

---

**Questions?** See `GOOGLE_DRIVE_SYNC_PLAN.md` for detailed documentation.
