import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Store,
    LogOut
} from 'lucide-react';

export default function AdminLayout({ children, currentTab, setCurrentTab }) {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("adminToken");
        navigate("/");
    };

    return (
        <div className="flex h-screen bg-[#f8f9fa] font-sans antialiased selection:bg-orange-500/20">
            
            {/* Sidebar - TiffinWala Dark Forest Green Theme (Updated from #0a192f) */}
            <aside className="w-64 bg-[#0c231a] text-gray-300 flex flex-col justify-between p-4 border-r border-gray-800/40 shrink-0 select-none">
                <div>
                    {/* Brand Logo Header */}
                    <div className="mb-8 p-2 flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#f15a24] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md">
                            T
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-white tracking-wide leading-tight">TIFFINWALA</h2>
                            <span className="text-[10px] font-bold tracking-widest text-emerald-500 block uppercase">Admin Panel</span>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="space-y-1.5">
                        <p className="text-[10px] font-extrabold tracking-wider text-gray-500 px-3 uppercase mb-3">
                            Navigation
                        </p>

                        {/* 1. Overview Tab Button */}
                        <button
                            type="button"
                            onClick={() => setCurrentTab && setCurrentTab('overview')}
                            className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer text-left ${
                                currentTab === 'overview'
                                    ? 'bg-[#f15a24] text-white shadow-lg shadow-orange-600/10'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                            }`}
                        >
                            <LayoutDashboard size={18} />
                            <span>Overview</span>
                        </button>

                        {/* 2. Users Tab Button */}
                        <button
                            type="button"
                            onClick={() => setCurrentTab && setCurrentTab('users')}
                            className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer text-left ${
                                currentTab === 'users'
                                    ? 'bg-[#f15a24] text-white shadow-lg shadow-orange-600/10'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                            }`}
                        >
                            <Users size={18} />
                            <span>Users</span>
                        </button>

                        {/* 3. Vendors Tab Button */}
                        <button
                            type="button"
                            onClick={() => setCurrentTab && setCurrentTab('vendors')}
                            className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer text-left ${
                                currentTab === 'vendors'
                                    ? 'bg-[#f15a24] text-white shadow-lg shadow-orange-600/10'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                            }`}
                        >
                            <Store size={18} />
                            <span>Vendors</span>
                        </button>
                    </div>
                </div>

                {/* Sidebar Footer Account Info */}
                <div className="border-t border-gray-800/40 pt-4 space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/5">
                        <div className="w-8 h-8 rounded-lg bg-[#f15a24]/20 text-[#f15a24] flex items-center justify-center font-bold text-xs">
                            A
                        </div>
                        <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-white truncate">Admin</h4>
                            <p className="text-[10px] text-gray-500 truncate">Admin Account</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-xs text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150 cursor-pointer text-left"
                    >
                        <LogOut size={14} />
                        <span>Sign out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Workspace Window */}
            <main className="flex-1 flex flex-col overflow-y-auto min-w-0">
                {children}
            </main>
        </div>
    );
}