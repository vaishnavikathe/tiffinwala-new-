import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { loginUser } from "../../services/api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; 

const UserLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); 

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await loginUser(formData);

      localStorage.setItem("token", res.token);

      console.log("Login success:", res);
      navigate("/user/vendors");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section flex justify-center items-center">
      <Card className="w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-4">
          User Login
        </h2>

        {error && (
          <div className="text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">

          <Input
            label="Email/Mobile"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
          />

          {/* 👇 Password with Eye Icon */}
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
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

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>
          

        </form>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/user-register")}
            className="text-orange-500 cursor-pointer"
          >
            Register
          </span>
        </p>

      </Card>
    </div>
  );
};

export default UserLogin;