import React, { useEffect, useState } from "react";
import FilterCard from "./job/FilterCard";
import Job from "./job/Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const Jobs = () => {
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
    <div className="max-w-7xl mx-auto mt-5 px-4 lg:px-0">
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-[20%]">
          <FilterCard />
        </div>
        {filterJobs.length > 0 ? (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8 rounded-lg bg-white shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                No Jobs Found
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Try adjusting your search criteria or clear filters
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
