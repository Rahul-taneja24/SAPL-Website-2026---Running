# Shanker Agencies Website - PRD

## Company Overview
**SHANKER AGENCIES PVT. LTD.** - India's premier refractory engineering partner since 1980, serving steel, cement, aluminum, glass, petrochemical, and power industries globally.

- **Address**: 553, Main G.T Road, Shahdara, Delhi 110032, India
- **Phone**: +91 9899957888, +91 9811909394
- **Email**: info@shankeragencies.com
- **Website**: www.shankeragencies.com

---

## Tech Stack
- **Frontend**: React 18, Tailwind CSS, Shadcn UI
- **Backend**: FastAPI (Python), MongoDB
- **Build**: CRACO
- **Icons**: Lucide React
- **Email**: Resend (optional)

---

## Latest Session Updates (Feb 9, 2026)

### 1. Design System Overhaul ✅
- **Removed dark mode toggle** - Light-only theme for consistent design
- **Fixed glassmorphism** - Solid white backgrounds with subtle shadows
- **Updated gradient-dark** - Blue gradient (#1E3A5F → #1E40AF → #3B82F6)
- **Fixed milestones section** - Better visibility on blue backgrounds
- **Improved stats cards** - White text, semi-transparent backgrounds

### 2. Backend APIs ✅
Created comprehensive backend with:
- `POST /api/contact` - Contact form submission
- `POST /api/quote` - Quote request submission  
- `GET /api/leads` - List all leads
- `GET /api/leads/{id}` - Get single lead
- `PATCH /api/leads/{id}` - Update lead status
- `DELETE /api/leads/{id}` - Delete lead
- `GET /api/leads/stats/summary` - Lead statistics

Features:
- MongoDB storage
- Email notifications via Resend (configurable)
- Lead status tracking (new, contacted, qualified, etc.)
- Source tracking (website, whatsapp, phone, etc.)

### 3. Frontend Form Integration ✅
- Contact page submits to `/api/contact`
- Quick Quote modal submits to `/api/quote`
- Success messages and toast notifications
- Loading states and error handling

### 4. Industry-Specific Landing Pages ✅
Created 6 dedicated pages at `/solutions/{industry}`:
- Steel, Cement, Aluminum, Glass, Petrochemical, Power
- Each with hero images, stats, applications, products

### 5. Mobile Responsive ✅
- Hamburger menu on mobile
- Responsive typography
- Touch-friendly buttons
- Proper spacing

---

## File Structure

```
/app
├── backend/
│   ├── server.py          # FastAPI with leads API
│   ├── requirements.txt
│   └── tests/
│       └── test_leads_api.py
│
└── frontend/src/
    ├── components/
    │   ├── Navbar.jsx         # No dark mode toggle
    │   ├── Footer.jsx
    │   ├── ScrollToTop.jsx
    │   ├── QuickQuoteModal.jsx  # API integrated
    │   └── ui/
    ├── data/
    │   ├── productFamiliesData.js
    │   └── industrySolutionsData.js
    ├── pages/
    │   ├── Home.jsx
    │   ├── About.jsx          # Fixed milestones
    │   ├── Products.jsx
    │   ├── Contact.jsx        # API integrated
    │   ├── IndustrySolutions.jsx
    │   ├── Blog.jsx
    │   └── CompanyProfile.jsx
    ├── App.js
    └── index.css              # Light mode only
```

---

## API Endpoints

### Contact Form
```bash
POST /api/contact
{
  "name": "John Smith",
  "email": "john@company.com",
  "phone": "+91 9999999999",
  "company": "ABC Industries",
  "industry": "Steel",
  "inquiry_type": "general",
  "message": "Inquiry about castables"
}
```

### Quote Request
```bash
POST /api/quote
{
  "name": "John Smith",
  "email": "john@company.com",
  "phone": "+91 9999999999",
  "company": "ABC Steel",
  "industry": "Steel",
  "products": ["High Alumina Bricks", "LCC Castables"],
  "quantity": "50 MT",
  "application": "Ladle lining"
}
```

### Leads Management
```bash
GET /api/leads                    # List all leads
GET /api/leads/{id}               # Get single lead
PATCH /api/leads/{id}             # Update status/notes
DELETE /api/leads/{id}            # Delete lead
GET /api/leads/stats/summary      # Statistics
```

---

## Testing Results

### Iteration 5 (Feb 9, 2026)
- **Backend**: 100% (18/18 tests passed)
- **Frontend**: 100% (all features verified)

Verified:
- Dark mode toggle removed
- APIs working (contact, quote, leads)
- Mobile responsive
- Glassmorphism contrast
- Milestones visibility

---

## Key Routes

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/about` | About Us |
| `/solutions` | All Industry Solutions |
| `/solutions/steel` | Steel Industry |
| `/solutions/cement` | Cement Industry |
| `/solutions/aluminum` | Aluminum Industry |
| `/solutions/glass` | Glass Industry |
| `/solutions/petrochemical` | Petrochemical |
| `/solutions/power` | Power Industry |
| `/products` | Product Catalog |
| `/company-profile` | Downloadable Profile |
| `/blog` | Technical Blog |
| `/contact` | Contact Form |

---

## Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
RESEND_API_KEY=optional_for_email
ADMIN_EMAIL=info@shankeragencies.com
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://...
```

---

## Backlog

### Completed ✅
- [x] Multi-level Products page
- [x] Industry landing pages
- [x] Remove dark mode
- [x] Fix design flaws
- [x] Backend APIs for leads
- [x] Contact form integration
- [x] Mobile responsive
- [x] Company Profile page

### P1 - Next
- [ ] Individual product detail pages (SEO)
- [ ] Google Sheets integration for leads
- [ ] Email notification setup with Resend API key
- [ ] Industry case studies

### P2 - Future
- [ ] Admin dashboard for leads
- [ ] Technical data sheets PDFs
- [ ] Multi-language support

---

## Preview URL
https://refractory-portal.preview.emergentagent.com
