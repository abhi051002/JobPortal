import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/profile/update", authUser, updateProfile);
userRouter.get("/logout", logout);

export default userRouter;
