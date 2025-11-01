# Forgot Password Feature - Setup Guide

## ✅ Implementation Complete

A complete forgot password feature with email notifications has been implemented using Nodemailer and HTML email templates.

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Gmail App Password Setup

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go to **App passwords** (appears after 2FA is enabled)
4. Select **Mail** and **Windows Computer** (or your device)
5. Google will generate a 16-character password
6. Copy this password

### Step 2: Add Environment Variables

Add these to your `.env.local` file:

```env
# Gmail Configuration
NEXT_PUBLIC_GMAIL_EMAIL=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password

# App URL (for reset links)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 3: Restart Dev Server

```bash
npm run dev
```

---

## 📧 Features Implemented

### ✅ Forgot Password Flow
1. User clicks "Forgot password?" on login page
2. Enters email address
3. System sends password reset email
4. Email contains secure reset link (expires in 1 hour)
5. User clicks link and resets password
6. Confirmation email sent

### ✅ Email Templates
- **Reset Password Email** - Beautiful HTML template with reset link
- **Password Reset Confirmation** - Confirmation email after successful reset
- **Plain Text Versions** - Fallback for email clients

### ✅ Security Features
- Reset tokens expire after 1 hour
- Tokens are cryptographically secure (32 bytes)
- Passwords are hashed before storage
- No sensitive data in URLs (only token and email)
- Email doesn't reveal if account exists (prevents user enumeration)

### ✅ User Experience
- Clean, modern UI with emoji branding
- Show/hide password toggle
- Password validation (min 8 characters)
- Confirmation password matching
- Loading states and error messages
- Success confirmation page

---

## 📁 Files Created

### Backend
- `lib/email/transporter.ts` - Nodemailer configuration
- `lib/email/templates.ts` - HTML email templates
- `app/api/auth/forgot-password/route.ts` - Forgot password endpoint
- `app/api/auth/reset-password/route.ts` - Reset password endpoint

### Frontend
- `app/(auth)/forgot-password/page.tsx` - Forgot password page
- `app/(auth)/reset-password/page.tsx` - Reset password page

### Database
- `lib/db/users.ts` - Added 3 new functions:
  - `updateUserResetToken()` - Save reset token
  - `findUserByResetToken()` - Find user by token
  - `clearUserResetToken()` - Clear token after use

### UI Updates
- `components/auth/LoginForm.tsx` - Added "Forgot password?" link

---

## 🔄 How It Works

### Forgot Password Flow
```
1. User → /forgot-password
2. Enters email → POST /api/auth/forgot-password
3. Backend:
   - Finds user by email
   - Generates secure reset token
   - Saves token with 1-hour expiry
   - Sends email with reset link
4. User receives email with link
5. User clicks link → /reset-password?token=...&email=...
```

### Reset Password Flow
```
1. User → /reset-password?token=...&email=...
2. Enters new password → POST /api/auth/reset-password
3. Backend:
   - Validates reset token (not expired)
   - Hashes new password
   - Updates user password
   - Clears reset token
   - Sends confirmation email
4. User redirected to login
5. User logs in with new password
```

---

## 🧪 Testing

### Test Forgot Password
1. Go to http://localhost:3000/login
2. Click "Forgot password?"
3. Enter your email
4. Check your email (or Gmail spam folder)
5. Click the reset link
6. Enter new password
7. Should see success message
8. Go back to login and test with new password

### Test Email Sending
Check browser console and server logs for:
```
Email sent: <messageId>
Password reset email sent to user@example.com
```

### Test Token Expiry
- Reset tokens expire after 1 hour
- Expired tokens show: "Invalid or expired reset token"
- User must request new reset link

---

## 🔒 Security Checklist

✅ Passwords hashed with bcrypt  
✅ Reset tokens are cryptographically secure  
✅ Reset tokens expire after 1 hour  
✅ Email doesn't reveal if user exists  
✅ Reset link includes token + email (no user ID)  
✅ Tokens cleared after use  
✅ HTTPS recommended for production  
✅ Gmail app password (not real password)  

---

## 📊 Email Template Features

### Reset Password Email
- Professional design with BakeProfit branding
- Clear call-to-action button
- Fallback link text
- Security warning about expiry
- Support contact info

### Confirmation Email
- Success checkmark icon
- Clear confirmation message
- Security note about account access

---

## 🚀 Production Deployment

### Before Going Live

1. **Update Email Configuration**
   ```env
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   NEXT_PUBLIC_GMAIL_EMAIL=noreply@yourdomain.com
   GMAIL_APP_PASSWORD=your-app-password
   ```

2. **Use Custom Domain Email** (Optional)
   - Instead of Gmail, use your domain's email service
   - Update transporter configuration in `lib/email/transporter.ts`

3. **Add Email Branding**
   - Update logo in email templates
   - Update company name and links
   - Customize colors to match brand

4. **Monitor Email Delivery**
   - Check spam folder issues
   - Monitor bounce rates
   - Set up email delivery alerts

5. **HTTPS Only**
   - Ensure app runs on HTTPS
   - Reset links should be HTTPS

---

## 🐛 Troubleshooting

### Email Not Sending
- Check Gmail credentials in `.env.local`
- Verify 2-Step Verification is enabled
- Check app password is correct (16 characters)
- Check Gmail "Less secure app access" settings

### Reset Link Not Working
- Verify `NEXT_PUBLIC_APP_URL` is correct
- Check token hasn't expired (1 hour limit)
- Check email encoding in URL

### Token Expired Error
- User must request new reset link
- Tokens expire after 1 hour for security

### Password Not Updating
- Check password is at least 8 characters
- Check passwords match
- Check user exists in database

---

## 📚 API Documentation

### POST /api/auth/forgot-password
**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "If an account exists with this email, a password reset link has been sent."
}
```

### POST /api/auth/reset-password
**Request:**
```json
{
  "token": "reset-token-from-email",
  "password": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your password has been successfully reset. You can now log in with your new password."
}
```

---

## 🎉 You're All Set!

The forgot password feature is fully implemented and ready to use. Just add your Gmail credentials and you're good to go!

**Next Steps:**
1. Add Gmail app password to `.env.local`
2. Restart dev server
3. Test the forgot password flow
4. Deploy to production

---

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Check server logs for error messages
3. Verify environment variables are set correctly
4. Check Gmail account settings
