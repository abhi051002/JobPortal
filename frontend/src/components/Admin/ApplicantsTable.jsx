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
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/constant";

const ApplicantsTable = ({ applications }) => {
  const shortListStatus = ["Accepted", "Rejected"];
  const token = localStorage.getItem("token");

  const dateFormat = (date) => {
    const adjustedDate = new Date(date);
    const day = String(adjustedDate.getDate()).padStart(2, "0");
    const month = String(adjustedDate.getMonth() + 1).padStart(2, "0");
    const year = adjustedDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const statusHandler = async (id, status) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status },
        { headers: { token }, withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Status updated successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="min-w-[800px] px-4 sm:px-0">
        <Table>
          <TableCaption>A list of your recent applied users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[150px]">Fullname</TableHead>
              <TableHead className="min-w-[180px] hidden sm:table-cell">
                Email
              </TableHead>
              <TableHead className="min-w-[140px] hidden sm:table-cell">
                Contact
              </TableHead>
              <TableHead className="min-w-[100px]">Resume</TableHead>
              <TableHead className="min-w-[100px] hidden sm:table-cell">
                Date
              </TableHead>
              <TableHead className="text-right w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications?.length > 0 ? (
              applications?.map((application) => (
                <TableRow key={application._id}>
                  <TableCell className="font-medium">
                    {application?.applicant?.fullname}
                    <div className="text-sm text-gray-500 sm:hidden">
                      {application?.applicant?.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {application?.applicant?.email}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {application?.applicant?.phoneNumber}
                  </TableCell>
                  <TableCell
                    className={
                      application?.applicant?.profile?.resume
                        ? "text-blue-500 font-bold"
                        : "text-red-400 font-bold"
                    }
                  >
                    {application?.applicant?.profile?.resume ? (
                      <a
                        href={application.applicant.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Resume
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {dateFormat(application?.applicant?.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="ml-auto" />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div className="py-1 space-y-2">
                          {shortListStatus.map((status, index) => (
                            <div
                              key={index}
                              onClick={() =>
                                statusHandler(application?._id, status)
                              }
                              className="flex items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                            >
                              <span>{status}</span>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan="6"
                  className="text-center font-bold text-lg"
                >
                  No Applicants Applied Yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsTable;
