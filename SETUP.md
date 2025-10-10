# Setup Guide — Seene.link

Guida rapida per configurare il progetto in locale e su Vercel.

---

## ✅ Completato (Phase 1)

- [x] Progetto Vue 3 + Vite + Tailwind inizializzato
- [x] Struttura cartelle creata
- [x] Home page con form funzionante (localStorage temporaneo)
- [x] Pagina di visualizzazione `/[id]`
- [x] API Vercel Functions (`/api/create` e `/api/get`)
- [x] Configurazione Vercel (`vercel.json`)
- [x] Schema SQL per Supabase pronto

---

## 🔧 Prossimi Step

### 1. Configurare Supabase

1. **Vai su [supabase.com](https://supabase.com)** e accedi
2. **Crea un nuovo progetto** (se non l'hai già fatto)
3. **Vai su SQL Editor** nel menu laterale
4. **Copia e incolla** il contenuto di `supabase-setup.sql`
5. **Esegui** lo script per creare la tabella `seenes`

### 2. Ottenere le credenziali Supabase

1. Nel tuo progetto Supabase, vai su **Settings** → **API**
2. Copia questi valori:
   - **Project URL** (es. `https://xxxxx.supabase.co`)
   - **anon/public key** (la chiave pubblica)

### 3. Creare file `.env`

Nella root del progetto, crea un file `.env`:

```bash
cp .env.example .env
```

Poi modifica `.env` con i tuoi valori:

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
BASE_URL=http://localhost:5173
```

### 4. Integrare le API reali

Attualmente l'app usa `localStorage` per demo. Dobbiamo sostituirlo con le chiamate API reali.

**File da modificare:**
- `src/views/Home.vue` → sostituire `createSeene()` con chiamata a `/api/create`
- `src/views/View.vue` → sostituire fetch da localStorage con chiamata a `/api/get`

### 5. Testare in locale

```bash
npm run dev
```

Apri [http://localhost:5173](http://localhost:5173) e testa:
1. Crea un Seene
2. Copia il link
3. Apri il link in una nuova tab
4. Verifica che il testo sia visualizzato

### 6. Deploy su Vercel

#### Opzione A: Via CLI

```bash
# Installa Vercel CLI (se non l'hai già)
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

#### Opzione B: Via GitHub + Vercel Dashboard

1. **Crea repository GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Seene.link MVP"
   git branch -M main
   git remote add origin https://github.com/tuousername/seene.link.git
   git push -u origin main
   ```

2. **Vai su [vercel.com](https://vercel.com)**
3. **Import Project** → Seleziona il tuo repo GitHub
4. **Configure Project**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Environment Variables**: Aggiungi le stesse variabili del file `.env`
6. **Deploy**

### 7. Collegare il dominio

1. Nel dashboard Vercel, vai su **Settings** → **Domains**
2. Aggiungi `seene.link`
3. Segui le istruzioni per configurare i DNS

---

## 🧪 Test Checklist

Prima del deploy in produzione, verifica:

- [ ] Creare un Seene dalla home
- [ ] Il link generato funziona
- [ ] Il testo viene visualizzato correttamente
- [ ] Il bottone "Copy" funziona
- [ ] La pagina 404 appare per ID inesistenti
- [ ] Design responsive su mobile
- [ ] Nessun errore in console

---

## 📦 Struttura File Creati

```
seene.link/
├── api/
│   ├── create.js              ✅ API per creare Seene
│   └── get.js                 ✅ API per recuperare Seene
├── src/
│   ├── views/
│   │   ├── Home.vue           ✅ Pagina home con form
│   │   └── View.vue           ✅ Pagina visualizzazione
│   ├── App.vue                ✅ Root component
│   ├── main.js                ✅ Entry point + router
│   └── style.css              ✅ Tailwind + global styles
├── public/                    ✅ (vuota per ora)
├── index.html                 ✅ HTML entry
├── package.json               ✅ Dependencies
├── vite.config.js             ✅ Vite config
├── tailwind.config.js         ✅ Tailwind config
├── postcss.config.js          ✅ PostCSS config
├── vercel.json                ✅ Vercel config
├── supabase-setup.sql         ✅ Database schema
├── .env.example               ✅ Environment template
├── .gitignore                 ✅ Git ignore rules
├── README.md                  ✅ Project documentation
├── ROADMAP.md                 ✅ Development roadmap
└── SETUP.md                   ✅ This file
```

---

## 🐛 Troubleshooting

### Il server non parte
```bash
# Reinstalla dipendenze
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Errori Tailwind
```bash
# Verifica che PostCSS sia configurato
cat postcss.config.js
cat tailwind.config.js
```

### API non funzionano in locale
Le Vercel Functions non girano in locale con `vite dev`. Opzioni:
1. Usa `vercel dev` invece di `npm run dev`
2. Oppure testa le API dopo il deploy su Vercel

### Errori Supabase
- Verifica che le variabili `.env` siano corrette
- Controlla che la tabella `seenes` esista
- Verifica le policy RLS (Row Level Security)

---

## 📞 Supporto

Se hai problemi, controlla:
1. Console del browser (F12)
2. Terminal dove gira `npm run dev`
3. Vercel logs (se deployato)

---

**Ultimo aggiornamento**: 10 Ottobre 2025
