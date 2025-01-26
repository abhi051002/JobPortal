import express from "express";
import authUser from "../middleware/authUser.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/companyController.js";
import { singleUpload } from "../middleware/multer.js";

const companyRouter = express.Router();

companyRouter.post("/register", authUser, registerCompany);
companyRouter.get("/get", authUser, getCompany);
companyRouter.get("/get/:id", authUser, getCompanyById);
companyRouter.put("/update/:id", authUser, singleUpload, updateCompany);

export default companyRouter;
