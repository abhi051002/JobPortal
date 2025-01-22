import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import { singleUpload } from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", singleUpload, register);
userRouter.post("/login", login);
userRouter.post("/profile/update", authUser, singleUpload, updateProfile);
userRouter.get("/logout", logout);

export default userRouter;
