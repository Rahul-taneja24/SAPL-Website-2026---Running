import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

const API_URL = 'http://localhost:8001';

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/admin/leads`);
            const data = await response.json();
            setLeads(data.leads || []);
        } catch (error) {
            console.error('Error fetching leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (leadId, newStatus) => {
        try {
            const response = await fetch(`${API_URL}/api/admin/leads/${leadId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) throw new Error('Failed to update lead');

            alert('Lead status updated successfully');
            fetchLeads();
        } catch (error) {
            console.error('Error updating lead:', error);
            alert('Failed to update lead');
        }
    };

    const handleDelete = async (lead) => {
        if (!confirm(`Delete lead from ${lead.name}?`)) return;

        try {
            const response = await fetch(`${API_URL}/api/admin/leads/${lead._id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete lead');

            alert('Lead deleted successfully');
            fetchLeads();
        } catch (error) {
            console.error('Error deleting lead:', error);
            alert('Failed to delete lead');
        }
    };

    const handleView = (lead) => {
        setSelectedLead(lead);
        setIsModalOpen(true);
    };

    const columns = [
        {
            key: 'name',
            label: 'Name',
            sortable: true,
            render: (val) => <span className="font-medium">{val}</span>
        },
        {
            key: 'email',
            label: 'Email',
            sortable: true
        },
        {
            key: 'company',
            label: 'Company',
            sortable: true
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (val, row) => (
                <select
                    value={val || 'new'}
                    onChange={(e) => handleStatusUpdate(row._id, e.target.value)}
                    className={`px-2 py-1 text-xs rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${val === 'converted' ? 'bg-green-100 text-green-800' :
                            val === 'contacted' ? 'bg-blue-100 text-blue-800' :
                                val === 'qualified' ? 'bg-yellow-100 text-yellow-800' :
                                    val === 'closed' ? 'bg-gray-100 text-gray-800' :
                                        'bg-orange-100 text-orange-800'
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                </select>
            )
        },
        {
            key: 'created_at',
            label: 'Date',
            sortable: true,
            render: (val) => new Date(val).toLocaleDateString()
        }
    ];

    const filteredLeads = leads.filter(lead => {
        const matchesSearch =
            lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = filterStatus === '' || (lead.status || 'new') === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const statuses = ['new', 'contacted', 'qualified', 'converted', 'closed'];

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Leads</h1>
                <p className="text-gray-600">Manage customer inquiries</p>
            </div>

            <div className="mb-6 flex gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
                >
                    <option value="">All Statuses</option>
                    {statuses.map(status => (
                        <option key={status} value={status} className="capitalize">{status}</option>
                    ))}
                </select>
            </div>

            <div className="bg-white rounded-lg shadow">
                <DataTable
                    columns={columns}
                    data={filteredLeads}
                    onView={handleView}
                    onDelete={handleDelete}
                    loading={loading}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Lead Details"
                size="md"
            >
                {selectedLead && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <p className="text-gray-900">{selectedLead.name}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <p className="text-gray-900">{selectedLead.email}</p>
                        </div>
                        {selectedLead.phone && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <p className="text-gray-900">{selectedLead.phone}</p>
                            </div>
                        )}
                        {selectedLead.company && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                <p className="text-gray-900">{selectedLead.company}</p>
                            </div>
                        )}
                        {selectedLead.message && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <p className="text-gray-900 whitespace-pre-wrap">{selectedLead.message}</p>
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={selectedLead.status || 'new'}
                                onChange={(e) => {
                                    handleStatusUpdate(selectedLead._id, e.target.value);
                                    setSelectedLead({ ...selectedLead, status: e.target.value });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
                            >
                                {statuses.map(status => (
                                    <option key={status} value={status} className="capitalize">{status}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Submitted</label>
                            <p className="text-gray-900">{new Date(selectedLead.created_at).toLocaleString()}</p>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Leads;
