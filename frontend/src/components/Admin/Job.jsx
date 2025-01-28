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
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-fit"
          placeholder="Filter By Name"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={() => navigate("/admin/companies/create")}>
          <Plus />
          Post New Job
        </Button>
      </div>
      <AdminJobTable />
    </div>
  );
};

export default Job;
