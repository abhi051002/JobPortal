import { JOB_API_ENDPOINT } from "@/constant";
import { setAllBrowsedJobs } from "@/redux/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetBrowsedJobs = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { searchQuery } = useSelector((store) => store.job);
  useEffect(() => {
    const fetchBrowsedJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get?keyword=${searchQuery}`,
          {
            withCredentials: true,
            headers: { token },
          }
        );
        if (res.data.success) {
          dispatch(setAllBrowsedJobs(res.data.jobs));
        } else {
          console.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBrowsedJobs();
  }, []);
};

export default useGetBrowsedJobs;
