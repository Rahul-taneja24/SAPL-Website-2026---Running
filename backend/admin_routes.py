"""
Admin CRUD API Routes
Complete management endpoints for blog posts, products, industries, media, and leads
"""
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from typing import List, Optional
import os
import uuid
from pathlib import Path
from models import (
    BlogPostCreate, BlogPostUpdate,
    ProductCreate, ProductUpdate,
    IndustryCreate, IndustryUpdate,
    LeadUpdate
)

router = APIRouter(prefix="/api/admin", tags=["admin"])

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/")
DB_NAME = os.getenv("DB_NAME", "sapl_website")
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# Upload directory
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# ==================== BLOG POSTS ====================

@router.get("/posts")
async def list_posts(skip: int = 0, limit: int = 100, category: Optional[str] = None, published: Optional[bool] = None):
    """List all blog posts with optional filtering"""
    query = {}
    if category:
        query["category"] = category
    if published is not None:
        query["published"] = published
    
    posts = await db.blog_posts.find(query).sort("created_at", -1).skip(skip).limit(limit).to_list(length=limit)
    total = await db.blog_posts.count_documents(query)
    
    return {
        "posts": posts,
        "total": total,
        "skip": skip,
        "limit": limit
    }

@router.get("/posts/{post_id}")
async def get_post(post_id: str):
    """Get single blog post by ID"""
    post = await db.blog_posts.find_one({"_id": post_id})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.post("/posts")
async def create_post(post: BlogPostCreate):
    """Create new blog post"""
    # Check if slug already exists
    existing = await db.blog_posts.find_one({"slug": post.slug})
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
    
    # Generate ID and timestamps
    post_dict = post.dict()
    post_dict["_id"] = str(uuid.uuid4())
    post_dict["created_at"] = datetime.utcnow()
    post_dict["updated_at"] = datetime.utcnow()
    post_dict["views"] = 0
    
    await db.blog_posts.insert_one(post_dict)
    return {"message": "Post created successfully", "id": post_dict["_id"]}

