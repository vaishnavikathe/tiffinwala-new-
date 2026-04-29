import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useVendors from "../../hooks/useVendors";
import VendorGrid from "../../components/user/VendorGrid";

const Vendors = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    vendors,
    totalPages,
    loading,
    error,
  } = useVendors(currentPage, 9);

  const navigate = useNavigate();

  const handleViewPlans = (vendorId) => {
    navigate(`/user/vendors/${vendorId}`);
  };

  // Loading state
  if (loading) {
    return (
      <p className="text-center mt-10">
        Loading vendors...
      </p>
    );
  }

  // Error state
  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">
        {error}
      </p>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Browse Vendors
      </h1>

      <VendorGrid
        vendors={vendors}
        onViewPlans={handleViewPlans}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2 flex-wrap">
          
          {/* Previous */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {/* Page Numbers */}
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

          {/* Next */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Vendors;