# 🏛️ Ayojit Intelligence — Complete Production Docker Infrastructure & Codebase

> **Platform Positioning:**  
> *"Ayojit Intelligence is an academic intelligence and research infrastructure platform connecting learning, knowledge, research support, documentation, and workflow."*  
> **Core Mandate:** *Turn fragmented academic knowledge into organized, usable work.*  
> **Ethical Boundary:** *100% Ethical Academic Mentorship; Strict Zero-Ghostwriting & Zero-Plagiarism Code of Conduct.*  
> **Target Year:** 2026  
> **Mandatory Attribution:**  
> `Ayojit Intelligence © 2026 Ayojit Intelligence. All rights reserved.`  
> `Visioned & Operated by Ashwini Kumar Tarai.`  
> `A vision shaped by Jyoti Gupta.`

---

## 📑 Complete Production Architecture & Service Topology

```text
                                  INTERNET
                                     │
                                     ▼ (Cloudflare DNS & Edge WAF / CDN)
                         ┌───────────────────────┐
                         │   NGINX REVERSE PROXY │ (ayojit_nginx)
                         │   CF Real-IP, Gzip    │
                         │   Security Headers    │
                         └───────────┬───────────┘
                                     │
                                     ▼ (Port 3000)
                         ┌───────────────────────┐
                         │ NEXT.JS LMS APP       │ (ayojit_app)
                         │ Multi-Stage Standalone│
                         │ 78 App Router Pages   │
                         └─────┬───────┬───────┬─┘
                               │       │       │
             ┌─────────────────┘       │       └─────────────────┐
             ▼ (Port 5432)             ▼ (Port 6379)             ▼ (Port 5000)
    ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
    │ POSTGRESQL 16   │       │ REDIS 7         │       │ PAPERFETCHER    │
    │ 43 Models       │       │ In-Memory Locks │       │ Python Flask    │
    │ postgres_data   │       │ AOF Persistence │       │ Crossref/COCI   │
    └─────────────────┘       └─────────────────┘       └─────────────────┘
```

---

## 🌐 Cloudflare Edge Integration & Real-IP Restoration

1. **DNS & Edge CDN**:
   - `A Record` for `@` and `CNAME` for `www` set to **Proxied (Orange Cloud ☁️)**.
   - SSL Encryption set to **Full** or **Full (strict)**.
   - **Always Use HTTPS** and **Automatic HTTPS Rewrites** enabled.

2. **Nginx Reverse Proxy (`docker/nginx/nginx.conf`)**:
   - Explicitly trusts Cloudflare's IPv4 and IPv6 CIDR blocks (`set_real_ip_from`).
   - Restores the true client IP using the `CF-Connecting-IP` header (`real_ip_header CF-Connecting-IP`).
   - Ensures DPDP 2023 audit logs, security audits, and rate-limiting zones record real visitor IPs instead of Cloudflare proxy IPs.

---

## 📂 Production Repository Structure

