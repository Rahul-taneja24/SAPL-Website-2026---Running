'use client';
import { useApp } from '@/context/AppContext';
import AdminDashboard from '@/sections/admin/Admindashboard';
import AdminLogin from '@/sections/admin/Adminlog';
export default function AdminDashboardPage() {
  const { adminToken, handleAdminLogin, handleAdminLogout } = useApp();
  return adminToken
    ? <AdminDashboard token={adminToken} onLogout={handleAdminLogout} />
    : <AdminLogin onLogin={handleAdminLogin} />;
}
