from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Depends, status
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorClient
import os
import httpx
from bson import ObjectId
from auth import require_admin

# NOTE: IndexNow key is a public submission key by design (it is also hosted at
# /<key>.txt on the site for verification), so it is not a secret.
INDEXNOW_KEY = "68c9e978104b40548276dada2151c101"
SITE_HOST = "www.shankeragencies.com"
SITE_BASE = f"https://{SITE_HOST}"

async def _submit_indexnow(urls: list[str]) -> None:
    """Fire-and-forget IndexNow submission — never raises."""
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            payload = {
                "host": SITE_HOST,
                "key": INDEXNOW_KEY,
                "keyLocation": f"{SITE_BASE}/{INDEXNOW_KEY}.txt",
                "urlList": urls,
            }
            await client.post("https://api.indexnow.org/indexnow", json=payload)
    except Exception:
        pass

# Create router
cms_router = APIRouter(prefix="/api", tags=["CMS"])

# Database Connection (Reusing environment variables)
MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")
# Note: In a real app, we might want to inject the db dependency, 
# but for quick integration we'll create a client if not passed or rely on the main app's db.
# For now, we'll assume we can access the db or create a new connection.
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# ============== MODELS ==============

class BlogPost(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: str
    author: str
    category: str
    tags: List[str]
    featured_image: Optional[str] = None
    meta_title: Optional[str] = Field(default=None, max_length=60)
    meta_description: Optional[str] = Field(default=None, max_length=155)
    status: str = "draft"
    published_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    views: int = 0
    language: str = "en"

class Product(BaseModel):
    name: str
    slug: str
    category: str
    subcategory: Optional[str] = None
    description: str
    short_description: str
    specifications: Dict[str, Any]
    applications: List[str]
    grades: List[str]
    images: List[str] = []
    featured_image: Optional[str] = None
    datasheet_url: Optional[str] = None
    meta_title: Optional[str] = Field(default=None, max_length=60)
    meta_description: Optional[str] = Field(default=None, max_length=155)
    status: str = "active"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    language: str = "en"

class IndustryPage(BaseModel):
    name: str
    slug: str
    description: str
    content: str
    applications: List[Dict[str, str]]
    recommended_products: List[str]
    featured_image: Optional[str] = None
    gallery_images: List[str] = []
    case_studies: List[Dict[str, Any]] = []
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    status: str = "active"
    language: str = "en"

class CaseStudy(BaseModel):
    title: str
    slug: str
    client: str
    industry: str
    challenge: str
    solution: str
    results: Dict[str, Any]
    content: str
    featured_image: Optional[str] = None
    gallery_images: List[str] = []
    testimonial: Optional[Dict[str, str]] = None
    status: str = "draft"
    published_at: Optional[datetime] = None
    language: str = "en"

class MediaFile(BaseModel):
    filename: str
    original_name: str
    path: str
    url: str
    mime_type: str
    size: int
    alt_text: Optional[str] = None
    folder: str = "general"
    uploaded_by: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# ============== ROUTES ==============

# Blog Routes
@cms_router.get("/blog/posts", response_model=List[Dict[str, Any]])
async def get_blog_posts(status: Optional[str] = None, category: Optional[str] = None, language: str = "en", limit: int = 50, skip: int = 0):
    query = {"language": language}
    if status: query["status"] = status
    if category: query["category"] = category
    cursor = db.blog_posts.find(query).sort("created_at", -1).skip(skip).limit(limit)
    posts = await cursor.to_list(length=limit)
    for post in posts: post["_id"] = str(post["_id"])
    return posts

@cms_router.get("/blog/posts/{slug}", response_model=Dict[str, Any])
async def get_blog_post(slug: str, language: str = "en"):
    post = await db.blog_posts.find_one({"slug": slug, "language": language})
    if not post: raise HTTPException(status_code=404, detail="Blog post not found")
    post["_id"] = str(post["_id"])
    await db.blog_posts.update_one({"slug": slug}, {"$inc": {"views": 1}})
    return post

@cms_router.post("/blog/posts", status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin)])
async def create_blog_post(post: BlogPost):
    existing = await db.blog_posts.find_one({"slug": post.slug})
    if existing: raise HTTPException(status_code=400, detail="Slug already exists")
    result = await db.blog_posts.insert_one(post.dict())
    if post.status == "published":
        await _submit_indexnow([f"{SITE_BASE}/blog/{post.slug}"])
    return {"message": "Blog post created", "id": str(result.inserted_id), "slug": post.slug}

