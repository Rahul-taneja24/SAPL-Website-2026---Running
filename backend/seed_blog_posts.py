#!/usr/bin/env python3
"""
Seed blog posts to MongoDB database
Usage: python seed_blog_posts.py
"""

import json
import asyncio
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/")
DB_NAME = os.getenv("DB_NAME", "sapl_website")

async def seed_blog_posts():
    # Connect to MongoDB
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    collection = db["blog_posts"]
    
    # Load blog posts from JSON
    with open("blog_posts_seed.json", "r") as f:
        posts = json.load(f)
    
    # Add timestamps
    for post in posts:
        post["created_at"] = datetime.utcnow()
        post["updated_at"] = datetime.utcnow()
        post["views"] = 0
    
    # Clear existing posts (optional - comment out if you want to keep existing)
    print("Clearing existing blog posts...")
    await collection.delete_many({})
    
    # Insert new posts
    print(f"Inserting {len(posts)} blog posts...")
    result = await collection.insert_many(posts)
    
    print(f"✓ Successfully inserted {len(result.inserted_ids)} blog posts")
    
    # Create indexes
    print("Creating indexes...")
    await collection.create_index("slug", unique=True)
    await collection.create_index("category")
    await collection.create_index("published")
    await collection.create_index([("created_at", -1)])
    
    print("✓ Indexes created")
    print("\nBlog posts seeded successfully!")
    
    # Display seeded posts
    print("\nSeeded posts:")
    async for post in collection.find({}, {"title": 1, "slug": 1, "category": 1}):
        print(f"  - {post['title']} ({post['category']})")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_blog_posts())
