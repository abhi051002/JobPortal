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
        return; // return early if company name is empty
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
    <div className="max-w-4xl mx-auto my-10">
      <div className="my-10">
        <h1 className="font-bold text-2xl">Your Company Name</h1>
        <p className="text-gray-500">
          What would you like to give your company Name ? you can change it
          later.
        </p>
      </div>
      <Label>Company Name</Label>
      <Input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className="my-2"
        placeholder="Microsoft, Google, Facebook"
      />
      <div className="flex items-center gap-2 my-10">
        <Button variant="outline" onClick={() => navigate("/admin/companies")}>
          Cancel
        </Button>
        <Button onClick={registerCompany}>Continue</Button>
      </div>
    </div>
  );
};

export default CreateCompanies;
