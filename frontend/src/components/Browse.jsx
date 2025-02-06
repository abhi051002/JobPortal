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
  }, [dispatch]);

  if (!allBrowsedJobs?.length) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        <div className="text-center p-8 rounded-lg bg-white ">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            No Jobs Found
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Try adjusting your search criteria
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Search Results ({allBrowsedJobs.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allBrowsedJobs.map((job) => (
          <Job key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Browse;
