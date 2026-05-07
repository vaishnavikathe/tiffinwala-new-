import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const FloatingBackButton = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Invisible hover area */}
      <div
        className="fixed top-0 left-0 h-screen w-6 z-40"
        onMouseEnter={() => setShow(true)}
      />

      {/* Back Button */}
      <div
        onMouseLeave={() => setShow(false)}
        className={`fixed top-1/2 left-0 -translate-y-1/2 z-50 transition-all duration-300 ${
          show ? "translate-x-0" : "-translate-x-16"
        }`}
      >
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-r-xl shadow-lg"
        >
          <ArrowLeft size={22} />
        </button>
      </div>
    </>
  );
};

export default FloatingBackButton;