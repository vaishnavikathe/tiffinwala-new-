import { useEffect, useState } from "react";
import { getUsers } from "../../services/vendorApi";
import DashboardLayout from "../../components/vendorDashboard/layout/VendorDashboardLayout";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then(res => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h2 className="text-2xl font-semibold">Active Users</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border rounded">

            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Plan</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.plan || "-"}</td>
                  <td className="p-3 text-green-600">Active</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </>
  );
};

export default Users;