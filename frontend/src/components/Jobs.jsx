import React, { useEffect, useState } from "react";
import FilterCard from "./job/FilterCard";
import Job from "./job/Job";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const Jobs = () => {
  // useGetAllJobs();
  const { allJobs, searchQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery) {
      const filterdJob = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      console.log(filterJobs);
      setFilterJobs(filterdJob);
    } else {
      setFilterJobs(allJobs);
    }
  }, [searchQuery, allJobs]);
  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5">
        <div className="w-[20%]">
          <FilterCard />
        </div>
        {filterJobs.length > 0 ? (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="grid grid-cols-3 gap-4">
              {filterJobs.map((job) => (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  key={job._id}
                >
                  <Job job={job} />
                </motion.div>
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
