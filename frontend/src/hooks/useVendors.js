import { useEffect, useState } from "react";
import { getVendors } from "../services/userApi";

const useVendors = (page, limit = 9) => {
  const [vendors, setVendors] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVendors, setTotalVendors] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getVendors({ page, limit });

        // Defensive handling
        const data = res.data;

        setVendors(data.vendors || []);
        setTotalPages(data.totalPages || 1);
        setTotalVendors(data.total || 0);

      } catch (err) {
        console.error("Vendor fetch error:", err);
        setError("Failed to load vendors");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [page, limit]);

  return {
    vendors,
    totalPages,
    totalVendors,
    loading,
    error,
  };
};

export default useVendors;