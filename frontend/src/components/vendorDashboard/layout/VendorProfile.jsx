import { useEffect, useState } from "react";
import {
  getVendorProfile,
  updateVendorProfile
} from "../../../services/vendorApi";
import toast from "react-hot-toast";
import defaultProfile from "../../../assets/default-profile.png";

const Profile = () => {
  const [form, setForm] = useState({
    ownerName: "",
    email: "",
    mobile: "",
    shopName: "",
    address: "",
    cuisine: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
console.log(preview,"preview")
  // ✅ FETCH PROFILE (RUNS ONLY ONCE)

   const fetchProfile = async () => {
      debugger
      try {
        const res = await getVendorProfile();
        const vendor = res.data.vendor;

        setForm({
          ownerName: vendor.ownerName || "",
          email: vendor.email || "",
          mobile: vendor.mobile || "",
          shopName: vendor.shopName || "",
          address: vendor.address || "",
          cuisine: vendor.cuisine || ""
        });

        // ✅ FIX IMAGE PATH
        if (vendor.profilePic) {
          setPreview(`http://localhost:5000${vendor.profilePic}`);
        }

      } catch (err) {
        console.error("PROFILE LOAD ERROR:", err);
        toast.error("Failed to load profile");
      }
    };
  useEffect(() => {
    fetchProfile();
  }, []);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ HANDLE IMAGE CHANGE
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   setImage(file);

  //   // cleanup old blob preview
  //   if (preview && preview.startsWith("blob:")) {
  //     URL.revokeObjectURL(preview);
  //   }

  //   setPreview(URL.createObjectURL(file));
  // };

  const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  // ✅ Save File
  setImage(file);

  // ✅ Preview Image
  setPreview(URL.createObjectURL(file));

  console.log("SELECTED IMAGE 👉", file);
};

  // ✅ HANDLE SUBMIT (FULLY CLEAN)
//   const handleSubmit = async (e) => {
//     debugger
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const formData = new FormData();

//       formData.append("ownerName", form.ownerName);
//       formData.append("shopName", form.shopName);
//       formData.append("address", form.address);
//       formData.append("cuisine", form.cuisine);

//       if (image) {
//         formData.append("profilePic", image);
//       }
//       for (let pair of formData.entries()) {
//       console.log(pair[0], pair[1]);
//        }

//       const res = await updateVendorProfile(formData);

// console.log("UPDATED VENDOR 👉", res.data.vendor); // 👈 ADD THIS

// const updatedVendor = res.data.vendor;

//       // ✅ SAVE UPDATED DATA
//       localStorage.setItem("vendor", JSON.stringify(updatedVendor));

//       // ✅ UPDATE IMAGE AFTER SAVE (VERY IMPORTANT)
//       if (updatedVendor.profilePic) {
//         setPreview(`http://localhost:5000/${updatedVendor.profilePic}`);
//       }

//       // ✅ UPDATE FORM
//       setForm({
//         ownerName: updatedVendor.ownerName || "",
//         email: updatedVendor.email || "",
//         mobile: updatedVendor.mobile || "",
//         shopName: updatedVendor.shopName || "",
//         address: updatedVendor.address || "",
//         cuisine: updatedVendor.cuisine || ""
//       });

//       // ✅ notify sidebar
//       window.dispatchEvent(new Event("vendorUpdated"));

//       toast.success("Profile updated successfully!");

//     } catch (err) {
//       console.error("PROFILE UPDATE ERROR:", err.response?.data);
//       toast.error(err?.response?.data?.message || "Update failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };
const handleSubmit = async (e) => {
  debugger
  e.preventDefault();

  try {
    setLoading(true);

    // ✅ Create FormData
    const formData = new FormData();

    formData.append("ownerName", form.ownerName);
    formData.append("shopName", form.shopName);
    formData.append("address", form.address);
    formData.append("cuisine", form.cuisine);

    // ✅ Append Image
    if (image) {
      formData.append("profilePic", image);
    }

    // ✅ Debug FormData
    console.log("========= FORM DATA =========");

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    console.log("=============================");

    // ✅ API CALL
    const res = await updateVendorProfile(formData);

    console.log("SERVER RESPONSE 👉", res.data);

    const updatedVendor = res.data.vendor;

    // ✅ Save Vendor
    localStorage.setItem(
      "vendor",
      JSON.stringify(updatedVendor)
    );

    // ✅ Update Preview
    if (updatedVendor.profilePic) {
      setPreview(
        `http://localhost:5000/${updatedVendor.profilePic}`
      );
    }

    // ✅ Update Form
    setForm({
      ownerName: updatedVendor.ownerName || "",
      email: updatedVendor.email || "",
      mobile: updatedVendor.mobile || "",
      shopName: updatedVendor.shopName || "",
      address: updatedVendor.address || "",
      cuisine: updatedVendor.cuisine || "",
    });

    // ✅ Notify Sidebar/Navbar
    window.dispatchEvent(new Event("vendorUpdated"));

    toast.success("Profile updated successfully ✅");
    fetchProfile()

  } catch (err) {
    console.error(
      "PROFILE UPDATE ERROR:",
      err.response?.data || err.message
    );

    toast.error(
      err.response?.data?.message ||
      "Update failed ❌"
    );

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

          {/* 📸 PROFILE IMAGE */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-orange-500">
             <img
                src={preview || defaultProfile}
                alt="profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = defaultProfile;
                }}
              />
            </div>

            <input
              type="file"
               accept="image/png, image/jpeg, image/jpg,image/webp,
    image/svg,
    image/jfif,
    image/avif"
              onChange={handleImageChange}
              //className="text-sm"
            />
          </div>

          {/* INPUTS */}
          <input
            name="ownerName"
            value={form.ownerName}
            onChange={handleChange}
            placeholder="Owner Name"
            className="w-full p-3 border rounded"
          />

          <input
            name="email"
            value={form.email}
            disabled
            className="w-full p-3 border rounded bg-gray-100"
          />

          <input
            name="mobile"
            value={form.mobile}
            disabled
            className="w-full p-3 border rounded bg-gray-100"
          />

          <input
            name="shopName"
            value={form.shopName}
            onChange={handleChange}
            placeholder="Shop Name"
            className="w-full p-3 border rounded"
          />

          <input
            name="cuisine"
            value={form.cuisine}
            onChange={handleChange}
            placeholder="Cuisine"
            className="w-full p-3 border rounded"
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-3 border rounded"
          />

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

export default Profile;