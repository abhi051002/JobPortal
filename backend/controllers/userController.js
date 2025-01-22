import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, confirmPassword, role } =
      req.body;
    if (
      !fullname ||
      !email ||
      !phoneNumber ||
      !password ||
      !role ||
      !confirmPassword
    ) {
      return res.json({ message: "Some fields are missing", success: false });
    }
    if (password !== confirmPassword) {
      return res.json({
        message: "Passwords do not match",
        success: false,
      });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        message: "User already exist with this email",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });
    res.json({ message: "User Registered Successfully", success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.json({ message: "Some fields are missing", success: false });
    }
    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({ message: "User not found", success: false });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.json({ message: "Invalid Password", success: false });
    }

    //  Check for the role correct or not
    if (role !== user.role) {
      return res.json({
        message: "Account doesn't exist with current role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: false,
      })
      .json({
        message: `Welecome back ${user.fullname}`,
        success: true,
        token: token,
        user,
      });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    return res
      .cookie("token", "", { maxAge: 0 })
      .json({ message: `Logout Successfully`, success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    let imageUrl;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        public_id: file.originalname,
      });
      imageUrl = cloudResponse.secure_url;
    }

    let skillsArray;
    skills && (skillsArray = skills.split(","));
    const userId = req.id; // From middleware authentication
    let user = await userModel.findById(userId).select("-password");

    fullname && (user.fullname = fullname);
    email && (user.email = email);
    phoneNumber && (user.phoneNumber = phoneNumber);
    bio && (user.profile.bio = bio);
    skillsArray && (user.profile.skills = skillsArray);

    if (imageUrl) {
      user.profile.resume = imageUrl;
      user.profile.resumeOriginalName = file.originalname;
    }
    user.save();

    user = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    res.json({ message: "Profile updated successfully", success: true, user });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
export { register, login, logout, updateProfile };
