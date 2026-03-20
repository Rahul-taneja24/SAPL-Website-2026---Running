"""
Pydantic models for API validation
"""
from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime

# Blog Post Models
class BlogPostCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    slug: str = Field(..., min_length=1, max_length=200)
    excerpt: str = Field(..., max_length=500)
    content: str = Field(..., min_length=1)
    author: str = Field(default="Admin")
    category: str = Field(..., min_length=1)
    tags: List[str] = Field(default=[])
    featured_image: Optional[str] = None
    published: bool = Field(default=False)
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    
class BlogPostUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    slug: Optional[str] = Field(None, min_length=1, max_length=200)
    excerpt: Optional[str] = Field(None, max_length=500)
    content: Optional[str] = None
    author: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    featured_image: Optional[str] = None
    published: Optional[bool] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None

# Product Models
class ProductCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    slug: str = Field(..., min_length=1, max_length=100)
    category: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)
    short_description: Optional[str] = Field(None, max_length=200)
    specifications: Optional[dict] = Field(default={})
    applications: Optional[List[str]] = Field(default=[])
    grades: Optional[List[str]] = Field(default=[])
    image_url: Optional[str] = None
    temp_max: Optional[str] = None
    active: bool = Field(default=True)
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None

class ProductUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    slug: Optional[str] = Field(None, min_length=1, max_length=100)
    category: Optional[str] = None
    description: Optional[str] = None
    short_description: Optional[str] = Field(None, max_length=200)
    specifications: Optional[dict] = None
    applications: Optional[List[str]] = None
    grades: Optional[List[str]] = None
    image_url: Optional[str] = None
    temp_max: Optional[str] = None
    active: Optional[bool] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None

# Industry Models
class IndustryCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    slug: str = Field(..., min_length=1, max_length=100)
    description: str = Field(..., min_length=1)
    short_description: Optional[str] = Field(None, max_length=200)
    image_url: Optional[str] = None
    max_temp: Optional[str] = None
    equipment_areas: Optional[List[str]] = Field(default=[])
    recommended_products: Optional[List[str]] = Field(default=[])
    case_studies: Optional[List[str]] = Field(default=[])
    active: bool = Field(default=True)

class IndustryUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    slug: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    short_description: Optional[str] = Field(None, max_length=200)
    image_url: Optional[str] = None
    max_temp: Optional[str] = None
    equipment_areas: Optional[List[str]] = None
    recommended_products: Optional[List[str]] = None
    case_studies: Optional[List[str]] = None
    active: Optional[bool] = None

# Lead Update Model (no create - leads come from contact form)
class LeadUpdate(BaseModel):
    status: Optional[str] = Field(None, pattern="^(new|contacted|qualified|converted|closed)$")
    notes: Optional[str] = None
