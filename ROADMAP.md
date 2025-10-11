# Seene.link — Development Roadmap

> **Project**: Micro web app to create and share personalized text pages
> **Stack**: Vue 3 + Vite + Tailwind + Vercel + Supabase
> **Started**: October 10, 2025

---

## 📍 Current Status — ✅ MVP COMPLETED!

**🎉 App is LIVE at https://seene.link**
**📦 Repository: https://github.com/EmmanueleD/seene.link**

- [x] Domain registered: `seene.link` ✅
- [x] Vercel account active ✅
- [x] Supabase account active ✅
- [x] Project initialized ✅
- [x] UI working with Tailwind CSS v4 ✅
- [x] Supabase database configured ✅
- [x] API integrated with Supabase ✅
- [x] Production deployment ✅
- [x] Domain connected ✅
- [x] **End-to-end MVP working** ✅
- [x] GitHub repository ✅

---

## 🎯 PHASE 1 — Setup (Day 1)

### Goals
Create the technical foundation and prepare the development environment.

### Tasks
- [x] Create GitHub repository `seene.link` ✅
- [x] Initialize Vue 3 + Vite project ✅
- [x] Install and configure Tailwind CSS v4 ✅
- [x] Create folder structure ✅
- [x] Configure Vercel (`vercel.json`) ✅
- [x] Configure Supabase: ✅
  - [x] Create Supabase project ✅
  - [x] Run `supabase-setup.sql` ✅
  - [x] Create `.env` file with credentials ✅
- [x] Deploy to Vercel ✅
- [x] Connect domain `seene.link` ✅

### Deliverables
- [x] Vue 3 + Vite project working ✅
- [x] Tailwind CSS configured ✅
- [x] Base structure created ✅
- [x] Supabase database configured ✅
- [x] Deployed to Vercel ✅
- [x] GitHub repository created ✅

**✅ PHASE 1 COMPLETED — October 10, 2025**

---

## 🚀 PHASE 2 — MVP (Week 1)

### Goals
Implement the basic flow: create a Seene and display it.

### Tasks

#### Frontend
- [x] **Home page** (`/`) ✅
  - [x] Textarea for text input
  - [x] "Create Seene" button
  - [x] Minimalist design (centered, white space)
  - [x] Character counter (max 500)
  - [x] Success message with link
  - [x] "Copy link" button
  
- [x] **View page** (`/:id`) ✅
  - [x] Display centered text
  - [x] Error handling (404 if not found)
  - [x] Loading state
  - [x] "Create your own" button

- [x] **Routing** ✅
  - [x] Setup Vue Router
  - [x] Routes: `/` (home) and `/:id` (view)

#### Backend (Vercel Functions)
- [x] **`/api/create`** (POST) ✅
  - [x] Receives: `{ text }`
  - [x] Generates unique ID (nanoid)
  - [x] Saves to Supabase
  - [x] Tested and working ✅

- [x] **`/api/get`** (GET) ✅
  - [x] Receives: `?id=xxx`
  - [x] Queries Supabase
  - [x] Tested and working ✅

#### Database
- [x] SQL schema created (`supabase-setup.sql`) ✅
- [x] Executed on Supabase ✅
- [x] Integrated in Vue views ✅

#### Integration
- [x] **Real APIs integrated** ✅
  - [x] `Home.vue` → calls `/api/create` ✅
  - [x] `View.vue` → calls `/api/get` ✅

### Testing
- [x] UI working locally ✅
- [x] Create Seene with real database ✅
- [x] Open generated link and see text ✅
- [x] Tested on production (seene.link) ✅
- [x] Verified saving to Supabase ✅

### Deliverables
- [x] Complete end-to-end flow working ✅
- [x] Shareable links active (e.g. `seene.link/abc123`) ✅
- [x] App live at https://seene.link ✅

**✅ PHASE 2 COMPLETED — October 10, 2025**

---

## 🎊 MVP + CUSTOMIZATION RELEASED!

**Release date**: October 10-11, 2025  
**URL**: https://seene.link  
**Repository**: https://github.com/EmmanueleD/seene.link  
**Development time**: ~6 hours  
**Status**: ✅ Live and in production

### Live Features
- ✅ Create Seene with text (max 500 characters)
- ✅ Generate unique link with nanoid
- ✅ Display Seene with minimalist design
- ✅ Copy link with feedback
- ✅ "Create Another" button for quick reset
- ✅ Smooth fade-in animations
- ✅ Persistent storage on Supabase
- ✅ Responsive mobile and desktop
- ✅ 404 error handling
- ✅ Loading states
- ✅ Vercel Analytics integrated
- ✅ SEO optimized (OpenGraph, Twitter Card)

### Customization Features (Phase 3 ✅)
- ✅ **WYSIWYG Editor** - What You See Is What You Get
- ✅ **5 Curated Fonts** - Inter, Playfair Display, Space Mono, Crimson Text, Roboto Mono
- ✅ **Custom Google Fonts** - Load any font from Google Fonts library
- ✅ **Text Color Picker** - Full color customization with hex preview
- ✅ **Gradient Background** - Two-color gradient with visual preview
- ✅ **Live Preview** - See changes in real-time as you type
- ✅ **Click-to-Toggle Controls** - Clean, immersive UX
- ✅ **Auto-Resize Textarea** - Adapts to content dynamically
- ✅ **Line Breaks Preservation** - Formatting maintained in view
- ✅ **Elegant Color Pickers** - Visual preview with contrast-aware text

---

## 🎨 PHASE 3 — Customization ✅ COMPLETED!

### Goals
Add customization options for fonts, colors, and style.

### Tasks

