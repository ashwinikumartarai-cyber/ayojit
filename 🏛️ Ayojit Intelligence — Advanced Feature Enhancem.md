<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# 🏛️ Ayojit Intelligence — Advanced Feature Enhancement Blueprint

**Domain:** `ayojitintelligence.com`
**Design System:** Preserved (HSL colors, typography, spacing unchanged)
**New Features:** Advanced authentication, payment security, dashboard enhancements, e-commerce capabilities

***

## 🔐 1. Enhanced Authentication \& Security

### Multi-Provider Login (Google + Email OTP)

**Updated Login Flow (`app/(auth)/login/page.tsx`):**

```typescript
// 4-Step Multi-Portal Login with Google + Email OTP
// Step 1: Role Selection (Scholar, Instructor, Admin)
// Step 2: Provider Selection (Google / Email)
// Step 3: Credentials (Email + Password OR Google OAuth)
// Step 4: OTP Verification + Legal Consent

// lib/auth/providers.ts
export const authProviders = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackUrl: '/dashboard',
  },
  email: {
    server: process.env.ZOHO_SMTP_HOST!,
    port: parseInt(process.env.ZOHO_SMTP_PORT || '587'),
    from: 'noreply@ayojitintelligence.com',
  },
};

// lib/auth/session.ts - Enhanced Security
export interface SessionConfig {
  maxAge: number;              // 30 days
  refreshThreshold: number;    // 7 days before expiry
  concurrentSessions: number;  // Max 3 active sessions per user
  ipBinding: boolean;          // Optional IP binding for sensitive actions
  deviceFingerprint: boolean;  // Track device fingerprints
  mfaRequired: boolean;        // For admin/instructor roles
}
```


### Security Enhancements

**Rate Limiting \& Brute Force Protection:**

```typescript
// middleware.ts - Edge Rate Limiting
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/cloudflare";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10 seconds
  analytics: true,
});

export async function middleware(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  
  // Rate limit login attempts
  if (request.url.includes("/api/auth/login")) {
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return new Response("Too many attempts", { status: 429 });
    }
  }
  
  // Device fingerprinting
  const deviceFingerprint = await generateFingerprint(request);
  request.headers.set("x-device-fingerprint", deviceFingerprint);
  
  return NextResponse.next();
}
```

**Two-Factor Authentication (2FA):**

```typescript
// components/auth/TwoFactorAuth.tsx
export function TwoFactorAuth({ userId, role }: { userId: string; role: string }) {
  // Required for Admin/Instructor roles
  // Optional for Scholars (can enable in preferences)
  
  const [totpSecret, setTotpSecret] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  
  // Generate TOTP secret on first setup
  // Display QR code for Google Authenticator / Authy
  // Verify 6-digit code on each login
}
```

**Session Security Features:**

- ✅ Concurrent session limit (max 3 active devices)
- ✅ Device fingerprinting (browser + IP hash)
- ✅ Automatic session refresh (7 days before expiry)
- ✅ Suspicious activity detection (new device/location alerts)
- ✅ Session revocation from profile dashboard
- ✅ Login history with IP, device, timestamp

***

## 💳 2. Advanced UPI Payment Security

### Enhanced Checkout Flow (`app/(public)/checkout/page.tsx`)

```typescript
// Multi-Step UPI Payment with Fraud Detection
// Step 1: Order Summary & Tax Invoice Preview
// Step 2: UPI Payment Method Selection (GPay, PhonePe, Paytm, BHIM)
// Step 3: UTR Entry with Real-time Validation
// Step 4: Payment Verification & Receipt Generation

// lib/actions/orders.ts - Idempotent Payment Processing
export async function processUPIPayment(orderId: string, utr: string, amount: number) {
  // 1. Check for duplicate UTR (prevent replay attacks)
  const existingOrder = await db.order.findUnique({
    where: { utr },
  });
  
  if (existingOrder) {
    throw new Error("Duplicate UTR detected");
  }
  
  // 2. Verify UTR format (12-22 alphanumeric characters)
  if (!/^[A-Za-z0-9]{12,22}$/.test(utr)) {
    throw new Error("Invalid UTR format");
  }
  
  // 3. Amount matching (prevent tampering)
  const order = await db.order.findUnique({
    where: { id: orderId },
  });
  
  if (order?.amount !== amount) {
    throw new Error("Amount mismatch");
  }
  
  // 4. Bank verification (optional: integrate with NPCI API)
  // 5. Generate GST-compliant invoice
  // 6. Send email confirmation with PDF invoice
}
```


