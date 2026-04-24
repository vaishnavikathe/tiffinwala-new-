import { FiMenu } from "react-icons/fi";

const userName = localStorage.getItem("userName");

const UserNavbar = ({ openSidebar, isOpen }) => {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow">

      <div className="flex items-center gap-4">
        {!isOpen && (
          <button onClick={openSidebar} className="text-2xl">
            <FiMenu />
          </button>
        )}

        <h2 className="text-lg font-semibold">
          Welcome, {userName || "User"} 👋
        </h2>
      </div>

    </div>
  );
};

export default UserNavbar;