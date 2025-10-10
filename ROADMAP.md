# Seene.link — Development Roadmap

> **Progetto**: Micro web app per creare e condividere pagine personalizzate con un singolo testo
> **Stack**: Vue 3 + Vite + Tailwind + Vercel + Supabase
> **Inizio**: 10 Ottobre 2025

---

## 📍 Stato Attuale — ✅ MVP COMPLETATO!

**🎉 L'app è LIVE su https://seene.link**

- [x] Dominio registrato: `seene.link` ✅
- [x] Account Vercel attivo ✅
- [x] Account Supabase attivo ✅
- [x] Progetto inizializzato ✅
- [x] UI funzionante con Tailwind CSS v4 ✅
- [x] Database Supabase configurato ✅
- [x] API integrate con Supabase ✅
- [x] Deploy in produzione ✅
- [x] Dominio collegato ✅
- [x] **MVP funzionante end-to-end** ✅
- [ ] Repository GitHub

---

## 🎯 PHASE 1 — Setup (Giorno 1)

### Obiettivi
Creare la base tecnica del progetto e preparare l'ambiente di sviluppo.

### Tasks
- [ ] Creare repository GitHub `seene.link`
- [x] Inizializzare progetto Vue 3 + Vite ✅
- [x] Installare e configurare Tailwind CSS v4 ✅
- [x] Creare struttura cartelle ✅
- [x] Configurare Vercel (`vercel.json`) ✅
- [x] Configurare Supabase: ✅
  - [x] Creare progetto Supabase ✅
  - [x] Eseguire `supabase-setup.sql` ✅
  - [x] Creare file `.env` con credenziali ✅
- [x] Deploy su Vercel ✅
- [x] Collegare dominio `seene.link` ✅

### Deliverables
- [x] Progetto Vue 3 + Vite funzionante ✅
- [x] Tailwind CSS configurato ✅
- [x] Struttura base creata ✅
- [x] Database Supabase configurato ✅
- [x] Deploy su Vercel ✅

**✅ PHASE 1 COMPLETATA — 10 Ottobre 2025**

---

## 🚀 PHASE 2 — MVP (Settimana 1)

### Obiettivi
Implementare il flusso base: creare un Seene e visualizzarlo.

### Tasks

#### Frontend
- [x] **Home page** (`/`) ✅
  - [x] Textarea per inserire testo
  - [x] Bottone "Create Seene"
  - [x] Design minimalista (centrato, spazi bianchi)
  - [x] Contatore caratteri (max 500)
  - [x] Messaggio successo con link
  - [x] Bottone "Copy link"
  
- [x] **Pagina visualizzazione** (`/:id`) ✅
  - [x] Mostra testo centrato a schermo
  - [x] Gestione errori (404 se non esiste)
  - [x] Loading state
  - [x] Bottone "Create your own"

- [x] **Routing** ✅
  - [x] Setup Vue Router
  - [x] Route: `/` (home) e `/:id` (view)

#### Backend (Vercel Functions)
- [x] **`/api/create`** (POST) ✅
  - [x] Riceve: `{ text }`
  - [x] Genera ID univoco (nanoid)
  - [x] Salva in Supabase
  - [x] Testato e funzionante ✅

- [x] **`/api/get`** (GET) ✅
  - [x] Riceve: `?id=xxx`
  - [x] Query Supabase
  - [x] Testato e funzionante ✅

#### Database
- [x] Schema SQL creato (`supabase-setup.sql`) ✅
- [x] Eseguito su Supabase ✅
- [x] Integrato nelle view Vue ✅

#### Integrazione
- [x] **API reali integrate** ✅
  - [x] `Home.vue` → chiama `/api/create` ✅
  - [x] `View.vue` → chiama `/api/get` ✅

### Test
- [x] UI funzionante in locale ✅
- [x] Creare un Seene con database reale ✅
- [x] Aprire il link generato e vedere il testo ✅
- [x] Testato su produzione (seene.link) ✅
- [x] Verificato salvataggio su Supabase ✅

