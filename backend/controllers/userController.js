import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "Some fields are missing", succeess: false });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exist with this email",
        succeess: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    res
      .status(201)
      .json({ message: "User Registered Successfully", succeess: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Some fields are missing", succeess: false });
    }
    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", succeess: false });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(404)
        .json({ message: "Invalid Password", succeess: false });
    }

    //  Check for the role correct or not
    if (role !== user.role) {
      return res.status(404).json({
        message: "Account doesn't exist with current role",
        succeess: false,
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
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welecome back ${user.fullname}`,
        success: true,
        user
      });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    return res
      .status(200)
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
    let skillsArray;
    skills && (skillsArray = skills.split(","));
    const userId = req.id; // From middleware authentication
    let user = await userModel.findById(userId).select("-password");

    fullname && (user.fullname = fullname);
    email && (user.email = email);
    phoneNumber && (user.phoneNumber = phoneNumber);
    bio && (user.profile.bio = bio);
    skillsArray && (user.profile.skills = skillsArray);
    user.save();

    user = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    res
      .status(200)
      .json({ message: "Profile updated successfully", success: true, user });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
export { register, login, logout, updateProfile };
