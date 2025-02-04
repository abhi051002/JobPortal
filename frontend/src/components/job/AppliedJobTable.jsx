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
const jobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
    <div>
      <Table>
        <TableCaption>A list of your applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length > 0 ? (
            allAppliedJobs.map((job, index) => (
              <TableRow key={job._id}>
                <TableCell>{dateFormat(job.createdAt)}</TableCell>
                <TableCell>{job?.job?.title}</TableCell>
                <TableCell>{job?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={
                      job?.status === "rejected"
                        ? "bg-red-400"
                        : job?.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }
                  >
                    {job?.status?.toUpperCase() || "N/A"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="text-center">
              <TableCell colSpan="4" className="font-bold text-lg">
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
