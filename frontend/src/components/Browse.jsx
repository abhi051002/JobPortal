import React, { useEffect } from "react";
import Job from "./job/Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, []);
  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="font-semibold text-lg my-10">
        Search Results ({allJobs.length})
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {allJobs.map((job, index) => (
          <div key={job._id} className="mb-5">
            <Job job={job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
