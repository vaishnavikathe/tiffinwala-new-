import React, { useState } from 'react'; 
import AdminLayout from '../../components/layout/AdminLayout';
import OverviewTab from './components/OverviewTab'; 
import UsersTab from './components/UsersTab';
import VendorsTab from './components/VendorsTab';

import { 
  Users, 
  Store, 
  CreditCard, 
  TrendingUp,
  Columns
} from 'lucide-react';

export default function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState('overview');

  const stats = [
    {
      title: "TOTAL DINERS",
      value: "5",
      subtext: "4 active",
      icon: <Users size={20} className="text-[#f15a24]" />,
      iconBg: "bg-orange-50"
    },
    {
      title: "VENDORS",
      value: "4",
      subtext: "3 approved",
      icon: <Store size={20} className="text-amber-600" />,
      iconBg: "bg-amber-50"
    },
    {
      title: "SUBSCRIPTIONS",
      value: "3",
      subtext: "this month",
      icon: <CreditCard size={20} className="text-emerald-600" />,
      iconBg: "bg-emerald-50"
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      name: "Gupta Tiffin Co.",
      location: "Mumbai",
      cuisine: "Multi-cuisine",
      status: "Pending"
    }
  ];

  const recentSubscriptions = [
    { id: 1, name: "Aarav Patel", plan: "Full Day Combo", price: "₹7,830", type: "POSTPAID" },
    { id: 2, name: "Diya Reddy", plan: "Sattvik Two Meals", price: "₹5,495", type: "PREPAID" },
    { id: 3, name: "Kabir Singh", plan: "Flexi Multi-cuisine", price: "₹6,440", type: "POSTPAID" }
  ];

  return (
    <AdminLayout currentTab={currentTab} setCurrentTab={setCurrentTab}>
      
      {/* CASE A: Overview Dashboard Layout Panels */}
      {currentTab === 'overview' && (
        <>
          {/* Top Header Row Banner */}
          <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center gap-4 w-full">
            <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <Columns size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Platform Overview</h1>
              <p className="text-xs text-gray-500 mt-0.5">Everything happening across TiffinWala</p>
            </div>
          </header>

          {/* Main Content Workspace Layout View frame */}
          <div className="p-8 space-y-6 max-w-[1600px] w-full mx-auto">
            
            {/* Top Row: Metric Highlight Summaries cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-xl border border-gray-150 shadow-sm flex justify-between items-start">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold tracking-wider text-gray-400 block uppercase">
                      {item.title}
                    </span>
                    <span className="text-3xl font-bold text-gray-900 block">
                      {item.value}
                    </span>
                    <span className={`text-xs block ${item.isTrend ? 'text-emerald-600 font-medium' : 'text-gray-400'}`}>
                      {item.subtext}
                    </span>
                  </div>
                  <div className={`p-2.5 rounded-xl ${item.iconBg}`}>
                    {item.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Split: Secondary Data Feed Cards columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Side Column Panel: Vendor Submissions */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col">
                <h2 className="text-xl font-bold text-gray-900 mb-5">Pending vendor approvals</h2>
                <div className="space-y-3 flex-1">
                  {pendingApprovals.map((vendor) => (
                    <div key={vendor.id} className="flex flex-col p-4 border border-gray-100 rounded-xl bg-gray-50/50 gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white text-xl shadow-sm">
                            🍱
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">{vendor.name}</h3>
                            <p className="text-xs text-gray-400 mt-0.5">{vendor.location} • {vendor.cuisine}</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 text-xs font-semibold text-amber-600 bg-amber-50 rounded-full border border-amber-200">
                          {vendor.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side Column Panel: Highlighted Rows Container */}
              <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-150 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-5">Recent subscriptions</h2>
                <div className="space-y-3">
                  {recentSubscriptions.map((sub) => (
                    <div 
                      key={sub.id} 
                      className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm transition-all hover:border-gray-200"
                    >
                      <div className="space-y-1">
                        <h3 className="font-bold text-gray-900 text-sm">{sub.name}</h3>
                        {/* Subtitle inner badge string block wrapper layout */}
                        <div className="inline-block bg-gray-50 text-gray-500 text-xs px-2 py-0.5 rounded border border-gray-100 font-medium">
                          {sub.plan}
                        </div>
                      </div>
                      
                      <div className="text-right space-y-1">
                        <span className="font-bold text-gray-900 text-sm block">
                          {sub.price}
                        </span>
                        <span className={`inline-block text-[9px] font-extrabold tracking-wider px-1.5 py-0.5 rounded border ${
                          sub.type === 'PREPAID' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-gray-100 text-gray-600 border-gray-200'
                        }`}>
                          {sub.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </>
      )}

      {/* CASE B: Users Subpanel view route */}
      {currentTab === 'users' && <UsersTab />}

      {/* CASE C: Vendors Subpanel view cards grid */}
      {currentTab === 'vendors' && <VendorsTab />}

    </AdminLayout>
  );
}