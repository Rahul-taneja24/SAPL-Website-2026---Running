"""
Admin authentication dependency.

All state-changing / admin endpoints (create, update, delete, upload, and any
route that reads customer PII such as leads) must depend on `require_admin`.

Security model:
  - A single shared bearer token is read from the ADMIN_API_TOKEN environment
    variable and compared in constant time against the incoming
    `Authorization: Bearer <token>` header.
  - FAIL CLOSED: if ADMIN_API_TOKEN is unset or empty, every guarded route is
    denied (503). This prevents an accidental deploy from exposing admin routes
    with no token configured.

This is intentionally minimal (single-operator CMS). If multi-user auth is
needed later, replace this with JWT/session logic — bcrypt/pyjwt/passlib are
already in requirements.txt.
"""
import os
import secrets

from fastapi import Header, HTTPException, status


def require_admin(authorization: str | None = Header(default=None)) -> None:
    """FastAPI dependency that enforces a valid admin bearer token."""
    expected = os.environ.get("ADMIN_API_TOKEN", "")

    # Fail closed: no token configured => no admin access at all.
    if not expected:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Admin API is not configured (ADMIN_API_TOKEN unset).",
        )

    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or malformed Authorization header.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    provided = authorization.split(" ", 1)[1].strip()

    # Constant-time comparison to avoid timing side channels.
    if not secrets.compare_digest(provided, expected):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin token.",
            headers={"WWW-Authenticate": "Bearer"},
        )
