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
const jobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const AppliedJobTable = () => {
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
          {jobs.map((job, index) => (
            <TableRow key={index}>
              <TableCell>20-11-2024</TableCell>
              <TableCell>Full Stack Engineer</TableCell>
              <TableCell>Nettantra</TableCell>
              <TableCell className="text-right">
                <Badge>Pending</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
