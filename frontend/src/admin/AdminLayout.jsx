'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    Package,
    Briefcase,
    Image,
    Users,
    Settings as SettingsIcon,
    Mail,
    Globe,
    Menu,
    X,
    LogOut,
    Bell,
    Search,
    ChevronDown
} from 'lucide-react';

const AdminLayout = ({ children }) => {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    
    const router = useRouter();
    const [user, setUser] = useState({ name: 'Admin User', email: 'admin@shankeragencies.com', role: 'admin' });
    const [notifications, setNotifications] = useState([]);

    // Close sidebar on mobile when route changes
    useEffect(() => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    }, [pathname]);

    const navItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/posts', icon: FileText, label: 'Blog Posts' },
        { path: '/admin/products', icon: Package, label: 'Products' },
        { path: '/admin/industries', icon: Briefcase, label: 'Industries' },
        { path: '/admin/media', icon: Image, label: 'Media Library' },
        { path: '/admin/leads', icon: Users, label: 'Leads' },
        { path: '/admin/translations', icon: Globe, label: 'Translations' },
        { path: '/admin/settings', icon: SettingsIcon, label: 'Settings' },
    ];

    const handleLogout = () => {
        // Add logout logic here
        console.log("Logging out...");
        router.push('/');
    };

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Sidebar Overlay - Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:sticky top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-30 transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20 lg:w-64'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
                        <div className={`flex items-center gap-2 font-bold text-xl text-blue-900 ${!sidebarOpen && 'md:hidden lg:flex'}`}>
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">S</div>
                            <span>SAPL Admin</span>
                        </div>
                        <div className={`w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold mx-auto ${sidebarOpen || 'hidden md:flex lg:hidden'}`}>S</div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="md:hidden p-1 rounded-md hover:bg-gray-100 text-gray-500"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Nav Items */}
                    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative ${isActive
                                            ? 'bg-blue-50 text-blue-700 font-medium'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                    title={!sidebarOpen ? item.label : ''}
                                >
                                    <item.icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'} />
                                    <span className={`${!sidebarOpen && 'md:hidden lg:inline'}`}>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-gray-100">
                        <div className={`flex items-center gap-3 ${!sidebarOpen && 'md:justify-center lg:justify-start'}`}>
                            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                                {user.name.charAt(0)}
                            </div>
                            <div className={`flex-1 min-w-0 ${!sidebarOpen && 'md:hidden lg:block'}`}>
                                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className={`p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors ${!sidebarOpen && 'md:hidden lg:block'}`}
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-md hover:bg-gray-100 text-gray-500"
                        >
                            <Menu size={20} />
                        </button>
                        <div className="hidden sm:block text-gray-400">/</div>
                        <h1 className="text-lg font-semibold text-gray-800 capitalize">
                            {pathname === '/admin' ? 'Dashboard' : pathname.split('/')[2] || 'Dashboard'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="h-9 w-64 pl-9 pr-4 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                            />
                        </div>

                        <button className="relative p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <a href="/" target="_blank" className="text-sm text-blue-600 hover:text-blue-800 font-medium hidden sm:block">
                            View Site
                        </a>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