#### Frontend
- [x] **Font selector** ✅
  - [x] Integrated Google Fonts API
  - [x] 5 curated fonts (Inter, Playfair Display, Space Mono, Crimson Text, Roboto Mono)
  - [x] Custom font input for any Google Font
  - [x] Live preview

- [x] **Color pickers** ✅
  - [x] Text color with hex display
  - [x] Gradient background (2 colors)
  - [x] Visual preview with contrast-aware text
  - [x] Elegant rounded design

- [x] **WYSIWYG Editor** ✅
  - [x] Full-screen editable text
  - [x] Real-time preview while typing
  - [x] Click-to-toggle controls panel
  - [x] Auto-resize textarea

#### Backend
- [x] Updated `/api/create` to accept: ✅
  ```json
  {
    "text": "...",
    "font": "Inter",
    "text_color": "#111827",
    "gradient_start": "#ffffff",
    "gradient_end": "#f3f4f6"
  }
  ```

- [x] Updated database schema: ✅
  ```sql
  ALTER TABLE seenes ADD COLUMN font TEXT DEFAULT 'Inter';
  ALTER TABLE seenes ADD COLUMN text_color TEXT DEFAULT '#111827';
  ALTER TABLE seenes ADD COLUMN gradient_start TEXT DEFAULT '#ffffff';
  ALTER TABLE seenes ADD COLUMN gradient_end TEXT DEFAULT '#f3f4f6';
  ```

#### Design
- [x] Elegant color picker UI ✅
- [x] Optimized for mobile ✅
- [x] Backdrop blur effects ✅
- [x] Smooth animations ✅

### Deliverables
- [x] Customizable Seenes with fonts and colors ✅
- [x] Working live preview ✅
- [x] Custom Google Fonts support ✅
- [x] Immersive WYSIWYG experience ✅

**✅ PHASE 3 COMPLETED — October 11, 2025**

---

## 🔗 PHASE 4 — Sharing Experience (Partially Completed)

### Goals
Improve sharing experience and social preview.

### Tasks

#### Sharing
- [x] **Copy link button** ✅
  - [x] Clipboard API implemented
  - [x] Visual feedback ("Copied!" toast)

- [ ] **QR Code generator**
  - Library: `qrcode` npm
  - Show QR after creation
  - Download QR as image

- [x] **"Create another" button** ✅
  - [x] On home page after creation
  - [x] Resets form and state

#### Meta Tags (OpenGraph)
- [x] Implement static meta tags for social preview ✅
  - [x] Basic OpenGraph tags
  - [x] Twitter Card tags
  - [x] SEO optimized

- [ ] Optional: generate dynamic OG image (Vercel OG Image)

#### Mobile Optimization
- [x] Responsive design ✅
- [x] Works on all devices ✅
- [x] Touch-friendly controls ✅
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Formal mobile testing (iOS, Android)

### Deliverables
- [x] Copy link functionality ✅
- [x] "Create another" button ✅
- [x] Basic SEO/OpenGraph tags ✅
- [x] Responsive mobile design ✅
- [ ] QR code generation (future)
- [ ] Dynamic OG images (future)

---

## 🎨 PHASE 5 — Branding & Landing (Week 4)

### Goals
Create visual identity and compelling landing page.

### Tasks

#### Branding
- [x] Minimalist logo (already done ✅)
- [ ] Favicon
- [ ] Main color scheme

#### Landing Page
- [ ] **Hero section**
  - Clear headline
  - Interactive demo (create a Seene directly)
  - Main CTA

- [ ] **Examples section**
  - 3-4 example Seenes
  - Different styles/use cases

- [ ] **How it works**
  - 3 simple steps (Write → Customize → Share)

- [ ] **Footer**
  - GitHub link
  - Credits
  - Privacy/Terms (optional)

#### Copy & Content
- [ ] Write microcopy for UI
- [ ] Create example Seenes

### Deliverables
✅ Complete and professional landing page
✅ Live demo examples

---

## 🚀 PHASE 6 — Optimization & Launch

### Goals
Optimize performance, add analytics, and launch publicly.

### Tasks

#### Analytics
- [x] Install Vercel Analytics ✅
- [x] Track:
  - Seenes created ✅
  - Views ✅
  - Page performance ✅

#### Performance
- [ ] Lighthouse audit (target: 95+ on all metrics)
- [ ] Implement caching (Vercel Edge)
- [ ] Optimize bundle size
- [ ] Lazy loading components

#### Testing
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS, Android)
- [ ] Accessibility testing (a11y)
- [ ] Error handling and edge cases

#### Launch
- [ ] Soft launch: share with friends/beta testers
- [ ] Collect feedback
- [ ] Fix critical bugs
- [ ] **Public launch**:
  - Post on Product Hunt
  - Tweet/thread on Twitter
  - Post on Reddit (r/SideProject, r/webdev)
  - Hacker News (Show HN)

### Deliverables
✅ Stable and performant app
✅ Active analytics
✅ Public launch completed

---

## 🔮 Future Enhancements (Post-Launch)

Ideas for future iterations:

- [ ] **Custom URL slugs** (`seene.link/yourtext`)
- [ ] **Expiring Seenes** (auto-delete after X days)
- [ ] **Templates/Themes** (stylistic presets)
- [ ] **Public gallery** (featured Seenes)
- [ ] **CSS animations** (fade, zoom, slide)
- [ ] **AI text enhancement** (poetic suggestions)
- [ ] **Embed widget** (embed Seenes in other sites)
- [ ] **Public API** (for integrations)
- [ ] **Dark mode** (theme toggle)
- [ ] **Multi-language support**

---

**Last updated**: October 11, 2025
**Status**: MVP + Customization completed and live at https://seene.link
