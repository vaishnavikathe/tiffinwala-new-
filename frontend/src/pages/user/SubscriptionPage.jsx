import { useEffect, useState } from "react";
import { getUserSubscriptions, getPlanByMenu, cancelSubscription, deleteSubscription, orderExtraTiffin, pauseTiffin } from "../../services/userApi";
import BackButton from "../../components/layout/BackButton";
import toast from "react-hot-toast";

const SubscriptionCard = ({ sub, onCancel, onDelete }) => {
  const [menus, setMenus] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [menuLoading, setMenuLoading] = useState(false);
  const [showExtraForm, setShowExtraForm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [ordering, setOrdering] = useState(false);
  const [showPauseForm, setShowPauseForm] = useState(false);
  const [pauseDate, setPauseDate] = useState("");
  const [pausing, setPausing] = useState(false);

  const fetchMenu = async () => {
    if (menus.length > 0) {
      setShowMenu(!showMenu);
      return;
    }
    try {
      setMenuLoading(true);
      const menuRes = await getPlanByMenu(sub.planId._id);
      setMenus(menuRes.data.menus || []);
      setShowMenu(true);
    } catch (_err) {
      toast.error("Menu fetch failed!");
    } finally {
      setMenuLoading(false);
    }
  };

  const handleExtraTiffin = async () => {
    try {
      setOrdering(true);
      await orderExtraTiffin(sub._id, {
        quantity: Number(quantity),
        pricePerTiffin: sub.planDetails?.price || 0
      });
      toast.success(`${quantity} extra tiffin(s) ordered!`);
      setShowExtraForm(false);
      setQuantity(1);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Order failed!");
    } finally {
      setOrdering(false);
    }
  };

  const handlePause = async () => {
  if (!pauseDate) {
    toast.error("Please select a date!");
    return;
  }
  try {
    setPausing(true);
    await pauseTiffin(sub._id, pauseDate);
    toast.success("Tiffin paused! End date extended by 1 day!");
    setShowPauseForm(false);
    setPauseDate("");
  } catch (err) {
    toast.error(err?.response?.data?.message || "Pause failed!");
  } finally {
    setPausing(false);
  }
};

  return (
    <div className="mb-8">
      {/* Subscription Card */}
      <div className="bg-gradient-to-br from-orange-600 to-orange-400 text-white rounded-2xl p-6 mb-4">
        <span className={`text-xs px-2 py-1 rounded-full uppercase tracking-wide ${
          sub.status === "active" ? "bg-white/20" : "bg-red-400/50"
        }`}>
          {sub.status}
        </span>
        <h2 className="text-2xl font-bold mt-4">
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

      {/* Menu Toggle Button */}
      <button
        onClick={fetchMenu}
        className="mb-3 text-sm text-orange-500 font-medium hover:underline"
      >
        {menuLoading ? "Loading..." : showMenu ? "▲ Hide Menu" : "▼ View This Week's Menu"}
      </button>

      {/* Menu Table */}
      {showMenu && (
        <div className="bg-white rounded-xl shadow overflow-hidden mb-4">
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
      )}

      {/* Buttons*/}
      {sub.status === "active" && (
        <div className="flex flex-wrap gap-3 mt-2">
          {/* Cancel Button */}
          <button
            onClick={() => onCancel(sub._id)}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl border border-red-200 transition font-medium"
          >
            ✕ Cancel Subscription
          </button>

            {/* Pause Tiffin Button */}
            {!showPauseForm ? (
              <button
                onClick={() => setShowPauseForm(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 rounded-xl border border-yellow-200 transition font-medium"
              >
                ⏸ Pause Tiffin
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  value={pauseDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={e => setPauseDate(e.target.value)}
                  className="p-2 border rounded-lg text-sm"
                />
                <button
                  onClick={handlePause}
                  disabled={pausing}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium disabled:opacity-50"
                >
                  {pausing ? "Pausing..." : "Confirm"}
                </button>
                <button
                  onClick={() => setShowPauseForm(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            )}
          {/* Extra Tiffin Button */}
          {!showExtraForm ? (
            <button
              onClick={() => setShowExtraForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-500 rounded-xl border border-orange-200 transition font-medium"
            >
              + Order Extra Tiffin
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                className="w-20 p-2 border rounded-lg text-center"
              />
              <button
                onClick={handleExtraTiffin}
                disabled={ordering}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium disabled:opacity-50"
              >
                {ordering ? "Ordering..." : "Confirm"}
              </button>
              <button
                onClick={() => setShowExtraForm(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {/* Delete Button */}
      {sub.status !== "active" && (
        <button
          onClick={() => onDelete(sub._id)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl border border-gray-300 transition font-medium mt-2"
        >
          🗑 Delete
        </button>
      )}
    </div>
  );
};

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

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this subscription?")) return;
    try {
      await cancelSubscription(id);
      toast.success("Subscription cancelled!");
      fetchSubscriptions();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Cancel failed!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subscription permanently?")) return;
    try {
      await deleteSubscription(id);
      toast.success("Subscription deleted!");
      fetchSubscriptions();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed!");
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

  const sorted = [...subscriptions].sort((a, _b) =>
    a.status === "active" ? -1 : 1
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Subscriptions</h1>

      {sorted.map((sub) => (
        <SubscriptionCard
          key={sub._id}
          sub={sub}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      ))}

      <BackButton />
    </div>
  );
};

export default SubscriptionPage;