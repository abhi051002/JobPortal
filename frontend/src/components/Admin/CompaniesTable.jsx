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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Edit2, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const navigate = useNavigate();
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompanies, setFilterCompanies] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompanies(filteredCompany);
  }, [companies, searchCompanyByText]);
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
        <TableCaption>A list of your registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompanies.length >= 0 ? (
            filterCompanies?.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={
                        company?.logo ??
                        "https://static.vecteezy.com/system/resources/previews/008/214/517/non_2x/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg"
                      }
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company?.name}</TableCell>
                <TableCell>{dateFormat(company?.createdAt)}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        className="flex items-center gap-2 w-fit cursor-pointer"
                        onClick={() => navigate(`${company._id}`)}
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <span>No Companies Registered yet..</span>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
