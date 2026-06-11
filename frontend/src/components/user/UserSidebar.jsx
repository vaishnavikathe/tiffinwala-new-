import { NavLink, useNavigate } from "react-router-dom";
import { FiUsers, FiLogOut, FiX, FiCalendar, FiCreditCard, FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";
import userAPI from "../../services/userApi";

const UserSidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";
  const [profilePic, setProfilePic] = useState(null); 

  useEffect(() => {
    userAPI.get("/user/profile")
      .then(res => {
        if (res.data.user?.profilePic) {
          setProfilePic(`http://localhost:5000${res.data.user.profilePic}`);
        }
      })
      .catch(() => {});
  }, []);


  const menuItems = [
    { name: "Browse Vendors", path: "/user/vendors", icon: <FiUsers /> },
    { name: "My Subscription", path: "/user/subscription", icon: <FiCalendar /> },
    { name: "Billing", path: "/user/billing", icon: <FiCreditCard /> },
     
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/user-login");
  };
  

  return (
    <div className="w-64 h-screen bg-[#0B1A2C] text-white p-5 flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">TiffinWala</h2>
        <button onClick={closeSidebar} className="text-2xl">
          <FiX />
        </button>
      </div>
 
      {/* User Avatar */}
        <div
          className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 mb-6 cursor-pointer hover:bg-white/20 transition"
          onClick={() => navigate("/user/profile")}
        >
          <div className="w-9 h-9 rounded-full overflow-hidden bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
            {profilePic ? (
              <img src={profilePic} alt="profile" className="w-full h-full object-cover" />
            ) : (
              userName.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <p className="text-sm font-semibold">{userName}</p>
            <p className="text-xs text-gray-400">User Account</p>
          </div>
        </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end} 
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

      {/* Logout */}
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