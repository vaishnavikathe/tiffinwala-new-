import { useEffect, useState } from "react";
import { getUserSubscriptions } from "../../services/userApi";
import BackButton from "../../components/layout/BackButton";

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const res = await getUserSubscriptions();
      setSubscriptions(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (subscriptions.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">No subscriptions yet!</p>
        <BackButton />
      </div>
    );
  }

  const sub = subscriptions[0]; // Latest subscription

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">My Subscription</h1>
      <p className="text-gray-500 mb-6">
        Active with {sub.vendorId?.shopName}
      </p>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left - Subscription Card */}
        <div className="flex-1">
          <div className="bg-gradient-to-br from-green-800 to-green-500 text-white rounded-2xl p-6 mb-6">
            <span className="bg-white/20 text-xs px-2 py-1 rounded-full uppercase tracking-wide">
              {sub.planId?.planType || "Prepaid"}
            </span>
            <h2 className="text-3xl font-bold mt-4">{sub.planId?.planName}</h2>
            <p className="text-white/80 mt-1">
              {sub.vendorId?.shopName} · {sub.vendorId?.address}
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div>
                <p className="text-xs text-white/60 uppercase">Start</p>
                <p className="font-medium">
                  {new Date(sub.startDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase">End</p>
                <p className="font-medium">
                  {new Date(sub.endDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase">Status</p>
                <p className="font-medium capitalize">{sub.status}</p>
              </div>
            </div>
          </div>

          {/* Menu Table */}
          <h3 className="font-semibold mb-3">This week's menu</h3>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((day) => (
                  <tr key={day} className="border-b last:border-0">
                    <td className="py-3 px-4 font-medium w-28">{day}</td>
                    <td className="py-3 px-4 text-gray-500">Menu not available</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right - Bill Summary */}
        <div className="lg:w-72 space-y-4">
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold text-lg mb-4">Bill summary</h3>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Plan price</span>
              <span>₹{sub.planId?.price || 0}</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-500">Extra tiffins (0)</span>
              <span>₹0</span>
            </div>
            <div className="flex justify-between font-bold text-base border-t pt-3">
              <span>Total</span>
              <span>₹{sub.planId?.price || 0}</span>
            </div>
            <span className="inline-block mt-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
              Paid
            </span>
          </div>

          {/* Extra Tiffins */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold mb-2">Extra tiffins</h3>
            <p className="text-gray-400 text-sm">No extras yet.</p>
          </div>

          {/* Cancel */}
          <button className="text-red-500 text-sm flex items-center gap-1 hover:underline">
            ✕ Cancel subscription
          </button>
        </div>
      </div>

      <BackButton />
    </div>
  );
};

export default SubscriptionPage;