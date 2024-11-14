import applicationModel from "../models/applicationModel.js";
import jobModel from "../models/jobModel.js";

const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const { id: jobId } = req.params;
    if (!jobId) {
      return res
        .status(400)
        .json({ message: "Job ID is required", success: false });
    }
    // check for if user applyed fo the job or not
    const existingApplication = await applicationModel.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    // check for if job is exist or not
    const job = await jobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    // create application record in database
    // status will be pending by default as it is applied
    const application = await applicationModel.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(application._id);
    await job.save();
    return res
      .status(201)
      .json({ message: "Job Applied Successfully", success: true });
  } catch (error) {
    console.error(error);
  }
};

const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await applicationModel
      .find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      });
    if (!applications) {
      return res
        .status(404)
        .json({ message: "No applications found", success: false });
    }

    return res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error(error);
  }
};

const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await jobModel.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant", options: { sort: { createdAt: -1 } } },
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    return res.status(200).json({ success: true, job });
  } catch (error) {
    console.error(error);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res
        .status(400)
        .json({ message: "Status is required", success: false });
    }
    const applicants = await applicationModel.findOne({ _id: applicationId });
    if (!applicants) {
      return res
        .status(404)
        .json({ message: "Application not found", success: false });
    }
    applicants.status = status.toLowerCase();
    await applicants.save();
    return res.status(200).json({ message: "Status updated", success: true });
  } catch (error) {
    console.error(error);
  }
};
export { applyJob, getAppliedJobs, getApplicants, updateStatus };
