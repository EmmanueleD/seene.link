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

## 🎊 MVP RELEASED!

**Release date**: October 10, 2025  
**URL**: https://seene.link  
**Repository**: https://github.com/EmmanueleD/seene.link  
**Development time**: ~2.5 hours  
**Status**: ✅ Live and in production

### Live Features
- ✅ Create Seene with text (max 500 characters)
- ✅ Generate unique link with nanoid
- ✅ Display Seene with minimalist design
- ✅ Copy link with feedback
- ✅ Persistent storage on Supabase
- ✅ Responsive mobile and desktop
- ✅ 404 error handling
- ✅ Loading states

---

## 🎨 PHASE 3 — Customization (Week 2)

### Goals
Add customization options for fonts, colors, and style.

### Tasks

#### Frontend
- [ ] **Font selector**
  - Integrate Google Fonts API
  - 5-8 selected fonts (e.g. Inter, Playfair, Mono, etc.)
  - Live preview

- [ ] **Color pickers**
  - Text color
  - Background color
  - Predefined palettes + custom

- [ ] **Live preview**
  - Show real-time preview while customizing
  - Layout: form on left, preview on right (desktop)

#### Backend
- [ ] Update `/api/create` to accept:
  ```json
  {
    "text": "...",
    "font": "Inter",
    "text_color": "#000000",
    "bg_color": "#FFFFFF"
  }
  ```

- [ ] Update database schema:
  ```sql
  ALTER TABLE seenes ADD COLUMN font VARCHAR(50);
  ALTER TABLE seenes ADD COLUMN text_color VARCHAR(7);
  ALTER TABLE seenes ADD COLUMN bg_color VARCHAR(7);
  ```

#### Design
- [ ] Create predefined color palettes (5-6 combinations)
- [ ] Optimize UI for mobile

### Deliverables
✅ Customizable Seenes with fonts and colors
✅ Working live preview

---

## 🔗 PHASE 4 — Sharing Experience (Week 3)

### Goals
Improve sharing experience and social preview.

### Tasks

#### Sharing
- [ ] **Copy link button**
  - Clipboard API
  - Visual feedback (toast/notification)

- [ ] **QR Code generator**
  - Library: `qrcode` npm
  - Show QR after creation
  - Download QR as image

- [ ] **"Create another" button**
  - On view page
  - Redirect to home

#### Meta Tags (OpenGraph)
- [ ] Implement dynamic meta tags for social preview:
  ```html
  <meta property="og:title" content="Seene by..." />
  <meta property="og:description" content="[first 100 chars of text]" />
  <meta property="og:image" content="[screenshot or placeholder]" />
  ```

- [ ] Optional: generate dynamic OG image (Vercel OG Image)

#### Mobile Optimization
- [ ] Test on iOS Safari and Android Chrome
- [ ] Optimize touch targets
- [ ] Perfect responsive design

### Deliverables
✅ Easily shareable links with social preview
✅ Automatically generated QR codes
✅ Optimized mobile UX

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
- [ ] Install Vercel Analytics or Plausible
- [ ] Track:
  - Seenes created
  - Views
  - Shares

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

## 📊 Success Metrics

### MVP (End of PHASE 2)
- [x] 10 Seenes created (personal tests) ✅
- [x] Stable production deployment ✅
- [x] Zero critical errors ✅

### Post-Launch (1 month)
- [ ] 100+ Seenes created
- [ ] 500+ total views
- [ ] Positive user feedback

### Long-term (3 months)
- [ ] 1000+ active Seenes
- [ ] 5000+ views/month
- [ ] Mention on tech blogs/newsletters

---

## 💰 Budget & Costs

| Item | Provider | Cost/month | Notes |
|------|----------|------------|-------|
| Domain | Namecheap | ~$2 | .link TLD |
| Hosting | Vercel | Free-$20 | Depends on traffic |
| Database | Supabase | Free | Free tier OK for start |
| Analytics | Plausible | $9 | Optional |
| **Total** | — | **~$10-30** | Very low |

---

## 🛠️ Tech Stack Finale

- **Frontend**: Vue 3 + Vite + Tailwind CSS
- **Backend**: Vercel Serverless Functions (Node.js)
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Domain**: seene.link
- **Analytics**: Vercel Analytics / Plausible
- **Extras**: 
  - `nanoid` (ID generation)
  - `qrcode` (QR generation)
  - Google Fonts API

---

## 📝 Notes

- **Design philosophy**: Extreme minimalism, zero distractions
- **No login required**: Frictionless experience
- **Mobile-first**: Optimized for mobile sharing
- **Performance**: Fast by default (Vite + Vercel Edge)

---

**Last updated**: October 10, 2025
**Status**: MVP completed and live at https://seene.link
