import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Package,
  Users,
  Briefcase,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Calendar
} from 'lucide-react';

function Dashboard({ apiUrl }) {
  const [stats, setStats] = useState({
    blog_posts: { total: 0, published: 0, draft: 0 },
    products: { total: 0, active: 0 },
    leads: { total: 0, new: 0, this_month: 0 },
    media: { total: 0 },
    case_studies: { total: 0, published: 0 }
  });
  const [recentLeads, setRecentLeads] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const statsRes = await fetch(`${apiUrl}/api/dashboard/stats`);
      const statsData = await statsRes.json();
      setStats(statsData);

      // Fetch recent leads
      const leadsRes = await fetch(`${apiUrl}/api/leads?limit=5`);
      const leadsData = await leadsRes.json();
      setRecentLeads(leadsData);

      // Fetch recent posts
      const postsRes = await fetch(`${apiUrl}/api/blog/posts?limit=5`);
      const postsData = await postsRes.json();
      setRecentPosts(postsData);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Blog Posts</span>
            <div className="stat-icon blue">
              <FileText size={20} />
            </div>
          </div>
          <div className="stat-value">{stats.blog_posts.total}</div>
          <div className="stat-change">
            {stats.blog_posts.published} published, {stats.blog_posts.draft} drafts
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Products</span>
            <div className="stat-icon green">
              <Package size={20} />
            </div>
          </div>
          <div className="stat-value">{stats.products.total}</div>
          <div className="stat-change">
            {stats.products.active} active products
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Leads</span>
            <div className="stat-icon orange">
              <Users size={20} />
            </div>
          </div>
          <div className="stat-value">{stats.leads.total}</div>
          <div className="stat-change">
            {stats.leads.this_month} this month, {stats.leads.new} new
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Case Studies</span>
            <div className="stat-icon purple">
              <Briefcase size={20} />
            </div>
          </div>
          <div className="stat-value">{stats.case_studies.total}</div>
          <div className="stat-change">
            {stats.case_studies.published} published
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Recent Leads */}
        <div className="content-section">
          <div className="section-header">
            <h2 className="section-title">Recent Leads</h2>
            <Link to="/leads" className="btn btn-sm btn-secondary">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.length > 0 ? (
                recentLeads.map(lead => (
                  <tr key={lead._id}>
                    <td>{lead.name}</td>
                    <td>{lead.company || '-'}</td>
                    <td>
                      <span className={`badge badge-${lead.status}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td>{formatDate(lead.created_at)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>
                    No leads yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Recent Blog Posts */}
        <div className="content-section">
          <div className="section-header">
            <h2 className="section-title">Recent Blog Posts</h2>
            <Link to="/blog" className="btn btn-sm btn-secondary">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Views</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentPosts.length > 0 ? (
                recentPosts.map(post => (
                  <tr key={post._id}>
                    <td>{post.title}</td>
                    <td>
                      <span className={`badge badge-${post.status}`}>
                        {post.status}
                      </span>
                    </td>
                    <td>{post.views || 0}</td>
                    <td>{formatDate(post.created_at)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>
                    No blog posts yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="content-section" style={{ marginTop: '24px' }}>
        <div className="section-header">
          <h2 className="section-title">Quick Actions</h2>
        </div>
        <div style={{ padding: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/blog/new" className="btn btn-primary">
            <FileText size={18} /> New Blog Post
          </Link>
          <Link to="/products/new" className="btn btn-primary">
            <Package size={18} /> Add Product
          </Link>
          <Link to="/media" className="btn btn-secondary">
            <Calendar size={18} /> Upload Media
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
