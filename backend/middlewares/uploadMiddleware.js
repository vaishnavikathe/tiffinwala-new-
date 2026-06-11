// import multer from "multer";
// import path from "path";

// // Storage config
// const storage = multer.diskStorage({

//   destination: (req, file, cb) => {

//     // Decide folder based on route
//     if (req.baseUrl.includes("user")) {

//       cb(null, "uploads/users");

//     } else if (req.baseUrl.includes("vendor")) {

//       cb(null, "uploads/vendors");

//     } else {

//       cb(null, "uploads");
//     }

//   },

//   filename: (req, file, cb) => {

//     const uniqueName =
//       Date.now() +
//       path.extname(file.originalname);

//     cb(null, uniqueName);
//   }

// });

// // File filter
// const fileFilter = (req, file, cb) => {

//   const allowedTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/jpg",
//     "image/webp",
//     "image/svg",
//     "image/jfif",
//     "image/avif"

//   ];

//   /*if (allowedTypes.includes(file.mimetype)) {

//     cb(null, true);

//   } else {

//     cb(new Error("Only image files allowed"), false);

//   }*/
//  if (file.mimetype.startsWith("image/")) {
//   cb(null, true);
// } else {
//   cb(new Error("Only image files allowed"), false);
// }

// };

// const upload = multer({
//   storage,
//   fileFilter
// });

// export default upload;

/*import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Create folder automatically
const vendoruploadPath = "uploads/vendors";

if (!fs.existsSync(vendoruploadPath)) {
  fs.mkdirSync(vendoruploadPath, { recursive: true });
}

// ✅ Storage
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, vendoruploadPath);
  },

  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// ✅ File Filter
const fileFilter = (req, file, cb) => {

  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

// ✅ Upload
const upload = multer({
  storage,
  fileFilter,
});

export default upload;

const useruploadPath = "uploads/users";

if (!fs.existsSync(useruploadPath)) {
  fs.mkdirSync(useruploadPath, { recursive: true });
}

// ✅ Storage
const userstorage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, useruploadPath);
  },

  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// ✅ File Filter
const fileFilter = (req, file, cb) => {

  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

// ✅ Upload
const upload = multer({
  userstorage,
  fileFilter,
});

export default upload;*/

import multer from "multer";
import path from "path";
import fs from "fs";

// Create folders
const vendorPath = "uploads/vendors";
const userPath = "uploads/users";
const defaultpath = "uploads/default";


if (!fs.existsSync(vendorPath)) {
  fs.mkdirSync(vendorPath, { recursive: true });
}

if (!fs.existsSync(userPath)) {
  fs.mkdirSync(userPath, { recursive: true });
}

// Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    if (req.baseUrl.includes("vendor")) {
      cb(null, vendorPath);
    } else if (req.baseUrl.includes("user")) {
      cb(null, userPath);
    } else {
      cb(null, defaultpath);
    }

  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

// Upload
const upload = multer({
  storage,
  fileFilter,
});

export default upload;