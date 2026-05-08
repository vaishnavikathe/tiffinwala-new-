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

import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Create folder automatically
const uploadPath = "uploads/vendors";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// ✅ Storage
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, uploadPath);
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