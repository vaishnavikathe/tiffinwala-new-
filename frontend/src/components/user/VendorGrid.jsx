// src/components/user/VendorGrid.jsx

import VendorCard from "./VendorCard";

const VendorGrid = ({ vendors, onViewPlans }) => {
  if (!vendors.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No Vendors Available
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {vendors.map((vendor) => (
        <VendorCard
          key={vendor._id}
          vendor={vendor}
          onViewPlans={onViewPlans}
        />
      ))}
    </div>
  );
};

export default VendorGrid;