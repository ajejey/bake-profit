# Mobile-Responsive Navigation & Breadcrumbs Components

## Overview

Two new reusable components have been created to provide consistent navigation and breadcrumbs across all pages:

1. **Header Component** - Mobile-responsive navigation with sliding sidebar
2. **Breadcrumbs Component** - Reusable breadcrumb navigation

---

## Header Component

### Location
`/components/layout/Header.tsx`

### Features
- ✅ Fixed navigation bar with logo and menu
- ✅ Mobile-responsive with hamburger menu
- ✅ Smooth slide-in sidebar from left (mobile only)
- ✅ Backdrop overlay when sidebar is open
- ✅ Configurable navigation links
- ✅ CTA button (Launch App Free)
- ✅ Keyboard-friendly (Escape to close)

### Usage

```tsx
import { Header } from '@/components/layout/Header'

export default function Page() {
  return (
    <>
      {/* Show both Blog and Tools links */}
      <Header showBlog showTools />
      
      {/* Your page content */}
    </>
  )
}
```

### Props

```typescript
interface HeaderProps {
  showBlog?: boolean    // Show "Blog" link (default: true)
  showTools?: boolean   // Show "Free Tools" link (default: true)
}
```

### Examples

**Home Page** - Show all navigation links:
```tsx
<Header showBlog showTools />
```

**Blog Page** - Hide "Blog" link (avoid redundancy):
```tsx
<Header showBlog={false} showTools />
```

**Tools Page** - Hide "Tools" link (avoid redundancy):
```tsx
<Header showBlog showTools={false} />
```

### Mobile Behavior
- **Desktop (md+):** Full horizontal navigation bar
- **Mobile:** Hamburger menu button that opens sliding sidebar
- **Sidebar:** 
  - Slides in from left with smooth animation
  - Semi-transparent backdrop overlay
  - Closes when link is clicked
  - Closes when backdrop is clicked
  - Smooth transitions with `transform` and `transition-transform`

### Styling
- Uses Tailwind CSS
- Rose color scheme (rose-500, rose-600)
- Responsive breakpoints: `md:` (768px)
- Fixed positioning with `z-50` for proper layering

---

## Breadcrumbs Component

### Location
`/components/layout/Breadcrumbs.tsx`

### Features
- ✅ Semantic HTML with `<nav>` and `aria-label`
- ✅ Automatic "Home" link
- ✅ Chevron separators between items
- ✅ Last item is not a link (current page)
- ✅ Hover effects on links
- ✅ Accessible and SEO-friendly

### Usage

```tsx
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export default function Page() {
  return (
    <>
      <Breadcrumbs 
        items={[
          { label: 'Blog', href: '/blog' },
          { label: 'How to Price Cakes' }  // No href = current page
        ]}
      />
      
      {/* Your page content */}
    </>
  )
}
```

### Props

```typescript
interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

interface BreadcrumbItem {
  label: string
  href?: string  // Optional - omit for current page
}
```

### Examples

**Blog Article Page:**
```tsx
<Breadcrumbs 
  items={[
    { label: 'Blog', href: '/blog' },
    { label: 'How to Price Cakes' }
  ]}
/>
```

**Tools Subcategory:**
```tsx
<Breadcrumbs 
  items={[
    { label: 'Tools', href: '/tools' },
    { label: 'Recipe Cost Calculator' }
  ]}
/>
```

**Deep Nested Page:**
```tsx
<Breadcrumbs 
  items={[
    { label: 'Blog', href: '/blog' },
    { label: 'Recipe Costing', href: '/blog/category/recipe-costing' },
    { label: 'How to Calculate Recipe Cost' }
  ]}
/>
```

### Output Example
```
Home > Blog > How to Price Cakes
```

### Styling
- Uses Tailwind CSS
- Rose color scheme for links
- Chevron icons from Lucide
- Responsive text sizing
- Accessible color contrast

---

## Implementation Status

### ✅ Updated Pages

1. **`/app/page.tsx`** (Home)
   - Replaced old navigation with `<Header showBlog showTools />`
   - Removed duplicate navigation code
   - Kept footer logo with ChefHat icon

2. **`/app/blog/page.tsx`** (Blog)
   - Replaced old header with `<Header showBlog={false} showTools />`
   - Ready for breadcrumbs integration

3. **`/app/tools/page.tsx`** (Tools)
   - Replaced old header with `<Header showBlog showTools={false} />`
   - Ready for breadcrumbs integration

### 📋 Next Steps

1. **Add Breadcrumbs to Blog Page:**
   ```tsx
   <Breadcrumbs items={[{ label: 'Blog' }]} />
   ```

2. **Add Breadcrumbs to Tools Page:**
   ```tsx
   <Breadcrumbs items={[{ label: 'Tools' }]} />
   ```

3. **Add Breadcrumbs to Individual Blog Articles:**
   ```tsx
   <Breadcrumbs 
     items={[
       { label: 'Blog', href: '/blog' },
       { label: 'Article Title' }
     ]}
   />
   ```

4. **Add Breadcrumbs to Individual Tool Pages:**
   ```tsx
   <Breadcrumbs 
     items={[
       { label: 'Tools', href: '/tools' },
       { label: 'Tool Name' }
     ]}
   />
   ```

---

## Mobile Responsive Breakpoints

### Header Component
- **Mobile (< 768px):** Hamburger menu, sidebar navigation
- **Tablet/Desktop (≥ 768px):** Horizontal navigation bar

### Breadcrumbs Component
- **All sizes:** Responsive text sizing with `text-sm`
- **Accessible:** Works on all screen sizes

---

## Accessibility Features

### Header
- Semantic HTML with `<nav>`
- Hamburger button with `aria-label`
- Keyboard navigation support
- Proper z-index layering

### Breadcrumbs
- Semantic `<nav>` with `aria-label="Breadcrumb"`
- Proper link semantics
- Clear visual hierarchy
- Color contrast meets WCAG standards

---

## Customization

### Change Colors
Update the rose color scheme in components:
```tsx
// In Header.tsx
className="text-rose-500"  // Change to your color

// In Breadcrumbs.tsx
className="hover:text-rose-600"  // Change to your color
```

### Change Sidebar Width
In `Header.tsx`:
```tsx
<div className="w-64 bg-white">  {/* Change w-64 to desired width */}
```

### Add More Navigation Links
In `Header.tsx`, add more items to the navigation:
```tsx
<Link href="/about" className="text-gray-700 hover:text-rose-600...">
  About
</Link>
```

---

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Performance Notes

- Header uses `'use client'` for interactivity
- Breadcrumbs is a server component (no client-side state)
- Smooth animations use CSS transforms (GPU-accelerated)
- No external dependencies beyond Lucide icons and Tailwind CSS

---

## Files Modified

1. `/components/layout/Header.tsx` - NEW
2. `/components/layout/Breadcrumbs.tsx` - NEW
3. `/app/page.tsx` - UPDATED
4. `/app/blog/page.tsx` - UPDATED
5. `/app/tools/page.tsx` - UPDATED

---

## Testing Checklist

- [ ] Test mobile hamburger menu opens/closes
- [ ] Test sidebar slides in smoothly
- [ ] Test backdrop click closes sidebar
- [ ] Test link clicks close sidebar
- [ ] Test desktop navigation displays correctly
- [ ] Test breadcrumbs display correctly
- [ ] Test all links navigate to correct pages
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Test accessibility with screen readers

