import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { registerVendor } from "../../services/api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast"; 

const VendorRegister = () => {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",   
    cuisine: "",
    shopName: "",
    shopAddress: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // ✅ added

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ VALIDATION FUNCTION
  const validateForm = () => {
    const { email, phone, password, confirmPassword } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }

    if (!phoneRegex.test(phone)) {
      return "Phone must be 10 digits";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await registerVendor(formData);

      console.log("Vendor registered:", res);

      toast.success("Vendor Registered Successfully!", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#fff7ed",
          color: "#c2410c",
          border: "1px solid #fdba74",
        },
      });

      navigate("/vendor-login");

    } catch (err) {
      setError(err.message || "Registration failed");

      toast.error("Registration failed!", {
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section flex justify-center items-center px-4">
      <Card className="w-full max-w-3xl">

        <h2 className="text-3xl font-bold text-[#1A1208] mb-2 text-center">
          Vendor Registration
        </h2>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <Input
          
            label="Shop Name"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            placeholder="Enter your shop name"
            required
          />
          <label className="block text-sm font text-gray-700 mb-1.5 ml-1">
    Shop Address
  </label>
    
          <textarea
            name="shopAddress"
            value={formData.shopAddress}
            onChange={handleChange}
            placeholder="Enter your shop address"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 
            focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
            outline-none transition-all resize-none"
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="kitchen@gmail.com"
            required
          />

          <Input
  label="Phone Number"
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={(e) => {
    // ✅ allow only digits
    let value = e.target.value.replace(/\D/g, "");

    // ✅ limit to 10 digits
    if (value.length > 10) return;

    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
  }}
  placeholder="Enter 10-digit phone number"
  required
/>
          {/* Password */}
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-600" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-600" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Cuisine */}
          <select
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            required
            className="w-full mt-1 px-3 py-2 border rounded-md 
            bg-white text-gray-700
            focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select cuisine</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="North-Indian">North-Indian</option>
            <option value="Jain">Jain</option>
            <option value="Multi-Cuisine">Multi-Cuisine</option>
          </select>

          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>

        </form>
      </Card>
    </div>
  );
};

export default VendorRegister;