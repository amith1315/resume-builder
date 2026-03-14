# 📄 Resume Builder

A full-stack resume builder web app with AI-powered content generation, live preview, multiple templates, and one-click PDF export.

![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4-teal) ![Supabase](https://img.shields.io/badge/Supabase-Database-green) ![Groq](https://img.shields.io/badge/Groq-AI-orange)

---

## ✨ Features

### Resume Management
- Create, edit, and delete multiple resumes
- Auto-save on every keystroke
- Data persisted in Supabase (with localStorage cache for offline speed)
- Resumes survive browser refresh via URL hash routing

### Editor
- 3-column layout: Sidebar navigation · Form · Live preview
- 7 editable sections: Personal Info, Summary, Experience, Education, Skills, Projects, Certifications
- Section completion indicators (green dots when filled)
- Live preview updates instantly as you type

### Templates
| Template | Tier | Description |
|----------|------|-------------|
| **Nova** | Free | Two-column, blue header, sidebar for skills & education |
| **Slate** | Free | Single-column, bold black typography, editorial style |
| **Prism** | Premium | Two-column purple gradient, skill bars, avatar initials |

- Free templates available immediately
- Premium template unlocked via simulated one-time upgrade ($9.99)

### AI Assistance (Groq API — LLaMA 3.3 70B)
- **Generate Summary** - writes a 3 sentence professional summary based on your role and skills
- **Improve Experience** - rewrites job descriptions with stronger action verbs and impact framing
- **Suggest Skills** - returns 10 relevant skills as clickable chips based on your job title
- All AI suggestions shown inline with "Use This" / "Dismiss" — nothing overwrites without confirmation

### PDF Export
- Uses `html2pdf.js` for pixel perfect WYSIWYG output
- What you see in the live preview is exactly what you get in the PDF
- High resolution (2x scale), A4 format, color-accurate

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| AI | Groq API (`llama-3.3-70b-versatile`) |
| PDF Export | html2pdf.js (html2canvas + jsPDF) |
| Fonts | DM Sans, Playfair Display (Google Fonts) |
| Deployment | Vercel |

---

## 🗂 Project Structure

```
src/
├── main.tsx
├── App.tsx                        # Routing via URL hash
├── index.css                      # Tailwind v4 + @theme config
├── vite-env.d.ts                  # Vite env type declarations
│
├── lib/
│   ├── types.ts                   # All TypeScript interfaces
│   ├── db.ts                      # Supabase DB + localStorage cache
│   ├── groq.ts                    # AI feature functions (Groq API)
│   ├── pdf.ts                     # html2pdf download helper
│   └── supabase.ts                # Supabase client
│
├── constants/
│   └── templates.ts               # Template definitions + nav items
│
└── components/
    ├── ui/                        # Icon, Button, Toast, Modal
    ├── dashboard/                 # Dashboard, ResumeCard
    ├── editor/
    │   ├── Editor.tsx             # 3-column editor shell
    │   ├── SidebarNav.tsx
    │   └── sections/              # 8 section form components
    ├── preview/
    │   ├── ResumePreview.tsx
    │   └── templates/             # NovaTemplate, SlateTemplate, PrismTemplate
    └── upgrade/
        └── UpgradeModal.tsx
```

---

## 🚀 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/resume-builder.git
cd resume-builder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Supabase
1. Go to [supabase.com](https://supabase.com) and create a free project
2. Go to **SQL Editor** and run:

```sql
create table resumes (
  id          text primary key,
  user_id     text not null default 'anonymous',
  data        jsonb not null,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create index resumes_user_id_idx on resumes(user_id);

alter table resumes disable row level security;
```

3. Go to **Project Settings → API** and copy your Project URL and anon key

### 4. Get a Groq API key
1. Go to [console.groq.com](https://console.groq.com) and sign up for free
2. Go to **API Keys → Create API Key**
3. Copy the key

### 5. Configure environment variables
Create a `.env` file in the project root:
```
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxx
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 6. Run the development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🔑 API Information

### Groq API
- **Endpoint:** `https://api.groq.com/openai/v1/chat/completions`
- **Model:** `llama-3.3-70b-versatile`
- **Used for:** Summary generation, experience improvement, skill suggestions
- **Free tier:** 14,400 requests/day, 6,000 tokens/min
- **Docs:** [console.groq.com/docs](https://console.groq.com/docs)
- Get your free API key at [console.groq.com](https://console.groq.com)


### Supabase
- **Used for:** Storing and retrieving resume data per anonymous user
- **Table:** `resumes` — stores full resume JSON with `user_id`, `created_at`, `updated_at`
- Anonymous user IDs are generated on first visit and persisted in localStorage (`rb_uid`)

---

## 🌐 Deployment (Vercel)

```bash
npm install -g vercel
vercel --prod
```

Add environment variables in **Vercel → Project → Settings → Environment Variables**:
```
VITE_GROQ_API_KEY
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Redeploy after adding env vars:
```bash
vercel --prod
```

---

## 📌 Assumptions Made

1. **No real auth** — users are identified by an anonymous ID stored in localStorage.
2. **No real payment** — the Premium upgrade is simulated.
3. **localStorage as cache** — acts as a fast offline fallback when Supabase is unavailable.