@cms_router.put("/blog/posts/{post_id}", dependencies=[Depends(require_admin)])
async def update_blog_post(post_id: str, post: BlogPost):
    try: object_id = ObjectId(post_id)
    except: raise HTTPException(status_code=400, detail="Invalid ID")
    post_dict = post.dict()
    post_dict["updated_at"] = datetime.now(timezone.utc)
    result = await db.blog_posts.update_one({"_id": object_id}, {"$set": post_dict})
    if result.matched_count == 0: raise HTTPException(status_code=404, detail="Post not found")
    if post.status == "published":
        await _submit_indexnow([f"{SITE_BASE}/blog/{post.slug}"])
    return {"message": "Blog post updated"}

@cms_router.delete("/blog/posts/{post_id}", dependencies=[Depends(require_admin)])
async def delete_blog_post(post_id: str):
    try: object_id = ObjectId(post_id)
    except: raise HTTPException(status_code=400, detail="Invalid ID")
    result = await db.blog_posts.delete_one({"_id": object_id})
    if result.deleted_count == 0: raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Blog post deleted"}

# Product Routes
@cms_router.get("/products", response_model=List[Dict[str, Any]])
async def get_products(category: Optional[str] = None, status: str = "active", language: str = "en", limit: int = 100, skip: int = 0):
    query = {"status": status, "language": language}
    if category: query["category"] = category
    cursor = db.products.find(query).sort("name").skip(skip).limit(limit)
    products = await cursor.to_list(length=limit)
    for p in products: p["_id"] = str(p["_id"])
    return products

@cms_router.get("/products/{slug}", response_model=Dict[str, Any])
async def get_product(slug: str, language: str = "en"):
    product = await db.products.find_one({"slug": slug, "language": language})
    if not product: raise HTTPException(status_code=404, detail="Product not found")
    product["_id"] = str(product["_id"])
    return product

@cms_router.post("/products", status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin)])
async def create_product(product: Product):
    existing = await db.products.find_one({"slug": product.slug})
    if existing: raise HTTPException(status_code=400, detail="Slug already exists")
    result = await db.products.insert_one(product.dict())
    return {"message": "Product created", "id": str(result.inserted_id), "slug": product.slug}

@cms_router.put("/products/{product_id}", dependencies=[Depends(require_admin)])
async def update_product(product_id: str, product: Product):
    try: object_id = ObjectId(product_id)
    except: raise HTTPException(status_code=400, detail="Invalid ID")
    product_dict = product.dict()
    product_dict["updated_at"] = datetime.now(timezone.utc)
    result = await db.products.update_one({"_id": object_id}, {"$set": product_dict})
    if result.matched_count == 0: raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product updated"}

@cms_router.delete("/products/{product_id}", dependencies=[Depends(require_admin)])
async def delete_product(product_id: str):
    try: object_id = ObjectId(product_id)
    except: raise HTTPException(status_code=400, detail="Invalid ID")
    result = await db.products.delete_one({"_id": object_id})
    if result.deleted_count == 0: raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted"}

# Industry Routes
@cms_router.get("/industries", response_model=List[Dict[str, Any]])
async def get_industries(language: str = "en"):
    cursor = db.industries.find({"language": language}).sort("name")
    industries = await cursor.to_list(length=50)
    for i in industries: i["_id"] = str(i["_id"])
    return industries

@cms_router.post("/industries", status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin)])
async def create_industry(industry: IndustryPage):
    existing = await db.industries.find_one({"slug": industry.slug})
    if existing: raise HTTPException(status_code=400, detail="Slug already exists")
    result = await db.industries.insert_one(industry.dict())
    return {"message": "Industry created", "id": str(result.inserted_id)}

@cms_router.put("/industries/{industry_id}", dependencies=[Depends(require_admin)])
async def update_industry(industry_id: str, industry: IndustryPage):
    try: object_id = ObjectId(industry_id)
    except: raise HTTPException(status_code=400, detail="Invalid ID")
    result = await db.industries.update_one({"_id": object_id}, {"$set": industry.dict()})
    if result.matched_count == 0: raise HTTPException(status_code=404, detail="Industry not found")
    return {"message": "Industry updated"}

# Case Study Routes
@cms_router.get("/case-studies", response_model=List[Dict[str, Any]])
async def get_case_studies(language: str = "en", limit: int = 50):
    cursor = db.case_studies.find({"language": language}).sort("published_at", -1).limit(limit)
    studies = await cursor.to_list(length=limit)
    for s in studies: s["_id"] = str(s["_id"])
    return studies

@cms_router.post("/case-studies", status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin)])
async def create_case_study(study: CaseStudy):
    existing = await db.case_studies.find_one({"slug": study.slug})
    if existing: raise HTTPException(status_code=400, detail="Slug already exists")
    result = await db.case_studies.insert_one(study.dict())
    return {"message": "Case study created", "id": str(result.inserted_id)}

