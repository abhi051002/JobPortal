import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/constant";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { toast } from "sonner";

const CreateCompanies = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerCompany = async () => {
    try {
      if (!companyName) {
        toast.error("Company name is required");
        return;
      }
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json", token },
        }
      );
      if (res?.data?.success) {
        toast.success(res.data.message);
        dispatch(setSingleCompany(res?.data?.company));
        navigate(`/admin/companies/${res?.data?.company?._id}`);
      } else {
        toast.error(res.data.message);
        console.error(res.data);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-5 px-4 sm:my-10">
      <div className="my-5 sm:my-10">
        <h1 className="font-bold text-xl sm:text-2xl">Your Company Name</h1>
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          What would you like to give your company Name? You can change it
          later.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Company Name</Label>
          <Input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-2"
            placeholder="Microsoft, Google, Facebook"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button
            onClick={registerCompany}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanies;
