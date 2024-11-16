import jobModel from "../models/jobModel.js";

// For Recuirters
const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.json({ message: "Something is Missing", success: false });
    }
    const job = await jobModel.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    res.json({ message: "Job posted successfully", success: true, job });
  } catch (error) {
    console.error(error);
  }
};

// For Students
const getAllJob = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await jobModel
      .find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.json({ message: "No jobs found", success: false });
    }
    res.json({ success: true, jobs });
  } catch (error) {
    console.error(error);
  }
};

// For Students
const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await jobModel.findById(jobId);
    if (!job) {
      return res.json({ message: "Job not found", success: false });
    }
    res.json({ success: true, job });
  } catch (error) {
    console.error(error);
  }
};

// For Admin
const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await jobModel
      .find({ created_by: adminId })
      .populate({ path: "created_by" })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.json({ message: "No jobs found", success: false });
    }
    res.json({ success: true, jobs });
  } catch (error) {
    console.error(error);
  }
};

export { postJob, getAllJob, getJobById, getAdminJobs };
