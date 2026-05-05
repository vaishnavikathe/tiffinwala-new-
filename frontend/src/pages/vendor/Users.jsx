import { useEffect, useState } from "react";
import { getUsers } from "../../services/vendorApi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then(res => {
        console.log("USERS DATA 👉", res.data);
        setUsers(res.data.subscribers); // ✅ FIX
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">
        Active Subscribers
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No subscribers yet</p>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">

          {/* Header */}
          <div className="grid grid-cols-6 gap-4 px-6 py-3 bg-gray-100 text-sm font-medium text-gray-600">
            <p>Diner</p>
            <p>Plan</p>
            <p>Billing</p>
            <p>Status</p>
          </div>

          {/* Rows */}
          {users.map((sub) => (
            <div
              key={sub._id}
              className="grid grid-cols-6 gap-4 px-6 py-4 border-t items-center"
            >
              <p className="font-medium">
                {sub.userId?.name}
              </p>

              <p>
                {sub.planId?.planName}
              </p>

              <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-600 w-fit">
                postpaid
              </span>

              <span className="text-green-600 font-medium">
                Active
              </span>
            </div>
          ))}

        </div>
      )}
    </>
  );
};

export default Users;