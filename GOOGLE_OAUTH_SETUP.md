# Google OAuth Implementation Guide

## ✅ Implementation Complete

This document provides detailed instructions for setting up Google OAuth authentication for BakeProfit.

---

## 📋 Table of Contents

1. [Google Cloud Console Setup](#google-cloud-console-setup)
2. [Environment Variables](#environment-variables)
3. [How It Works](#how-it-works)
4. [Testing](#testing)
5. [Troubleshooting](#troubleshooting)

---

## 🔧 Google Cloud Console Setup

### Step 1: Create/Access Google Cloud Project

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project** (or select existing)
   - Click the project dropdown at the top
   - Click "NEW PROJECT"
   - Enter project name: `BakeProfit` (or your preferred name)
   - Click "CREATE"
   - Wait for project creation (~30 seconds)

### Step 2: Enable Google+ API

1. **Navigate to APIs & Services**
   - In the left sidebar, click "APIs & Services" → "Library"
   
2. **Enable Google+ API**
   - Search for "Google+ API"
   - Click on it
   - Click "ENABLE"
   - Wait for it to enable

### Step 3: Configure OAuth Consent Screen

1. **Go to OAuth Consent Screen**
   - Left sidebar: "APIs & Services" → "OAuth consent screen"

2. **Choose User Type**
   - Select **"External"** (for public users)
   - Click "CREATE"

3. **Fill App Information**
   - **App name**: `BakeProfit`
   - **User support email**: Your email address
   - **App logo**: (Optional) Upload your logo
   - **Application home page**: `https://yourdomain.com` (or `http://localhost:3000` for testing)
   - **Application privacy policy link**: `https://yourdomain.com/privacy`
   - **Application terms of service link**: `https://yourdomain.com/terms`
   - **Authorized domains**: 
     - Add: `yourdomain.com` (for production)
     - For local testing, you can skip this
   - **Developer contact information**: Your email
   - Click "SAVE AND CONTINUE"

4. **Scopes**
   - Click "ADD OR REMOVE SCOPES"
   - Select these scopes:
     - ✅ `userinfo.email` - See your primary Google Account email address
     - ✅ `userinfo.profile` - See your personal info
     - ✅ `openid` - Associate you with your personal info on Google
   - Click "UPDATE"
   - Click "SAVE AND CONTINUE"

5. **Test Users** (if app is in testing mode)
   - Click "ADD USERS"
   - Add your email and any test user emails
   - Click "SAVE AND CONTINUE"

6. **Summary**
   - Review everything
   - Click "BACK TO DASHBOARD"

### Step 4: Create OAuth 2.0 Credentials

1. **Go to Credentials**
   - Left sidebar: "APIs & Services" → "Credentials"

2. **Create OAuth Client ID**
   - Click "CREATE CREDENTIALS" → "OAuth client ID"

3. **Configure OAuth Client**
   - **Application type**: Select "Web application"
   - **Name**: `BakeProfit Web Client`
   
4. **Authorized JavaScript origins** (for local + production)
   - Click "ADD URI"
   - Add: `http://localhost:3000` (for local development)
   - Click "ADD URI" again
   - Add: `https://yourdomain.com` (for production)

5. **Authorized redirect URIs**
   - Click "ADD URI"
   - Add: `http://localhost:3000/api/auth/google/callback` (for local)
   - Click "ADD URI"
   - Add: `https://yourdomain.com/api/auth/google/callback` (for production)

6. **Create**
   - Click "CREATE"
   - A popup will show your **Client ID** and **Client Secret**
   - **IMPORTANT**: Copy both and save them securely
   - Click "OK"

---

## 🔐 Environment Variables

Add these environment variables to your `.env` file:

```env
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
```

### For Production:

Update `GOOGLE_REDIRECT_URI` to your production domain:

```env
GOOGLE_REDIRECT_URI=https://yourdomain.com/api/auth/google/callback
```

### Where to Find These Values:

1. **NEXT_PUBLIC_GOOGLE_CLIENT_ID**: 
   - Go to Google Cloud Console → APIs & Services → Credentials
   - Find your OAuth 2.0 Client ID
   - Copy the "Client ID" value

2. **GOOGLE_CLIENT_SECRET**:
   - Same location as above
   - Click on your OAuth 2.0 Client ID
   - Copy the "Client secret" value

3. **GOOGLE_REDIRECT_URI**:
   - This is the callback URL you configured in Step 4.5 above
   - For local: `http://localhost:3000/api/auth/google/callback`
   - For production: `https://yourdomain.com/api/auth/google/callback`

---

## 🔄 How It Works

### User Flow:

1. **User clicks "Sign in with Google" button** on `/login` or `/signup`
2. **Google OAuth popup appears** asking user to select their Google account
3. **User authorizes the app** to access their email and profile
4. **Google returns a credential token** to our app
5. **Our backend verifies the token** with Google's servers
6. **We check if user exists**:
   - **If user exists with Google ID**: Log them in
   - **If user exists with same email**: Link Google account to existing user
   - **If new user**: Create new account with Google details
7. **Generate JWT tokens** (access + refresh)
8. **Redirect user** to `/bakery-business-tool`

### Database Integration:

The User model already has these fields for Google OAuth:
- `google_id`: Unique Google user ID
- `google_refresh_token`: For future Google API access (currently unused)
- `email_verified`: Set to `true` for Google users (Google verifies emails)
- `avatar_url`: User's Google profile picture
- `name`: User's name from Google profile

### Security Features:

- ✅ **Token verification**: All Google tokens are verified server-side
- ✅ **Account linking**: Existing email accounts can be linked to Google
- ✅ **No password required**: Google users don't need a password
- ✅ **Email verification**: Google users are automatically verified
- ✅ **JWT tokens**: Same secure token system as password auth
- ✅ **HttpOnly cookies**: Refresh tokens stored securely

---

## 🧪 Testing

### Local Testing:

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to login page**:
   ```
   http://localhost:3000/login
   ```

3. **Click "Sign in with Google"**

4. **Test scenarios**:
   - ✅ New user signup with Google
   - ✅ Existing Google user login
   - ✅ Linking Google to existing email account
   - ✅ Error handling (cancel OAuth, network errors)

### Production Testing:

1. **Update environment variables** in your production environment
2. **Ensure authorized domains** are configured in Google Cloud Console
3. **Test the same scenarios** as local testing

---

## 🐛 Troubleshooting

### Common Issues:

#### 1. "NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set"

**Solution**: Make sure you've added the environment variable to `.env` and restarted your dev server.

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

#### 2. "redirect_uri_mismatch" error

**Solution**: The redirect URI in your Google Cloud Console must exactly match your callback URL.

- Local: `http://localhost:3000/api/auth/google/callback`
- Production: `https://yourdomain.com/api/auth/google/callback`

#### 3. "This app isn't verified" warning

**Solution**: This is normal during development. You can:
- Click "Advanced" → "Go to BakeProfit (unsafe)" for testing
- Or submit your app for verification (for production)

#### 4. "Invalid token" error

**Solution**: 
- Check that `GOOGLE_CLIENT_SECRET` is correct
- Ensure your server time is synchronized (JWT tokens are time-sensitive)
- Verify that the token hasn't expired

#### 5. Google button not showing

**Solution**:
- Check browser console for errors
- Ensure `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set
- Clear browser cache and reload

---

## 📝 Files Modified/Created

### Created Files:
- `app/api/auth/google/callback/route.ts` - Google OAuth callback handler
- `components/auth/GoogleLoginButton.tsx` - Google login button component
- `GOOGLE_OAUTH_SETUP.md` - This documentation file

### Modified Files:
- `lib/db/users.ts` - Added subscription fields to createUser
- `contexts/AuthContext.tsx` - Added loginWithGoogle method
- `components/auth/LoginForm.tsx` - Added Google login button
- `components/auth/SignupForm.tsx` - Added Google login button

### Dependencies Added:
- `google-auth-library` - For server-side token verification

---

## 🎯 Next Steps

1. ✅ **Set up environment variables** in `.env`
2. ✅ **Configure Google Cloud Console** following steps above
3. ✅ **Test locally** with your Google account
4. ✅ **Deploy to production** and update environment variables
5. ✅ **Submit for Google verification** (optional, for production)

---

## 📚 Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)
- [@react-oauth/google Documentation](https://www.npmjs.com/package/@react-oauth/google)
- [Next.js Authentication Best Practices](https://nextjs.org/docs/authentication)

---

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the Google Cloud Console configuration
3. Check browser console and server logs for errors
4. Verify all environment variables are set correctly

---

**Last Updated**: November 2025
**Version**: 1.0.0
