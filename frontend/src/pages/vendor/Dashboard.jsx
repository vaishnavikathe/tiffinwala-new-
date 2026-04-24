import useVendorData from "../../hooks/useVendorData";
import { FiUsers, FiBox, FiShoppingCart } from "react-icons/fi";

const Dashboard = () => {
  const { data, loading } = useVendorData();

  return (
    <>
      <h2 className="heading mb-6">Dashboard</h2>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          <div className="card flex items-center gap-4">
            <FiUsers className="text-2xl text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <h3 className="text-xl font-bold">{data?.activeUsers || 0}</h3>
            </div>
          </div>

          <div className="card flex items-center gap-4">
            <FiBox className="text-2xl text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Plans</p>
              <h3 className="text-xl font-bold">{data?.plans || 0}</h3>
            </div>
          </div>

          <div className="card flex items-center gap-4">
            <FiShoppingCart className="text-2xl text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Orders</p>
              <h3 className="text-xl font-bold">{data?.orders || 0}</h3>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default Dashboard;