### Payment Security Features

```typescript
// components/checkout/SecurePaymentForm.tsx
export function SecurePaymentForm() {
  // Client-side validation
  const [utr, setUtr] = useState("");
  const [bankName, setBankName] = useState("");
  const [paymentTime, setPaymentTime] = useState("");
  
  // Real-time UTR validation
  const validateUTR = (utr: string) => {
    // Check length (12-22 chars)
    // Check alphanumeric only
    // Check against known UTR patterns
  };
  
  // Fraud detection signals
  const fraudSignals = {
    rapidSuccession: false,    // Multiple orders in short time
    unusualAmount: false,      // Amount deviates from typical
    newDevice: false,          // First payment from this device
    geoMismatch: false,        // IP location differs from billing
  };
  
  // Auto-retry failed verifications (max 3 attempts)
  // Manual review queue for suspicious transactions
}
```

**Payment Dashboard Features:**

- ✅ Transaction history with UTR, bank, timestamp
- ✅ Downloadable GST invoices (PDF)
- ✅ Refund request workflow
- ✅ Payment dispute resolution
- ✅ Recurring payment support (subscriptions)
- ✅ Wallet/credit system (optional)

***

## 📊 3. Enhanced Dashboards (All Roles)

### Scholar Dashboard (`app/(dashboard)/dashboard/page.tsx`)

**New Features:**

```typescript
// components/dashboard/ScholarDashboard.tsx
export function ScholarDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Quick Stats */}
      <StatCard 
        title="Courses in Progress" 
        value={enrollments.filter(e => !e.completed).length}
        icon="📚"
        trend="+2 this week"
      />
      
      <StatCard 
        title="Completed Courses" 
        value={enrollments.filter(e => e.completed).length}
        icon="✅"
        trend="95% completion rate"
      />
      
      <StatCard 
        title="Total Learning Hours" 
        value={totalHours}
        icon="⏱️"
        trend="+12h this month"
      />
      
      <StatCard 
        title="Certificates Earned" 
        value={certificates.length}
        icon="🏆"
        trend="Verified on-chain"
      />
      
      {/* Learning Activity Graph */}
      <ActivityGraph 
        data={last30DaysActivity}
        type="line"
        title="Learning Activity (Last 30 Days)"
      />
      
      {/* Upcoming Deadlines */}
      <UpcomingDeadlines 
        deadlines={quizDeadlines}
        showCountdown={true}
      />
      
      {/* Recommended Courses */}
      <CourseRecommendations 
        basedOn={completedCourses}
        algorithm="collaborative-filtering"
      />
      
      {/* Recent Certificates */}
      <CertificateShowcase 
        certificates={certificates.slice(0, 3)}
        showVerifyLink={true}
      />
    </div>
  );
}
```

**Scholar Dashboard Options:**


| Feature | Description |
| :-- | :-- |
| **Learning Path** | Visual roadmap with progress tracking |
| **Study Calendar** | Unified view of deadlines, quizzes, live classes |
| **Gradebook** | Marks ledger, GPA calculator, transcript export |
| **Achievements** | Badges, certificates, leaderboards |
| **Bookmarks** | Saved lessons, notes, resources |
| **Discussion Forums** | Course-specific Q\&A, peer collaboration |
| **Download Center** | Offline videos, PDFs, exercise files |
| **Learning Analytics** | Time spent, quiz scores, completion rates |


