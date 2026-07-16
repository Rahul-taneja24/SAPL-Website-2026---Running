from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from enum import Enum

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend email (optional - only if API key is provided)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'info@shankeragencies.com')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')

resend_client = None
if RESEND_API_KEY:
    try:
        import resend
        resend.api_key = RESEND_API_KEY
        resend_client = resend
        logger.info("Resend email integration enabled")
    except ImportError:
        logger.warning("Resend package not installed. Email notifications disabled.")

# Create the main app
app = FastAPI(title="Shanker Agencies API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ==================== ENUMS ====================

class LeadStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    PROPOSAL = "proposal"
    NEGOTIATION = "negotiation"
    WON = "won"
    LOST = "lost"

class LeadSource(str, Enum):
    WEBSITE = "website"
    WHATSAPP = "whatsapp"
    PHONE = "phone"
    EMAIL = "email"
    REFERRAL = "referral"
    TRADE_SHOW = "trade_show"
    OTHER = "other"

class InquiryType(str, Enum):
    GENERAL = "general"
    QUOTE = "quote"
    TECHNICAL = "technical"
    PARTNERSHIP = "partnership"
    COMPLAINT = "complaint"

# ==================== MODELS ====================

class ContactFormInput(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    industry: Optional[str] = None
    inquiry_type: InquiryType = InquiryType.GENERAL
    message: str
    source: LeadSource = LeadSource.WEBSITE

class QuoteRequestInput(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: str
    industry: str
    products: List[str]
    quantity: Optional[str] = None
    application: Optional[str] = None
    delivery_location: Optional[str] = None
    notes: Optional[str] = None
    source: LeadSource = LeadSource.WEBSITE

class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    industry: Optional[str] = None
    inquiry_type: InquiryType = InquiryType.GENERAL
    message: Optional[str] = None
    products: List[str] = []
    status: LeadStatus = LeadStatus.NEW
    source: LeadSource = LeadSource.WEBSITE
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LeadUpdate(BaseModel):
    status: Optional[LeadStatus] = None
    notes: Optional[str] = None

class LeadResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    industry: Optional[str] = None
    inquiry_type: str
    message: Optional[str] = None
    products: List[str] = []
    status: str
    source: str
    notes: Optional[str] = None
    created_at: str
    updated_at: str

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# ==================== EMAIL HELPERS ====================

async def send_email_notification(to_email: str, subject: str, html_content: str):
    """Send email notification using Resend (non-blocking)"""
    if not resend_client:
        logger.warning("Email notification skipped - Resend not configured")
        return None
    
    params = {
        "from": SENDER_EMAIL,
        "to": [to_email],
        "subject": subject,
        "html": html_content
    }
    
    try:
        email = await asyncio.to_thread(resend_client.Emails.send, params)
        logger.info(f"Email sent successfully to {to_email}")
        return email
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return None

def generate_lead_notification_html(lead: Lead) -> str:
    """Generate HTML email for new lead notification"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #1E3A5F, #3B82F6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
            .content {{ background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }}
            .field {{ margin-bottom: 12px; }}
            .label {{ font-weight: bold; color: #1E3A5F; }}
            .value {{ color: #374151; }}
            .footer {{ background: #1E3A5F; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }}
            .badge {{ display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }}
            .badge-new {{ background: #10B981; color: white; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2 style="margin: 0;">🔔 New Lead Received</h2>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">Shanker Agencies Website</p>
            </div>
            <div class="content">
                <p><span class="badge badge-new">{lead.inquiry_type.upper()}</span></p>
                
                <div class="field">
                    <span class="label">Name:</span>
                    <span class="value">{lead.name}</span>
                </div>
                <div class="field">
                    <span class="label">Email:</span>
                    <span class="value"><a href="mailto:{lead.email}">{lead.email}</a></span>
                </div>
                <div class="field">
                    <span class="label">Phone:</span>
                    <span class="value">{lead.phone or 'Not provided'}</span>
                </div>
                <div class="field">
                    <span class="label">Company:</span>
                    <span class="value">{lead.company or 'Not provided'}</span>
                </div>
                <div class="field">
                    <span class="label">Industry:</span>
                    <span class="value">{lead.industry or 'Not specified'}</span>
                </div>
                {f'<div class="field"><span class="label">Products:</span><span class="value">{", ".join(lead.products)}</span></div>' if lead.products else ''}
                <div class="field">
                    <span class="label">Message:</span>
                    <p class="value" style="background: white; padding: 10px; border-radius: 4px; border: 1px solid #e5e7eb;">{lead.message or 'No message'}</p>
                </div>
                <div class="field">
                    <span class="label">Source:</span>
                    <span class="value">{lead.source.value}</span>
                </div>
            </div>
            <div class="footer">
                <p>Shanker Agencies Pvt. Ltd. | Lead Management System</p>
            </div>
        </div>
    </body>
    </html>
    """

# ==================== ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "Shanker Agencies API v1.0", "status": "healthy"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

# Contact Form Submission
@api_router.post("/contact", response_model=dict)
async def submit_contact_form(input: ContactFormInput, background_tasks: BackgroundTasks):
    """Submit contact form and create a lead"""
    try:
        # Create lead from contact form
        lead = Lead(
            name=input.name,
            email=input.email,
            phone=input.phone,
            company=input.company,
            industry=input.industry,
            inquiry_type=input.inquiry_type,
            message=input.message,
            source=input.source,
            status=LeadStatus.NEW
        )
        
        # Prepare document for MongoDB
        doc = lead.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        doc['updated_at'] = doc['updated_at'].isoformat()
        
        # Insert into database
        await db.leads.insert_one(doc)
        
        # Send email notification in background
        if resend_client:
            html_content = generate_lead_notification_html(lead)
            background_tasks.add_task(
                send_email_notification,
                ADMIN_EMAIL,
                f"New Contact Form Submission - {lead.name}",
                html_content
            )
        
        logger.info(f"Contact form submitted: {lead.id} - {lead.name}")
        
        return {
            "success": True,
            "message": "Thank you for contacting us! We will get back to you shortly.",
            "lead_id": lead.id
        }
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

# Quote Request Submission
@api_router.post("/quote", response_model=dict)
async def submit_quote_request(input: QuoteRequestInput, background_tasks: BackgroundTasks):
    """Submit quote request and create a lead"""
    try:
        # Create lead from quote request
        lead = Lead(
            name=input.name,
            email=input.email,
            phone=input.phone,
            company=input.company,
            industry=input.industry,
            inquiry_type=InquiryType.QUOTE,
            products=input.products,
            message=f"Quantity: {input.quantity or 'Not specified'}\nApplication: {input.application or 'Not specified'}\nDelivery: {input.delivery_location or 'Not specified'}\nNotes: {input.notes or 'None'}",
            source=input.source,
            status=LeadStatus.NEW
        )
        
        # Prepare document for MongoDB
        doc = lead.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        doc['updated_at'] = doc['updated_at'].isoformat()
        
        # Insert into database
        await db.leads.insert_one(doc)
        
        # Send email notification in background
        if resend_client:
            html_content = generate_lead_notification_html(lead)
            background_tasks.add_task(
                send_email_notification,
                ADMIN_EMAIL,
                f"🔥 New Quote Request - {lead.company} ({lead.industry})",
                html_content
            )
        
        logger.info(f"Quote request submitted: {lead.id} - {lead.company}")
        
        return {
            "success": True,
            "message": "Thank you for your quote request! Our team will prepare a customized quotation and contact you within 24 hours.",
            "lead_id": lead.id
        }
    except Exception as e:
        logger.error(f"Error submitting quote request: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit quote request")

# Get All Leads (Admin)
@api_router.get("/leads", response_model=List[LeadResponse], dependencies=[Depends(require_admin)])
async def get_leads(status: Optional[str] = None, source: Optional[str] = None, limit: int = 100):
    """Get all leads with optional filtering"""
    try:
        query = {}
        if status:
            query['status'] = status
        if source:
            query['source'] = source
        
        leads = await db.leads.find(query, {"_id": 0}).sort("created_at", -1).limit(limit).to_list(limit)
        return leads
    except Exception as e:
        logger.error(f"Error fetching leads: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch leads")

# Get Single Lead
@api_router.get("/leads/{lead_id}", response_model=LeadResponse, dependencies=[Depends(require_admin)])
async def get_lead(lead_id: str):
    """Get a single lead by ID"""
    try:
        lead = await db.leads.find_one({"id": lead_id}, {"_id": 0})
        if not lead:
            raise HTTPException(status_code=404, detail="Lead not found")
        return lead
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching lead: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch lead")

# Update Lead
@api_router.patch("/leads/{lead_id}", response_model=dict, dependencies=[Depends(require_admin)])
async def update_lead(lead_id: str, update: LeadUpdate):
    """Update lead status or notes"""
    try:
        update_doc = {"updated_at": datetime.now(timezone.utc).isoformat()}
        
        if update.status:
            update_doc['status'] = update.status.value
        if update.notes is not None:
            update_doc['notes'] = update.notes
        
        result = await db.leads.update_one(
            {"id": lead_id},
            {"$set": update_doc}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Lead not found")
        
        return {"success": True, "message": "Lead updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating lead: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update lead")

# Delete Lead
@api_router.delete("/leads/{lead_id}", response_model=dict, dependencies=[Depends(require_admin)])
async def delete_lead(lead_id: str):
    """Delete a lead"""
    try:
        result = await db.leads.delete_one({"id": lead_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Lead not found")
        
        return {"success": True, "message": "Lead deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting lead: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete lead")

# Lead Statistics
@api_router.get("/leads/stats/summary", response_model=dict, dependencies=[Depends(require_admin)])
async def get_lead_stats():
    """Get lead statistics summary"""
    try:
        total = await db.leads.count_documents({})
        new_leads = await db.leads.count_documents({"status": "new"})
        quote_requests = await db.leads.count_documents({"inquiry_type": "quote"})
        
        # Get leads by status
        pipeline = [
            {"$group": {"_id": "$status", "count": {"$sum": 1}}}
        ]
        status_counts = await db.leads.aggregate(pipeline).to_list(100)
        by_status = {item['_id']: item['count'] for item in status_counts}
        
        # Get leads by source
        pipeline = [
            {"$group": {"_id": "$source", "count": {"$sum": 1}}}
        ]
        source_counts = await db.leads.aggregate(pipeline).to_list(100)
        by_source = {item['_id']: item['count'] for item in source_counts}
        
        return {
            "total_leads": total,
            "new_leads": new_leads,
            "quote_requests": quote_requests,
            "by_status": by_status,
            "by_source": by_source
        }
    except Exception as e:
        logger.error(f"Error fetching lead stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch lead statistics")

# Legacy status endpoints
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    return status_checks

# Include the router in the app
# Include the router in the app
app.include_router(api_router)

# CMS Integration
from cms_routes import cms_router
app.include_router(cms_router)

# Dashboard routes for admin
from dashboard_routes import router as dashboard_router
app.include_router(dashboard_router)

# Admin CRUD routes
from auth import require_admin
from admin_routes import router as admin_router
app.include_router(admin_router)

# Mount uploads directory
from fastapi.staticfiles import StaticFiles
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# CORS middleware
# Explicit origin allowlist from env (comma-separated). Defaults to the
# production site origins only. A wildcard "*" combined with credentials is
# both invalid per the CORS spec and a security risk, so it is not used.
_default_cors = "https://www.shankeragencies.com,https://shankeragencies.com"
_cors_origins = [
    o.strip() for o in os.environ.get("CORS_ORIGINS", _default_cors).split(",") if o.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
