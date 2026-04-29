// import axios from "axios";

// // Base API instance
// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Attach token automatically to every request
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // =========================
// // USER APIs
// // =========================

// export const loginUser = async (data) => {
//   try {
//     const payload =
//       data.identifier.includes("@")
//         ? { email: data.identifier, password: data.password }
//         : { mobile: data.identifier, password: data.password };

//     const response = await API.post("/user/login", payload);

//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: "User login failed" };
//   }
// };

// export const registerUser = async (data) => {
//   try {
//     const payload = {
//       name: data.name,
//       email: data.email,
//       address: data.address,
//       mobile: data.phone,
//       password: data.password,
//     };

//     const response = await API.post("/user/register", payload);

//     return response.data;
//   } catch (error) {
//     throw error.response?.data || {
//       message: "User registration failed",
//     };
//   }
// };

// // =========================
// // VENDOR APIs
// // =========================

// export const loginVendor = async (data) => {
//   try {
//     const payload =
//       data.identifier.includes("@")
//         ? { email: data.identifier, password: data.password }
//         : { mobile: data.identifier, password: data.password };

//     const response = await API.post("/vendor/login", payload);

//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: "Vendor login failed" };
//   }
// };

// export const registerVendor = async (data) => {
//   try {
//     const payload = {
//       ownerName: data.name,
//       email: data.email,
//       mobile: data.phone,
//       password: data.password,
//       cuisine: data.cuisine,
//       shopName: data.shopName,
//       address: data.shopAddress,
//     };

//     const response = await API.post("/vendor/register", payload);

//     return response.data;
//   } catch (error) {
//     throw error.response?.data || {
//       message: "Vendor registration failed",
//     };
//   }
// };

// export default API;


import axios from "axios";

// =========================
// Base API instance
// =========================

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================
// Attach token automatically
// =========================

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    // ✅ FIXED (backticks added)
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =========================
// USER APIs
// =========================

export const loginUser = async (data) => {
  try {
    const payload =
      data.identifier.includes("@")
        ? { email: data.identifier, password: data.password }
        : { mobile: data.identifier, password: data.password };

    const response = await API.post(
      "/user/login",
      payload
    );

    return response.data;

  } catch (error) {
    throw (
      error.response?.data || {
        message: "User login failed",
      }
    );
  }
};

export const registerUser = async (data) => {
  try {
    const payload = {
      name: data.name,
      email: data.email,
      address: data.address,
      mobile: data.phone,
      password: data.password,
    };

    const response = await API.post(
      "/user/register",
      payload
    );

    return response.data;

  } catch (error) {
    throw (
      error.response?.data || {
        message: "User registration failed",
      }
    );
  }
};

// =========================
// VENDOR APIs
// =========================

export const loginVendor = async (data) => {
  try {
    const payload =
      data.identifier.includes("@")
        ? { email: data.identifier, password: data.password }
        : { mobile: data.identifier, password: data.password };

    const response = await API.post(
      "/vendor/login",
      payload
    );

    return response.data;

  } catch (error) {
    throw (
      error.response?.data || {
        message: "Vendor login failed",
      }
    );
  }
};

export const registerVendor = async (data) => {
  try {
    const payload = {
      ownerName: data.name,
      email: data.email,
      mobile: data.phone,
      password: data.password,
      cuisine: data.cuisine,
      shopName: data.shopName,
      address: data.shopAddress,
    };

    const response = await API.post(
      "/vendor/register",
      payload
    );

    return response.data;

  } catch (error) {
    throw (
      error.response?.data || {
        message: "Vendor registration failed",
      }
    );
  }
};

// =========================
// PLAN APIs
// =========================

// Get Vendor Plans
export const getPlans = async () => {
  try {
    const response = await API.get(
      "/plan"
    );

    return response;

  } catch (error) {
    throw (
      error.response?.data || {
        message: "Fetch plans failed",
      }
    );
  }
};

// =========================
// MENU APIs
// =========================

// ✅ Add Menu
/*export const addMenu = async (data) => {
  try {

    const response = await API.post(
      `/menu/${data.planId}`, // ✅ planId in URL
      {
        day: data.day,
        mealType: data.mealType,
        items: data.items
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "ADD MENU ERROR:",
      error.response?.data
    );

    throw (
      error.response?.data || {
        message: "Add menu failed",
      }
    );
  }
};*/
export const addMenu = async (data) => {
  try {

    if (!data.planId) {
      throw { message: "Plan ID missing" };
    }

    const response = await API.post(
      `/menu/${data.planId}`, // ✅ correct
      {
        day: data.day,
        mealType: data.mealType,
        items: data.items
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "ADD MENU ERROR:",
      error.response?.data
    );

    throw (
      error.response?.data || {
        message: "Add menu failed",
      }
    );
  }
};

// Get All Menus (Vendor)
export const getMenus = async () => {
  try {

    const response = await API.get(
      "/menu"
    );

    return response.data;

  } catch (error) {
    throw (
      error.response?.data || {
        message: "Fetch menus failed",
      }
    );
  }
};

// Update Menu
export const updateMenu = async (
  menuId,
  data
) => {
  try {

    const response = await API.put(
      `/menu/${menuId}`,
      data
    );

    return response.data;

  } catch (error) {
    throw (
      error.response?.data || {
        message: "Update menu failed",
      }
    );
  }
};

// Delete Menu
export const deleteMenu = async (
  menuId
) => {
  try {

    const response = await API.delete(
      `/menu/${menuId}`
    );

    return response.data;

  } catch (error) {
    throw (
      error.response?.data || {
        message: "Delete menu failed",
      }
    );
  }
};

// Export API instance
export default API;