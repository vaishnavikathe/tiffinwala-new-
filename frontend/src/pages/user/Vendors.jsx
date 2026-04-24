import { useEffect, useState } from "react";
import { getVendors } from "../../services/userApi";
import VendorCard from "../../components/user/VendorCard";
import { useNavigate } from "react-router-dom";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    const res = await getVendors();
    setVendors(res.data.vendors || []);
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {vendors.length === 0 ? (
        <p>No Vendors Available</p>
      ) : (
        vendors.map(vendor => (
          <VendorCard
            key={vendor._id}
            vendor={vendor}
            onClick={() => navigate(`/vendors/${vendor._id}`)}
          />
        ))
      )}
    </div>
  );
};

export default VendorList;