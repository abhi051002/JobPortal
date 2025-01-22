import { JOB_API_ENDPOINT } from "@/constant";
import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSingleJob = (jobId) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchSingleJob = async () => {
      const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
        withCredentials: true,
        headers: { token },
      });
      if (res.data.success) {
        dispatch(setSingleJob(res.data.job));
      } else {
        console.log(res.data);
      }
    };
    fetchSingleJob();
  }, []);
};

export default useGetSingleJob;
