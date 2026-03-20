'use client';
// AdminDashboard.jsx — stub placeholder
// Replace this file with your original src/pages/admin/AdminDashboard.jsx
export default function AdminDashboard({ token, onLogout }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif', background: '#f9fafb' }}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h2 style={{ color: '#1E3A5F' }}>Admin Dashboard</h2>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Replace with your original <code>src/pages/admin/AdminDashboard.jsx</code></p>
                <button onClick={onLogout} style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', background: '#1E3A5F', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
            </div>
        </div>
    );
}