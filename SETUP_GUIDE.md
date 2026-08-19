# 🏛️ Ayojit Intelligence — Complete Setup & Architecture Guide (2026 Master Specification)

> **Official Institutional Learning Management System & Research Services Platform**  
> Built with Next.js 14 App Router, Server Actions, TypeScript, Prisma ORM, SQLite/PostgreSQL, Tailwind CSS, and 0%-Fee Anti-Fraud Manual UPI Payment Gateway.

---

## 📑 Table of Contents
1. [Platform Overview & Core Mandate](#-platform-overview--core-mandate)
2. [The 8 Production & Security Pillars](#-the-8-production--security-pillars)
3. [Brand Identity & SVG Asset Matrix](#-brand-identity--svg-asset-matrix)
4. [Master Curriculum Architecture (10 Masterclasses / 40 Modules / 120 Lessons)](#-master-curriculum-architecture)
5. [Professional Academic Services (4 Specialized Offerings)](#-professional-academic-services)
6. [Anti-Fraud Zero-Commission Manual UPI Payment Workflow](#-anti-fraud-zero-commission-manual-upi-payment-workflow)
7. [Relational Database Schema (Prisma ORM)](#-relational-database-schema-prisma-orm)
8. [Complete 36-Route Architecture Map](#-complete-36-route-architecture-map)
9. [Quick Start & Installation (Step-by-Step)](#-quick-start--installation-step-by-step)
10. [Default Demo Test Accounts](#-default-demo-test-accounts)

---

## 🏛️ Platform Overview & Core Mandate

**Ayojit Intelligence** (*derived from linguistic roots denoting systematic arrangement and purposeful execution*) is institutional infrastructure engineered to bridge the gap between literature ingestion, research methodology, personal knowledge management (PKM), and plain-text scholarly publication.

- **Founder & Lead Infrastructure Architect:** Ashwini Kumar Tarai
- **Strategic Vision Lead:** Jyoti Gupta
- **Core Mission:** *Turn fragmented academic knowledge into organized, usable work.*
- **Instructional Model:** Founder-led curriculum ensuring rigorous academic standards.
- **Audience:** Doctoral researchers, PhD candidates, postdoctoral scholars, master's students, university faculty, independent academics, and research institutions worldwide.

---

## 🛡️ The 8 Production & Security Pillars

1. **Next.js 14 App Router & Data Access Layer (DAL):** Server-side data fetching via `lib/dal/index.ts`. All mutations run via Server Actions with Zod validation and path revalidation.
2. **OWASP Top 10 Protection & Sanitization:** Input validation before tool/query execution (`ASI-01`, `ASI-02`), parameterized Prisma queries, and HttpOnly SameSite cookies.
3. **Authentication & Session Management:** Passwords hashed with `bcryptjs` (salt 12), JWT signed tokens in secure cookies.
4. **Anti-Fraud Payment Guard:** `utrNumber String @unique` on `Order` prevents transaction replay attacks. Atomic provisioning inside `db.$transaction()`.
5. **Role-Based Access Control (RBAC):** Strict isolation of `STUDENT`, `INSTRUCTOR`, and `ADMIN` privileges.
6. **Complete Academic LMS Matrix:** Course → Module → Lesson / Quiz / Assignment, Faculty Broadcast Announcements, Personal Research Notebook, Sequential Drip Locking, Verifiable Credentials (`CERT-AYOJIT-XXXXXX`), Q&A forums, and verified reviews.
7. **Legal Compliance Suite:** Dedicated routes for `/terms`, `/privacy`, `/refund`, and `/disclaimer`.
8. **Mandatory Operational Credits:** Global Footer strictly rendering:
   ```
   Ayojit Intelligence © 2026 Ayojit Intelligence. All rights reserved.
   Visioned & Operated by Ashwini Kumar Tarai.
   A vision shaped by Jyoti Gupta.
   ```

---

## 🎨 Brand Identity & SVG Asset Matrix

All assets are located in `/public/assets/`:
- **Brand Logos:** `/assets/brand/logo/ayojit-intelligence-logo-transparent.png`, `/assets/brand/logo/ayojit-symbol.svg`, `/assets/brand/favicon/favicon.svg`
- **Course Illustrative Covers & Heroes:** `/assets/images/course-spss.svg`, `/assets/images/course-jasp.svg`, `/assets/images/course-methodology.svg`, `/assets/images/course-statistics.svg`, `/assets/images/course-ignou.svg`, `/assets/images/course-writing.svg`, `/assets/images/course-literature.svg`, `/assets/images/course-proposal.svg`, `/assets/images/course-qualitative.svg`, `/assets/images/course-viva.svg`
- **Avatars:** `/assets/images/avatar-instructor.svg`, `/assets/images/avatar-1.svg`, `/assets/images/avatar-2.svg`, `/assets/images/avatar-3.svg`

---

## 📚 Master Curriculum Architecture

1. **SPSS Masterclass for Research Data Analysis** (₹1,499)
2. **JASP Open-Source Statistical Analytics** (₹1,299)
3. **Advanced Research Methodology & Design** (₹1,999)
4. **Applied Statistical Analysis & Inference** (₹1,599)
5. **Master's & Doctoral Dissertation Mentorship** (₹2,499)
6. **Academic Writing & Dissertation Drafting** (₹1,799)
7. **Systematic Literature Review & PRISMA 2020** (₹1,199)
8. **Thesis Synopsis & Proposal Drafting** (₹1,399)
9. **Qualitative Research & NVivo Thematic Coding** (₹1,699)
10. **Viva Voce Defense & Mock Interview Prep** (₹1,099)

---

## 🛠️ Professional Academic Services

1. **Synopsis & Thesis Proposal Preparation Mentorship** (₹3,999 | 5-7 Days)
2. **Data Processing & Inferential Analysis (SPSS / JASP / R)** (₹4,999 | 3-5 Days)
3. **Qualitative NVivo Coding & Thematic Synthesis** (₹3,499 | 4-6 Days)
4. **1-on-1 Mock Viva Defense Coaching** (₹1,999 | Scheduled)

---

## 💳 Anti-Fraud Zero-Commission Manual UPI Payment Workflow

```
1. Scholar selects Course / Service from Catalog
   ↓
2. Checkout (/checkout) displays dynamic QR code, UPI ID (tarai.ashwini@okhdfcbank), and Payee Name
   ↓
3. Scholar scans & pays via GPay, PhonePe, Paytm, BHIM, or Mobile Banking
   ↓
4. Scholar inputs 12-digit numeric Bank UTR Number on checkout form
   ↓
5. Server Action `submitPaymentReference` validates UTR uniqueness & records Order (status: PENDING)
   ↓
6. Admin verifies UTR against bank statement in /admin/orders
   ↓
7. Admin clicks "Approve Order" → `db.$transaction()` atomically creates Enrollment/Booking & grants instant access!
```

---

## 🗺️ Complete 36-Route Architecture Map

### Public & Legal Pages (11 Routes)
- `/` — Homepage (Hero, Metrics, Featured Courses, Testimonials)
- `/courses` — Course Catalog Directory (Faceted Search & Category Filter)
- `/courses/[id]` — Course Detail View (Hero Split, Syllabus Accordion, Faculty)
- `/services` — Academic Services Directory (4 Advisory Offerings)
- `/services/[id]` — Service Detail Screen (4-Step Timeline, Deliverables)
- `/methodology` — Research & Methodology Resource Center (Decision Trees)
- `/about` — About Us (Mission, Leadership, Core Values)
- `/terms` — Terms of Service & User Agreement
- `/privacy` — Privacy & Data Protection Policy
- `/refund` — Refund, Cancellation & Payment Policy
- `/disclaimer` — Academic Mentorship & Non-Ghostwriting Disclaimer

### Authentication & Transactions (4 Routes)
- `/login` — Login Screen (Quick Demo 1-Click Fill Buttons)
- `/register` — Registration Screen (Terms & Disclaimer Agreement)
- `/checkout` — 0% Fee Manual UPI Checkout Screen (Dynamic QR, UTR Input)
- `/certificates/[id]` — Public Certificate Verification Portal (Official Verification Seal)

### Student Dashboard Hubs (6 Routes)
- `/dashboard` — Student Dashboard Overview (Metrics, Enrolled Courses, UTR Queue)
- `/dashboard/courses` — Enrolled Courses (Progress Meters, Resume Learning)
- `/dashboard/courses/[id]/learn` — Interactive LMS Course Player (Drip Locking, Personal Notebook, Announcements, Quizzes, Assignments, Q&A)
- `/dashboard/bookings` — Student Service Bookings (Consultation Progress Timeline)
- `/dashboard/orders` — Student Order History & Printable Receipts (Invoice Modal)
- `/dashboard/profile` — Student Profile Settings (Academic Credentials List)

### Supreme Master Administration & AI Governance (11 Routes)
- `/admin/dashboard` — Admin Overview & Quick Metrics
- `/admin/orders` — Order & 12-Digit UTR Verification Queue (WhatsApp Link)
- `/admin/courses` — Live Course Builder, Announcements Composer & Submissions
- `/admin/students` — Student Directory & Academic Force-Progress Overrides
- `/admin/gradebook` — Centralized Submissions Gradebook & Quiz Retake Reset
- `/admin/instructors` — Faculty Revenue Split Matrix & Payout Management
- `/admin/certificates` — Credential Registry & Manual Certificate Issuer
- `/admin/ai-governance` — NIST AI 100-1 Control Plane & Autonomy Tier Matrix
- `/admin/agent-contracts` — Declarative Signed Contracts & MCP Allowlisting
- `/admin/editorial` — 7-State Content Editorial Engine & Governance Gates
- `/admin/audit-logs` — Tamper-Proof Security Audit Stream

---

## 🚀 Quick Start & Installation (Step-by-Step)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment Variables
Create `.env` with:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="ayojit-intelligence-master-spec-secret-2026"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_UPI_ID="tarai.ashwini@okhdfcbank"
NEXT_PUBLIC_BUSINESS_NAME="Ayojit Intelligence"
```

### Step 3: Initialize Database & Seed Master Catalog
```bash
# Push schema to SQLite
npx prisma generate
npx prisma db push

# Seed 10 master courses, 40 modules, 120 lessons, quizzes, assignments, and 4 services
node prisma/seed.js
```

### Step 4: Run Development Server
```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 📧 Default Demo Test Accounts

| Role | Email | Password | Access Permissions |
| :--- | :--- | :--- | :--- |
| **Lead Faculty / Admin** | `admin@example.com` | `admin123` | Full Supreme Admin & AI Governance Suite |
| **Doctoral Scholar** | `user@example.com` | `user123` | Scholar Portal (`/dashboard`, `/dashboard/courses/.../learn`, `/checkout`) |

---

*Ayojit Intelligence © 2026 Ayojit Intelligence. All rights reserved. Visioned & Operated by Ashwini Kumar Tarai. A vision shaped by Jyoti Gupta.*
