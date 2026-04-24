import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginVendor } from "../../services/api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; 

const VendorLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); 

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------------- HANDLE INPUT ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // ---------------- HANDLE SUBMIT ----------------
  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const res = await loginVendor(formData);

    // ✅ store token
    localStorage.setItem("token", res.token);

    // ✅ store vendor name (IMPORTANT)
    localStorage.setItem("vendorName", res.vendor.ownerName);

    // ✅ optional (nice UI)
    localStorage.setItem("shopName", res.vendor.shopName);

    console.log("Vendor login:", res);

    navigate("/vendor/dashboard");

  } catch (err) {
    setError(err.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FEF9F2] px-6">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-orange-100">

        <h2 className="text-3xl font-bold text-center mb-6">Vendor Login</h2>

        {error && (
          <div className="mb-4 text-red-600 bg-red-50 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            placeholder="Email or Mobile"
            className="w-full p-3 border rounded"
            required
          />

          {/* 👇 Password with Eye Icon */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border rounded pr-10"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-600" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded ${
              loading ? "bg-gray-400" : "bg-orange-600"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/vendor-register" className="text-orange-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VendorLogin;