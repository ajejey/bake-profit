# User Data Collection Strategy - Non-Intrusive Insights

## Current Collection

### Signup Form
- ✅ Email (required)
- ✅ Password (required)
- ✅ Name (optional)
- ✅ Business Name (optional)

### Database Fields
- ✅ Email
- ✅ Name
- ✅ Business Name
- ✅ Avatar URL
- ✅ Subscription tier (free/pro)
- ✅ Created/Updated timestamps
- ✅ Last login

---

## 📊 Recommended Additional Data (Low Friction)

### Tier 1: Optional Signup Fields (No Extra Friction)
Add these as **optional fields** on signup form - users can skip them:

#### 1. **Bakery Type** (Single Select)
**Why**: Tailor onboarding, features, and recommendations
- Home baker
- Small bakery business
- Cake decorator
- Cookie business
- Pastry shop
- Other

**Impact**: 
- Personalized dashboard
- Relevant sample data
- Feature recommendations
- Marketing insights

**Friction**: ⭐ (Single select dropdown)

#### 2. **Experience Level** (Single Select)
**Why**: Customize tutorials and feature complexity
- Just starting out
- 1-2 years
- 3-5 years
- 5+ years

**Impact**:
- Onboarding complexity
- Tutorial suggestions
- Feature highlights
- Support content

**Friction**: ⭐ (Single select dropdown)

#### 3. **Primary Products** (Multi-select Checkboxes)
**Why**: Personalize analytics and pricing recommendations
- Cakes
- Cookies
- Bread
- Pastries
- Cupcakes
- Brownies
- Donuts
- Custom orders
- Other

**Impact**:
- Sample recipes
- Pricing templates
- Analytics focus
- Feature recommendations

**Friction**: ⭐⭐ (Multi-select, but optional)

---

### Tier 2: Behavioral Data (Passive Collection - No Friction)
Collect automatically without asking:

#### 1. **Feature Usage Analytics**
```typescript
// Track which features users use most
- dashboard_visits
- recipe_calculator_uses
- order_tracker_uses
- inventory_manager_uses
- pricing_calculator_uses
- analytics_views
- settings_changes
```

**Why**: Understand feature adoption and pain points

#### 2. **Data Patterns**
```typescript
// Automatically tracked
- number_of_recipes_created
- number_of_orders_tracked
- number_of_customers
- average_order_value
- inventory_items_count
- data_export_frequency
```

**Why**: Understand user engagement and business size

#### 3. **Device & Browser Info**
```typescript
// Passive collection
- device_type (mobile/tablet/desktop)
- browser_type
- operating_system
- timezone
- language_preference
```

**Why**: Optimize for user's environment

---

### Tier 3: Optional Onboarding Survey (Post-Signup)
Show **once after signup** with option to skip:

```
"Help us serve you better" (Optional)

1. What's your annual baking revenue?
   - Less than $1,000
   - $1,000 - $5,000
   - $5,000 - $10,000
   - $10,000 - $50,000
   - $50,000+
   - Prefer not to say

2. How many customers do you typically have?
   - Less than 10
   - 10-50
   - 50-100
   - 100-500
   - 500+

3. What's your biggest challenge?
   - Pricing products correctly
   - Managing orders
   - Tracking inventory
   - Calculating costs
   - Growing my business
   - Other

4. How did you hear about us?
   - Google search
   - Social media
   - Friend recommendation
   - Other
```

**Friction**: ⭐⭐ (Optional, dismissible)

---

## 🎯 Implementation Plan

### Phase 1: Signup Enhancement (Low Friction)
**Add to SignupForm.tsx:**

```typescript
const [formData, setFormData] = useState({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  businessName: '',
  // NEW - Optional fields
  bakeryType: '', // optional
  experienceLevel: '', // optional
  primaryProducts: [], // optional
});
```

**Database Changes:**
```typescript
interface IUser {
  // ... existing fields
  
  // New optional fields
  bakery_type?: 'home_baker' | 'small_business' | 'cake_decorator' | 'cookie_business' | 'pastry_shop' | 'other';
  experience_level?: 'starting_out' | '1_2_years' | '3_5_years' | '5_plus_years';
  primary_products?: string[]; // array of product types
}
```

**UI Changes:**
- Add 3 optional fields to signup form
- Collapsible "Tell us about your bakery" section
- All fields optional with clear "skip" option
- Estimated time: 2 minutes

