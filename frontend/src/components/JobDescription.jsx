import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import useGetSingleJob from "@/hooks/useGetSingleJob";
import { useSelector } from "react-redux";

const JobDescription = () => {
  const isApplied = false;
  const params = useParams();
  const jobId = params.id;
  useGetSingleJob(jobId);
  const { singleJob } = useSelector((state) => state.job);
  const dateFormatter = (date) => {
    const adjustedDate = new Date(date);

    const day = String(adjustedDate.getDate()).padStart(2, "0");
    const month = String(adjustedDate.getMonth() + 1).padStart(2, "0");
    const year = adjustedDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob.title}</h1>
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
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied!" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.experienceLevel}yr
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.position}
          </span>
        </h1>
        <h1 className="font-bold my-1">
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
