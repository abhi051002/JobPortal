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

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
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
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications?.length > 0 ? (
            applications?.map((application, index) => {
              return (
                <TableRow key={application._id}>
                  <TableCell>{application?.applicant?.fullname}</TableCell>
                  <TableCell>{application?.applicant?.email}</TableCell>
                  <TableCell>{application?.applicant?.phoneNumber}</TableCell>
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
                      >
                        Resume
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {dateFormat(application?.applicant?.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {shortListStatus.map((status, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() =>
                                statusHandler(application?._id, status)
                              }
                              className="flex w-fit items-center my-2 cursor-pointer"
                            >
                              <span>{status}</span>
                            </div>
                          );
                        })}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow className="text-center">
              <TableCell colSpan="6" className="font-bold text-lg">
                No Applicants Applied Yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
