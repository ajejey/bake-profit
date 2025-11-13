# Lead Magnet Strategy Update - Signup Required to Save

## Strategy Change

### Previous Implementation (Completed)
- ✅ Local storage (IndexedDB) without signup
- ✅ Users could save immediately
- ✅ My Calculations page created
- ✅ Upgrade CTAs in place

### New Strategy (Your Vision)
- 🎯 **Require signup to save calculations**
- 🎯 **Use calculations as lead magnet**
- 🎯 **Optional onboarding questionnaire**
- 🎯 **Email marketing opportunity**
- 🎯 **Better lead qualification**

## Why This is Better

### Lead Generation
- **Captures email** before providing value
- **Qualifies leads** through questionnaire
- **Segments users** by bakery type, experience, products
- **Enables email marketing** for conversion

### User Journey
```
1. User fills out calculator
2. Clicks "Save Recipe"
3. Signup modal appears
4. User signs up (or logs in)
5. Optional questionnaire (3 steps, 30 seconds)
6. Calculation saved to cloud
7. Redirected to My Calculations
8. Email marketing begins
```

## Implementation Plan

### Phase 1: Update Calculators (Recipe & Cake)
- [x] Create SignupPromptDialog component
- [x] Create OnboardingQuestionnaire component
- [ ] Update Recipe Cost Calculator to show signup modal on save
- [ ] Update Cake Pricing Calculator to show signup modal on save
- [ ] Remove local IndexedDB save (or keep as backup)
- [ ] Show questionnaire after first signup

### Phase 2: Backend Integration
- [ ] Create API endpoint to save onboarding data
- [ ] Store questionnaire responses in database
- [ ] Tag users by bakery type, experience, products
- [ ] Set up email sequences based on segments

### Phase 3: Email Marketing
- [ ] Welcome email sequence
- [ ] Segment-specific tips (home bakers vs commercial)
- [ ] Product-specific content (cake pricing tips for cake decorators)
- [ ] Upgrade prompts based on usage
- [ ] Re-engagement for inactive users

## Components Created

### 1. SignupPromptDialog
**File:** `components/calculators/SignupPromptDialog.tsx`

**Features:**
- Toggle between Signup and Login
- Shows benefits of signing up
- Saves calculation after successful auth
- Redirects to My Calculations
- Clean, conversion-optimized UI

**Props:**
```typescript
{
  open: boolean
  onOpenChange: (open: boolean) => void
  calculatorType: string  // "Recipe", "Cake", etc.
  calculationData?: any   // The data to save
  onSignupSuccess?: () => void  // Callback after signup
}
```

### 2. OnboardingQuestionnaire
**File:** `components/calculators/OnboardingQuestionnaire.tsx`

**Features:**
- 3-step wizard (30 seconds)
- Progress indicator
- Skip option (non-intrusive)
- Collects valuable data

**Questions:**
1. **Step 1: Business Type**
   - Bakery type (home, cottage, commercial, cake decorator)
   - Experience level (just starting, 1-2 years, 3-5 years, 5+ years)

2. **Step 2: Products & Revenue**
   - Primary products (cakes, cookies, bread, etc.)
   - Monthly revenue (optional, ranges)

3. **Step 3: Challenges & Discovery**
   - Biggest challenge (free text)
   - How they heard about us (google, social, friend, blog)

**Data Collected:**
```typescript
{
  bakeryType: string
  experienceLevel: string
  primaryProducts: string[]
  mainChallenges: string
  monthlyRevenue?: string
  howHeardAboutUs?: string
}
```

## User Segmentation

### Segment 1: Home Bakers (Just Starting)
- **Email Focus:** Basics, pricing fundamentals, confidence building
- **Upgrade Trigger:** After 10+ calculations
- **Content:** "How to price your first custom cake"

### Segment 2: Cottage Food Business (1-3 years)
- **Email Focus:** Scaling, efficiency, profit optimization
- **Upgrade Trigger:** After 5+ calculations
- **Content:** "Scale your cottage bakery profitably"

### Segment 3: Small Commercial (3+ years)
- **Email Focus:** Advanced features, inventory, order management
- **Upgrade Trigger:** Immediate (they need full platform)
- **Content:** "Manage your bakery like a pro"

