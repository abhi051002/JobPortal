import React from "react";
import FilterCard from "./job/FilterCard";
import Job from "./job/Job";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5">
        <div className="w-[20%]">
          <FilterCard />
        </div>
        {allJobs.length > 0 ? (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="grid grid-cols-3 gap-4">
              {allJobs.map((job) => (
                <div key={job._id}>
                  <Job job={job} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <span>No Jobs Found</span>
        )}
      </div>
    </div>
  );
};

export default Jobs;
