import express from "express";
import authUser from "../middleware/authUser.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/companyController.js";

const companyRouter = express.Router();

companyRouter.post("/register", authUser, registerCompany);
companyRouter.get("/get", authUser, getCompany);
companyRouter.get("/get/:id", authUser, getCompanyById);
companyRouter.put("/update/:id", authUser, updateCompany);

export default companyRouter;
