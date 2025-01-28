import { JOB_API_ENDPOINT } from "@/constant";
import { setAllAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.post(
          `${JOB_API_ENDPOINT}/getadminjobs`,
          user?._id,
          {
            withCredentials: true,
            headers: { token },
          }
        );
        if (res.data.success) {
          console.log(res.data.success);
          dispatch(setAllAdminJobs(res.data.jobs));
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllAdminJobs;
