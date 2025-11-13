# Questionnaire Implementation - COMPLETE ✅

## Overview

Successfully implemented a **feature-focused questionnaire** that:
- Shows after user signs up and redirects to My Calculations
- Appears after 3 seconds (non-intrusive)
- Saves responses to database via API
- Uses localStorage to prevent showing again
- Collects actionable feature feedback

---

## 🎯 User Flow

```
1. User fills out calculator
2. Clicks "Save"
3. Signup dialog appears (if not logged in)
4. User signs up
5. Redirects to /tools/my-calculations
6. ⏱️ After 3 seconds...
7. 🎯 Questionnaire appears
8. User answers or skips
9. Responses saved to database
10. localStorage marks as answered
11. Won't show again for this user
```

---

## 📁 Files Created

### 1. API Endpoint
**File:** `app/api/user/questionnaire/route.ts`

**Functionality:**
- POST endpoint to save questionnaire responses
- Requires authentication token
- Validates required fields (lookingFor, helpWith)
- Updates user record in MongoDB

**Request:**
```typescript
POST /api/user/questionnaire
Authorization: Bearer {token}
Content-Type: application/json

{
  lookingFor: string
  helpWith: string
  interestedFeatures: string[]
}
```

**Response:**
```typescript
{
  success: boolean
  message?: string
  error?: string
}
```

---

## 📝 Files Modified

### 1. User Model
**File:** `lib/db/models/User.ts`

**Added Fields:**
```typescript
questionnaire_looking_for?: string
questionnaire_help_with?: string
questionnaire_interested_features?: string[]
questionnaire_answered_at?: Date
```

**Schema:**
```typescript
questionnaire_looking_for: { type: String, required: false }
questionnaire_help_with: { type: String, required: false }
questionnaire_interested_features: { type: [String], required: false, default: [] }
questionnaire_answered_at: { type: Date, required: false }
```

### 2. WelcomeQuestionnaire Component
**File:** `components/calculators/WelcomeQuestionnaire.tsx`

**Updated handleSubmit:**
```typescript
const handleSubmit = async () => {
  // Get auth token from localStorage
  const token = localStorage.getItem('auth_token')
  
  // Call API to save questionnaire
  const response = await fetch('/api/user/questionnaire', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  
  // Handle response and show toast
}
```

### 3. My Calculations Page
**File:** `app/tools/my-calculations/page.tsx`

**Added:**
- Import WelcomeQuestionnaire component
- State: `showQuestionnaire`
- useEffect to show questionnaire after 3 seconds
- localStorage check to prevent showing again
- Questionnaire component at end of page

**Logic:**
```typescript
useEffect(() => {
  loadAllCalculations()
  
  // Show questionnaire after 3 seconds if user hasn't answered yet
  const timer = setTimeout(() => {
    const hasAnsweredQuestionnaire = localStorage.getItem('questionnaire_answered')
    if (!hasAnsweredQuestionnaire) {
      setShowQuestionnaire(true)
    }
  }, 3000)
  
  return () => clearTimeout(timer)
}, [])

// When user completes questionnaire
onComplete={() => {
  localStorage.setItem('questionnaire_answered', 'true')
}}
```

---

## 🔄 Complete Data Flow

### Step 1: User Signs Up
```
Calculator → SaveCalculationDialog → SignupFormInline → API /auth/signup
```

### Step 2: Redirect to My Calculations
```
After signup success → router.push('/tools/my-calculations')
```

### Step 3: Page Loads
```
My Calculations page → useEffect runs → setTimeout(3000ms)
```

### Step 4: Questionnaire Appears
```
After 3 seconds:
- Check localStorage.getItem('questionnaire_answered')
- If not set → setShowQuestionnaire(true)
- Dialog appears with questions
```

### Step 5: User Answers
```
User fills form → Clicks "Submit" → handleSubmit() runs
```

### Step 6: Save to Database
```
handleSubmit() → fetch('/api/user/questionnaire', POST)
→ API validates token → updateUser() in MongoDB
→ questionnaire_answered_at = new Date()
→ Response success
```

### Step 7: Mark as Answered
```
onComplete callback → localStorage.setItem('questionnaire_answered', 'true')
→ Dialog closes
→ Won't show again for this user
```

