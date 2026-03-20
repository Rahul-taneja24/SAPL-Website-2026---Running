// API Service Layer for CMS Integration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

class APIService {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API Request failed for ${endpoint}:`, error);
            throw error;
        }
    }

    // Blog Posts
    async getBlogPosts(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/api/blog/posts${queryString ? `?${queryString}` : ''}`);
    }

    async getBlogPost(slug) {
        return this.request(`/api/blog/posts/${slug}`);
    }

    // Products
    async getProducts(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/api/products${queryString ? `?${queryString}` : ''}`);
    }

    async getProduct(slug) {
        return this.request(`/api/products/${slug}`);
    }

    // Industries
    async getIndustries() {
        return this.request('/api/industries');
    }

    async getIndustry(id) {
        return this.request(`/api/industries/${id}`);
    }

    // Media
    async getMedia(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/api/media${queryString ? `?${queryString}` : ''}`);
    }

    // Contact/Leads
    async submitContact(data) {
        return this.request('/api/contact', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async submitQuote(data) {
        return this.request('/api/quote', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
}

const apiService = new APIService();
export default apiService;
