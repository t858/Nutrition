# Next.js Conversion Plan - Step by Step

## Overview

This document outlines the step-by-step plan to convert the React app to a fully type-safe Next.js application using the App Router.

## Current State Analysis

- ✅ Already using Next.js 16 with App Router structure
- ✅ TypeScript configured
- ❌ Custom routing instead of file-based routing
- ❌ Missing utility files (utils.ts, api client)
- ❌ Syntax errors and CSS class issues
- ❌ Incomplete type safety
- ❌ Missing proper client/server component boundaries
- ❌ No React Query Provider setup for App Router

---

## Step-by-Step Conversion Plan

### Step 1: Fix Immediate Issues ⚠️ CRITICAL

**Priority: HIGH**

1. **Fix CSS Class Errors**

   - Replace all `bg-linear-to-r` → `bg-gradient-to-r`
   - Replace all `bg-linear-to-br` → `bg-gradient-to-br`
   - Fix `wrap-break-word` → `break-words`

2. **Fix Syntax Errors**
   - Fix `PrescriptionManagement` export statement
   - Uncomment necessary imports
   - Fix any broken function declarations

**Files to fix:**

- `app/components/patient/MyAppointments/index.tsx`
- `app/components/patient/MyPrescriptions/index.tsx`
- `app/components/patient/AppointmentBooking/index.tsx`
- `app/components/patient/QuestionnaireForm/index.tsx`
- `app/components/chat/ChatWidget/index.tsx`
- `app/PatientDashboard/index.tsx`
- `app/AdminDashboard/index.tsx`
- `app/components/admin/*/index.tsx` (all admin components)
- `app/layout.tsx`

---

### Step 2: Create Missing Utility Files

**Priority: HIGH**

1. **Create `lib/utils.ts`**

   ```typescript
   // Utility functions for routing and helpers
   export function createPageUrl(pageName: string): string {
     // Convert page names to Next.js routes
     const routeMap: Record<string, string> = {
       Home: "/",
       About: "/about",
       Specializations: "/specializations",
       FAQ: "/FAQ",
       Contact: "/contact",
       PatientDashboard: "/dashboard/patient",
       AdminDashboard: "/dashboard/admin",
       Admin: "/dashboard/admin",
       Login: "/login",
       Privacy: "/privacy-policy",
     };
     return routeMap[pageName] || "/";
   }

   export function cn(
     ...classes: (string | undefined | null | false)[]
   ): string {
     return classes.filter(Boolean).join(" ");
   }
   ```

2. **Create `api/client.ts`**
   ```typescript
   // API client setup
   // This should be configured based on your actual backend API
   export const api = {
     auth: {
       me: async () => {
         /* implementation */
       },
       redirectToLogin: (url: string) => {
         /* implementation */
       },
       logout: () => {
         /* implementation */
       },
     },
     entities: {
       Appointment: {
         /* implementation */
       },
       Prescription: {
         /* implementation */
       },
       Questionnaire: {
         /* implementation */
       },
       ChatMessage: {
         /* implementation */
       },
       Invoice: {
         /* implementation */
       },
       User: {
         /* implementation */
       },
     },
   };
   ```

---

### Step 3: Convert to Next.js App Router File-Based Routing

**Priority: HIGH**

**Current Structure (WRONG):**

```
app/
  Home/index.tsx
  About/index.tsx
  Contact/index.tsx
```

**Target Structure (CORRECT):**

```
app/
  page.tsx                    # Home page
  about/
    page.tsx
  contact/
    page.tsx
  specializations/
    page.tsx
  faq/
    page.tsx
  privacy-policy/
    page.tsx
  dashboard/
    patient/
      page.tsx
    admin/
      page.tsx
  login/
    page.tsx
```

**Action Items:**

1. Move `app/Home/index.tsx` → `app/page.tsx`
2. Move `app/About/index.tsx` → `app/about/page.tsx`
3. Move `app/Contact/index.tsx` → `app/contact/page.tsx`
4. Move `app/Specialization/index.tsx` → `app/specializations/page.tsx`
5. Move `app/FAQ/index.tsx` → `app/faq/page.tsx`
6. Move `app/Privacy/index.tsx` → `app/privacy-policy/page.tsx`
7. Move `app/PatientDashboard/index.tsx` → `app/dashboard/patient/page.tsx`
8. Move `app/AdminDashboard/index.tsx` → `app/dashboard/admin/page.tsx`
9. Move `app/Login/index.tsx` → `app/login/page.tsx`
10. Move `app/Admin/index.tsx` → `app/dashboard/admin/page.tsx` (merge or decide which to use)

