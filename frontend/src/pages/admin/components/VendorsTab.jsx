import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";

export default function VendorsTab() {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/vendors"
      );

      setVendors(res.data.Vendors || []);
    } catch (error) {
      console.log(error);
    }
  };

  const approveVendor = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/admin/vendors/${id}/approve`
      );

      alert(res.data.message || "Vendor Approved");
      fetchVendors();
    } catch (error) {
      console.log(error);
      alert("Failed to approve vendor");
    }
  };

  const suspendVendor = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/admin/vendors/${id}/suspend`
      );

      alert(res.data.message || "Vendor Suspended");
      fetchVendors();
    } catch (error) {
      console.log(error);
      alert("Failed to suspend vendor");
    }
  };

  const filteredVendors = vendors.filter((vendor) =>
    `${vendor.shopName} ${vendor.ownerName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Vendors
        </h1>
        <p className="text-sm text-gray-500">
          Manage all vendors
        </p>
      </div>

      {/* Search */}
      <div className="relative w-full md:w-72">
        <Search
          size={16}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search vendor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border rounded-xl focus:outline-none"
        />
      </div>

      {/* Vendor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => {
          const status = (
            vendor.status || "active"
          ).toLowerCase();

          return (
            <div
              key={vendor._id}
              className="bg-white rounded-2xl border p-6 shadow-sm"
            >
              <h3 className="font-bold text-lg">
                {vendor.shopName}
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Owner: {vendor.ownerName}
              </p>

              <p className="text-gray-500 text-sm">
                {vendor.address}
              </p>

              <p className="text-gray-500 text-sm">
                {vendor.cuisine}
              </p>

              <div className="mt-4">
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    status === "approved" ||
                    status === "active"
                      ? "bg-green-100 text-green-700"
                      : status === "suspended"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {status}
                </span>
              </div>

              <div className="flex gap-2 mt-5">
                {(status === "pending" ||
                  status === "suspended") && (
                  <button
                    onClick={() =>
                      approveVendor(vendor._id)
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Approve
                  </button>
                )}

                {(status === "approved" ||
                  status === "active") && (
                  <button
                    onClick={() =>
                      suspendVendor(vendor._id)
                    }
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Suspend
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}