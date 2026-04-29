import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiLogOut, FiX } from "react-icons/fi";

const UserSidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/user", icon: <FiHome /> },
    { name: "Vendors", path: "/user/vendors", icon: <FiUsers /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/user-login");
  };

  return (
    <div className="w-64 h-screen bg-[#0B1A2C] text-white p-5 flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold">TiffinWala</h2>
        <button onClick={closeSidebar} className="text-2xl">
          <FiX />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg ${
                isActive
                  ? "bg-orange-600 text-white"
                  : "hover:bg-orange-500 text-gray-300"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout (sticks to bottom) */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-600 w-full"
        >
          <FiLogOut />
          Logout
        </button>
      </div>

    </div>
  );
};

export default UserSidebar;