---

### Step 4: Add Metadata and SEO

**Priority: MEDIUM**

For each page, add metadata:

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title | NutriWell",
  description: "Page description",
};
```

**Pages needing metadata:**

- Home (`app/page.tsx`)
- About
- Contact
- Specializations
- FAQ
- Privacy Policy
- Patient Dashboard
- Admin Dashboard
- Login

---

### Step 5: Client/Server Component Boundaries

**Priority: HIGH**

1. **Server Components (default):**

   - Pages that don't need interactivity
   - Components that only render static content

2. **Client Components (add "use client"):**
   - All components using hooks (useState, useEffect, useContext)
   - Components using browser APIs (localStorage, window)
   - Interactive components (forms, buttons with onClick)
   - Components using framer-motion
   - Components using React Query

**Files that need "use client":**

- `app/layout.tsx` ✅ (already has it)
- `app/components/WhatsAppWidget/index.tsx` ✅ (already has it)
- All dashboard pages
- All form components
- All interactive UI components

---

### Step 6: Fix Type Safety

**Priority: HIGH**

1. **Uncomment and properly type API imports**
2. **Fix any `any` types** - replace with proper types
3. **Add proper return types** to all functions
4. **Type all event handlers** properly
5. **Type all API responses**

**Key areas:**

- API client types
- Component props (already done ✅)
- Event handlers
- Form data
- Query responses

---

### Step 7: Set Up React Query Provider

**Priority: HIGH**

Create `app/providers.tsx`:

```typescript
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

Update `app/layout.tsx` to wrap children with Providers.

---

### Step 8: Update Layout.tsx

**Priority: MEDIUM**

1. Add proper metadata
2. Add font configuration
3. Ensure proper HTML structure
4. Fix navigation to use Next.js Link properly
5. Add proper error boundaries

---

### Step 9: Fix Navigation

**Priority: HIGH**

Replace all:

- `window.location.href = createPageUrl(...)` → `useRouter().push(createPageUrl(...))`
- `location.pathname` → `usePathname()`
- Custom routing logic → Next.js file-based routing

**Files to update:**

- `app/layout.tsx`
- `app/PatientDashboard/index.tsx` → `app/dashboard/patient/page.tsx`
- `app/AdminDashboard/index.tsx` → `app/dashboard/admin/page.tsx`
- All components using navigation

---

### Step 10: Add Error Boundaries and Loading States

**Priority: MEDIUM**

1. Create `app/error.tsx` for global error handling
2. Create `app/loading.tsx` for global loading states
3. Add route-specific loading.tsx files where needed
4. Add proper error handling in API calls

---

## Implementation Order

1. ✅ **Step 1** - Fix immediate issues (CRITICAL - blocks everything)
2. ✅ **Step 2** - Create missing utilities (CRITICAL - needed for app to run)
3. ✅ **Step 6** - Fix type safety (HIGH - ensures correctness)
4. ✅ **Step 3** - Convert routing (HIGH - core Next.js pattern)
5. ✅ **Step 5** - Client/server boundaries (HIGH - Next.js requirement)
6. ✅ **Step 7** - React Query setup (HIGH - needed for data fetching)
7. ✅ **Step 9** - Fix navigation (HIGH - user experience)
8. ✅ **Step 4** - Add metadata (MEDIUM - SEO)
9. ✅ **Step 8** - Update layout (MEDIUM - polish)
10. ✅ **Step 10** - Error boundaries (MEDIUM - robustness)

---

## Testing Checklist

After conversion, verify:

- [ ] All pages load correctly
- [ ] Navigation works between pages
- [ ] Forms submit correctly
- [ ] API calls work
- [ ] TypeScript compiles without errors
- [ ] No console errors
- [ ] Client/server components work correctly
- [ ] Metadata appears in page source
- [ ] SEO tags are present
- [ ] Error boundaries catch errors
- [ ] Loading states display

---

## Notes

- Keep all existing functionality
- Maintain all type definitions
- Preserve all translations
- Maintain component structure
- Keep all styling (just fix CSS classes)

