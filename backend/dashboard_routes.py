"""
Dashboard stats endpoint
"""
from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timedelta
import os

router = APIRouter()

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/")
DB_NAME = os.getenv("DB_NAME", "sapl_website")
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

@router.get("/api/dashboard/stats")
async def get_dashboard_stats():
    """Get dashboard statistics"""
    try:
        # Blog posts stats
        blog_posts_total = await db.blog_posts.count_documents({})
        blog_posts_published = await db.blog_posts.count_documents({"published": True})
        blog_posts_draft = blog_posts_total - blog_posts_published
        
        # Products stats
        products_total = await db.products.count_documents({})
        products_active = await db.products.count_documents({"active": True})
        
        # Leads stats (if leads collection exists)
        leads_total = await db.leads.count_documents({}) if "leads" in await db.list_collection_names() else 0
        
        # Calculate leads this month
        first_day_of_month = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        leads_this_month = await db.leads.count_documents({
            "created_at": {"$gte": first_day_of_month}
        }) if "leads" in await db.list_collection_names() else 0
        
        # New leads (last 7 days)
        seven_days_ago = datetime.now() - timedelta(days=7)
        leads_new = await db.leads.count_documents({
            "created_at": {"$gte": seven_days_ago}
        }) if "leads" in await db.list_collection_names() else 0
        
        # Media stats
        media_total = await db.media.count_documents({}) if "media" in await db.list_collection_names() else 0
        
        # Case studies stats
        case_studies_total = await db.case_studies.count_documents({}) if "case_studies" in await db.list_collection_names() else 0
        case_studies_published = await db.case_studies.count_documents({"published": True}) if "case_studies" in await db.list_collection_names() else 0
        
        return {
            "blog_posts": {
                "total": blog_posts_total,
                "published": blog_posts_published,
                "draft": blog_posts_draft
            },
            "products": {
                "total": products_total,
                "active": products_active
            },
            "leads": {
                "total": leads_total,
                "new": leads_new,
                "this_month": leads_this_month
            },
            "media": {
                "total": media_total
            },
            "case_studies": {
                "total": case_studies_total,
                "published": case_studies_published
            }
        }
    except Exception as e:
        print(f"Error fetching dashboard stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/api/leads")
async def get_leads(limit: int = 100, skip: int = 0):
    """Get leads"""
    try:
        if "leads" not in await db.list_collection_names():
            return []
        
        leads = await db.leads.find().sort("created_at", -1).limit(limit).skip(skip).to_list(length=limit)
        return leads
    except Exception as e:
        print(f"Error fetching leads: {e}")
        return []
