import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Bhubaneswar",
      "Delhi NCR",
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Mumbai",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Fullstack Developer",
      "Content Writer",
      "Business Analyst",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-14k", "14-50k", "50k-1Lakh", "1-5 Lakh"],
  },
];

const FilterCard = () => {
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-semibold">Filter Jobs</h1>
      <hr className="mt-3" />
      {filterData.map((item, index) => (
        <RadioGroup key={index} className="mt-4">
          <h2 className="font-bold text-lg mb-2">{item.filterType}</h2>
          {item.array.map((data, subIndex) => (
            <div key={subIndex} className="flex items-center space-x-2">
              <RadioGroupItem
                value={data}
                id={`${item.filterType}-${subIndex}`}
              />
              <Label htmlFor={`${item.filterType}-${subIndex}`}>{data}</Label>
            </div>
          ))}
        </RadioGroup>
      ))}
    </div>
  );
};

export default FilterCard;