---

## 🛡️ Security & Validation

### Authentication
- ✅ Requires valid JWT token
- ✅ Token extracted from Authorization header
- ✅ Token verified before processing
- ✅ User ID extracted from token payload

### Validation
- ✅ Required fields checked (lookingFor, helpWith)
- ✅ Returns 400 if missing required fields
- ✅ Returns 401 if not authenticated
- ✅ Returns 500 with generic error on server issues

### Data Storage
- ✅ Stored in MongoDB User document
- ✅ Timestamp recorded (questionnaire_answered_at)
- ✅ Array of feature IDs stored
- ✅ No sensitive data exposed

---

## 📊 Questions Collected

### Question 1: "What brought you to BakeProfit today?"
- **Type:** Free text
- **Field:** `questionnaire_looking_for`
- **Example:** "I need help pricing my cakes, tracking orders..."

### Question 2: "What would help your bakery business the most right now?"
- **Type:** Free text
- **Field:** `questionnaire_help_with`
- **Example:** "Better pricing strategy, reducing waste, saving time..."

### Question 3: "Which features interest you most?"
- **Type:** Multi-select checkboxes
- **Field:** `questionnaire_interested_features` (array)
- **Options:**
  - recipe-costing
  - inventory
  - order-tracking
  - customer-management
  - profit-analysis
  - invoicing
  - production-planning
  - ingredient-sourcing

---

## 🎨 UX Details

### Timing
- **Delay:** 3 seconds after page load
- **Reason:** Non-intrusive, lets user see their calculations first
- **Customizable:** Change `setTimeout(3000)` to adjust

### Appearance
- **Type:** Modal dialog
- **Dismissible:** Yes (skip button)
- **Closeable:** Yes (X button)
- **Overlay:** Yes (blocks interaction with page)

### Behavior
- **Shows Once:** Per user (tracked via localStorage)
- **Skip Option:** "Skip for now" button
- **Submit:** "Submit" button with loading state
- **Feedback:** Toast notification on success/error

---

## 💾 localStorage Keys

### Key: `questionnaire_answered`
- **Value:** `'true'` (string)
- **Set When:** User completes questionnaire
- **Checked:** On My Calculations page load
- **Purpose:** Prevent showing questionnaire multiple times

### Why localStorage?
- ✅ Simple, no API call needed
- ✅ Persists across page refreshes
- ✅ Works offline
- ✅ User-specific (not shared)
- ✅ Can be cleared if user wants to see again

---

## 🔍 Database Schema

### User Model Addition
```typescript
// In MongoDB User document
{
  _id: ObjectId,
  email: string,
  name?: string,
  business_name?: string,
  
  // ... other fields ...
  
  // Questionnaire data
  questionnaire_looking_for?: string,
  questionnaire_help_with?: string,
  questionnaire_interested_features?: [string],
  questionnaire_answered_at?: Date,
  
  created_at: Date,
  updated_at: Date,
}
```

---

## 🧪 Testing Checklist

### Test 1: First Time User
- [ ] Sign up for new account
- [ ] Fill out calculator
- [ ] Click "Save"
- [ ] Complete signup flow
- [ ] Redirects to My Calculations
- [ ] Wait 3 seconds
- [ ] Questionnaire appears
- [ ] Fill out all fields
- [ ] Click "Submit"
- [ ] Toast shows success
- [ ] Dialog closes

### Test 2: Returning User
- [ ] Already signed up
- [ ] Go to /tools/my-calculations
- [ ] Wait 3 seconds
- [ ] Questionnaire does NOT appear
- [ ] localStorage has `questionnaire_answered: 'true'`

### Test 3: Skip Questionnaire
- [ ] Sign up for new account
- [ ] Redirects to My Calculations
- [ ] Questionnaire appears
- [ ] Click "Skip for now"
- [ ] Dialog closes
- [ ] localStorage still empty (not marked as answered)
- [ ] Questionnaire appears again on next visit

### Test 4: Error Handling
- [ ] Disconnect internet
- [ ] Try to submit questionnaire
- [ ] Error toast appears
- [ ] Can retry or skip

