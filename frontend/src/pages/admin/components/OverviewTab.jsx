import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Store,
  CreditCard,
  Columns,
} from "lucide-react";

export default function OverviewTab() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboard(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center gap-4">
        <Columns size={20} />
        <div>
          <h1 className="text-xl font-bold">
            Platform Overview
          </h1>
          <p className="text-sm text-gray-500">
            Everything happening across TiffinWala
          </p>
        </div>
      </header>

      <div className="p-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          <div className="bg-white p-5 rounded-xl shadow">
            <Users className="text-orange-500 mb-2" />
            <p className="text-xs text-gray-500">
              TOTAL USERS
            </p>
            <h2 className="text-3xl font-bold">
              {dashboard.totalUsers}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <Store className="text-amber-500 mb-2" />
            <p className="text-xs text-gray-500">
              TOTAL VENDORS
            </p>
            <h2 className="text-3xl font-bold">
              {dashboard.totalVendors}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <Store className="text-green-500 mb-2" />
            <p className="text-xs text-gray-500">
              APPROVED VENDORS
            </p>
            <h2 className="text-3xl font-bold">
              {dashboard.approvedVendors}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <CreditCard className="text-blue-500 mb-2" />
            <p className="text-xs text-gray-500">
              SUBSCRIPTIONS
            </p>
            <h2 className="text-3xl font-bold">
              {dashboard.totalSubscriptions}
            </h2>
          </div>

        </div>

        {/* Pending Vendors */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold mb-4">
            Pending Vendor Approvals
          </h2>

          {dashboard.pendingVendors?.length === 0 ? (
            <p>No pending vendors</p>
          ) : (
            dashboard.pendingVendors?.map((vendor) => (
              <div
                key={vendor._id}
                className="border p-3 rounded mb-3"
              >
                <h3 className="font-semibold">
                  {vendor.shopName}
                </h3>

                <p>{vendor.ownerName}</p>
                <p>{vendor.address}</p>
              </div>
            ))
          )}
        </div>

        {/* Recent Subscriptions */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold mb-4">
            Recent Subscriptions
          </h2>

          {dashboard.recentSubscriptions?.length === 0 ? (
            <p>No subscriptions found</p>
          ) : (
            dashboard.recentSubscriptions?.map((sub) => (
              <div
                key={sub._id}
                className="border p-3 rounded mb-3"
              >
                <p>{sub.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}