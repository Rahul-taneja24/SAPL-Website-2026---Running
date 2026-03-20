'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ImageUpload from '../components/ImageUpload';

const API_URL = 'http://localhost:8001';

const Industries = () => {
    const [industries, setIndustries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndustry, setEditingIndustry] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        short_description: '',
        image_url: '',
        max_temp: '',
        equipment_areas: '',
        recommended_products: '',
        active: true
    });

    useEffect(() => {
        fetchIndustries();
    }, []);

    const fetchIndustries = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/admin/industries`);
            const data = await response.json();
            setIndustries(data.industries || []);
        } catch (error) {
            console.error('Error fetching industries:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = editingIndustry
                ? `${API_URL}/api/admin/industries/${editingIndustry._id}`
                : `${API_URL}/api/admin/industries`;

            const payload = {
                ...formData,
                equipment_areas: formData.equipment_areas.split(',').map(t => t.trim()).filter(Boolean),
                recommended_products: formData.recommended_products.split(',').map(t => t.trim()).filter(Boolean)
            };

            const response = await fetch(url, {
                method: editingIndustry ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Failed to save industry');

            alert(editingIndustry ? 'Industry updated successfully' : 'Industry created successfully');
            setIsModalOpen(false);
            resetForm();
            fetchIndustries();
        } catch (error) {
            console.error('Error saving industry:', error);
            alert('Failed to save industry');
        }
    };

    const handleDelete = async (industry) => {
        if (!confirm(`Delete industry "${industry.name}"?`)) return;

        try {
            const response = await fetch(`${API_URL}/api/admin/industries/${industry._id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete industry');

            alert('Industry deleted successfully');
            fetchIndustries();
        } catch (error) {
            console.error('Error deleting industry:', error);
            alert('Failed to delete industry');
        }
    };

    const handleEdit = (industry) => {
        setEditingIndustry(industry);
        setFormData({
            name: industry.name || '',
            slug: industry.slug || '',
            description: industry.description || '',
            short_description: industry.short_description || '',
            image_url: industry.image_url || '',
            max_temp: industry.max_temp || '',
            equipment_areas: Array.isArray(industry.equipment_areas) ? industry.equipment_areas.join(', ') : '',
            recommended_products: Array.isArray(industry.recommended_products) ? industry.recommended_products.join(', ') : '',
            active: industry.active !== false
        });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setEditingIndustry(null);
        setFormData({
            name: '',
            slug: '',
            description: '',
            short_description: '',
            image_url: '',
            max_temp: '',
            equipment_areas: '',
            recommended_products: '',
            active: true
        });
    };

    const generateSlug = (name) => {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    const columns = [
        {
            key: 'name',
            label: 'Name',
            sortable: true,
            render: (val) => <span className="font-medium">{val}</span>
        },
        {
            key: 'max_temp',
            label: 'Max Temp',
            sortable: true
        },
        {
            key: 'active',
            label: 'Status',
            sortable: true,
            render: (val) => (
                <span className={`px-2 py-1 text-xs rounded-full ${val ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                    {val ? 'Active' : 'Inactive'}
                </span>
            )
        }
    ];

    const filteredIndustries = industries.filter(industry =>
        industry.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Industries</h1>
                <p className="text-gray-600">Manage industry solutions</p>
            </div>

            <div className="mb-6 flex gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search industries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={20} />
                    New Industry
                </button>
            </div>

            <div className="bg-white rounded-lg shadow">
                <DataTable
                    columns={columns}
                    data={filteredIndustries}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    loading={loading}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    resetForm();
                }}
                title={editingIndustry ? 'Edit Industry' : 'New Industry'}
                size="lg"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })}
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

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Max Temperature</label>
                            <input
                                type="text"
                                value={formData.max_temp}
                                onChange={(e) => setFormData({ ...formData, max_temp: e.target.value })}
                                placeholder="e.g., 1800°C"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                            <textarea
                                rows={2}
                                value={formData.short_description}
                                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Areas (comma-separated)</label>
                            <input
                                type="text"
                                value={formData.equipment_areas}
                                onChange={(e) => setFormData({ ...formData, equipment_areas: e.target.value })}
                                placeholder="Blast Furnace, Steel Ladle, etc."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Recommended Products (comma-separated)</label>
                            <input
                                type="text"
                                value={formData.recommended_products}
                                onChange={(e) => setFormData({ ...formData, recommended_products: e.target.value })}
                                placeholder="High Alumina Bricks, LC Castables, etc."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="col-span-2">
                            <ImageUpload
                                label="Industry Image"
                                value={formData.image_url}
                                onChange={(url) => setFormData({ ...formData, image_url: url })}
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.active}
                                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Active</span>
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
                            {editingIndustry ? 'Update Industry' : 'Create Industry'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Industries;
