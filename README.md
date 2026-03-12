# 📄 Resume Builder

A full-stack resume builder web app with AI-powered content generation, live preview, multiple templates, and one-click PDF export.

![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4-teal) ![Supabase](https://img.shields.io/badge/Supabase-Database-green)

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

### AI Assistance (Claude API)
- **Generate Summary** — writes a 3-sentence professional summary based on your role and skills
- **Improve Experience** — rewrites job descriptions with stronger action verbs and impact framing
- **Suggest Skills** — returns 10 relevant skills as clickable chips based on your job title
- All AI suggestions shown inline with "Use This" / "Dismiss" — nothing overwrites without confirmation

### PDF Export
- Uses `html2pdf.js` for pixel-perfect WYSIWYG output
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
| AI | Anthropic Claude API (`claude-sonnet-4-20250514`) |
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
│   ├── claude.ts                  # AI feature functions
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
git clone https://github.com/amith1315/resume-builder.git
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

### 4. Configure environment variables
Create a `.env` file in the project root:
```
VITE_ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxx
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🔑 API Information

### Anthropic Claude API
- **Endpoint:** `https://api.anthropic.com/v1/messages`
- **Model:** `claude-sonnet-4-20250514`
- **Used for:** Summary generation, experience improvement, skill suggestions
- **Docs:** [docs.anthropic.com](https://docs.anthropic.com)
- Get your API key at [console.anthropic.com](https://console.anthropic.com)

> ⚠️ In production, route AI calls through your own backend (`/api/claude`) to keep your API key server-side and out of the browser.

### Supabase
- **Used for:** Storing and retrieving resume data per anonymous user
- **Table:** `resumes` — stores full resume JSON with `user_id`, `created_at`, `updated_at`
- **Docs:** [supabase.com/docs](https://supabase.com/docs)
- Anonymous user IDs are generated on first visit and persisted in localStorage (`rb_uid`)

---

## 🌐 Deployment (Vercel)

```bash
npm install -g vercel
vercel --prod
```

Add environment variables in **Vercel → Project → Settings → Environment Variables**:
```
VITE_ANTHROPIC_API_KEY
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

---

## 📌 Assumptions Made

1. **No real auth** — users are identified by an anonymous ID stored in localStorage.
2. **No real payments** — the Premium upgrade is simulated.
3. **localStorage as cache** — acts as a fast offline fallback when Supabase is unavailable.