### Deliverables
- [x] Flusso completo funzionante end-to-end ✅
- [x] Link condivisibili attivi (es. `seene.link/abc123`) ✅
- [x] App live su https://seene.link ✅

**✅ PHASE 2 COMPLETATA — 10 Ottobre 2025**

---

## 🎊 MVP RILASCIATO!

**Data rilascio**: 10 Ottobre 2025  
**URL**: https://seene.link  
**Tempo sviluppo**: ~2 ore  
**Status**: ✅ Funzionante e in produzione

### Funzionalità Live
- ✅ Creazione Seene con testo (max 500 caratteri)
- ✅ Generazione link univoco con nanoid
- ✅ Visualizzazione Seene con design minimalista
- ✅ Copy link con feedback
- ✅ Salvataggio persistente su Supabase
- ✅ Responsive mobile e desktop
- ✅ Gestione errori 404
- ✅ Loading states

---

## 🎨 PHASE 3 — Customization (Settimana 2)

### Obiettivi
Aggiungere opzioni di personalizzazione per font, colori e stile.

### Tasks

#### Frontend
- [ ] **Selettore font**
  - Integrare Google Fonts API
  - 5-8 font selezionati (es. Inter, Playfair, Mono, etc.)
  - Preview live

- [ ] **Color pickers**
  - Colore testo
  - Colore sfondo
  - Palette predefinite + custom

- [ ] **Live preview**
  - Mostrare anteprima in tempo reale mentre si customizza
  - Layout: form a sinistra, preview a destra (desktop)

#### Backend
- [ ] Aggiornare `/api/create` per accettare:
  ```json
  {
    "text": "...",
    "font": "Inter",
    "text_color": "#000000",
    "bg_color": "#FFFFFF"
  }
  ```

- [ ] Aggiornare schema database:
  ```sql
  ALTER TABLE seenes ADD COLUMN font VARCHAR(50);
  ALTER TABLE seenes ADD COLUMN text_color VARCHAR(7);
  ALTER TABLE seenes ADD COLUMN bg_color VARCHAR(7);
  ```

#### Design
- [ ] Creare palette colori predefinite (5-6 combinazioni)
- [ ] Ottimizzare UI per mobile

### Deliverables
✅ Seenes personalizzabili con font e colori
✅ Preview live funzionante

---

## 🔗 PHASE 4 — Sharing Experience (Settimana 3)

### Obiettivi
Migliorare l'esperienza di condivisione e social preview.

### Tasks

#### Sharing
- [ ] **Copy link button**
  - Clipboard API
  - Feedback visivo (toast/notification)

- [ ] **QR Code generator**
  - Libreria: `qrcode` npm
  - Mostrare QR dopo creazione
  - Download QR come immagine

- [ ] **"Create another" button**
  - Sulla pagina di visualizzazione
  - Redirect a home

#### Meta Tags (OpenGraph)
- [ ] Implementare meta tags dinamici per social preview:
  ```html
  <meta property="og:title" content="Seene by..." />
  <meta property="og:description" content="[prime 100 caratteri del testo]" />
  <meta property="og:image" content="[screenshot o placeholder]" />
  ```

- [ ] Opzionale: generare immagine OG dinamica (Vercel OG Image)

#### Mobile Optimization
- [ ] Test su iOS Safari e Android Chrome
- [ ] Ottimizzare touch targets
- [ ] Responsive design perfetto

### Deliverables
✅ Link facilmente condivisibili con preview social
✅ QR code generati automaticamente
✅ UX ottimizzata mobile

---

## 🎨 PHASE 5 — Branding & Landing (Settimana 4)

### Obiettivi
Creare identità visiva e landing page accattivante.

### Tasks

#### Branding
- [x] Logo minimalista (già fatto ✅)
- [ ] Favicon
- [ ] Color scheme principale

