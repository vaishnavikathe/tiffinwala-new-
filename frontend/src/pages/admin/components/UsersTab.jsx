import React from 'react';
import { Search } from 'lucide-react';

export default function UsersTab() {
  const dinersData = [
    { name: "Aarav Patel", email: "aarav@example.com", city: "Pune", joined: "2026-01-12", status: "active" },
    { name: "Diya Reddy", email: "diya@example.com", city: "Bengaluru", joined: "2026-02-03", status: "active" },
    { name: "Kabir Singh", email: "kabir@example.com", city: "Mumbai", joined: "2026-02-21", status: "active" },
    { name: "Meera Joshi", email: "meera@example.com", city: "Pune", joined: "2026-03-08", status: "inactive" },
    { name: "Rohan Verma", email: "rohan@example.com", city: "Nagpur", joined: "2026-03-19", status: "active" }
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Top Title Layout Block */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Diners</h1>
        <p className="text-sm text-gray-500 mt-0.5">All registered users on the platform</p>
      </div>

      {/* Table Area Container Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Table Control Header Action Row */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-bold text-gray-900">5 diners</h2>
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-3.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Tabular Layout Elements Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">City</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700 font-medium">
              {dinersData.map((diner, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{diner.name}</td>
                  <td className="px-6 py-4 text-gray-500">{diner.email}</td>
                  <td className="px-6 py-4 text-gray-900">{diner.city}</td>
                  <td className="px-6 py-4 text-gray-500">{diner.joined}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                      diner.status === 'active' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                        : 'bg-gray-100 text-gray-500 border-gray-200'
                    }`}>
                      {diner.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-900 hover:text-orange-500 font-bold transition-colors cursor-pointer">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}