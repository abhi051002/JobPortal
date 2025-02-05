import React, { useEffect } from "react";
import Job from "./job/Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import useGetBrowsedJobs from "@/hooks/useGetBrowsedJobs";

const Browse = () => {
  useGetBrowsedJobs();
  const { allBrowsedJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, [dispatch]); // Added dispatch to dependency array

  if (!allBrowsedJobs?.length) {
    return (
      <div className="max-w-7xl mx-auto my-10">
        <p className="text-gray-500 text-center">No jobs found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="font-semibold text-lg my-10">
        Search Results ({allBrowsedJobs.length})
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allBrowsedJobs.map((job) => (
          <div key={job._id} className="mb-5">
            <Job job={job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
