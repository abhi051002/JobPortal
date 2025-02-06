import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  const dateFormat = (date) => {
    const adjustedDate = new Date(date);

    const day = String(adjustedDate.getDate()).padStart(2, "0");
    const month = String(adjustedDate.getMonth() + 1).padStart(2, "0");
    const year = adjustedDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };
  return (
    <div className="overflow-x-auto">
      <Table className="w-full min-w-[600px]">
        <TableCaption>
          {allAppliedJobs.length > 0 ? "A list of your applied Jobs" : ""}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Date</TableHead>
            <TableHead className="whitespace-nowrap">Job Role</TableHead>
            <TableHead className="whitespace-nowrap">Company</TableHead>
            <TableHead className="text-right whitespace-nowrap">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length > 0 ? (
            allAppliedJobs.map((job, index) => (
              <TableRow key={job._id} className="text-sm">
                <TableCell>{dateFormat(job.createdAt)}</TableCell>
                <TableCell>{job?.job?.title}</TableCell>
                <TableCell>{job?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`text-xs px-2 py-1 rounded-full ${
                      job?.status === "rejected"
                        ? "bg-red-400"
                        : job?.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {job?.status?.toUpperCase() || "N/A"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="font-bold text-lg text-center">
                You haven't Applied to any Job Yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
