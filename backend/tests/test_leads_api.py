"""
Backend API Tests for Shanker Agencies - Leads Management System
Tests for: POST /api/contact, POST /api/quote, GET /api/leads, GET /api/leads/stats/summary
"""

import pytest
import requests
import os
import uuid

# Use the public URL from environment
BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://refractory-portal.preview.emergentagent.com').rstrip('/')

# Test data prefix for cleanup
TEST_PREFIX = "TEST_"


class TestHealthEndpoints:
    """Health check endpoints"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "status" in data
        assert data["status"] == "healthy"
        print(f"PASS: API root returns healthy status")
    
    def test_health_check(self):
        """Test health check endpoint"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "timestamp" in data
        print(f"PASS: Health check returns healthy with timestamp")


class TestContactFormAPI:
    """Tests for POST /api/contact - Contact form submission"""
    
    def test_contact_form_success(self):
        """Test successful contact form submission"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "name": f"{TEST_PREFIX}John Smith {unique_id}",
            "email": f"{TEST_PREFIX}test_{unique_id}@example.com",
            "phone": "+91 9899957888",
            "company": "Test Industries",
            "industry": "Steel",
            "inquiry_type": "general",
            "message": "This is a test inquiry message",
            "source": "website"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Validate response structure
        assert data["success"] == True, "Success should be True"
        assert "message" in data, "Response should include message"
        assert "lead_id" in data, "Response should include lead_id"
        assert len(data["lead_id"]) > 0, "Lead ID should not be empty"
        
        print(f"PASS: Contact form created lead with ID: {data['lead_id']}")
        return data["lead_id"]
    
    def test_contact_form_missing_required_fields(self):
        """Test contact form with missing required fields"""
        payload = {
            "name": "John",
            # Missing email - should fail
        }
        
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        # Should return validation error (422)
        assert response.status_code == 422, f"Expected 422 for missing fields, got {response.status_code}"
        print(f"PASS: Contact form returns 422 for missing required fields")
    
    def test_contact_form_invalid_email(self):
        """Test contact form with invalid email format"""
        payload = {
            "name": "John Smith",
            "email": "not-an-email",
            "message": "Test message"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        # Should return validation error (422) for invalid email
        assert response.status_code == 422, f"Expected 422 for invalid email, got {response.status_code}"
        print(f"PASS: Contact form returns 422 for invalid email format")
    
    def test_contact_form_different_inquiry_types(self):
        """Test contact form with different inquiry types"""
        inquiry_types = ["general", "quote", "technical", "partnership"]
        
        for inquiry_type in inquiry_types:
            unique_id = str(uuid.uuid4())[:8]
            payload = {
                "name": f"{TEST_PREFIX}Test User {unique_id}",
                "email": f"{TEST_PREFIX}test_{unique_id}@example.com",
                "inquiry_type": inquiry_type,
                "message": f"Test inquiry of type: {inquiry_type}"
            }
            
            response = requests.post(
                f"{BASE_URL}/api/contact",
                json=payload,
                headers={"Content-Type": "application/json"}
            )
            
            assert response.status_code == 200, f"Failed for inquiry_type {inquiry_type}: {response.text}"
            print(f"PASS: Contact form accepts inquiry_type: {inquiry_type}")


class TestQuoteRequestAPI:
    """Tests for POST /api/quote - Quote request submission"""
    
    def test_quote_request_success(self):
        """Test successful quote request submission"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "name": f"{TEST_PREFIX}Jane Doe {unique_id}",
            "email": f"{TEST_PREFIX}jane_{unique_id}@company.com",
            "phone": "+91 9811909394",
            "company": f"{TEST_PREFIX}ABC Industries Ltd",
            "industry": "Cement",
            "products": ["High Alumina Bricks", "LCC/ULCC Castables"],
            "quantity": "50 MT",
            "application": "Kiln burning zone",
            "delivery_location": "Mumbai, India",
            "notes": "Need delivery within 30 days",
            "source": "website"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/quote",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Validate response structure
        assert data["success"] == True, "Success should be True"
        assert "message" in data, "Response should include message"
        assert "lead_id" in data, "Response should include lead_id"
        assert "24 hours" in data["message"].lower() or "quote" in data["message"].lower(), \
            "Message should mention quote or response timeline"
        
        print(f"PASS: Quote request created with ID: {data['lead_id']}")
        return data["lead_id"]
    
    def test_quote_request_missing_required_fields(self):
        """Test quote request with missing required fields"""
        payload = {
            "name": "Jane",
            "email": "jane@company.com"
            # Missing phone, company, industry, products
        }
        
        response = requests.post(
            f"{BASE_URL}/api/quote",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        # Should return validation error (422)
        assert response.status_code == 422, f"Expected 422 for missing fields, got {response.status_code}"
        print(f"PASS: Quote request returns 422 for missing required fields")
    
    def test_quote_request_with_empty_products(self):
        """Test quote request with empty products array"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "name": f"{TEST_PREFIX}Test User {unique_id}",
            "email": f"{TEST_PREFIX}test_{unique_id}@company.com",
            "phone": "+91 1234567890",
            "company": "Test Company",
            "industry": "Steel",
            "products": [],  # Empty array
            "source": "website"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/quote",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        # Should still succeed - products can be empty
        assert response.status_code == 200, f"Expected 200 with empty products, got {response.status_code}"
        print(f"PASS: Quote request accepts empty products array")


class TestLeadsAPI:
    """Tests for GET /api/leads - Retrieve leads"""
    
    def test_get_leads_list(self):
        """Test retrieving leads list"""
        response = requests.get(f"{BASE_URL}/api/leads")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Should return a list
        assert isinstance(data, list), "Response should be a list"
        print(f"PASS: GET /api/leads returns list with {len(data)} leads")
        
        # If there are leads, validate structure
        if len(data) > 0:
            lead = data[0]
            required_fields = ["id", "name", "email", "status", "source", "created_at"]
            for field in required_fields:
                assert field in lead, f"Lead should have field: {field}"
            print(f"PASS: Lead structure validated with required fields")
    
    def test_get_leads_with_limit(self):
        """Test getting leads with limit parameter"""
        response = requests.get(f"{BASE_URL}/api/leads?limit=5")
        
        assert response.status_code == 200
        data = response.json()
        assert len(data) <= 5, "Should respect limit parameter"
        print(f"PASS: GET /api/leads respects limit parameter")
    
    def test_get_leads_filter_by_status(self):
        """Test filtering leads by status"""
        response = requests.get(f"{BASE_URL}/api/leads?status=new")
        
        assert response.status_code == 200
        data = response.json()
        
        # All returned leads should have status 'new'
        for lead in data:
            assert lead["status"] == "new", f"Expected status 'new', got {lead['status']}"
        
        print(f"PASS: GET /api/leads filters by status correctly")
    
    def test_get_leads_filter_by_source(self):
        """Test filtering leads by source"""
        response = requests.get(f"{BASE_URL}/api/leads?source=website")
        
        assert response.status_code == 200
        data = response.json()
        
        # All returned leads should have source 'website'
        for lead in data:
            assert lead["source"] == "website", f"Expected source 'website', got {lead['source']}"
        
        print(f"PASS: GET /api/leads filters by source correctly")


class TestLeadStatsAPI:
    """Tests for GET /api/leads/stats/summary - Lead statistics"""
    
    def test_get_lead_stats(self):
        """Test retrieving lead statistics"""
        response = requests.get(f"{BASE_URL}/api/leads/stats/summary")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Validate response structure
        assert "total_leads" in data, "Response should include total_leads"
        assert "new_leads" in data, "Response should include new_leads"
        assert "quote_requests" in data, "Response should include quote_requests"
        assert "by_status" in data, "Response should include by_status"
        assert "by_source" in data, "Response should include by_source"
        
        # Validate data types
        assert isinstance(data["total_leads"], int), "total_leads should be integer"
        assert isinstance(data["new_leads"], int), "new_leads should be integer"
        assert isinstance(data["by_status"], dict), "by_status should be dict"
        assert isinstance(data["by_source"], dict), "by_source should be dict"
        
        print(f"PASS: Lead stats returned: {data['total_leads']} total, {data['new_leads']} new")


class TestCreateAndVerifyLead:
    """Integration test - Create lead and verify persistence"""
    
    def test_create_contact_and_verify_in_list(self):
        """Create a contact and verify it appears in leads list"""
        unique_id = str(uuid.uuid4())[:8]
        unique_email = f"{TEST_PREFIX}verify_{unique_id}@test.com"
        
        # Create contact
        payload = {
            "name": f"{TEST_PREFIX}Verify User {unique_id}",
            "email": unique_email,
            "phone": "+91 9999999999",
            "company": "Verify Corp",
            "industry": "Aluminum",
            "inquiry_type": "technical",
            "message": "Test for verification"
        }
        
        create_response = requests.post(
            f"{BASE_URL}/api/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert create_response.status_code == 200
        lead_id = create_response.json()["lead_id"]
        
        # Get single lead by ID
        get_response = requests.get(f"{BASE_URL}/api/leads/{lead_id}")
        
        assert get_response.status_code == 200, f"Failed to get lead by ID: {get_response.text}"
        lead = get_response.json()
        
        # Verify lead data matches
        assert lead["id"] == lead_id, "Lead ID should match"
        assert lead["email"] == unique_email, "Email should match"
        assert lead["inquiry_type"] == "technical", "Inquiry type should match"
        assert lead["status"] == "new", "New leads should have status 'new'"
        
        print(f"PASS: Created contact verified in database with matching data")


class TestLeadUpdateAndDelete:
    """Tests for PATCH and DELETE lead endpoints"""
    
    def test_update_lead_status(self):
        """Test updating lead status"""
        # First create a lead
        unique_id = str(uuid.uuid4())[:8]
        create_payload = {
            "name": f"{TEST_PREFIX}Update Test {unique_id}",
            "email": f"{TEST_PREFIX}update_{unique_id}@test.com",
            "message": "Test for update"
        }
        
        create_response = requests.post(
            f"{BASE_URL}/api/contact",
            json=create_payload
        )
        assert create_response.status_code == 200
        lead_id = create_response.json()["lead_id"]
        
        # Update the lead status
        update_payload = {
            "status": "contacted",
            "notes": "Called and discussed requirements"
        }
        
        update_response = requests.patch(
            f"{BASE_URL}/api/leads/{lead_id}",
            json=update_payload
        )
        
        assert update_response.status_code == 200, f"Failed to update: {update_response.text}"
        assert update_response.json()["success"] == True
        
        # Verify update persisted
        get_response = requests.get(f"{BASE_URL}/api/leads/{lead_id}")
        assert get_response.status_code == 200
        lead = get_response.json()
        assert lead["status"] == "contacted", "Status should be updated"
        assert lead["notes"] == "Called and discussed requirements", "Notes should be updated"
        
        print(f"PASS: Lead status updated and verified")
    
    def test_delete_lead(self):
        """Test deleting a lead"""
        # First create a lead
        unique_id = str(uuid.uuid4())[:8]
        create_payload = {
            "name": f"{TEST_PREFIX}Delete Test {unique_id}",
            "email": f"{TEST_PREFIX}delete_{unique_id}@test.com",
            "message": "Test for deletion"
        }
        
        create_response = requests.post(
            f"{BASE_URL}/api/contact",
            json=create_payload
        )
        assert create_response.status_code == 200
        lead_id = create_response.json()["lead_id"]
        
        # Delete the lead
        delete_response = requests.delete(f"{BASE_URL}/api/leads/{lead_id}")
        
        assert delete_response.status_code == 200, f"Failed to delete: {delete_response.text}"
        assert delete_response.json()["success"] == True
        
        # Verify lead no longer exists
        get_response = requests.get(f"{BASE_URL}/api/leads/{lead_id}")
        assert get_response.status_code == 404, "Deleted lead should return 404"
        
        print(f"PASS: Lead deleted and verified removal")
    
    def test_update_nonexistent_lead(self):
        """Test updating a non-existent lead"""
        fake_id = "nonexistent-lead-id"
        
        update_response = requests.patch(
            f"{BASE_URL}/api/leads/{fake_id}",
            json={"status": "contacted"}
        )
        
        assert update_response.status_code == 404, "Should return 404 for non-existent lead"
        print(f"PASS: Update returns 404 for non-existent lead")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
