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
      setPlans(res.data.plans || []);
      setMenu(res.data.menu);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubscribe = (planId) => {
    console.log("Subscribe to:", planId);
  };

  const handleViewMenu = (planId) => {
    console.log("Show menu for:", planId);
  };

  if (!vendor) return <p>Loading...</p>;

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