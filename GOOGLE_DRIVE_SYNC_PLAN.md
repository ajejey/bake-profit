# Google Drive Sync Implementation Plan

**Priority:** P0 (Pro Feature)  
**Timeline:** 1-2 weeks  
**Key Differentiator:** Cross-device sync + automatic backup

---

## 1. What Gets Synced

**All IndexedDB Data:**
- Recipes, Orders, Customers, Ingredients, Inventory, Categories
- Settings (business, order, recipe)

**Stored in Google Drive:**
- `/BakeProfit/data.json` (encrypted backup)
- `/BakeProfit/metadata.json` (sync timestamps)

---

## 2. UX Flow

### **Initial Setup**
1. User sees "Enable Google Drive Backup" prompt on dashboard
2. Clicks "Connect Google Drive"
3. Google OAuth login screen appears
4. User approves access to Drive
5. App creates `/BakeProfit` folder
6. First sync happens automatically
7. Success message: "✅ Google Drive Connected!"

### **Ongoing Usage**
- **Sync Indicator** (top right): Shows "✓ Synced", "⟳ Syncing...", "⚠️ Sync Failed"
- **Auto-sync:** On any data change (debounced 5 seconds)
- **Manual sync:** Settings > "Sync Now" button
- **Toast notification:** "✓ Synced to Google Drive" (2 sec display)

### **Settings Page**
```
Status: ✅ Connected
Email: user@gmail.com
Last sync: 2 minutes ago
Storage used: 2.3 MB

☑ Auto-sync on changes
☑ Daily backup reminder
☑ Sync on app startup

[Manual Sync Now] [View in Drive] [Disconnect]
```

### **Conflict Resolution**
- Compare timestamps on app load
- If Drive is newer: Show dialog "Use Drive Data or Keep Local?"
- If local is newer: Upload to Drive automatically
- Never delete data: Merge by ID if conflicts

---

## 3. Google Cloud Setup (Exact Steps)

### **Step 1: Create Project**
1. Go to https://console.cloud.google.com/
2. Click "Select a Project" → "NEW PROJECT"
3. Name: `BakeProfit`
4. Click "CREATE"

### **Step 2: Enable Google Drive API**
1. Go to "APIs & Services" → "Library"
2. Search "Google Drive API"
3. Click → "ENABLE"

### **Step 3: Create OAuth Credentials**
1. Go to "APIs & Services" → "Credentials"
2. Click "CREATE CREDENTIALS" → "OAuth client ID"
3. If prompted, configure consent screen:
   - Choose "External"
   - App name: `BakeProfit`
   - Add scopes:
     - `https://www.googleapis.com/auth/drive.file`
     - `https://www.googleapis.com/auth/userinfo.email`
   - Add test user (your email)

4. Create OAuth client ID:
   - Type: "Web application"
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

5. **Copy these values:**
   - Client ID
   - Client Secret

