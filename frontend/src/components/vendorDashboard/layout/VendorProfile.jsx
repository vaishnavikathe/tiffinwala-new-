import { useEffect, useState } from "react";
import API from "../../../services/api";
import toast from "react-hot-toast";

const Profile = () => {
  const [form, setForm] = useState({
    ownerName: "",
    email: "",
    mobile: "",
    shopName: "",
    address: "",
    profilePic: ""
  });

  const [image, setImage] = useState(null); // file
  const [preview, setPreview] = useState(null); //preview
  const [loading, setLoading] = useState(false);

  // Load existing data safely
  useEffect(() => {
    try {
      const stored = localStorage.getItem("vendor");

      if (stored && stored !== "undefined") {
        const vendor = JSON.parse(stored);
        setForm(vendor);

        if (vendor.profilePic) {
          setPreview(`http://localhost:5000${vendor.profilePic}`);
        }
      }
    } catch (err) {
      console.error("Vendor parse error:", err);
    }
  }, []);

  //  Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("ownerName", form.ownerName);
      formData.append("email", form.email);
      formData.append("mobile", form.mobile);
      formData.append("shopName", form.shopName);
      formData.append("address", form.address);

      if (image) {
        formData.append("profilePic", image); // backend field
      }

      const res = await API.put("/vendor/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      // Update localStorage
      localStorage.setItem("vendor", JSON.stringify(res.data.vendor));

      toast.success("Profile updated");

      // refresh UI instantly
      window.location.reload();

    } catch (err) {
      console.error("PROFILE ERROR:", err.response?.data);
      toast.error(err?.response?.data?.message || "Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-md">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* 📸 Profile Image */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-orange-500">
              <img
                src={
                  preview ||
                  "https://via.placeholder.com/100"
                }
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            <input
              type="file"
              onChange={handleImageChange}
              className="text-sm"
            />
          </div>

          {/* Inputs */}
          <input
            name="ownerName"
            value={form.ownerName || ""}
            onChange={handleChange}
            placeholder="Owner Name"
            className="w-full p-3 border rounded"
          />

          <input
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border rounded"
          />

          <input
            name="mobile"
            value={form.mobile || ""}
            onChange={handleChange}
            placeholder="Mobile"
            className="w-full p-3 border rounded"
          />

          <input
            name="shopName"
            value={form.shopName || ""}
            onChange={handleChange}
            placeholder="Shop Name"
            className="w-full p-3 border rounded"
          />

          <input
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-3 border rounded"
          />

          {/* Submit */}
          <button
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 text-white w-full py-3 rounded-lg font-medium transition"
          >
            {loading ? "Updating..." : "Save Profile"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Profile;