#### Landing Page
- [ ] **Hero section**
  - Headline chiara
  - Demo interattiva (crea un Seene direttamente)
  - CTA principale

- [ ] **Examples section**
  - 3-4 Seenes di esempio
  - Diversi stili/use cases

- [ ] **How it works**
  - 3 step semplici (Write → Customize → Share)

- [ ] **Footer**
  - Link GitHub
  - Credits
  - Privacy/Terms (opzionale)

#### Copy & Content
- [ ] Scrivere microcopy per UI
- [ ] Creare Seenes di esempio

### Deliverables
✅ Landing page completa e professionale
✅ Esempi dimostrativi live

---

## 🚀 PHASE 6 — Optimization & Launch

### Obiettivi
Ottimizzare performance, aggiungere analytics e lanciare pubblicamente.

### Tasks

#### Analytics
- [ ] Installare Vercel Analytics o Plausible
- [ ] Tracciare:
  - Seenes creati
  - Visualizzazioni
  - Condivisioni

#### Performance
- [ ] Lighthouse audit (target: 95+ su tutti i parametri)
- [ ] Implementare caching (Vercel Edge)
- [ ] Ottimizzare bundle size
- [ ] Lazy loading componenti

#### Testing
- [ ] Test cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Test mobile (iOS, Android)
- [ ] Test accessibilità (a11y)
- [ ] Gestione errori e edge cases

#### Launch
- [ ] Soft launch: condividere con amici/beta testers
- [ ] Raccogliere feedback
- [ ] Fix bug critici
- [ ] **Public launch**:
  - Post su Product Hunt
  - Tweet/thread su Twitter
  - Post su Reddit (r/SideProject, r/webdev)
  - Hacker News (Show HN)

### Deliverables
✅ App stabile e performante
✅ Analytics attivi
✅ Launch pubblico completato

---

## 🔮 Future Enhancements (Post-Launch)

Idee per iterazioni future:

- [ ] **Custom URL slugs** (`seene.link/yourtext`)
- [ ] **Expiring Seenes** (auto-delete dopo X giorni)
- [ ] **Templates/Themes** (preset stilistici)
- [ ] **Public gallery** (Seenes in evidenza)
- [ ] **Animazioni CSS** (fade, zoom, slide)
- [ ] **AI text enhancement** (suggerimenti poetici)
- [ ] **Embed widget** (incorporare Seenes in altri siti)
- [ ] **API pubblica** (per integrazioni)
- [ ] **Dark mode** (toggle tema)
- [ ] **Multi-language support**

---

## 📊 Metriche di Successo

### MVP (Fine PHASE 2)
- [ ] 10 Seenes creati (test personali)
- [ ] Deploy stabile su produzione
- [ ] Zero errori critici

### Post-Launch (1 mese)
- [ ] 100+ Seenes creati
- [ ] 500+ visualizzazioni totali
- [ ] Feedback positivo da utenti

### Long-term (3 mesi)
- [ ] 1000+ Seenes attivi
- [ ] 5000+ visualizzazioni/mese
- [ ] Menzione su blog/newsletter tech

---

## 💰 Budget & Costi

| Item | Provider | Costo/mese | Note |
|------|----------|------------|------|
| Dominio | Namecheap | ~$2 | .link TLD |
| Hosting | Vercel | Free-$20 | Dipende da traffico |
| Database | Supabase | Free | Tier gratuito OK per inizio |
| Analytics | Plausible | $9 | Opzionale |
| **Totale** | — | **~$10-30** | Molto basso |

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

## 📝 Note

- **Design philosophy**: Minimalismo estremo, zero distrazioni
- **No login required**: Esperienza frictionless
- **Mobile-first**: Ottimizzato per condivisione mobile
- **Performance**: Fast by default (Vite + Vercel Edge)

---

**Ultimo aggiornamento**: 10 Ottobre 2025
**Prossimo step**: Inizializzare progetto Vue 3 + Vite
