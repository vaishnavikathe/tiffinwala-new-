import { useEffect, useState } from "react";
import { getUsers } from "../../services/vendorApi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then(res => {
        console.log("USERS DATA 👉", res.data);
        setUsers(res.data.subscribers || []);
      })
      .finally(() => setLoading(false));
  }, []);

    

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Active Subscribers
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No subscribers yet</p>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">

          {/* ✅ HEADER */}
          <div className="grid grid-cols-8 gap-4 px-6 py-3 bg-gray-100 text-sm font-medium text-gray-600">
            <p>User</p>
            <p>Plan</p>
            <p>Period</p>
            <p>Billing</p>
            <p>Base</p>
            <p>Extra</p>
            <p>Status</p>
            <p>Total</p>
          </div>

          {/* ✅ ROWS */}
          {users.map((sub) => (
            <div
              key={sub._id}
              className="grid grid-cols-8 gap-4 px-6 py-4 border-t items-center text-sm"
            >
              {/* User */}
              <p className="font-medium">
                {sub.userId?.name }
              </p>

              {/* Plan */}
              <p>
                {sub.planId?.planName || "-"}
              </p>

              {/* Period */}
              <p className="text-gray-500">
                {sub.startDate?.slice(0, 10) || "-"} <br />
                {sub.endDate?.slice(0, 10) || "-"}
              </p>

              {/* Billing */}
              <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-600 w-fit">
                {sub.billingType || "postpaid"}
              </span>

              {/* Base */}
              <p>₹{sub.basePrice || 0}</p>

              {/* Extra */}
              <p>
                {sub.extraMeals || 0} <br />
                ₹{sub.extraCost || 0}
              </p>

              {/* Status */}
              <span className="text-green-600 font-medium">
                {sub.status || "Active"}
              </span>

              {/* Total */}
              <p className="font-semibold text-green-700">
                ₹{sub.total || 0}
              </p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Users;