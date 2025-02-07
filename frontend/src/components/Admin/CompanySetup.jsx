import { COMPANY_API_ENDPOINT } from "@/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "../ui/label";
import { toast } from "sonner";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const { id } = useParams();
  useGetCompanyById(id);
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [input, setInput] = useState({
    name: singleCompany ? singleCompany.name : "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeEventHandler = (e) => {
    const file = e.target?.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.logo || null,
      });
    }
  }, [singleCompany]);

  return (
    <div className="max-w-xl mx-auto my-5 sm:my-10 px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 p-4 sm:p-8">
        <Button
          variant="outline"
          className="flex items-center gap-2 text-gray-500 font-semibold"
          onClick={() => navigate(`/admin/companies`)}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
        <h1 className="font-bold text-lg sm:text-xl">Company Setup</h1>
      </div>
      
      <form onSubmit={submitHandler} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
            />
          </div>
          <div className="space-y-2">
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Logo</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={fileChangeEventHandler}
          />
        </div>
        
        <Button type="submit" className="w-full mt-8">
          {loading ? "Please wait..." : "Update"}
        </Button>
      </form>
    </div>
  );
};

export default CompanySetup;