### **Step 4: Add to Environment**
Create `.env.local`:
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET
```

---

## 4. Implementation Checklist

### **Frontend**
- [ ] Install `@react-oauth/google`
- [ ] Add GoogleOAuthProvider to layout
- [ ] Create `useGoogleDriveSync` hook
- [ ] Create SyncIndicator component
- [ ] Create GoogleDriveSettings component
- [ ] Add sync on data changes (call debouncedSync)
- [ ] Handle offline/online events
- [ ] Implement conflict resolution UI

### **Backend (Optional)**
- [ ] Create `/api/auth/google-drive` endpoint
- [ ] Exchange auth code for access token
- [ ] Store refresh token (encrypted)
- [ ] Implement token refresh logic

### **Security**
- [ ] Implement AES-256-GCM encryption
- [ ] Encrypt before uploading to Drive
- [ ] Decrypt on download
- [ ] Never store encryption key in localStorage

### **Testing**
- [ ] Test initial connection
- [ ] Test auto-sync on changes
- [ ] Test manual sync
- [ ] Test offline behavior
- [ ] Test conflict resolution
- [ ] Test cross-device sync
- [ ] Test error handling

---

## 5. Sync Behavior

| Scenario | Behavior |
|----------|----------|
| User adds recipe | Debounce 5s, then upload encrypted data |
| User offline | Queue sync, retry when online |
| App startup | Check Drive for newer data, merge if needed |
| Token expires | Show "Reconnect" prompt |
| API rate limit | Exponential backoff (5s, 10s, 30s, 60s) |
| Storage full | Show "Google Drive full" message |

---

## 6. File Structure in Google Drive

```
/BakeProfit/
├── data.json              (Main encrypted backup)
├── metadata.json          (Last sync: 2025-01-15T10:30:00Z)
├── recipes-backup.json    (For recovery)
├── orders-backup.json     (For recovery)
└── sync-log.json          (Sync history)
```

---

## 7. Key Implementation Details

### **Sync Trigger Points**
- Add/edit/delete recipe → debouncedSync()
- Add/edit/delete order → debouncedSync()
- Add/edit/delete customer → debouncedSync()
- App load → checkForNewerData()
- Manual "Sync Now" → syncToGoogleDrive()
- Network comes online → syncToGoogleDrive()

### **Debounce Logic**
```
User makes change
  ↓
Clear existing timeout
  ↓
Set 5-second timeout
  ↓
If another change within 5s, restart timeout
  ↓
After 5s with no changes, upload to Drive
```

### **Encryption (Client-Side)**
```
1. Get all data from IndexedDB
2. JSON stringify
3. Derive key from user password (PBKDF2)
4. Encrypt with AES-256-GCM
5. Upload encrypted blob to Google Drive
```

### **Decryption (On Load)**
```
1. Download encrypted blob from Google Drive
2. Derive key from user password
3. Decrypt with AES-256-GCM
4. Parse JSON
5. Merge with local data (timestamp comparison)
6. Update IndexedDB
```

---

## 8. Pro Features (Differentiation)

✅ **Free Tier:** No Google Drive sync (local only)  
✅ **Pro Tier:** Unlimited Google Drive sync + auto-backup

**Enforcement:**
```typescript
if (userTier === 'free') {
  // Disable sync button
  // Show "Upgrade to Pro" message
}
```

---

## 9. Error Messages & Recovery

| Error | Message | Action |
|-------|---------|--------|
| No internet | "📡 Offline - Will sync when online" | Auto-retry |
| Token expired | "🔄 Please reconnect Google Drive" | Show login button |
| Storage full | "⚠️ Google Drive storage full" | Show cleanup link |
| Sync failed | "⚠️ Sync failed - Retrying..." | Auto-retry with backoff |
| Conflict | "📥 Newer data found on Drive" | Show merge dialog |

---

## 10. Testing Checklist

- [ ] Connect Google Drive (first time)
- [ ] Add recipe → See sync indicator
- [ ] Refresh page → Data persists
- [ ] Open on different device → See same data
- [ ] Go offline → See offline indicator
- [ ] Come online → Auto-sync
- [ ] Disconnect Google Drive → No more syncing
- [ ] Reconnect → Re-sync all data
- [ ] Delete recipe on Device A → Syncs to Drive
- [ ] Open Device B → Sees deleted recipe gone
- [ ] Edit same recipe on both devices → Conflict resolution works

---

## 11. Performance Targets

- Sync latency: <2 seconds
- Upload size: <5MB
- API calls: <1 per 5 seconds
- Battery impact: Minimal
- Network usage: <1MB per sync

---

## 12. Next Steps

1. **This week:** Set up Google Cloud project + get credentials
2. **Next week:** Implement useGoogleDriveSync hook
3. **Week 3:** Add UI components (indicator, settings)
4. **Week 4:** Test cross-device sync + error handling
5. **Week 5:** Launch to Pro users

---

**Status:** Ready for implementation  
**Complexity:** High (OAuth, API, encryption, conflict resolution)  
**Value:** Critical differentiator for Pro tier
