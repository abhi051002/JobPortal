import { COMPANY_API_ENDPOINT } from "@/constant";
import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchSingelCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/get/${companyId}`,
          {
            withCredentials: true,
            headers: { token },
          }
        );
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        } else {
          console.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingelCompany();
  }, []);
};

export default useGetCompanyById;
