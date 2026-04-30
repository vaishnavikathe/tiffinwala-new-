import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [vendor, setVendor] = useState(null);

  // ✅ SAFE vendor fetch
  useEffect(() => {
    try {
      const storedVendor = localStorage.getItem("vendor");

      if (storedVendor && storedVendor !== "undefined") {
        setVendor(JSON.parse(storedVendor));
      } else {
        const name = localStorage.getItem("vendorName");
        if (name) {
          setVendor({ ownerName: name });
        }
      }
    } catch (error) {
      console.error("Vendor parse error:", error);
    }
  }, []);

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

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("vendor");
    localStorage.removeItem("vendorName");
    localStorage.removeItem("shopName");

    navigate("/vendor-login");
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-[#0B1A2C] text-white p-5 
      transform transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold tracking-wide">
          TiffinWala
        </h2>

        <button
          onClick={() => closeSidebar && closeSidebar()}
          className="text-2xl"
        >
          <FiX />
        </button>
      </div>

      {/* 👤 PROFILE CARD (CLICKABLE) */}
      {vendor && (
        <div
          onClick={() => navigate("/vendor/profile")}
          className="mb-6 p-3 bg-white/10 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-white/20 transition"
        >
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500">
            {vendor.profilePic ? (
              <img
                src={`http://localhost:5000${vendor.profilePic}`}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-orange-500 text-white font-bold">
                {vendor.ownerName?.charAt(0) || "V"}
              </div>
            )}
          </div>

          {/* Name + Role */}
          <div>
            <p className="text-sm font-semibold">
              {vendor.ownerName || "Vendor"}
            </p>
            <p className="text-xs text-gray-300">
              Vendor Account
            </p>
          </div>
        </div>
      )}

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

      {/* LOGOUT */}
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