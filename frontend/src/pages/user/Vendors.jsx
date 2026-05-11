import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useVendors from "../../hooks/useVendors";
import VendorGrid from "../../components/user/VendorGrid";
import BackButton from "../../components/layout/BackButton";
import { Search } from "lucide-react";

const Vendors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const page = searchQuery ? 1 : currentPage;
  const limit = searchQuery ? 1000 : 9;
  const { vendors, totalPages, loading, error } = useVendors(page, limit);

  const navigate = useNavigate();

  const handleViewPlans = (vendorId) => {
    navigate(`/user/vendors/${vendorId}`);
  };

  console.log(vendors[0])

  // Frontend filtering
  const filteredVendors = vendors.filter((vendor) => {
  const query = searchQuery.toLowerCase();
  return (
    vendor.shopName?.toLowerCase().includes(query) ||
    vendor.cuisine?.toLowerCase().includes(query) ||
    vendor.address?.toLowerCase().includes(query)
  );
});

  if (loading) {
    return <p className="text-center mt-10">Loading vendors...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Browse Vendors</h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by name, cuisine or city..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // reset to page 1 on search
          }}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <VendorGrid
        vendors={filteredVendors}
        onViewPlans={handleViewPlans}
      />

      {/* Pagination - sirf tab dikhao jab search nahi ho raha */}
      {!searchQuery && totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white"
                  : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
      <BackButton />
    </div>
  );
};

export default Vendors;