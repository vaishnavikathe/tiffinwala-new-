import React from 'react';
import { Search } from 'lucide-react';

export default function VendorsTab() {
  const vendorsData = [
    {
      id: 1,
      name: "Sharma's Annapurna Mess",
      owner: "Rajesh Sharma",
      desc: "Authentic ghar ka khana with rotating weekly menu. 10+ years serving students & professionals.",
      city: "Pune",
      rating: "4.7",
      subs: "142 subs",
      status: "Active",
      icon: "🍲"
    },
    {
      id: 2,
      name: "Saoji Spice Kitchen",
      owner: "Anita Deshmukh",
      desc: "Bold Saoji flavors — hand-pounded masalas, traditional preparation, generous portions.",
      city: "Nagpur",
      rating: "4.5",
      subs: "98 subs",
      status: "Active",
      icon: "🌶️"
    },
    {
      id: 3,
      name: "Iyer's Sattvik Bhojan",
      owner: "Suresh Iyer",
      desc: "Pure veg, no onion-no garlic option. Sambar, rasam, and three veggies daily.",
      city: "Bengaluru",
      rating: "4.8",
      subs: "210 subs",
      status: "Active",
      icon: "🥥"
    },
    {
      id: 4,
      name: "Gupta Tiffin Co.",
      owner: "Pooja Gupta",
      desc: "Punjabi, Gujarati & Bengali thalis. Switch cuisine any day.",
      city: "Mumbai",
      rating: "4.3",
      subs: "67 subs",
      status: "Pending",
      icon: "🍱"
    }
  ];

  return (
    <div className="p-8 space-y-6 w-full max-w-[1600px] mx-auto">
      {/* Top Title Block */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Vendors</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage all mess vendors</p>
      </div>

      {/* Control Header Actions Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-gray-150 shadow-sm">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">All Mess Providers</h2>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#f15a24] transition-colors"
          />
        </div>
      </div>

      {/* Grid Layout Cards Module */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendorsData.map((vendor) => (
          <div key={vendor.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-gray-300 transition-all duration-200">
            
            {/* Colored Top Banner Line */}
            <div className={`h-1.5 w-full ${vendor.status === 'Active' ? 'bg-emerald-600' : 'bg-amber-500'}`} />
            
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                {/* Header Meta Line */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center text-2xl shadow-sm">
                      {vendor.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-[#f15a24] transition-colors">
                        {vendor.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">{vendor.owner}</p>
                    </div>
                  </div>

                  {/* Dynamic Status Badges */}
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    vendor.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                      : 'bg-amber-50 text-amber-600 border-amber-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${vendor.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    {vendor.status}
                  </span>
                </div>

                {/* Description Body text */}
                <p className="text-sm text-gray-500 font-medium leading-relaxed mt-4">
                  {vendor.desc}
                </p>
              </div>

              {/* Bottom Metadata Info Items */}
              <div className="pt-4 border-t border-gray-100 flex items-center gap-4 text-xs font-semibold text-gray-400">
                <div>📍 <span className="text-gray-700 font-bold ml-0.5">{vendor.city}</span></div>
                <div>⭐ <span className="text-gray-700 font-bold ml-0.5">{vendor.rating}</span></div>
                <div>👥 <span className="text-gray-700 font-bold ml-0.5">{vendor.subs}</span></div>
              </div>

            </div>

            {/* Action Buttons Tray */}
            <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-3 bg-gray-50/50 border-t border-gray-100/60">
              <button className="w-full py-2 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-center">
                View
              </button>
              
              {vendor.status === 'Active' ? (
                <button className="w-full py-2 text-sm font-bold text-red-600 hover:bg-red-50 border border-transparent rounded-xl transition-colors cursor-pointer text-center">
                  Suspend
                </button>
              ) : (
                <button className="w-full py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer text-center shadow-sm shadow-emerald-700/10">
                  Approve
                </button>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}