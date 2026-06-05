import { useEffect, useState } from "react";
import { getUserSubscriptions, getPlanByMenu, cancelSubscription } from "../../services/userApi";
import BackButton from "../../components/layout/BackButton";
import toast from "react-hot-toast";

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const res = await getUserSubscriptions();
      const subs = res.data.subscriptions || [];
      setSubscriptions(subs);

      if (subs.length > 0 && subs[0].planId?._id) {
        const menuRes = await getPlanByMenu(subs[0].planId._id);
        setMenus(menuRes.data.menus || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this subscription?")) return;
    try {
      await cancelSubscription(subscriptions[0]._id);
      toast.success("Subscription cancelled!");
      fetchSubscriptions();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Cancel failed!");
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
        {menus.length === 0 ? (
          <p className="text-gray-400 text-sm p-4">Menu not available</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-gray-500">Day</th>
                <th className="py-3 px-4 text-left text-gray-500">Meal Type</th>
                <th className="py-3 px-4 text-left text-gray-500">Items</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu) => (
                <tr key={menu._id} className="border-t">
                  <td className="py-3 px-4 font-medium">{menu.day}</td>
                  <td className="py-3 px-4 text-gray-500">{menu.mealType}</td>
                  <td className="py-3 px-4 text-gray-500">
                    {menu.items?.map(item => item.name).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Cancel Button */}
      <button
        onClick={handleCancel}
        className="flex items-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl border border-red-200 transition font-medium"
      >
         Cancel Subscription
      </button>

      <BackButton />
    </div>
  );
};

export default SubscriptionPage;