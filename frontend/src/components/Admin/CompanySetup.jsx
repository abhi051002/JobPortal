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

const CompanySetup = () => {
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
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
      console.log(formData);
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
        // dispatch(singleCompany(res.data.company));
        navigate("/admin/companies");
      } else {
        toast.error(res.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-xl mx-auto my-10">
      <form onSubmit={submitHandler}>
        <div className="flex items-center gap-5 p-8">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-gray-500 font-semibold"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-xl">Company Setup</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Company Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              className="my-2"
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              className="my-2"
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              className="my-2"
              value={input.location}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              className="my-2"
              value={input.website}
              onChange={changeEventHandler}
            />
          </div>
        </div>
        <div>
          <Label>Logo</Label>
          <Input
            type="file"
            accept="impage/*"
            className="my-2"
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
