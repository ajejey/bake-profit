# Next Steps - Google Drive Sync Ready to Test

## ✅ Implementation Complete

All code is written and integrated. Ready for testing!

---

## 🎯 Immediate Next Steps (Do This Now)

### Step 1: Get Google Cloud Credentials (10 minutes)

Follow these EXACT steps from `GOOGLE_DRIVE_SYNC_PLAN.md`:

1. **Create Google Cloud Project**
   - Go to https://console.cloud.google.com/
   - Click "Select a Project" → "NEW PROJECT"
   - Name: `BakeProfit`
   - Click "CREATE"

2. **Enable Google Drive API**
   - Go to "APIs & Services" → "Library"
   - Search "Google Drive API"
   - Click → "ENABLE"

3. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "CREATE CREDENTIALS" → "OAuth client ID"
   - Configure consent screen (if first time):
     - Choose "External"
     - App name: `BakeProfit`
     - Add scopes:
       - `https://www.googleapis.com/auth/drive.file`
       - `https://www.googleapis.com/auth/userinfo.email`
     - Add your test email as test user
   - Create Web application credentials:
     - Name: `BakeProfit Web Client`
     - Authorized JavaScript origins:
       ```
       http://localhost:3000
       https://yourdomain.com
       ```
     - Authorized redirect URIs:
       ```
       http://localhost:3000/auth/google/callback
       https://yourdomain.com/auth/google/callback
       ```
     - Click "CREATE"

4. **Copy Credentials**
   - Copy **Client ID**
   - Copy **Client Secret**

### Step 2: Add Environment Variables (2 minutes)

Create `.env.local` in project root:
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=paste_your_client_id_here
GOOGLE_CLIENT_SECRET=paste_your_client_secret_here
```

### Step 3: Restart Dev Server (1 minute)

```bash
npm run dev
```

### Step 4: Test Google Drive Sync (5 minutes)

1. Open app at http://localhost:3000
2. Go to **Settings** → **Backup** tab
3. Click **"Connect Google Drive"**
4. Google login screen appears
5. Login with your test account
6. Approve access
7. See "✅ Google Drive Connected!" message
8. Add a recipe
9. Watch sync indicator (top-right)
10. Refresh page
11. Recipe should still be there
12. Go to Google Drive
13. Check `/BakeProfit/data.json` file

---

## 📋 Testing Checklist

### Basic Functionality
- [ ] Connect Google Drive
- [ ] See sync indicator
- [ ] Add recipe → Auto-syncs
- [ ] Refresh page → Data persists
- [ ] Disconnect Google Drive
- [ ] Reconnect Google Drive

### Sync Behavior
- [ ] Add recipe → Sync indicator shows "⟳ Syncing..."
- [ ] Wait 5 seconds → Shows "✓ Synced"
- [ ] Add multiple recipes quickly → Debounce works (only syncs once)
- [ ] Click "Sync Now" → Manual sync works
- [ ] Offline → Shows "📡 Offline"
- [ ] Come online → Auto-syncs

### Cross-Device
- [ ] Add recipe on Desktop
- [ ] Open app on Mobile
- [ ] Mobile shows same recipe
- [ ] Add order on Mobile
- [ ] Refresh Desktop
- [ ] Desktop shows new order

### Error Handling
- [ ] Disconnect internet → Shows offline
- [ ] Reconnect → Auto-syncs
- [ ] Revoke Google Drive access → Shows error
- [ ] Reconnect → Works again

---

## 🚀 After Testing

### If Everything Works ✅
1. Commit code to git
2. Deploy to staging
3. Test with real users
4. Add Pro tier restriction (see below)
5. Deploy to production

### If Something Breaks ❌
1. Check browser console for errors
2. Check `.env.local` has correct credentials
3. Verify Google Cloud project settings
4. Check redirect URIs match exactly
5. Restart dev server
6. Clear browser cache and localStorage

---

## 🔐 Pro Tier Restriction (Optional)

To restrict Google Drive sync to Pro users only:

**File:** `app/bakery-business-tool/components/GoogleDriveSettings.tsx`

Add this at the start of the component:
```typescript
export function GoogleDriveSettings() {
  // Add this check
  const userTier = 'free' // TODO: Get from context/auth
  
  if (userTier !== 'pro') {
    return (
      <div className="border rounded-lg p-4 bg-yellow-50">
        <h3 className="font-semibold mb-2">🔒 Pro Feature</h3>
        <p className="text-sm text-gray-600 mb-4">
          Google Drive auto-sync is available in the Pro plan.
        </p>
        <Button onClick={() => window.location.href = '/pricing'}>
          Upgrade to Pro
        </Button>
      </div>
    )
  }

  // Rest of component...
}
```

---

## 📊 What's Implemented

### Created Files (4)
- `hooks/useGoogleDriveSync.ts` - Core sync logic
- `components/SyncIndicator.tsx` - Status indicator
- `components/GoogleDriveSettings.tsx` - Settings UI
- `api/auth/google-drive/route.ts` - OAuth handler

### Modified Files (3)
- `components/ClientLayout.tsx` - Added OAuth provider
- `components/Settings.tsx` - Added Backup tab
- `contexts/BakeryDataContext.tsx` - Added sync trigger

### Features
✅ OAuth 2.0 authentication  
✅ Auto-sync on data changes  
✅ Manual sync button  
✅ Offline detection  
✅ Sync status indicator  
✅ Google Drive folder creation  
✅ Token management  
✅ Error handling  

---

## 📚 Documentation

- **Quick Start:** `GOOGLE_DRIVE_SYNC_QUICKSTART.md`
- **Detailed Plan:** `GOOGLE_DRIVE_SYNC_PLAN.md`
- **Implementation Summary:** `IMPLEMENTATION_SUMMARY.md`
- **This File:** `NEXT_STEPS.md`

---

## ⏱️ Timeline

| Step | Time | Status |
|------|------|--------|
| Get credentials | 10 min | 👈 START HERE |
| Add env vars | 2 min | |
| Restart server | 1 min | |
| Test sync | 5 min | |
| Fix issues (if any) | 10 min | |
| **Total** | **~30 min** | |

---

## 🎉 You're All Set!

Everything is implemented and ready to test. Just follow the steps above and you'll have a fully functional Google Drive sync feature!

**Questions?** Check the documentation files or review the code comments.

**Ready?** Start with Step 1 above! 🚀