### Test 5: Data Verification
- [ ] Submit questionnaire
- [ ] Check MongoDB for user record
- [ ] Verify fields saved correctly
- [ ] Check questionnaire_answered_at timestamp

---

## 🚀 API Testing

### Using cURL
```bash
# Get auth token first (from login/signup)
TOKEN="your_jwt_token_here"

# Test questionnaire endpoint
curl -X POST http://localhost:3000/api/user/questionnaire \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "lookingFor": "I need help pricing my cakes",
    "helpWith": "Better pricing strategy",
    "interestedFeatures": ["recipe-costing", "profit-analysis"]
  }'
```

### Expected Response (Success)
```json
{
  "success": true,
  "message": "Questionnaire saved successfully"
}
```

### Expected Response (Error - No Token)
```json
{
  "success": false,
  "error": "No authentication token provided"
}
```

### Expected Response (Error - Missing Fields)
```json
{
  "success": false,
  "error": "Missing required fields: lookingFor and helpWith"
}
```

---

## 📈 Analytics Opportunities

### Track in Future
- Questionnaire completion rate
- Feature interest distribution
- Common pain points (from helpWith)
- Correlation between features and upgrade rate

### Example Query
```typescript
// Find all users interested in "order-tracking"
db.users.find({
  questionnaire_interested_features: "order-tracking"
})

// Find users who mentioned "inventory" as pain point
db.users.find({
  questionnaire_help_with: { $regex: "inventory", $options: "i" }
})
```

---

## 🔧 Customization

### Change Delay (3 seconds)
**File:** `app/tools/my-calculations/page.tsx`
```typescript
// Change 3000 to desired milliseconds
const timer = setTimeout(() => {
  // ...
}, 3000)  // ← Change this
```

### Add More Questions
**File:** `components/calculators/WelcomeQuestionnaire.tsx`
```typescript
// Add new state
const [newQuestion, setNewQuestion] = useState('')

// Add UI for question
<div className="space-y-2">
  <Label>Your new question?</Label>
  <Textarea value={newQuestion} onChange={...} />
</div>

// Include in data
const data: QuestionnaireData = {
  lookingFor,
  helpWith,
  interestedFeatures,
  newQuestion,  // ← Add here
}
```

### Change Feature Options
**File:** `components/calculators/WelcomeQuestionnaire.tsx`
```typescript
const FEATURE_OPTIONS = [
  { id: 'your-feature', label: 'Your Feature Label' },
  // Add more...
]
```

---

## 🎯 Key Features

✅ **Non-Intrusive**
- Shows after 3 seconds (not immediately)
- Skip button available
- Won't show again

✅ **Feature-Focused**
- Asks what users want, not demographics
- Collects actionable feedback
- Helps prioritize development

✅ **Secure**
- Requires authentication
- Token validation
- No sensitive data exposed

✅ **Persistent**
- Saves to database
- Tracked with timestamp
- Can be queried for analytics

✅ **User-Friendly**
- Clean, simple UI
- Clear questions
- Loading states
- Error handling

---

## 📋 Summary

You now have a complete questionnaire system that:

1. **Captures feature feedback** from every new user
2. **Saves to database** with authentication
3. **Shows at the right time** (after signup, after 3 seconds)
4. **Respects user choice** (skip button, won't show again)
5. **Enables analytics** (query by features, pain points)
6. **Informs roadmap** (build what users actually want)

**Next Steps:**
- Test the complete flow
- Monitor questionnaire responses
- Query database for feature trends
- Prioritize development based on feedback
- Send targeted emails based on feature interests

---

## 📞 Support

### Common Issues

**Q: Questionnaire not showing?**
A: Check localStorage for `questionnaire_answered` key. Clear it to test again.

**Q: API returns 401?**
A: Verify auth token is in localStorage and valid. Check JWT expiry.

**Q: Data not saving?**
A: Check MongoDB connection. Verify user exists in database. Check API logs.

**Q: Show questionnaire again?**
A: Run in browser console: `localStorage.removeItem('questionnaire_answered')`

---

## 🎉 Complete!

The questionnaire system is fully integrated and ready to collect valuable feature feedback from your users! 🚀
