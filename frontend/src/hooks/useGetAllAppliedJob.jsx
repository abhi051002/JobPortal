import { APPLICATION_API_ENDPOINT } from "@/constant";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
          headers: { token },
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications));
        } else {
          toast.error(res.data.message);
          console.error(res.data);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    };
    fetchAppliedJobs();
  }, []);
};

export default useGetAppliedJobs;
