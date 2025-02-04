import { COMPANY_API_ENDPOINT } from "@/constant";
import { setCompanies } from "@/redux/companySlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
          withCredentials: true,
          headers: { token },
        });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        } else {
          console.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllCompanies();
  }, []);
};

export default useGetAllCompanies;
