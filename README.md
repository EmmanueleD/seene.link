# Seene.link 🌐

> Create and share personalized text pages with a single link. No login required.

![Status](https://img.shields.io/badge/status-in%20development-yellow)

## 🎯 What is Seene.link?

Seene.link is a minimalist web app that lets you instantly create and share beautiful text pages. Perfect for:

- 📝 Sharing quotes or thoughts
- 🎤 Event slogans and presentations  
- 💭 Mood pages
- ✨ Micro-poetry
- 🔗 Clean links for bios and chats

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/seene.link.git
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
├── tailwind.config.js     # Tailwind configuration
└── ROADMAP.md             # Development roadmap
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### API Endpoints

#### POST `/api/create`
Create a new Seene.

**Request body:**
```json
{
  "text": "Your text here"
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

### Current Status: Phase 1-2 (MVP)
- [x] Project setup
- [x] Basic UI (Home + View pages)
- [x] API endpoints structure
- [ ] Supabase integration
- [ ] End-to-end testing
- [ ] Production deployment

### Coming Soon
- [ ] Font customization
- [ ] Color pickers
- [ ] QR code generation
- [ ] Social preview (OpenGraph)
- [ ] Public gallery

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 🔗 Links

- **Website**: [seene.link](https://seene.link) (coming soon)
- **GitHub**: [github.com/yourusername/seene.link](https://github.com/yourusername/seene.link)

---

Made with ❤️ for sharing words beautifully.
