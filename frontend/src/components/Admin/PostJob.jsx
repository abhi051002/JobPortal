import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
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
import techstack from "../../Json/techstack.json";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PostJob = () => {
  const { companies } = useSelector((store) => store.company);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const jobType = ["Full time", "Part time", "Remote", "Hybrid", "Contractual"];

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: [],
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  // ... [keeping all the existing handlers and logic] ...

  const allTechStacks = [
    ...techstack.techStacks.frontend,
    ...techstack.techStacks.backend,
    ...techstack.techStacks.databases,
    ...techstack.techStacks.devOps,
    ...techstack.techStacks.cloudProviders,
    ...techstack.techStacks.googleCloud,
    ...techstack.techStacks.microsoftTechnologies,
    ...techstack.techStacks.otherTechnologies,
  ];

  const techOptions = allTechStacks.map((tech, index) => ({
    name: tech,
    id: index,
  }));

  const onSelect = (selectedList, selectedItem) => {
    setInput((prevInput) => ({
      ...prevInput,
      requirements: selectedList.map((item) => item.name),
    }));
  };

  const onRemove = (selectedList, removedItem) => {
    setInput((prevInput) => ({
      ...prevInput,
      requirements: selectedList.map((item) => item.name),
    }));
  };

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
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Post a New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Job Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Job Title</Label>
                  <Input
                    type="text"
                    name="title"
                    value={input.title}
                    onChange={changeEventHandler}
                    className="w-full"
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Description</Label>
                  <Input
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={changeEventHandler}
                    className="w-full"
                    placeholder="Brief job description"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Salary</Label>
                  <Input
                    type="number"
                    name="salary"
                    value={input.salary}
                    onChange={changeEventHandler}
                    className="w-full"
                    placeholder="Annual salary"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Location</Label>
                  <Input
                    type="text"
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    className="w-full"
                    placeholder="Job location"
                  />
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Job Type</Label>
                  <Select onValueChange={jobTypeSelectChangeHandler}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {jobType.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Experience Level</Label>
                  <Input
                    type="text"
                    name="experience"
                    value={input.experience}
                    onChange={changeEventHandler}
                    className="w-full"
                    placeholder="Required experience"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Number of Positions</Label>
                  <Input
                    type="number"
                    name="position"
                    value={input.position}
                    onChange={changeEventHandler}
                    className="w-full"
                    placeholder="Available positions"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Technical Requirements</Label>
                  <Multiselect
                    options={techOptions}
                    displayValue="name"
                    selectedValues={input.requirements.map((req) => ({
                      name: req,
                      id: techOptions.find((option) => option.name === req)?.id,
                    }))}
                    avoidHighlightFirstOption={true}
                    showArrow={true}
                    onSelect={onSelect}
                    onRemove={onRemove}
                    style={{
                      chips: {
                        background: "#2563eb",
                      },
                      searchBox: {
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.375rem",
                        padding: "0.5rem",
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Company Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Select Company</Label>
              {companies.length !== 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company._id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-red-600 font-medium">
                  Please register a company before posting a job
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              className="w-full"
              type="submit"
              disabled={companies.length === 0 || load}
            >
              {load ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⌛</span> 
                  Posting...
                </span>
              ) : (
                "Post Job"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostJob;