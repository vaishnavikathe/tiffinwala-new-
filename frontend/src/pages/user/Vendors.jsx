// src/pages/user/Vendors.jsx

import { useNavigate } from "react-router-dom";
import useVendors from "../../hooks/useVendors";
import VendorGrid from "../../pages/user/VendorGrid";

const Vendors = () => {
  const { vendors, loading, error } = useVendors();
  const navigate = useNavigate();

  const handleViewPlans = (vendorId) => {
    navigate(`/vendors/${vendorId}`);
  };

  if (loading) {
    return <p className="text-center mt-10">Loading vendors...</p>;
  }

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
    </div>
  );
};

export default Vendors;