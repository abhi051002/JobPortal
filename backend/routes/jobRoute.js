import express from "express";
import authUser from "../middleware/authUser.js";
import {
  getAdminJobs,
  getAllJob,
  getJobById,
  postJob,
} from "../controllers/jobController.js";

const jobRouter = express.Router();

jobRouter.post("/post", authUser, postJob);
jobRouter.get("/get", authUser, getAllJob);
jobRouter.post("/getadminjobs", authUser, getAdminJobs);
jobRouter.post("/get/:id", authUser, getJobById);

export default jobRouter;
