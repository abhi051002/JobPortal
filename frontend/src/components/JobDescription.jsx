import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import { CircleCheckBig } from "lucide-react";

const JobDescription = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const jobId = params.id;
  const token = localStorage.getItem("token");
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?.id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  useEffect(() => {
    const fetchSingleJob = async () => {
      const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
        withCredentials: true,
        headers: { token },
      });
      if (res.data.success) {
        dispatch(setSingleJob(res.data.job));
        setIsApplied(
          res.data.job.applications.some(
            (application) => application.applicant === user?.id
          )
        );
      } else {
        console.error(res.data);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const dateFormatter = (date) => {
    const adjustedDate = new Date(date);
    const day = String(adjustedDate.getDate()).padStart(2, "0");
    const month = String(adjustedDate.getMonth() + 1).padStart(2, "0");
    const year = adjustedDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const applyJob = async () => {
    try {
      if (!user) {
        toast.error("Please login to apply for a job");
        return;
      }
      const response = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true, headers: { token } }
      );
      if (response.data.success) {
        setIsApplied(true);
        const updateSingleJobs = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJobs));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-4">
          <h1 className="font-bold text-xl">{singleJob.title}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob.position} Positions
            </Badge>
            <Badge className="text-[#F83B02] font-bold" variant="ghost">
              {singleJob.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          className={`rounded-lg w-full sm:w-auto ${
            isApplied
              ? "bg-green-600 text-white cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
          onClick={isApplied ? null : applyJob}
        >
          {isApplied ? <CircleCheckBig className="mr-2" /> : null}
          {isApplied ? "Already Applied!" : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-8">
        Job Description
      </h1>

      <div className="my-4 space-y-3">
        {[
          { label: "Role", value: singleJob.title },
          { label: "Location", value: singleJob.location },
          { label: "Description", value: singleJob.description },
          { label: "Experience", value: `${singleJob.experienceLevel}yr` },
          { label: "Salary", value: `${singleJob.salary} LPA` },
          {
            label: "Total Applicants",
            value:
              singleJob?.applications?.length === 0
                ? 0
                : singleJob?.applications?.length,
          },
          { label: "Positions", value: singleJob?.position },
          {
            label: "Posted Date",
            value: dateFormatter(singleJob.createdAt),
          },
        ].map(({ label, value }) => (
          <div key={label} className="break-words">
            <span className="font-bold">{label}: </span>
            <span className="pl-0 sm:pl-4 font-normal text-gray-800">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobDescription;
