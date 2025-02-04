import { JOB_API_ENDPOINT } from "@/constant";
import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { searchQuery } = useSelector((store) => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get?keyword=${searchQuery}`,
          {
            withCredentials: true,
            headers: { token },
          }
        );
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          console.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
