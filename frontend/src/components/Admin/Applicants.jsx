import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/redux/applicantsSlice";

const Applicants = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${id}/applicants`,
          {
            headers: { token },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setApplicants(res.data.job));
        } else {
          console.error(res.data);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    };
    fetchAllApplicants();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 my-5">
      <h1 className="font-bold text-lg sm:text-xl my-4 sm:my-5">
        Applicants ({applicants?.applications?.length || 0})
      </h1>
      <ApplicantsTable applications={applicants.applications} />
    </div>
  );
};

export default Applicants;
