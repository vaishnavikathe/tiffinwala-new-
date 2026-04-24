import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiLogOut, FiX } from "react-icons/fi";

const UserSidebar = ({ isOpen, closeSidebar }) => {
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
    <div
  className={`h-screen bg-[#0B1A2C] text-white p-5
  transition-all duration-300
  ${isOpen ? "w-64" : "w-0 overflow-hidden"}`}
>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold">TiffinWala</h2>
        <button onClick={closeSidebar} className="text-2xl">
          <FiX />
        </button>
      </div>

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

      <div className="absolute bottom-5 left-0 w-full px-5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-600"
        >
          <FiLogOut />
          Logout
        </button>
      </div>

    </div>
  );
};

export default UserSidebar;