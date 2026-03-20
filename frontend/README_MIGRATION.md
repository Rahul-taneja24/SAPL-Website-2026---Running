# SAPL Frontend — Migrated to Next.js

## What was migrated
React CRA → Next.js 14 App Router

## Setup Instructions

### 1. Install dependencies
```bash
yarn install
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
# Edit .env.local and add your FastAPI backend URL
```

### 3. Run locally
```bash
yarn dev
# Visit http://localhost:3000
```

### 4. Verify these URLs work
- http://localhost:3000/sitemap.xml
- http://localhost:3000/robots.txt  
- http://localhost:3000/llms.txt

### 5. Deploy to Vercel
Push to GitHub — Vercel will auto-detect Next.js and deploy.
Set these environment variables in Vercel dashboard:
- NEXT_PUBLIC_API_URL = your FastAPI backend URL

---

## What changed from the original

| File | Change |
|------|--------|
| `src/App.js` | Deleted — replaced by `app/layout.jsx` |
| `src/index.js` | Deleted — Next.js handles entry point |
| `craco.config.js` | Deleted — not needed |
| `src/context/AppContext.jsx` | NEW — holds region/quoteModal/adminToken state |
| `app/layout.jsx` | NEW — root layout with all providers |
| `app/*/page.jsx` | NEW — one per route, has SEO metadata |
| `app/sitemap.js` | NEW — auto-generates /sitemap.xml |
| `app/robots.js` | NEW — auto-generates /robots.txt |
| `public/llms.txt` | NEW — for AI crawlers |
| `next.config.js` | NEW — Next.js config |
| `package.json` | Updated — removed CRA deps, added next |
| All components | Added 'use client' directive |
| All pages | Removed SEOHead, added 'use client' |
| react-router-dom | Replaced with next/link + next/navigation |
| REACT_APP_* | Renamed to NEXT_PUBLIC_* |

---

## After going live — submit sitemap to Google
1. Go to Google Search Console
2. Add property: www.shankeragencies.com
3. Submit sitemap: https://www.shankeragencies.com/sitemap.xml
4. This triggers Google to index all your pages

