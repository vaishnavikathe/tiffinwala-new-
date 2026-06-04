import { useEffect, useState, useRef } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import { FiCamera } from "react-icons/fi";

const UserProfile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // FETCH PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Profile Response:", res.data);
        const user = res.data.user;
        setForm({
          name: user.name || "",
          email: user.email || "",
          mobile: user.mobile || "",
          address: user.address || "",
          password: ""
        });
        if (user.profilePic) {
          setPreview(`http://localhost:5000/${user.profilePic}`);
        }
      } catch (err) {
        console.error("PROFILE LOAD ERROR:", err);
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("address", form.address);
      formData.append("password", form.password);
      if (image) {
        formData.append("profilePic", image);
      }
      const res = await API.put("/user/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      const updatedUser = res.data.user;
      localStorage.setItem("userName", updatedUser.name);
      if (updatedUser.profilePic) {
        setPreview(`http://localhost:5000${updatedUser.profilePic}`);
      }
      setForm({
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        mobile: updatedUser.mobile || "",
        address: updatedUser.address || "",
        password: ""
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("UPDATE ERROR:", err.response?.data);
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-md">

        <h2 className="text-2xl font-semibold mb-6 text-center">My Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-24 h-24 rounded-full overflow-hidden border-2 border-orange-500 cursor-pointer relative"
              onClick={() => fileInputRef.current.click()}
            >
              {preview ? (
                <img src={preview} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                  <span className="text-4xl font-bold text-orange-500">
                    {form.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 right-0 bg-orange-500 p-1 rounded-full">
                <FiCamera size={12} className="text-white" />
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Name */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 border rounded"
          />

          {/* Email - disabled */}
          <input
            name="email"
            value={form.email}
            disabled
            className="w-full p-3 border rounded bg-gray-100"
          />

          {/* Mobile - disabled */}
          <input
            name="mobile"
            value={form.mobile}
            disabled
            className="w-full p-3 border rounded bg-gray-100"
          />

          {/* Address */}
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-3 border rounded"
          />

          {/* Password Confirm */}
          <div className="border-t pt-4">
            <label className="text-sm text-gray-600 mb-1 block">
              Current Password (required to save changes)
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password to confirm changes"
              required
              className="w-full p-3 border rounded"
            />
          </div>

          <button
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 text-white w-full py-3 rounded-lg"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default UserProfile;