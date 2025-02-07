import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Edit2, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobTable = () => {
  const navigate = useNavigate();
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJob =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            ?.toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJob);
  }, [allAdminJobs, searchJobByText]);
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
      <Table>
        <TableCaption>A list of your recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[120px]">Company Name</TableHead>
            <TableHead className="min-w-[100px]">Role</TableHead>
            <TableHead className="hidden sm:table-cell">Date</TableHead>
            <TableHead className="text-right w-20">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length > 0 ? (
            filterJobs?.map((job) => (
              <TableRow key={job._id}>
                <TableCell className="font-medium">
                  {job?.company?.name}
                </TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {dateFormat(job?.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="ml-auto" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        className="flex items-center gap-2 w-fit cursor-pointer"
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer mt-2"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center font-bold text-lg">
                No Job Posted yet by you.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobTable;