### Phase 2: Passive Analytics (No Friction)
**Create new collection:**
```typescript
interface UserAnalytics {
  user_id: string;
  feature_usage: {
    dashboard_visits: number;
    recipe_calculator_uses: number;
    // ... etc
  };
  data_patterns: {
    recipes_created: number;
    orders_tracked: number;
    // ... etc
  };
  device_info: {
    device_type: string;
    browser: string;
    // ... etc
  };
  last_updated: Date;
}
```

**Implementation:**
- Track page visits in AppLayout
- Track component usage with custom hooks
- Store in analytics collection
- No user friction whatsoever

### Phase 3: Onboarding Survey (Optional)
**Create new component:**
- `components/OnboardingSurvey.tsx`
- Show once after first login
- Dismissible with "Skip" button
- Save responses to user profile

---

## 📈 Data Usage Examples

### Personalized Dashboard
```typescript
// Show relevant metrics based on bakery_type
if (user.bakery_type === 'cake_decorator') {
  showMetric('Average cake price')
  showMetric('Custom order fulfillment rate')
  suggestFeature('Pricing calculator')
}
```

### Onboarding Customization
```typescript
// Show relevant tutorials
if (user.experience_level === 'starting_out') {
  showTutorial('How to calculate recipe costs')
  showTutorial('Pricing for profit')
  showSampleData('beginner')
}
```

### Feature Recommendations
```typescript
// Suggest features based on usage
if (user.analytics.orders_tracked > 50) {
  suggestUpgrade('Pro plan for advanced analytics')
}
```

### Marketing Insights
```typescript
// Understand user segments
const segments = {
  'home_bakers': users.filter(u => u.bakery_type === 'home_baker'),
  'high_volume': users.filter(u => u.analytics.orders_tracked > 100),
  'inactive': users.filter(u => daysSinceLogin > 30),
}
```

---

## ✅ Benefits

### For Users
- 🎯 Personalized experience
- 📚 Relevant tutorials
- 💡 Smart recommendations
- ⚡ Faster onboarding

### For Business
- 📊 User segmentation
- 🎯 Targeted marketing
- 🔍 Feature adoption insights
- 💰 Upgrade opportunity identification
- 📈 Product development guidance

---

## 🔒 Privacy Considerations

### Data Minimization
- Only collect what's necessary
- All signup fields optional
- No tracking of sensitive data
- No third-party tracking

### User Control
- Transparent about data collection
- Easy opt-out for analytics
- Data export capability
- GDPR compliant

### Security
- Encrypt sensitive data
- Secure database storage
- No data sharing with third parties
- Regular security audits

---

## 🚀 Recommended Rollout

### Week 1: Signup Enhancement
- Add optional fields to signup form
- Update User model
- Update signup API
- Test thoroughly

### Week 2: Passive Analytics
- Implement feature tracking
- Create analytics collection
- Set up data aggregation
- Monitor for issues

### Week 3: Onboarding Survey
- Create survey component
- Integrate into dashboard
- Test user flow
- Gather feedback

---

## 📋 Checklist for Implementation

### Signup Form Changes
- [ ] Add bakery_type field with dropdown
- [ ] Add experience_level field with dropdown
- [ ] Add primary_products field with checkboxes
- [ ] Make all fields optional
- [ ] Add "Skip" button or make collapsible
- [ ] Update form validation
- [ ] Update API endpoint

### Database Changes
- [ ] Update User model schema
- [ ] Add migration for existing users
- [ ] Create UserAnalytics collection
- [ ] Add indexes for analytics queries

### Analytics Implementation
- [ ] Create analytics tracking hook
- [ ] Track page visits in AppLayout
- [ ] Track feature usage in components
- [ ] Create analytics API endpoint
- [ ] Set up data aggregation

### Onboarding Survey
- [ ] Create survey component
- [ ] Add to dashboard
- [ ] Create survey API endpoint
- [ ] Add analytics for survey responses

---

## 💡 Key Principles

✅ **Minimal Friction** - Optional fields, passive collection  
✅ **User Value** - Data improves their experience  
✅ **Transparency** - Clear about what we collect  
✅ **Privacy** - Secure, no third-party sharing  
✅ **Actionable** - Data drives real improvements  
✅ **Scalable** - Easy to add more insights later  

---

## 🎯 Success Metrics

- User completion rate for optional fields (target: 40-50%)
- Feature adoption based on bakery type
- Onboarding survey completion rate (target: 30-40%)
- Personalization impact on retention
- Pro upgrade conversion from insights

---

## 📝 Notes

- Start with Phase 1 (signup enhancement) - lowest friction, highest value
- Passive analytics (Phase 2) requires no user action
- Onboarding survey (Phase 3) is optional and dismissible
- All data collection respects user privacy
- Regular review of data usage and user feedback