***

### Instructor Dashboard (`app/(dashboard)/dashboard/instructor/page.tsx`)

**New Features:**

```typescript
// components/dashboard/InstructorDashboard.tsx
export function InstructorDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Course Performance */}
      <StatCard 
        title="Total Enrollments" 
        value={totalEnrollments}
        icon="👥"
        trend="+15% this month"
      />
      
      <StatCard 
        title="Average Rating" 
        value={averageRating}
        icon="⭐"
        trend="4.8/5.0"
      />
      
      <StatCard 
        title="Revenue (This Month)" 
        value={`₹${monthlyRevenue}`}
        icon="💰"
        trend="+22% vs last month"
      />
      
      <StatCard 
        title="Completion Rate" 
        value={`${completionRate}%`}
        icon="📈"
        trend="Industry avg: 45%"
      />
      
      {/* Course Analytics */}
      <CourseAnalytics 
        courses={instructorCourses}
        metrics={['enrollments', 'revenue', 'completion', 'ratings']}
      />
      
      {/* Student Engagement */}
      <StudentEngagement 
        data={quizAttempts}
        showHeatmap={true}
      />
      
      {/* Content Performance */}
      <ContentPerformance 
        lessons={allLessons}
        sortBy="completion-rate"
      />
      
      {/* Recent Reviews */}
      <RecentReviews 
        reviews={courseReviews}
        allowReply={true}
      />
    </div>
  );
}
```

**Instructor Dashboard Options:**


| Feature | Description |
| :-- | :-- |
| **Course Builder** | Drag-and-drop lesson organizer, bulk upload |
| **Quiz Studio** | 13-question type editor, auto-grading |
| **Student Analytics** | Individual progress tracking, at-risk alerts |
| **Revenue Reports** | Sales, refunds, taxes, payout history |
| **Review Management** | Respond to reviews, flag inappropriate |
| **Content Library** | Reusable assets, templates, H5P objects |
| **Live Classes** | Schedule, record, attendance tracking |
| **Certificates** | Custom templates, bulk issuance |
| **Discussions** | Moderate Q\&A, announce updates |
| **Coupons \& Promotions** | Discount codes, flash sales, bundles |


***

### Admin Dashboard (`app/(admin)/admin/supreme-master/page.tsx`)

**Enhanced 7-Tab Cockpit:**

```typescript
// components/admin/SupremeMasterConsole.tsx
export function SupremeMasterConsole() {
  const tabs = [
    {
      id: 'branding',
      label: 'Branding',
      icon: '🎨',
      content: <BrandingSettings />
    },
    {
      id: 'courses',
      label: 'Courses',
      icon: '📚',
      content: <CourseManagement />
    },
    {
      id: 'services',
      label: 'Services',
      icon: '🛠️',
      content: <ServiceCatalog />
    },
    {
      id: 'blog',
      label: 'Blog',
      icon: '✍️',
      content: <EditorialPipeline />
    },
    {
      id: 'security',
      label: 'Security',
      icon: '🔒',
      content: <SecurityAudit />
    },
    {
      id: 'governance',
      label: 'Governance',
      icon: '⚖️',
      content: <ComplianceReports />
    },
    {
      id: 'audits',
      label: 'Audits',
      icon: '📋',
      content: <AuditLogs />
    },
  ];
  
  return <TabbedInterface tabs={tabs} />;
}
```

**Admin Dashboard Options:**


| Feature | Description |
| :-- | :-- |
| **User Management** | Role assignment, suspension, bulk import |
| **Course Approval** | Review workflow, quality checks |
| **Financial Reports** | Revenue, taxes, refunds, payouts |
| **Security Audit** | Login attempts, suspicious activity, 2FA adoption |
| **System Health** | Uptime, response times, error rates |
| **Content Moderation** | Flagged content, plagiarism detection |
| **Email Campaigns** | Bulk notifications, templates, analytics |
| **API Management** | Rate limits, API keys, usage stats |
| **Backup \& Restore** | Automated backups, point-in-time recovery |
| **Compliance** | GDPR, data export, right to be forgotten |


