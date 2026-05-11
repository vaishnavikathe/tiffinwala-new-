import { useState } from "react";
import { Outlet } from "react-router-dom";

import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";

const UserDashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      {isOpen && (
        <UserSidebar closeSidebar={() => setIsOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">

        {/* Navbar */}
        <UserNavbar
          isOpen={isOpen}
          openSidebar={() => setIsOpen(true)}
        />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default UserDashboardLayout;