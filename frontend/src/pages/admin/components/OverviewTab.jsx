import React from 'react';
import { Users as UsersIcon, Store, CreditCard, TrendingUp } from 'lucide-react';

export default function OverviewTab() {
  return (
    <div className="p-8 space-y-8">
      {/* Header Panel */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Platform Overview</h1>
        <p className="text-sm text-gray-500 mt-0.5">Everything happening across TiffinWala</p>
      </div>

      {/* Metric Dashboard Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Diners */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Diners</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">5</p>
            <p className="text-xs text-gray-400 mt-1">4 active</p>
          </div>
          <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
            <UsersIcon size={20} />
          </div>
        </div>

        {/* Card 2: Vendors */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Vendors</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">4</p>
            <p className="text-xs text-gray-400 mt-1">3 approved</p>
          </div>
          <div className="p-2.5 bg-orange-50 text-[#f15a24] rounded-xl">
            <Store size={20} />
          </div>
        </div>

        {/* Card 3: Subscriptions */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subscriptions</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">3</p>
            <p className="text-xs text-gray-400 mt-1">this month</p>
          </div>
          <div className="p-2.5 bg-green-50 text-green-600 rounded-xl">
            <CreditCard size={20} />
          </div>
        </div>

        {/* Card 4: GMV Tracking */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">GMV (Mock)</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">₹19,765</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">+12% MoM</p>
          </div>
          <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl">
            <TrendingUp size={20} />
          </div>
        </div>
      </div>

      {/* Section: Split Sub-Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pending Approvals Widget */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-5">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Pending vendor approvals</h3>
          <div className="p-4 rounded-xl border border-gray-100 bg-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl">
                🍱
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Gupta Tiffin Co.</h4>
                <p className="text-xs text-gray-400">Mumbai • Multi-cuisine</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
              Pending
            </span>
          </div>
        </div>

        {/* Recent Subscriptions Widget */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-7">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent subscriptions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-50 rounded-xl">
              <div>
                <h4 className="text-sm font-bold text-gray-900">Aarav Patel</h4>
                <p className="text-xs text-gray-400">Full Day Combo</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-emerald-600">₹7,830</p>
                <span className="text-[9px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">POSTPAID</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-50 rounded-xl">
              <div>
                <h4 className="text-sm font-bold text-gray-900">Diya Reddy</h4>
                <p className="text-xs text-gray-400">Sattvik Two Meals</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-emerald-600">₹5,495</p>
                <span className="text-[9px] font-bold px-1.5 py-0.5 bg-green-50 text-green-600 rounded">PREPAID</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-50 rounded-xl">
              <div>
                <h4 className="text-sm font-bold text-gray-900">Kabir Singh</h4>
                <p className="text-xs text-gray-400">Flexi Multi-cuisine</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-emerald-600">₹6,440</p>
                <span className="text-[9px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">POSTPAID</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}