import { useEffect, useState } from "react";
import vendorAPI from "../services/vendorApi";

const useVendorData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardRes = await vendorAPI.get("/vendor/dashboard");
        const plansRes = await vendorAPI.get("/plan");   // 🔥 GET ALL PLANS

        setData({
          ...dashboardRes.data,
          plans: plansRes.data.plans?.length || plansRes.data.length || 0,  // ✅ COUNT
        });

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};

export default useVendorData;