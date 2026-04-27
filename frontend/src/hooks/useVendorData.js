import { useEffect, useState } from "react";
import API from "../services/api";

const useVendorData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardRes = await API.get("/vendor/dashboard");
        const plansRes = await API.get("/plan");   // 🔥 GET ALL PLANS

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