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
        // console.log(res.data.job);
        
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

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
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
    <div className="mx-auto my-10 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{singleJob.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {singleJob.position} Positions
            </Badge>
            <Badge className={"text-[#F83B02] font-bold"} variant="ghost">
              {singleJob.jobType}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              {singleJob.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-green-600 text-white cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
          onClick={isApplied ? null : applyJob}
        >
          {isApplied ? <CircleCheckBig /> : <></>}
          {isApplied ? "Already Applied!" : "Apply Now"}
        </Button>
      </div>
      <h1 className="py-4 font-medium border-b-2 border-b-gray-300">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="my-1 font-bold">
          Role :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.title}
          </span>
        </h1>
        <h1 className="my-1 font-bold">
          Location :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.location}
          </span>
        </h1>
        <h1 className="my-1 font-bold">
          Location :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.location}
          </span>
        </h1>
        
        <h1 className="my-1 font-bold">
        Requirements :
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.requirements.join(", ")}
          </span>
        </h1>
        <h1 className="my-1 font-bold">
          Experience :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.experienceLevel}yr
          </span>
        </h1>
        <h1 className="my-1 font-bold">
          Salary :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.salary} LPA
          </span>
        </h1>
        <h1 className="my-1 font-bold">
          Total Applicants :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications?.length === 0
              ? 0
              : singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="my-1 font-bold">
          Positions :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.position}
          </span>
        </h1>
        <h1 className="my-1 font-bold">
          Posted Date :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {dateFormatter(singleJob.createdAt)}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