@router.put("/posts/{post_id}")
async def update_post(post_id: str, post: BlogPostUpdate):
    """Update existing blog post"""
    existing = await db.blog_posts.find_one({"_id": post_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Check slug uniqueness if changed
    if post.slug and post.slug != existing.get("slug"):
        slug_exists = await db.blog_posts.find_one({"slug": post.slug, "_id": {"$ne": post_id}})
        if slug_exists:
            raise HTTPException(status_code=400, detail="Slug already exists")
    
    # Update only provided fields
    update_dict = {k: v for k, v in post.dict(exclude_unset=True).items()}
    update_dict["updated_at"] = datetime.utcnow()
    
    await db.blog_posts.update_one({"_id": post_id}, {"$set": update_dict})
    return {"message": "Post updated successfully"}

@router.delete("/posts/{post_id}")
async def delete_post(post_id: str):
    """Delete blog post"""
    result = await db.blog_posts.delete_one({"_id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post deleted successfully"}

# ==================== PRODUCTS ====================

@router.get("/products")
async def list_products(skip: int = 0, limit: int = 100, category: Optional[str] = None, active: Optional[bool] = None):
    """List all products with optional filtering"""
    query = {}
    if category:
        query["category"] = category
    if active is not None:
        query["active"] = active
    
    products = await db.products.find(query).sort("name", 1).skip(skip).limit(limit).to_list(length=limit)
    total = await db.products.count_documents(query)
    
    return {
        "products": products,
        "total": total,
        "skip": skip,
        "limit": limit
    }

@router.get("/products/{product_id}")
async def get_product(product_id: str):
    """Get single product by ID"""
    product = await db.products.find_one({"_id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/products")
async def create_product(product: ProductCreate):
    """Create new product"""
    # Check if slug already exists
    existing = await db.products.find_one({"slug": product.slug})
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
    
    product_dict = product.dict()
    product_dict["_id"] = str(uuid.uuid4())
    product_dict["created_at"] = datetime.utcnow()
    product_dict["updated_at"] = datetime.utcnow()
    
    await db.products.insert_one(product_dict)
    return {"message": "Product created successfully", "id": product_dict["_id"]}

@router.put("/products/{product_id}")
async def update_product(product_id: str, product: ProductUpdate):
    """Update existing product"""
    existing = await db.products.find_one({"_id": product_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Check slug uniqueness if changed
    if product.slug and product.slug != existing.get("slug"):
        slug_exists = await db.products.find_one({"slug": product.slug, "_id": {"$ne": product_id}})
        if slug_exists:
            raise HTTPException(status_code=400, detail="Slug already exists")
    
    update_dict = {k: v for k, v in product.dict(exclude_unset=True).items()}
    update_dict["updated_at"] = datetime.utcnow()
    
    await db.products.update_one({"_id": product_id}, {"$set": update_dict})
    return {"message": "Product updated successfully"}

@router.delete("/products/{product_id}")
async def delete_product(product_id: str):
    """Delete product"""
    result = await db.products.delete_one({"_id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

# ==================== INDUSTRIES ====================

@router.get("/industries")
async def list_industries(skip: int = 0, limit: int = 100, active: Optional[bool] = None):
    """List all industries with optional filtering"""
    query = {}
    if active is not None:
        query["active"] = active
    
    industries = await db.industries.find(query).sort("name", 1).skip(skip).limit(limit).to_list(length=limit)
    total = await db.industries.count_documents(query)
    
    return {
        "industries": industries,
        "total": total,
        "skip": skip,
        "limit": limit
    }

@router.get("/industries/{industry_id}")
async def get_industry(industry_id: str):
    """Get single industry by ID"""
    industry = await db.industries.find_one({"_id": industry_id})
    if not industry:
        raise HTTPException(status_code=404, detail="Industry not found")
    return industry

@router.post("/industries")
async def create_industry(industry: IndustryCreate):
    """Create new industry"""
    # Check if slug already exists
    existing = await db.industries.find_one({"slug": industry.slug})
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
    
    industry_dict = industry.dict()
    industry_dict["_id"] = str(uuid.uuid4())
    industry_dict["created_at"] = datetime.utcnow()
    industry_dict["updated_at"] = datetime.utcnow()
    
    await db.industries.insert_one(industry_dict)
    return {"message": "Industry created successfully", "id": industry_dict["_id"]}

@router.put("/industries/{industry_id}")
async def update_industry(industry_id: str, industry: IndustryUpdate):
    """Update existing industry"""
    existing = await db.industries.find_one({"_id": industry_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Industry not found")
    
    # Check slug uniqueness if changed
    if industry.slug and industry.slug != existing.get("slug"):
        slug_exists = await db.industries.find_one({"slug": industry.slug, "_id": {"$ne": industry_id}})
        if slug_exists:
            raise HTTPException(status_code=400, detail="Slug already exists")
    
    update_dict = {k: v for k, v in industry.dict(exclude_unset=True).items()}
    update_dict["updated_at"] = datetime.utcnow()
    
    await db.industries.update_one({"_id": industry_id}, {"$set": update_dict})
    return {"message": "Industry updated successfully"}

@router.delete("/industries/{industry_id}")
async def delete_industry(industry_id: str):
    """Delete industry"""
    result = await db.industries.delete_one({"_id": industry_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Industry not found")
    return {"message": "Industry deleted successfully"}

# ==================== MEDIA ====================

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".pdf"}

@router.post("/media/upload")
async def upload_media(file: UploadFile = File(...)):
    """Upload image or file"""
    # Validate file extension
    file_ext = Path(file.filename).suffix.lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"File type not allowed. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    # Generate unique filename
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    file_path = UPLOAD_DIR / unique_filename
    
    # Save file
    try:
        contents = await file.read()
        with open(file_path, "wb") as f:
            f.write(contents)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")
    
    # Store metadata in database
    media_doc = {
        "_id": str(uuid.uuid4()),
        "filename": unique_filename,
        "original_filename": file.filename,
        "file_path": f"/uploads/{unique_filename}",
        "file_size": len(contents),
        "mime_type": file.content_type,
        "uploaded_at": datetime.utcnow()
    }
    await db.media.insert_one(media_doc)
    
    return {
        "message": "File uploaded successfully",
        "url": f"/uploads/{unique_filename}",
        "id": media_doc["_id"]
    }

@router.get("/media")
async def list_media(skip: int = 0, limit: int = 100):
    """List all uploaded media files"""
    media_files = await db.media.find().sort("uploaded_at", -1).skip(skip).limit(limit).to_list(length=limit)
    total = await db.media.count_documents({})
    
    return {
        "media": media_files,
        "total": total,
        "skip": skip,
        "limit": limit
    }

@router.delete("/media/{media_id}")
async def delete_media(media_id: str):
    """Delete media file"""
    media = await db.media.find_one({"_id": media_id})
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    
    # Delete physical file
    file_path = UPLOAD_DIR / media["filename"]
    if file_path.exists():
        file_path.unlink()
    
    # Delete database record
    await db.media.delete_one({"_id": media_id})
    return {"message": "Media deleted successfully"}

# ==================== LEADS ====================

@router.get("/leads")
async def list_leads(skip: int = 0, limit: int = 100, status: Optional[str] = None):
    """List all leads with optional status filtering"""
    query = {}
    if status:
        query["status"] = status
    
    leads = await db.leads.find(query).sort("created_at", -1).skip(skip).limit(limit).to_list(length=limit)
    total = await db.leads.count_documents(query)
    
    return {
        "leads": leads,
        "total": total,
        "skip": skip,
        "limit": limit
    }

@router.put("/leads/{lead_id}")
async def update_lead(lead_id: str, lead: LeadUpdate):
    """Update lead status and notes"""
    existing = await db.leads.find_one({"_id": lead_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    update_dict = {k: v for k, v in lead.dict(exclude_unset=True).items()}
    update_dict["updated_at"] = datetime.utcnow()
    
    await db.leads.update_one({"_id": lead_id}, {"$set": update_dict})
    return {"message": "Lead updated successfully"}

@router.delete("/leads/{lead_id}")
async def delete_lead(lead_id: str):
    """Delete lead"""
    result = await db.leads.delete_one({"_id": lead_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"message": "Lead deleted successfully"}
