import React from "react";
import Job from "./job/Job";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const Browse = () => {
  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="font-semibold text-lg my-10">
        Search Results ({randomJobs.length})
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {randomJobs.map((job, index) => (
          <div key={index} className="mb-5">
            <Job />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
