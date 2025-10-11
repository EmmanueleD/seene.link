<div align="center">
  <img src="public/logo.png" alt="Seene.link Logo" width="200">
  
  # Seene.link
  
  > Create and share personalized text pages with a single link. No login required.
  
  ![Status](https://img.shields.io/badge/status-live-brightgreen)
  ![License](https://img.shields.io/badge/license-ISC-blue)
</div>

**🎉 Live at [seene.link](https://seene.link)**

## 🎯 What is Seene.link?

Seene.link is a minimalist web app that lets you instantly create and share beautiful, customizable text pages. Perfect for:

- 📝 Sharing quotes or thoughts
- 🎤 Event slogans and presentations  
- 💭 Mood pages
- ✨ Micro-poetry
- 🔗 Clean links for bios and chats
- 🎨 Personalized messages with custom fonts and colors

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/EmmanueleD/seene.link.git
   cd seene.link
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Supabase credentials in `.env`:
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   BASE_URL=http://localhost:5173
   ```

4. **Setup Supabase database**
   
   Run this SQL in your Supabase SQL editor:
   ```sql
   CREATE TABLE seenes (
     id TEXT PRIMARY KEY,
     text TEXT NOT NULL,
     font TEXT DEFAULT 'Judson',
     text_color TEXT DEFAULT '#111827',
     gradient_start TEXT DEFAULT '#ffffff',
     gradient_end TEXT DEFAULT '#f3f4f6',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- Enable Row Level Security
   ALTER TABLE seenes ENABLE ROW LEVEL SECURITY;
   
   -- Allow public read access
   CREATE POLICY "Allow public read access" ON seenes
     FOR SELECT USING (true);
   
   -- Allow public insert access
   CREATE POLICY "Allow public insert access" ON seenes
     FOR INSERT WITH CHECK (true);
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🛠️ Tech Stack

- **Frontend**: Vue 3 + Vite + Tailwind CSS
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **ID Generation**: nanoid

## 📁 Project Structure

```
seene.link/
├── api/                    # Vercel Serverless Functions
│   ├── create.js          # POST /api/create - Create new Seene
│   └── get.js             # GET /api/get?id=xxx - Fetch Seene
├── src/
│   ├── views/             # Vue pages
│   │   ├── Home.vue       # Home page with form
│   │   └── View.vue       # Seene display page
│   ├── App.vue            # Root component
│   ├── main.js            # App entry point
│   └── style.css          # Global styles + Tailwind
├── public/                # Static assets
├── index.html             # HTML entry point
├── vercel.json            # Vercel configuration
├── vite.config.js         # Vite configuration
├── postcss.config.js      # PostCSS configuration
├── supabase-setup.sql     # Database schema
└── ROADMAP.md             # Development roadmap
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Testing with Vercel Functions

To test API endpoints locally:
```bash
vercel dev
```

### API Endpoints

#### POST `/api/create`
Create a new Seene.

**Request body:**
```json
{
  "text": "Your text here",
  "font": "Judson",
  "text_color": "#111827",
  "gradient_start": "#ffffff",
  "gradient_end": "#f3f4f6"
}
```

**Response:**
```json
{
  "id": "abc12345",
  "url": "https://seene.link/abc12345"
}
```

#### GET `/api/get?id=xxx`
Retrieve a Seene by ID.

**Response:**
```json
{
  "id": "abc12345",
  "text": "Your text here",
  "font": "Judson",
  "text_color": "#111827",
  "gradient_start": "#ffffff",
  "gradient_end": "#f3f4f6",
  "created_at": "2025-10-10T17:30:00Z"
}
```

## 🚢 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set environment variables in Vercel dashboard**
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `BASE_URL`

5. **Connect your domain**
   - Go to Vercel dashboard → Settings → Domains
   - Add `seene.link`

## 📋 Roadmap

See [ROADMAP.md](./ROADMAP.md) for detailed development plan.

### ✅ Completed Features
- [x] Project setup & deployment
- [x] Beautiful WYSIWYG editor (What You See Is What You Get)
- [x] API endpoints (/api/create, /api/get)
- [x] Supabase integration
- [x] Domain connected (seene.link)
- [x] **Font customization** - 5 curated fonts + custom Google Fonts support
- [x] **Color pickers** - Text color & gradient background
- [x] **Click-to-toggle controls** - Clean, immersive UX
- [x] **Live preview** - See changes in real-time
- [x] **Auto-resize textarea** - Adapts to content
- [x] **Line breaks preservation** - Formatting maintained
- [x] **Responsive design** - Works on all devices
- [x] Vercel Analytics integrated
- [x] SEO meta tags (OpenGraph, Twitter Card)

### 🎨 Customization Features
- **6 Curated Fonts**: Judson (default), Inter, Playfair Display, Space Mono, Crimson Text, Roboto Mono
- **Custom Google Fonts**: Load any font from Google Fonts library
- **Text Color Picker**: Full color customization with hex preview
- **Gradient Background**: Two-color gradient with visual preview
- **Real-time Preview**: See exactly how your Seene will look

### 🔜 Future Ideas
- [ ] QR code generation
- [ ] Public gallery
- [ ] Rate limiting & bot protection
- [ ] Analytics dashboard

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Local Development

1. Clone the repo
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and add your Supabase credentials
4. Run dev server: `npm run dev`
5. Test API with: `vercel dev`

## 📄 License

ISC

## 🔗 Links

- **Website**: [seene.link](https://seene.link) ✅ LIVE
- **GitHub**: [github.com/EmmanueleD/seene.link](https://github.com/EmmanueleD/seene.link)
- **Vercel**: [Dashboard](https://vercel.com/emmanueleds-projects/seene.link)

## 📊 Stats

- **Released**: October 10, 2025
- **Development time**: ~6 hours
- **Tech stack**: Vue 3, Vite, Tailwind CSS v4, Vercel, Supabase, Google Fonts API
- **Lines of code**: ~1200
- **Features**: Font customization, color pickers, WYSIWYG editor, custom fonts

---

Made with ❤️ for sharing words beautifully.