***

## 🛒 4. E-Commerce Features

### Product Catalog (`app/(public)/courses/page.tsx`)

**Advanced Features:**

```typescript
// components/course/CourseCatalog.tsx
export function CourseCatalog() {
  const [filters, setFilters] = useState({
    category: [],
    level: [],
    price: [0, 10000],
    rating: 4,
    language: [],
    features: ['certificate', 'lifetime-access', 'live-classes'],
  });
  
  const [sortBy, setSortBy] = useState('popularity');
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Advanced Filters */}
      <FilterSidebar 
        filters={filters}
        onFilterChange={setFilters}
        categories={allCategories}
        priceRange={{ min: 0, max: 10000 }}
      />
      
      {/* Course Grid */}
      <div className="col-span-2">
        <SortDropdown 
          options={['popularity', 'price-low', 'price-high', 'rating', 'newest']}
          value={sortBy}
          onChange={setSortBy}
        />
        
        <CourseGrid 
          courses={filteredCourses}
          view="grid"
          showBadges={true}
          showRatings={true}
          showEnrollments={true}
        />
        
        <Pagination 
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
```

**Catalog Features:**

- ✅ Advanced filtering (category, level, price, rating, language)
- ✅ Sorting (popularity, price, rating, newest)
- ✅ Search with autocomplete
- ✅ Wishlist/favorites
- ✅ Compare courses (side-by-side)
- ✅ Recently viewed
- ✅ Trending/bestsellers
- ✅ New arrivals
- ✅ Bundle deals (course packages)

***

### Shopping Cart \& Checkout

```typescript
// components/checkout/ShoppingCart.tsx
export function ShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [taxes, setTaxes] = useState(0);
  
  // Features:
  // - Add/remove items
  // - Quantity adjustment
  // - Coupon application
  // - Tax calculation (GST)
  // - Shipping (if physical products)
  // - Gift cards
  // - Save for later
  // - Continue shopping
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CartItems items={cart} onUpdate={setCart} />
      <OrderSummary 
        subtotal={subtotal}
        discount={discount}
        taxes={taxes}
        total={total}
      />
      <CheckoutForm 
        paymentMethods={['upi', 'card', 'netbanking']}
        savedAddresses={addresses}
      />
    </div>
  );
}
```

**Checkout Features:**

- ✅ Guest checkout (optional)
- ✅ Multiple payment methods (UPI, cards, net banking)
- ✅ Saved payment methods
- ✅ Billing/shipping addresses
- ✅ Order notes
- ✅ Gift wrapping (if applicable)
- ✅ Invoice preferences (GST number)
- ✅ Order tracking
- ✅ Email/SMS notifications

***

## 📱 5. Mobile \& Accessibility Enhancements

### Responsive Design

```typescript
// tailwind.config.ts - Enhanced Breakpoints
export default {
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
};
```

**Mobile Features:**

- ✅ Touch-optimized navigation
- ✅ Swipe gestures (course carousel, image gallery)
- ✅ Pull-to-refresh
- ✅ Bottom navigation bar (mobile only)
- ✅ Offline mode (PWA)
- ✅ Push notifications
- ✅ Native app shell (optional React Native)

***

### Accessibility (WCAG 2.1 AA)