@cms_router.put("/case-studies/{study_id}", dependencies=[Depends(require_admin)])
async def update_case_study(study_id: str, study: CaseStudy):
    try: object_id = ObjectId(study_id)
    except: raise HTTPException(status_code=400, detail="Invalid ID")
    result = await db.case_studies.update_one({"_id": object_id}, {"$set": study.dict()})
    if result.matched_count == 0: raise HTTPException(status_code=404, detail="Case study not found")
    return {"message": "Case study updated"}

# Media Routes
@cms_router.post("/media/upload", dependencies=[Depends(require_admin)])
async def upload_media(file: UploadFile = File(...), folder: str = Form("general"), alt_text: Optional[str] = Form(None)):
    import re
    import uuid as _uuid

    _ALLOWED_EXT = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".pdf"}
    _MAX_BYTES = 5 * 1024 * 1024  # 5 MB
    _ALLOWED_MIME = {
        ".jpg": {"image/jpeg"}, ".jpeg": {"image/jpeg"}, ".png": {"image/png"},
        ".gif": {"image/gif"}, ".webp": {"image/webp"},
        ".svg": {"image/svg+xml", "text/plain", "text/xml", "application/xml"},
        ".pdf": {"application/pdf"},
    }

    # Sanitise folder to a single safe path segment (prevents ../ traversal).
    safe_folder = re.sub(r"[^A-Za-z0-9_-]", "", folder or "general") or "general"

    # Validate extension from the client filename, but never trust the filename
    # itself for the stored path — generate a uuid name.
    ext = os.path.splitext(file.filename or "")[1].lower()
    if ext not in _ALLOWED_EXT:
        raise HTTPException(status_code=400, detail=f"File type not allowed. Allowed: {', '.join(sorted(_ALLOWED_EXT))}")

    content = await file.read()
    if len(content) > _MAX_BYTES:
        raise HTTPException(status_code=413, detail="File too large (max 5 MB).")

    # Verify real content type from the bytes (SVG exempt — it is text/XML).
    if ext != ".svg":
        try:
            import magic
            detected = magic.from_buffer(content, mime=True)
        except Exception:
            detected = None
        if detected is not None and detected not in _ALLOWED_MIME[ext]:
            raise HTTPException(status_code=400, detail="File content does not match its extension.")

    try:
        upload_dir = f"uploads/{safe_folder}"
        os.makedirs(upload_dir, exist_ok=True)
        filename = f"{_uuid.uuid4()}{ext}"
        file_path = f"{upload_dir}/{filename}"

        with open(file_path, "wb") as buffer:
            buffer.write(content)

        media_file = MediaFile(
            filename=filename, original_name=file.filename, path=file_path,
            url=f"/uploads/{safe_folder}/{filename}", mime_type=file.content_type,
            size=len(content), alt_text=alt_text, folder=safe_folder, uploaded_by="admin"
        )
        result = await db.media_files.insert_one(media_file.dict())
        return {"message": "File uploaded", "url": media_file.url, "id": str(result.inserted_id)}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@cms_router.get("/media")
async def get_media_files(folder: Optional[str] = None, limit: int = 100):
    query = {}
    if folder: query["folder"] = folder
    cursor = db.media_files.find(query).sort("created_at", -1).limit(limit)
    files = await cursor.to_list(length=limit)
    for f in files: f["_id"] = str(f["_id"])
    return files

@cms_router.delete("/media/{file_id}", dependencies=[Depends(require_admin)])
async def delete_media(file_id: str):
    try: object_id = ObjectId(file_id)
    except: raise HTTPException(status_code=400, detail="Invalid ID")
    file_info = await db.media_files.find_one({"_id": object_id})
    if not file_info: raise HTTPException(status_code=404, detail="File not found")
    try: 
        if os.path.exists(file_info["path"]): os.remove(file_info["path"])
    except: pass
    await db.media_files.delete_one({"_id": object_id})
    return {"message": "File deleted"}

# Translations
@cms_router.get("/translations/{language}")
async def get_translations(language: str):
    trans = await db.translations.find_one({"language": language})
    if not trans: return {}
    trans["_id"] = str(trans["_id"])
    return trans

@cms_router.post("/translations/{language}", dependencies=[Depends(require_admin)])
async def update_translations(language: str, translations: Dict[str, str]):
    await db.translations.update_one(
        {"language": language},
        {"$set": {"translations": translations, "updated_at": datetime.now(timezone.utc)}},
        upsert=True
    )
    return {"message": "Translations updated"}