```text
opensource_lms_complete/
├── Dockerfile                              # Multi-stage production build (deps -> builder -> runner)
├── docker-compose.yml                      # Full multi-container stack (postgres, redis, paperfetcher, app, nginx)
├── .dockerignore                           # Optimized layer build excludes
├── .env.example                            # Production environment template
├── next.config.js                          # Standalone output bundle configuration
├── data/
│   └── founder-profile.ts                  # Founder profile, visions, goals, and technical competencies
├── docker/
│   ├── nginx/
│   │   └── nginx.conf                      # Reverse proxy with Cloudflare Real-IP restoration
│   └── redis/
│       └── redis.conf                      # Redis configuration with AOF persistence & LRU eviction
├── scripts/
│   ├── docker-entrypoint.sh                # Container startup sequence (DB readiness, schema sync, seed)
│   ├── test-deployment.js                  # Automated HTTP & API smoke test runner
│   ├── comprehensive-system-audit.js       # 25-Point End-to-End QA & Security Audit Suite
│   ├── create-admin.ts                     # CLI administrator account provisioner
│   ├── generate-admin-link.ts              # CLI magic-link generator for secure admin login
│   ├── backup.sh                           # 30-day rotation PostgreSQL backup automation
│   └── deploy.sh                           # Native Linux / Docker deployment orchestrator
├── app/
│   ├── (admin)/                            # Privileged admin cockpit, supreme master, analytics
│   ├── (auth)/
│   │   ├── login/page.tsx                  # 4-step Student / Instructor login
│   │   └── register/page.tsx               # Student / Instructor registration
│   ├── (dashboard)/
│   │   └── dashboard/page.tsx              # Supreme Unified Dashboard Cockpit
│   ├── (public)/
│   │   ├── about/page.tsx                  # Institutional Vision, Foundations & Leadership
│   │   ├── founder/page.tsx                # Founder & Strategic Leadership Profile
│   │   ├── courses/page.tsx                # Dynamic Catalog (3 Published Masterclasses)
│   │   ├── services/page.tsx               # Dynamic Catalog (4 Published Consultations)
│   │   └── literature-search/page.tsx      # Automated Literature Search Engine
│   └── api/
│       ├── auth/
│       │   ├── logout/route.ts             # Session cleanup & cookie invalidation
│       │   └── magic-login/route.ts        # Secure CLI magic login handler
│       ├── health/route.ts                 # Health & status monitor (/api/health)
│       └── paperfetcher/                   # Literature search handsearch & snowball APIs
├── components/
│   ├── dashboard/
│   │   └── UnifiedDashboard.tsx            # Supreme Unified Role-Aware Dashboard Component (with Logout)
│   ├── admin/
│   │   └── SupremeMasterConsole.tsx        # 7-Tab Administrative Mutation Engine (with Logout)
│   ├── quiz/
│   │   └── ComprehensiveQuizPlayer.tsx     # Complete 13 Question Type Assessment Engine
│   └── course/
│       └── EnhancedLessonPlayer.tsx        # Content Drip Rules, Live Classes, H5P Objects & Exercise Files
├── lib/
│   ├── auth/session.ts                     # Multi-tier zero-trust session engine
│   ├── storage/storage.ts                  # Multi-cloud storage service (local, r2, oracle, storj)
│   ├── video/videoService.ts               # Multi-provider video engine (YouTube, Vimeo, BunnyCDN, Custom)
│   ├── email/zohoMailService.ts            # Zoho Mail transactional templating
│   ├── redis.ts                            # Distributed mutex locks and caching
│   └── db.ts                               # Prisma PostgreSQL client singleton
├── paperfetcher_service/
│   ├── Dockerfile                          # Python 3.11-slim container with Gunicorn
│   ├── app.py                              # Paperfetcher Flask REST API
│   └── requirements.txt                    # Paperfetcher Python dependencies
└── prisma/
    ├── schema.prisma                       # Complete 43-model PostgreSQL schema with musl binary targets
    └── seed.js                             # Idempotent 64-lesson production curriculum migration
```

---

## 🌐 Live System URLs

- **Public Homepage**: [http://localhost](http://localhost)
- **Courses & Masterclasses**: [http://localhost/courses](http://localhost/courses)
- **Research Consultations**: [http://localhost/services](http://localhost/services)
- **Automated Literature Search**: [http://localhost/literature-search](http://localhost/literature-search)
- **Knowledge Center**: [http://localhost/blog](http://localhost/blog)
- **Institutional Vision & Foundations**: [http://localhost/about](http://localhost/about)
- **Founder & Leadership Profile**: [http://localhost/founder](http://localhost/founder)
- **Student & Instructor Login**: [http://localhost/login](http://localhost/login)
- **Student & Instructor Register**: [http://localhost/register](http://localhost/register)
- **Scholar & Unified Dashboard**: [http://localhost/dashboard](http://localhost/dashboard)
- **Admin Supreme Master Console**: [http://localhost/admin/supreme-master](http://localhost/admin/supreme-master)
- **System Health Monitor**: [http://localhost/api/health](http://localhost/api/health)
