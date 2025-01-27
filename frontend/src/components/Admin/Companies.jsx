import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
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
          New Company
        </Button>
      </div>
      <CompaniesTable />
    </div>
  );
};

export default Companies;
