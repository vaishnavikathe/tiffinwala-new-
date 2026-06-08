import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminAPI from "../../services/adminApi";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await adminAPI.post("/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem(
          "adminToken",
          res.data.token
        );

        navigate("/admin/dashboard");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FEF9F2] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-orange-100 shadow-sm">
        <div className="text-center mb-6">
          <div className="border border-white/30 rounded px-3 py-1.5 inline-block bg-[#0a192f] text-white text-sm font-bold tracking-wider mb-2">
            TIFFIN<span className="text-[#f15a24]">WALA</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-2">
            Admin Portal
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Log in to manage your platform metrics
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 text-sm"
              placeholder="admin@tiffinwala.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-orange-500 text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0a192f] hover:bg-[#122543] text-white font-semibold rounded-xl shadow-md transition-all mt-4 text-sm tracking-wide disabled:opacity-50"
          >
            {loading
              ? "Signing In..."
              : "Sign In as Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;