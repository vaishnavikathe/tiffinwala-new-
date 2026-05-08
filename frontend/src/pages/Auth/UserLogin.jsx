import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { loginUser } from "../../services/api";
import {
   EyeIcon,
   EyeSlashIcon 
   } from "@heroicons/react/24/outline";
import BackButton from "../../components/layout/BackButton";

const UserLogin = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // HANDLE LOGIN
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const res = await loginUser(formData);

      console.log("LOGIN RESPONSE 👉", res);

      localStorage.setItem("token", res.token);
      localStorage.setItem("userName", res.user.name);

      console.log("Login success:", res);

      navigate("/user/vendors");

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="section flex justify-center items-center min-h-screen relative">

      <Card className="w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-4">
          User Login
        </h2>

        {/* ERROR */}
        {error && (
          <div className="text-red-600 bg-red-50 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 mt-4"
        >

          {/* EMAIL / MOBILE */}
          <Input
            label="Email/Mobile"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
          />

          {/* PASSWORD */}
          <div className="relative">

            <Input
              label="Password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-9"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-600" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>

          </div>

          {/* LOGIN BUTTON */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </Button>

        </form>

        {/* REGISTER */}
        <p className="text-center mt-4">
          Don’t have an account?{" "}

          <span
            onClick={() =>
              navigate("/user-register")
            }
            className="text-orange-500 cursor-pointer hover:underline"
          >
            Register
          </span>

        </p>

      </Card>

      {/* BACK BUTTON */}
      <BackButton />

    </div>
  );
};

export default UserLogin;