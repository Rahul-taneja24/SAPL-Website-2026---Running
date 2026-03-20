'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ImageUpload from '../components/ImageUpload';
import RichTextEditor from '../components/RichTextEditor';

const API_URL = 'http://localhost:8001';

const BlogPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: 'Admin',
        category: 'Technical',
        tags: [],
        featured_image: '',
        published: false,
        meta_title: '',
        meta_description: ''
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/admin/posts`);
            const data = await response.json();
            setPosts(data.posts || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
            alert('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = editingPost
                ? `${API_URL}/api/admin/posts/${editingPost._id}`
                : `${API_URL}/api/admin/posts`;

            const method = editingPost ? 'PUT' : 'POST';

            // Convert tags string to array
            const payload = {
                ...formData,
                tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()) : formData.tags
            };

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Failed to save post');

            alert(editingPost ? 'Post updated successfully' : 'Post created successfully');
            setIsModalOpen(false);
            resetForm();
            fetchPosts();
        } catch (error) {
            console.error('Error saving post:', error);
            alert('Failed to save post');
        }
    };

    const handleDelete = async (post) => {
        if (!confirm(`Delete post "${post.title}"?`)) return;

        try {
            const response = await fetch(`${API_URL}/api/admin/posts/${post._id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete post');

            alert('Post deleted successfully');
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post');
        }
    };

    const handleEdit = (post) => {
        setEditingPost(post);
        setFormData({
            title: post.title || '',
            slug: post.slug || '',
            excerpt: post.excerpt || '',
            content: post.content || '',
            author: post.author || 'Admin',
            category: post.category || 'Technical',
            tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''),
            featured_image: post.featured_image || '',
            published: post.published || false,
            meta_title: post.meta_title || '',
            meta_description: post.meta_description || ''
        });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setEditingPost(null);
        setFormData({
            title: '',
            slug: '',
            excerpt: '',
            content: '',
            author: 'Admin',
            category: 'Technical',
            tags: [],
            featured_image: '',
            published: false,
            meta_title: '',
            meta_description: ''
        });
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const columns = [
        {
            key: 'title',
            label: 'Title',
            sortable: true,
            render: (val) => <span className="font-medium">{val}</span>
        },
        {
            key: 'category',
            label: 'Category',
            sortable: true,
            render: (val) => (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{val}</span>
            )
        },
        {
            key: 'author',
            label: 'Author',
            sortable: true
        },
        {
            key: 'published',
            label: 'Status',
            sortable: true,
            render: (val) => (
                <span className={`px-2 py-1 text-xs rounded-full ${val ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                    {val ? 'Published' : 'Draft'}
                </span>
            )
        },
        {
            key: 'created_at',
            label: 'Created',
            sortable: true,
            render: (val) => new Date(val).toLocaleDateString()
        }
    ];

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === '' || post.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['Technical', 'How-To', 'Industry Guide', 'Comparison', 'Case Study'];

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Posts</h1>
                <p className="text-gray-600">Manage your blog content</p>
            </div>

            {/* Toolbar */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex gap-4 flex-1">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Category Filter */}
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* New Post Button */}
                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={20} />
                    New Post
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow">
                <DataTable
                    columns={columns}
                    data={filteredPosts}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    loading={loading}
                />
            </div>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    resetForm();
                }}
                title={editingPost ? 'Edit Post' : 'New Post'}
                size="lg"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => {
                                    setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                            <input
                                type="text"
                                required
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                            <select
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                            <input
                                type="text"
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt *</label>
                            <textarea
                                required
                                rows={2}
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                placeholder="refractory, kiln, steel"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="col-span-2">
                            <ImageUpload
                                label="Featured Image"
                                value={formData.featured_image}
                                onChange={(url) => setFormData({ ...formData, featured_image: url })}
                            />
                        </div>

                        <div className="col-span-2">
                            <RichTextEditor
                                label="Content *"
                                value={formData.content}
                                onChange={(content) => setFormData({ ...formData, content })}
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.published}
                                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Publish immediately</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={() => {
                                setIsModalOpen(false);
                                resetForm();
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            {editingPost ? 'Update Post' : 'Create Post'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default BlogPosts;
