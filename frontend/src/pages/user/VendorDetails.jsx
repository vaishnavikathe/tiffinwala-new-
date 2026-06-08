import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import vendorAPI from "../../services/vendorApi";
import { createSubscription } from "../../services/userApi";
import BackButton from "../../components/layout/BackButton";
import { X } from "lucide-react";

const VendorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vendor, setVendor] = useState(null);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null); // Modal ke liye
  const [subscribing, setSubscribing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVendorDetails();
  }, []);

  const fetchVendorDetails = async () => {
    try {
      const res = await vendorAPI.get(`/vendor/${id}/details`);
      console.log("API Response:", res.data);
      setVendor(res.data.vendor);

      const rawPlans = res.data.plans || [];
      console.log("Plans:", rawPlans); 
      setPlans(rawPlans);
    } catch (err) {
      console.error("Vendor Details Error:", err);
    }
  };

  const handleSubscribe = async (planId, type) => {
    try {
      setSubscribing(true);
      setError("");
      await createSubscription({ vendorId: id, planId });
      setSelectedPlan(null);
      navigate("/user/subscription"); // Subscription page pe navigate karo
    } catch (err) {
      setError(err.response?.data?.message || "Subscription failed");
    } finally {
      setSubscribing(false);
    }
  };

  if (!vendor) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">

      {/* Vendor Info */}
      <div>
        <h1 className="text-2xl font-bold">{vendor.shopName}</h1>
        <p className="text-gray-600">{vendor.cuisine}</p>
        <p className="text-gray-500">{vendor.address}</p>
      </div>

      {/* Plans Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedPlan(plan)}
            >
              <h3 className="text-lg font-semibold">{plan.planName}</h3>
              <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {plan.prepaidPlans?.map((p) => (
                  <span key={p.name} className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                    {p.name} - ₹{p.price}
                  </span>
                ))}
                {plan.postpaidPlan && (
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                    Postpaid - ₹{plan.postpaidPlan.pricePerTiffin}/meal
                  </span>
                )}
              </div>
              <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm font-medium transition">
                View Plans
              </button>
            </div>
          ))}
        </div>
      </div>

      <BackButton />

      {/* Modal - Image 2 Jaisa */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">

            {/* Close Button */}
            <button
              onClick={() => { setSelectedPlan(null); setError(""); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            {/* Vendor Name */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🍱</span>
              <h2 className="text-xl font-bold">{vendor.shopName}</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">{selectedPlan.description}</p>

            {error && (
              <p className="text-red-500 text-sm mb-3">{error}</p>
            )}

            {/* Prepaid Plans */}
            {selectedPlan.prepaidPlans?.map((p) => (
              <div key={p.name} className="border rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{selectedPlan.planName} - {p.name}</h3>
                  <span className="text-lg font-bold text-gray-800">₹{p.price}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-gray-100 rounded-lg p-2 text-center">
                    <p className="text-sm font-medium">{selectedPlan.duration}d</p>
                    <p className="text-xs text-gray-500">duration</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2 text-center">
                    <p className="text-sm font-medium">{p.tiffinCount}</p>
                    <p className="text-xs text-gray-500">meals/day</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2 text-center">
                    <p className="text-sm font-medium">₹{selectedPlan.extraTiffinPrice || 0}</p>
                    <p className="text-xs text-gray-500">extra</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSubscribe(selectedPlan._id, "prepaid")}
                  disabled={subscribing}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition disabled:opacity-50"
                >
                  {subscribing ? "Subscribing..." : "Prepaid"}
                </button>
              </div>
            ))}

            {/* Postpaid Plan */}
            {selectedPlan.postpaidPlan && (
              <div className="border rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{selectedPlan.planName} - Postpaid</h3>
                  <span className="text-lg font-bold text-gray-800">
                    ₹{selectedPlan.postpaidPlan.pricePerTiffin}/meal
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-gray-100 rounded-lg p-2 text-center">
                    <p className="text-sm font-medium">{selectedPlan.duration}d</p>
                    <p className="text-xs text-gray-500">duration</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2 text-center">
                    <p className="text-sm font-medium">Per meal</p>
                    <p className="text-xs text-gray-500">billing</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2 text-center">
                    <p className="text-sm font-medium">₹{selectedPlan.extraTiffinPrice || 0}</p>
                    <p className="text-xs text-gray-500">extra</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSubscribe(selectedPlan._id, "postpaid")}
                  disabled={subscribing}
                  className="w-full border border-orange-500 text-orange-500 hover:bg-orange-50 py-2 rounded-lg font-medium transition disabled:opacity-50"
                >
                  {subscribing ? "Subscribing..." : "Postpaid"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDetails;