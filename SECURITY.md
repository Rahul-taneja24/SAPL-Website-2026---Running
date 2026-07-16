# Security Policy & Deployment Notes — Shanker Agencies

## Reporting a vulnerability

Email **info@shankeragencies.com** with details. Please allow reasonable time
for a fix before public disclosure. See also `/.well-known/security.txt`.

## Architecture & current posture

- **Frontend** (`frontend/`) — Next.js 14, deployed on Vercel. This is the only
  publicly deployed component. It ships strong security headers (CSP with
  `frame-ancestors 'none'`, HSTS preload, `X-Content-Type-Options: nosniff`,
  `X-Frame-Options`, Referrer-Policy, Permissions-Policy) via
  `frontend/next.config.js`.
- **Backend** (`backend/`) — FastAPI + MongoDB CMS/admin. **Not currently
  deployed** and not reachable from the live site (the frontend has no
  `NEXT_PUBLIC_API_URL` set in production, so nothing calls it).
- Public forms (RFQ, contact, quick-quote) submit client-side to **Web3Forms**,
  not to this backend. No customer PII is stored by the live site.

## ⚠️ Before deploying the backend publicly

The backend was hardened so it is **secure by default**, but you MUST still:

1. **Set `ADMIN_API_TOKEN`** to a strong random value. Admin/CMS/lead routes are
   **fail-closed**: with no token set, every guarded route returns 503. Generate:
   `python -c "import secrets; print(secrets.token_urlsafe(48))"`
   Clients call admin routes with `Authorization: Bearer <token>`.
2. **Set `CORS_ORIGINS`** to your real origins (comma-separated). The wildcard
   `*` is no longer used.
3. **Provide real secrets** via a secret manager / host env vars — never commit
   `.env`. Use `backend/.env.example` as the template.
4. Serve behind HTTPS and add a reverse-proxy rate limiter on `/api/*`.
5. Consider disabling FastAPI's interactive docs (`/docs`, `/redoc`) in prod.
6. If you ever wire the frontend to this backend, note that blog/CMS HTML is
   rendered via `dangerouslySetInnerHTML`; sanitize any non-trusted HTML server
   side before storing, to avoid stored XSS.

## What is protected

- **All `/api/admin/*` routes** (CRUD, media upload, leads/PII) require
  `require_admin` (see `backend/auth.py`).
- **All CMS write routes** (`POST`/`PUT`/`DELETE` on blog, products, industries,
  case-studies, media, translations) require `require_admin`. Public read
  (`GET`) routes remain open so the site can fetch content.
- **Lead (PII) routes** in `server.py` (`GET`/`PATCH`/`DELETE /api/leads`,
  stats) require `require_admin`. Public form-submission routes
  (`POST /api/contact`, `POST /api/quote`) remain open by design.
- **File uploads** (both `admin_routes.py` and `cms_routes.py`) enforce an
  extension allowlist, a 5 MB size cap, real content-type verification via
  `python-magic`, a generated UUID filename, and folder-name sanitization
  (prevents path traversal).

## Secrets

No secret has ever been committed to git (verified across full history).
`.env*`, `.vercel/` are gitignored. The tracked `backend/.env` values are
placeholders only — there are no real credentials to rotate.
