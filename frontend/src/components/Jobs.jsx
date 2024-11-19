import React from "react";
import FilterCard from "./job/FilterCard";
import Job from "./job/Job";

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const Jobs = () => {
  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5">
        <div className="w-[20%]">
          <FilterCard />
        </div>
        {jobArray.length > 0 ? (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="grid grid-cols-3 gap-4">
              {jobArray.map((job, index) => (
                <div key={index}>
                  <Job />
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