```typescript
// components/dashboard/AccessibilityPreferencesClient.tsx
export function AccessibilityPreferences() {
  const [prefs, setPrefs] = useState({
    theme: 'light',           // light, dark, high-contrast
    fontSize: 'medium',       // xs, sm, md, lg, xl, 2xl, 3xl, 4xl
    fontWeight: 'normal',     // normal, bold
    lineHeight: 'normal',     // tight, normal, relaxed
    letterSpacing: 'normal',  // tight, normal, wide
    reduceMotion: false,
    colorBlindMode: false,
    dyslexiaFont: false,
    screenReaderOptimized: false,
    keyboardNavigation: true,
  });
  
  return (
    <div className="space-y-6">
      <ThemeSelector value={prefs.theme} onChange={(theme) => setPrefs({...prefs, theme})} />
      <FontScale value={prefs.fontSize} onChange={(size) => setPrefs({...prefs, fontSize: size})} />
      <MotionToggle value={prefs.reduceMotion} onChange={(reduce) => setPrefs({...prefs, reduceMotion: reduce})} />
      <ColorBlindFilters value={prefs.colorBlindMode} onChange={(mode) => setPrefs({...prefs, colorBlindMode: mode})} />
      <DyslexiaFont value={prefs.dyslexiaFont} onChange={(use) => setPrefs({...prefs, dyslexiaFont: use})} />
    </div>
  );
}
```

**Accessibility Features:**

- ✅ 8 font size scales (xs to 4xl)
- ✅ High-contrast themes
- ✅ Color blind filters (protanopia, deuteranopia, tritanopia)
- ✅ Dyslexia-friendly font (OpenDyslexic)
- ✅ Reduced motion option
- ✅ Screen reader optimization (ARIA labels)
- ✅ Keyboard navigation (tab order, shortcuts)
- ✅ Focus indicators
- ✅ Skip to content links

***

## 🔍 6. Typography \& Spacing Refinements

### Typography System

```typescript
// globals.css - Enhanced Typography
:root {
  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Font Sizes (with better word spacing) */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  
  /* Line Heights (improved readability) */
  --leading-tight: 1.25;
  --leading-normal: 1.6;   /* Increased from 1.5 for better readability */
  --leading-relaxed: 1.75;
  
  /* Letter Spacing (word spacing optimization) */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  
  /* Word Spacing */
  --word-spacing-normal: 0;
  --word-spacing-wide: 0.1em;  /* For better readability */
}

body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-normal);
  word-spacing: var(--word-spacing-wide);  /* Improved word spacing */
}

h1, h2, h3, h4, h5, h6 {
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  word-spacing: var(--word-spacing-normal);
}

p {
  margin-bottom: 1.5rem;  /* Better paragraph spacing */
  word-spacing: var(--word-spacing-wide);
}
```

**Typography Best Practices:**

- ✅ Optimal line length (50-75 characters per line)
- ✅ Sufficient line height (1.6 for body text)
- ✅ Proper heading hierarchy (h1 → h6)
- ✅ Consistent font sizes across devices
- ✅ Adequate contrast ratios (WCAG AA)
- ✅ Responsive typography (clamp functions)

***

### Spacing System

```css
/* globals.css - Enhanced Spacing */
:root {
  /* Base spacing unit: 4px */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  
  /* Section spacing */
  --section-padding-y: var(--space-16);
  --section-padding-x: var(--space-8);
  
  /* Card spacing */
  --card-padding: var(--space-6);
  --card-gap: var(--space-6);
  
  /* Form spacing */
  --form-gap: var(--space-4);
  --label-margin-bottom: var(--space-2);
  --input-padding: var(--space-3);
}

/* Consistent spacing throughout */
.container {
  padding-left: var(--section-padding-x);
  padding-right: var(--section-padding-x);
}

section {
  padding-top: var(--section-padding-y);
  padding-bottom: var(--section-padding-y);
}

.card {
  padding: var(--card-padding);
  margin-bottom: var(--card-gap);
}

.form-group {
  margin-bottom: var(--form-gap);
}

.form-label {
  display: block;
  margin-bottom: var(--label-margin-bottom);
}

.form-input {
  padding: var(--input-padding);
  width: 100%;
}
```


***

## 🚀 7. Performance Optimizations

### Core Web Vitals

```typescript
// next.config.ts - Performance Optimizations
const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'date-fns'],
    webpackBuildWorker: true,
  },
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
};
```

