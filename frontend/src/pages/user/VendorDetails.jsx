// src/pages/user/VendorDetails.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";
import PlanList from "../../components/user/PlanList";

const VendorDetails = () => {
  const { id } = useParams();

  const [vendor, setVendor] = useState(null);
  const [plans, setPlans] = useState([]);
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    fetchVendorDetails();
  }, []);

  const fetchVendorDetails = async () => {
    try {
      const res = await API.get(`/vendor/${id}/details`);

      setVendor(res.data.vendor);
      setMenu(res.data.menu);

      // 🔥 IMPORTANT: Transform backend plans → UI-friendly format
      const rawPlans = res.data.plans || [];

      const formattedPlans = rawPlans.flatMap((plan) => {
        const result = [];

        // ✅ Prepaid Plans
        if (plan.prepaidPlans?.length) {
          plan.prepaidPlans.forEach((p) => {
            result.push({
              _id: `${plan._id}_pre_${p.name}`,
              title: `${plan.planName} - ${p.name}`,
              price: p.price,
              mealCount: p.tiffinCount,
              type: "prepaid",
            });
          });
        }

        // ✅ Postpaid Plan
        if (plan.postpaidPlan) {
          result.push({
            _id: `${plan._id}_post`,
            title: `${plan.planName} - Postpaid`,
            price: plan.postpaidPlan.pricePerTiffin,
            mealCount: "Per meal",
            type: "postpaid",
          });
        }

        return result;
      });

      setPlans(formattedPlans);

    } catch (err) {
      console.error("Vendor Details Error:", err);
    }
  };

  const handleSubscribe = (planId) => {
    console.log("Subscribe to:", planId);
  };

  const handleViewMenu = (planId) => {
    console.log("Show menu for:", planId);

    // later you can open modal using `menu` state
    console.log("Menu data:", menu);
  };

  if (!vendor) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      
      {/* Vendor Info */}
      <div>
        <h1 className="text-2xl font-bold">
          {vendor.shopName}
        </h1>
        <p className="text-gray-600">{vendor.cuisine}</p>
        <p className="text-gray-500">{vendor.address}</p>
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Available Plans
        </h2>

        <PlanList
          plans={plans}
          onSubscribe={handleSubscribe}
          onViewMenu={handleViewMenu}
        />
      </div>
    </div>
  );
};

export default VendorDetails;