// src/components/user/VendorCard.jsx

import Button from "../../components/ui/Button";

const VendorCard = ({ vendor, onViewPlans }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between hover:shadow-lg transition">
      
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {vendor.shopName}
        </h2>

        <p className="text-sm text-gray-600">
          🍽 {vendor.cuisine || "Not specified"}
        </p>

        <p className="text-sm text-gray-500">
          📍 {vendor.address || "No address"}
        </p>
      </div>

      <div className="mt-4">
        <Button
          className="w-full"
          onClick={() => onViewPlans(vendor._id)}
        >
          View Plans
        </Button>
      </div>
    </div>
  );
};

export default VendorCard;