import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dateFormat = (date) => {
    const givenDate = new Date(date);
    const now = new Date();

    // Calculate the difference in milliseconds
    const diffInMs = now - givenDate;

    // Convert milliseconds to days
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
  };
  return (
    <div className="border border-gray-200 shadow-xl bg-white rounded-md p-4 lg:p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs lg:text-sm text-gray-500">
          {dateFormat(job?.createdAt) === 0
            ? "Today"
            : dateFormat(job?.createdAt) + " days ago"}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark className="h-4 w-4 lg:h-5 lg:w-5" />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="rounded-full p-0" size="icon">
          <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-base lg:text-lg">
            {job?.company?.name}
          </h1>
          <p className="text-xs lg:text-sm text-gray-500">
            {job?.company?.location}
          </p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-base lg:text-lg my-2">{job?.title}</h1>
        <p className="text-xs lg:text-sm text-gray-600 line-clamp-2">
          {job?.description}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge
          className="text-blue-700 font-bold text-xs lg:text-sm"
          variant="ghost"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          className="text-[#F83B02] font-bold text-xs lg:text-sm"
          variant="ghost"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="text-[#7209b7] font-bold text-xs lg:text-sm"
          variant="ghost"
        >
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-2 lg:gap-4 mt-4">
        <Button
          variant="outline"
          className="text-xs lg:text-sm"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] text-xs lg:text-sm">
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
