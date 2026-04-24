import { useState } from "react";
import { Outlet } from "react-router-dom";

import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";

const UserDashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">

      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? "w-64" : "w-0"
        }`}
      >
        <UserSidebar
          isOpen={isOpen}
          closeSidebar={() => setIsOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-100 transition-all duration-300">

        <UserNavbar
          isOpen={isOpen}
          openSidebar={() => setIsOpen(true)}
        />

        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default UserDashboardLayout;