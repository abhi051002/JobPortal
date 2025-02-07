import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/constant";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const { companies } = useSelector((store) => store.company);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const jobType = ["Full time", "Part time", "Remote", "Hybrid", "Contractual"];
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company._id === value);
    setInput({ ...input, companyId: selectedCompany?._id });
  };
  const jobTypeSelectChangeHandler = (value) => {
    setInput({ ...input, jobType: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: { token },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Job posted successfully!");
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-4 my-5">
      <form
        className="w-full max-w-6xl p-4 sm:p-8 border border-gray-200 rounded-md shadow-lg"
        onSubmit={submitHandler}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="space-y-1">
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0"
            />
          </div>
          <div className="space-y-1">
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0"
            />
          </div>
          <div className="space-y-1">
            <Label>Requirements</Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0"
            />
          </div>
          <div className="space-y-1">
            <Label>Salary</Label>
            <Input
              type="number"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0"
            />
          </div>
          <div className="space-y-1">
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0"
            />
          </div>
          <div className="space-y-3">
            <Label>Job Type</Label>
            <Select onValueChange={jobTypeSelectChangeHandler}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Job Type</SelectLabel>
                  {jobType.map((type, index) => (
                    <SelectItem key={index} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Experience Level</Label>
            <Input
              type="text"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0"
            />
          </div>
          <div className="space-y-1">
            <Label>No of Positions</Label>
            <Input
              type="number"
              name="position"
              value={input.position}
              onChange={changeEventHandler}
              className="focus-visible:ring-offset-0 focus-visible:ring-0"
            />
          </div>
        </div>

        {companies.length !== 0 && (
          <div className="mt-4">
            <Select onValueChange={selectChangeHandler}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Companies Name</SelectLabel>
                  {companies.map((company) => (
                    <SelectItem key={company._id} value={company._id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        <Button
          className="w-full mt-6"
          type="submit"
          disabled={companies.length === 0}
        >
          {load ? "Please wait..." : "Post Job"}
        </Button>

        {companies.length === 0 && (
          <p className="mt-3 text-xs font-bold text-center text-red-600">
            *Please Register a company to Post a Job
          </p>
        )}
      </form>
    </div>
  );
};

export default PostJob;
