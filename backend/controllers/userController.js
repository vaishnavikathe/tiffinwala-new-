import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


//REGISTER USER

export const registerUser = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, mobile, address, password, email } = req.body;

    if (!req.body) {
      return res.status(400).json({
        message: "Request body missing"
      });
    }
    //profile pic handling
    let profilePic = "uploads/default.png/default.jpg";

    if (req.file) {
      profilePic = req.file.path;
    }

    // check existing
    const existing = await User.findOne({
      $or: [{ mobile }, { email }]
    });

    if (existing) {
      return res.status(400).json({
        message: "User already registered, return to login"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      mobile,
      address,
      password: hashedPassword,
      email,
      profilePic
    });

    res.status(201).json({
      message: "User Registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

//LOGIN USER

export const loginUser = async (req, res) => {
  try {

    const { mobile, email, password } = req.body;

    let query = {};

    if (email) {
      query.email = email;
    }
    else if (mobile) {
      query.mobile = mobile;
    }
    else {
      return res.status(400).json({
        message: "Email or Mobile required"
      });
    }

    const user =
      await User.findOne(query);

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login Successfully",
      token,
      user: {
        name: user.name
      }
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


//UPDATE PROFILE
/*export const updateUserProfile = async (req, res) => {
  try {

    // FIXED
    const userId = req.user.id;

    const {
      name,
      email,
      mobile,
      address,
      password
    } = req.body;

    const user =
      await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect Password"
      });
    }

    user.name =
      name || user.name;

    user.email =
      email || user.email;

    user.mobile =
      mobile || user.mobile;

    user.address =
      address || user.address;

    await user.save();

    res.json({
      message:
        "Profile Updated Successfully!!",
      user
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};*/
export const updateUserProfile = async (req, res) => {
  try {
    console.log("BODY");
    console.log(req.body);

    console.log("FILE");
    console.log(req.file);

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const {
      name,
      email,
      mobile,
      address
    } = req.body;

    // Password verification
    /*const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }
*/
    // Update fields
    if (name) user.name = name;

    if (email) user.email = email;

    if (mobile) user.mobile = mobile;

    if (address) user.address = address;

    // Profile picture upload
    if (req.file) {
      user.profilePic =
        `/uploads/users/${req.file.filename}`;

      console.log(
        "IMAGE SAVED:",
        user.profilePic
      );
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.log(
      "UPDATE USER PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

//UPDATE PASSWORD

export const updateUserPassword = async (req, res) => {

  try {

    // FIXED
    const userId = req.user.id;

    const {
      newPassword,
      oldPassword
    } = req.body;

    const user =
      await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        oldPassword,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect Password!!"
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    user.password =
      await bcrypt.hash(
        newPassword,
        salt
      );

    await user.save();

    res.json({
      message:
        "Password Updated Successfully!!"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};