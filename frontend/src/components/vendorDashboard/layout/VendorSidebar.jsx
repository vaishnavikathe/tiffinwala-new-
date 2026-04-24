import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiPlusCircle,
  FiMenu,
  FiUsers,
  FiLogOut,
  FiX
} from "react-icons/fi";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/vendor/dashboard", icon: <FiHome /> },
    { name: "Plan Management", path: "/vendor/add-plan", icon: <FiPlusCircle /> },
    { name: "Menu Management", path: "/vendor/menu", icon: <FiMenu /> },
    { name: "Users", path: "/vendor/users", icon: <FiUsers /> },
  ];

  const baseClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200";
  const inactiveClass = "hover:bg-orange-500 text-gray-300";
  const activeClass = "bg-orange-600 text-white";

  // ✅ ONLY ONE logout function (correct place)
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("vendorName"); // 🔥 important
    localStorage.removeItem("shopName");   // optional

    navigate("/vendor-login");
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-[#0B1A2C] text-white p-5 
      transform transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold tracking-wide">
          TiffinWala
        </h2>

        <button onClick={closeSidebar} className="text-2xl">
          <FiX />
        </button>
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* LOGOUT BUTTON */}
      <div className="absolute bottom-5 left-0 w-full px-5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500 transition w-full"
        >
          <FiLogOut />
          Logout
        </button>
      </div>

    </div>
  );
};

export default Sidebar;