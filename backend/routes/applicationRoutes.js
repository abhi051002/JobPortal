import express from "express";
import authUser from "../middleware/authUser.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/applicationController.js";

const applicationRouter = express.Router();

applicationRouter.get("/apply/:id", authUser, applyJob);
applicationRouter.get("/get", authUser, getAppliedJobs);
// Here id means job id
applicationRouter.get("/:id/applicants", authUser, getApplicants);
//
applicationRouter.post("/status/:id/update", authUser, updateStatus);

export default applicationRouter;
