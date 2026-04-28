import multer from "multer";
import path from "path";

// Storage config
const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    // Decide folder based on route
    if (req.baseUrl.includes("user")) {

      cb(null, "uploads/users");

    } else if (req.baseUrl.includes("vendor")) {

      cb(null, "uploads/vendors");

    } else {

      cb(null, "uploads");
    }

  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      path.extname(file.originalname);

    cb(null, uniqueName);
  }

});

// File filter
const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg"
  ];

  if (allowedTypes.includes(file.mimetype)) {

    cb(null, true);

  } else {

    cb(new Error("Only image files allowed"), false);

  }

};

const upload = multer({
  storage,
  fileFilter
});

export default upload;