### Segment 4: Cake Decorators
- **Email Focus:** Custom pricing, complexity factors, delivery
- **Upgrade Trigger:** After 5+ cake calculations
- **Content:** "Price custom cakes for maximum profit"

## Email Sequences

### Welcome Sequence (All Users)
1. **Day 0:** Welcome + Quick Start Guide
2. **Day 2:** "Here's how to use [calculator they used]"
3. **Day 5:** Success story from similar baker
4. **Day 7:** Upgrade benefits (soft sell)

### Segment-Specific Sequences
**Home Bakers:**
- Pricing basics
- Building confidence
- First customer tips
- Legal considerations

**Commercial Bakers:**
- Inventory management
- Order tracking
- Customer management
- Analytics and reporting

### Re-engagement (Inactive Users)
- **Week 2:** "Need help with pricing?"
- **Week 4:** "See what other bakers are doing"
- **Month 2:** Special offer or new feature announcement

## Conversion Triggers

### Automatic Upgrade Prompts
1. **After 5 saved calculations:** "Upgrade for unlimited storage"
2. **After 10 calculations:** "Sync across devices with Pro"
3. **After 30 days:** "See your bakery analytics"
4. **Multiple devices detected:** "Access from anywhere with Pro"

### Behavioral Triggers
- User edits same calculation 3+ times → "Track changes with Pro"
- User saves 5+ cakes → "Manage orders with Pro"
- User searches calculations → "Better organization with Pro"

## Metrics to Track

### Lead Quality
- Signup rate from calculators
- Questionnaire completion rate
- Segment distribution
- Time to first save

### Engagement
- Calculations per user
- Return rate (7-day, 30-day)
- Email open rates by segment
- Email click rates

### Conversion
- Free → Pro conversion rate
- Time to conversion
- Conversion by segment
- Conversion by calculator type

### Revenue
- MRR from calculator signups
- LTV by segment
- CAC (if running ads)
- Payback period

## A/B Testing Ideas

### Signup Modal
- **Test A:** Signup required immediately
- **Test B:** Allow 1 free save, then require signup
- **Test C:** Allow 3 free saves, then require signup

### Questionnaire
- **Test A:** Show immediately after signup
- **Test B:** Show after first save
- **Test C:** Show after 3 saves
- **Test D:** Don't show (control)

### CTA Copy
- **Test A:** "Sign Up to Save"
- **Test B:** "Save Your Work Free"
- **Test C:** "Create Free Account"

## Next Steps

### Immediate (This Session)
1. ✅ Add "View My Calculations" button to tools index
2. ✅ Create SignupPromptDialog component
3. ✅ Create OnboardingQuestionnaire component
4. ⏳ Update Recipe Calculator to use signup modal
5. ⏳ Update Cake Calculator to use signup modal
6. ⏳ Test complete flow

### Short-term (This Week)
1. Create API endpoint for onboarding data
2. Update database schema for user segments
3. Test signup → save → redirect flow
4. Implement remaining calculators with same pattern

### Medium-term (Next 2 Weeks)
1. Set up email marketing platform (Mailchimp, SendGrid, etc.)
2. Create email templates for each segment
3. Set up automated sequences
4. Create analytics dashboard for tracking

### Long-term (Next Month)
1. A/B test different signup triggers
2. Optimize email sequences based on data
3. Create segment-specific landing pages
4. Implement behavioral triggers for upgrades

## Success Criteria

### Month 1
- 100+ signups from calculators
- 50%+ questionnaire completion
- 20%+ email open rate
- 5%+ email click rate

### Month 3
- 500+ signups from calculators
- 10%+ free → pro conversion
- 30%+ email open rate
- Clear segment patterns emerging

### Month 6
- 1,000+ signups from calculators
- 15%+ free → pro conversion
- Positive ROI on email marketing
- Predictable conversion funnel

## Conclusion

This strategy transforms free calculators from simple tools into a **complete lead generation and conversion funnel**:

1. **Attract** with free calculators
2. **Capture** email with signup requirement
3. **Qualify** with questionnaire
4. **Nurture** with segment-specific emails
5. **Convert** with targeted upgrade prompts

The key insight: **Don't give away the save feature for free**. Make users commit (with their email) before providing that value. This creates a much stronger lead magnet and enables sophisticated email marketing.
