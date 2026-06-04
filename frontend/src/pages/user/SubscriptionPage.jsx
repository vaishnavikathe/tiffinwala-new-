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
      setSubscriptions(res.data.subscriptions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    alert("Cancel subscription feature coming soon!");
    // TODO: API ready hone pe yahan connect karna
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

  const sub = subscriptions[0];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">My Subscription</h1>
      <p className="text-gray-500 mb-6">
        Active with {sub.vendorId?.shopName}
      </p>

      {/* Subscription Card */}
      <div className="bg-gradient-to-br from-orange-600 to-orange-400 text-white rounded-2xl p-6 mb-6">
        <span className="bg-white/20 text-xs px-2 py-1 rounded-full uppercase tracking-wide">
          {sub.status || "Active"}
        </span>
        <h2 className="text-3xl font-bold mt-4">
          {sub.planId?.planName || "Plan"}
        </h2>
        <p className="text-white/80 mt-1">
          {sub.vendorId?.shopName}
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

      {/* This Week's Menu */}
      <h3 className="font-semibold mb-3">This week's menu</h3>
      <div className="bg-white rounded-xl shadow overflow-hidden mb-6">
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

      {/* Cancel Button */}
      <button
      onClick={handleCancel}
      className="flex items-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl border border-red-200 transition font-medium"
      >
          ✕ Cancel Subscription
      </button>

      <BackButton />
    </div>
  );
};

export default SubscriptionPage;