**Performance Features:**

- ✅ Image optimization (AVIF, WebP)
- ✅ Lazy loading (images, videos, components)
- ✅ Code splitting (route-based)
- ✅ Prefetching (next page, critical assets)
- ✅ Service worker (offline caching)
- ✅ CDN integration (Cloudflare)
- ✅ Database query caching (Redis)
- ✅ Compression (gzip, brotli)

***

## 📧 8. Email \& Notifications

### Enhanced Email Service

```typescript
// lib/email/zohoMailService.ts - Advanced Templates
export const emailTemplates = {
  welcome: {
    subject: 'Welcome to Ayojit Intelligence',
    template: 'welcome-scholar',
    variables: ['userName', 'courseCount', 'dashboardUrl'],
  },
  enrollment: {
    subject: 'Enrollment Confirmed: {{courseTitle}}',
    template: 'course-enrollment',
    variables: ['userName', 'courseTitle', 'instructorName', 'startDate'],
  },
  certificate: {
    subject: 'Your Certificate is Ready',
    template: 'certificate-issued',
    variables: ['userName', 'courseTitle', 'certificateId', 'verifyUrl'],
  },
  payment: {
    subject: 'Payment Received - Order #{{orderId}}',
    template: 'payment-confirmation',
    variables: ['userName', 'orderId', 'amount', 'utr', 'invoiceUrl'],
  },
  security: {
    subject: 'New Login Detected',
    template: 'security-alert',
    variables: ['userName', 'device', 'location', 'time'],
  },
  reminder: {
    subject: 'Quiz Reminder: {{quizTitle}}',
    template: 'quiz-reminder',
    variables: ['userName', 'quizTitle', 'dueDate', 'courseTitle'],
  },
};
```

**Notification Features:**

- ✅ Email notifications (transactional)
- ✅ In-app notifications (bell icon)
- ✅ Push notifications (PWA)
- ✅ SMS notifications (optional)
- ✅ Notification preferences (per user)
- ✅ Digest emails (daily/weekly)
- ✅ Unsubscribe links

***

## 📋 9. Complete Feature Checklist

### Authentication \& Security

- ✅ Google OAuth login
- ✅ Email OTP login
- ✅ Two-factor authentication (2FA)
- ✅ Device fingerprinting
- ✅ Concurrent session limits
- ✅ Login history \& alerts
- ✅ Password strength requirements
- ✅ Account recovery flow


### Payments

- ✅ UPI payment with UTR verification
- ✅ Fraud detection
- ✅ GST-compliant invoices
- ✅ Refund workflow
- ✅ Payment history
- ✅ Recurring payments (subscriptions)


### Dashboards

- ✅ Scholar dashboard (learning analytics, recommendations)
- ✅ Instructor dashboard (course performance, revenue)
- ✅ Admin dashboard (7-tab cockpit, audits)


### E-Commerce

- ✅ Advanced course catalog (filters, search, sorting)
- ✅ Shopping cart
- ✅ Coupon system
- ✅ Wishlist
- ✅ Compare courses
- ✅ Reviews \& ratings


### Accessibility

- ✅ 8 font size scales
- ✅ High-contrast themes
- ✅ Color blind filters
- ✅ Dyslexia-friendly font
- ✅ Keyboard navigation
- ✅ Screen reader optimization


### Typography \& Spacing

- ✅ Optimized line height (1.6)
- ✅ Improved word spacing (0.1em)
- ✅ Consistent heading hierarchy
- ✅ Responsive typography
- ✅ Adequate paragraph spacing


### Performance

- ✅ Image optimization
- ✅ Lazy loading
- ✅ Code splitting
- ✅ CDN integration
- ✅ Database caching

***

**Mandatory Attribution:**
`Ayojit Intelligence © 2026 Ayojit Intelligence. All rights reserved.`
`Visioned & Operated by Ashwini Kumar Tarai.`
`A vision shaped by Jyoti Gupta.`

