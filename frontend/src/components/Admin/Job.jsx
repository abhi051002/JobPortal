import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobTable from "./AdminJobTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const Job = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto my-5 sm:my-10 px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-5">
        <Input
          className="w-full sm:w-fit"
          placeholder="Search by Company Name & Role"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={() => navigate("create")} className="w-full sm:w-auto">
          <Plus className="mr-2" />
          Post New Job
        </Button>
      </div>
      <AdminJobTable />
    </div>
  );
};

export default Job;
