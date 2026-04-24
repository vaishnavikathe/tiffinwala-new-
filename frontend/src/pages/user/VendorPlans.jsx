import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVendorPlans } from "../../services/userApi";
import PlanCard from "../../components/user/PlanCard";

const VendorPlans = () => {
  const { vendorId } = useParams();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const res = await getVendorPlans(vendorId);
    setPlans(res.data.plans || []);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {plans.length === 0 ? (
        <p>No Plans Available</p>
      ) : (
        plans.map(plan => (
          <PlanCard key={plan._id} plan={plan} />
        ))
      )}
    </div>
  );
};

export default VendorPlans;
